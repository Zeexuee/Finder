import midtransClient from "midtrans-client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const snap = new midtransClient.Snap({
  isProduction: process.env.MIDTRANS_ENVIRONMENT === "production",
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export class PaymentService {
  // Create payment transaction
  async createTransaction(params: {
    userId: string;
    itemType: "DATASET" | "OUTLINE" | "TITLE_GENERATION";
    itemId: string;
    amount: number;
  }) {
    try {
      // Get user details
      const user = await prisma.user.findUnique({
        where: { id: params.userId },
      });

      if (!user) throw new Error("User not found");

      // Create Midtrans transaction
      const transactionDetails = {
        transaction_details: {
          order_id: `ORDER-${Date.now()}-${params.userId}`,
          gross_amount: params.amount,
        },
        customer_details: {
          email: user.email,
          first_name: user.name,
        },
        item_details: [
          {
            id: params.itemId,
            price: params.amount,
            quantity: 1,
            name: `${params.itemType} Purchase`,
          },
        ],
      };

      const token = await snap.createTransactionToken(transactionDetails);

      // Save transaction to database
      const transaction = await prisma.transaction.create({
        data: {
          userId: params.userId,
          itemType: params.itemType,
          itemId: params.itemId,
          amount: params.amount,
          transactionToken: token,
          status: "PENDING",
        },
      });

      return {
        transactionId: transaction.id,
        token: token,
        redirectUrl: `https://app.sandbox.midtrans.com/snap/snap.js`, // For sandbox
      };
    } catch (error) {
      console.error("Payment error:", error);
      throw new Error("Failed to create transaction");
    }
  }

  // Handle Midtrans webhook callback
  async handleCallback(notification: any) {
    try {
      const orderId = notification.order_id;
      const transactionStatus = notification.transaction_status;
      const fraudStatus = notification.fraud_status;

      let status: "PAID" | "PENDING" | "FAILED" | "EXPIRED" = "PENDING";

      if (transactionStatus == "capture") {
        if (fraudStatus == "challenge") {
          status = "PENDING";
        } else if (fraudStatus == "accept") {
          status = "PAID";
        }
      } else if (transactionStatus == "settlement") {
        status = "PAID";
      } else if (transactionStatus == "deny" || transactionStatus == "cancel" || transactionStatus == "expire") {
        status = "FAILED";
      } else if (transactionStatus == "pending") {
        status = "PENDING";
      }

      // Update transaction status
      const transaction = await prisma.transaction.updateMany({
        where: {
          // Find by order_id pattern - you might need to adjust this
          id: orderId,
        },
        data: {
          status: status,
        },
      });

      return transaction;
    } catch (error) {
      console.error("Callback error:", error);
      throw new Error("Failed to handle callback");
    }
  }

  // Check payment status
  async checkPaymentStatus(transactionId: string) {
    try {
      const transaction = await prisma.transaction.findUnique({
        where: { id: transactionId },
      });

      if (!transaction) throw new Error("Transaction not found");

      return {
        status: transaction.status,
        amount: transaction.amount,
        itemType: transaction.itemType,
      };
    } catch (error) {
      console.error("Status check error:", error);
      throw new Error("Failed to check payment status");
    }
  }
}

export default new PaymentService();

import { Router, Request, Response } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import paymentService from "../services/payment.service";

const router = Router();

// Create payment transaction
router.post("/create", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { itemType, itemId, amount } = req.body;
    const userId = (req as any).session.userId;

    if (!itemType || !itemId || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const transaction = await paymentService.createTransaction({
      userId,
      itemType,
      itemId,
      amount,
    });

    res.json({
      success: true,
      transaction,
    });
  } catch (error) {
    console.error("Payment creation error:", error);
    res.status(500).json({ error: "Failed to create payment" });
  }
});

// Handle Midtrans webhook callback
router.post("/callback", async (req: Request, res: Response) => {
  try {
    const notification = req.body;

    await paymentService.handleCallback(notification);

    res.json({ status: "ok" });
  } catch (error) {
    console.error("Callback error:", error);
    res.status(500).json({ error: "Failed to process callback" });
  }
});

// Check payment status
router.get("/:transactionId", async (req: Request, res: Response) => {
  try {
    const { transactionId } = req.params;

    const status = await paymentService.checkPaymentStatus(transactionId);

    res.json(status);
  } catch (error) {
    console.error("Status check error:", error);
    res.status(500).json({ error: "Failed to check payment status" });
  }
});

export default router;

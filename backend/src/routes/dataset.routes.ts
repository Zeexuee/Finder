import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();
const prisma = new PrismaClient();

// Get all datasets
router.get("/", async (req: Request, res: Response) => {
  try {
    const { fieldOfStudy, limit = 10, skip = 0 } = req.query;

    const datasets = await prisma.dataset.findMany({
      where: fieldOfStudy
        ? { fieldOfStudy: { contains: fieldOfStudy as string, mode: "insensitive" } }
        : {},
      take: parseInt(limit as string),
      skip: parseInt(skip as string),
    });

    const total = await prisma.dataset.count();

    res.json({
      total,
      count: datasets.length,
      datasets,
    });
  } catch (error) {
    console.error("Error fetching datasets:", error);
    res.status(500).json({ error: "Failed to fetch datasets" });
  }
});

// Get dataset by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const dataset = await prisma.dataset.findUnique({
      where: { id },
    });

    if (!dataset) {
      return res.status(404).json({ error: "Dataset not found" });
    }

    res.json(dataset);
  } catch (error) {
    console.error("Error fetching dataset:", error);
    res.status(500).json({ error: "Failed to fetch dataset" });
  }
});

// Download dataset (requires authentication + payment)
router.post("/:id/download", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).session.userId;

    const dataset = await prisma.dataset.findUnique({
      where: { id },
    });

    if (!dataset) {
      return res.status(404).json({ error: "Dataset not found" });
    }

    // Check if dataset is free or if user has paid
    if (!dataset.isPaid) {
      // Free dataset - generate download link
      return res.json({
        message: "Download link generated",
        downloadUrl: dataset.fileUrl,
      });
    }

    // Check if user has completed payment
    const transaction = await prisma.transaction.findFirst({
      where: {
        userId,
        itemId: id,
        itemType: "DATASET",
        status: "PAID",
      },
    });

    if (!transaction) {
      return res.status(403).json({
        error: "Payment required",
        message: "Please purchase this dataset first",
      });
    }

    // Generate signed URL or send download
    res.json({
      message: "Download link generated",
      downloadUrl: dataset.fileUrl,
    });
  } catch (error) {
    console.error("Error downloading dataset:", error);
    res.status(500).json({ error: "Failed to download dataset" });
  }
});

export default router;

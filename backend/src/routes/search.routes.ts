import { Router, Request, Response } from "express";
import searchService from "../services/search.service";
import aiService from "../services/ai.service";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Search thesis titles
router.post("/", async (req: Request, res: Response) => {
  try {
    const { query, fieldOfStudy, limit = 10 } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const results = await searchService.searchTitles(query, fieldOfStudy, limit);

    // Log search to AI logs
    if ((req as any).session?.userId) {
      await prisma.aiLog.create({
        data: {
          userId: (req as any).session.userId,
          promptType: "search",
          input: query,
          output: JSON.stringify(results),
        },
      });
    }

    res.json({
      query,
      count: results.length,
      results,
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Search failed" });
  }
});

// Get thesis detail
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const thesis = await searchService.getThesisDetail(id);

    if (!thesis) {
      return res.status(404).json({ error: "Thesis not found" });
    }

    res.json(thesis);
  } catch (error) {
    console.error("Error fetching thesis:", error);
    res.status(500).json({ error: "Failed to fetch thesis" });
  }
});

// Get related thesis
router.get("/:id/related", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { limit = 5 } = req.query;

    const related = await searchService.getRelatedThesis(id, parseInt(limit as string));

    res.json({
      thesisId: id,
      count: related.length,
      related,
    });
  } catch (error) {
    console.error("Error fetching related thesis:", error);
    res.status(500).json({ error: "Failed to fetch related thesis" });
  }
});

// Recommend research method
router.post("/recommend-method", async (req: Request, res: Response) => {
  try {
    const { keywords } = req.body;

    if (!keywords || keywords.length === 0) {
      return res.status(400).json({ error: "Keywords are required" });
    }

    // Get recommendation from AI service
    const method = await aiService.recommendMethod(keywords);

    res.json({
      keywords,
      recommendedMethod: method,
    });
  } catch (error) {
    console.error("Error recommending method:", error);
    res.status(500).json({ error: "Failed to recommend method" });
  }
});

export default router;

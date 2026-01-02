import { PrismaClient } from "@prisma/client";
import aiService from "./ai.service";

const prisma = new PrismaClient();

export class SearchService {
  // Search thesis titles by keyword
  async searchTitles(query: string, fieldOfStudy?: string, limit: number = 10) {
    try {
      // For now, simple text search. Later we'll add vector similarity search
      const results = await prisma.thesisTitle.findMany({
        where: {
          AND: [
            {
              OR: [
                { title: { contains: query, mode: "insensitive" } },
                { keywords: { hasSome: [query.toLowerCase()] } },
                { abstractSummary: { contains: query, mode: "insensitive" } },
              ],
            },
            fieldOfStudy ? { fieldOfStudy: { contains: fieldOfStudy, mode: "insensitive" } } : {},
          ],
        },
        include: {
          references: {
            include: {
              reference: true,
            },
          },
        },
        take: limit,
      });

      return results;
    } catch (error) {
      console.error("Search error:", error);
      throw new Error("Failed to search titles");
    }
  }

  // Get thesis detail with all references
  async getThesisDetail(thesisId: string) {
    try {
      const thesis = await prisma.thesisTitle.findUnique({
        where: { id: thesisId },
        include: {
          references: {
            include: {
              reference: true,
            },
          },
        },
      });

      return thesis;
    } catch (error) {
      console.error("Error fetching thesis detail:", error);
      throw new Error("Failed to fetch thesis detail");
    }
  }

  // Get related thesis by field of study
  async getRelatedThesis(thesisId: string, limit: number = 5) {
    try {
      const thesis = await prisma.thesisTitle.findUnique({
        where: { id: thesisId },
      });

      if (!thesis) throw new Error("Thesis not found");

      const related = await prisma.thesisTitle.findMany({
        where: {
          AND: [
            { id: { not: thesisId } },
            { fieldOfStudy: thesis.fieldOfStudy },
          ],
        },
        take: limit,
      });

      return related;
    } catch (error) {
      console.error("Error fetching related thesis:", error);
      throw new Error("Failed to fetch related thesis");
    }
  }
}

export default new SearchService();

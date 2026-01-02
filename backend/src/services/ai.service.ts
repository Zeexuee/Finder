import axios from "axios";

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://localhost:5000";

export class AIService {
  // Generate embedding for search query
  async generateEmbedding(text: string): Promise<number[]> {
    try {
      const response = await axios.post(`${AI_SERVICE_URL}/embedding`, { text });
      return response.data.embedding;
    } catch (error) {
      console.error("AI Service error:", error);
      throw new Error("Failed to generate embedding");
    }
  }

  // Generate thesis title using Gemini
  async generateTitle(params: {
    fieldOfStudy: string;
    keyword: string;
    method: string;
  }): Promise<string> {
    try {
      const response = await axios.post(`${AI_SERVICE_URL}/generate-title`, params);
      return response.data.title;
    } catch (error) {
      console.error("AI Service error:", error);
      throw new Error("Failed to generate title");
    }
  }

  // Generate thesis outline using Gemini
  async generateOutline(params: {
    title: string;
    fieldOfStudy: string;
  }): Promise<string> {
    try {
      const response = await axios.post(`${AI_SERVICE_URL}/generate-outline`, params);
      return response.data.outline;
    } catch (error) {
      console.error("AI Service error:", error);
      throw new Error("Failed to generate outline");
    }
  }

  // Recommend research method based on keywords
  async recommendMethod(keywords: string[]): Promise<string> {
    try {
      const response = await axios.post(`${AI_SERVICE_URL}/recommend-method`, {
        keywords,
      });
      return response.data.method;
    } catch (error) {
      console.error("AI Service error:", error);
      throw new Error("Failed to recommend method");
    }
  }
}

export default new AIService();

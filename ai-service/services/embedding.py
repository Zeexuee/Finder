from sentence_transformers import SentenceTransformer
import numpy as np

class EmbeddingService:
    def __init__(self):
        """Initialize with MiniLM model for embeddings"""
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
    
    def generate_embedding(self, text: str) -> list:
        """Generate embedding for given text"""
        try:
            embedding = self.model.encode(text)
            return embedding.tolist()
        except Exception as e:
            raise Exception(f"Embedding generation failed: {str(e)}")
    
    def batch_embedding(self, texts: list) -> list:
        """Generate embeddings for multiple texts"""
        try:
            embeddings = self.model.encode(texts)
            return [e.tolist() for e in embeddings]
        except Exception as e:
            raise Exception(f"Batch embedding generation failed: {str(e)}")

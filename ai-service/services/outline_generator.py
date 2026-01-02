import google.generativeai as genai
import os

class OutlineGenerator:
    def __init__(self):
        """Initialize Gemini API"""
        api_key = os.getenv('GEMINI_API_KEY')
        if not api_key:
            raise ValueError("GEMINI_API_KEY environment variable not set")
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-pro')
    
    def generate(self, title: str, field_of_study: str) -> str:
        """Generate thesis outline (BAB I) using Gemini"""
        try:
            prompt = f"""
Buatkan outline skripsi untuk BAB I (Pendahuluan) dengan kriteria:

Judul Skripsi: {title}
Bidang Studi: {field_of_study}

Struktur BAB I harus mencakup:
1. Latar Belakang Masalah
2. Rumusan Masalah
3. Tujuan Penelitian
4. Manfaat Penelitian
5. Batasan Masalah

Format output:
- Padat dan terstruktur
- Setiap bagian 2-3 poin penting
- Gunakan bullet points
- Akademis dan profesional

Berikan outline langsung dalam format yang bisa dicopy.
            """
            
            response = self.model.generate_content(prompt)
            outline = response.text.strip()
            return outline
        except Exception as e:
            raise Exception(f"Outline generation failed: {str(e)}")

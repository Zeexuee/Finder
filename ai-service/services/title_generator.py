import google.generativeai as genai
import os

class TitleGenerator:
    def __init__(self):
        """Initialize Gemini API"""
        api_key = os.getenv('GEMINI_API_KEY')
        if not api_key:
            raise ValueError("GEMINI_API_KEY environment variable not set")
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-pro')
    
    def generate(self, field_of_study: str, keyword: str, method: str) -> str:
        """Generate thesis title using Gemini"""
        try:
            prompt = f"""
Buatkan judul skripsi akademis yang unik dan menarik dengan kriteria:

Jurusan/Bidang Studi: {field_of_study}
Topik/Keyword: {keyword}
Metode Penelitian: {method}

Kriteria Judul:
- Jelas dan spesifik
- Akademis dan profesional
- Tidak terlalu panjang (maksimal 10-12 kata)
- Tidak plagiat
- Mengandung keyword yang relevan

Berikan HANYA judul, tanpa penjelasan tambahan.
            """
            
            response = self.model.generate_content(prompt)
            title = response.text.strip()
            return title
        except Exception as e:
            raise Exception(f"Title generation failed: {str(e)}")

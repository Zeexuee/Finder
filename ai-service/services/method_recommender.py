import google.generativeai as genai
import os

class MethodRecommender:
    def __init__(self):
        """Initialize Gemini API"""
        api_key = os.getenv('GEMINI_API_KEY')
        if not api_key:
            raise ValueError("GEMINI_API_KEY environment variable not set")
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-pro')
        
        # Rule-based method mapping
        self.method_rules = {
            'klasifikasi': 'Klasifikasi (Naive Bayes, SVM, Random Forest)',
            'prediksi': 'Regresi dan Prediksi (Linear Regression, ARIMA)',
            'clustering': 'Clustering (K-Means, DBSCAN, Hierarchical)',
            'deteksi': 'Deteksi Anomali (Isolation Forest, LOF)',
            'pengolahan citra': 'Computer Vision (CNN, OpenCV)',
            'nlp': 'Natural Language Processing (BERT, Transformers)',
            'deep learning': 'Deep Learning (CNN, RNN, LSTM)',
            'optimasi': 'Optimasi (Genetic Algorithm, PSO)',
            'keamanan': 'Analisis Keamanan (Penetration Testing)',
            'iot': 'IoT dan Sistem Embedded',
        }
    
    def recommend(self, keywords: list) -> str:
        """Recommend research method based on keywords"""
        try:
            # First check rule-based mapping
            keywords_lower = [k.lower() for k in keywords]
            for key, method in self.method_rules.items():
                if key in ' '.join(keywords_lower):
                    return method
            
            # If no rule matches, use Gemini for intelligent recommendation
            prompt = f"""
Rekomendikan metode penelitian yang paling sesuai untuk topik dengan keywords:
{', '.join(keywords)}

Berikan rekomendasi dalam format:
Metode: [nama metode]
Alasan: [penjelasan singkat 1-2 kalimat mengapa cocok]

Hindari penjelasan panjang, langsung ke inti.
            """
            
            response = self.model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            # Fallback to default method
            return "Metode penelitian yang sesuai dengan topik Anda"

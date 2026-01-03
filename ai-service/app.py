from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

app = Flask(__name__)

# Configure Gemini API
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'OK', 'service': 'AI Service'})

@app.route('/generate-title', methods=['POST'])
def generate_title():
    """Generate thesis title using Gemini"""
    try:
        data = request.get_json()
        field_of_study = data.get('fieldOfStudy')
        keyword = data.get('keyword')
        method = data.get('method')
        
        if not all([field_of_study, keyword, method]):
            return jsonify({'error': 'fieldOfStudy, keyword, and method are required'}), 400
        
        prompt = f"""Generate a professional thesis title for the following:
Field of Study: {field_of_study}
Keyword: {keyword}
Research Method: {method}

Provide only the title, without any additional text."""
        
        try:
            model = genai.GenerativeModel('gemini-2.0-flash')
            response = model.generate_content(prompt)
            title = response.text.strip()
            return jsonify({'title': title, 'source': 'gemini'})
        except Exception as api_error:
            # If rate limit exceeded, return mock response
            if 'quota' in str(api_error).lower() or '429' in str(api_error):
                mock_title = f"{keyword.title()} Analysis Using {method} in {field_of_study}"
                print(f"⚠️ Using MOCK response (rate limit): {mock_title}")
                return jsonify({'title': mock_title, 'source': 'mock', 'note': 'Gemini API rate limited'})
            else:
                raise
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/generate-outline', methods=['POST'])
def generate_outline():
    """Generate thesis outline using Gemini"""
    try:
        data = request.get_json()
        title = data.get('title')
        field_of_study = data.get('fieldOfStudy')
        
        if not all([title, field_of_study]):
            return jsonify({'error': 'title and fieldOfStudy are required'}), 400
        
        prompt = f"""Create a detailed thesis outline for:
Title: {title}
Field of Study: {field_of_study}

Format the outline with numbered sections and subsections."""
        
        try:
            model = genai.GenerativeModel('gemini-2.0-flash')
            response = model.generate_content(prompt)
            outline = response.text.strip()
            return jsonify({'outline': outline, 'source': 'gemini'})
        except Exception as api_error:
            # If rate limit exceeded, return mock response
            if 'quota' in str(api_error).lower() or '429' in str(api_error):
                mock_outline = f"""1. Introduction
   1.1 Background
   1.2 Research Question
2. Literature Review
   2.1 Previous Studies
   2.2 Theoretical Framework
3. Methodology
   3.1 Research Design
   3.2 Data Collection
4. Results
   4.1 Key Findings
   4.2 Analysis
5. Discussion
   5.1 Implications
   5.2 Limitations
6. Conclusion
   6.1 Summary
   6.2 Future Work"""
                print(f"⚠️ Using MOCK response (rate limit) for outline")
                return jsonify({'outline': mock_outline, 'source': 'mock', 'note': 'Gemini API rate limited'})
            else:
                raise
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/recommend-method', methods=['POST'])
def recommend_method():
    """Recommend research method based on keywords"""
    try:
        data = request.get_json()
        keywords = data.get('keywords', [])
        
        if not keywords:
            return jsonify({'error': 'Keywords are required'}), 400
        
        keywords_str = ', '.join(keywords) if isinstance(keywords, list) else keywords
        
        prompt = f"""Based on these research keywords: {keywords_str}
Recommend the most appropriate research method. Consider qualitative, quantitative, mixed methods, etc.
Provide a brief explanation of why this method is suitable."""
        
        try:
            model = genai.GenerativeModel('gemini-2.0-flash')
            response = model.generate_content(prompt)
            method = response.text.strip()
            return jsonify({'method': method, 'source': 'gemini'})
        except Exception as api_error:
            # If rate limit exceeded, return mock response
            if 'quota' in str(api_error).lower() or '429' in str(api_error):
                mock_method = f"""Recommended Method: Mixed Methods Research

Explanation: For the research area involving {', '.join(keywords[:2]) if keywords else 'your topics'}, a mixed methods approach combining both qualitative and quantitative data collection would be most effective. This allows for:
- Quantitative analysis to establish patterns and statistical relationships
- Qualitative exploration to understand underlying mechanisms
- Triangulation for more robust findings"""
                print(f"⚠️ Using MOCK response (rate limit) for method recommendation")
                return jsonify({'method': mock_method, 'source': 'mock', 'note': 'Gemini API rate limited'})
            else:
                raise
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/embedding', methods=['POST'])
def generate_embedding():
    """Generate simple embedding (hash-based for now without ML models)"""
    try:
        data = request.get_json()
        text = data.get('text')
        
        if not text:
            return jsonify({'error': 'Text is required'}), 400
        
        # Simple hash-based embedding
        embedding = [float(ord(c)) for c in text[:512]]
        embedding = embedding + [0.0] * (384 - len(embedding))  # Pad to 384 dimensions
        
        return jsonify({'embedding': embedding[:384]})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)


from flask import Flask, request, jsonify
import os
from services.embedding import EmbeddingService
from services.title_generator import TitleGenerator
from services.outline_generator import OutlineGenerator
from services.method_recommender import MethodRecommender

app = Flask(__name__)

# Initialize services
embedding_service = EmbeddingService()
title_generator = TitleGenerator()
outline_generator = OutlineGenerator()
method_recommender = MethodRecommender()

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'OK'})

@app.route('/embedding', methods=['POST'])
def generate_embedding():
    """Generate embedding for given text"""
    try:
        data = request.get_json()
        text = data.get('text')
        
        if not text:
            return jsonify({'error': 'Text is required'}), 400
        
        embedding = embedding_service.generate_embedding(text)
        return jsonify({'embedding': embedding})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

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
        
        title = title_generator.generate(
            field_of_study=field_of_study,
            keyword=keyword,
            method=method
        )
        return jsonify({'title': title})
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
        
        outline = outline_generator.generate(
            title=title,
            field_of_study=field_of_study
        )
        return jsonify({'outline': outline})
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
        
        method = method_recommender.recommend(keywords)
        return jsonify({'method': method})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

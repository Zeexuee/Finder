from flask import Flask, jsonify
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'OK', 'source': 'mock'})

@app.route('/generate-title', methods=['POST'])
def generate_title():
    return jsonify({'title': 'Mock Title', 'source': 'mock', 'note': 'Using mock response'})

@app.route('/generate-outline', methods=['POST'])
def generate_outline():
    return jsonify({'outline': 'Mock Outline...', 'source': 'mock'})

@app.route('/recommend-method', methods=['POST'])
def recommend_method():
    return jsonify({'method': 'Mixed Methods', 'source': 'mock'})

if __name__ == '__main__':
    print("Starting Flask on port 5555...")
    app.run(host='127.0.0.1', port=5555, debug=False, threaded=True)

from flask import Flask, jsonify
import sys

print("Starting Flask app...", file=sys.stderr)

app = Flask(__name__)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'OK'})

if __name__ == '__main__':
    print("About to run Flask on port 5000", file=sys.stderr)
    try:
        app.run(host='0.0.0.0', port=5000, debug=False)
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)

from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

cross_origin(supports_credentials=True)

@app.route('/test')
def test_endpoint():
    return 'Hello World'

@app.route('/secondtest', methods=[('GET')])
def test_second_endpoint():
    return jsonify({'success': True}), 200

if __name__ == '__main__':
    app.run(debug=True)
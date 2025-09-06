from flask import Flask, request, jsonify
from app import get_summary, get_title, get_author, get_questions, ans_question, get_one_question
import json

app = Flask(__name__)
from flask_cors import CORS

CORS(app, origins=['*'], supports_credentials=True)

@app.route('/info/<book>', methods=['GET'])
def info(book):
    response = get_summary(book)
    return jsonify({'data': response})

@app.route('/bookinfo/', methods=['GET'])
def bookinfo():
    title = get_title()
    author = get_author()
    print(f"title: {title}")
    print(f"author: {author}")
    return jsonify({"title": title, "author": author})

@app.route('/questions/', methods=['GET', 'POST'])
def questions():
    if request.method == 'GET':
        questions = get_questions().split("\n")
        print(questions)
        return jsonify({"q1": questions[0], "q2": questions[1], "q3": questions[2]})
    
    elif request.method == 'POST':
        r = request.get_json()
        print("POST method called")
        print(r)
        print(r['params']['q'])
        response = ans_question(r)
        print(response)
        return jsonify({'data': response})

@app.route('/question/', methods=['GET'])
def question():
    data = get_one_question()
    print("returning question", data)
    return jsonify({'q': data})

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    text = data.get('text', '')

    if not text.strip():
        return jsonify({'error': 'No text provided.'}), 400

    # Assuming get_summary can summarize raw text
    summary = get_summary(text)
    return jsonify({'summary': summary})

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "API is running!"})

if __name__ == '__main__':
    app.run(debug=True)

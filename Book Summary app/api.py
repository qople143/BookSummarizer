from flask import Flask, request, jsonify
from app import get_summary,get_title,get_author,get_questions,ansQuestion,getOnequestion
import json

app = Flask(__name__)
from flask_cors import CORS

CORS(app, origins=['*'], supports_credentials=True)


@app.route('/info/<book>', methods=['GET'])
def info(book):
    response = get_summary(book)
    return jsonify({'data':response})

@app.route('/bookinfo/', methods=['GET'])
def bookinfo():
    title = get_title()
    author=get_author()
    print(f"title:",title)
    print(f"author:",author)

    return jsonify({"title":title,"author":author})

# @app.route('/questions/', methods=['GET'])
# def questions():
#     questions = get_questions().split("\n")
#     print(questions)
#     return jsonify({"q1":questions[0],"q2":questions[1],"q3":questions[2]})

@app.route('/questions/', methods=['GET', 'POST'])
def questions():
    if request.method == 'GET':
        # Handle GET request
        questions = get_questions().split("\n")
        print(questions)
        return jsonify({"q1": questions[0], "q2": questions[1], "q3": questions[2]})
    elif request.method == 'POST':
        # Handle POST request
        # r = json.load(request.get_json())
        r=request.get_json()
        print("post method called")
        print(r)
        # print(json.loads(r))
        # print(json.du)
        print(r['params']['q'])

        # Do something with the data, for example print it
        # json_data = json.loads(r)
        # print(json_data)
        response = ansQuestion(r)
        print(response)
        return jsonify({'data':response})
        # Return a response
        # return 'Received POST request', 200

@app.route('/question/', methods=['GET'])
def question():
    data= getOnequestion()
    print("returrning question",data)
    return jsonify({'q':data})

if __name__ == '__main__':
    app.run(debug=True)

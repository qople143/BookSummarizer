from groq import Groq
from dotenv import load_dotenv
import os
import time

# Load environment variables from .env file
load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))
chat=[]

model1="llama3-8b-8192"
model2="mixtral-8x7b-32768"


def get_summary(book):
    global chat
    chat.clear()
    chat.append({
            "role": "user",
            "content": f"write ashort summary of {book}. No explaination, only summary"
        })
    completion = client.chat.completions.create(
        model=model2,
        messages=chat,
        temperature=1,
        max_tokens=300,
        # top_p=1,
        # stream=False,
        # response_format={"type": "json_object"},
        # stop=None,
    )

    chat.append({
      "role": "assistant",
      "content": completion.choices[0].message.content
    })
    
    return completion.choices[0].message.content
    
    



def get_author():
    time.sleep(1)
    chat.append({"role": "user", "content": "Give answer only in one line.write a author name only, no explaination,no extra info and extra spaces. Print only name"})


    completion = client.chat.completions.create(
        model=model1,
        messages=chat,
        temperature=1,
        max_tokens=100,
        # top_p=1,
        # stream=False,
        # response_format={"type": "json_object"},
        # stop=None,
    )
    

    return completion.choices[0].message.content


def get_title():
    time.sleep(1)
    
    chat.append({"role": "user", "content": "write a book name only, no explaination. Print only book name"})


    completion = client.chat.completions.create(
        model=model1,
        messages=chat,
        temperature=1,
        max_tokens=100,
        # top_p=1,
        # stream=False,
        # response_format={"type": "json_object"},
        # stop=None,
    )

    return completion.choices[0].message.content

def get_questions():
    chat.append({"role": "user", "content": "write a top 3 questions suggestion based on book or your summary only, no explaination,no extra spaces etc.print only questions.Just start with '1. <qeuetion>..."})


    completion = client.chat.completions.create(
        model=model1,
        messages=chat,
        temperature=1,
        max_tokens=100,
        # top_p=1,
        # stream=False,
        # response_format={"type": "json_object"},
        # stop=None,
    )
    chat.append({
      "role": "assistant",
      "content": completion.choices[0].message.content
    })


    return completion.choices[0].message.content

def ansQuestion(que):
    chat.append({"role": "user", "content": f"write answer based on your above response.Question:{que}"})


    completion = client.chat.completions.create(
        model=model1,
        messages=chat,
        temperature=1,
        max_tokens=100,
        # top_p=1,
        # stream=False,
        # response_format={"type": "json_object"},
        # stop=None,
    )

    return completion.choices[0].message.content

def getOnequestion():
    chat.append({"role": "user", "content": "write a question suggestion based on book or your summary only, no explaination,no extra spaces,no numbers etc.Make sure that you do not repeat previous questions.print only one questions."})


    completion = client.chat.completions.create(
        model=model1,
        messages=chat,
        temperature=1,
        max_tokens=100,
        # top_p=1,
        # stream=False,
        # response_format={"type": "json_object"},
        # stop=None,
    )
    chat.append({
      "role": "assistant",
      "content": completion.choices[0].message.content
    })


    return completion.choices[0].message.content


# if __name__="__main__":

if __name__ == '__main__':
    get_summary("Alchemist")

    # print("author:",get_author())
    # print("title:",get_title())
    print("Questions:",get_questions().split("\n"))
    # q=input("Enetr quetion:")
    # print(ansBasedonQuestion(q))
    print(getOnequestion())





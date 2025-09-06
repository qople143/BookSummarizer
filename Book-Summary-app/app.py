from groq import Groq
from dotenv import load_dotenv
import os
import time

# Load environment variables from the .env file
load_dotenv()

# Fetch the API key from environment variables
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Shared conversation history
chat = []

# Model names
model1 = "llama3-8b-8192"
model2 = "llama3-8b-8192"

# --- Function to generate a short summary of a book ---
def get_summary(book):
    global chat
    chat.clear()
    chat.append({
        "role": "user",
        "content": f"Write a short summary of {book}. No explanation, only summary."
    })
    completion = client.chat.completions.create(
        model=model2,
        messages=chat,
        temperature=1,
        max_tokens=300,
    )
    response = completion.choices[0].message.content
    chat.append({"role": "assistant", "content": response})
    return response

# --- ✅ New function to summarize arbitrary text ---
def summarize_text(text):
    global chat
    chat.clear()
    chat.append({
        "role": "user",
        "content": f"Summarize the following text:\n{text}\nOnly give the summary, no explanation or preamble."
    })
    completion = client.chat.completions.create(
        model=model2,
        messages=chat,
        temperature=1,
        max_tokens=300,
    )
    response = completion.choices[0].message.content
    chat.append({"role": "assistant", "content": response})
    return response

# --- Author name function ---
def get_author():
    time.sleep(1)
    chat.append({
        "role": "user",
        "content": "Give answer only in one line. Write only the author name, no explanation, no extra info or spaces."
    })
    completion = client.chat.completions.create(
        model=model1,
        messages=chat,
        temperature=1,
        max_tokens=100,
    )
    return completion.choices[0].message.content

# --- Book title function ---
def get_title():
    time.sleep(1)
    chat.append({
        "role": "user",
        "content": "Write only the book name, no explanation."
    })
    completion = client.chat.completions.create(
        model=model1,
        messages=chat,
        temperature=1,
        max_tokens=100,
    )
    return completion.choices[0].message.content

# --- Get top 3 questions ---
def get_questions():
    chat.append({
        "role": "user",
        "content": "Write the top 3 question suggestions based on the book or your summary only. No explanation or extra spacing. Just start with '1. <question>...'"
    })
    completion = client.chat.completions.create(
        model=model1,
        messages=chat,
        temperature=1,
        max_tokens=150,
    )
    response = completion.choices[0].message.content
    chat.append({"role": "assistant", "content": response})
    return response

# --- Answer a given question ---
def ans_question(que):
    chat.append({
        "role": "user",
        "content": f"Write an answer based on your above response. Question: {que}"
    })
    completion = client.chat.completions.create(
        model=model1,
        messages=chat,
        temperature=1,
        max_tokens=150,
    )
    return completion.choices[0].message.content

# --- Get one unique question ---
def get_one_question():
    chat.append({
        "role": "user",
        "content": "Write one question suggestion based on the book or your summary only. No explanation, no extra spaces, no numbers. Do not repeat previous questions."
    })
    completion = client.chat.completions.create(
        model=model1,
        messages=chat,
        temperature=1,
        max_tokens=100,
    )
    response = completion.choices[0].message.content
    chat.append({"role": "assistant", "content": response})
    return response

# --- Testing only ---
if __name__ == '__main__':
    summary = get_summary("Alchemist")
    print("Summary:", summary)
    print("Questions:", get_questions().split("\n"))
    print("One more question:", get_one_question())

    test_text = "The Alchemist is a novel by Paulo Coelho that follows Santiago, a shepherd boy who dreams of finding a treasure in Egypt. He meets various characters who guide him toward understanding his Personal Legend."
    print("Text summary:", summarize_text(test_text))

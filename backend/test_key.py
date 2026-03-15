import google.generativeai as gai
import os
from dotenv import load_dotenv

load_dotenv("c:/Users/hp/Desktop/kaushal2/backend/.env")
api_key = os.getenv("GEMINI_API_KEY")
print(f"API Key: {api_key[:10]}...")

gai.configure(api_key=api_key)
model = gai.GenerativeModel("gemini-1.5-flash")

try:
    response = model.generate_content("Hello, testing API key.")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")

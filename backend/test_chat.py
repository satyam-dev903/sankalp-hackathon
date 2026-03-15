import requests
import json

url = "http://localhost:8000/api/ai/chat"
payload = {
    "message": "PMKVY mein kaise join karein?",
    "user_type": "bluecollar",
    "history": [],
    "profile": {},
    "analysis": {}
}
headers = {"Content-Type": "application/json"}

try:
    response = requests.post(url, json=payload)
    print(f"Status: {response.status_code}")
    print(f"Reply: {response.json()}")
except Exception as e:
    print(f"Error: {e}")

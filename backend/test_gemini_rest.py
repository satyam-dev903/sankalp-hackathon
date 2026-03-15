import httpx
import json

url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDl0ZS8f8V68KzDEJemiM3kdMW537U7KKo"
payload = {
    "contents": [{"role": "user", "parts": [{"text": "hi"}]}]
}

resp = httpx.post(url, json=payload, timeout=30.0)
print(f"Status: {resp.status_code}")
print(f"Body: {resp.text}")

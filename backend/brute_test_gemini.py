import httpx
import json

key = "AIzaSyDl0ZS8f8V68KzDEJemiM3kdMW537U7KKo"
models = ["gemini-1.5-flash", "gemini-2.0-flash", "gemini-pro", "gemini-flash-latest"]

for model in models:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={key}"
    payload = {
        "contents": [{"role": "user", "parts": [{"text": "hi"}]}]
    }
    try:
        resp = httpx.post(url, json=payload, timeout=10.0)
        print(f"Model: {model} -> Status: {resp.status_code}")
        if resp.status_code == 200:
            print(f"Success! {resp.json().get('candidates', [{}])[0].get('content', {}).get('parts', [{}])[0].get('text', '')}")
            break
    except Exception as e:
        print(f"Model: {model} -> Error: {e}")

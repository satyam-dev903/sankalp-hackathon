import httpx
import json

url = "https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyDl0ZS8f8V68KzDEJemiM3kdMW537U7KKo"

resp = httpx.get(url, timeout=30.0)
print(f"Status: {resp.status_code}")
if resp.status_code == 200:
    models = resp.json().get('models', [])
    for m in models:
        print(m['name'])
else:
    print(f"Error: {resp.text}")

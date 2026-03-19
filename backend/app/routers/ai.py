import httpx
import json
from fastapi import APIRouter
from app.config import settings

router = APIRouter()

def build_system_prompt(user_type, profile, analysis):
    context = json.dumps({
        "profile": profile or {},
        "analysis": analysis or {}
    })

    if user_type == 'bluecollar':
        return f"""Tu KaushalAI ka helper hai. Profile: {context}
Rules: Bilkul simple Hindi. 3 sentences max. Koi English nahi except numbers.
Koi paid course nahi. Sirf PMKVY, MUDRA, Udyam jaise free resources batao.
Always warm aur helpful raho."""

    if user_type == 'govt':
        return f"""You are KaushalAI's policy AI for a Government Officer. District data: {context}
Rules: Data-driven. Cite specific numbers. Suggest concrete actions with costs. English only.
Be concise — 3-5 sentences max. Always actionable."""

    return f"""You are KaushalAI's personal career counselor. Full context: {context}
Rules: Always personalized. Reference real skill names, job titles, and schemes.
3-5 sentences unless more detail asked. Hindi if asked in Hindi, English if English.
Never suggest paid courses. Free resources only (SWAYAM, NPTEL, YouTube)."""

@router.post("/chat")
async def chat(data: dict):
    message = data.get("message", "")
    history = data.get("history", [])
    user_type = data.get("user_type", "jobseeker")
    profile = data.get("profile", {})
    analysis = data.get("analysis", {})
    
    system_prompt = build_system_prompt(user_type, profile, analysis)
    
    # Formulate payload for Gemini REST API
    contents = []
    for msg in history:
        role = "user" if msg["role"] == "user" else "model"
        contents.append({"role": role, "parts": [{"text": msg["content"]}]})
    
    contents.append({"role": "user", "parts": [{"text": message}]})
    
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={settings.gemini_api_key}"
    
    payload = {
        "contents": contents,
        "system_instruction": {"parts": [{"text": system_prompt}]}
    }
    
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post(url, json=payload)
            if resp.status_code != 200:
                print(f"Gemini API Error: {resp.text}")
                return {"reply": "Maafi chahta hoon, API mein dikkat hai. Kripya baad mein koshish karein."}
            
            result = resp.json()
            reply = result['candidates'][0]['content']['parts'][0]['text']
            return {"reply": reply}
    except Exception as e:
        print(f"Chat Error: {e}")
        return {"reply": "Kuch takniki dikkat aa rahi hai. Kripya thodi der baad koshish karein."}

@router.post("/enhance-profile")
async def enhance_profile(data: dict):
    user_type = data.get("user_type", "jobseeker")
    profile_data = data.get("profile_data", {})
    
    prompt = ""
    if user_type == 'bluecollar':
        prompt = f"""Generate a professional and humble summary for a skilled worker based on this data: {json.dumps(profile_data)}.
        Language: Simple Hindi (Hinglish). Tone: Honest and hardworking. Max 20 words. No emojis."""
    elif user_type == 'govt':
        prompt = f"""Generate a professional designation summary for a government official: {json.dumps(profile_data)}.
        Language: Formal English. Tone: Authoritative yet service-oriented. Max 20 words."""
    else:
        prompt = f"""Generate a professional career summary for a job seeker: {json.dumps(profile_data)}. 
        Include key skills and goals. Tone: Professional and enthusiastic. Max 25 words."""

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={settings.gemini_api_key}"
    
    payload = {
        "contents": [{"role": "user", "parts": [{"text": prompt}]}],
        "system_instruction": {"parts": [{"text": "You are a professional profile writer. Output only the enhanced summary text, nothing else."}]}
    }
    
    try:
        async with httpx.AsyncClient(timeout=20.0) as client:
            resp = await client.post(url, json=payload)
            if resp.status_code != 200:
                return {"enhanced_summary": "Professional and dedicated individual ready for the next challenge."}
            
            result = resp.json()
            enhanced = result['candidates'][0]['content']['parts'][0]['text'].strip()
            return {"enhanced_summary": enhanced}
    except Exception as e:
        print(f"Enhance Error: {e}")
        return {"enhanced_summary": "Dedicated professional with focus on excellence and skill development."}
@router.post("/interview")
async def interview(data: dict):
    role = data.get("role", "Data Analyst")
    history = data.get("history", [])
    message = data.get("message", "")
    mode = data.get("mode", "question") # 'question' or 'feedback'
    
    if mode == 'feedback':
        system_prompt = f"You are an expert HR interviewer. Analyze this interview transcript for the {role} role and provide a brief, encouraging feedback summary with 2 strengths and 1 improvement area. Respond in a concise JSON-like structure but as a single string."
    else:
        system_prompt = f"You are a professional interviewer for the {role} role. Ask exactly one relevant, technical, or behavioral question. Be concise and professional."

    contents = []
    for msg in history:
        role_type = "user" if msg["role"] == "user" else "model"
        contents.append({"role": role_type, "parts": [{"text": msg["content"]}]})
    
    if message:
        contents.append({"role": "user", "parts": [{"text": message}]})
    
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={settings.gemini_api_key}"
    
    payload = {
        "contents": contents,
        "system_instruction": {"parts": [{"text": system_prompt}]}
    }
    
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post(url, json=payload)
            if resp.status_code != 200:
                return {"reply": "Great answer. Let's move to the next part."}
            
            result = resp.json()
            reply = result['candidates'][0]['content']['parts'][0]['text']
            return {"reply": reply}
    except Exception:
        return {"reply": "That's a solid point. Tell me more about your experience."}

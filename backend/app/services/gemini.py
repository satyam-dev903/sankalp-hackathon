import httpx
import json
from app.config import settings

MODEL = "gemini-flash-latest" 

async def analyze_profile(skills, district, education, exp_years):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={settings.gemini_api_key}"
    
    prompt = f"""
    Analyze this user profile for KaushalBridge AI:
    Skills: {skills}
    District: {district}
    Education: {education}
    Exp: {exp_years} years
    
    Return a JSON object with:
    - career_health_score (0-100)
    - career_matches (list of objects with title, match_%, salary_today, salary_3_years, missing_skills, automation_risk)
    - skill_gaps (list of objects with skill_name, salary_impact, weeks_to_learn, demand_trajectory)
    - latent_skills (list of objects with skill_name, reason)
    - genome_shortcut (object with message, saved_weeks if applicable)
    - roadmap (object with:
        - current_week (integer)
        - progress_percentage (integer)
        - modules (list of objects with id, title, week, status ['completed', 'current', 'locked'], resources [list of strings/URLs]))
    
    Respond with ONLY raw JSON.
    """
    
    payload = {
        "contents": [{"role": "user", "parts": [{"text": prompt}]}]
    }
    
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post(url, json=payload)
            if resp.status_code != 200:
                print(f"Gemini Analysis Error: {resp.text}")
                return {"error": "AI analysis failed due to API error"}
                
            text = resp.json()['candidates'][0]['content']['parts'][0]['text'].strip()
            # Clean up markdown if present
            if text.startswith("```json"):
                text = text[7:-3].strip()
            elif text.startswith("```"):
                text = text[3:-3].strip()
            
            # Additional cleaning for potential non-JSON prefix/suffix
            start_idx = text.find("{")
            end_idx = text.rfind("}")
            if start_idx != -1 and end_idx != -1:
                text = text[start_idx:end_idx+1]
                
            return json.loads(text)
    except Exception as e:
        print(f"Analysis Error: {e}")
        return {"error": "AI analysis failed"}

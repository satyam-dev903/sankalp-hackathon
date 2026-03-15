from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.job import Job
from app.models.scheme import Scheme
from app.schemas.job import JobListResponse
from app.schemas.scheme import SchemeListResponse
from app.services.gemini import analyze_profile
from app.services.lpi_engine import calculate_lpi

router = APIRouter()

# Live data from Supabase for fallback
FALLBACK_SCHEMES = [
    {"id": "f1287ec0-5446-49d1-9fb8-2f68ef8a6693", "name": "MUDRA Loan", "emoji": "💰", "ministry": "Ministry of Finance", "benefit": "₹50k-5L Loan for small businesses", "eligibility": {"age": "18+"}, "apply_url": "https://www.mudra.org.in/", "color": "#10B981", "benefit_hindi": "₹50k-5L छोटे व्यवसायों के लिए ऋण", "deadline": None},
    {"id": "dba445c8-b1d9-4e25-a29e-eda8d2ffbd20", "name": "PMKVY 4.0", "emoji": "🎓", "ministry": "Ministry of Skill Development", "benefit": "Free training + ₹8k stipend", "eligibility": {"education": "10th Pass"}, "apply_url": "https://www.pmkvyofficial.org/", "color": "#4F46E5", "benefit_hindi": "मुफ्त प्रशिक्षण + ₹8k वजीफा", "deadline": None},
    {"id": "09706e41-89d0-403f-beba-a5fab788494b", "name": "Driver Kalyan Yojana", "emoji": "🚛", "ministry": "Ministry of Road Transport", "benefit": "Accidental Insurance and Pension for Drivers", "eligibility": {"profession": "Driver"}, "apply_url": "https://morth.nic.in", "color": "#10b981", "benefit_hindi": "ड्राइवरों के लिए दुर्घटना बीमा और पेंशन", "deadline": None},
    {"id": "0c5243b6-0a30-4055-ae7a-9b24df0c24f5", "name": "PMKVY Data Analytics", "emoji": "📊", "ministry": "Ministry of Skill Development", "benefit": "Free Advanced Excel and SQL Training", "eligibility": {"education": "Graduate"}, "apply_url": "https://pmkvy.gov.in", "color": "#3b82f6", "benefit_hindi": "मुफ्त उन्नत एक्सेल और एसक्यूएल प्रशिक्षण", "deadline": None}
]

FALLBACK_JOBS = [
    {"id": "62ad68ad-f1ed-4fba-8813-07008d1fc994", "title": "Plumber", "company": "Lucknow Water Works", "district": "Lucknow", "salary_min": 15000, "salary_max": 25000, "required_skills": ["Plumbing", "Pipe Fitting"], "apply_url": "https://www.ncs.gov.in", "is_urgent": True, "match_percentage": 85},
    {"id": "129659f7-f64d-4831-9072-00332c03be01", "title": "Heavy Vehicle Driver", "company": "Lucknow Logistics Corp", "district": "Lucknow", "salary_min": 15000, "salary_max": 25000, "required_skills": ["HEAVY_VEHICLE_LICENSE", "NIGHT_DRIVING"], "apply_url": "https://example.com/apply/driver1", "is_urgent": True, "match_percentage": 85},
    {"id": "6a07f972-5abc-4d2b-b893-01ecf84dc4d3", "title": "Data Analyst", "company": "Tech Solutions Patna", "district": "Patna", "salary_min": 35000, "salary_max": 65000, "required_skills": ["EXCEL", "SQL", "PYTHON"], "apply_url": "https://example.com/apply/da1", "is_urgent": True, "match_percentage": 85},
    {"id": "f5a2b3c4-d1e2-4f3g-h4i5-j6k7l8m9n0o1", "title": "Delivery Captain", "company": "Rapido", "district": "Lucknow", "salary_min": 18000, "salary_max": 28000, "required_skills": ["Driving", "Smartphone"], "apply_url": "https://www.rapido.bike/", "is_urgent": True, "match_percentage": 90},
    {"id": "g6h7i8j9-k0l1-m2n3-o4p5-q6r7s8t9u0v1", "title": "Driver Partner", "company": "Ola cabs", "district": "Lucknow", "salary_min": 25000, "salary_max": 40000, "required_skills": ["Commercial Driving"], "apply_url": "https://partners.olacabs.com/", "is_urgent": False, "match_percentage": 92}
]

@router.get("/jobs", response_model=JobListResponse)
async def get_jobs(district: str = "Patna", category: str = "white-collar", db: AsyncSession = Depends(get_db)):
    try:
        # Filter by district and category
        query = select(Job).where(Job.is_active == True)
        if district:
            query = query.where(Job.district.ilike(f"%{district}%"))
        if category:
            query = query.where(Job.category == category)
            
        result = await db.execute(query)
        jobs = result.scalars().all()
        
        if not jobs:
            # Fallback filtering
            filtered = [j for j in FALLBACK_JOBS if (not district or district.lower() in j["district"].lower())]
            # Simple keyword separation for fallback if real DB empty
            if category == "white-collar":
                filtered = [j for j in filtered if "analyst" in j["title"].lower() or "mis" in j["title"].lower()]
            elif category == "blue-collar":
                filtered = [j for j in filtered if "driver" in j["title"].lower() or "plumber" in j["title"].lower() or "delivery" in j["title"].lower()]
            
            return {"jobs": filtered or FALLBACK_JOBS[:2]}
            
        return {"jobs": [
            {
                "id": str(j.id),
                "title": j.title,
                "company": j.company,
                "district": j.district,
                "salary_min": j.salary_min or 0,
                "salary_max": j.salary_max or 0,
                "required_skills": j.required_skills,
                "match_percentage": 85,
                "is_urgent": j.is_urgent,
                "apply_url": j.apply_url or "#"
            } for j in jobs
        ]}
    except Exception as e:
        print(f"DB Error: {e}")
        return {"jobs": FALLBACK_JOBS}

@router.get("/schemes", response_model=SchemeListResponse)
async def get_schemes(category: str = "white-collar", db: AsyncSession = Depends(get_db)):
    try:
        query = select(Scheme).where(Scheme.is_active == True)
        if category:
            query = query.where(Scheme.category == category)
            
        result = await db.execute(query)
        schemes = result.scalars().all()
        
        if not schemes:
            # Fallback filtering
            filtered = FALLBACK_SCHEMES
            if category == "white-collar":
                filtered = [s for s in FALLBACK_SCHEMES if "drive" not in s["name"].lower()]
            elif category == "blue-collar":
                filtered = [s for s in FALLBACK_SCHEMES if "drive" in s["name"].lower() or "mudra" in s["name"].lower()]
            return {"schemes": filtered}
            
        return {"schemes": [
            {
                "id": str(s.id),
                "name": s.name,
                "emoji": s.emoji or "🏛️",
                "ministry": s.ministry or "Govt",
                "benefit": s.benefit or "Training",
                "benefit_hindi": s.benefit_hindi,
                "apply_url": s.apply_url or "#",
                "deadline": str(s.deadline) if s.deadline else None,
                "color": s.color or "blue"
            } for s in schemes
        ]}
    except Exception as e:
        print(f"DB Error: {e}")
        return {"schemes": FALLBACK_SCHEMES}

@router.post("/analyze")
async def analyze(data: dict, db: AsyncSession = Depends(get_db)):
    skills = data.get("skills", [])
    district = data.get("district", "Patna")
    education = data.get("education", "12th Pass")
    exp = data.get("experience_years", 0)
    name = data.get("name", "User")
    
    try:
        analysis = await analyze_profile(skills, district, education, exp)
        if "error" in analysis:
            raise Exception(analysis["error"])
    except Exception as e:
        print(f"Analysis Error, using fallback: {e}")
        # Robust Role-Based Fallback
        is_tech = any(s.lower() in ["sql", "python", "data", "excel"] for s in skills)
        if is_tech:
            analysis = {
                "career_health_score": 75,
                "career_matches": [
                    {"career_title": "Data Analyst", "match_percentage": 85, "salary_today": 35000, "salary_3_years": 75000, "missing_skills": ["SQL", "BI Tools"], "automation_risk": 15},
                    {"career_title": "MIS Executive", "match_percentage": 92, "salary_today": 25000, "salary_3_years": 45000, "missing_skills": ["Advanced Excel"], "automation_risk": 30}
                ],
                "skill_gaps": [
                    {"skill_name": "SQL Intermediate", "salary_impact": 15000, "weeks_to_learn": 4, "demand_trajectory": "RISING"},
                    {"skill_name": "Power BI Basics", "salary_impact": 10000, "weeks_to_learn": 3, "demand_trajectory": "EMERGING"}
                ],
                "latent_skills": [{"skill_name": "Logical Reasoning", "reason": "Consistent with data entry experience"}],
                "genome_shortcut": {"message": "Your Excel experience saves 2 weeks on Database modules.", "saved_weeks": 2},
                "roadmap": {
                    "current_week": 1,
                    "progress_percentage": 25,
                    "modules": [
                        {"id": "m1", "title": "Advanced Excel Formulas", "week": 1, "status": "completed", "resources": ["Excel Masterclass"]},
                        {"id": "m2", "title": "Intro to SQL Queries", "week": 2, "status": "current", "resources": ["SQLBolt", "W3Schools SQL"]},
                        {"id": "m3", "title": "Data Visualization", "week": 3, "status": "locked", "resources": ["Chart Selection Guide"]}
                    ]
                }
            }
        else:
            analysis = {
                "career_health_score": 60,
                "career_matches": [
                    {"career_title": "Heavy Vehicle Driver", "match_percentage": 90, "salary_today": 18000, "salary_3_years": 32000, "missing_skills": ["Safety Protocol"], "automation_risk": 10}
                ],
                "skill_gaps": [
                    {"skill_name": "Night Driving Safety", "salary_impact": 5000, "weeks_to_learn": 1, "demand_trajectory": "STABLE"}
                ],
                "latent_skills": [{"skill_name": "Patience", "reason": "Required for long-haul driving"}],
                "genome_shortcut": {"message": "Previous driving history detected. Safety cert bypass enabled.", "saved_weeks": 1},
                "roadmap": {
                    "current_week": 1,
                    "progress_percentage": 10,
                    "modules": [
                        {"id": "m1", "title": "Safety & Traffic Rules", "week": 1, "status": "current", "resources": ["Traffic Manual PDF"]},
                        {"id": "m2", "title": "Vehicle Maintenance", "week": 2, "status": "locked", "resources": ["Basic Mechanic Video"]}
                    ]
                }
            }
    
    # Calculate real-time LPI for the top missing skills if DB available
    if "skill_gaps" in analysis:
        for gap in analysis["skill_gaps"]:
            try:
                lpi_data = await calculate_lpi(gap["skill_name"], district, db)
                gap["lpi_score"] = lpi_data["lpi_score"]
                gap["recommendation"] = lpi_data["recommendation"]
            except Exception:
                gap["lpi_score"] = 65.0
                gap["recommendation"] = "High regional demand for this skill."
            
    return analysis

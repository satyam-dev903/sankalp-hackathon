from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.database import get_db
from app.models.skill import SkillDemand
from app.models.user import User, UserType

router = APIRouter()

@router.get("/stats")
async def get_govt_stats(district: str = "Nagpur", db: AsyncSession = Depends(get_db)):
    # Total Workers, Registered Trainers, etc.
    # In a real app, we'd query the counts
    return {
        "total_workers": 12500,
        "certified_trainers": 450,
        "training_centers": 24,
        "active_jobs": 850
    }

@router.get("/skill-gaps")
async def get_skill_gaps(district: str = "Nagpur", db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SkillDemand).where(SkillDemand.district == district))
    demands = result.scalars().all()
    
    return {
        "heatmap": [
            {
                "skill": d.skill_name,
                "demand": d.demand_count,
                "supply": d.supply_count,
                "gap": d.demand_count - d.supply_count,
                "lpi": (d.demand_count / (d.supply_count + 1)) * 10 # Simple index
            } for d in demands
        ]
    }

@router.get("/demand-forecast")
async def forecast_demand(district: str = "Nagpur"):
    # Mock forecasting
    return {
        "forecast": [
            {"month": "Apr", "demand": 1200},
            {"month": "May", "demand": 1400},
            {"month": "Jun", "demand": 1100},
            {"month": "Jul", "demand": 1600}
        ]
    }

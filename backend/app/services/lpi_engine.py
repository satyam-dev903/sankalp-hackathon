from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.models.skill import SkillDemand
from app.models.job import Job
from typing import Optional

DISTRICT_MEDIAN_SALARY = {
    "nagpur": 14000,
    "lucknow": 12000,
    "default": 13000,
}

async def calculate_lpi(
    skill_name: str,
    district: str,
    db: AsyncSession,
) -> dict:
    result = await db.execute(
        select(SkillDemand).where(
            SkillDemand.district.ilike(f"%{district}%"),
            SkillDemand.skill_name.ilike(f"%{skill_name}%")
        ).limit(1)
    )
    demand_data = result.scalar_one_or_none()

    demand_count = demand_data.demand_count if demand_data else 30
    supply_count = demand_data.supply_count if (demand_data and demand_data.supply_count > 0) else 50
    avg_salary = demand_data.avg_salary if demand_data else 15000

    f_score = min(demand_count / 500 * 100, 100)
    ds_ratio = demand_count / supply_count
    d_score = min(ds_ratio / 3 * 100, 100)
    
    median = DISTRICT_MEDIAN_SALARY.get(district.lower(), DISTRICT_MEDIAN_SALARY["default"])
    uplift = (avg_salary - median) / median
    s_score = min(max(uplift * 200 + 50, 0), 100)
    
    p_score = 75.0
    lpi_score = (0.38 * f_score) + (0.30 * d_score) + (0.22 * s_score) + (0.10 * p_score)

    return {
        "skill_name": skill_name,
        "lpi_score": round(lpi_score, 1),
        "recommendation": "HIGH PRIORITY" if lpi_score > 60 else "MEDIUM PRIORITY",
        "avg_salary": avg_salary
    }

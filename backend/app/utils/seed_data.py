import asyncio
import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import AsyncSessionLocal, Base, engine
from app.models.job import JSJob, BCJob
from app.models.scheme import JSScheme, BCScheme
from app.models.skill import SkillDemand

async def seed():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        
    async with AsyncSessionLocal() as db:
        # Seed Jobs
        jobs = [
            BCJob(title="Plumber", company="Nagpur Water Works", district="Nagpur", state="Maharashtra", salary_min=15000, salary_max=25000, required_skills=["Plumbing", "Pipe Fitting"]),
            BCJob(title="Electrician", company="Tata Power", district="Lucknow", state="UP", salary_min=18000, salary_max=30000, required_skills=["Wiring", "Repair"]),
            JSJob(title="Data Entry Operator", company="Govt Office", district="Nagpur", state="Maharashtra", salary_min=12000, salary_max=18000, required_skills=["Excel", "Typing"]),
            JSJob(title="Data Analyst", company="Tech Solutions Patna", district="Patna", state="Bihar", salary_min=35000, salary_max=65000, required_skills=["EXCEL", "SQL", "PYTHON"]),
            BCJob(title="Heavy Vehicle Driver", company="Logistics Corp", district="Lucknow", state="UP", salary_min=20000, salary_max=35000, required_skills=["Driving", "Safety"])
        ]
        db.add_all(jobs)
        
        # Seed Schemes
        schemes = [
            BCScheme(name="MUDRA Loan", ministry="Finance", benefit="₹50k-5L Loan", eligibility={"age": "18+"}),
            BCScheme(name="PMKVY", ministry="Skill Dev", benefit="Free Training + Stipend", eligibility={"education": "10th Pass"}),
            JSScheme(name="Digital Bihar", ministry="Education", benefit="Free Coding Bootcamps", eligibility={"education": "Graduate"})
        ]
        db.add_all(schemes)
        
        # Seed Demand
        demand = [
            SkillDemand(district="Nagpur", state="Maharashtra", skill_name="Plumber", demand_count=120, supply_count=40, avg_salary=18000),
            SkillDemand(district="Lucknow", state="UP", skill_name="Electrician", demand_count=200, supply_count=80, avg_salary=22000)
        ]
        db.add_all(demand)
        
        await db.commit()
        print("Database seeded successfully!")

if __name__ == "__main__":
    asyncio.run(seed())

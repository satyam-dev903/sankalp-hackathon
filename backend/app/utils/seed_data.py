import asyncio
import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import AsyncSessionLocal, Base, engine
from app.models.job import Job
from app.models.scheme import Scheme
from app.models.skill import SkillDemand

async def seed():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        
    async with AsyncSessionLocal() as db:
        # Seed Jobs
        jobs = [
            Job(title="Plumber", company="Nagpur Water Works", district="Nagpur", state="Maharashtra", salary_min=15000, salary_max=25000, required_skills=["Plumbing", "Pipe Fitting"]),
            Job(title="Electrician", company="Tata Power", district="Lucknow", state="UP", salary_min=18000, salary_max=30000, required_skills=["Wiring", "Repair"]),
            Job(title="Data Entry Operator", company="Govt Office", district="Nagpur", state="Maharashtra", salary_min=12000, salary_max=18000, required_skills=["Excel", "Typing"])
        ]
        db.add_all(jobs)
        
        # Seed Schemes
        schemes = [
            Scheme(name="MUDRA Loan", ministry="Finance", benefit="₹50k-5L Loan", eligibility={"age": "18+"}),
            Scheme(name="PMKVY", ministry="Skill Dev", benefit="Free Training + Stipend", eligibility={"education": "10th Pass"})
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

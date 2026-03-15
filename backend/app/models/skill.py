import uuid
from datetime import datetime
from sqlalchemy import String, Float, Integer, DateTime, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID, JSONB
from app.database import Base

class SkillAssessment(Base):
    __tablename__ = "skill_assessments"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=False)
    career_health_score: Mapped[int] = mapped_column(Integer, default=0)
    career_matches: Mapped[list] = mapped_column(JSONB, default=list)
    skill_gaps: Mapped[list] = mapped_column(JSONB, default=list)
    latent_skills: Mapped[list] = mapped_column(JSONB, default=list)
    health_breakdown: Mapped[dict] = mapped_column(JSONB, default=dict)
    lpi_scores: Mapped[dict] = mapped_column(JSONB, default=dict)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class SkillDemand(Base):
    __tablename__ = "skill_demand"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    district: Mapped[str] = mapped_column(String(100), nullable=False)
    state: Mapped[str] = mapped_column(String(100), nullable=False)
    skill_name: Mapped[str] = mapped_column(String(200), nullable=False)
    nsqf_code: Mapped[str | None] = mapped_column(String(50))
    demand_count: Mapped[int] = mapped_column(Integer, default=0)
    supply_count: Mapped[int] = mapped_column(Integer, default=0)
    avg_salary: Mapped[int] = mapped_column(Integer, default=0)
    demand_trajectory: Mapped[str] = mapped_column(String(20), default="STABLE")
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

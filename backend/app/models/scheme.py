import uuid
from datetime import datetime
from sqlalchemy import String, DateTime, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID, JSONB
from app.database import Base

class JSScheme(Base):
    __tablename__ = "js_schemes"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(300), nullable=False)
    emoji: Mapped[str] = mapped_column(String(10), default="🏛️")
    ministry: Mapped[str] = mapped_column(String(200))
    benefit: Mapped[str] = mapped_column(String(500))
    benefit_hindi: Mapped[str | None] = mapped_column(String(500))
    eligibility: Mapped[dict] = mapped_column(JSONB, default=dict)
    apply_url: Mapped[str] = mapped_column(String(500))
    deadline: Mapped[datetime | None] = mapped_column(DateTime)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    color: Mapped[str] = mapped_column(String(20), default="#4F46E5")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class BCScheme(Base):
    __tablename__ = "bc_schemes"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(300), nullable=False)
    emoji: Mapped[str] = mapped_column(String(10), default="🏛️")
    ministry: Mapped[str] = mapped_column(String(200))
    benefit: Mapped[str] = mapped_column(String(500))
    benefit_hindi: Mapped[str | None] = mapped_column(String(500))
    eligibility: Mapped[dict] = mapped_column(JSONB, default=dict)
    apply_url: Mapped[str] = mapped_column(String(500))
    deadline: Mapped[datetime | None] = mapped_column(DateTime)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    color: Mapped[str] = mapped_column(String(20), default="#10B981")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

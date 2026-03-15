import uuid
from datetime import datetime
from sqlalchemy import String, DateTime, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID, JSONB
from app.database import Base

class Scheme(Base):
    __tablename__ = "schemes"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(300), nullable=False)
    emoji: Mapped[str] = mapped_column(String(10), default="🏛️")
    ministry: Mapped[str] = mapped_column(String(200))
    benefit: Mapped[str] = mapped_column(String(500))
    benefit_hindi: Mapped[str | None] = mapped_column(String(500))
    eligibility: Mapped[dict] = mapped_column(JSONB, default=dict)
    applicable_user_types: Mapped[list] = mapped_column(JSONB, default=list)
    applicable_states: Mapped[list] = mapped_column(JSONB, default=list)
    apply_url: Mapped[str] = mapped_column(String(500))
    deadline: Mapped[datetime | None] = mapped_column(DateTime)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    color: Mapped[str] = mapped_column(String(20), default="blue")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

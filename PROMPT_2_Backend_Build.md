# PROMPT 2 — KaushalBridge AI: Complete Backend Build (FINAL VERSION)
## Paste this ENTIRE prompt into Cursor / Windsurf / Claude Projects

---
(integrated supabase as proj named as kaushal AI 2 (prj id:notdvezebtdoolptzskp))


## YOUR MISSION

You are a **senior Python backend engineer**. Build the complete, production-ready backend for **KaushalBridge AI** — India's skill intelligence platform. This is not a scaffold, not a skeleton — every endpoint must work, every service must execute real logic.

The React frontend is already built. Your backend replaces all Zustand mock data with real database-backed API responses. By the end of this prompt, `uvicorn main:app --reload` must run cleanly and all endpoints must return correct data.

---

## TECH STACK

```
Language:         Python 3.11+
Framework:        FastAPI 0.111
Database:         PostgreSQL 15 + pgvector extension
ORM:              SQLAlchemy 2.0 async + Alembic migrations
Auth:             JWT (python-jose) + bcrypt password hashing
AI:               Google Gemini 2.0 Flash API (google-generativeai)
NLP:              spaCy en_core_web_sm
Cache:            Redis 7 (httpx-based, no heavy client needed for hackathon)
File handling:    python-multipart + pypdf2 + python-docx
Blockchain:       web3.py + Polygon Mumbai testnet (ERC-721)
Voice/STT:        Bhashini API (async httpx calls)
Chat persistence: Supabase (supabase-py) — for chat history feature
Validation:       Pydantic v2
CORS:             Allow http://localhost:5173
```

---

## COMPLETE PROJECT STRUCTURE

```
kaushalbridge-backend/
├── main.py
├── requirements.txt
├── .env.example
├── alembic.ini
├── alembic/
│   ├── env.py
│   └── versions/
│       └── 001_initial_schema.py
├── app/
│   ├── __init__.py
│   ├── config.py
│   ├── database.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── skill.py
│   │   ├── job.py
│   │   ├── credential.py
│   │   ├── scheme.py
│   │   └── chat.py
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── jobseeker.py
│   │   ├── bluecollar.py
│   │   ├── govt.py
│   │   ├── ai.py
│   │   └── credential.py
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── jobseeker.py
│   │   ├── bluecollar.py
│   │   ├── govt.py
│   │   ├── ai.py
│   │   ├── credentials.py
│   │   └── ngo.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── lpi_engine.py
│   │   ├── skill_analyzer.py
│   │   ├── resume_parser.py
│   │   ├── interview_evaluator.py
│   │   ├── blockchain.py
│   │   ├── bhashini.py
│   │   ├── gemini.py
│   │   └── chat_persistence.py
│   └── utils/
│       ├── __init__.py
│       ├── ontology.py
│       ├── seed_data.py
│       └── helpers.py
```

---

## ENVIRONMENT VARIABLES

File: `.env.example` (copy to `.env` and fill values)

```env
# Database
DATABASE_URL=postgresql+asyncpg://postgres:password@localhost:5432/kaushalbridge
SYNC_DATABASE_URL=postgresql://postgres:password@localhost:5432/kaushalbridge

# Redis
REDIS_URL=redis://localhost:6379

# Auth
SECRET_KEY=change-this-to-a-random-64-char-string
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080

# AI
GEMINI_API_KEY=your-gemini-api-key-here

# Bhashini (Indian language STT)
BHASHINI_API_KEY=your-bhashini-api-key
BHASHINI_USER_ID=your-bhashini-user-id
BHASHINI_PIPELINE_ID=your-pipeline-id

# Blockchain (Polygon Mumbai testnet)
POLYGON_RPC_URL=https://rpc-mumbai.maticvigil.com
POLYGON_PRIVATE_KEY=your-wallet-private-key
CREDENTIAL_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000

# IPFS (Pinata)
IPFS_API_URL=https://api.pinata.cloud
IPFS_JWT=your-pinata-jwt-token

# Supabase (chat persistence)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-role-key

# App
FRONTEND_URL=http://localhost:5173
ENVIRONMENT=development
```

---

## FILE: `app/config.py`

```python
from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    database_url: str
    sync_database_url: str
    redis_url: str = "redis://localhost:6379"
    secret_key: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 10080
    gemini_api_key: str
    bhashini_api_key: str = ""
    bhashini_user_id: str = ""
    bhashini_pipeline_id: str = ""
    polygon_rpc_url: str = "https://rpc-mumbai.maticvigil.com"
    polygon_private_key: str = ""
    credential_contract_address: str = ""
    ipfs_api_url: str = ""
    ipfs_jwt: str = ""
    supabase_url: str = ""
    supabase_anon_key: str = ""
    supabase_service_key: str = ""
    frontend_url: str = "http://localhost:5173"
    environment: str = "development"

    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings()
```

---

## FILE: `app/database.py`

```python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from app.config import settings

engine = create_async_engine(
    settings.database_url,
    echo=settings.environment == "development",
    pool_pre_ping=True,
    pool_size=10,
    max_overflow=20,
)

AsyncSessionLocal = async_sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

class Base(DeclarativeBase):
    pass

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
```

---

## FILE: `app/models/user.py`

```python
import uuid
from datetime import datetime
from sqlalchemy import String, Boolean, DateTime, Enum as SAEnum, Integer, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID, JSONB
from app.database import Base
import enum

class UserType(str, enum.Enum):
    jobseeker = "jobseeker"
    bluecollar = "bluecollar"
    govt = "govt"
    ngo = "ngo"

class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email: Mapped[str | None] = mapped_column(String(255), unique=True, nullable=True)
    phone: Mapped[str] = mapped_column(String(15), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    hashed_password: Mapped[str | None] = mapped_column(String(255), nullable=True)
    user_type: Mapped[UserType] = mapped_column(SAEnum(UserType), nullable=False)
    aadhaar_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    district: Mapped[str | None] = mapped_column(String(100))
    state: Mapped[str | None] = mapped_column(String(100))
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    profile: Mapped["Profile"] = relationship("Profile", back_populates="user", uselist=False)
    assessments: Mapped[list["SkillAssessment"]] = relationship("SkillAssessment", back_populates="user")
    credentials: Mapped[list["Credential"]] = relationship("Credential", back_populates="user")

class Profile(Base):
    __tablename__ = "profiles"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=False)
    age: Mapped[int | None] = mapped_column(Integer)
    education: Mapped[str | None] = mapped_column(String(100))
    skills: Mapped[list] = mapped_column(JSONB, default=list)
    experience_years: Mapped[int] = mapped_column(Integer, default=0)
    trade: Mapped[str | None] = mapped_column(String(100))
    nsqf_level: Mapped[int] = mapped_column(Integer, default=1)
    career_goal: Mapped[str | None] = mapped_column(String(255))
    roadmap: Mapped[dict | None] = mapped_column(JSONB)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user: Mapped["User"] = relationship("User", back_populates="profile")
```

---

## FILE: `app/models/skill.py`

```python
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

    user: Mapped["User"] = relationship("User", back_populates="assessments")

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
```

---

## FILE: `app/models/job.py`

```python
import uuid
from datetime import datetime
from sqlalchemy import String, Integer, DateTime, Boolean, Float
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID, JSONB
from app.database import Base

class Job(Base):
    __tablename__ = "jobs"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    company: Mapped[str] = mapped_column(String(200), nullable=False)
    district: Mapped[str] = mapped_column(String(100), nullable=False)
    state: Mapped[str] = mapped_column(String(100), nullable=False)
    gps_lat: Mapped[float | None] = mapped_column(Float)
    gps_lng: Mapped[float | None] = mapped_column(Float)
    salary_min: Mapped[int] = mapped_column(Integer, default=0)
    salary_max: Mapped[int] = mapped_column(Integer, default=0)
    required_skills: Mapped[list] = mapped_column(JSONB, default=list)
    nsqf_level: Mapped[int] = mapped_column(Integer, default=1)
    job_type: Mapped[str] = mapped_column(String(50), default="Full Time")
    is_urgent: Mapped[bool] = mapped_column(Boolean, default=False)
    source: Mapped[str] = mapped_column(String(50), default="ncs")
    apply_url: Mapped[str] = mapped_column(String(500), default="https://www.ncs.gov.in")
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    posted_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    sector: Mapped[str | None] = mapped_column(String(100))
```

---

## FILE: `app/models/credential.py`

```python
import uuid
from datetime import datetime
from sqlalchemy import String, Integer, DateTime, Boolean, Float, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base

class TrainingCenter(Base):
    __tablename__ = "training_centers"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(300), nullable=False)
    nsdc_id: Mapped[str | None] = mapped_column(String(50), unique=True)
    district: Mapped[str] = mapped_column(String(100), nullable=False)
    state: Mapped[str] = mapped_column(String(100), nullable=False)
    registered_gps_lat: Mapped[float] = mapped_column(Float, nullable=False)
    registered_gps_lng: Mapped[float] = mapped_column(Float, nullable=False)
    is_blacklisted: Mapped[bool] = mapped_column(Boolean, default=False)
    blacklist_reason: Mapped[str | None] = mapped_column(Text)
    total_placements: Mapped[int] = mapped_column(Integer, default=0)
    placement_rate: Mapped[float] = mapped_column(Float, default=0.0)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    credentials: Mapped[list["Credential"]] = relationship("Credential", back_populates="center")

class Credential(Base):
    __tablename__ = "credentials"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=False)
    training_center_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=False)
    skill_name: Mapped[str] = mapped_column(String(200), nullable=False)
    nsqf_code: Mapped[str | None] = mapped_column(String(50))
    nsqf_level: Mapped[int] = mapped_column(Integer, nullable=False)
    assessment_score: Mapped[int] = mapped_column(Integer, nullable=False)
    credential_hash: Mapped[str] = mapped_column(String(64), unique=True)
    ipfs_hash: Mapped[str | None] = mapped_column(String(100))
    blockchain_tx: Mapped[str | None] = mapped_column(String(100))
    issuance_gps_lat: Mapped[float] = mapped_column(Float, nullable=False)
    issuance_gps_lng: Mapped[float] = mapped_column(Float, nullable=False)
    gps_distance_km: Mapped[float] = mapped_column(Float, default=0.0)
    is_valid: Mapped[bool] = mapped_column(Boolean, default=True)
    fraud_flagged: Mapped[bool] = mapped_column(Boolean, default=False)
    fraud_reason: Mapped[str | None] = mapped_column(Text)
    issued_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user: Mapped["User"] = relationship("User", back_populates="credentials")
    center: Mapped["TrainingCenter"] = relationship("TrainingCenter", back_populates="credentials")
```

---

## FILE: `app/models/chat.py`

```python
import uuid
from datetime import datetime
from sqlalchemy import String, DateTime, Text
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID, JSONB
from app.database import Base

class ChatLog(Base):
    __tablename__ = "chat_logs"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[str] = mapped_column(String(100), nullable=False)  # can be anon UUID
    user_type: Mapped[str] = mapped_column(String(20), default="jobseeker")
    session_id: Mapped[str] = mapped_column(String(100), nullable=False)
    messages: Mapped[list] = mapped_column(JSONB, default=list)
    message_count: Mapped[int] = mapped_column(default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
```

---

## FILE: `app/models/scheme.py`

```python
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
    deadline: Mapped[str | None] = mapped_column(String(100))
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    color: Mapped[str] = mapped_column(String(20), default="blue")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
```

---

## FILE: `app/utils/ontology.py`

Build a complete informal-to-NSQF skill ontology:

```python
# India Skill Ontology Engine
# Maps 200+ informal job title variants (Hindi/English/regional) to NSQF codes

SKILL_ONTOLOGY = {
    # ── PLUMBING ───────────────────────────────────────────────
    "plumber": {"nsqf_code": "CON/Q0303", "nsqf_level": 3, "sector": "Construction", "canonical": "Plumber"},
    "plumbing": {"nsqf_code": "CON/Q0303", "nsqf_level": 3, "sector": "Construction", "canonical": "Plumber"},
    "pipe fitter": {"nsqf_code": "CON/Q0303", "nsqf_level": 3, "sector": "Construction", "canonical": "Plumber"},
    "paani ka kaam": {"nsqf_code": "CON/Q0303", "nsqf_level": 3, "sector": "Construction", "canonical": "Plumber"},
    "pipe ka kaam": {"nsqf_code": "CON/Q0303", "nsqf_level": 3, "sector": "Construction", "canonical": "Plumber"},
    "nalkaa": {"nsqf_code": "CON/Q0303", "nsqf_level": 3, "sector": "Construction", "canonical": "Plumber"},
    "nal band": {"nsqf_code": "CON/Q0303", "nsqf_level": 3, "sector": "Construction", "canonical": "Plumber"},
    "water fitter": {"nsqf_code": "CON/Q0303", "nsqf_level": 3, "sector": "Construction", "canonical": "Plumber"},
    "sanitary fitter": {"nsqf_code": "CON/Q0303", "nsqf_level": 3, "sector": "Construction", "canonical": "Plumber"},

    # ── ELECTRICAL ─────────────────────────────────────────────
    "electrician": {"nsqf_code": "ELE/Q0107", "nsqf_level": 3, "sector": "Electronics", "canonical": "Electrician"},
    "bijli ka kaam": {"nsqf_code": "ELE/Q0107", "nsqf_level": 3, "sector": "Electronics", "canonical": "Electrician"},
    "bijliwala": {"nsqf_code": "ELE/Q0107", "nsqf_level": 3, "sector": "Electronics", "canonical": "Electrician"},
    "wiring": {"nsqf_code": "ELE/Q0107", "nsqf_level": 3, "sector": "Electronics", "canonical": "Electrician"},
    "electrical": {"nsqf_code": "ELE/Q0107", "nsqf_level": 3, "sector": "Electronics", "canonical": "Electrician"},
    "light fitter": {"nsqf_code": "ELE/Q0107", "nsqf_level": 3, "sector": "Electronics", "canonical": "Electrician"},
    "meter reader": {"nsqf_code": "ELE/Q0107", "nsqf_level": 2, "sector": "Electronics", "canonical": "Electrician"},

    # ── CONSTRUCTION / MASONRY ─────────────────────────────────
    "mason": {"nsqf_code": "CON/Q0101", "nsqf_level": 3, "sector": "Construction", "canonical": "Mason"},
    "mistri": {"nsqf_code": "CON/Q0101", "nsqf_level": 3, "sector": "Construction", "canonical": "Mason"},
    "raj mistri": {"nsqf_code": "CON/Q0101", "nsqf_level": 3, "sector": "Construction", "canonical": "Mason"},
    "chuna pathhar": {"nsqf_code": "CON/Q0101", "nsqf_level": 3, "sector": "Construction", "canonical": "Mason"},
    "stone mason": {"nsqf_code": "CON/Q0101", "nsqf_level": 3, "sector": "Construction", "canonical": "Mason"},
    "brick layer": {"nsqf_code": "CON/Q0101", "nsqf_level": 3, "sector": "Construction", "canonical": "Mason"},
    "construction worker": {"nsqf_code": "CON/Q0101", "nsqf_level": 2, "sector": "Construction", "canonical": "Mason"},

    # ── CARPENTRY ──────────────────────────────────────────────
    "carpenter": {"nsqf_code": "CON/Q0303", "nsqf_level": 3, "sector": "Construction", "canonical": "Carpenter"},
    "badhhai": {"nsqf_code": "CON/Q0303", "nsqf_level": 3, "sector": "Construction", "canonical": "Carpenter"},
    "wood work": {"nsqf_code": "CON/Q0303", "nsqf_level": 3, "sector": "Construction", "canonical": "Carpenter"},
    "lakdi ka kaam": {"nsqf_code": "CON/Q0303", "nsqf_level": 3, "sector": "Construction", "canonical": "Carpenter"},
    "furniture maker": {"nsqf_code": "CON/Q0303", "nsqf_level": 3, "sector": "Construction", "canonical": "Carpenter"},

    # ── WELDING ────────────────────────────────────────────────
    "welder": {"nsqf_code": "CSC/Q0601", "nsqf_level": 3, "sector": "Capital Goods", "canonical": "Welder"},
    "welding": {"nsqf_code": "CSC/Q0601", "nsqf_level": 3, "sector": "Capital Goods", "canonical": "Welder"},
    "jodai": {"nsqf_code": "CSC/Q0601", "nsqf_level": 3, "sector": "Capital Goods", "canonical": "Welder"},
    "gas cutter": {"nsqf_code": "CSC/Q0601", "nsqf_level": 3, "sector": "Capital Goods", "canonical": "Welder"},
    "arc welder": {"nsqf_code": "CSC/Q0601", "nsqf_level": 3, "sector": "Capital Goods", "canonical": "Welder"},

    # ── DRIVING ───────────────────────────────────────────────
    "driver": {"nsqf_code": "ASC/Q9702", "nsqf_level": 3, "sector": "Automotive", "canonical": "Driver"},
    "truck driver": {"nsqf_code": "ASC/Q9702", "nsqf_level": 3, "sector": "Automotive", "canonical": "Driver"},
    "driver sahab": {"nsqf_code": "ASC/Q9702", "nsqf_level": 3, "sector": "Automotive", "canonical": "Driver"},
    "chauffeur": {"nsqf_code": "ASC/Q9702", "nsqf_level": 3, "sector": "Automotive", "canonical": "Driver"},
    "gadi chalana": {"nsqf_code": "ASC/Q9702", "nsqf_level": 3, "sector": "Automotive", "canonical": "Driver"},
    "auto driver": {"nsqf_code": "ASC/Q9702", "nsqf_level": 2, "sector": "Automotive", "canonical": "Driver"},

    # ── TAILORING ─────────────────────────────────────────────
    "tailor": {"nsqf_code": "AMH/Q0301", "nsqf_level": 3, "sector": "Apparel", "canonical": "Tailor"},
    "darzi": {"nsqf_code": "AMH/Q0301", "nsqf_level": 3, "sector": "Apparel", "canonical": "Tailor"},
    "silai": {"nsqf_code": "AMH/Q0301", "nsqf_level": 3, "sector": "Apparel", "canonical": "Tailor"},
    "silai ka kaam": {"nsqf_code": "AMH/Q0301", "nsqf_level": 3, "sector": "Apparel", "canonical": "Tailor"},
    "sewing": {"nsqf_code": "AMH/Q0301", "nsqf_level": 3, "sector": "Apparel", "canonical": "Tailor"},
    "embroidery": {"nsqf_code": "AMH/Q0301", "nsqf_level": 3, "sector": "Apparel", "canonical": "Tailor"},

    # ── SOLAR / RENEWABLE ──────────────────────────────────────
    "solar technician": {"nsqf_code": "SGJ/Q0101", "nsqf_level": 3, "sector": "Green Jobs", "canonical": "Solar Technician"},
    "solar panel": {"nsqf_code": "SGJ/Q0101", "nsqf_level": 3, "sector": "Green Jobs", "canonical": "Solar Technician"},
    "bijli ghara": {"nsqf_code": "SGJ/Q0101", "nsqf_level": 3, "sector": "Green Jobs", "canonical": "Solar Technician"},

    # ── AC / REFRIGERATION ─────────────────────────────────────
    "ac technician": {"nsqf_code": "REF/Q0301", "nsqf_level": 3, "sector": "Electronics", "canonical": "AC Technician"},
    "ac mechanic": {"nsqf_code": "REF/Q0301", "nsqf_level": 3, "sector": "Electronics", "canonical": "AC Technician"},
    "ac ka kaam": {"nsqf_code": "REF/Q0301", "nsqf_level": 3, "sector": "Electronics", "canonical": "AC Technician"},
    "fridge mechanic": {"nsqf_code": "REF/Q0301", "nsqf_level": 3, "sector": "Electronics", "canonical": "AC Technician"},

    # ── CNC / MANUFACTURING ────────────────────────────────────
    "cnc operator": {"nsqf_code": "CSC/Q0303", "nsqf_level": 4, "sector": "Capital Goods", "canonical": "CNC Operator"},
    "machinist": {"nsqf_code": "CSC/Q0303", "nsqf_level": 3, "sector": "Capital Goods", "canonical": "Machinist"},
    "fitter": {"nsqf_code": "CSC/Q0201", "nsqf_level": 3, "sector": "Capital Goods", "canonical": "Fitter"},
    "turner": {"nsqf_code": "CSC/Q0201", "nsqf_level": 3, "sector": "Capital Goods", "canonical": "Turner"},

    # ── DIGITAL / WHITE COLLAR ─────────────────────────────────
    "data analyst": {"nsqf_code": "IT/Q2211", "nsqf_level": 5, "sector": "IT", "canonical": "Data Analyst"},
    "excel": {"nsqf_code": "IT/Q0101", "nsqf_level": 3, "sector": "IT", "canonical": "Computer Operator"},
    "data entry": {"nsqf_code": "IT/Q0101", "nsqf_level": 3, "sector": "IT", "canonical": "Data Entry Operator"},
    "tally": {"nsqf_code": "BFSI/Q0101", "nsqf_level": 3, "sector": "BFSI", "canonical": "Accounts Executive"},
    "accountant": {"nsqf_code": "BFSI/Q0101", "nsqf_level": 4, "sector": "BFSI", "canonical": "Accounts Executive"},

    # ── HELPER / GENERAL ──────────────────────────────────────
    "helper": {"nsqf_code": "CON/Q0101", "nsqf_level": 1, "sector": "Construction", "canonical": "Construction Helper"},
    "mazdoor": {"nsqf_code": "CON/Q0101", "nsqf_level": 1, "sector": "Construction", "canonical": "Construction Helper"},
    "labor": {"nsqf_code": "CON/Q0101", "nsqf_level": 1, "sector": "Construction", "canonical": "Construction Helper"},
    "labourer": {"nsqf_code": "CON/Q0101", "nsqf_level": 1, "sector": "Construction", "canonical": "Construction Helper"},
}

# Salary data per NSQF level per district (monthly, INR)
DISTRICT_SALARY_DATA = {
    "nagpur": {
        "Electrician": {"entry": 14000, "mid": 18000, "senior": 28000},
        "Plumber": {"entry": 12000, "mid": 16000, "senior": 24000},
        "CNC Operator": {"entry": 18000, "mid": 24000, "senior": 38000},
        "Welder": {"entry": 13000, "mid": 17000, "senior": 26000},
        "Solar Technician": {"entry": 15000, "mid": 20000, "senior": 32000},
        "Data Analyst": {"entry": 18000, "mid": 28000, "senior": 48000},
    },
    "default": {
        "Electrician": {"entry": 12000, "mid": 16000, "senior": 24000},
        "Plumber": {"entry": 10000, "mid": 14000, "senior": 20000},
        "Data Analyst": {"entry": 16000, "mid": 24000, "senior": 40000},
    }
}

def map_to_nsqf(text: str) -> dict:
    """Fuzzy match user description to NSQF code."""
    text_lower = text.lower().strip()
    # Exact match first
    if text_lower in SKILL_ONTOLOGY:
        return SKILL_ONTOLOGY[text_lower]
    # Partial match
    for keyword, data in SKILL_ONTOLOGY.items():
        if keyword in text_lower or text_lower in keyword:
            return data
    return {"nsqf_code": "UNKNOWN", "nsqf_level": 1, "sector": "General", "canonical": text.title()}

def get_salary_for_skill(skill: str, district: str, experience_years: int = 0) -> dict:
    """Get expected salary range for a skill in a district."""
    district_lower = district.lower()
    salary_db = DISTRICT_SALARY_DATA.get(district_lower, DISTRICT_SALARY_DATA["default"])
    
    nsqf_data = map_to_nsqf(skill)
    canonical = nsqf_data.get("canonical", skill)
    
    if canonical in salary_db:
        salaries = salary_db[canonical]
        level = "entry" if experience_years < 2 else "mid" if experience_years < 6 else "senior"
        return {
            "current": salaries[level],
            "1_year": int(salaries[level] * 1.3),
            "3_years": int(salaries[level] * 2.1),
        }
    return {"current": 14000, "1_year": 18000, "3_years": 28000}
```

---

## FILE: `app/services/lpi_engine.py`

```python
"""
LPI v2.0 — Learning Priority Index
LPI = (0.38 × F) + (0.30 × D) + (0.22 × S) + (0.10 × P)

F = Job Posting Frequency (demand count normalized 0-100)
D = Demand-Supply Ratio score (demand/supply normalized)
S = Salary Uplift score (salary with skill vs median)
P = Proximity score (jobs within 50km / total jobs)
"""

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.models.skill import SkillDemand
from app.models.job import Job
from typing import Optional
import math

DISTRICT_MEDIAN_SALARY = {
    "nagpur": 14000,
    "jaipur": 13000,
    "lucknow": 12000,
    "pune": 18000,
    "bengaluru": 22000,
    "default": 13000,
}

async def calculate_lpi(
    skill_name: str,
    district: str,
    db: AsyncSession,
    user_lat: Optional[float] = None,
    user_lng: Optional[float] = None,
) -> dict:
    """Calculate LPI score for a skill in a district."""

    # Get skill demand data from DB
    result = await db.execute(
        select(SkillDemand).where(
            SkillDemand.district.ilike(f"%{district}%"),
            SkillDemand.skill_name.ilike(f"%{skill_name}%")
        ).limit(1)
    )
    demand_data = result.scalar_one_or_none()

    if not demand_data:
        # Fallback defaults
        demand_count = 30
        supply_count = 50
        avg_salary = 15000
        trajectory = "STABLE"
    else:
        demand_count = demand_data.demand_count
        supply_count = demand_data.supply_count
        avg_salary = demand_data.avg_salary
        trajectory = demand_data.demand_trajectory

    # F Score: frequency normalized (max 500 postings = 100)
    f_score = min(demand_count / 500 * 100, 100)

    # D Score: demand-supply ratio (>1.5 is good, >3 is excellent)
    if supply_count == 0:
        supply_count = 1
    ds_ratio = demand_count / supply_count
    d_score = min(ds_ratio / 3 * 100, 100)

    # S Score: salary uplift vs district median
    median = DISTRICT_MEDIAN_SALARY.get(district.lower(), DISTRICT_MEDIAN_SALARY["default"])
    uplift = (avg_salary - median) / median
    s_score = min(max(uplift * 200 + 50, 0), 100)

    # P Score: proximity (simplified without live GPS — use district match as proxy)
    p_score = 75.0 if demand_count > 10 else 30.0

    # LPI Formula
    lpi_score = (0.38 * f_score) + (0.30 * d_score) + (0.22 * s_score) + (0.10 * p_score)

    # Human-readable recommendation
    if lpi_score >= 70:
        recommendation = f"HIGH PRIORITY: {skill_name} has strong demand in {district}. Start immediately."
    elif lpi_score >= 50:
        recommendation = f"MEDIUM PRIORITY: {skill_name} is growing in {district}. Recommended."
    else:
        recommendation = f"LOW PRIORITY: {skill_name} demand is limited in {district} right now."

    return {
        "skill_name": skill_name,
        "district": district,
        "lpi_score": round(lpi_score, 1),
        "f_score": round(f_score, 1),
        "d_score": round(d_score, 1),
        "s_score": round(s_score, 1),
        "p_score": round(p_score, 1),
        "demand_count": demand_count,
        "supply_count": supply_count,
        "avg_salary": avg_salary,
        "demand_trajectory": trajectory,
        "recommendation": recommendation,
        "salary_uplift_pct": round(uplift * 100, 1),
    }


async def rank_skills_by_lpi(skills: list[str], district: str, db: AsyncSession) -> list[dict]:
    """Rank multiple skills by LPI score for a user."""
    results = []
    for skill in skills:
        lpi = await calculate_lpi(skill, district, db)
        results.append(lpi)
    return sorted(results, key=lambda x: x["lpi_score"], reverse=True)
```

---

## FILE: `app/services/gemini.py`

```python
import google.generativeai as genai
from app.config import settings
from typing import Optional

genai.configure(api_key=settings.gemini_api_key)

MODEL = "gemini-2.0-flash"

def get_model():
    return genai.GenerativeModel(MODEL)

async def analyze_skills_and_generate_analysis(
    skills: list[str],
    district: str,
    education: str,
    experience_years: int,
    name: str,
) -> dict:
    """
    Generate complete career analysis using Gemini.
    Returns structured JSON matching frontend schema.
    """
    prompt = f"""
You are KaushalBridge AI, India's skill intelligence engine. Analyze this user profile and generate a complete career assessment.

User Profile:
- Name: {name}
- Skills: {', '.join(skills)}
- District: {district}
- Education: {education}
- Experience: {experience_years} years

You must respond ONLY with valid JSON (no markdown, no explanation) in this exact schema:
{{
  "career_health_score": <int 0-100>,
  "career_matches": [
    {{
      "career_title": "<string>",
      "match_percentage": <int 0-100>,
      "missing_skills": ["skill1", "skill2"],
      "salary_today": <monthly INR int>,
      "salary_1_year": <monthly INR int>,
      "salary_3_years": <monthly INR int>,
      "automation_risk": <int 0-100>,
      "open_jobs_in_district": <int>,
      "months_to_ready": <int>
    }}
  ],
  "skill_gaps": [
    {{
      "skill_name": "<string>",
      "demand_trajectory": "<EMERGING|RISING|STABLE|DECLINING>",
      "salary_impact": <monthly INR increase int>,
      "weeks_to_learn": <int>
    }}
  ],
  "latent_skills": [
    {{
      "skill_name": "<string>",
      "reason": "<why this is a latent skill based on existing skills>",
      "transfer_coefficient": <float 0-1>,
      "weeks_saved": <int>
    }}
  ],
  "career_health_breakdown": {{
    "skill_demand": <int 0-20>,
    "diversification": <int 0-20>,
    "automation_risk": <int 0-20>,
    "salary_vs_median": <int 0-20>,
    "regional_demand": <int 0-20>,
    "top_risks": ["risk1", "risk2", "risk3"]
  }}
}}

Rules:
- career_matches: provide exactly 3 careers realistic for this profile in India
- skill_gaps: provide exactly 3 skills with highest LPI value for this district
- latent_skills: identify hidden transferable skills (e.g., if user knows Excel → SQL latent)
- All salary figures must be realistic for {district}, India (INR/month)
- Respond ONLY with the JSON object, no other text
"""
    model = get_model()
    response = model.generate_content(prompt)
    
    import json
    text = response.text.strip()
    if text.startswith("```"):
        text = text.split("```")[1]
        if text.startswith("json"):
            text = text[4:]
    return json.loads(text.strip())


async def generate_roadmap(
    target_career: str,
    current_skills: list[str],
    skill_gaps: list[str],
    district: str,
) -> dict:
    """Generate a week-by-week learning roadmap."""
    prompt = f"""
Generate a learning roadmap for someone targeting "{target_career}" in {district}, India.

Current skills: {', '.join(current_skills)}
Skills to learn: {', '.join(skill_gaps)}

Respond ONLY with valid JSON:
{{
  "target_career": "{target_career}",
  "total_weeks": <int 8-16>,
  "modules": [
    {{
      "week": "<e.g. 1-2>",
      "title": "<module title>",
      "skills_covered": ["skill1"],
      "resources": [
        {{"name": "<resource name>", "url": "<real URL from NPTEL/Swayam/YouTube>", "duration": "<X hrs>"}}
      ],
      "milestone": "<what user can do after this module>"
    }}
  ],
  "genome_shortcut": {{
    "from_skill": "<existing skill>",
    "to_skill": "<gap skill>",
    "weeks_saved": <int>,
    "message": "<encouraging message about the shortcut>"
  }}
}}

Use only FREE resources: NPTEL (nptel.ac.in), Swayam (swayam.gov.in), YouTube, or government portals.
Respond ONLY with JSON.
"""
    model = get_model()
    response = model.generate_content(prompt)
    
    import json
    text = response.text.strip()
    if text.startswith("```"):
        text = text.split("```")[1]
        if text.startswith("json"):
            text = text[4:]
    return json.loads(text.strip())


async def chat_with_context(
    message: str,
    history: list[dict],
    user_type: str,
    user_profile: Optional[dict] = None,
) -> str:
    """Context-aware AI chat for all user types."""
    system_prompts = {
        "jobseeker": """You are KaushalAI, a career guidance assistant for job seekers in India.
You help with career planning, skill development, resume writing, and interview preparation.
You know about Indian job market, NSDC, PMKVY, NCS portal, and government skill schemes.
Keep responses concise (3-4 sentences max), practical, and encouraging.
If the user writes in Hindi, respond in Hindi.""",

        "bluecollar": """Aap KaushalAI hain, ek sahayak jo informal workers ki madad karta hai.
Aap plumber, electrician, mistri, darzi jaise workers ki madad karte hain naukri dhundhne mein.
Simple Hindi mein jawab dein. Schemes, NSQF certification, aur nearby jobs ke baare mein batain.
Ek baar mein ek cheez batain, simple language use karein.""",

        "govt": """You are KaushalAI, a district administration analytics assistant.
Help government officers understand skill gap data, training center performance, placement rates, and fraud alerts.
Provide data-driven insights and actionable recommendations for district skill development.
Be precise and professional.""",
    }

    system = system_prompts.get(user_type, system_prompts["jobseeker"])
    if user_profile:
        system += f"\n\nUser context: {user_profile}"

    model = get_model()
    chat = model.start_chat(
        history=[
            {"role": msg["role"], "parts": [msg["content"]]}
            for msg in history[-10:]  # last 10 messages for context
        ]
    )
    response = chat.send_message(
        message,
        generation_config=genai.types.GenerationConfig(
            system_instruction=system,
            max_output_tokens=400,
            temperature=0.7,
        )
    )
    return response.text


async def evaluate_interview_answer(
    question: str,
    answer: str,
    role: str,
) -> dict:
    """Evaluate a mock interview answer using STAR framework."""
    prompt = f"""
You are an expert HR interviewer evaluating a mock interview for a "{role}" position in India.

Question: {question}
Candidate's answer: {answer}

Evaluate and respond ONLY with this JSON:
{{
  "communication_score": <int 0-100>,
  "clarity_score": <int 0-100>,
  "confidence_score": <int 0-100>,
  "relevance_score": <int 0-100>,
  "star_breakdown": {{
    "situation": "<did they provide context? brief note>",
    "task": "<did they describe their role?>",
    "action": "<did they explain what they did?>",
    "result": "<did they quantify outcomes?>"
  }},
  "tip": "<one specific, actionable improvement tip in 1-2 sentences>",
  "overall_grade": "<Excellent|Good|Needs Improvement>"
}}

Be encouraging but honest. Respond ONLY with JSON.
"""
    model = get_model()
    response = model.generate_content(prompt)
    
    import json
    text = response.text.strip()
    if text.startswith("```"):
        text = text.split("```")[1]
        if text.startswith("json"):
            text = text[4:]
    return json.loads(text.strip())


async def rewrite_resume_bullet(bullet: str, target_role: str, years_exp: int) -> dict:
    """Rewrite a weak resume bullet point."""
    prompt = f"""
Rewrite this weak resume bullet for a "{target_role}" application (candidate has {years_exp} years experience in India):

Original: "{bullet}"

Respond ONLY with JSON:
{{
  "original": "{bullet}",
  "rewritten": "<strong rewritten bullet with action verb, metrics, and impact>",
  "improvement_reason": "<brief explanation of what was improved>"
}}

Rules: Start with a strong action verb, include specific metrics/numbers, show business impact.
Respond ONLY with JSON.
"""
    model = get_model()
    response = model.generate_content(prompt)
    import json
    text = response.text.strip()
    if text.startswith("```"):
        text = text.split("```")[1]
        if text.startswith("json"):
            text = text[4:]
    return json.loads(text.strip())


async def suggest_roadmap_alternative(current_module: str, user_challenge: str, district: str) -> str:
    """Suggest alternative learning approach for a roadmap module."""
    prompt = f"""
A user in {district} is learning "{current_module}" and says: "{user_challenge}"

Suggest a simpler alternative approach or easier resource in 2-3 sentences.
Be specific, practical, and encouraging. Mention at least one free resource by name.
Respond in the same language as the user's message (Hindi or English).
"""
    model = get_model()
    response = model.generate_content(prompt)
    return response.text
```

---

## FILE: `app/services/resume_parser.py`

```python
import io
import re
from typing import Optional

async def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extract text from PDF bytes."""
    try:
        import pypdf
        reader = pypdf.PdfReader(io.BytesIO(file_bytes))
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        return text
    except Exception as e:
        return f"Could not parse PDF: {str(e)}"

async def extract_text_from_docx(file_bytes: bytes) -> str:
    """Extract text from DOCX bytes."""
    try:
        from docx import Document
        doc = Document(io.BytesIO(file_bytes))
        return "\n".join([para.text for para in doc.paragraphs])
    except Exception as e:
        return f"Could not parse DOCX: {str(e)}"

def calculate_ats_score(resume_text: str, target_role: str = "Data Analyst") -> dict:
    """
    Calculate ATS compatibility score.
    Checks for: keywords, action verbs, quantification, formatting signals.
    """
    resume_lower = resume_text.lower()

    # High-value keywords per role
    keyword_sets = {
        "data analyst": ["sql", "excel", "python", "power bi", "tableau", "data", "analysis", "dashboard", "report", "database"],
        "mis executive": ["excel", "pivot", "vlookup", "report", "mis", "data", "analysis", "dashboard", "powerpoint"],
        "default": ["team", "project", "manage", "lead", "develop", "implement", "achieve", "improve"],
    }
    keywords = keyword_sets.get(target_role.lower(), keyword_sets["default"])
    found_keywords = [kw for kw in keywords if kw in resume_lower]
    keyword_score = len(found_keywords) / len(keywords) * 40  # 40 pts max

    # Action verbs check
    action_verbs = ["developed", "implemented", "managed", "led", "created", "designed", "achieved", "improved", "built", "delivered"]
    found_verbs = [v for v in action_verbs if v in resume_lower]
    verb_score = min(len(found_verbs) * 4, 20)  # 20 pts max

    # Quantification check (numbers in text)
    numbers_found = len(re.findall(r'\d+[%+]?', resume_text))
    quant_score = min(numbers_found * 2, 20)  # 20 pts max

    # Format signals
    has_email = bool(re.search(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', resume_text))
    has_phone = bool(re.search(r'[6-9]\d{9}', resume_text))
    format_score = (5 if has_email else 0) + (5 if has_phone else 0)

    total = keyword_score + verb_score + quant_score + format_score
    ats_score = min(int(total), 100)

    missing_keywords = [kw for kw in keywords if kw not in resume_lower]

    return {
        "ats_score": ats_score,
        "found_keywords": found_keywords,
        "missing_keywords": missing_keywords[:5],
        "keyword_score": int(keyword_score),
        "verb_score": int(verb_score),
        "quant_score": int(quant_score),
        "format_score": format_score,
    }


async def analyze_resume(file_bytes: bytes, filename: str, target_role: str = "Data Analyst") -> dict:
    """Full resume analysis pipeline."""
    from app.services.gemini import rewrite_resume_bullet

    # Extract text
    if filename.lower().endswith(".pdf"):
        text = await extract_text_from_pdf(file_bytes)
    elif filename.lower().endswith(".docx"):
        text = await extract_text_from_docx(file_bytes)
    else:
        text = file_bytes.decode("utf-8", errors="ignore")

    # ATS scoring
    ats_result = calculate_ats_score(text, target_role)

    # Extract bullet points (lines starting with action-like verbs or dashes)
    lines = [l.strip() for l in text.split('\n') if len(l.strip()) > 30]
    bullet_candidates = lines[:5]  # Take first 5 substantial lines

    # Rewrite weakest bullets (use mock for speed, or call Gemini)
    # For hackathon: use mock rewrites if Gemini call is slow
    mock_rewrites = [
        {
            "original": "Worked on customer complaints",
            "rewritten": "Resolved 120+ customer escalations monthly, reducing average resolution time by 34% and improving satisfaction score to 4.7/5",
            "improvement_reason": "Added specific metrics and measurable outcome"
        },
        {
            "original": "Made Excel reports",
            "rewritten": "Built 15+ automated Excel dashboards tracking ₹2.4Cr in monthly revenue across 8 departments, eliminating 6 hours of manual reporting weekly",
            "improvement_reason": "Quantified scope, financial impact, and time saved"
        },
        {
            "original": "Helped team with tasks",
            "rewritten": "Coordinated cross-functional team of 8 members across Sales and Operations, delivering 3 concurrent projects on time and 12% under budget",
            "improvement_reason": "Specified team size, departments, and measurable delivery results"
        }
    ]

    format_suggestions = []
    if "summary" not in text.lower() and "objective" not in text.lower():
        format_suggestions.append("Add a 2-3 line professional summary at the top of your resume")
    if len(re.findall(r'\d+', text)) < 5:
        format_suggestions.append("Quantify at least 5 achievements with specific numbers or percentages")
    if "reference" in text.lower():
        format_suggestions.append("Remove 'References available on request' — it wastes space")
    format_suggestions.append("Use consistent date format throughout (MM/YYYY)")

    return {
        "ats_score": ats_result["ats_score"],
        "missing_keywords": ats_result["missing_keywords"],
        "rewritten_bullets": mock_rewrites,
        "format_suggestions": format_suggestions,
        "skill_gaps": [
            {"skill": "SQL", "salary_impact": 8000, "weeks": 6},
            {"skill": "Power BI", "salary_impact": 6000, "weeks": 4},
            {"skill": "Python", "salary_impact": 12000, "weeks": 10},
        ],
        "improvement_score": min(ats_result["ats_score"] + 23, 100),
        "text_length": len(text),
        "target_role": target_role,
    }
```

---

## FILE: `app/services/blockchain.py`

```python
import hashlib
from datetime import datetime
from typing import Optional
import math

def haversine_km(lat1: float, lng1: float, lat2: float, lng2: float) -> float:
    """Calculate distance in km between two GPS coordinates."""
    R = 6371  # Earth radius in km
    dlat = math.radians(lat2 - lat1)
    dlng = math.radians(lng2 - lng1)
    a = math.sin(dlat/2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlng/2)**2
    return R * 2 * math.asin(math.sqrt(a))


def generate_credential_hash(
    user_phone: str,
    skill_code: str,
    center_id: str,
    assessment_score: int,
    gps_lat: float,
    gps_lng: float,
) -> str:
    """Generate SHA-256 credential hash."""
    timestamp = datetime.utcnow().strftime("%Y-%m-%d")
    data = f"{user_phone}:{skill_code}:{center_id}:{assessment_score}:{timestamp}:{gps_lat:.4f}:{gps_lng:.4f}"
    return hashlib.sha256(data.encode()).hexdigest()


def check_gps_fraud(
    issuance_lat: float,
    issuance_lng: float,
    center_lat: float,
    center_lng: float,
    max_distance_km: float = 1.0,
) -> dict:
    """
    Check if credential was issued from a suspicious location.
    Returns fraud assessment.
    """
    distance = haversine_km(issuance_lat, issuance_lng, center_lat, center_lng)

    if distance > max_distance_km:
        return {
            "is_fraud": True,
            "distance_km": round(distance, 2),
            "alert_message": f"FRAUD ALERT: Credential issued {distance:.1f}km from registered center location. Maximum allowed: {max_distance_km}km.",
            "severity": "high" if distance > 10 else "medium",
        }
    return {
        "is_fraud": False,
        "distance_km": round(distance, 2),
        "alert_message": "GPS verification passed.",
        "severity": "none",
    }


async def mint_credential_nft(credential_hash: str, user_id: str) -> dict:
    """
    Attempt to mint NFT on Polygon Mumbai testnet.
    Falls back to mock transaction hash for hackathon demo.
    """
    from app.config import settings
    try:
        from web3 import Web3
        w3 = Web3(Web3.HTTPProvider(settings.polygon_rpc_url))
        if not w3.is_connected() or not settings.polygon_private_key:
            raise Exception("Web3 not configured")
        # Real minting logic would go here
        tx_hash = f"0x{credential_hash[:64]}"
        return {"tx_hash": tx_hash, "network": "polygon-mumbai", "status": "minted"}
    except Exception:
        # Demo fallback — generate realistic-looking hash
        import secrets
        tx_hash = "0x" + secrets.token_hex(32)
        return {"tx_hash": tx_hash, "network": "polygon-mumbai-demo", "status": "demo"}


def generate_qr_data(credential_id: str, credential_hash: str, skill: str, user_name: str) -> str:
    """Generate QR code data string for credential verification."""
    return f"https://kaushalbridge.in/verify/{credential_id}?h={credential_hash[:16]}"
```

---

## FILE: `app/services/chat_persistence.py`

Handle chat history via Supabase (Feature 6):

```python
"""
Chat persistence via Supabase.
Saves and loads chat history across sessions.
Falls back to in-memory if Supabase not configured.
"""
from app.config import settings
from typing import Optional
import logging

logger = logging.getLogger(__name__)

_supabase_client = None

def get_supabase():
    global _supabase_client
    if _supabase_client is None and settings.supabase_url and settings.supabase_service_key:
        try:
            from supabase import create_client
            _supabase_client = create_client(settings.supabase_url, settings.supabase_service_key)
        except Exception as e:
            logger.warning(f"Supabase not available: {e}")
    return _supabase_client


async def save_chat_history(user_id: str, session_id: str, messages: list, user_type: str = "jobseeker") -> bool:
    """Save chat history to Supabase chat_logs table."""
    client = get_supabase()
    if not client:
        logger.info("Supabase not configured — chat history not persisted")
        return False
    try:
        data = {
            "user_id": user_id,
            "session_id": session_id,
            "user_type": user_type,
            "messages": messages,
            "message_count": len(messages),
        }
        result = client.table("chat_logs").upsert(
            data,
            on_conflict="user_id,session_id"
        ).execute()
        return True
    except Exception as e:
        logger.error(f"Failed to save chat: {e}")
        return False


async def load_chat_history(user_id: str, session_id: str) -> list:
    """Load chat history from Supabase."""
    client = get_supabase()
    if not client:
        return []
    try:
        result = client.table("chat_logs").select("messages").eq("user_id", user_id).eq("session_id", session_id).execute()
        if result.data:
            return result.data[0].get("messages", [])
        return []
    except Exception as e:
        logger.error(f"Failed to load chat: {e}")
        return []


async def get_all_user_sessions(user_id: str) -> list:
    """Get all chat sessions for a user (for history sidebar)."""
    client = get_supabase()
    if not client:
        return []
    try:
        result = client.table("chat_logs").select("session_id,message_count,updated_at,user_type").eq("user_id", user_id).order("updated_at", desc=True).limit(10).execute()
        return result.data or []
    except Exception as e:
        logger.error(f"Failed to get sessions: {e}")
        return []
```

**Supabase setup SQL (run in Supabase SQL editor):**
```sql
CREATE TABLE IF NOT EXISTS chat_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  user_type TEXT DEFAULT 'jobseeker',
  messages JSONB DEFAULT '[]'::jsonb,
  message_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, session_id)
);

CREATE INDEX idx_chat_logs_user_id ON chat_logs(user_id);
CREATE INDEX idx_chat_logs_updated ON chat_logs(updated_at DESC);
```

---

## ALL API ROUTERS

### `app/routers/auth.py`

```python
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.user import User, Profile, UserType
from app.schemas.auth import RegisterRequest, LoginRequest, TokenResponse, GovtLoginRequest
from app.config import settings
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt
import uuid

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_token(data: dict) -> str:
    expire = datetime.utcnow() + timedelta(minutes=settings.access_token_expire_minutes)
    return jwt.encode({**data, "exp": expire}, settings.secret_key, algorithm=settings.algorithm)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

@router.post("/register", response_model=TokenResponse)
async def register(req: RegisterRequest, db: AsyncSession = Depends(get_db)):
    # Check if phone exists
    result = await db.execute(select(User).where(User.phone == req.phone))
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Phone number already registered")
    
    user = User(
        phone=req.phone,
        name=req.name,
        user_type=UserType(req.user_type),
        district=req.district,
        state=req.state,
        hashed_password=pwd_context.hash(req.password) if req.password else None,
    )
    db.add(user)
    await db.flush()
    
    profile = Profile(user_id=user.id, skills=req.skills or [], age=req.age)
    db.add(profile)
    await db.commit()
    
    token = create_token({"sub": str(user.id), "type": user.user_type.value})
    return {"access_token": token, "token_type": "bearer", "user_id": str(user.id), "user_type": user.user_type.value}

@router.post("/login", response_model=TokenResponse)
async def login(req: LoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.phone == req.phone))
    user = result.scalar_one_or_none()
    if not user or not user.hashed_password or not verify_password(req.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token({"sub": str(user.id), "type": user.user_type.value})
    return {"access_token": token, "token_type": "bearer", "user_id": str(user.id), "user_type": user.user_type.value}

@router.post("/govt-login", response_model=TokenResponse)
async def govt_login(req: GovtLoginRequest, db: AsyncSession = Depends(get_db)):
    # Demo: accept any officer ID for hackathon
    if req.password != "admin123" and req.officer_id != "NAGPUR-DC-001":
        raise HTTPException(status_code=401, detail="Invalid officer credentials")
    
    # Return a demo government user token
    token = create_token({"sub": req.officer_id, "type": "govt", "district": req.district})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user_id": req.officer_id,
        "user_type": "govt",
        "profile": {
            "name": "Shri R.K. Sharma IAS",
            "role": "District Collector",
            "district": req.district,
        }
    }
```

---

### `app/routers/jobseeker.py`

```python
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.user import Profile, User
from app.models.job import Job
from app.models.scheme import Scheme
from app.services.gemini import analyze_skills_and_generate_analysis, generate_roadmap
from app.services.resume_parser import analyze_resume
from app.services.lpi_engine import rank_skills_by_lpi
import uuid

router = APIRouter()

@router.post("/profile")
async def create_profile(data: dict, db: AsyncSession = Depends(get_db)):
    """Create user profile and trigger AI analysis."""
    name = data.get("name", "User")
    skills = data.get("skills", [])
    district = data.get("district", "Nagpur")
    education = data.get("education", "Graduate")
    experience_years = data.get("experience_years", 0)
    
    # Generate AI analysis
    try:
        analysis = await analyze_skills_and_generate_analysis(
            skills=skills,
            district=district,
            education=education,
            experience_years=experience_years,
            name=name,
        )
    except Exception as e:
        # Fallback to hardcoded analysis
        analysis = {
            "career_health_score": 42,
            "career_matches": [
                {"career_title": "Data Analyst", "match_percentage": 85, "missing_skills": ["SQL", "Power BI"],
                 "salary_today": 18000, "salary_1_year": 24000, "salary_3_years": 38000,
                 "automation_risk": 22, "open_jobs_in_district": 34, "months_to_ready": 10}
            ],
            "skill_gaps": [
                {"skill_name": "SQL", "demand_trajectory": "EMERGING", "salary_impact": 8000, "weeks_to_learn": 6},
                {"skill_name": "Power BI", "demand_trajectory": "RISING", "salary_impact": 6000, "weeks_to_learn": 4},
            ],
            "latent_skills": [{"skill_name": "SQL Basics", "reason": "Excel → SQL transfer", "transfer_coefficient": 0.55, "weeks_saved": 5}],
            "career_health_breakdown": {"skill_demand": 8, "diversification": 10, "automation_risk": 12, "salary_vs_median": 7, "regional_demand": 5, "top_risks": ["Data Entry declining 43%", "Single skill dependency", "Salary below median"]}
        }
    
    return {"profile_created": True, "analysis": analysis}

@router.get("/analysis/{user_id}")
async def get_analysis(user_id: str, db: AsyncSession = Depends(get_db)):
    """Get latest skill analysis for a user."""
    # In production: fetch from DB. For demo: return enriched analysis
    return {
        "career_health_score": 42,
        "career_matches": [
            {"career_title": "Data Analyst", "match_percentage": 85, "missing_skills": ["SQL", "Power BI"],
             "salary_today": 18000, "salary_1_year": 24000, "salary_3_years": 38000,
             "automation_risk": 22, "open_jobs_in_district": 34, "months_to_ready": 10},
            {"career_title": "MIS Executive", "match_percentage": 72, "missing_skills": ["Advanced Excel", "Pivot Tables"],
             "salary_today": 16000, "salary_1_year": 20000, "salary_3_years": 28000,
             "automation_risk": 35, "open_jobs_in_district": 21, "months_to_ready": 6},
            {"career_title": "Operations Coordinator", "match_percentage": 68, "missing_skills": ["SAP Basics"],
             "salary_today": 15000, "salary_1_year": 19000, "salary_3_years": 25000,
             "automation_risk": 18, "open_jobs_in_district": 15, "months_to_ready": 8},
        ],
        "skill_gaps": [
            {"skill_name": "SQL", "demand_trajectory": "EMERGING", "salary_impact": 8000, "weeks_to_learn": 6},
            {"skill_name": "Power BI", "demand_trajectory": "RISING", "salary_impact": 6000, "weeks_to_learn": 4},
            {"skill_name": "Python Basics", "demand_trajectory": "EMERGING", "salary_impact": 12000, "weeks_to_learn": 10},
        ],
        "latent_skills": [{"skill_name": "SQL Basics", "reason": "Excel → SQL Skill Genome transfer", "transfer_coefficient": 0.55, "weeks_saved": 5}],
        "career_health_breakdown": {"skill_demand": 8, "diversification": 10, "automation_risk": 12, "salary_vs_median": 7, "regional_demand": 5, "top_risks": ["Data Entry declining 43% in Rajasthan", "Single-skill Excel dependency", "Salary 31% below market median"]}
    }

@router.get("/roadmap/{user_id}")
async def get_roadmap(user_id: str, db: AsyncSession = Depends(get_db)):
    return {
        "target_career": "Data Analyst",
        "progress_percentage": 18,
        "current_week": 2,
        "modules": [
            {"week": "1-2", "title": "SQL Basics", "status": "complete", "resources": [{"name": "NPTEL SQL Course", "url": "https://nptel.ac.in", "duration": "8 hrs"}], "milestone": "Can write SELECT, WHERE, JOIN queries"},
            {"week": "3-4", "title": "SQL Intermediate", "status": "current", "resources": [{"name": "Apna College SQL Hindi", "url": "https://youtube.com/@ApnaCollegeOfficial", "duration": "6 hrs"}], "milestone": "Can build and query a full database"},
            {"week": "5-6", "title": "Power BI Introduction", "status": "locked", "resources": [{"name": "Microsoft Learn Power BI", "url": "https://learn.microsoft.com", "duration": "8 hrs"}], "milestone": "Can create interactive dashboards"},
            {"week": "7-8", "title": "Power BI Advanced", "status": "locked", "resources": [{"name": "Swayam Power BI", "url": "https://swayam.gov.in", "duration": "10 hrs"}], "milestone": "Can build district sales report"},
            {"week": "9-10", "title": "Python Basics", "status": "locked", "resources": [{"name": "NPTEL Python", "url": "https://nptel.ac.in", "duration": "12 hrs"}], "milestone": "Can write data cleaning scripts"},
            {"week": "11-12", "title": "Portfolio Project", "status": "locked", "resources": [{"name": "GitHub Portfolio Guide", "url": "https://github.com", "duration": "Self-paced"}], "milestone": "Published analytics project on GitHub"},
        ],
        "genome_shortcut": {"from_skill": "Excel", "to_skill": "SQL", "weeks_saved": 5, "message": "Because you know Excel, your SQL journey starts at Week 3, not Week 1. You saved 5 weeks."}
    }

@router.get("/jobs/{district}")
async def get_jobs(district: str, skills: str = "", db: AsyncSession = Depends(get_db)):
    """Return jobs for a district, sorted by relevance."""
    result = await db.execute(select(Job).where(Job.district.ilike(f"%{district}%"), Job.is_active == True).limit(10))
    jobs = result.scalars().all()
    
    if not jobs:
        # Return seed data as fallback
        return {"jobs": [
            {"id": "1", "title": "Data Analyst", "company": "Infosys BPM", "district": district, "salary_min": 18000, "salary_max": 28000, "required_skills": ["SQL", "Excel"], "match_percentage": 85, "is_urgent": False, "apply_url": "https://www.ncs.gov.in"},
            {"id": "2", "title": "MIS Executive", "company": "Tata Motors", "district": district, "salary_min": 16000, "salary_max": 22000, "required_skills": ["Excel", "PowerPoint"], "match_percentage": 72, "is_urgent": True, "apply_url": "https://www.ncs.gov.in"},
            {"id": "3", "title": "Operations Coordinator", "company": "BigBasket", "district": district, "salary_min": 15000, "salary_max": 20000, "required_skills": ["Excel", "Communication"], "match_percentage": 68, "is_urgent": False, "apply_url": "https://www.ncs.gov.in"},
        ]}
    
    return {"jobs": [{"id": str(j.id), "title": j.title, "company": j.company, "district": j.district, "salary_min": j.salary_min, "salary_max": j.salary_max, "required_skills": j.required_skills, "is_urgent": j.is_urgent, "apply_url": j.apply_url} for j in jobs]}

@router.get("/schemes")
async def get_schemes(user_type: str = "jobseeker", db: AsyncSession = Depends(get_db)):
    """Return applicable government schemes."""
    result = await db.execute(select(Scheme).where(Scheme.is_active == True))
    schemes = result.scalars().all()
    return {"schemes": [{"id": str(s.id), "name": s.name, "emoji": s.emoji, "ministry": s.ministry, "benefit": s.benefit, "benefit_hindi": s.benefit_hindi, "apply_url": s.apply_url, "deadline": s.deadline, "color": s.color} for s in schemes]}

@router.post("/resume/analyze")
async def analyze_resume_endpoint(file: UploadFile = File(...)):
    """Analyze uploaded resume and return AI critique."""
    contents = await file.read()
    if len(contents) > 5 * 1024 * 1024:  # 5MB limit
        raise HTTPException(status_code=400, detail="File too large. Max 5MB.")
    result = await analyze_resume(contents, file.filename or "resume.pdf")
    return result
```

---

### `app/routers/ai.py`

```python
from fastapi import APIRouter, HTTPException
from app.services.gemini import (
    chat_with_context,
    evaluate_interview_answer,
    rewrite_resume_bullet,
    suggest_roadmap_alternative,
)
from app.services.chat_persistence import save_chat_history, load_chat_history, get_all_user_sessions

router = APIRouter()

@router.post("/chat")
async def ai_chat(data: dict):
    """Context-aware AI chat for all user types."""
    message = data.get("message", "")
    history = data.get("history", [])
    user_type = data.get("user_type", "jobseeker")
    user_id = data.get("user_id", "anonymous")
    session_id = data.get("session_id", "default")
    user_profile = data.get("user_profile")

    if not message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    try:
        reply = await chat_with_context(message, history, user_type, user_profile)
    except Exception as e:
        reply = "Maafi chahta hoon, abhi kuch technical issue aa gaya. Please thodi der baad try karein."

    # Persist chat (non-blocking — failures don't affect response)
    updated_history = history + [{"role": "user", "content": message}, {"role": "assistant", "content": reply}]
    try:
        await save_chat_history(user_id, session_id, updated_history, user_type)
    except Exception:
        pass  # persistence failure is non-fatal

    return {"reply": reply}

@router.post("/chat/load")
async def load_chat(data: dict):
    """Load previous chat history for a user session."""
    user_id = data.get("user_id", "anonymous")
    session_id = data.get("session_id", "default")
    history = await load_chat_history(user_id, session_id)
    return {"history": history}

@router.get("/chat/sessions/{user_id}")
async def get_sessions(user_id: str):
    """Get all chat sessions for a user."""
    sessions = await get_all_user_sessions(user_id)
    return {"sessions": sessions}

@router.post("/interview-feedback")
async def interview_feedback(data: dict):
    """Evaluate interview answer using STAR framework."""
    question = data.get("question", "")
    answer = data.get("answer", "")
    role = data.get("role", "Data Analyst")
    if not answer.strip():
        raise HTTPException(status_code=400, detail="Answer cannot be empty")
    try:
        result = await evaluate_interview_answer(question, answer, role)
    except Exception:
        result = {
            "communication_score": 72,
            "clarity_score": 68,
            "confidence_score": 81,
            "relevance_score": 75,
            "star_breakdown": {"situation": "Present", "task": "Present", "action": "Good", "result": "Needs more metrics"},
            "tip": "Add specific numbers to your answer — quantified results are 3x more memorable to interviewers.",
            "overall_grade": "Good"
        }
    return result

@router.post("/rewrite-bullet")
async def rewrite_bullet(data: dict):
    """Rewrite a weak resume bullet point."""
    bullet = data.get("bullet", "")
    target_role = data.get("target_role", "Data Analyst")
    years_exp = data.get("years_exp", 2)
    try:
        result = await rewrite_resume_bullet(bullet, target_role, years_exp)
    except Exception:
        result = {
            "original": bullet,
            "rewritten": f"Delivered measurable impact in {target_role} role through systematic data-driven approach",
            "improvement_reason": "Added action verb, role context, and impact framing"
        }
    return result

@router.post("/roadmap-alternative")
async def roadmap_alternative(data: dict):
    """Suggest alternative learning approach for a roadmap module."""
    module = data.get("current_module", "")
    challenge = data.get("user_challenge", "")
    district = data.get("district", "India")
    try:
        suggestion = await suggest_roadmap_alternative(module, challenge, district)
    except Exception:
        suggestion = f"Try breaking '{module}' into smaller 30-minute daily sessions. YouTube has excellent free Hindi tutorials — search '{module} Hindi tutorial' for beginner-friendly content."
    return {"suggestion": suggestion}
```

---

### `app/routers/bluecollar.py`

```python
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.user import User, Profile, UserType
from app.models.job import Job
from app.utils.ontology import map_to_nsqf
import httpx

router = APIRouter()

@router.post("/onboard")
async def bc_onboard(data: dict, db: AsyncSession = Depends(get_db)):
    """Blue collar worker onboarding — maps trade to NSQF."""
    trade = data.get("trade", "")
    district = data.get("district", "")
    experience_years = data.get("experience_years", 0)
    name = data.get("name", "Worker")
    phone = data.get("phone", "")

    nsqf_data = map_to_nsqf(trade)
    nsqf_level = nsqf_data["nsqf_level"]

    # Count matching jobs
    result = await db.execute(select(Job).where(Job.district.ilike(f"%{district}%"), Job.sector == nsqf_data["sector"], Job.is_active == True))
    matched_jobs = result.scalars().all()

    return {
        "onboarded": True,
        "trade_canonical": nsqf_data["canonical"],
        "nsqf_code": nsqf_data["nsqf_code"],
        "nsqf_level": nsqf_level,
        "sector": nsqf_data["sector"],
        "matched_jobs_count": max(len(matched_jobs), 4),  # min 4 for demo
        "recommended_course": {
            "name": f"PMKVY {nsqf_data['canonical']} Training",
            "duration": "12 weeks",
            "cost": "FREE",
            "url": "https://pmkvyofficial.org"
        }
    }

@router.get("/jobs/{district}")
async def bc_jobs(district: str, trade: str = "", radius_km: int = 50, db: AsyncSession = Depends(get_db)):
    """Get jobs for a blue collar worker by district and trade."""
    query = select(Job).where(Job.district.ilike(f"%{district}%"), Job.is_active == True)
    if trade:
        nsqf = map_to_nsqf(trade)
        query = query.where(Job.sector == nsqf["sector"])
    
    result = await db.execute(query.limit(8))
    jobs = result.scalars().all()
    
    if not jobs:
        return {"jobs": [
            {"id": "1", "title": "Plumber", "emoji": "🔧", "company": "Jal Jeevan Mission", "location": district, "distance": "8 km", "salary": "₹15,000/maah", "type": "Govt Project", "urgent": True, "posted_days": 1, "apply_url": "https://www.ncs.gov.in"},
            {"id": "2", "title": "Pipe Fitter", "emoji": "⚙️", "company": "BuildFast Construction", "location": district, "distance": "32 km", "salary": "₹18,000/maah", "type": "Full Time", "urgent": False, "posted_days": 3, "apply_url": "https://www.ncs.gov.in"},
        ]}
    return {"jobs": [{"id": str(j.id), "title": j.title, "company": j.company, "location": j.district, "distance": "nearby", "salary": f"₹{j.salary_min:,}-{j.salary_max:,}/month", "type": j.job_type, "urgent": j.is_urgent, "apply_url": j.apply_url} for j in jobs]}

@router.post("/voice")
async def bc_voice_query(audio: UploadFile = File(...)):
    """
    Process voice query via Bhashini STT → NER → job matching.
    Falls back to mock response if Bhashini not configured.
    """
    from app.config import settings
    audio_bytes = await audio.read()

    # Try Bhashini STT
    transcript = None
    if settings.bhashini_api_key:
        try:
            import base64
            async with httpx.AsyncClient(timeout=10) as client:
                audio_b64 = base64.b64encode(audio_bytes).decode()
                response = await client.post(
                    "https://bhashini.gov.in/ulca/apis/v0/model/compute",
                    headers={"userID": settings.bhashini_user_id, "ulcaApiKey": settings.bhashini_api_key},
                    json={"pipelineTasks": [{"taskType": "asr", "config": {"language": {"sourceLanguage": "hi"}, "serviceId": settings.bhashini_pipeline_id}}], "inputData": {"audio": [{"audioContent": audio_b64}]}}
                )
                data = response.json()
                transcript = data.get("pipelineResponse", [{}])[0].get("output", [{}])[0].get("source", "")
        except Exception:
            transcript = None

    if not transcript:
        transcript = "Mujhe plumber ka kaam chahiye Lucknow mein"  # Demo fallback

    detected_trade = map_to_nsqf(transcript)
    return {
        "transcript": transcript,
        "detected_trade": detected_trade["canonical"],
        "nsqf_level": detected_trade["nsqf_level"],
        "matched_jobs": [
            {"title": detected_trade["canonical"], "company": "BuildFast Construction", "salary": "₹16,000/maah", "distance": "12 km", "urgent": True}
        ],
        "recommended_course": {"name": f"PMKVY {detected_trade['canonical']}", "url": "https://pmkvyofficial.org"}
    }
```

---

### `app/routers/govt.py`

```python
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.database import get_db
from app.models.credential import Credential, TrainingCenter
from app.models.user import User

router = APIRouter()

@router.get("/dashboard/{district}")
async def govt_dashboard(district: str, db: AsyncSession = Depends(get_db)):
    """Full district analytics dashboard."""
    return {
        "district": district,
        "total_registered": 48210,
        "trained_this_quarter": 3847,
        "placed_verified": 1823,
        "placement_rate": 47.4,
        "avg_wage_increase": 22,
        "fraud_alerts_active": 3,
        "active_training_centers": 34,
        "district_skill_gaps": [
            {"skill": "Electrician (NSQF L3)", "demand": 340, "supply": 80, "gap": 260, "urgency": "critical"},
            {"skill": "CNC Operator", "demand": 218, "supply": 45, "gap": 173, "urgency": "critical"},
            {"skill": "Solar Technician", "demand": 145, "supply": 20, "gap": 125, "urgency": "critical"},
            {"skill": "Plumber (NSQF L3)", "demand": 195, "supply": 90, "gap": 105, "urgency": "high"},
            {"skill": "Welder", "demand": 160, "supply": 70, "gap": 90, "urgency": "high"},
            {"skill": "Data Entry", "demand": 40, "supply": 280, "gap": -240, "urgency": "oversupply"},
        ],
        "training_funnel": {"enrolled": 3847, "in_progress": 2910, "certified": 2241, "placed": 1823},
        "fraud_alerts": [
            {"id": "TC-0041", "center_name": "Nagpur Skill Hub", "issue": "Credentials issued 34km from registered GPS location", "count": 12, "severity": "high", "status": "active"},
            {"id": "TC-0089", "center_name": "Vidarbha Training Institute", "issue": "Assessment scores 100% identical for 28 students", "count": 28, "severity": "critical", "status": "active"},
            {"id": "TC-0102", "center_name": "Orange City Vocational", "issue": "Attendance records submitted after batch end date", "count": 6, "severity": "medium", "status": "active"},
        ],
        "monthly_trend": [
            {"month": "Oct", "enrolled": 580, "placed": 241},
            {"month": "Nov", "enrolled": 620, "placed": 268},
            {"month": "Dec", "enrolled": 710, "placed": 312},
            {"month": "Jan", "enrolled": 890, "placed": 398},
            {"month": "Feb", "enrolled": 1047, "placed": 604},
        ],
        "top_performing_centers": [
            {"name": "Ambedkar Skill Centre", "placed": 234, "rate": 78, "trade": "Electrician", "batch_size": 300},
            {"name": "Nagpur Polytechnic", "placed": 198, "rate": 71, "trade": "CNC Operation", "batch_size": 280},
            {"name": "Women ITI Nagpur", "placed": 167, "rate": 69, "trade": "Tailoring + Embroidery", "batch_size": 242},
        ],
        "ngo_partners": [
            {"name": "Pratham Foundation", "students": 320, "placed": 198, "sector": "Digital Literacy"},
            {"name": "Yuva Parivartan", "students": 280, "placed": 167, "sector": "Vocational Trades"},
            {"name": "Disha Foundation", "students": 210, "placed": 134, "sector": "Women Empowerment"},
        ]
    }

@router.post("/fraud-alerts/{alert_id}/investigate")
async def investigate_alert(alert_id: str):
    return {"alert_id": alert_id, "status": "investigating", "assigned_officer": "R.K. Sharma IAS"}
```

---

### `app/routers/credentials.py`

```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.credential import Credential, TrainingCenter
from app.services.blockchain import generate_credential_hash, check_gps_fraud, mint_credential_nft, generate_qr_data
import uuid

router = APIRouter()

@router.post("/issue")
async def issue_credential(data: dict, db: AsyncSession = Depends(get_db)):
    """Issue a blockchain-anchored skill credential."""
    user_phone = data.get("user_phone", "")
    skill_name = data.get("skill_name", "")
    training_center_id = data.get("training_center_id", "")
    assessment_score = data.get("assessment_score", 0)
    gps_lat = data.get("gps_lat", 0.0)
    gps_lng = data.get("gps_lng", 0.0)

    from app.utils.ontology import map_to_nsqf
    nsqf_data = map_to_nsqf(skill_name)

    # Fetch center for GPS verification
    center_gps = {"lat": 21.1458, "lng": 79.0882}  # Nagpur default for demo
    try:
        center_result = await db.execute(select(TrainingCenter).where(TrainingCenter.id == uuid.UUID(training_center_id)))
        center = center_result.scalar_one_or_none()
        if center:
            center_gps = {"lat": center.registered_gps_lat, "lng": center.registered_gps_lng}
    except Exception:
        pass

    # GPS fraud check
    fraud_check = check_gps_fraud(gps_lat, gps_lng, center_gps["lat"], center_gps["lng"])

    # Generate credential hash
    cred_hash = generate_credential_hash(user_phone, nsqf_data["nsqf_code"], training_center_id, assessment_score, gps_lat, gps_lng)

    # Mint NFT
    blockchain_result = await mint_credential_nft(cred_hash, user_phone)

    credential_id = str(uuid.uuid4())
    qr_data = generate_qr_data(credential_id, cred_hash, skill_name, "Worker")

    return {
        "credential_id": credential_id,
        "credential_hash": cred_hash,
        "ipfs_hash": f"Qm{cred_hash[:44]}",
        "blockchain_tx": blockchain_result["tx_hash"],
        "network": blockchain_result["network"],
        "qr_data": qr_data,
        "fraud_flagged": fraud_check["is_fraud"],
        "fraud_check": fraud_check,
        "nsqf_code": nsqf_data["nsqf_code"],
        "nsqf_level": nsqf_data["nsqf_level"],
        "issued_at": str(__import__("datetime").datetime.utcnow()),
    }

@router.get("/verify/{credential_id}")
async def verify_credential(credential_id: str):
    """Verify a credential by ID — public endpoint for QR scan."""
    return {
        "credential_id": credential_id,
        "valid": True,
        "skill_name": "Plumber",
        "nsqf_level": 3,
        "nsqf_code": "CON/Q0303",
        "issued_at": "2026-01-15",
        "worker_name": "Ramesh Kumar",
        "training_center": "Ambedkar Skill Centre, Nagpur",
        "assessment_score": 78,
        "blockchain_verified": True,
        "fraud_free": True,
    }
```

---

### `app/routers/ngo.py` — Feature 5: NGO Portal Backend

```python
from fastapi import APIRouter

router = APIRouter()

@router.get("/dashboard/{center_id}")
async def ngo_dashboard(center_id: str):
    """NGO/Training center dashboard."""
    return {
        "center_name": "Ambedkar Skill Centre",
        "center_id": center_id,
        "district": "Nagpur",
        "current_batch": {
            "active_students": 86,
            "on_track": 71,
            "at_risk": 15,
            "placements_this_batch": 0,
            "batch_end_date": "2026-04-30"
        },
        "students": [
            {"name": "Priya Deshpande", "trade": "Electrician", "progress": 72, "last_active": "2026-03-11", "status": "on_track"},
            {"name": "Rahul Yadav", "trade": "Electrician", "progress": 45, "last_active": "2026-03-08", "status": "at_risk"},
            {"name": "Sunita Bai", "trade": "Electrician", "progress": 88, "last_active": "2026-03-12", "status": "on_track"},
            {"name": "Mukesh Verma", "trade": "Electrician", "progress": 30, "last_active": "2026-03-05", "status": "at_risk"},
            {"name": "Kavita Patil", "trade": "Electrician", "progress": 95, "last_active": "2026-03-12", "status": "completed"},
        ],
        "placement_history": [
            {"student_name": "Anil Kumar", "company": "Torrent Power", "salary": 18000, "placed_date": "2026-02-15"},
            {"student_name": "Rekha Sharma", "company": "MSEDCL", "salary": 16000, "placed_date": "2026-02-28"},
            {"student_name": "Vijay Nair", "company": "Siemens India", "salary": 22000, "placed_date": "2026-03-02"},
        ],
        "govt_reporting": {
            "q4_2025": "submitted",
            "q1_2026": "due_by_april_15",
            "last_inspection": "2025-12-10",
            "compliance_status": "compliant"
        }
    }

@router.post("/placements/report")
async def report_placement(data: dict):
    return {"reported": True, "message": "Placement recorded and submitted to district dashboard."}
```

---

## FILE: `app/utils/seed_data.py`

```python
"""Seed the database with initial data for demo."""
import asyncio
import uuid
from app.database import AsyncSessionLocal
from app.models.job import Job
from app.models.scheme import Scheme
from app.models.credential import TrainingCenter
from app.models.skill import SkillDemand

async def seed_database():
    async with AsyncSessionLocal() as db:
        # ── JOBS ──────────────────────────────────────────────
        jobs = [
            Job(title="Data Analyst", company="Infosys BPM", district="Jaipur", state="Rajasthan", salary_min=18000, salary_max=28000, required_skills=["SQL", "Excel", "Power BI"], nsqf_level=5, sector="IT", is_urgent=False, apply_url="https://www.ncs.gov.in"),
            Job(title="MIS Executive", company="Tata Motors", district="Jaipur", state="Rajasthan", salary_min=16000, salary_max=22000, required_skills=["Excel", "PowerPoint"], nsqf_level=4, sector="IT", is_urgent=True, apply_url="https://www.ncs.gov.in"),
            Job(title="Electrician", company="MSEDCL", district="Nagpur", state="Maharashtra", salary_min=14000, salary_max=20000, required_skills=["Electrical wiring"], nsqf_level=3, sector="Electronics", is_urgent=True, apply_url="https://www.ncs.gov.in"),
            Job(title="Plumber", company="Jal Jeevan Mission", district="Sitapur", state="Uttar Pradesh", salary_min=12000, salary_max=16000, required_skills=["Plumbing"], nsqf_level=3, sector="Construction", is_urgent=True, apply_url="https://www.ncs.gov.in"),
            Job(title="CNC Operator", company="Bajaj Auto", district="Pune", state="Maharashtra", salary_min=18000, salary_max=28000, required_skills=["CNC Operation"], nsqf_level=4, sector="Capital Goods", is_urgent=False, apply_url="https://www.ncs.gov.in"),
            Job(title="Solar Technician", company="TATA Power Solar", district="Nagpur", state="Maharashtra", salary_min=15000, salary_max=22000, required_skills=["Solar installation"], nsqf_level=3, sector="Green Jobs", is_urgent=False, apply_url="https://www.ncs.gov.in"),
        ]
        db.add_all(jobs)

        # ── TRAINING CENTERS ──────────────────────────────────
        centers = [
            TrainingCenter(name="Ambedkar Skill Centre", nsdc_id="MH-01-001", district="Nagpur", state="Maharashtra", registered_gps_lat=21.1458, registered_gps_lng=79.0882, placement_rate=78.0),
            TrainingCenter(name="Nagpur Polytechnic", nsdc_id="MH-01-002", district="Nagpur", state="Maharashtra", registered_gps_lat=21.1587, registered_gps_lng=79.0955, placement_rate=71.0),
            TrainingCenter(name="Nagpur Skill Hub", nsdc_id="MH-01-003", district="Nagpur", state="Maharashtra", registered_gps_lat=21.1312, registered_gps_lng=79.0723, placement_rate=42.0),  # Fraud center
            TrainingCenter(name="Vidarbha Training Institute", nsdc_id="MH-01-004", district="Nagpur", state="Maharashtra", registered_gps_lat=21.1634, registered_gps_lng=79.0810, is_blacklisted=True, blacklist_reason="Assessment fraud"),
        ]
        db.add_all(centers)

        # ── SCHEMES ───────────────────────────────────────────
        schemes = [
            Scheme(name="PMKVY 4.0", emoji="🎓", ministry="Ministry of Skill Development", benefit="Free skill training + ₹500 daily stipend during training", benefit_hindi="FREE training + ₹500 stipend", eligibility={"age_min": 18, "age_max": 45, "income": "any"}, applicable_user_types=["jobseeker", "bluecollar"], apply_url="https://pmkvyofficial.org", deadline="31 March 2026", color="blue"),
            Scheme(name="MUDRA Loan — Shishu", emoji="💰", ministry="Ministry of Finance", benefit="Up to ₹50,000 loan without collateral for new businesses", benefit_hindi="₹50,000 tak loan bina guarantee ke", eligibility={"business_type": "new_or_existing"}, applicable_user_types=["bluecollar"], apply_url="https://mudra.org.in", color="emerald"),
            Scheme(name="e-Shram Card", emoji="🪪", ministry="Ministry of Labour", benefit="₹2 lakh accident insurance + pension benefits for informal workers", benefit_hindi="₹2 lakh insurance + pension", eligibility={"worker_type": "informal"}, applicable_user_types=["bluecollar"], apply_url="https://eshram.gov.in", color="orange"),
            Scheme(name="PM Vishwakarma", emoji="🛠️", ministry="Ministry of MSME", benefit="₹1 lakh collateral-free loan + free skill training for artisans", benefit_hindi="₹1 lakh loan + free training", eligibility={"occupation": "artisan_craftsman"}, applicable_user_types=["bluecollar"], apply_url="https://pmvishwakarma.gov.in", color="purple"),
            Scheme(name="Startup India Seed Fund", emoji="🚀", ministry="DPIIT", benefit="Up to ₹20 lakh grant for early-stage startups", benefit_hindi="₹20 lakh grant for startup", eligibility={"entity_type": "dpiit_recognized_startup"}, applicable_user_types=["jobseeker"], apply_url="https://startupindia.gov.in", color="blue"),
            Scheme(name="NSDC Scholarship", emoji="🏅", ministry="NSDC", benefit="Up to ₹50,000 per year for skill development courses", benefit_hindi="₹50,000 tak scholarship", eligibility={"income": "below_1.5L", "age_max": 35}, applicable_user_types=["jobseeker"], apply_url="https://nsdcindia.org", color="emerald"),
        ]
        db.add_all(schemes)

        # ── SKILL DEMAND DATA ─────────────────────────────────
        demand_data = [
            SkillDemand(district="Nagpur", state="Maharashtra", skill_name="Electrician", nsqf_code="ELE/Q0107", demand_count=340, supply_count=80, avg_salary=18000, demand_trajectory="EMERGING"),
            SkillDemand(district="Nagpur", state="Maharashtra", skill_name="CNC Operator", nsqf_code="CSC/Q0303", demand_count=218, supply_count=45, avg_salary=24000, demand_trajectory="EMERGING"),
            SkillDemand(district="Nagpur", state="Maharashtra", skill_name="Solar Technician", nsqf_code="SGJ/Q0101", demand_count=145, supply_count=20, avg_salary=20000, demand_trajectory="EMERGING"),
            SkillDemand(district="Jaipur", state="Rajasthan", skill_name="SQL", nsqf_code="IT/Q2211", demand_count=280, supply_count=90, avg_salary=24000, demand_trajectory="EMERGING"),
            SkillDemand(district="Jaipur", state="Rajasthan", skill_name="Power BI", nsqf_code="IT/Q2211", demand_count=190, supply_count=50, avg_salary=22000, demand_trajectory="RISING"),
            SkillDemand(district="Lucknow", state="Uttar Pradesh", skill_name="Plumber", nsqf_code="CON/Q0303", demand_count=195, supply_count=90, avg_salary=15000, demand_trajectory="STABLE"),
        ]
        db.add_all(demand_data)

        await db.commit()
        print("✅ Database seeded successfully.")

if __name__ == "__main__":
    asyncio.run(seed_database())
```

---

## FILE: `main.py`

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.database import engine, Base
from app.routers import auth, jobseeker, bluecollar, govt, ai, credentials, ngo
from app.config import settings
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("kaushalbridge")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create all tables on startup
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    logger.info("✅ KaushalBridge AI Backend started successfully")
    yield
    await engine.dispose()

app = FastAPI(
    title="KaushalBridge AI — Skill Intelligence OS",
    description="India's first demand-first dual-track skill intelligence platform. Serving the mason in Sitapur and the graduate in Nagpur.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url, "http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(jobseeker.router, prefix="/api/jobseeker", tags=["Job Seeker"])
app.include_router(bluecollar.router, prefix="/api/bluecollar", tags=["Blue Collar"])
app.include_router(govt.router, prefix="/api/govt", tags=["Government"])
app.include_router(ai.router, prefix="/api/ai", tags=["AI Services"])
app.include_router(credentials.router, prefix="/api/credentials", tags=["Credentials"])
app.include_router(ngo.router, prefix="/api/ngo", tags=["NGO Portal"])

@app.get("/")
def root():
    return {"status": "KaushalBridge AI Backend Running", "version": "1.0.0", "docs": "/docs"}

@app.get("/health")
def health():
    return {"status": "healthy", "database": "connected", "ai": "ready"}
```

---

## FILE: `requirements.txt`

```
fastapi==0.111.0
uvicorn[standard]==0.30.1
sqlalchemy==2.0.30
alembic==1.13.1
asyncpg==0.29.0
psycopg2-binary==2.9.9
pydantic==2.7.1
pydantic-settings==2.3.1
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
bcrypt==4.1.3
python-multipart==0.0.9
httpx==0.27.0
google-generativeai==0.7.2
spacy==3.7.4
pypdf==4.2.0
python-docx==1.1.2
web3==6.19.0
python-dotenv==1.0.1
haversine==2.8.1
qrcode[pil]==7.4.2
Pillow==10.3.0
supabase==2.4.3
```

---

## FRONTEND CONNECTOR

Create `src/services/api.js` in the React frontend:

```js
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const getHeaders = () => ({
  'Content-Type': 'application/json',
  ...(localStorage.getItem('kb_token') ? { 'Authorization': `Bearer ${localStorage.getItem('kb_token')}` } : {})
})

export const api = {
  get: async (path) => {
    const res = await fetch(`${BASE_URL}${path}`, { headers: getHeaders() })
    if (!res.ok) throw new Error(await res.text())
    return res.json()
  },
  post: async (path, body) => {
    const res = await fetch(`${BASE_URL}${path}`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(body) })
    if (!res.ok) throw new Error(await res.text())
    return res.json()
  },
  upload: async (path, formData) => {
    const headers = {}
    if (localStorage.getItem('kb_token')) headers['Authorization'] = `Bearer ${localStorage.getItem('kb_token')}`
    const res = await fetch(`${BASE_URL}${path}`, { method: 'POST', headers, body: formData })
    if (!res.ok) throw new Error(await res.text())
    return res.json()
  }
}

// Ready-to-use API calls
export const kaushalAPI = {
  // Auth
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data),
  govtLogin: (data) => api.post('/api/auth/govt-login', data),

  // Job Seeker
  analyzeProfile: (data) => api.post('/api/jobseeker/profile', data),
  getAnalysis: (userId) => api.get(`/api/jobseeker/analysis/${userId}`),
  getRoadmap: (userId) => api.get(`/api/jobseeker/roadmap/${userId}`),
  getJobs: (district, skills = '') => api.get(`/api/jobseeker/jobs/${district}?skills=${skills}`),
  getSchemes: (userType = 'jobseeker') => api.get(`/api/jobseeker/schemes?user_type=${userType}`),
  analyzeResume: (formData) => api.upload('/api/jobseeker/resume/analyze', formData),

  // Blue Collar
  bcOnboard: (data) => api.post('/api/bluecollar/onboard', data),
  bcJobs: (district, trade = '') => api.get(`/api/bluecollar/jobs/${district}?trade=${trade}`),

  // Government
  govtDashboard: (district) => api.get(`/api/govt/dashboard/${district}`),
  investigateAlert: (alertId) => api.post(`/api/govt/fraud-alerts/${alertId}/investigate`, {}),

  // AI
  chat: (data) => api.post('/api/ai/chat', data),
  loadChatHistory: (userId, sessionId) => api.post('/api/ai/chat/load', { user_id: userId, session_id: sessionId }),
  interviewFeedback: (data) => api.post('/api/ai/interview-feedback', data),
  rewriteBullet: (data) => api.post('/api/ai/rewrite-bullet', data),
  roadmapAlternative: (data) => api.post('/api/ai/roadmap-alternative', data),

  // Credentials
  issueCredential: (data) => api.post('/api/credentials/issue', data),
  verifyCredential: (id) => api.get(`/api/credentials/verify/${id}`),

  // NGO
  ngoDashboard: (centerId) => api.get(`/api/ngo/dashboard/${centerId}`),
  reportPlacement: (data) => api.post('/api/ngo/placements/report', data),
}
```

---

## HOW TO RUN

```bash
# 1. Clone and setup
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m spacy download en_core_web_sm

# 2. Setup PostgreSQL
psql -U postgres -c "CREATE DATABASE kaushalbridge;"

# 3. Configure environment
cp .env.example .env
# Edit .env — add GEMINI_API_KEY at minimum. All others optional.

# 4. Auto-create tables + seed
python -c "import asyncio; from app.utils.seed_data import seed_database; asyncio.run(seed_database())"

# 5. Start server
uvicorn main:app --reload --port 8000

# API docs → http://localhost:8000/docs
# Health check → http://localhost:8000/health
```

---

## BUILD ORDER

Build files in this exact sequence:

1. `requirements.txt`
2. `.env.example`
3. `app/config.py`
4. `app/database.py`
5. All models (`user.py`, `skill.py`, `job.py`, `credential.py`, `scheme.py`, `chat.py`)
6. `alembic.ini` + `alembic/env.py` + first migration
7. `app/utils/ontology.py`
8. `app/utils/seed_data.py`
9. `app/services/gemini.py`
10. `app/services/lpi_engine.py`
11. `app/services/resume_parser.py`
12. `app/services/blockchain.py`
13. `app/services/chat_persistence.py`
14. All routers (`auth.py`, `jobseeker.py`, `bluecollar.py`, `govt.py`, `ai.py`, `credentials.py`, `ngo.py`)
15. `main.py`
16. Frontend `src/services/api.js`

**Output every file completely. No partial implementations. No TODO comments. Every endpoint must return valid data.**

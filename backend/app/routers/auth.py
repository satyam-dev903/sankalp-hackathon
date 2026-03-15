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
    result = await db.execute(select(User).where(User.phone == req.phone))
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Phone already registered")
    
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
        raise HTTPException(status_code=401, detail="Invalid phone or password")
    
    token = create_token({"sub": str(user.id), "type": user.user_type.value})
    return {"access_token": token, "token_type": "bearer", "user_id": str(user.id), "user_type": user.user_type.value}

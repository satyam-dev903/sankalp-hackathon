from pydantic import BaseModel, EmailStr
from typing import Optional, List
from app.models.user import UserType

class RegisterRequest(BaseModel):
    phone: str
    name: str
    password: str
    user_type: str = "jobseeker"
    district: Optional[str] = "Nagpur"
    state: Optional[str] = "Maharashtra"
    age: Optional[int] = None
    skills: Optional[List[str]] = []

class LoginRequest(BaseModel):
    phone: str
    password: str

class GovtLoginRequest(BaseModel):
    officer_id: str
    password: str
    district: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user_id: str
    user_type: str
    profile: Optional[dict] = None

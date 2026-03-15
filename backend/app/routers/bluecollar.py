from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models.user import User, Profile, UserType

router = APIRouter()

@router.post("/profile")
async def save_bc_profile(data: dict, db: AsyncSession = Depends(get_db)):
    phone = data.get("phone")
    if not phone:
        raise HTTPException(status_code=400, detail="Phone number required")
    
    # Check if user exists, else create
    # This is a simplified registration for blue collar
    from sqlalchemy import select
    result = await db.execute(select(User).where(User.phone == phone))
    user = result.scalar_one_or_none()
    
    if not user:
        user = User(
            phone=phone,
            name=data.get("name", "Blue Collar User"),
            user_type=UserType.BLUECOLLAR
        )
        db.add(user)
        await db.flush()
        
        profile = Profile(
            user_id=user.id,
            skills=data.get("skills", []),
            district=data.get("district"),
            state=data.get("state")
        )
        db.add(profile)
    else:
        # Update existing profile
        result = await db.execute(select(Profile).where(Profile.user_id == user.id))
        profile = result.scalar_one_or_none()
        if profile:
            profile.skills = data.get("skills", [])
            profile.district = data.get("district")
            profile.state = data.get("state")
    
    await db.commit()
    return {"message": "Profile saved successfully", "user_id": str(user.id)}

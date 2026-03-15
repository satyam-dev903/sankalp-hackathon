from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import auth, jobseeker, ai, govt, bluecollar

app = FastAPI(
    title="KaushalBridge AI API",
    description="Skill intelligence platform backend",
    version="1.0.0"
)

# Debug: Check settings
print(f"DEBUG: Database URL: {settings.database_url}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(jobseeker.router, prefix="/api/jobseeker", tags=["Job Seeker"])
app.include_router(ai.router, prefix="/api/ai", tags=["AI Services"])
app.include_router(govt.router, prefix="/api/govt", tags=["Government Portal"])
app.include_router(bluecollar.router, prefix="/api/bluecollar", tags=["Blue Collar"])

@app.get("/")
async def root():
    return {"message": "Welcome to KaushalBridge AI API", "status": "online"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

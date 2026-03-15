from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class JobResponse(BaseModel):
    id: str
    title: str
    company: str
    district: str
    salary_min: Optional[int] = 0
    salary_max: Optional[int] = 0
    required_skills: List[str] = []
    match_percentage: Optional[int] = 0
    is_urgent: bool = False
    apply_url: Optional[str] = "https://www.ncs.gov.in"

class JobListResponse(BaseModel):
    jobs: List[JobResponse]

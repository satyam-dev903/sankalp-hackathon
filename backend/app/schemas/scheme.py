from pydantic import BaseModel
from typing import List, Optional, Dict

class SchemeResponse(BaseModel):
    id: str
    name: str
    emoji: Optional[str] = "🏛️"
    ministry: Optional[str] = "Govt"
    benefit: Optional[str] = "Training/Subsidy"
    benefit_hindi: Optional[str] = None
    apply_url: Optional[str] = "#"
    deadline: Optional[str] = None
    color: Optional[str] = "blue"

class SchemeListResponse(BaseModel):
    schemes: List[SchemeResponse]

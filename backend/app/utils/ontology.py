SKILL_ONTOLOGY = {
    # Plumbing
    "plumber": {"nsqf_code": "CON/Q0303", "nsqf_level": 3, "sector": "Construction", "canonical": "Plumber"},
    "pipe fitter": {"nsqf_code": "CON/Q0303", "nsqf_level": 3, "sector": "Construction", "canonical": "Plumber"},
    "paani ka kaam": {"nsqf_code": "CON/Q0303", "nsqf_level": 3, "sector": "Construction", "canonical": "Plumber"},
    
    # Electrical
    "electrician": {"nsqf_code": "ELE/Q0107", "nsqf_level": 3, "sector": "Electronics", "canonical": "Electrician"},
    "bijli ka kaam": {"nsqf_code": "ELE/Q0107", "nsqf_level": 3, "sector": "Electronics", "canonical": "Electrician"},
    
    # Construction
    "mistri": {"nsqf_code": "CON/Q0101", "nsqf_level": 3, "sector": "Construction", "canonical": "Mason"},
    "raj mistri": {"nsqf_code": "CON/Q0101", "nsqf_level": 3, "sector": "Construction", "canonical": "Mason"},
    
    # Digital
    "excel": {"nsqf_code": "IT/Q0101", "nsqf_level": 3, "sector": "IT", "canonical": "Computer Operator"},
    "tally": {"nsqf_code": "BFSI/Q0101", "nsqf_level": 3, "sector": "BFSI", "canonical": "Accounts Executive"},
}

def map_to_nsqf(text: str) -> dict:
    text_lower = text.lower().strip()
    if text_lower in SKILL_ONTOLOGY:
        return SKILL_ONTOLOGY[text_lower]
    for keyword, data in SKILL_ONTOLOGY.items():
        if keyword in text_lower or text_lower in keyword:
            return data
    return {"nsqf_code": "UNKNOWN", "nsqf_level": 1, "sector": "General", "canonical": text.title()}

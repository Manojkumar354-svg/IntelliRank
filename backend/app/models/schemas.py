from pydantic import BaseModel
from typing import List, Optional, Dict

class SearchQuery(BaseModel):
    query: str
    top_n: Optional[int] = 8
    category: Optional[str] = None
    subcategory: Optional[str] = None

class Document(BaseModel):
    id: int
    title: str
    category: str
    subcategory: str
    description: str
    tags: List[str]
    brand: Optional[str] = None
    difficulty_level: Optional[str] = None # For Technical
    price_range: Optional[str] = None # For Products

class SearchResult(BaseModel):
    id: int
    title: str
    category: str
    subcategory: str
    description: str
    tags: List[str]
    brand: Optional[str] = None
    difficulty_level: Optional[str] = None
    price_range: Optional[str] = None
    score: float
    match_percentage: str
    low_confidence: bool

class RankingResponse(BaseModel):
    query: str
    results: List[SearchResult]

class CategoryResponse(BaseModel):
    categories: List[str]
    subcategories: Dict[str, List[str]]
    total_documents: int

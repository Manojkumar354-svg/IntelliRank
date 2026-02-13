import json
from pathlib import Path
from typing import Dict, List
from fastapi import APIRouter, HTTPException
from app.models.schemas import SearchQuery, RankingResponse, Document, CategoryResponse
from app.core.ranking import RankingEngine

router = APIRouter()

# Initialize ranking engine
engine = RankingEngine()

# Load dataset
DATA_PATH = Path(__file__).parent.parent.parent / "data" / "sample_dataset.json"

def load_data():
    try:
        if not DATA_PATH.exists():
            print(f"Warning: Data file not found at {DATA_PATH}")
            return
        with open(DATA_PATH, "r") as f:
            data = json.load(f)
            docs = [Document(**item) for item in data]
            engine.fit(docs)
    except Exception as e:
        print(f"Error loading data: {e}")

# Initial load
load_data()

@router.post("/search", response_model=RankingResponse)
async def search(query: SearchQuery):
    try:
        results = engine.search(
            query.query, 
            top_k=query.top_n, 
            category=query.category, 
            subcategory=query.subcategory
        )
        return RankingResponse(query=query.query, results=results)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/dataset-size")
async def get_dataset_size():
    return {"total_documents": len(engine.documents)}

@router.get("/categories", response_model=CategoryResponse)
async def get_categories():
    categories = sorted(list(set(doc.category for doc in engine.documents)))
    subcats: Dict[str, List[str]] = {}
    for cat in categories:
        subcats[cat] = sorted(list(set(doc.subcategory for doc in engine.documents if doc.category == cat)))
    
    return CategoryResponse(
        categories=categories,
        subcategories=subcats,
        total_documents=len(engine.documents)
    )

@router.get("/subcategories")
async def get_subcategories(category: str):
    if not engine.documents:
        return {"subcategories": []}
    
    subcats = sorted(list(set(
        doc.subcategory for doc in engine.documents 
        if doc.category == category or category == "All"
    )))
    return {"subcategories": subcats}

@router.get("/health")
async def health_check():
    return {"status": "ok", "document_count": len(engine.documents)}

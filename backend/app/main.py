import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router as api_router

app = FastAPI(
    title="IntelliRank API",
    description="AI-Powered Semantic Search and Ranking System",
    version="1.0.0"
)

# CORS configuration - allow Vercel frontend + local dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://*.vercel.app",
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(api_router, prefix="/api")

@app.get("/health")
async def health_check():
    from app.api.routes import engine
    doc_count = len(engine.documents) if engine.documents else 0
    return {"status": "ok", "document_count": doc_count}

@app.get("/")
async def root():
    return {
        "message": "Welcome to IntelliRank API",
        "docs": "/docs",
        "health": "/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

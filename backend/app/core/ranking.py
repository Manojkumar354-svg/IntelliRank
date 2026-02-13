from typing import List, Dict, Optional
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from app.core.preprocessing import TextPreprocessor
from app.models.schemas import Document, SearchResult

class RankingEngine:
    def __init__(self):
        self.preprocessor = TextPreprocessor()
        self.vectorizer = TfidfVectorizer(stop_words='english')
        self.documents: List[Document] = []
        self.doc_vectors = None

    def fit(self, documents: List[Document]):
        self.documents = documents
        # Index multi-domain fields for better semantic coverage
        preprocessed_docs = [
            self.preprocessor.preprocess(
                f"{doc.title} {doc.category} {doc.subcategory} {doc.description} {' '.join(doc.tags)} {doc.brand or ''}"
            ) 
            for doc in documents
        ]
        self.doc_vectors = self.vectorizer.fit_transform(preprocessed_docs)

    def search(self, 
               query: str, 
               top_k: int = 10,  # Enforce 10 for V5.0
               category: Optional[str] = None, 
               subcategory: Optional[str] = None) -> List[SearchResult]:
        if not self.documents:
            return []

        # Preprocess query
        preprocessed_query = self.preprocessor.preprocess(query)
        query_vector = self.vectorizer.transform([preprocessed_query])
        
        # Calculate similarities
        similarities = cosine_similarity(query_vector, self.doc_vectors).flatten()
        
        # Initial indices
        indices = np.arange(len(self.documents))
        
        # Filtering logic
        mask = np.ones(len(self.documents), dtype=bool)
        if category and category != "All":
            mask &= np.array([doc.category == category for doc in self.documents])
        if subcategory and subcategory != "All":
            mask &= np.array([doc.subcategory == subcategory for doc in self.documents])
            
        indices = indices[mask]
        similarities = similarities[mask]

        if len(indices) == 0:
            return []

        # Strictly return top_k (10)
        actual_k = min(top_k, len(indices))
        sorted_ix = np.argsort(similarities)[::-1][:actual_k]
        
        results = []
        for i in sorted_ix:
            idx = indices[i]
            score = float(similarities[i])
            doc = self.documents[idx]
            
            results.append(SearchResult(
                id=doc.id,
                title=doc.title,
                category=doc.category,
                subcategory=doc.subcategory,
                description=doc.description,
                tags=doc.tags,
                brand=doc.brand,
                difficulty_level=doc.difficulty_level,
                price_range=doc.price_range,
                score=round(score, 4),
                match_percentage=f"{round(score * 100, 1)}%",
                low_confidence=score < 0.10
            ))
        
        return results

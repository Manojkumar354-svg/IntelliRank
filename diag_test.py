import sys
import os
sys.path.append(os.path.join(os.getcwd(), 'backend'))

from app.core.ranking import RankingEngine
from app.models.schemas import Document

docs = [
    Document(id=1, title="Test 1", content="Machine learning is cool"),
    Document(id=2, title="Test 2", content="Deep learning is part of AI")
]

try:
    engine = RankingEngine()
    engine.fit(docs)
    results = engine.search("machine learning")
    print(f"Success! Found {len(results)} results.")
    for r in results:
        print(f" - {r.title}: {r.similarity_score}")
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()

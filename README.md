# IntelliRank v5.0 – Mega-Dataset Semantic Search

IntelliRank v5.0 is a professional-grade semantic retrieval ecosystem featuring a massive 550+ entry multi-domain dataset. This version introduces dynamic context-aware filtering, a refined soft dark slate UI, and a high-precision ranking engine.

## 🌟 V5.0 New Features

- **Mega-Dataset (550+ Entries)**: Deep coverage of Technical Architecture and Consumer Product Catalogs.
- **Dynamic Filtering**: Category-driven subcategory loading (Engineering vs. Electronics).
- **Suggestion Chips**: Quick-access chips for common high-traffic domains (Python, Cloud, Laptops).
- **Enhanced Neural Ranking**: Strictly returns Top 10 results with integrated Match Confidence banners.
- **Architectural UI**: Soft dark slate theme optimized for high-performance visual comfort.

---

## 📊 Dataset Structure

| Domain | Subcategories | Sample Content |
| :--- | :--- | :--- |
| **Technical** | Programming, Backend, DevOps, AI/NLP, Databases | Python Async, K8s Scaling, Semantic Embeddings |
| **Product** | Electronics, Appliances, Accessories, Books | ANC Headphones, Air Fryers, Tech Books |

### Meta-Data Fields
- **Technical**: `difficulty_level` (Beginner, Intermediate, Advanced)
- **Product**: `brand`, `price_range` (Budget, Mid, Premium)

---

## 🔍 How Semantic Ranking Works

IntelliRank uses a **TF-IDF + Cosine Similarity** pipeline:
1. **Normalization**: Queries are stripped of noise words via NLTK.
2. **Vectorization**: Documents are mapped into a high-dimensional TF-IDF space.
3. **Similarity Calculation**: We measure the angular distance (Cosine) between the query and every document.
4. **Ranking**: Results are strictly filtered and sorted, providing a mathematical "Match %".

---

## 🏃 Verification & Run

### 1. Launch Services
Ensure you use `cmd /c` on Windows if PowerShell execution is restricted.
```bash
# Backend (Port 8000)
cmd /c "cd backend && .\venv\Scripts\python.exe -m uvicorn app.main:app --port 8000"

# Frontend (Port 5173)
cmd /c "cd frontend && npm.cmd run dev"
```

### 2. Verify Dataset Size
Check the JSON size directly at:
[http://127.0.0.1:8000/api/dataset-size](http://127.0.0.1:8000/api/dataset-size)
*(Expected: 550+)*

---

## 💡 Example Queries

- **Language**: "Python best practices"
- **Infrastructure**: "Cloud load balancing"
- **Hardware**: "Sony noise cancelling headphones"
- **Systems**: "Distributed microservices scaling"
- **Consumer**: "Gaming mechanical keyboard lux"

---

## 🛡️ Privacy & Logic
- **Stateless**: All processing occurs in-memory.
- **Local**: No external AI API dependencies.
- **Explainable**: High confidence vs. low confidence flags included in every response.

=======
# IntelliRank v5.0 – Mega-Dataset Semantic Search

IntelliRank v5.0 is a professional-grade semantic retrieval ecosystem featuring a massive 550+ entry multi-domain dataset. This version introduces dynamic context-aware filtering, a refined soft dark slate UI, and a high-precision ranking engine.

## 🌟 V5.0 New Features

- **Mega-Dataset (550+ Entries)**: Deep coverage of Technical Architecture and Consumer Product Catalogs.
- **Dynamic Filtering**: Category-driven subcategory loading (Engineering vs. Electronics).
- **Suggestion Chips**: Quick-access chips for common high-traffic domains (Python, Cloud, Laptops).
- **Enhanced Neural Ranking**: Strictly returns Top 10 results with integrated Match Confidence banners.
- **Architectural UI**: Soft dark slate theme optimized for high-performance visual comfort.

---

## 📊 Dataset Structure

| Domain | Subcategories | Sample Content |
| :--- | :--- | :--- |
| **Technical** | Programming, Backend, DevOps, AI/NLP, Databases | Python Async, K8s Scaling, Semantic Embeddings |
| **Product** | Electronics, Appliances, Accessories, Books | ANC Headphones, Air Fryers, Tech Books |

### Meta-Data Fields
- **Technical**: `difficulty_level` (Beginner, Intermediate, Advanced)
- **Product**: `brand`, `price_range` (Budget, Mid, Premium)

---

## 🔍 How Semantic Ranking Works

IntelliRank uses a **TF-IDF + Cosine Similarity** pipeline:
1. **Normalization**: Queries are stripped of noise words via NLTK.
2. **Vectorization**: Documents are mapped into a high-dimensional TF-IDF space.
3. **Similarity Calculation**: We measure the angular distance (Cosine) between the query and every document.
4. **Ranking**: Results are strictly filtered and sorted, providing a mathematical "Match %".

---

## 🏃 Verification & Run

### 1. Launch Services
Ensure you use `cmd /c` on Windows if PowerShell execution is restricted.
```bash
# Backend (Port 8000)
cmd /c "cd backend && .\venv\Scripts\python.exe -m uvicorn app.main:app --port 8000"

# Frontend (Port 5173)
cmd /c "cd frontend && npm.cmd run dev"
```

### 2. Verify Dataset Size
Check the JSON size directly at:
[http://127.0.0.1:8000/api/dataset-size](http://127.0.0.1:8000/api/dataset-size)
*(Expected: 550+)*

---

## 💡 Example Queries

- **Language**: "Python best practices"
- **Infrastructure**: "Cloud load balancing"
- **Hardware**: "Sony noise cancelling headphones"
- **Systems**: "Distributed microservices scaling"
- **Consumer**: "Gaming mechanical keyboard lux"


## 🛡️ Privacy & Logic
- **Stateless**: All processing occurs in-memory.
- **Local**: No external AI API dependencies.
- **Explainable**: High confidence vs. low confidence flags included in every response.

>>>>>>> eebb8e0ed4a483a655cd048feec56f13f9270a98

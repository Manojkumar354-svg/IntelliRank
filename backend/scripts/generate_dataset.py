import json
import random

def generate():
    tech_subcats = {
        "Programming Languages": ["Python", "Java", "JavaScript", "TypeScript", "Go", "C++", "C#", "Rust"],
        "Backend Engineering": ["REST APIs", "GraphQL", "Microservices", "Authentication", "Authorization", "Caching", "Logging", "Monitoring", "Middleware", "API Gateways"],
        "Frontend Engineering": ["React", "Angular", "Vue", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Responsive Design", "State Management"],
        "Frameworks & Libraries": ["FastAPI", "Django", "Flask", "Spring Boot", "Express.js", "Node.js", "Redux", "Material UI"],
        "Cloud & DevOps": ["Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Cloud Run", "AWS", "GCP", "Azure", "Containers", "Load Balancing"],
        "Databases": ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "ORM"],
        "System Design": ["Scalability", "Distributed Systems", "Rate Limiting", "Message Queues", "Event-driven Architecture", "High-availability"],
        "AI / NLP / Search": ["TF-IDF", "Cosine Similarity", "Ranking Algorithms", "Semantic Search", "Embeddings", "Text Processing"],
        "Retail / High-traffic Systems": ["Inventory systems", "Order processing", "Payment workflows", "Performance optimization", "Traffic handling"]
    }

    product_subcats = {
        "Electronics": ["Wireless Bluetooth Headphones", "Gaming Headsets", "Laptops", "Smartphones", "Mechanical Keyboards", "Monitors", "Smartwatches", "Tablets"],
        "Home Appliances": ["Air Fryers", "Vacuum Cleaners", "Coffee Makers", "Refrigerators", "Washing Machines"],
        "Accessories": ["Chargers", "Power Banks", "USB Cables", "Laptop Stands"],
        "Books": ["Technology Books", "Productivity Books", "Fiction", "Business"]
    }

    difficulty_levels = ["Beginner", "Intermediate", "Advanced"]
    price_ranges = ["Budget", "Mid", "Premium"]
    brands = ["Sony", "Bose", "Apple", "Samsung", "Logitech", "Dell", "HP", "Lenovo", "Dyson", "Ninja", "Keurig"]

    data = []
    id_counter = 1

    # Generate Technical Entries (approx 300)
    for sub, topics in tech_subcats.items():
        for topic in topics:
            for i in range(5): # 5 variations per topic
                data.append({
                    "id": id_counter,
                    "title": f"{topic} {random.choice(['Essentials', 'Fundamentals', 'Advanced Patterns', 'Performance Pack', 'Best Practices'])}",
                    "category": "Technical",
                    "subcategory": sub,
                    "description": f"Comprehensive guide to mastering {topic}. This entry covers {random.choice(['scalability', 'security', 'efficiency', 'modern workflows'])} and {random.choice(['best practices', 'common pitfalls', 'advanced implementation'])}.",
                    "tags": [topic.lower().replace(" ", "-"), sub.lower().replace(" ", "-"), random.choice(["tutorial", "reference", "manual"])],
                    "difficulty_level": random.choice(difficulty_levels)
                })
                id_counter += 1

    # Generate Product Entries (approx 250)
    for sub, items in product_subcats.items():
        for item in items:
            for i in range(5):
                brand = random.choice(brands)
                data.append({
                    "id": id_counter,
                    "title": f"{brand} {item} {random.choice(['Pro', 'Max', 'Elite', 'Ultra', 'Plus'])}",
                    "category": "Product",
                    "subcategory": sub,
                    "description": f"High-quality {item} from {brand}. Featuring {random.choice(['noise cancellation', 'long battery life', 'ergonomic design', 'fast processing'])} and {random.choice(['premium materials', 'smart connectivity', 'compact form factor'])}.",
                    "tags": [item.lower().replace(" ", "-"), brand.lower(), "consumer-electronics"],
                    "brand": brand,
                    "price_range": random.choice(price_ranges)
                })
                id_counter += 1

    # Ensure we hit 500+
    while len(data) < 550:
        # Pad with variations
        data.append(random.choice(data).copy())
        data[-1]["id"] = id_counter
        id_counter += 1

    with open("backend/data/sample_dataset.json", "w") as f:
        json.dump(data, f, indent=2)
    print(f"Generated {len(data)} entries.")

if __name__ == "__main__":
    generate()

from datetime import datetime

def format_food(food_doc):
    """Format food document from MongoDB for API response."""
    if not food_doc:
        return None
    return {
        "id": str(food_doc["_id"]),
        "name": food_doc.get("name"),
        "description": food_doc.get("description"),
        "price": float(food_doc.get("price", 0.0)),
        "category": food_doc.get("category"),
        "image": food_doc.get("image"),
        "rating": float(food_doc.get("rating", 4.0)),
        "restaurant": food_doc.get("restaurant", "FoodieExpress Kitchen"),
        "is_available": food_doc.get("is_available", True),
        "created_at": food_doc.get("created_at").isoformat() if isinstance(food_doc.get("created_at"), datetime) else food_doc.get("created_at")
    }

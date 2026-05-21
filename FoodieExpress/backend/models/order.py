from datetime import datetime

def format_order(order_doc):
    """Format order document from MongoDB for API response."""
    if not order_doc:
        return None
    return {
        "id": str(order_doc["_id"]),
        "user_id": str(order_doc.get("user_id")),
        "user_email": order_doc.get("user_email"),
        "items": order_doc.get("items", []), # Array of items containing { id, name, price, quantity, image }
        "total_amount": float(order_doc.get("total_amount", 0.0)),
        "status": order_doc.get("status", "Pending"), # Pending, Preparing, Out for Delivery, Delivered
        "delivery_address": order_doc.get("delivery_address", ""),
        "created_at": order_doc.get("created_at").isoformat() if isinstance(order_doc.get("created_at"), datetime) else order_doc.get("created_at")
    }

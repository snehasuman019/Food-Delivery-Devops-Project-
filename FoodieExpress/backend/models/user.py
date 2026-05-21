import bcrypt
from datetime import datetime

def hash_password(password):
    """Hash password using bcrypt."""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def check_password(password, hashed_password):
    """Verify standard password against hashed password."""
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))

def format_user_profile(user_doc):
    """Format user document from MongoDB for API response."""
    if not user_doc:
        return None
    return {
        "id": str(user_doc["_id"]),
        "name": user_doc.get("name"),
        "email": user_doc.get("email"),
        "role": user_doc.get("role", "user"),
        "created_at": user_doc.get("created_at").isoformat() if isinstance(user_doc.get("created_at"), datetime) else user_doc.get("created_at")
    }

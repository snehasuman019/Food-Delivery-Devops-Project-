from flask import Blueprint, request, jsonify
from datetime import datetime
from config.db import db
from models.user import hash_password, check_password, format_user_profile
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/signup", methods=["POST"])
def signup():
    """Register a new user."""
    try:
        data = request.get_json()
        if not data:
            return jsonify({"message": "Invalid request data"}), 400
            
        name = data.get("name")
        email = data.get("email")
        password = data.get("password")
        role = data.get("role", "user") # defaults to user
        
        if not name or not email or not password:
            return jsonify({"message": "Name, email, and password are required"}), 400
            
        # Clean email
        email = email.lower().strip()
        
        # Check if user already exists
        existing_user = db.users.find_one({"email": email})
        if existing_user:
            return jsonify({"message": "User with this email already exists"}), 400
            
        # If email is admin@foodieexpress.com, force role to admin
        if email == "admin@foodieexpress.com":
            role = "admin"

        # Hash password and create user
        hashed = hash_password(password)
        new_user = {
            "name": name,
            "email": email,
            "password": hashed,
            "role": role,
            "created_at": datetime.utcnow()
        }
        
        result = db.users.insert_one(new_user)
        user_id = str(result.inserted_id)
        
        # Create token
        access_token = create_access_token(identity=user_id, additional_claims={"role": role})
        
        return jsonify({
            "message": "User registered successfully",
            "token": access_token,
            "user": {
                "id": user_id,
                "name": name,
                "email": email,
                "role": role
            }
        }), 201
        
    except Exception as e:
        print(f"Signup error: {e}")
        return jsonify({"message": "An error occurred during signup", "error": str(e)}), 500

@auth_bp.route("/login", methods=["POST"])
def login():
    """Log in an existing user."""
    try:
        data = request.get_json()
        if not data:
            return jsonify({"message": "Invalid request data"}), 400
            
        email = data.get("email")
        password = data.get("password")
        
        if not email or not password:
            return jsonify({"message": "Email and password are required"}), 400
            
        email = email.lower().strip()
        
        # Find user
        user = db.users.find_one({"email": email})
        if not user:
            return jsonify({"message": "Invalid email or password"}), 401
            
        # Check password
        if not check_password(password, user["password"]):
            return jsonify({"message": "Invalid email or password"}), 401
            
        # Create token
        role = user.get("role", "user")
        user_id = str(user["_id"])
        access_token = create_access_token(identity=user_id, additional_claims={"role": role})
        
        return jsonify({
            "message": "Login successful",
            "token": access_token,
            "user": format_user_profile(user)
        }), 200
        
    except Exception as e:
        print(f"Login error: {e}")
        return jsonify({"message": "An error occurred during login", "error": str(e)}), 500

@auth_bp.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    """Get authenticated user profile."""
    try:
        from bson import ObjectId
        user_id = get_jwt_identity()
        user = db.users.find_one({"_id": ObjectId(user_id)})
        if not user:
            return jsonify({"message": "User not found"}), 404
            
        return jsonify({"user": format_user_profile(user)}), 200
    except Exception as e:
        print(f"Profile error: {e}")
        return jsonify({"message": "An error occurred retrieving profile", "error": str(e)}), 500

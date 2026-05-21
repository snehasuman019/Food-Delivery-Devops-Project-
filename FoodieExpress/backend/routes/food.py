from flask import Blueprint, request, jsonify
from bson import ObjectId
from datetime import datetime
from config.db import db
from models.food import format_food
from flask_jwt_extended import jwt_required, get_jwt

food_bp = Blueprint("food", __name__)

@food_bp.route("", methods=["GET"])
def get_foods():
    """Get all food items with search and category filtering."""
    try:
        category = request.args.get("category")
        search = request.args.get("search")
        
        query = {}
        if category and category.lower() != "all":
            # case insensitive category matching
            query["category"] = {"$regex": f"^{category}$", "$options": "i"}
            
        if search:
            query["$or"] = [
                {"name": {"$regex": search, "$options": "i"}},
                {"description": {"$regex": search, "$options": "i"}},
                {"restaurant": {"$regex": search, "$options": "i"}}
            ]
            
        foods = list(db.foods.find(query))
        formatted_foods = [format_food(food) for food in foods]
        
        return jsonify(formatted_foods), 200
        
    except Exception as e:
        print(f"Error getting foods: {e}")
        return jsonify({"message": "Error retrieving food items", "error": str(e)}), 500

@food_bp.route("/<id>", methods=["GET"])
def get_food(id):
    """Get a single food item by ID."""
    try:
        if not ObjectId.is_valid(id):
            return jsonify({"message": "Invalid food item ID"}), 400
            
        food = db.foods.find_one({"_id": ObjectId(id)})
        if not food:
            return jsonify({"message": "Food item not found"}), 404
            
        return jsonify(format_food(food)), 200
        
    except Exception as e:
        print(f"Error getting food item: {e}")
        return jsonify({"message": "Error retrieving food item", "error": str(e)}), 500

@food_bp.route("", methods=["POST"])
@jwt_required()
def add_food():
    """Add a new food item (Admin only)."""
    try:
        # Check if caller is admin
        claims = get_jwt()
        if claims.get("role") != "admin":
            return jsonify({"message": "Access denied. Admin role required."}), 403
            
        data = request.get_json()
        if not data:
            return jsonify({"message": "Invalid request body"}), 400
            
        name = data.get("name")
        price = data.get("price")
        category = data.get("category")
        image = data.get("image")
        description = data.get("description", "")
        restaurant = data.get("restaurant", "FoodieExpress Kitchen")
        rating = data.get("rating", 4.0)
        
        if not name or price is None or not category or not image:
            return jsonify({"message": "Name, price, category, and image URL are required"}), 400
            
        new_food = {
            "name": name,
            "price": float(price),
            "category": category,
            "image": image,
            "description": description,
            "restaurant": restaurant,
            "rating": float(rating),
            "is_available": True,
            "created_at": datetime.utcnow()
        }
        
        result = db.foods.insert_one(new_food)
        new_food["_id"] = result.inserted_id
        
        return jsonify({
            "message": "Food item created successfully",
            "food": format_food(new_food)
        }), 201
        
    except Exception as e:
        print(f"Error adding food item: {e}")
        return jsonify({"message": "Error adding food item", "error": str(e)}), 500

@food_bp.route("/<id>", methods=["DELETE"])
@jwt_required()
def delete_food(id):
    """Delete a food item (Admin only)."""
    try:
        # Check if caller is admin
        claims = get_jwt()
        if claims.get("role") != "admin":
            return jsonify({"message": "Access denied. Admin role required."}), 403
            
        if not ObjectId.is_valid(id):
            return jsonify({"message": "Invalid food item ID"}), 400
            
        result = db.foods.delete_one({"_id": ObjectId(id)})
        
        if result.deleted_count == 0:
            return jsonify({"message": "Food item not found or already deleted"}), 404
            
        return jsonify({"message": "Food item deleted successfully"}), 200
        
    except Exception as e:
        print(f"Error deleting food: {e}")
        return jsonify({"message": "Error deleting food item", "error": str(e)}), 500

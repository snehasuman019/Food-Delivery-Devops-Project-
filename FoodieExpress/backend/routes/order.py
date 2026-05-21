from flask import Blueprint, request, jsonify
from bson import ObjectId
from datetime import datetime
from config.db import db
from models.order import format_order
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt

order_bp = Blueprint("order", __name__)

@order_bp.route("", methods=["POST"])
@jwt_required()
def place_order():
    """Place a new order."""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        if not data:
            return jsonify({"message": "Invalid request body"}), 400
            
        items = data.get("items")
        total_amount = data.get("total_amount")
        delivery_address = data.get("delivery_address")
        
        if not items or len(items) == 0 or total_amount is None or not delivery_address:
            return jsonify({"message": "Items, total_amount, and delivery_address are required"}), 400
            
        # Get user email
        user = db.users.find_one({"_id": ObjectId(user_id)})
        if not user:
            return jsonify({"message": "User not found"}), 404
            
        new_order = {
            "user_id": ObjectId(user_id),
            "user_email": user.get("email"),
            "items": items, # e.g. [{"id": "...", "name": "...", "price": 10.0, "quantity": 2, "image": "..."}]
            "total_amount": float(total_amount),
            "status": "Pending", # default status
            "delivery_address": delivery_address,
            "created_at": datetime.utcnow()
        }
        
        result = db.orders.insert_one(new_order)
        new_order["_id"] = result.inserted_id
        
        return jsonify({
            "message": "Order placed successfully",
            "order": format_order(new_order)
        }), 201
        
    except Exception as e:
        print(f"Error placing order: {e}")
        return jsonify({"message": "Error placing order", "error": str(e)}), 500

@order_bp.route("", methods=["GET"])
@jwt_required()
def get_user_orders():
    """Get order history for current user."""
    try:
        user_id = get_jwt_identity()
        orders = list(db.orders.find({"user_id": ObjectId(user_id)}).sort("created_at", -1))
        formatted_orders = [format_order(o) for o in orders]
        
        return jsonify(formatted_orders), 200
        
    except Exception as e:
        print(f"Error getting user orders: {e}")
        return jsonify({"message": "Error retrieving orders", "error": str(e)}), 500

@order_bp.route("/all", methods=["GET"])
@jwt_required()
def get_all_orders():
    """Get all orders in system (Admin only)."""
    try:
        # Check if caller is admin
        claims = get_jwt()
        if claims.get("role") != "admin":
            return jsonify({"message": "Access denied. Admin role required."}), 403
            
        orders = list(db.orders.find().sort("created_at", -1))
        formatted_orders = [format_order(o) for o in orders]
        
        return jsonify(formatted_orders), 200
        
    except Exception as e:
        print(f"Error getting all orders: {e}")
        return jsonify({"message": "Error retrieving all orders", "error": str(e)}), 500

@order_bp.route("/<id>/status", methods=["PUT"])
@jwt_required()
def update_order_status(id):
    """Update status of an order (Admin only)."""
    try:
        # Check if caller is admin
        claims = get_jwt()
        if claims.get("role") != "admin":
            return jsonify({"message": "Access denied. Admin role required."}), 403
            
        if not ObjectId.is_valid(id):
            return jsonify({"message": "Invalid order ID"}), 400
            
        data = request.get_json()
        if not data or "status" not in data:
            return jsonify({"message": "Status field is required"}), 400
            
        status = data.get("status")
        valid_statuses = ["Pending", "Preparing", "Out for Delivery", "Delivered"]
        
        if status not in valid_statuses:
            return jsonify({"message": f"Invalid status. Must be one of {valid_statuses}"}), 400
            
        result = db.orders.update_one(
            {"_id": ObjectId(id)},
            {"$set": {"status": status}}
        )
        
        if result.matched_count == 0:
            return jsonify({"message": "Order not found"}), 404
            
        return jsonify({
            "message": "Order status updated successfully",
            "status": status
        }), 200
        
    except Exception as e:
        print(f"Error updating order status: {e}")
        return jsonify({"message": "Error updating order status", "error": str(e)}), 500

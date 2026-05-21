import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import blueprints
from routes.auth import auth_bp
from routes.food import food_bp
from routes.order import order_bp

app = Flask(__name__)

# Configs
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "foodieexpress-dev-secret-key-12345")

# Enable CORS for all routes under /api/
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Initialize JWT
jwt = JWTManager(app)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(food_bp, url_prefix="/api/foods")
app.register_blueprint(order_bp, url_prefix="/api/orders")

# Custom JWT error handlers
@jwt.unauthorized_loader
def unauthorized_response(callback):
    return jsonify({"message": "Missing or invalid authorization token"}), 401

@jwt.invalid_token_loader
def invalid_token_response(callback):
    return jsonify({"message": "Token is invalid"}), 401

@jwt.expired_token_loader
def expired_token_response(jwt_header, jwt_payload):
    return jsonify({"message": "Token has expired"}), 401

@app.route("/", methods=["GET"])
def index():
    return jsonify({
        "status": "online",
        "message": "Welcome to FoodieExpress API Server",
        "version": "1.0.0"
    }), 200

# Error Handler
@app.errorhandler(404)
def not_found_error(error):
    return jsonify({"message": "Resource not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"message": "Internal server error", "error": str(error)}), 500

if __name__ == "__main__":
    port = int(os.getenv("FLASK_PORT", 5000))
    debug = os.getenv("FLASK_ENV") == "development"
    print(f"Starting FoodieExpress server on port {port}...")
    app.run(host="0.0.0.0", port=port, debug=debug)

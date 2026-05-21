import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load env variables
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/foodieexpress")

# Connect to MongoDB
try:
    client = MongoClient(MONGO_URI)
    # The split extracts db name from mongo URI or falls back to 'foodieexpress'
    db_name = MONGO_URI.split("/")[-1].split("?")[0] if "/" in MONGO_URI else "foodieexpress"
    if not db_name:
        db_name = "foodieexpress"
    db = client[db_name]
    print(f"Connected to MongoDB Atlas / Local at db: {db_name}")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
    db = None

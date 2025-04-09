from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# === Config ===
app = Flask(__name__)
CORS(app)
mongo_uri = os.getenv("MONGO_URI")

# === Database Setup ===
client = MongoClient(mongo_uri)
db = client.JWFoods
coefficients = db.coefficients
users = db.users

# Initialize default coefficients if none exist
if coefficients.count_documents({}) == 0:
    coefficients.insert_one({"distance_coefficient": 0.5, "weight_coefficient": 0.5})

# === Routes ===

# Register
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    if users.find_one({"email": data.get('email')}):
        return jsonify({"error": "Email already exists"}), 400

    hashed_password = generate_password_hash(data.get('password'))
    user = {
        "firstName": data.get('firstName'),
        "lastName": data.get('lastName'),
        "email": data.get('email'),
        "password": hashed_password
    }
    users.insert_one(user)
    return jsonify({"message": "User registered successfully"}), 201

# Login
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = users.find_one({"email": data.get('email')})
    
    if not user or not check_password_hash(user['password'], data.get('password')):
        return jsonify({"error": "Invalid email or password"}), 401

    user_data = {
        "id": str(user.get('_id')),
        "firstName": user.get('firstName'),
        "lastName": user.get('lastName'),
        "email": user.get('email')
    }
    return jsonify({"user": user_data, "message": "Login successful"}), 200

# Get Coefficients
@app.route('/api/coefficients', methods=['GET'])
def get_coefficients():
    coeff = coefficients.find_one({}, {'_id': 0})
    return jsonify(coeff or {})

# Update Coefficients
@app.route('/api/coefficients', methods=['PUT'])
def update_coefficients():
    data = request.json
    try:
        distance = float(data.get("distance_coefficient"))
        weight = float(data.get("weight_coefficient"))
    except (TypeError, ValueError):
        return jsonify({"error": "Invalid coefficient values"}), 400

    coefficients.update_one({}, {"$set": {
        "distance_coefficient": distance,
        "weight_coefficient": weight
    }})
    return jsonify({"message": "Coefficients updated successfully"}), 200

# Delivery Calculator
@app.route('/api/calculate', methods=['POST'])
def calculate_delivery():
    data = request.json
    try:
        distance = float(data.get("distance"))
        weight = float(data.get("weight"))
    except (TypeError, ValueError):
        return jsonify({"error": "Invalid distance or weight values"}), 400

    coeff = coefficients.find_one({}, {'_id': 0})
    if not coeff:
        return jsonify({"error": "Delivery coefficients not found"}), 500

    price = (coeff["distance_coefficient"] * distance) + (coeff["weight_coefficient"] * weight)
    return jsonify({"price": round(price, 2)}), 200

# === Run App ===
if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client
import os

app = Flask(__name__)
CORS(app)  # Allow requests from your React frontend

# Supabase credentials
SUPABASE_URL = "https://glwbbbhkdjvrlyxkbagr.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdsd2JiYmhrZGp2cmx5eGtiYWdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3MzUxNzYsImV4cCI6MjA3MDMxMTE3Nn0.Dfg4nKx9FK2qG568YZeKJvtgCF40mew0tiPgOQY-bI8"

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.route("/add_wish", methods=["POST"])
def add_wish():
    try:
        data = request.get_json()
        wish = data.get("wish")
        image_url = data.get("image_url")

        if not wish:
            return jsonify({"error": "Wish text is required"}), 400

        # Insert into Supabase table "wishes"
        response = supabase.table("wishes").insert({
            "wish": wish,
            "image_url": image_url
        }).execute()

        return jsonify({"message": "Wish added successfully", "data": response.data}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/")
def home():
    return jsonify({"message": "Flask backend is running"}), 200

if __name__ == "__main__":
    app.run(debug=True)

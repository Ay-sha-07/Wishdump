from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client
import os

app = Flask(__name__)
CORS(app)

# ✅ Use environment variables instead of hardcoding
SUPABASE_URL = os.getenv("SUPABASE_URL", "https://glwbbbhkdjvrlyxkbagr.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# POST route → add a wish
@app.route("/api/wishes", methods=["POST"])
def add_wish():
    try:
        data = request.get_json()
        text = data.get("text")
        author = data.get("author", "Anonymous")
        image_url = data.get("image_url")

        if not text:
            return jsonify({"error": "Wish text is required"}), 400

        response = supabase.table("wishes").insert({
            "text": text,
            "author": author,
            "image_url": image_url
        }).execute()

        if response.data:
            return jsonify({"message": "Wish added successfully", "data": response.data}), 201
        else:
            return jsonify({"error": str(response.error)}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# GET route → fetch all wishes
@app.route("/api/wishes", methods=["GET"])
def get_wishes():
    try:
        response = supabase.table("wishes").select("*").order("created_at", desc=True).execute()
        return jsonify(response.data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Health check
@app.route("/")
def home():
    return jsonify({"message": "Flask backend is running"}), 200

if __name__ == "__main__":
    app.run(debug=True)

import os
import random
from flask import Flask, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  # Esto permite peticiones desde otros dominios (como GitHub Pages)
@app.route("/process", methods=["POST"])
def process():
    capacidad = random.randint(1, 100)
    return f"capacidad para comer pollo: {capacidad}"

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

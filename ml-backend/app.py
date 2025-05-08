import os
from flask import Flask, request, send_file

app = Flask(__name__)

@app.route("/process", methods=["POST"])
def process():
    return "pollo autorizao para rebotar en estado cuantico"

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

from flask import Flask, request, jsonify, render_template
from db import Session, Exchange
app = Flask(__name__)

@app.post("/exchanges")
def add_exchange():
    db = Session()

    exchange = Exchange(
        name=request.json["name"],
        api_url=request.json["api_url"],
        websocket_url=request.json.get("websocket_url")
    )

    db.add(exchange)
    db.commit()
    db.close()

    return jsonify({"status": "saved"}), 201
@app.get("/exchanges")
def list_exchanges():
    db = Session()

    rows = db.query(Exchange).all()

    result = []

    for e in rows:
        result.append({
            "id": e.id,
            "name": e.name,
            "api_url": e.api_url,
            "websocket_url": e.websocket_url
        })

    db.close()

    return jsonify(result)
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/health")
def health():
    return jsonify({
        "status": "ok",
        "project": "StockMarket"
    })

if __name__ == "__main__":
    app.run(debug=True)

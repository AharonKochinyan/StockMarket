# StockMarket

Cryptocurrency market backend built with Flask.
The project stores exchange information in PostgreSQL and provides API endpoints for managing exchanges.

---

## Usage

Run the application:

```bash
python3 app.py

The server will start at:

http://127.0.0.1:5000

Available API routes:

POST /exchanges — creates a new exchange record.
GET /exchanges — returns all saved exchanges from the database.
Backend

The backend is built with Flask.

Routes
POST /exchanges

Creates a new cryptocurrency exchange.

Example request:

curl -X POST http://127.0.0.1:5000/exchanges \
-H "Content-Type: application/json" \
-d '{
  "name": "Binance",
  "api_url": "https://api.binance.com",
  "websocket_url": "wss://stream.binance.com:9443/ws"
}'


Example response:

[
  {
    "id": 1,
    "name": "Binance",
    "api_url": "https://api.binance.com",
    "websocket_url": "wss://stream.binance.com:9443/ws"
  }
]
Data Layer

The application uses:

PostgreSQL — database
SQLAlchemy — ORM
psycopg2-binary — PostgreSQL driver
Database Model

The project contains an Exchange model.

Table: exchanges

Column Type Description
id Integer Primary key
name String Exchange name
api_url String REST API endpoint
websocket_url String WebSocket endpoint

SQLAlchemy automatically creates the table when the application starts.

Running
Start PostgreSQL

Linux:

sudo systemctl start postgresql

macOS:

brew services start postgresql@16
Set Database URL
export DATABASE_URL="postgresql://genesis:secret@localhost:5432/genesis"
Activate Virtual Environment
source .venv/bin/activate

Run Server
python3 app.py

Application:

http://127.0.0.1:5000


# StockMarket

## Backend

This project uses Flask as the backend framework.

Routes:

- / — displays the main HTML page.
- /health — returns JSON with the backend status.

Example response:

JSON
{
  "status": "ok",
  "project": "StockMarket"
}



## Running

Create and activate a virtual environment:

Bash
python3 -m venv .venv
source .venv/bin/activate



Install dependencies:

Bash
pip install -r requirements.txt



Run the server:

Bash
python3 app.py



Open:

- http://127.0.0.1:5000/
- http://127.0.0.1:5000/health


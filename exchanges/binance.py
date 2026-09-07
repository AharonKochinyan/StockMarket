import requests


class Binance:

    def __init__(self):
        self.spot_url = "https://api.binance.com/api/v3/exchangeInfo"
        self.futures_url = "https://fapi.binance.com/fapi/v1/exchangeInfo"

    def get_spot_symbols(self):
        response = requests.get(self.spot_url)
        response.raise_for_status()

        data = response.json()

        symbols = []

        for symbol in data["symbols"]:
            if symbol["status"] == "TRADING":
                symbols.append({
                    "symbol": symbol["symbol"],
                    "base": symbol["baseAsset"],
                    "quote": symbol["quoteAsset"]
                })

        return symbols

    def get_futures_symbols(self):
        response = requests.get(self.futures_url)
        response.raise_for_status()

        data = response.json()

        symbols = []

        for symbol in data["symbols"]:
            if symbol["status"] == "TRADING":
                symbols.append({
                    "symbol": symbol["symbol"],
                    "base": symbol["baseAsset"],
                    "quote": symbol["quoteAsset"]
                })

        return symbols

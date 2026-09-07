// ==========================================
// CRYPTO MARKET MANAGER
// Frontend Controller
// ==========================================

console.log("APP.JS WORKS!");

// ==========================================
// DOM LOADED
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("DOM LOADED");

    // ==========================================
    // ELEMENTS
    // ==========================================

    const marketSelect = document.getElementById("market");
    const pairSearch = document.getElementById("pairSearch");
    const pairSelect = document.getElementById("pair");
    const loadDataButton = document.getElementById("loadData");

    const selectedMarket = document.getElementById("selectedMarket");
    const selectedPair = document.getElementById("selectedPair");
    const connectionStatus = document.getElementById("connectionStatus");

    const marketTable = document.getElementById("marketTable");
    const lastUpdate = document.getElementById("lastUpdate");

    const bestBuy = document.getElementById("bestBuy");
    const bestSell = document.getElementById("bestSell");
    const priceDifference = document.getElementById("priceDifference");

    const orderbookExchange = document.getElementById("orderbookExchange");

    const asksContainer = document.getElementById("asks");
    const bidsContainer = document.getElementById("bids");


    // ==========================================
    // EXCHANGES
    // ==========================================

    const exchanges = [
        "Binance",
        "Bybit",
        "OKX",
        "Kraken"
    ];


    // ==========================================
    // STATE
    // ==========================================

    let currentMarket = "spot";
    let currentPair = "BTCUSDT";

    let marketData = {};


    // ==========================================
    // INITIALIZATION
    // ==========================================

    updateSelectedMarket();
    updateSelectedPair();
    initializeExchangeTable();


    // ==========================================
    // MARKET CHANGE
    // ==========================================

    marketSelect.addEventListener("change", function () {

        currentMarket = marketSelect.value;

        updateSelectedMarket();

        clearMarketData();

        console.log("Market:", currentMarket);

    });


    // ==========================================
    // PAIR CHANGE
    // ==========================================

    pairSelect.addEventListener("change", function () {

        currentPair = pairSelect.value;

        updateSelectedPair();

        clearMarketData();

        console.log("Pair:", currentPair);

    });


    // ==========================================
    // PAIR SEARCH
    // ==========================================

    pairSearch.addEventListener("input", function () {

        filterPairs();

    });


    // ==========================================
    // SHOW MARKET BUTTON
    // ==========================================

    loadDataButton.addEventListener("click", function () {

        startMarket();

    });


    // ==========================================
    // UPDATE MARKET
    // ==========================================

    function updateSelectedMarket() {

        if (marketSelect.value === "spot") {

            selectedMarket.textContent = "Spot";

        } else {

            selectedMarket.textContent = "Futures";

        }

    }


    // ==========================================
    // UPDATE PAIR
    // ==========================================

    function updateSelectedPair() {

        const option =
            pairSelect.options[pairSelect.selectedIndex];

        if (!option) {
            return;
        }

        selectedPair.textContent =
            option.textContent.trim();

    }


    // ==========================================
    // SEARCH PAIRS
    // ==========================================

    function filterPairs() {

        const search =
            pairSearch.value.toUpperCase().trim();

        const options =
            pairSelect.querySelectorAll("option");

        options.forEach(function (option) {

            const text =
                option.textContent.toUpperCase();

            const value =
                option.value.toUpperCase();

            if (
                text.includes(search) ||
                value.includes(search)
            ) {

                option.hidden = false;

            } else {

                option.hidden = true;

            }

        });

    }


    // ==========================================
    // INITIALIZE TABLE
    // ==========================================

    function initializeExchangeTable() {

        marketTable.innerHTML = "";

        exchanges.forEach(function (exchange) {

            const row =
                document.createElement("tr");

            const exchangeCell =
                document.createElement("td");

            const exchangeName =
                document.createElement("strong");

            exchangeName.textContent =
                exchange;

            exchangeCell.appendChild(exchangeName);

            row.appendChild(exchangeCell);

            row.innerHTML += "<td>—</td>";
            row.innerHTML += "<td>—</td>";
            row.innerHTML += "<td>—</td>";
            row.innerHTML += "<td>—</td>";

            marketTable.appendChild(row);

        });

    }


    // ==========================================
    // START MARKET
    // ==========================================

    function startMarket() {

        currentMarket =
            marketSelect.value;

        currentPair =
            pairSelect.value;

        updateSelectedMarket();
        updateSelectedPair();

        clearMarketData();

        connectionStatus.textContent =
            "Connecting...";

        console.log(
            "Starting market:",
            currentMarket,
            currentPair
        );

        setTimeout(function () {

            startDemoMarket();

        }, 500);

    }


    // ==========================================
    // DEMO MARKET
    // ==========================================

    function startDemoMarket() {

        connectionStatus.textContent =
            "Connected";

        connectionStatus.style.color =
            "#3fb950";

        generateDemoData();

        updateMarketTable();

        calculateArbitrage();

        generateDemoOrderBook();

        updateLastUpdate();

    }


    // ==========================================
    // GENERATE DEMO DATA
    // ==========================================

    function generateDemoData() {

        const basePrice =
            getBasePrice(currentPair);

        marketData = {};

        exchanges.forEach(function (exchange) {

            const variation =
                (Math.random() - 0.5) * 200;

            const last =
                basePrice + variation;

            const bid =
                last - Math.random() * 5;

            const ask =
                last + Math.random() * 5;

            const spread =
                ask - bid;

            marketData[exchange] = {

                bid: bid,
                ask: ask,
                last: last,
                spread: spread

            };

        });

    }


    // ==========================================
    // BASE PRICE
    // ==========================================

    function getBasePrice(pair) {

        const prices = {

            BTCUSDT: 110000,
            ETHUSDT: 4200,
            BNBUSDT: 850,
            SOLUSDT: 200,
            XRPUSDT: 3,
            DOGEUSDT: 0.25,
            ADAUSDT: 0.9,
            AVAXUSDT: 25,
            LINKUSDT: 25,
            DOTUSDT: 4,
            TRXUSDT: 0.35,
            LTCUSDT: 110,
            SHIBUSDT: 0.000013,
            BCHUSDT: 600,
            UNIUSDT: 8

        };

        return prices[pair] || 100;

    }


    // ==========================================
    // UPDATE MARKET TABLE
    // ==========================================

    function updateMarketTable() {

        marketTable.innerHTML = "";

        Object.entries(marketData).forEach(
            function ([exchange, data]) {

                const row =
                    document.createElement("tr");

                const exchangeCell =
                    document.createElement("td");

                const exchangeName =
                    document.createElement("strong");

                exchangeName.textContent =
                    exchange;

                exchangeCell.appendChild(exchangeName);

                row.appendChild(exchangeCell);

                const bidCell =
                    document.createElement("td");

                bidCell.textContent =
                    formatPrice(data.bid);

                row.appendChild(bidCell);

                const askCell =
                    document.createElement("td");

                askCell.textContent =
                    formatPrice(data.ask);

                row.appendChild(askCell);

                const lastCell =
                    document.createElement("td");

                lastCell.textContent =
                    formatPrice(data.last);

                row.appendChild(lastCell);

                const spreadCell =
                    document.createElement("td");

                spreadCell.textContent =
                    formatPrice(data.spread);

                row.appendChild(spreadCell);

                marketTable.appendChild(row);

            }
        );

    }


    // ==========================================
    // ARBITRAGE
    // ==========================================

    function calculateArbitrage() {

        let lowestAsk = Infinity;
        let highestBid = -Infinity;

        let buyExchange = "";
        let sellExchange = "";

        Object.entries(marketData).forEach(
            function ([exchange, data]) {

                if (data.ask < lowestAsk) {

                    lowestAsk = data.ask;
                    buyExchange = exchange;

                }

                if (data.bid > highestBid) {

                    highestBid = data.bid;
                    sellExchange = exchange;

                }

            }
        );

        if (
            buyExchange === "" ||
            sellExchange === ""
        ) {
            return;
        }

        const difference =
            highestBid - lowestAsk;

        bestBuy.textContent =
            buyExchange +
            " — " +
            formatPrice(lowestAsk);

        bestSell.textContent =
            sellExchange +
            " — " +
            formatPrice(highestBid);

        priceDifference.textContent =
            formatPrice(difference);

    }


    // ==========================================
    // ORDER BOOK
    // ==========================================

    function generateDemoOrderBook() {

        const exchange =
            findBestExchange();

        if (!exchange) {
            return;
        }

        orderbookExchange.textContent =
            exchange;

        const data =
            marketData[exchange];

        asksContainer.innerHTML = "";
        bidsContainer.innerHTML = "";


        // ======================================
        // ASKS
        // ======================================

        for (let i = 0; i < 10; i++) {

            const price =
                data.ask + i * 2;

            const amount =
                Math.random() * 2;

            const total =
                price * amount;

            const row =
                document.createElement("tr");

            row.innerHTML =
                "<td>" +
                formatPrice(price) +
                "</td>" +

                "<td>" +
                amount.toFixed(4) +
                "</td>" +

                "<td>" +
                formatPrice(total) +
                "</td>";

            asksContainer.appendChild(row);

        }


        // ======================================
        // BIDS
        // ======================================

        for (let i = 0; i < 10; i++) {

            const price =
                data.bid - i * 2;

            const amount =
                Math.random() * 2;

            const total =
                price * amount;

            const row =
                document.createElement("tr");

            row.innerHTML =
                "<td>" +
                formatPrice(price) +
                "</td>" +

                "<td>" +
                amount.toFixed(4) +
                "</td>" +

                "<td>" +
                formatPrice(total) +
                "</td>";

            bidsContainer.appendChild(row);

        }

    }


    // ==========================================
    // FIND BEST EXCHANGE
    // ==========================================

    function findBestExchange() {

        let best = null;
        let bestPrice = Infinity;

        Object.entries(marketData).forEach(
            function ([exchange, data]) {

                if (data.ask < bestPrice) {

                    bestPrice = data.ask;
                    best = exchange;

                }

            }
        );

        return best;

    }


    // ==========================================
    // CLEAR DATA
    // ==========================================

    function clearMarketData() {

        marketData = {};

        connectionStatus.textContent =
            "Disconnected";

        connectionStatus.style.color = "";

        lastUpdate.textContent =
            "Last update: —";

        orderbookExchange.textContent =
            "—";

        bestBuy.textContent =
            "—";

        bestSell.textContent =
            "—";

        priceDifference.textContent =
            "—";

        initializeExchangeTable();

        asksContainer.innerHTML =
            "<tr>" +
                "<td>—</td>" +
                "<td>—</td>" +
                "<td>—</td>" +
            "</tr>";

        bidsContainer.innerHTML =
            "<tr>" +
                "<td>—</td>" +
                "<td>—</td>" +
                "<td>—</td>" +
            "</tr>";

    }


    // ==========================================
    // LAST UPDATE
    // ==========================================

    function updateLastUpdate() {

        const now =
            new Date();

        const time =
            now.toLocaleTimeString();

        lastUpdate.textContent =
            "Last update: " + time;

    }


    // ==========================================
    // FORMAT PRICE
    // ==========================================

    function formatPrice(price) {

        if (!Number.isFinite(price)) {
            return "—";
        }

        if (price < 0.01) {
            return price.toFixed(8);
        }

        if (price < 1) {
            return price.toFixed(6);
        }

        if (price < 100) {
            return price.toFixed(4);
        }

        return price.toFixed(2);

    }


    // ==========================================
    // AUTO REFRESH
    // ==========================================

    setInterval(function () {

        if (
            connectionStatus &&
            connectionStatus.textContent === "Connected"
        ) {

            generateDemoData();

            updateMarketTable();

            calculateArbitrage();

            generateDemoOrderBook();

            updateLastUpdate();

        }

    }, 2000);
});


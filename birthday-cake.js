function init() {
    const url = new URL(window.location.href);

    appendCandles(url.searchParams.get("candles"));
    appendName(url.searchParams.get("name"));
    appendMessages(url.searchParams.getAll("message"));
}

function appendMessages(messages) {
    if (!Array.isArray(messages) || messages.length === 0) return;

    const messageBox = document.getElementById("message_container");
    if (!messageBox) return;

    messageBox.innerHTML = messages.join("<br />");
}

function appendName(name) {
    const messageBox = document.getElementById("message_container");
    if (!messageBox) return;

    messageBox.innerHTML = `Doğum günün kutlu olsun ${name ? name : "abiciğim!"} 🎂`;
}

function appendCandles(candlesCount) {
    if (!candlesCount) candlesCount = 9;
    else candlesCount = parseInt(candlesCount);

    const cake = document.querySelector(".cake");
    if (!cake) {
        console.error("Hata: .cake elementi bulunamadı!");
        return;
    }

    // Pasta konumunu sabitle
    cake.style.position = "relative";
    cake.style.display = "block";
    cake.style.margin = "0 auto";

    let candleHalfCount = 1;
    for (let i = 0; i < candlesCount; i++) {
        if ((i + 1) < (candlesCount / 2)) candleHalfCount++;
        else if ((i + 1) > (candlesCount / 2)) candleHalfCount--;

        const candleXPositionOffset = candleHalfCount * (20 / (candlesCount / 2));
        const candleXPosition = ((-310 + (600 / candlesCount) / 2) + ((600 / candlesCount) * i));
        const candleYPosition = -1 * Math.floor(Math.random() * ((325 + candleXPositionOffset) - (320 - candleXPositionOffset) + 1) + (320 - candleXPositionOffset));

        // Mumun pozisyonu artık pastanın üstüne göre olacak
        const candleHTML = `
            <div id="candle_${i}" class="candle" 
                 style="position:absolute;
                        left:calc(50% + ${candleXPosition}px);
                        top:${candleYPosition}px;
                        transform:translateX(-50%);">
            </div>`;

        cake.insertAdjacentHTML("beforeend", candleHTML);

        const candle = document.getElementById(`candle_${i}`);
        candle.onclick = () => putOutCandle(`candle_${i}`);

        for (let j = 0; j < 5; j++) {
            candle.innerHTML += `<div class="flame"></div>`;
        }
    }
}

function putOutCandle(candle_name) {
    if (!candle_name) return;

    const candle = document.getElementById(candle_name);
    if (!candle) return;

    candle.querySelectorAll(".flame").forEach(flame => flame.remove());
}

function putOutCandles() {
    const candles = document.getElementsByClassName("candle");
    if (!candles || candles.length === 0) return;

    for (let i = 0; i < candles.length; i++) {
        putOutCandle(`candle_${i}`);
    }
}

// Sayfa yüklendiğinde otomatik başlat
window.onload = init;

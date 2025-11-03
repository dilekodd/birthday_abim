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

  messageBox.innerHTML = `${messages.join("<br />")}`;
}

function appendName(message) {
  const messageBox = document.getElementById("message_container");
  if (!messageBox) return;

  messageBox.innerHTML = `Doğum günün kutlu olsun ${message ?? "abiciğim 🎉"}`;
}

function appendCandles(candlesCount) {
  if (!candlesCount || isNaN(candlesCount)) candlesCount = 9;

  const cake = document.querySelector(".cake");
  if (!cake) return;

  // mevcut mumları temizle
  cake.querySelectorAll(".candle").forEach(c => c.remove());

  let candleHalfCount = 1;

  for (let i = 0; i < candlesCount; i++) {
    if ((i + 1) < (candlesCount / 2)) candleHalfCount++;
    else if ((i + 1) > (candlesCount / 2)) candleHalfCount--;

    const candleXPositionOffset = candleHalfCount * (20 / (candlesCount / 2));
    const candleXPosition = ((-310 + (600 / candlesCount) / 2) + ((600 / candlesCount) * i));
    const candleYPosition = -1 * Math.floor(
      Math.random() * ((325 + candleXPositionOffset) - (320 - candleXPositionOffset) + 1) +
      (320 - candleXPositionOffset)
    );

    // mum oluştur
    const candle = document.createElement("div");
    candle.id = `candle_${i}`;
    candle.className = "candle";
    candle.style.marginLeft = `${candleXPosition}px`;
    candle.style.marginTop = `${candleYPosition}px`;
    candle.onclick = () => putOutCandle(`candle_${i}`);

    // alevleri ekle
    for (let j = 0; j < 5; j++) {
      const flame = document.createElement("div");
      flame.className = "flame";
      candle.appendChild(flame);
    }

    cake.appendChild(candle); // 🎂 sadece pastaya ekle
  }
}

function putOutCandle(candle_name) {
  if (!candle_name) return;

  const candle = document.getElementById(candle_name);
  if (!candle) return;

  candle.querySelectorAll(".flame").forEach(f => f.remove());
}

function putOutCandles() {
  document.querySelectorAll(".candle").forEach(c => putOutCandle(c.id));
}

window.onload = init;

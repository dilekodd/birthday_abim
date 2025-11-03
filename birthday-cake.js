function init() {
  const url = new URL(window.location.href);
  appendCandles(url.searchParams.get("candles"));
  appendName(url.searchParams.get("name"));
  appendMessages(url.searchParams.getAll("message"));
}

// 🎂 Mesaj kutusu
function appendMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0) return;

  const messageBox = document.getElementById("message_container");
  if (!messageBox) return;

  messageBox.innerHTML = `${messages.join("<br />")}`;
}

// 🎉 Doğum günü mesajı
function appendName(message) {
  const box = document.getElementById("message_container");
  if (!box) return;

  box.innerHTML = `Doğum günün kutlu olsun ${message ?? "abiciğim 🎉"}`;
}

// 🕯️ Mumları pastaya ekler
function appendCandles(candlesCount) {
  if (candlesCount == null || isNaN(candlesCount)) candlesCount = 7;

  const cake = document.querySelector(".cake");
  if (!cake) return;

  // Önce varsa eski mumları temizle
  document.querySelectorAll(".candle").forEach(c => c.remove());

  for (let i = 0; i < candlesCount; i++) {
    const x = 40 + i * (320 / candlesCount);
    const candle = document.createElement("div");
    candle.className = "candle";
    candle.style.left = `${x}px`;
    candle.onclick = () => putOutCandle(candle);

    for (let j = 0; j < 3; j++) {
      const flame = document.createElement("div");
      flame.className = "flame";
      candle.appendChild(flame);
    }

    cake.appendChild(candle);
  }
}

// 🔥 Tek mum söndürme
function putOutCandle(candle) {
  if (!candle) return;
  const flames = candle.querySelectorAll(".flame");
  flames.forEach(f => f.remove());
}

// 💨 Tüm mumları söndürme
function putOutCandles() {
  document.querySelectorAll(".candle").forEach(c => putOutCandle(c));
}

// 🔔 Sayfa yüklenince başlat
window.onload = init;

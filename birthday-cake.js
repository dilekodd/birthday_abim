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
  messageBox.innerHTML = `Doğum günün kutlu olsun abiciğim ${
    message != null ? message : "nice mutlu senelere 💛"
  }`;
}

function appendCandles(candlesCount) {
  if (candlesCount == null) candlesCount = 9;

  const cake = document.querySelector(".cake");
  if (!cake) return;

  // 🔸 Pastanın üst kısmını hesapla
  const cakeRect = cake.getBoundingClientRect();
  const cakeWidth = cakeRect.width;
  const cakeHeight = cakeRect.height;
  const candleSpacing = cakeWidth / (candlesCount + 1);

  // 🔸 Mumları eklemeden önce varsa temizle
  cake.querySelectorAll(".candle").forEach((c) => c.remove());

  for (let i = 0; i < candlesCount; i++) {
    const candle = document.createElement("div");
    candle.className = "candle";

    // 🔹 Hesaplama: kekin tam üst kenarına hizala
    candle.style.position = "absolute";
    candle.style.bottom = `${cakeHeight - cakeHeight * 0.98}px`; // üst kremaya denk
    candle.style.left = `${(i + 1) * candleSpacing - 8}px`; // merkez hizası
    candle.style.zIndex = 3;

    candle.onclick = () => putOutCandle(`candle_${i}`);
    candle.id = `candle_${i}`;

    // 🔹 Alevler
    for (let j = 0; j < 5; j++) {
      const flame = document.createElement("div");
      flame.className = "flame";
      candle.appendChild(flame);
    }

    cake.appendChild(candle);
  }
}

function putOutCandle(candle_name) {
  const candle = document.getElementById(candle_name);
  if (!candle) return;
  candle.querySelectorAll(".flame").forEach((f) => f.remove());
}

function putOutCandles() {
  document.querySelectorAll(".candle").forEach((c) => putOutCandle(c.id));
}

window.onload = init;

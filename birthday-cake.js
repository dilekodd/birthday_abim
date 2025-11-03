function init() {
  const url = new URL(window.location.href);

  appendCandles(url.searchParams.get("candles"));
  appendName(url.searchParams.get("name"));
  appendMessages(url.searchParams.getAll("message"));
}

// 🎉 Mesajları ekleme
function appendMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0) return;

  const messageBox = document.getElementById("message_container");
  if (!messageBox) return;

  messageBox.innerHTML = messages.join("<br />");
}

// 💛 İsmi ekleme
function appendName(message) {
  const messageBox = document.getElementById("message_container");
  if (!messageBox) return;

  messageBox.innerHTML = `Doğum günün kutlu olsun ${
    message ? message : "abiciğim!"
  } 🎂`;
}

// 🕯️ Mumları oluşturma
function appendCandles(candlesCount) {
  if (!candlesCount) candlesCount = 9;

  const cake = document.querySelector(".cake");
  if (!cake) return;

  let candleHalfCount = 1;

  for (let i = 0; i < candlesCount; i++) {
    if (i + 1 < candlesCount / 2) candleHalfCount++;
    else if (i + 1 > candlesCount / 2) candleHalfCount--;

    const candleXPositionOffset = candleHalfCount * (20 / (candlesCount / 2));
    const candleXPosition =
      -310 + 600 / candlesCount / 2 + (600 / candlesCount) * i;
    const candleYPosition =
      -Math.floor(
        Math.random() * ((325 + candleXPositionOffset) - (320 - candleXPositionOffset) + 1) +
        (320 - candleXPositionOffset)
      );

    // 🔧 Mumları doğrudan pastanın içine ekle
    cake.insertAdjacentHTML(
      "beforeend",
      `<div id="candle_${i}" class="candle" 
         style="margin-left:${candleXPosition}px;
                margin-top:${candleYPosition}px;"></div>`
    );

    const candle = document.getElementById(`candle_${i}`);
    candle.setAttribute("onclick", `putOutCandle("candle_${i}")`);

    // Her mumun alevlerini ekle
    for (let j = 0; j < 5; j++) {
      candle.innerHTML += `<div class="flame"></div>`;
    }
  }
}

// 🔥 Tek mumu söndürme
function putOutCandle(candle_name) {
  if (!candle_name) return;

  const candle = document.getElementById(candle_name);
  if (!candle) return;

  const flames = candle.querySelectorAll(".flame");
  flames.forEach((flame) => flame.remove());
}

// 💨 Tüm mumları söndürme
function putOutCandles() {
  const candles = document.getElementsByClassName("candle");
  if (!candles) return;

  for (let i = 0; i < candles.length; i++) {
    putOutCandle(`candle_${i}`);
  }
}

<script>
function init() {
  var url = new URL(window.location.href);
  appendCandles(url.searchParams.get("candles"));
  appendName(url.searchParams.get("name"));
  appendMessages(url.searchParams.getAll("message"));
}

function appendMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0) return;
  let messageBox = document.getElementById("message_container");
  if (!messageBox) return;
  messageBox.innerHTML = `${messages.join("<br />")}`;
}

function appendName(message) {
  let messageBox = document.getElementById("message_container");
  if (!messageBox) return;
  messageBox.innerHTML = `Doğum günün kutlu olsun ${message != null ? message : "abiciğim!"}`;
}

function appendCandles(candlesCount) {
  if (candlesCount == null) candlesCount = 9;

  let candleHalfCount = 1;
  for (var i = 0; i < candlesCount; i++) {
    if ((i + 1) < (candlesCount / 2)) candleHalfCount++;
    else if ((i + 1) > (candlesCount / 2)) candleHalfCount--;

    let candleXPositionOffset = candleHalfCount * (20 / (candlesCount / 2));
    let candleXPosition = ((-310 + (600 / candlesCount) / 2) + ((600 / candlesCount) * i));
    let candleYPosition = -1 * Math.floor(
      Math.random() * ((325 + candleXPositionOffset) - (320 - candleXPositionOffset) + 1) + (320 - candleXPositionOffset)
    );

    document.body.innerHTML += `
      <div id="candle_${i}" class="candle"
        style="margin-left:${candleXPosition}px; margin-top:${candleYPosition}px;">
      </div>
    `;

    let candle = document.getElementById(`candle_${i}`);
    candle.setAttribute("onClick", `putOutCandle('candle_${i}')`);

    for (var j = 0; j < 5; j++) {
      candle.innerHTML += `<div class="flame"></div>`;
    }
  }
}

function putOutCandle(candle_name) {
  if (!candle_name) return;
  let candle = document.getElementById(candle_name);
  if (!candle) return;
  let flame;
  while ((flame = candle.querySelector(".flame")) !== null) {
    flame.remove();
  }
}

function putOutCandles() {
  let candles = document.getElementsByClassName("candle");
  if (!candles) return;
  for (let i = 0; i < candles.length; i++) {
    putOutCandle(`candle_${i}`);
  }
}

window.onload = init;
</script>

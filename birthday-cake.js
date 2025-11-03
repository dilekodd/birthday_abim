function init() {
	var url = new URL(window.location.href);
	appendCandles(url.searchParams.get("candles"));
	appendName(url.searchParams.get("name"));
	appendMessages(url.searchParams.getAll("message"));
}

function appendMessages(messages) {
	if (!Array.isArray(messages) || messages.length == 0) return;
	
	let messageBox = document.getElementById("message_container");
	if (!messageBox) return;
	
	messageBox.innerHTML = `${messages.join("<br />")}`;
}

function appendName(message) {
	let messageBox = document.getElementById("message_container");
	if (!messageBox) return;

	messageBox.innerHTML = `Doğum günün kutlu olsun abiciğim ${message != null ? message : "yeni yaşın çok mutlu olsun <3"}`;
}

function appendCandles(candlesCount) {
	if (candlesCount == null) candlesCount = 9;

	// 🔸 sadece .cake içine mum eklenecek
	const cake = document.querySelector(".cake");
	if (!cake) return;

	let candleHalfCount = 1;
	for (let i = 0; i < candlesCount; i++) {
		if ((i + 1) < (candlesCount / 2)) candleHalfCount++;
		else if ((i + 1) > (candlesCount / 2)) candleHalfCount--;

		let candleXPositionOffset = candleHalfCount * (20 / (candlesCount / 2));
		let candleXPosition = ((-310 + (600 / candlesCount) / 2) + ((600 / candlesCount) * i));
		let candleYPosition = -1 * Math.floor(Math.random() * ((325 + candleXPositionOffset) - (320 - candleXPositionOffset) + 1) + (320 - candleXPositionOffset));

		// 🔸 yeni mum oluştur
		let candle = document.createElement("div");
		candle.id = `candle_${i}`;
		candle.className = "candle";
		candle.style.marginLeft = `${candleXPosition}px`;
		candle.style.marginTop = `${candleYPosition}px`;
		candle.onclick = function() { putOutCandle(`candle_${i}`); };

		// 🔸 alevleri ekle
		for (let j = 0; j < 5; j++) {
			let flame = document.createElement("div");
			flame.className = "flame";
			candle.appendChild(flame);
		}

		// 🔸 body'ye değil, pastaya ekle
		cake.appendChild(candle);
	}
}

function putOutCandle(candle_name) {
	if (!candle_name) return;
	let candle = document.getElementById(candle_name);
	if (!candle) return;

	let flames = candle.querySelectorAll(".flame");
	flames.forEach(f => f.remove());
}

function putOutCandles() {
	let candles = document.getElementsByClassName("candle");
	if (!candles) return;
	for (let i = 0; i < candles.length; i++) {
		putOutCandle(candles[i].id);
	}
}

window.onload = init;

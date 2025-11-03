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
		message != null ? message : "yeni yaşın çok mutlu olsun <3"
	}`;
}

function appendCandles(candlesCount) {
	if (candlesCount == null) candlesCount = 9;

	const cake = document.querySelector(".cake");
	if (!cake) return;

	// 🔸 pastanın gerçek genişliğini al
	const cakeWidth = cake.offsetWidth;
	const baseY = -330; // mumların yüksekliği sabit (CSS'teki -325’e yakın)
	const candleSpacing = cakeWidth / (candlesCount + 1);

	for (let i = 0; i < candlesCount; i++) {
		const candle = document.createElement("div");
		candle.id = `candle_${i}`;
		candle.className = "candle";

		// 🔸 her mumun pozisyonu pasta genişliğine göre
		const x = (i + 1) * candleSpacing - cakeWidth / 2 - 9; // 9 yarı genişlik
		candle.style.marginLeft = `${x}px`;
		candle.style.marginTop = `${baseY}px`;
		candle.onclick = () => putOutCandle(`candle_${i}`);

		// 🔸 alevleri ekle
		for (let j = 0; j < 5; j++) {
			const flame = document.createElement("div");
			flame.className = "flame";
			candle.appendChild(flame);
		}
		cake.appendChild(candle);
	}
}

function putOutCandle(candle_name) {
	if (!candle_name) return;
	const candle = document.getElementById(candle_name);
	if (!candle) return;
	candle.querySelectorAll(".flame").forEach((f) => f.remove());
}

function putOutCandles() {
	const candles = document.getElementsByClassName("candle");
	if (!candles) return;
	for (let i = 0; i < candles.length; i++) {
		putOutCandle(candles[i].id);
	}
}

window.onload = init;

function appendCandles(candlesCount) {
  if (candlesCount == null) candlesCount = 9;

  const cake = document.querySelector(".cake");
  if (!cake) return;

  // 🔸 Pastanın ölçülerini al
  const cakeRect = cake.getBoundingClientRect();
  const cakeWidth = cakeRect.width;
  const cakeHeight = cakeRect.height;
  const candleSpacing = cakeWidth / (candlesCount + 1);

  // 🔸 Varsa eski mumları temizle
  cake.querySelectorAll(".candle").forEach((c) => c.remove());

  for (let i = 0; i < candlesCount; i++) {
    const candle = document.createElement("div");
    candle.className = "candle";
    candle.style.position = "absolute";

    // 🔹 Burayı değiştirdik (önceden oranlıydı)
    candle.style.bottom = `${cakeHeight - 40}px`;
    candle.style.left = `${(i + 1) * candleSpacing - 8}px`;
    candle.style.zIndex = 3;

    candle.onclick = () => putOutCandle(`candle_${i}`);
    candle.id = `candle_${i}`;

    // 🔹 Alevleri ekle
    for (let j = 0; j < 5; j++) {
      const flame = document.createElement("div");
      flame.className = "flame";
      candle.appendChild(flame);
    }

    cake.appendChild(candle);
  }
}

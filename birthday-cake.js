/* birthday-cake.js */

function init() {
    const url = new URL(window.location.href);

    appendName(url.searchParams.get("name"));
    // Mumları en son ekle
    appendCandles(url.searchParams.get("candles"));
    // Mesajları isimden SONRA ekle
    appendMessages(url.searchParams.getAll("message"));
}

function appendMessages(messages) {
    if (!Array.isArray(messages) || messages.length === 0) return;

    const messageBox = document.getElementById("message_container");
    if (!messageBox) return;
    
    // Var olan doğum günü mesajını koru ve altına mesajları ekle
    messageBox.innerHTML += `<br/>${messages.join("<br />")}`;
}

function appendName(name) {
    const messageBox = document.getElementById("message_container");
    if (!messageBox) return;
    
    // Doğum günü mesajını ayarla
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

    // CSS'te konumlandırmayı yaptığımız için bu satırları KALDIRIYORUZ:
    /*
    cake.style.position = "relative";
    cake.style.display = "block";
    cake.style.margin = "0 auto";
    */

    let candleHalfCount = 1;
    for (let i = 0; i < candlesCount; i++) {
        // ... (mumların pozisyon hesaplama mantığı aynı kalabilir) ...
        
        // Pasta 400px genişliğinde varsayıldığı için düzeltilmiş X pozisyonu
        const CAKE_WIDTH = 400; // max-width değeri
        const CANDLE_WIDTH = 18;
        const spacing = (CAKE_WIDTH - (candlesCount * CANDLE_WIDTH)) / (candlesCount + 1);
        
        // Soldan başlangıç noktası + (boşluk + mum genişliği) * sıra numarası
        const candleXPosition = spacing + (spacing + CANDLE_WIDTH) * i; 

        // Mumun Y pozisyonu (pastanın üstü varsayılan olarak)
        // Pastanın üst katmanı 200px yüksekliğinde, kreması 100px. 
        // Mumun başlangıç noktası için bir offset belirliyoruz.
        const yOffset = 100; // Pastanın üst katmanı ile mum arasına bir boşluk
        const candleYPosition = yOffset - 110; // 110 mum yüksekliği + boşluk

        // Mumun pozisyonu artık pastanın üstüne göre olacak
        const candleHTML = `
            <div id="candle_${i}" class="candle" 
                 style="position:absolute;
                        /* LEFT: Yatayda X pozisyonu + Mumun kendi genişliğinin yarısı kadar geri */
                        left:${candleXPosition}px;
                        /* TOP: Dikey pozisyon */
                        top:${candleYPosition}px;">
            </div>`;

        // Mumları pastanın içine ekle
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

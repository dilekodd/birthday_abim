function init() {
    const url = new URL(window.location.href);

    // İsim ve diğer mesajları sırayla yerleştir
    appendName(url.searchParams.get("name"));
    appendMessages(url.searchParams.getAll("message"));
    
    // Mumları en son ekle
    appendCandles(url.searchParams.get("candles"));
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

    // Sadece isim/doğum günü mesajını ayarla
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

    let candleHalfCount = 1;
    for (let i = 0; i < candlesCount; i++) {
        // Mum sayısına göre pozisyon hesaplaması için sabitler
        const CAKE_WIDTH = 400; // Pastanın max-width değeri
        const CANDLE_WIDTH = 18;
        
        // Mumları pastanın genişliğine (400px) göre eşit aralıklarla yerleştirme
        const spacing = (CAKE_WIDTH - (candlesCount * CANDLE_WIDTH)) / (candlesCount + 1);
        
        // Soldan başlangıç noktası + (boşluk + mum genişliği) * sıra numarası
        const candleXPosition = spacing + (spacing + CANDLE_WIDTH) * i; 

        // DÜZELTME: Mumun Y pozisyonu (top değeri)
        // Mumlar artık kremanın tam üstüne oturacak.
        const candleYPosition = 0; 

        const candleHTML = `
            <div id="candle_${i}" class="candle" 
                 style="position:absolute;
                        left:${candleXPosition}px;
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

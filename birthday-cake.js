function init() {
    const url = new URL(window.location.href);

    // Düzgün sıralama: Önce isim, sonra diğer mesajlar, en son mumlar
    appendName(url.searchParams.get("name"));
    appendMessages(url.searchParams.getAll("message"));
    appendCandles(url.searchParams.get("candles"));
}

function appendMessages(messages) {
    if (!Array.isArray(messages) || messages.length === 0) return;

    const messageBox = document.getElementById("message_container");
    if (!messageBox) return;

    // DÜZELTME: Mesajları üzerine yazmak yerine, ismin/ana mesajın altına ekle
    messageBox.innerHTML += `<br/>${messages.join("<br />")}`;
}

function appendName(name) {
    const messageBox = document.getElementById("message_container");
    if (!messageBox) return;

    // DÜZELTME: Hatalı ve üzerine yazan satırlar silindi
    // name parametresi varsa kullan, yoksa "abiciğim!" yaz
    messageBox.innerHTML = `Doğum günün kutlu olsun ${name ? name : "abiciğim!"} 🎂`;
}

function appendCandles(candlesCount) {
    if (!candlesCount) candlesCount = 9;
    else candlesCount = parseInt(candlesCount);

    // Kullanıcının orijinal JS'teki karmaşık konumlandırma mantığı korunuyor
    let candleHalfCount = 1;
    for (let i = 0; i < candlesCount; i++) {
        if ((i + 1) < (candlesCount / 2)) candleHalfCount++;
        else if ((i + 1) > (candlesCount / 2)) candleHalfCount--;

        let candleXPositionOffset = candleHalfCount * (20 / (candlesCount / 2));
        let candleXPosition = ((-310 + (600 / candlesCount) / 2) + ((600 / candlesCount) * i));
        // Orijinal Y pozisyonu hesaplaması (rastgele ve offsetli) korunuyor
        let candleYPosition = -1 * Math.floor(Math.random() * ((325 + candleXPositionOffset) - (320 - candleXPositionOffset) + 1) + (320 - candleXPositionOffset));

        // Mumlar, orijinal kodun yaptığı gibi doğrudan BODY'ye ekleniyor
        // ve CSS'teki (margin-left/margin-top) değerler kullanılıyor.
        document.body.innerHTML += `<div id="candle_${i}" class="candle" style="margin-left:${candleXPosition}px; margin-top:${candleYPosition}px;"></div>`;

        let candle = document.getElementById(`candle_${i}`);
        // DÜZELTME: onClick atama yöntemi modern ve güvenilir hale getirildi
        candle.onclick = () => putOutCandle(`candle_${i}`);

        for (let j = 0; j < 5; j++) {
            candle.innerHTML += `<div class="flame"></div>`;
        }
    }
}

function putOutCandle(candle_name) {
    if (!candle_name) return;

    let candle = document.getElementById(candle_name);
    if (!candle) return;

    // DÜZELTME: Mum söndürme mantığı düzeltildi (tüm alevleri kaldırır)
    candle.querySelectorAll(".flame").forEach(flame => flame.remove());
}

function putOutCandles() {
    let candles = document.getElementsByClassName("candle");
    if (!candles || candles.length === 0) return;

    // DÜZELTME: Mumları söndürmek için her mumu tek tek çağırır
    for (let i = 0; i < candles.length; i++) {
        // ID ile çağırıldı, böylece `putOutCandle` doğru çalışır
        putOutCandle(`candle_${i}`); 
    }
}

// Sayfa yüklendiğinde otomatik başlat
window.onload = init;

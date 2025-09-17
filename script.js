// --- オープニング画面の制御 ---
window.addEventListener('load', () => {
    const splashScreen = document.getElementById('splash-screen');
    const splashTitle = document.querySelector('.splash-title');
    const credits = document.querySelector('.credits');

    setTimeout(() => { splashTitle.classList.add('visible'); }, 500);
    setTimeout(() => { credits.classList.add('visible'); }, 1200);
    setTimeout(() => { splashScreen.classList.add('hidden'); }, 4000);
    setTimeout(() => { if (splashScreen) { splashScreen.style.display = 'none'; } }, 5000);
});

// --- 星座図鑑アプリ本体の制御 ---
document.addEventListener('DOMContentLoaded', () => {
    // ▼▼▼ UnsplashのAPIキーをここに貼り付け ▼▼▼
    const UNSPLASH_ACCESS_KEY = 'ssgMREBa8nxF6Dty-WDZUAzjP8Zn1BTOqpFLa4F57i8'; 

    // ▼▼▼ 星座データから画像URLを削除（APIで取得するため不要に） ▼▼▼
    const constellations = [
        // 春の星座
        { name_jp: "おおぐま座", name_en: "Ursa Major", description: "北斗七星を含む大きな星座。一年中北の空に見えます。", famous_star: "ドゥーベ, メラク", best_season: "春" },
        { name_jp: "こぐま座", name_en: "Ursa Minor", description: "北極星ポラリスを含む星座。おおぐま座の近くにあります。", famous_star: "ポラリス", best_season: "春" },
        { name_jp: "うしかい座", name_en: "Boötes", description: "春の夜空に輝くオレンジ色のアルクトゥルスが目印です。アルクトゥルスは4番目に明るい恒星です。「春の大三角」の一角。", famous_star: "アークトゥルス", best_season: "春" },
        // ... (以下、他の星座データも同様にimage_urlを削除) ...
        // (注: データが長いため省略しますが、全88星座分のデータは残してください)
        { name_jp: "はちぶんぎ座", name_en: "Octans", description: "天の南極を含む星座ですが、明るい星はありません。", famous_star: "ν星", best_season: "南天" },
    ];
    // (省略した全星座データは、一つ前の回答からコピーしてください)


    const grid = document.getElementById('constellation-grid');
    const modal = document.getElementById('modal');
    const closeModalButton = document.getElementById('close-button');
    const modalImage = document.getElementById('modal-image');

    const createConstellationCards = () => {
        const fragment = document.createDocumentFragment();
        constellations.sort((a, b) => a.name_jp.localeCompare(b.name_jp, 'ja'));
        
        constellations.forEach(c => {
            const card = document.createElement('div');
            card.className = 'constellation-card';
            card.textContent = c.name_jp;
            card.addEventListener('click', () => showModal(c));
            fragment.appendChild(card);
        });
        grid.appendChild(fragment);
    };

    // ▼▼▼ showModal関数をAPI対応に修正 ▼▼▼
    const showModal = async (constellation) => {
        // 先にテキスト情報を表示
        document.getElementById('modal-name-jp').textContent = constellation.name_jp;
        document.getElementById('modal-name-en').textContent = constellation.name_en;
        document.getElementById('modal-season').textContent = constellation.best_season;
        document.getElementById('modal-star').textContent = constellation.famous_star;
        document.getElementById('modal-description').textContent = constellation.description;

        // 画像を読み込み中に一時的な表示
        modalImage.src = 'https://placehold.co/400x300/0c0f1a/e0e0e0?text=Loading...';
        modalImage.alt = '画像を読み込んでいます...';
        
        // モーダルを表示
        modal.classList.remove('hidden');

        // Unsplash APIに星座の写真を問い合わせ
        try {
            const response = await fetch(`https://api.unsplash.com/search/photos?query=${constellation.name_en}+constellation&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                // 写真が見つかった場合
                modalImage.src = data.results[0].urls.regular;
                modalImage.alt = constellation.name_jp + 'の写真';
            } else {
                // 写真が見つからなかった場合
                modalImage.src = `https://placehold.co/400x300/0c0f1a/e0e0e0?text=${constellation.name_en}`;
                modalImage.alt = constellation.name_jp + 'の写真が見つかりませんでした';
            }
        } catch (error) {
            console.error('Error fetching image from Unsplash:', error);
            modalImage.src = `https://placehold.co/400x300/0c0f1a/e0e0e0?text=Error`;
            modalImage.alt = '画像の読み込みに失敗しました';
        }
    };

    const closeModal = () => {
        modal.classList.add('hidden');
    };

    closeModalButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    if (grid) {
        createConstellationCards();
    }
});

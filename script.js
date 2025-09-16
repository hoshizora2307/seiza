// --- オープニング画面の制御 ---
window.addEventListener('load', () => {
    const splashScreen = document.getElementById('splash-screen');
    const splashTitle = document.querySelector('.splash-title');
    const credits = document.querySelector('.credits');

    // 1. タイトルとクレジットを順番に表示
    setTimeout(() => {
        splashTitle.classList.add('visible');
    }, 500); // 0.5秒後

    setTimeout(() => {
        credits.classList.add('visible');
    }, 1200); // 1.2秒後

    // 2. スプラッシュ画面全体をフェードアウト
    setTimeout(() => {
        splashScreen.classList.add('hidden');
    }, 4000); // 4秒後

    // 3. フェードアウト後に要素を完全に消す（アクセシビリティのため）
    setTimeout(() => {
        if (splashScreen) {
            splashScreen.style.display = 'none';
        }
    }, 5000); // 5秒後
});


// --- 星座図鑑アプリ本体の制御 ---
document.addEventListener('DOMContentLoaded', () => {
    // 星座データ (サンプル)
    const constellations = [
        {
            name_jp: "オリオン座",
            name_en: "Orion",
            description: "冬の夜空で最も目立つ星座の一つ。狩人オリオンの姿を表しており、中央に並ぶ三つ星が有名です。",
            famous_star: "ベテルギウス, リゲル",
            best_season: "冬"
        },
        {
            name_jp: "カシオペヤ座",
            name_en: "Cassiopeia",
            description: "北の空に一年中見られる星座。「W」や「M」の形に星が並んでいるのが特徴です。",
            famous_star: "シェダル",
            best_season: "秋"
        },
        {
            name_jp: "おおぐま座",
            name_en: "Ursa Major",
            description: "北斗七星を含む大きな星座。一年中北の空に見え、北極星を見つけるための目印として使われます。",
            famous_star: "ドゥーベ, メラク (北斗七星)",
            best_season: "春"
        },
        {
            name_jp: "さそり座",
            name_en: "Scorpius",
            description: "夏の南の空に見える、大きなS字カーブを描く星座。赤い一等星アンタレスがさそりの心臓に見立てられています。",
            famous_star: "アンタレス",
            best_season: "夏"
        },
        {
            name_jp: "はくちょう座",
            name_en: "Cygnus",
            description: "天の川に大きな十字を描くように広がる星座。北十字星とも呼ばれます。",
            famous_star: "デネブ, アルビレオ",
            best_season: "夏"
        }
    ];

    // DOM要素の取得
    const grid = document.getElementById('constellation-grid');
    const modal = document.getElementById('modal');
    const closeModalButton = document.getElementById('close-button');

    // 星座カードをグリッドに生成
    const createConstellationCards = () => {
        const fragment = document.createDocumentFragment();
        constellations.forEach(c => {
            const card = document.createElement('div');
            card.className = 'constellation-card';
            card.textContent = c.name_jp;
            card.addEventListener('click', () => showModal(c));
            fragment.appendChild(card);
        });
        grid.appendChild(fragment);
    };

    // モーダルに詳細情報を表示
    const showModal = (constellation) => {
        document.getElementById('modal-name-jp').textContent = constellation.name_jp;
        document.getElementById('modal-name-en').textContent = constellation.name_en;
        document.getElementById('modal-season').textContent = constellation.best_season;
        document.getElementById('modal-star').textContent = constellation.famous_star;
        document.getElementById('modal-description').textContent = constellation.description;
        modal.classList.remove('hidden');
    };



    // モーダルを閉じる
    const closeModal = () => {
        modal.classList.add('hidden');
    };

    // イベントリスナーの設定
    closeModalButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
        // 背景の黒い部分をクリックしたときだけ閉じる
        if (event.target === modal) {
            closeModal();
        }
    });

    // 初期化
    if (grid) {
        createConstellationCards();
    }
});

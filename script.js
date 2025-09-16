document.addEventListener('DOMContentLoaded', () => {
    // 星座データ (サンプル)
    // 実際に88星座分を作成する場合は、この配列にデータを追加していきます。
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
    createConstellationCards();
});

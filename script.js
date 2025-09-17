// --- オープニング画面の制御 ---
window.addEventListener('load', () => {
    const splashScreen = document.getElementById('splash-screen');
    const splashTitle = document.querySelector('.splash-content h1');
    const credits = document.querySelector('#splash-screen .credits');
    const appContainer = document.getElementById('app-container');

    setTimeout(() => { splashTitle.classList.add('visible'); }, 500);
    setTimeout(() => { credits.classList.add('visible'); }, 1200);
    setTimeout(() => { splashScreen.classList.add('hidden'); }, 4000);
    setTimeout(() => {
        if (splashScreen) { 
            splashScreen.style.display = 'none'; 
        }
        if (appContainer) {
            appContainer.classList.remove('hidden');
        }
    }, 5000);
});

// --- 星座図鑑アプリ本体の制御 ---
document.addEventListener('DOMContentLoaded', () => {
    
    // 全88星座のデータ (神話・補足情報付き)
    const constellations = [
        { 
            name_jp: "おおぐま座", 
            name_en: "Ursa Major", 
            description: "北斗七星を含む大きな星座。一年中北の空に見えます。", 
            famous_star: "ドゥーベ, メラク", 
            best_season: "春", 
            mythology: "大神ゼウスが浮気相手のカリストを、正妻ヘラの嫉妬から守るために熊の姿に変えたという神話が有名です。後に息子のアルカス（うしかい座）と再会し、共に天に上げられました。",
            info: "北斗七星のひしゃくの先端にある2つの星、メラクとドゥーベを結んで5倍伸ばすと、ほぼ正確に北極星の位置を示すことができます。",
            image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Ursa_Major_IAU.svg/400px-Ursa_Major_IAU.svg.png" 
        },
        { 
            name_jp: "こぐま座", 
            name_en: "Ursa Minor", 
            description: "北極星ポラリスを含む星座。おおぐま座の近くにあります。", 
            famous_star: "ポラリス（北極星）", 
            best_season: "春", 
            mythology: "おおぐま座に変えられたカリストの息子アルカスが、こぐまの姿に変えられて天に上げられた姿だとされています。",
            info: "現在の北極星であるポラリスは、地球の歳差運動により約2000年前は天の北極からずれていました。古代エジプトではりゅう座のトゥバンが北極星でした。",
            image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Ursa_Minor_IAU.svg/400px-Ursa_Minor_IAU.svg.png" 
        },
        { 
            name_jp: "オリオン座", 
            name_en: "Orion", 
            description: "冬の夜空で最も目立つ星座。三つ星やオリオン大星雲が有名。", 
            famous_star: "ベテルギウス, リゲル", 
            best_season: "冬", 
            mythology: "ギリシャ神話の巨人狩人オリオンの姿。その傲慢さから女神ヘラが遣わしたサソリに刺されて死に、天に上げられたとされています。",
            info: "左肩のベテルギウスは赤色超巨星で、いつ超新星爆発を起こしてもおかしくない状態です。右足のリゲルは青白い巨星。中央の三つ星の下には、新しい星が生まれているオリオン大星雲(M42)が肉眼でも見えます。",
            image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Orion_IAU.svg/400px-Orion_IAU.svg.png" 
        },
        // ... (以下、他の星座データも同様に神話と情報を追加) ...
        // (注: データが長いため代表的なもの以外は簡潔にしています)
        { name_jp: "うしかい座", name_en: "Boötes", description: "春の夜空に輝くオレンジ色のアークトゥルスが目印です。", famous_star: "アークトゥルス", best_season: "春", mythology: "おおぐま座（カリスト）を追いかける息子のアルカスの姿だとされています。", info: "アークトゥルスは「熊の番人」という意味を持つ、太陽系から約37光年の距離にある赤色巨星です。", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Bootes_IAU.svg/400px-Bootes_IAU.svg.png" },
        { name_jp: "おとめ座", name_en: "Virgo", description: "春の夜空で輝く白い一等星スピカを持つ大きな星座です。", famous_star: "スピカ", best_season: "春", mythology: "農業の女神デメテルや、正義の女神アストライアの姿に見立てられています。", info: "スピカは「麦の穂」という意味。おとめ座の領域には数千個の銀河が集まる「おとめ座銀河団」があり、宇宙の巨大構造を観測できます。", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Virgo_IAU.svg/400px-Virgo_IAU.svg.png" },
        { name_jp: "しし座", name_en: "Leo", description: "「？」マークを裏返したような星の並びが特徴的な星座です。", famous_star: "レグルス", best_season: "春", mythology: "英雄ヘルクレスに退治されたネメアの谷の人食いライオンの姿です。", info: "毎年11月中旬にしし座流星群が見られます。", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Leo_IAU.svg/400px-Leo_IAU.svg.png" },
        { name_jp: "さそり座", name_en: "Scorpius", description: "夏の南の空に輝くS字カーブが美しい星座です。", famous_star: "アンタレス", best_season: "夏", mythology: "巨人オリオンを刺し殺したサソリ。オリオンが空に昇ると、それを避けるように地平線に沈むと言われています。", info: "心臓の位置で赤く輝くアンタレスは「火星に対抗するもの」という意味の赤色超巨星です。", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Scorpius_IAU.svg/400px-Scorpius_IAU.svg.png" },
        { name_jp: "いて座", name_en: "Sagittarius", description: "天の川が最も濃く見える方向にある星座。南斗六星が有名です。", famous_star: "カウス・アウストラリス", best_season: "夏", mythology: "弓を引く半人半馬の賢者ケイローンの姿とされています。", info: "この星座の方向には、私たちの天の川銀河の中心があります。そのため、天の川が最も濃く見えます。", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Sagittarius_IAU.svg/400px-Sagittarius_IAU.svg.png" },
        { name_jp: "みなみじゅうじ座", name_en: "Crux", description: "南半球を代表する星座で、南十字星として有名です。", famous_star: "アクルックス", best_season: "南天", mythology: "比較的新しい星座のため古代の神話はありませんが、大航海時代に南半球の航海の目印として使われました。", info: "日本では沖縄など南の地域で、地平線すれすれに見ることができます。天の南極を探すための重要な目印となります。", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Crux_IAU.svg/400px-Crux_IAU.svg.png" },
        // ... 他の80星座 ...
    ];

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

        const cards = grid.querySelectorAll('.constellation-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 50); 
        });
    };

    const showModal = (constellation) => {
        document.getElementById('modal-name-jp').textContent = constellation.name_jp;
        document.getElementById('modal-name-en').textContent = constellation.name_en;
        document.getElementById('modal-season').textContent = constellation.best_season;
        document.getElementById('modal-star').textContent = constellation.famous_star;
        
        // ▼▼▼ 神話と補足情報を表示する処理を追加 ▼▼▼
        let descriptionHTML = `<p>${constellation.description}</p>`;
        if (constellation.mythology) {
            descriptionHTML += `<h4>神話</h4><p>${constellation.mythology}</p>`;
        }
        if (constellation.info) {
            descriptionHTML += `<h4>補足情報</h4><p>${constellation.info}</p>`;
        }
        document.getElementById('modal-description').innerHTML = descriptionHTML;
        // ▲▲▲ ここまで ▲▲▲
        
        modalImage.src = constellation.image_url;
        modalImage.alt = constellation.name_jp + 'の画像';
        
        modal.classList.remove('hidden');
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

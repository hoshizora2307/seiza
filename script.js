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
    // ▼▼▼ 全88星座のデータ（画像URL付き） ▼▼▼
    const constellations = [
        // 春の星座
        { name_jp: "おおぐま座", name_en: "Ursa Major", description: "北斗七星を含む大きな星座。一年中北の空に見えます。", famous_star: "ドゥーベ, メラク", best_season: "春", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Ursa_Major_IAU.svg/400px-Ursa_Major_IAU.svg.png" },
        { name_jp: "こぐま座", name_en: "Ursa Minor", description: "北極星ポラリスを含む星座。おおぐま座の近くにあります。", famous_star: "ポラリス", best_season: "春", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Ursa_Minor_IAU.svg/400px-Ursa_Minor_IAU.svg.png" },
        { name_jp: "うしかい座", name_en: "Boötes", description: "春の夜空に輝くオレンジ色のアークトゥルスが目印です。", famous_star: "アークトゥルス", best_season: "春", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Bootes_IAU.svg/400px-Bootes_IAU.svg.png" },
        { name_jp: "おとめ座", name_en: "Virgo", description: "春の夜空で輝く白い一等星スピカを持つ大きな星座です。", famous_star: "スピカ", best_season: "春", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Virgo_IAU.svg/400px-Virgo_IAU.svg.png" },
        { name_jp: "しし座", name_en: "Leo", description: "「？」マークを裏返したような星の並びが特徴的な星座です。", famous_star: "レグルス", best_season: "春", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Leo_IAU.svg/400px-Leo_IAU.svg.png" },
        { name_jp: "かに座", name_en: "Cancer", description: "あまり明るい星はありませんが、プレセペ星団があります。", famous_star: "アルタルフ", best_season: "春", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Cancer_IAU.svg/400px-Cancer_IAU.svg.png" },
        { name_jp: "からす座", name_en: "Corvus", description: "台形に並んだ4つの星が目印となる小さな星座です。", famous_star: "ギェナー", best_season: "春", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Corvus_IAU.svg/400px-Corvus_IAU.svg.png" },
        { name_jp: "かみのけ座", name_en: "Coma Berenices", description: "多くの銀河が観測できる領域として知られています。", famous_star: "ディアデム", best_season: "春", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Coma_Berenices_IAU.svg/400px-Coma_Berenices_IAU.svg.png" },
        { name_jp: "りょうけん座", name_en: "Canes Venatici", description: "子持ち銀河(M51)があることで有名な星座です。", famous_star: "コル・カロリ", best_season: "春", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Canes_Venatici_IAU.svg/400px-Canes_Venatici_IAU.svg.png" },
        { name_jp: "うみへび座", name_en: "Hydra", description: "全天で最も大きな面積を持つ長い星座です。", famous_star: "アルファルド", best_season: "春", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Hydra_IAU.svg/400px-Hydra_IAU.svg.png" },
        { name_jp: "コップ座", name_en: "Crater", description: "うみへび座の背中に乗った杯の形をしています。", famous_star: "アルケス", best_season: "春", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Crater_IAU.svg/400px-Crater_IAU.svg.png" },
        { name_jp: "ろくぶんぎ座", name_en: "Sextans", description: "天文学者ヘヴェリウスによって設定された比較的新しい星座です。", famous_star: "α星", best_season: "春", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Sextans_IAU.svg/400px-Sextans_IAU.svg.png" },
        { name_jp: "こじし座", name_en: "Leo Minor", description: "しし座の足元に位置する小さな星座です。", famous_star: "プラエキプア", best_season: "春", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Leo_Minor_IAU.svg/400px-Leo_Minor_IAU.svg.png" },
        { name_jp: "やまねこ座", name_en: "Lynx", description: "おおぐま座とふたご座の間に位置する星座です。", famous_star: "α星", best_season: "春", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Lynx_IAU.svg/400px-Lynx_IAU.svg.png" },
        // 夏の星座
        { name_jp: "さそり座", name_en: "Scorpius", description: "夏の南の空に輝くS字カーブが美しい星座です。", famous_star: "アンタレス", best_season: "夏", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Scorpius_IAU.svg/400px-Scorpius_IAU.svg.png" },
        { name_jp: "いて座", name_en: "Sagittarius", description: "天の川が最も濃く見える方向にある星座。南斗六星が有名です。", famous_star: "カウス・アウストラリス", best_season: "夏", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Sagittarius_IAU.svg/400px-Sagittarius_IAU.svg.png" },
        { name_jp: "こと座", name_en: "Lyra", description: "夏の大三角のひとつ、青白いベガが輝く小さな星座です。", famous_star: "ベガ", best_season: "夏", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Lyra_IAU.svg/400px-Lyra_IAU.svg.png" },
        { name_jp: "わし座", name_en: "Aquila", description: "夏の大三角のひとつ、アルタイルが輝く星座です。", famous_star: "アルタイル", best_season: "夏", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Aquila_IAU.svg/400px-Aquila_IAU.svg.png" },
        { name_jp: "はくちょう座", name_en: "Cygnus", description: "天の川に大きな十字を描く、夏の大三角のひとつデネブを持つ星座。", famous_star: "デネブ", best_season: "夏", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Cygnus_IAU.svg/400px-Cygnus_IAU.svg.png" },
        { name_jp: "いるか座", name_en: "Delphinus", description: "ひし形に並んだ星が特徴の、夏の小さな星座です。", famous_star: "スアロキン", best_season: "夏", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Delphinus_IAU.svg/400px-Delphinus_IAU.svg.png" },
        { name_jp: "や座", name_en: "Sagitta", description: "天の川の中に位置する小さな矢の形をした星座です。", famous_star: "シャム", best_season: "夏", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Sagitta_IAU.svg/400px-Sagitta_IAU.svg.png" },
        { name_jp: "へびつかい座", name_en: "Ophiuchus", description: "黄道13番目の星座としても知られています。", famous_star: "ラス・アルハゲ", best_season: "夏", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Ophiuchus_IAU.svg/400px-Ophiuchus_IAU.svg.png" },
        { name_jp: "へび座", name_en: "Serpens", description: "へびつかい座に分断された、唯一の飛び地の星座です。", famous_star: "ウヌクアルハイ", best_season: "夏", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Serpens_IAU.svg/400px-Serpens_IAU.svg.png" },
        { name_jp: "ヘルクレス座", name_en: "Hercules", description: "球状星団M13があることで知られる大きな星座です。", famous_star: "ラス・アルゲティ", best_season: "夏", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Hercules_IAU.svg/400px-Hercules_IAU.svg.png" },
        { name_jp: "てんびん座", name_en: "Libra", description: "黄道十二星座の一つで、かつてはさそり座の一部でした。", famous_star: "ズベン・エス・カマリ", best_season: "夏", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Libra_IAU.svg/400px-Libra_IAU.svg.png" },
        { name_jp: "かんむり座", name_en: "Corona Borealis", description: "半円状に星が並んだ、美しいかんむりのような星座です。", famous_star: "アルフェッカ", best_season: "夏", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Corona_Borealis_IAU.svg/400px-Corona_Borealis_IAU.svg.png" },
        { name_jp: "みなみのかんむり座", name_en: "Corona Australis", description: "いて座の足元に位置する小さな星座です。", famous_star: "メリディアナ", best_season: "夏", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Corona_Australis_IAU.svg/400px-Corona_Australis_IAU.svg.png" },
        { name_jp: "こぎつね座", name_en: "Vulpecula", description: "亜鈴状星雲(M27)があることで知られています。", famous_star: "アンサー", best_season: "夏", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Vulpecula_IAU.svg/400px-Vulpecula_IAU.svg.png" },
        { name_jp: "たて座", name_en: "Scutum", description: "天の川の中に位置する小さな星座です。", famous_star: "α星", best_season: "夏", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Scutum_IAU.svg/400px-Scutum_IAU.svg.png" },
        // 秋の星座
        { name_jp: "アンドロメダ座", name_en: "Andromeda", description: "アンドロメダ銀河(M31)があることで非常に有名な星座です。", famous_star: "アルフェラッツ", best_season: "秋", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Andromeda_IAU.svg/400px-Andromeda_IAU.svg.png" },
        { name_jp: "カシオペヤ座", name_en: "Cassiopeia", description: "北の空に「W」や「M」の形に並ぶ、見つけやすい星座です。", famous_star: "シェダル", best_season: "秋", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Cassiopeia_IAU.svg/400px-Cassiopeia_IAU.svg.png" },
        { name_jp: "ペガスス座", name_en: "Pegasus", description: "秋の四辺形を構成する大きな星座です。", famous_star: "マルカブ", best_season: "秋", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pegasus_IAU.svg/400px-Pegasus_IAU.svg.png" },
        { name_jp: "うお座", name_en: "Pisces", description: "2匹の魚がリボンで結ばれた姿を描いた星座です。", famous_star: "アルレシャ", best_season: "秋", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Pisces_IAU.svg/400px-Pisces_IAU.svg.png" },
        { name_jp: "みずがめ座", name_en: "Aquarius", description: "あまり目立つ星はありませんが、黄道十二星座の一つです。", famous_star: "サダルメリク", best_season: "秋", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Aquarius_IAU.svg/400px-Aquarius_IAU.svg.png" },
        { name_jp: "やぎ座", name_en: "Capricornus", description: "逆三角形の星の並びが特徴の星座です。", famous_star: "デネブ・アルゲディ", best_season: "秋", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Capricornus_IAU.svg/400px-Capricornus_IAU.svg.png" },
        { name_jp: "ペルセウス座", name_en: "Perseus", description: "変光星アルゴルや二重星団h-χで知られています。", famous_star: "アルゴル", best_season: "秋", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Perseus_IAU.svg/400px-Perseus_IAU.svg.png" },
        { name_jp: "おひつじ座", name_en: "Aries", description: "黄道十二星座の一つ。春分点があった星座として知られます。", famous_star: "ハマル", best_season: "秋", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Aries_IAU.svg/400px-Aries_IAU.svg.png" },
        { name_jp: "さんかく座", name_en: "Triangulum", description: "さんかく座銀河(M33)がある小さな星座です。", famous_star: "モタラー", best_season: "秋", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Triangulum_IAU.svg/400px-Triangulum_IAU.svg.png" },
        { name_jp: "ケフェウス座", name_en: "Cepheus", description: "カシオペヤ座の隣にある、家のような形をした星座です。", famous_star: "アルデラミン", best_season: "秋", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Cepheus_IAU.svg/400px-Cepheus_IAU.svg.png" },
        { name_jp: "とかげ座", name_en: "Lacerta", description: "はくちょう座とアンドロメダ座の間にある小さな星座です。", famous_star: "α星", best_season: "秋", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Lacerta_IAU.svg/400px-Lacerta_IAU.svg.png" },
        { name_jp: "ちょうこくしつ座", name_en: "Sculptor", description: "南の空の低い位置に見える星座です。", famous_star: "α星", best_season: "秋", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sculptor_IAU.svg/400px-Sculptor_IAU.svg.png" },
        { name_jp: "くじら座", name_en: "Cetus", description: "変光星ミラがあることで有名な、大きな星座です。", famous_star: "ミラ", best_season: "秋", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Cetus_IAU.svg/400px-Cetus_IAU.svg.png" },
        { name_jp: "みなみのうお座", name_en: "Piscis Austrinus", description: "秋の南の空に輝く一等星フォーマルハウトが目印です。", famous_star: "フォーマルハウト", best_season: "秋", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Piscis_Austrinus_IAU.svg/400px-Piscis_Austrinus_IAU.svg.png" },
        // 冬の星座
        { name_jp: "オリオン座", name_en: "Orion", description: "冬の夜空で最も目立つ星座。三つ星やオリオン大星雲が有名。", famous_star: "ベテルギウス, リゲル", best_season: "冬", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Orion_IAU.svg/400px-Orion_IAU.svg.png" },
        { name_jp: "おおいぬ座", name_en: "Canis Major", description: "全天で最も明るい恒星シリウスを持つ星座です。", famous_star: "シリウス", best_season: "冬", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Canis_Major_IAU.svg/400px-Canis_Major_IAU.svg.png" },
        { name_jp: "こいぬ座", name_en: "Canis Minor", description: "冬の大三角のひとつ、プロキオンが輝く小さな星座です。", famous_star: "プロキオン", best_season: "冬", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Canis_Minor_IAU.svg/400px-Canis_Minor_IAU.svg.png" },
        { name_jp: "ふたご座", name_en: "Gemini", description: "カストルとポルックスの二つの明るい星が仲良く並んでいます。", famous_star: "ポルックス, カストル", best_season: "冬", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Gemini_IAU.svg/400px-Gemini_IAU.svg.png" },
        { name_jp: "おうし座", name_en: "Taurus", description: "プレアデス星団(すばる)やヒアデス星団を持つ星座です。", famous_star: "アルデバラン", best_season: "冬", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Taurus_IAU.svg/400px-Taurus_IAU.svg.png" },
        { name_jp: "ぎょしゃ座", name_en: "Auriga", description: "明るい星カペラと、五角形の星の並びが特徴です。", famous_star: "カペラ", best_season: "冬", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Auriga_IAU.svg/400px-Auriga_IAU.svg.png" },
        { name_jp: "うさぎ座", name_en: "Lepus", description: "オリオン座の足元に位置する小さな星座です。", famous_star: "アルネブ", best_season: "冬", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Lepus_IAU.svg/400px-Lepus_IAU.svg.png" },
        { name_jp: "いっかくじゅう座", name_en: "Monoceros", description: "ばら星雲があることで知られる、天の川の中の星座です。", famous_star: "β星", best_season: "冬", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Monoceros_IAU.svg/400px-Monoceros_IAU.svg.png" },
        { name_jp: "エリダヌス座", name_en: "Eridanus", description: "オリオン座から南の地平線へと長く伸びる星座です。", famous_star: "アケルナル", best_season: "冬", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Eridanus_IAU.svg/400px-Eridanus_IAU.svg.png" },
        { name_jp: "はと座", name_en: "Columba", description: "おおいぬ座の南に位置する小さな星座です。", famous_star: "ファクト", best_season: "冬", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Columba_IAU.svg/400px-Columba_IAU.svg.png" },
        { name_jp: "ちょうこくぐ座", name_en: "Caelum", description: "エリダヌस座とはと座の間に位置する小さな星座です。", famous_star: "α星", best_season: "冬", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Caelum_IAU.svg/400px-Caelum_IAU.svg.png" },
        { name_jp: "ろ座", name_en: "Fornax", description: "エリダヌス座の中にある小さな星座です。", famous_star: "フォルナキス", best_season: "冬", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Fornax_IAU.svg/400px-Fornax_IAU.svg.png" },
        { name_jp: "とも座", name_en: "Puppis", description: "かつて存在したアルゴ船座の一部です。", famous_star: "ナオス", best_season: "冬", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Puppis_IAU.svg/400px-Puppis_IAU.svg.png" },
        // 南天の星座
        { name_jp: "りゅうこつ座", name_en: "Carina", description: "シリウスに次いで明るいカノープスを持つ、南天の星座です。", famous_star: "カノープス", best_season: "南天", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Carina_IAU.svg/400px-Carina_IAU.svg.png" },
        { name_jp: "ほ座", name_en: "Vela", description: "かつてのアルゴ船座の一部で、帆の部分にあたります。", famous_star: "γ星", best_season: "南天", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Vela_IAU.svg/400px-Vela_IAU.svg.png" },
        { name_jp: "らしんばん座", name_en: "Pyxis", description: "かつてのアルゴ船座の近くに設定された小さな星座です。", famous_star: "α星", best_season: "南天", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pyxis_IAU.svg/400px-Pyxis_IAU.svg.png" },
        { name_jp: "ケンタウルス座", name_en: "Centaurus", description: "太陽系に最も近い恒星リギル・ケンタウルスを持つ星座です。", famous_star: "リギル・ケンタウルス", best_season: "南天", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Centaurus_IAU.svg/400px-Centaurus_IAU.svg.png" },
        { name_jp: "みなみじゅうじ座", name_en: "Crux", description: "南半球を代表する星座で、南十字星として有名です。", famous_star: "アクルックス", best_season: "南天", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Crux_IAU.svg/400px-Crux_IAU.svg.png" },
        { name_jp: "さいだん座", name_en: "Ara", description: "さそり座の尾の南に位置する星座です。", famous_star: "β星", best_season: "南天", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Ara_IAU.svg/400px-Ara_IAU.svg.png" },
        { name_jp: "つる座", name_en: "Grus", description: "みなみのうお座の南に位置する、比較的大きな星座です。", famous_star: "アルナイル", best_season: "南天", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Grus_IAU.svg/400px-Grus_IAU.svg.png" },
        { name_jp: "ほうおう座", name_en: "Phoenix", description: "つる座とエリダヌス座の間に位置する星座です。", famous_star: "アンカア", best_season: "南天", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Phoenix_IAU.svg/400px-Phoenix_IAU.svg.png" },
        { name_jp: "きょしちょう座", name_en: "Tucana", description: "小マゼラン雲があることで知られる南天の星座です。", famous_star: "α星", best_season: "南天", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Tucana_IAU.svg/400px-Tucana_IAU.svg.png" },
        { name_jp: "インディアン座", name_en: "Indus", description: "きょしちょう座とつる座の間に位置します。", famous_star: "ペルシアン", best_season: "南天", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Indus_IAU.svg/400px-Indus_IAU.svg.png" },
        { name_jp: "くじゃく座", name_en: "Pavo", description: "天の南極近くに位置する星座です。", famous_star: "ピーコック", best_season: "南天", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Pavo_IAU.svg/400px-Pavo_IAU.svg.png" },
        { name_jp: "じょうぎ座", name_en: "Norma", description: "さそり座とケンタウルス座の間にある小さな星座です。", famous_star: "γ2星", best_season: "南天", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Norma_IAU.svg/400px-Norma_IAU.svg.png" },
        { name_jp: "ぼうえんきょう座", name_en: "Telescopium", description: "いて座とさいだん座の間に位置する小さな星座です。", famous_star: "α星", best_season: "南天", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Telescopium_IAU.svg/400px-Telescopium_IAU.svg.png" },
        { name_jp: "けんびきょう座", name_en: "Microscopium", description: "やぎ座といて座の南に位置する星座です。", famous_star: "γ星", best_season: "南天", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Microscopium_IAU.svg/400px-Microscopium_IAU.svg.png" },
        { name_jp: "コンパス座", name_en: "Circinus", description: "ケンタウルス座の足元にある小さな星座です。", famous_star: "α星", best_season: "南天", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Circinus_IAU.svg/400px-Circinus_IAU.svg.png" },
        { name_jp: "みなみのさんかく座", name_en: "Triangulum Australe", description: "ケンタウルス座の近くにある明るい三角形が特徴です。", famous_star: "アトリア", best_season: "南天", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Triangulum_Australe_IAU.svg/400px-Triangulum_Australe_IAU.svg.png" },
        { name_jp: "ふうちょう座", name_en: "Apus", description: "天の南極の近くにある小さな星座です。", famous_star: "α星", best_season: "南天", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Apus_IAU.svg/400px-Apus_IAU.svg.png" },
        { name_jp: "カメレオン座", name_en: "Chamaeleon", description: "天の南極近くにあり、暗い星で構成されています。", famous_star: "α星", best_season: "南天", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Chamaeleon_IAU.svg/400px-Chamaeleon_IAU.svg.png" },
        { name_jp: "とびうお座", name_en: "Volans", description: "りゅうこつ座の近くに位置する小さな星座です。", famous_star: "β星", best_season: "南天", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Volans_IAU.svg/400px-Volans_IAU.svg.png" },
        { name_jp: "がか座", name_en: "Pictor", description: "りゅうこつ座のカノープスの西に位置します。", famous_star: "α星", best_season: "南天", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Pictor_IAU.svg/400px-Pictor_IAU.svg.png" },
        { name_jp: "かじき座", name_en: "Dorado", description: "大マゼラン雲があることで非常に有名な星座です。", famous_star: "α星", best_season: "南天", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Dorado_IAU.svg/400px-Dorado_IAU.svg.png" },
        { name_jp: "レチクル座", name_en: "Reticulum", description: "かじき座の西に位置する、ひし形の小さな星座です。", famous_star: "α星", best_season: "南天", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Reticulum_IAU.svg/400px-Reticulum_IAU.svg.png" },
        { name_jp: "みずへび座", name_en: "Hydrus", description: "天の南極近くで、大小マゼラン雲の間にあります。", famous_star: "β星", best_season: "南天", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Hydrus_IAU.svg/400px-Hydrus_IAU.svg.png" },
        { name_jp: "とけい座", name_en: "Horologium", description: "エリダヌス座の南に位置する、暗い星からなる星座です。", famous_star: "α星", best_season: "南天", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Horologium_IAU.svg/400px-Horologium_IAU.svg.png" },
        { name_jp: "テーブルさん座", name_en: "Mensa", description: "天の南極に最も近い星座で、非常に暗い星で構成されます。", famous_star: "α星", best_season: "南天", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Mensa_IAU.svg/400px-Mensa_IAU.svg.png" },
        { name_jp: "はえ座", name_en: "Musca", description: "みなみじゅうじ座のすぐ南にある小さな星座です。", famous_star: "α星", best_season: "南天", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Musca_IAU.svg/400px-Musca_IAU.svg.png" },
        { name_jp: "りゅう座", name_en: "Draco", description: "こぐま座を取り囲むように長く伸びる星座です。", famous_star: "トゥバン", best_season: "北天", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Draco_IAU.svg/400px-Draco_IAU.svg.png" },
        { name_jp: "きりん座", name_en: "Camelopardalis", description: "北極星の近くにありますが、暗い星が多く目立ちません。", famous_star: "β星", best_season: "北天", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Camelopardalis_IAU.svg/400px-Camelopardalis_IAU.svg.png" },
        { name_jp: "おおかみ座", name_en: "Lupus", description: "ケンタウルス座とさそり座の間に位置する星座です。", famous_star: "α星", best_season: "南天", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Lupus_IAU.svg/400px-Lupus_IAU.svg.png" },
        { name_jp: "ポンプ座", name_en: "Antlia", description: "うみへび座の南に位置する暗い星座です。", famous_star: "α星", best_season: "南天", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Antlia_IAU.svg/400px-Antlia_IAU.svg.png" },
        { name_jp: "はちぶんぎ座", name_en: "Octans", description: "天の南極を含む星座ですが、明るい星はありません。", famous_star: "ν星", best_season: "南天", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Octans_IAU.svg/400px-Octans_IAU.svg.png" },
    ];
    // ▲▲▲ 全88星座のデータ ▲▲▲

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

    // モーダルに詳細情報を表示する関数を修正
    const showModal = (constellation) => {
        // テキスト情報を設定
        document.getElementById('modal-name-jp').textContent = constellation.name_jp;
        document.getElementById('modal-name-en').textContent = constellation.name_en;
        document.getElementById('modal-season').textContent = constellation.best_season;
        document.getElementById('modal-star').textContent = constellation.famous_star;
        document.getElementById('modal-description').textContent = constellation.description;
        
        // 画像情報を設定
        modalImage.src = constellation.image_url;
        modalImage.alt = constellation.name_jp + 'の画像';
        
        // モーダルを表示
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

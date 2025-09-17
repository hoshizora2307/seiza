// --- オープニング画面の制御 ---
window.addEventListener('load', () => {
    const splashScreen = document.getElementById('splash-screen');
    const splashTitle = document.querySelector('.splash-title');
    const credits = document.querySelector('.credits');
    const appContainer = document.getElementById('app-container'); // ★この行を追加★

    setTimeout(() => { splashTitle.classList.add('visible'); }, 500);
    setTimeout(() => { credits.classList.add('visible'); }, 1200);
    setTimeout(() => { splashScreen.classList.add('hidden'); }, 4000);
    setTimeout(() => { 
        if (splashScreen) { 
            splashScreen.style.display = 'none'; 
        }
        if (appContainer) { // ★このブロックを追加★
            appContainer.classList.remove('hidden');
        }
    }, 5000);
});

// ... (以下、残りのscript.jsの内容は変更なし) ...

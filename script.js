document.addEventListener('DOMContentLoaded', () => {
    const linkCards = document.querySelectorAll('.link-card');
    const pixButton = document.getElementById('pix-button');
    
    // Animação inicial
    linkCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px)';
        setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // Lógica de Redirecionamento Robusta
    linkCards.forEach((link) => {
        link.addEventListener('click', (e) => {
            const platform = link.getAttribute('data-platform');
            const webUrl = link.getAttribute('href');

            if (link.id === 'pix-button' || !platform) return;

            e.preventDefault();

            const isAndroid = /Android/i.test(navigator.userAgent);
            const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

            let appUrl = "";

            // Configuração de Deep Links por plataforma
            const platformConfig = {
                spotify: {
                    ios: "spotify:album:0cxPVUYmdkyhaQhrKxl0cB",
                    android: "intent://open.spotify.com/album/0cxPVUYmdkyhaQhrKxl0cB#Intent;package=com.spotify.music;scheme=https;end"
                },
                apple: {
                    ios: "music://music.apple.com/br/album/silent-rebirth/1880815219",
                    android: "intent://music.apple.com/br/album/silent-rebirth/1880815219#Intent;package=com.apple.android.music;scheme=https;end"
                },
                deezer: {
                    ios: "deezer://www.deezer.com/album/927562671",
                    android: "intent://www.deezer.com/album/927562671#Intent;package=deezer.android.app;scheme=https;end"
                },
                youtube: {
                    ios: "youtubemusic://music.youtube.com/playlist?list=OLAK5uy_l1jQK4tpXSpVEF8ITQLCyHLGq9jdChC-g",
                    android: "intent://music.youtube.com/playlist?list=OLAK5uy_l1jQK4tpXSpVEF8ITQLCyHLGq9jdChC-g#Intent;package=com.google.android.apps.youtube.music;scheme=https;end"
                }
            };

            if (isAndroid) {
                appUrl = platformConfig[platform].android;
                window.location.href = appUrl;
            } else if (isIOS) {
                appUrl = platformConfig[platform].ios;
                window.location.href = appUrl;
            } else {
                window.location.href = webUrl;
                return;
            }

            // Plano B: Se após 2.5 segundos o usuário ainda estiver na página, vai para a web
            const startTime = Date.now();
            const checkSuspended = setInterval(() => {
                const timePassed = Date.now() - startTime;
                
                if (document.hidden || document.webkitHidden) {
                    clearInterval(checkSuspended);
                    return;
                }

                if (timePassed > 2500) {
                    clearInterval(checkSuspended);
                    window.location.href = webUrl;
                }
            }, 500);
        });
    });

    // Lógica do PIX (Toast no Topo)
    if (pixButton) {
        pixButton.addEventListener('click', (e) => {
            e.preventDefault();
            const pixKey = "d9c7d8b2-52f0-4709-a8d0-ca826b1b7def"; 
            navigator.clipboard.writeText(pixKey).then(() => {
                if (navigator.vibrate) navigator.vibrate([30, 50, 30]); 
                showToast("CHAVE PIX COPIADA! 🤘");
            });
        });
    }

    function showToast(message) {
        let toast = document.querySelector('.toast-notification');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast-notification';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => toast.classList.remove('show'), 3500);
    }
});
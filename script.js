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

            // Se for PIX ou redes sociais (sem data-platform), segue o fluxo normal
            if (link.id === 'pix-button' || !platform) return;

            e.preventDefault();

            const isAndroid = /Android/i.test(navigator.userAgent);
            const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

            let appUrl = "";

            // Configuração de Deep Links por plataforma
            const platformConfig = {
                spotify: {
                    ios: "spotify:album:0cxPVUYmdkyhaQhrKxl0cB",
                    android: "intent://album/0cxPVUYmdkyhaQhrKxl0cB#Intent;scheme=spotify;package=com.spotify.music;end"
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
            } else if (isIOS) {
                appUrl = platformConfig[platform].ios;
            } else {
                window.location.href = webUrl;
                return;
            }

            // Tenta abrir o App
            window.location.href = appUrl;

            // Plano B: Fallback para Web se o App não abrir em 2 segundos
            setTimeout(() => {
                if (!document.hidden && !document.webkitHidden) {
                    window.location.href = webUrl;
                }
            }, 2000);
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
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3500);
    }
});
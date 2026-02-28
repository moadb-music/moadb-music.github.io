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

    // Lógica de Redirecionamento
    linkCards.forEach((link) => {
        link.addEventListener('click', (e) => {
            const platform = link.getAttribute('data-platform');
            const webUrl = link.getAttribute('href');
            const isInstagram = /Instagram/i.test(navigator.userAgent); // Detecta se está no navegador do IG

            if (link.id === 'pix-button' || !platform) return;

            e.preventDefault();

            const platformConfig = {
                spotify: "spotify:album:0cxPVUYmdkyhaQhrKxl0cB",
                apple: "music://music.apple.com/br/album/silent-rebirth/1880815219",
                deezer: "deezer://www.deezer.com/album/927562671",
                youtube: "youtubemusic://music.youtube.com/playlist?list=OLAK5uy_l1jQK4tpXSpVEF8ITQLCyHLGq9jdChC-g",
                tiktok: "snssdk1180://user/profile/mind.of.a.dead.bo" // Protocolo nativo do TikTok
            };

            const appUrl = platformConfig[platform] || webUrl;

            // Para o Instagram, o Iframe é mais seguro para não travar a página
            const iframe = document.createElement("iframe");
            iframe.style.display = "none";
            iframe.src = appUrl;
            document.body.appendChild(iframe);

            // Redirecionamento de Fallback (Web)
            setTimeout(() => {
                if (document.body.contains(iframe)) {
                    document.body.removeChild(iframe);
                }
                // Se ainda estiver na página, manda para a web
                window.location.href = webUrl;
            }, 400);
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

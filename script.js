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

    // Lógica de Redirecionamento Robusta (Iframe Fallback)
    linkCards.forEach((link) => {
        link.addEventListener('click', (e) => {
            const appUrl = link.getAttribute('data-app');
            const webUrl = link.getAttribute('href');

            if (link.id === 'pix-button' || !appUrl) return;

            e.preventDefault();

            // Tenta abrir o app usando um método que não quebra o navegador interno
            const iframe = document.createElement("iframe");
            iframe.style.border = "none";
            iframe.style.width = "1px";
            iframe.style.height = "1px";
            iframe.src = appUrl;
            document.body.appendChild(iframe);

            // Plano B: Se o usuário ainda estiver na página após 1.5s, vai para a web
            setTimeout(() => {
                if (!document.hidden) {
                    window.location.href = webUrl;
                }
                document.body.removeChild(iframe);
            }, 1500);
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
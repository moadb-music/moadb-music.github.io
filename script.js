document.addEventListener('DOMContentLoaded', () => {
    const linkCards = document.querySelectorAll('.link-card');
    const pixButton = document.getElementById('pix-button');
    
    // Animação de entrada
    linkCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px)';
        setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // Lógica de Redirecionamento SEGURA (Sem abrir novas abas/pop-ups)
    linkCards.forEach((link) => {
        link.addEventListener('click', (e) => {
            const appUrl = link.getAttribute('data-app');
            const webUrl = link.getAttribute('href');

            // Ignorar para PIX e Redes Sociais (que já abrem direto pelo href)
            if (link.id === 'pix-button' || !appUrl) return;

            e.preventDefault();

            // 1. Tenta disparar o App (Isso não abre nova aba, apenas tenta "chamar" o app)
            window.location.href = appUrl;

            // 2. Plano B: Se o fã ainda estiver nesta página após 1 segundo, 
            // significa que o app não abriu. Então mudamos a aba atual para o site.
            setTimeout(() => {
                if (!document.hidden) {
                    window.location.href = webUrl;
                }
            }, 1000); 
        });
    });

    // Lógica do PIX (Mantida conforme solicitado)
    if (pixButton) {
        pixButton.addEventListener('click', (e) => {
            e.preventDefault();
            const pixKey = "d9c7d8b2-52f0-4709-a8d0-ca826b1b7def"; 
            
            navigator.clipboard.writeText(pixKey).then(() => {
                if (navigator.vibrate) navigator.vibrate([30, 50, 30]); 
                showToast("CHAVE PIX COPIADA! 🤘");
            }).catch(() => {
                alert("Chave PIX: " + pixKey);
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
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }
});
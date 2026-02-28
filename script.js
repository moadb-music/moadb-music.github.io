document.addEventListener('DOMContentLoaded', () => {
    const linkCards = document.querySelectorAll('.link-card');
    const pixButton = document.getElementById('pix-button');
    
    // Animação de entrada dos botões
    linkCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px)';
        setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // Lógica de Redirecionamento (App vs Web)
    linkCards.forEach((link) => {
        link.addEventListener('click', (e) => {
            const appUrl = link.getAttribute('data-app');
            const webUrl = link.getAttribute('href');
            if (link.id === 'pix-button' || !appUrl) return;

            e.preventDefault();
            window.location.href = appUrl;
            setTimeout(() => {
                if (!document.hidden) window.location.href = webUrl;
            }, 800);
        });
    });

    // Lógica do PIX com Toast no Topo
    if (pixButton) {
        pixButton.addEventListener('click', (e) => {
            e.preventDefault();
            const pixKey = "d9c7d8b2-52f0-4709-a8d0-ca826b1b7def"; 
            
            navigator.clipboard.writeText(pixKey).then(() => {
                if (navigator.vibrate) navigator.vibrate([30, 50, 30]); // Vibração composta
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
        
        // Pequeno delay para garantir a animação
        setTimeout(() => toast.classList.add('show'), 10);

        // Remove após 3.5 segundos
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }
});
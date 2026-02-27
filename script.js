document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.link-card:not(.disabled)');
    const pixButton = document.getElementById('pix-button');
    
    // Animação de entrada suave para os botões ativos
    links.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(10px)';
        setTimeout(() => {
            link.style.transition = 'all 0.4s ease';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // Função de cópia do PIX
    if (pixButton) {
        pixButton.addEventListener('click', (e) => {
            e.preventDefault();
            const pixKey = "d9c7d8b2-52f0-4709-a8d0-ca826b1b7def"; 
            
            navigator.clipboard.writeText(pixKey).then(() => {
                alert("Chave PIX copiada!");
                if (navigator.vibrate) {
                    navigator.vibrate(20); 
                }
            }).catch(() => {
                alert("Erro ao copiar. Chave: " + pixKey);
            });
        });
    }
});
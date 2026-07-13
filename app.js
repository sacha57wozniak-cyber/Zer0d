document.addEventListener('DOMContentLoaded', () => {
    const shareBtn = document.getElementById('shareBtn');
    const toast = document.getElementById('toast');
    const card = document.getElementById('profileCard');

    // Share profile action
    if (shareBtn && toast) {
        shareBtn.addEventListener('click', async () => {
            try {
                // Try using navigator.share if available on mobile
                if (navigator.share) {
                    await navigator.share({
                        title: 'Zer0d_19 | Mes Réseaux',
                        text: 'Retrouvez tous les réseaux officiels de Zer0d_19 !',
                        url: window.location.href
                    });
                } else {
                    // Fallback to clipboard copy
                    await navigator.clipboard.writeText(window.location.href);
                    showToast();
                }
            } catch (err) {
                // If sharing was cancelled or clipboard failed, try standard fallback
                try {
                    await navigator.clipboard.writeText(window.location.href);
                    showToast();
                } catch (clipboardErr) {
                    console.error('Impossible de copier le lien : ', clipboardErr);
                }
            }
        });
    }

    function showToast() {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }

    // Premium Card 3D tilt effect
    if (card) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within element
            const y = e.clientY - rect.top;  // y position within element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate tilt levels (max 8 degrees)
            const rotateX = ((centerY - y) / centerY) * 8;
            const rotateY = ((x - centerX) / centerX) * 8;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            card.style.transition = 'transform 0.1s ease-out';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            card.style.transition = 'transform 0.5s ease-out';
        });
    }
});

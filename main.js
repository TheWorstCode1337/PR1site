document.addEventListener("DOMContentLoaded", () => {
    const lazyImages = document.querySelectorAll('lazy')

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const dataSrc = img.dataset.src;
                    img.src = dataSrc;
                    img.classList.remove('lazy');
                    img.onload = () => img.classList.add('loaded');
                    img.onerror = () => console.error(`Error loading image: ${dataSrc}`);
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            img.classList.add('loaded');
        })
    }
})
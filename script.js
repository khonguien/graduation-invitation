let isVietnamese = true;

const langBtn = document.getElementById('lang-btn');
const elementsToTranslate = document.querySelectorAll('[data-vi]');

langBtn.addEventListener('click', () => {
    isVietnamese = !isVietnamese;
    langBtn.textContent = isVietnamese ? 'EN' : 'VI';
    
    elementsToTranslate.forEach(el => {
        el.textContent = isVietnamese ? el.getAttribute('data-vi') : el.getAttribute('data-en');
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// window.addEventListener('load', () => {
//     const duration = 3000;
//     const end = Date.now() + duration;

//     (function frame() {
//         confetti({
//             particleCount: 5,
//             angle: 60,
//             spread: 55,
//             origin: { x: 0 },
//             colors: ['#d4af37', '#2c2c2c', '#ffffff']
//         });
        
//         confetti({
//             particleCount: 5,
//             angle: 120,
//             spread: 55,
//             origin: { x: 1 },
//             colors: ['#d4af37', '#2c2c2c', '#ffffff']
//         });

//         if (Date.now() < end) {
//             requestAnimationFrame(frame);
//         }
//     }());
// });
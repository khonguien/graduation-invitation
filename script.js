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

// Reveal lower content on first touch/click
let contentRevealed = false;
const hiddenContent = document.getElementById('hidden-content');
const backToggle = document.querySelector('.back-toggle');

function revealContent(e) {
    // Ignore clicks on buttons or links
    if (e.target.closest('button') || e.target.closest('a')) return;

    if (!contentRevealed) {
        hiddenContent.style.display = 'block';
        // Trigger a reflow to ensure the CSS transition works
        void hiddenContent.offsetWidth;
        hiddenContent.classList.add('show');
        backToggle.classList.add('visible');
        contentRevealed = true;
        
        // Smoothly scroll down to the revealed content for a slide transition feel
        setTimeout(() => {
            hiddenContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

document.addEventListener('click', revealContent);
document.addEventListener('touchstart', revealContent, { passive: true });

const backBtn = document.getElementById('back-btn');
backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    hiddenContent.classList.remove('show');
    backToggle.classList.remove('visible');
    setTimeout(() => {
        hiddenContent.style.display = 'none';
        contentRevealed = false;
    }, 800); // Wait for the fade-out CSS transition before setting display: none
});

const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get('name');
const guestNameElement = document.getElementById('guest-name');
if (guestNameElement) {
    if (guestName && guestName.trim() !== '') {
        guestNameElement.textContent = guestName;
        guestNameElement.setAttribute('data-vi', guestName);
        guestNameElement.setAttribute('data-en', guestName);
    } else {
        guestNameElement.textContent = isVietnamese ? 'cục cưng' : 'sweetheart';
    }
}

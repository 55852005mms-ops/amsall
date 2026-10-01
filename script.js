// --- XP and Progress System ---
let userProgress = JSON.parse(localStorage.getItem('parablesProgress')) || {
    xp: 0,
    completedVideos: [],
    completedGames: []
};

function saveProgress() {
    localStorage.setItem('parablesProgress', JSON.stringify(userProgress));
    updateXPDisplay();
}

function addXP(amount) {
    userProgress.xp += amount;
    saveProgress();
}

function markVideoCompleted(parableId) {
    if (!userProgress.completedVideos.includes(parableId)) {
        userProgress.completedVideos.push(parableId);
        addXP(100);
        alert("🎉 لقد أتممت مشاهدة الفيديو! حصلت على 100 نقطة خبرة وتم فتح اللعبة!");
        // Update UI if on the parable page
        const gameTabBtn = document.querySelector('.tab-btn[onclick*="game"]');
        if (gameTabBtn) {
            gameTabBtn.classList.remove('locked');
            gameTabBtn.innerHTML = "🎮 اللعبة التفاعلية";
        }
    }
}

function markGameCompleted(parableId) {
    if (!userProgress.completedGames.includes(parableId)) {
        userProgress.completedGames.push(parableId);
        addXP(200);
        alert("🏆 مبروك! لقد أنهيت اللعبة بنجاح! حصلت على 200 نقطة خبرة.");
    }
}

function updateXPDisplay() {
    const xpElements = document.querySelectorAll('.xp-display');
    xpElements.forEach(el => {
        el.textContent = `⭐ ${userProgress.xp} XP`;
    });
}

// Tab Switching Logic
function openTab(evt, tabName) {
    const card = evt.currentTarget.closest('.parable-card');
    const parableId = card ? card.getAttribute('data-parable-id') : null;
    
    // Check if trying to open game tab but video not watched
    if (tabName === 'game' && parableId && !userProgress.completedVideos.includes(parableId)) {
        alert("🔒 يجب عليك مشاهدة الفيديو أولاً (بنسبة 80% على الأقل) لفتح هذه اللعبة!");
        return;
    }

    const tabContents = card.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active");
    }

    const tabLinks = card.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
    }

    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Video Tracking Logic
function setupVideoTracking() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        const card = video.closest('.parable-card');
        if (!card) return;
        const parableId = card.getAttribute('data-parable-id');
        
        let eventFired = false;
        video.addEventListener('timeupdate', () => {
            if (!eventFired && video.duration > 0 && (video.currentTime / video.duration >= 0.8)) {
                markVideoCompleted(parableId);
                eventFired = true;
            }
        });
        video.addEventListener('ended', () => {
            if (!eventFired) {
                markVideoCompleted(parableId);
                eventFired = true;
            }
        });
    });
}

// Init Game Tabs states
function initGameTabs() {
    const cards = document.querySelectorAll('.parable-card');
    cards.forEach(card => {
        const parableId = card.getAttribute('data-parable-id');
        const gameTabBtn = card.querySelector('.tab-btn[onclick*="game"]');
        if (gameTabBtn && !userProgress.completedVideos.includes(parableId)) {
            gameTabBtn.classList.add('locked');
            gameTabBtn.innerHTML = "🔒 اللعبة التفاعلية (مغلقة)";
        }
    });
}

// Scroll Animation Observer
document.addEventListener('DOMContentLoaded', () => {
    updateXPDisplay();
    setupVideoTracking();
    initGameTabs();
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.scroll-anim');
    scrollElements.forEach(el => observer.observe(el));
});

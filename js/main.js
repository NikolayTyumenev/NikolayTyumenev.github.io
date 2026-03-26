//
// PORTFOLIO JAVASCRIPT - Nikolay Tyumenev
//


document.addEventListener('DOMContentLoaded', function() {
    
    // HAMBURGER MENU
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        // Toggle active class on hamburger (for animation)
        hamburger.classList.toggle('active');
        
        // Toggle active class on nav menu (show/hide)
        navLinks.classList.toggle('active');
        
        // Toggle body scroll when menu is open
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on a nav link
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active classes
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    
    navLinkItems.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Get header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    // SCROLL ANIMATIONS
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    
    // ACTIVE NAV LINK ON SCROLL
    // Highlight current section in navigation
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinkItems.forEach(link => {
            link.classList.remove('nav-active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('nav-active');
            }
        });
    });
    
    
    //HEADER SHADOW ON SCROLL
    // Add shadow to header when scrolling down
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
});

// SCREENSHOT GALLERY
let lightboxImages = [];
let lightboxIndex = 0;

function getGalleryState(el) {
    const gallery = el.closest('.project-screenshots');
    const screenshots = Array.from(gallery.querySelectorAll('.screenshot'));
    const dots = Array.from(gallery.querySelectorAll('.dot'));
    const current = screenshots.findIndex(s => s.classList.contains('active'));
    return { gallery, screenshots, dots, current };
}

function setGalleryIndex(screenshots, dots, index) {
    screenshots.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    screenshots[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
}

function switchScreenshot(dotEl, index) {
    const { screenshots, dots } = getGalleryState(dotEl);
    setGalleryIndex(screenshots, dots, index);
}

function galleryNav(btn, dir) {
    const { screenshots, dots, current } = getGalleryState(btn);
    const next = (current + dir + screenshots.length) % screenshots.length;
    setGalleryIndex(screenshots, dots, next);
}

function openLightbox(btn) {
    const { screenshots, current } = getGalleryState(btn);
    lightboxImages = screenshots.map(s => ({ src: s.src, alt: s.alt }));
    lightboxIndex = current;
    updateLightbox();
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function openLightboxFromImage(img) {
    const gallery = img.closest('.project-screenshots');
    const screenshots = Array.from(gallery.querySelectorAll('.screenshot'));
    lightboxImages = screenshots.map(s => ({ src: s.src, alt: s.alt }));
    lightboxIndex = screenshots.indexOf(img);
    updateLightbox();
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
}

function lightboxNav(dir) {
    lightboxIndex = (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
    updateLightbox();
}

function updateLightbox() {
    const img = document.getElementById('lightbox-img');
    const dotsEl = document.getElementById('lightbox-dots');
    img.src = lightboxImages[lightboxIndex].src;
    img.alt = lightboxImages[lightboxIndex].alt;
    dotsEl.innerHTML = lightboxImages.map((_, i) =>
        `<span class="dot ${i === lightboxIndex ? 'active' : ''}" onclick="lightboxIndex=${i};updateLightbox()"></span>`
    ).join('');
}

// Close lightbox on backdrop click
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('lightbox').addEventListener('click', function(e) {
        if (e.target === this) closeLightbox();
    });
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        const lb = document.getElementById('lightbox');
        if (!lb.classList.contains('open')) return;
        if (e.key === 'ArrowLeft') lightboxNav(-1);
        if (e.key === 'ArrowRight') lightboxNav(1);
        if (e.key === 'Escape') closeLightbox();
    });
    // Click on screenshot image to open lightbox
    document.querySelectorAll('.project-screenshots .screenshot').forEach(img => {
        img.addEventListener('click', function() {
            openLightboxFromImage(this);
        });
    });
});

// CONSOLE MESSAGE
// Fun little easter egg for developers who check the console
console.log('%c👋 Hi there, Developer!', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cLooking at the code? Check out my GitHub: https://github.com/NikolayTyumenev', 'color: #6b7280; font-size: 14px;');
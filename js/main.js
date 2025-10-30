// ========================================
// PORTFOLIO JAVASCRIPT - Nikolay Tyumenev
// ========================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== HAMBURGER MENU ==========
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
    
    
    // ========== SMOOTH SCROLLING ==========
    // Already handled by CSS scroll-behavior, but adding extra smoothness
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
    
    
    // ========== SCROLL ANIMATIONS (Optional) ==========
    // Add 'visible' class to elements when they come into view
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
    
    
    // ========== ACTIVE NAV LINK ON SCROLL ==========
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
    
    
    // ========== HEADER SHADOW ON SCROLL ==========
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

// ========== CONSOLE MESSAGE ==========
// Fun little easter egg for developers who check the console
console.log('%c👋 Hi there, Developer!', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cLooking at the code? Check out my GitHub: https://github.com/NikolayTyumenev', 'color: #6b7280; font-size: 14px;');
// Main script
console.log("Ignis loaded.");

document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.main-nav');
    const header = document.querySelector('#main-header');
    const body = document.body;

    // Modal functionality
    const modal = document.getElementById('infoModal');
    const openModalBtn = document.getElementById('openInfoModal');
    const closeModalBtn = document.querySelector('.modal-close');

    if (openModalBtn && modal) {
        openModalBtn.addEventListener('click', () => {
            modal.classList.add('active');
            body.style.overflow = 'hidden';
        });
    }

    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                body.style.overflow = 'auto';
            }
        });

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                body.style.overflow = 'auto';
            }
        });
    }

    // Mobile menu toggle
    if (mobileBtn && nav) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            mobileBtn.classList.toggle('active');
            nav.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (nav.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = 'auto';
            }
        });

        // Close menu when clicking on a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.classList.remove('active');
                nav.classList.remove('active');
                body.style.overflow = 'auto';
            });
        });

        // Close menu when pressing Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                mobileBtn.classList.remove('active');
                nav.classList.remove('active');
                body.style.overflow = 'auto';
            }
        });

        // Close menu when clicking on nav
        nav.addEventListener('click', (e) => {
            if (e.target === nav) {
                mobileBtn.classList.remove('active');
                nav.classList.remove('active');
                body.style.overflow = 'auto';
            }
        });
    }
    // Split .info-orange-text into per-character spans so we can stagger animations
    const headlineEls = document.querySelectorAll('.info-orange-text');
    headlineEls.forEach(el => {
        const nodes = Array.from(el.childNodes);
        el.innerHTML = '';
        let charIndex = 0;
        nodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent;
                for (const ch of text) {
                    if (ch === ' ') {
                        // Insert a normal space text node so words can wrap naturally
                        el.appendChild(document.createTextNode(' '));
                        charIndex++;
                    } else {
                        const span = document.createElement('span');
                        span.className = 'char';
                        span.textContent = ch;
                        span.style.animationDelay = (charIndex * 0.02) + 's';
                        el.appendChild(span);
                        charIndex++;
                    }
                }
            } else {
                // Preserve elements like <br>
                el.appendChild(node.cloneNode(true));
            }
        });
    });

    // Header scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 90) {
            // Scroll Down
            header.classList.add('header-hidden');
        } else {
            // Scroll Up
            header.classList.remove('header-hidden');
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling

        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // Scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay for staggered effect
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with scroll-reveal class
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => observer.observe(el));

    // Observe BG section elements with bg-scroll-reveal class
    const bgRevealElements = document.querySelectorAll('.bg-scroll-reveal, .bg-list-item-reveal');
    bgRevealElements.forEach((el, index) => {
        observer.observe(el);
    });

    // Observe Final section elements with final-slide-up class
    const finalRevealElements = document.querySelectorAll('.final-slide-up');
    finalRevealElements.forEach((el, index) => {
        observer.observe(el);
    });

    // Observe Gallery section elements with gallery-scroll-reveal class
    const galleryRevealElements = document.querySelectorAll('.gallery-scroll-reveal');
    galleryRevealElements.forEach((el, index) => {
        observer.observe(el);
    });
});

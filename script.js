// Main script
console.log("Ignis loaded.");

document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.main-nav');
    const header = document.querySelector('#main-header');

    if (mobileBtn && nav) {
        mobileBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileBtn.classList.toggle('active');

            // Animate hamburger to X
            const spans = mobileBtn.querySelectorAll('span');
            if (mobileBtn.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';

                // Show nav
                nav.style.display = 'flex';
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.width = '100%';
                nav.style.flexDirection = 'column';
                nav.style.background = 'rgba(10, 10, 10, 0.95)';
                nav.style.padding = '20px';
                nav.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';

                nav.style.display = ''; // Reset to css default
                nav.removeAttribute('style'); // Clean inline styles
            }
        });
    }

    // Header scroll background effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = '#000000';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
        } else {
            header.style.background = '#000000';
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

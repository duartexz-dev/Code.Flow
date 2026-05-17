/**
 * CodeFlow — Home Page Logic
 */
(() => {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        // Mobile Menu
        const mobileBtn = document.getElementById('mobile-btn');
        const navLinks = document.getElementById('nav-links');
        if (mobileBtn && navLinks) {
            mobileBtn.addEventListener('click', () => {
                const open = navLinks.classList.toggle('mobile-open');
                if (open) {
                    Object.assign(navLinks.style, {
                        display: 'flex', flexDirection: 'column', position: 'absolute',
                        top: '100%', left: '0', width: '100%', padding: '1.5rem',
                        background: 'rgba(11,17,32,0.98)', backdropFilter: 'blur(16px)',
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                    });
                } else {
                    navLinks.removeAttribute('style');
                }
            });
        }

        // Navbar scroll
        const navbar = document.getElementById('navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                navbar.classList.toggle('scrolled', window.scrollY > 30);
            }, { passive: true });
        }

        // Scroll reveal (Cinematic IntersectionObserver)
        const reveals = document.querySelectorAll('.section-reveal');
        if (reveals.length) {
            const obs = new IntersectionObserver((entries) => {
                entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
            }, { threshold: 0.1 }); // Lower threshold for earlier cinematic reveal
            reveals.forEach(el => obs.observe(el));
            // Trigger immediately for elements already in viewport
            setTimeout(() => {
                reveals.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if(rect.top < window.innerHeight) el.classList.add('active');
                });
            }, 100);
        }

        // Cinematic 3D Mouse Tracking & Magnetic Glow
        const cards = document.querySelectorAll('.code-snippet-card, .glass-card, .course-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Set CSS variables for the radial-gradient glow
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);

                // 3D Tilt calculation (only for larger cards like hero graphic)
                if(card.classList.contains('code-snippet-card')) {
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * -8; // Max 8 deg
                    const rotateY = ((x - centerX) / centerX) * 8;
                    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(50px)`;
                }
            });

            card.addEventListener('mouseleave', () => {
                if(card.classList.contains('code-snippet-card')) {
                    card.style.transform = `rotateY(-15deg) rotateX(10deg) translateZ(50px)`;
                }
            });
        });
    });
})();

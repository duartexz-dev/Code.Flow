/**
 * CodeFlow — Ambient Background Effects
 * Lightweight particles on a deep navy void.
 */
(() => {
    'use strict';

    const initParticles = () => {
        const canvas = document.getElementById('space-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let w = window.innerWidth, h = window.innerHeight;
        canvas.width = w; canvas.height = h;

        const count = w > 768 ? 100 : 50;
        const particles = Array.from({ length: count }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 1.2 + 0.3,
            vx: (Math.random() - 0.5) * 0.15,
            vy: (Math.random() - 0.5) * 0.15,
            alpha: Math.random() * 0.35 + 0.05,
        }));

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => { w = window.innerWidth; h = window.innerHeight; canvas.width = w; canvas.height = h; }, 200);
        }, { passive: true });

        const draw = () => {
            ctx.clearRect(0, 0, w, h);

            // Subtle gradient background instead of pure black
            const grad = ctx.createLinearGradient(0, 0, 0, h);
            grad.addColorStop(0, '#0b1120');
            grad.addColorStop(1, '#0e1a33');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, w, h);

            for (const p of particles) {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(77, 166, 255, ${p.alpha})`;
                ctx.fill();
            }
            requestAnimationFrame(draw);
        };
        draw();
    };

    document.addEventListener('DOMContentLoaded', initParticles);
})();

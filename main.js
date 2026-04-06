document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('js-enabled');
    // Language Switcher
    const langBtn = document.getElementById('lang-switch');
    let currentLang = 'en';

    const translations = {
        'en': {
            'btn': 'ES',
            'quote': '“Learn from the mistakes of others. You can never live long enough to make them all yourself.”'
        },
        'es': {
            'btn': 'EN',
            'quote': '“Aprende de los errores de los demás. No vivirás lo suficiente para cometerlos todos tú mismo.”'
        }
    };

    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'es' : 'en';
        langBtn.textContent = translations[currentLang].btn;
        document.getElementById('main-quote').textContent = translations[currentLang].quote;

        // Update all elements with data-en/data-es
        document.querySelectorAll('[data-en]').forEach(el => {
            el.textContent = el.getAttribute(`data-${currentLang}`);
        });

        // Update html lang attribute
        document.documentElement.lang = currentLang;
    });

    // Year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.9;

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger initial check

    // Simple Particle System
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const particlesContainer = document.getElementById('particles-js');
    particlesContainer.appendChild(canvas);

    let particles = [];
    const particleCount = 50;

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2;
            this.alpha = Math.random() * 0.5;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.fillStyle = `rgba(103, 232, 249, ${this.alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    };

    animate();
});

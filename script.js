/* ============================================
   PRINT POINT THURAVOOR – INTERACTIVE SCRIPTS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- NAVBAR SCROLL EFFECT ----------
    const navbar = document.getElementById('navbar');
    const handleNavScroll = () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleNavScroll);
    handleNavScroll(); // run once on load

    // ---------- MOBILE MENU TOGGLE ----------
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('open');
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ---------- ACTIVE NAV LINK ON SCROLL ----------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const updateActiveLink = () => {
        const scrollY = window.scrollY + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    window.addEventListener('scroll', updateActiveLink);

    // ---------- SCROLL ANIMATIONS (Intersection Observer) ----------
    const animElements = document.querySelectorAll('.anim-fade-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const animObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animObserver.unobserve(entry.target); // animate only once
            }
        });
    }, observerOptions);

    animElements.forEach(el => animObserver.observe(el));

    // ---------- WHATSAPP FORM HANDLER ----------
    const enquiryForm = document.getElementById('enquiryForm');

    enquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();

        if (!name || !phone || !service || !message) {
            alert('Please fill in all fields.');
            return;
        }

        // Build WhatsApp message
        const waMessage = `Hello Print Point! 👋\n\n` +
            `*New Enquiry:*\n` +
            `━━━━━━━━━━━━━━\n` +
            `👤 *Name:* ${name}\n` +
            `📞 *Phone:* ${phone}\n` +
            `🖨️ *Service:* ${service}\n` +
            `💬 *Message:* ${message}\n` +
            `━━━━━━━━━━━━━━\n\n` +
            `Sent from PrintPoint Website`;

        const encodedMessage = encodeURIComponent(waMessage);
        const waURL = `https://wa.me/919249920000?text=${encodedMessage}`;

        window.open(waURL, '_blank');
    });

    // ---------- ULTRA-SMOOTH SCROLL WITH EASING ----------
    function smoothScrollTo(targetY, duration) {
        const startY = window.scrollY;
        const diff = targetY - startY;
        let startTime = null;

        // easeInOutCubic for buttery-smooth feel
        function easing(t) {
            return t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function step(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            window.scrollTo(0, startY + diff * easing(progress));
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetY = target.getBoundingClientRect().top + window.scrollY - navHeight;
                smoothScrollTo(targetY, 900);
            }
        });
    });

    // ---------- COUNTER ANIMATION FOR STATS ----------
    const counters = document.querySelectorAll('.stat-num');
    let countStarted = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const text = counter.textContent;
            const numMatch = text.match(/(\d+)/);
            if (!numMatch) return;
            const target = parseInt(numMatch[1]);
            const suffix = text.replace(numMatch[1], '');
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = text;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + suffix;
                }
            }, 30);
        });
    };

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countStarted) {
                    countStarted = true;
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }

});

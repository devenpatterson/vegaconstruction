// ============================================
// VEGA CONSTRUCTION LLC — Site Scripts
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    const scrollThreshold = 80;

    const handleScroll = () => {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // check on load

    // --- Mobile Nav Toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // --- Smooth Scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = navbar.offsetHeight + 16;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // --- Scroll Reveal (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation slightly for grid items
                const delay = entry.target.closest('.services-grid, .trust-grid')
                    ? index * 100
                    : 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Hero Particles ---
    const particlesContainer = document.getElementById('heroParticles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (4 + Math.random() * 4) + 's';
        particle.style.width = particle.style.height = (1 + Math.random() * 2) + 'px';
        particlesContainer.appendChild(particle);
    }

    // --- Form Handling (mailto) ---
    const quoteForm = document.getElementById('quoteForm');

    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = quoteForm.querySelector('[name="name"]').value;
        const phone = quoteForm.querySelector('[name="phone"]').value;
        const email = quoteForm.querySelector('[name="email"]').value;
        const service = quoteForm.querySelector('[name="service"]').value;
        const message = quoteForm.querySelector('[name="message"]').value;

        const subject = encodeURIComponent('Quote Request — ' + service + ' — ' + name);
        const body = encodeURIComponent(
            'Name: ' + name + '\n' +
            'Phone: ' + phone + '\n' +
            'Email: ' + email + '\n' +
            'Service: ' + service + '\n\n' +
            'Project Details:\n' + message
        );

        window.location.href = 'mailto:Nicolasvega91@icloud.com?subject=' + subject + '&body=' + body;
    });

});

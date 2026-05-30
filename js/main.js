// True North Ritual - Main JavaScript

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Contact Form Handler
    // Form submits directly to Formspree - no custom handler needed

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect (optional - adds shadow on scroll)
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('shadow-md');
            } else {
                header.classList.remove('shadow-md');
            }
        });
    }

    // GA4 conversion event tracking via delegation
    if (typeof gtag === 'function') {
        const linkLocation = (el) => {
            if (el.closest('header, nav')) return 'header';
            if (el.closest('footer')) return 'footer';
            return 'body';
        };

        document.addEventListener('click', function(e) {
            const link = e.target.closest('a[href]');
            if (!link) return;
            const href = link.getAttribute('href') || '';
            const location = linkLocation(link);
            const text = (link.textContent || '').trim().slice(0, 60);

            if (href.startsWith('tel:')) {
                gtag('event', 'phone_click', {link_location: location, link_text: text});
            } else if (href.startsWith('mailto:')) {
                gtag('event', 'email_click', {link_location: location, link_text: text});
            } else if (/(^|\/)book\.html(?:$|[?#])/.test(href)) {
                if (window.location.pathname.endsWith('/book.html')) return;
                gtag('event', 'book_click', {link_location: location, link_text: text});
            }
        });

        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function() {
                gtag('event', 'form_submit', {form_id: 'contactForm'});
            });
        }

        if (window.location.pathname.endsWith('/book.html')) {
            gtag('event', 'view_booking_page');
        }
    }

    // Treatment Toggle Handler
    const treatmentToggles = document.querySelectorAll('.treatment-toggle');
    treatmentToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const content = document.getElementById(targetId);
            const icon = this.querySelector('.toggle-icon');

            if (content && icon) {
                content.classList.toggle('hidden');

                // Rotate icon and change between + and -
                if (content.classList.contains('hidden')) {
                    icon.textContent = '+';
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    icon.textContent = '−';
                    icon.style.transform = 'rotate(180deg)';
                }
            }
        });
    });
});

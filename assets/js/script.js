// ========================================
// THEME TOGGLE & INITIALIZATION
// ========================================

const mainLogoIcon = document.getElementById('main-logo-icon');
const favicon = document.getElementById('favicon');

// Theme Toggle
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');
const moonIconMobile = document.querySelector('.moon-icon-mobile');
const sunIconMobile = document.querySelector('.sun-icon-mobile');

// Load theme preference
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    if (moonIcon) moonIcon.style.display = 'none';
    if (sunIcon) sunIcon.style.display = 'block';
    if (moonIconMobile) moonIconMobile.style.display = 'none';
    if (sunIconMobile) sunIconMobile.style.display = 'block';
    if (mainLogoIcon) mainLogoIcon.src = 'assets/img/logo-black.png';
    if (favicon) favicon.href = 'assets/img/logo-black.png';
}

function toggleTheme() {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        if (moonIcon) moonIcon.style.display = 'none';
        if (sunIcon) sunIcon.style.display = 'block';
        if (moonIconMobile) moonIconMobile.style.display = 'none';
        if (sunIconMobile) sunIconMobile.style.display = 'block';
        localStorage.setItem('theme', 'light');
        if (mainLogoIcon) mainLogoIcon.src = 'assets/img/logo-black.png';
        if (favicon) favicon.href = 'assets/img/logo-black.png';
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        if (moonIcon) moonIcon.style.display = 'block';
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIconMobile) moonIconMobile.style.display = 'block';
        if (sunIconMobile) sunIconMobile.style.display = 'none';
        localStorage.setItem('theme', 'dark');
        if (mainLogoIcon) mainLogoIcon.src = 'assets/img/logo-white.png';
        if (favicon) favicon.href = 'assets/img/logo-white.png';
    }
}

if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);

// ========================================
// MOBILE MENU TOGGLE
// ========================================

const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        if (mobileMenu.classList.contains('active')) {
            menuIcon.style.display = 'none';
            closeIcon.style.display = 'block';
        } else {
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        }
    });
}

// Close mobile menu when clicking on links
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        if (menuIcon) menuIcon.style.display = 'block';
        if (closeIcon) closeIcon.style.display = 'none';
    });
});

// ========================================
// SMOOTH SCROLL NAVIGATION
// ========================================

const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-link, .cta-button');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========================================
// COPYRIGHT YEAR
// ========================================

const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
});

// ========================================
// FORM & MODAL INITIALIZATION
// ========================================

// Single entry point for all form/modal logic
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded, initializing forms and modals...');
    initializeContactForm();
    initializePartnerModal();
});

// Helper: Common Email Validator
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// ========================================
// CONTACT FORM LOGIC
// ========================================

function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    const contactSubmitBtn = document.getElementById('contact-submit-button');
    
    if (!contactForm) return;

    // Inputs & Errors
    const inputs = {
        name: document.getElementById('contact-name'),
        email: document.getElementById('contact-email'),
        phone: document.getElementById('contact-phone'),
        service: document.getElementById('contact-service'),
        message: document.getElementById('contact-message')
    };

    const validate = () => {
        let isValid = true;
        Object.keys(inputs).forEach(key => {
            const input = inputs[key];
            const errorElement = document.getElementById(`contact-${key}-error`);
            
            input.classList.remove('error');
            if (errorElement) errorElement.classList.remove('active');

            if (!input.value.trim() || (key === 'email' && !isValidEmail(input.value))) {
                input.classList.add('error');
                if (errorElement) {
                    errorElement.textContent = key === 'email' ? 'Valid email is required' : `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
                    errorElement.classList.add('active');
                }
                isValid = false;
            }
        });
        return isValid;
    };

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const originalText = contactSubmitBtn.textContent;
        try {
            contactSubmitBtn.disabled = true;
            contactSubmitBtn.textContent = 'SENDING...';

            const response = await fetch('https://formspree.io/f/xjgajwgr', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    name: inputs.name.value.trim(),
                    email: inputs.email.value.trim(),
                    phone: inputs.phone.value.trim(),
                    service: inputs.service.value,
                    message: inputs.message.value.trim(),
                    _subject: 'The HandyWorx: New Quote Request'
                })
            });

            if (response.ok) {
                alert('Thank you! We have received your request.');
                contactForm.reset();
            } else {
                throw new Error('Submission failed');
            }
        } catch (err) {
            alert('Oops! Something went wrong. Please email kate@thehandyworx.co.za');
        } finally {
            contactSubmitBtn.disabled = false;
            contactSubmitBtn.textContent = originalText;
        }
    });

    // Clear error styling on type
    Object.values(inputs).forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('error');
            const err = document.getElementById(`${input.id}-error`);
            if (err) err.classList.remove('active');
        });
    });
}

// ========================================
// PARTNER MODAL & FORM LOGIC
// ========================================

function initializePartnerModal() {
    const partnerModal = document.getElementById('partner-modal');
    const openModalBtn = document.getElementById('open-partner-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const partnerForm = document.getElementById('partner-form');

    if (!partnerModal || !partnerForm) return;

    // Open/Close functions
    const openModal = () => {
        partnerModal.style.display = 'flex';
        setTimeout(() => partnerModal.classList.add('active'), 10);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        partnerModal.classList.remove('active');
        setTimeout(() => {
            partnerModal.style.display = 'none';
            partnerForm.reset();
            // Clear error states
            partnerForm.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
            partnerForm.querySelectorAll('.error-message').forEach(el => el.classList.remove('active'));
        }, 300);
        document.body.style.overflow = '';
    };

    // Listeners
    if (openModalBtn) openModalBtn.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    // Partner Form Submit
    partnerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = partnerForm.querySelector('.modal-submit-button');
        const originalText = submitBtn.textContent;

        try {
            submitBtn.disabled = true;
            submitBtn.textContent = 'SUBMITTING...';

            const response = await fetch('https://formspree.io/f/xjgajwgr', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    contact_name: document.getElementById('partner-contact-name').value.trim(),
                    business_name: document.getElementById('partner-business-name').value.trim(),
                    email: document.getElementById('partner-email').value.trim(),
                    phone: document.getElementById('partner-phone').value.trim(),
                    description: document.getElementById('partner-description').value.trim(),
                    _subject: 'The HandyWorx: New Partner Application'
                })
            });

            if (response.ok) {
                alert('Application sent! We will get back to you soon.');
                closeModal();
            } else {
                throw new Error('Submission failed');
            }
        } catch (err) {
            alert('There was an error. Please try again later.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}
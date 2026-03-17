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
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'block';
    moonIconMobile.style.display = 'none';
    sunIconMobile.style.display = 'block';
    mainLogoIcon.src = 'assets/img/logo-black.png';
    favicon.href = 'assets/img/logo-black.png';
}

function toggleTheme() {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
        moonIconMobile.style.display = 'none';
        sunIconMobile.style.display = 'block';
        localStorage.setItem('theme', 'light');
        mainLogoIcon.src = 'assets/img/logo-black.png';
        favicon.href = 'assets/img/logo-black.png';
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
        moonIconMobile.style.display = 'block';
        sunIconMobile.style.display = 'none';
        localStorage.setItem('theme', 'dark');
        mainLogoIcon.src = 'assets/img/logo-white.png';
        favicon.href = 'assets/img/logo-white.png';
    }
}

themeToggle.addEventListener('click', toggleTheme);
mobileThemeToggle.addEventListener('click', toggleTheme);

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

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

// Close mobile menu when clicking on links
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    });
});

// Smooth Scroll for Navigation Links
const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-link, .cta-button');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
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

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Form Validation and Submission
const submitButton = document.getElementById('submit-button');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const serviceInput = document.getElementById('service');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const phoneError = document.getElementById('phone-error');
const serviceError = document.getElementById('service-error');
const messageError = document.getElementById('message-error');

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm() {
    let isValid = true;

    // Reset errors
    nameInput.classList.remove('error');
    emailInput.classList.remove('error');
    phoneInput.classList.remove('error');
    serviceInput.classList.remove('error');
    messageInput.classList.remove('error');
    
    nameError.classList.remove('active');
    emailError.classList.remove('active');
    phoneError.classList.remove('active');
    serviceError.classList.remove('active');
    messageError.classList.remove('active');

    // Validate name
    if (nameInput.value.trim() === '') {
        nameInput.classList.add('error');
        nameError.textContent = 'Name is required';
        nameError.classList.add('active');
        isValid = false;
    }

    // Validate email
    if (emailInput.value.trim() === '') {
        emailInput.classList.add('error');
        emailError.textContent = 'Email is required';
        emailError.classList.add('active');
        isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
        emailInput.classList.add('error');
        emailError.textContent = 'Email is invalid';
        emailError.classList.add('active');
        isValid = false;
    }

    // Validate phone
    if (phoneInput.value.trim() === '') {
        phoneInput.classList.add('error');
        phoneError.textContent = 'Phone is required';
        phoneError.classList.add('active');
        isValid = false;
    }

    // Validate service
    if (serviceInput.value === '') {
        serviceInput.classList.add('error');
        serviceError.textContent = 'Please select a service';
        serviceError.classList.add('active');
        isValid = false;
    }

    // Validate message
    if (messageInput.value.trim() === '') {
        messageInput.classList.add('error');
        messageError.textContent = 'Message is required';
        messageError.classList.add('active');
        isValid = false;
    }

    return isValid;
}

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        // Here you would typically send the form data to a backend or service like Formspree
        // For now, we'll just show a success message and reset the form
        
        alert('Thank you for your message! We will contact you shortly.');
        
        // Reset form
        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
        serviceInput.value = '';
        messageInput.value = '';
    }
});

// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Remove error styling when user starts typing
[nameInput, emailInput, phoneInput, serviceInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
        input.classList.remove('error');
        const errorId = input.id + '-error';
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.classList.remove('active');
        }
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.15 // Triggers when 15% of the element is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: stop observing once revealed
            // observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

// Apply observer to all reveal elements
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
});
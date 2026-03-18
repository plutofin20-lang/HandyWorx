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
    threshold: 0.05, // Changed from 0.15 - triggers earlier
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: stop observing once revealed
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

// Apply observer to all reveal elements
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
});

// ========================================
// PARTNER MODAL FUNCTIONALITY - DEBUGGED
// ========================================

// Add this RIGHT AFTER the window loads to ensure elements exist
document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Modal script loaded'); // Debug message
    
    // Modal elements
    const partnerModal = document.getElementById('partner-modal');
    const openModalBtn = document.getElementById('open-partner-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const partnerForm = document.getElementById('partner-form');
    
    // Debug: Check if elements exist
    console.log('Modal element:', partnerModal);
    console.log('Open button:', openModalBtn);
    console.log('Close button:', closeModalBtn);

    // Form inputs
    const partnerContactName = document.getElementById('partner-contact-name');
    const partnerBusinessName = document.getElementById('partner-business-name');
    const partnerEmail = document.getElementById('partner-email');
    const partnerPhone = document.getElementById('partner-phone');
    const partnerDescription = document.getElementById('partner-description');

    // Error elements
    const partnerContactNameError = document.getElementById('partner-contact-name-error');
    const partnerBusinessNameError = document.getElementById('partner-business-name-error');
    const partnerEmailError = document.getElementById('partner-email-error');
    const partnerPhoneError = document.getElementById('partner-phone-error');
    const partnerDescriptionError = document.getElementById('partner-description-error');

    // Open modal
    function openModal() {
        console.log('Opening modal...'); // Debug
        if (partnerModal) {
            partnerModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('Modal opened successfully');
        } else {
            console.error('Modal element not found!');
        }
    }

    // Close modal
    function closeModal() {
        console.log('Closing modal...'); // Debug
        if (partnerModal) {
            partnerModal.classList.remove('active');
            document.body.style.overflow = '';
            resetPartnerForm();
        }
    }

    // Reset form
    function resetPartnerForm() {
        if (partnerForm) {
            partnerForm.reset();
            
            // Remove error states
            [partnerContactName, partnerBusinessName, partnerEmail, partnerPhone, partnerDescription].forEach(input => {
                if (input) input.classList.remove('error');
            });
            
            [partnerContactNameError, partnerBusinessNameError, partnerEmailError, partnerPhoneError, partnerDescriptionError].forEach(error => {
                if (error) error.classList.remove('active');
            });
        }
    }

    // Event listeners for opening/closing modal
    if (openModalBtn) {
        openModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Button clicked!'); // Debug
            openModal();
        });
    } else {
        console.error('Open modal button not found!');
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && partnerModal && partnerModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Email validation function (reuse existing one or define here)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Validate partner form
    function validatePartnerForm() {
        let isValid = true;

        // Reset errors
        [partnerContactName, partnerBusinessName, partnerEmail, partnerPhone, partnerDescription].forEach(input => {
            if (input) input.classList.remove('error');
        });
        
        [partnerContactNameError, partnerBusinessNameError, partnerEmailError, partnerPhoneError, partnerDescriptionError].forEach(error => {
            if (error) error.classList.remove('active');
        });

        // Validate contact name
        if (partnerContactName && partnerContactName.value.trim() === '') {
            partnerContactName.classList.add('error');
            if (partnerContactNameError) {
                partnerContactNameError.textContent = 'Contact name is required';
                partnerContactNameError.classList.add('active');
            }
            isValid = false;
        }

        // Validate business name
        if (partnerBusinessName && partnerBusinessName.value.trim() === '') {
            partnerBusinessName.classList.add('error');
            if (partnerBusinessNameError) {
                partnerBusinessNameError.textContent = 'Business name is required';
                partnerBusinessNameError.classList.add('active');
            }
            isValid = false;
        }

        // Validate email
        if (partnerEmail && partnerEmail.value.trim() === '') {
            partnerEmail.classList.add('error');
            if (partnerEmailError) {
                partnerEmailError.textContent = 'Email is required';
                partnerEmailError.classList.add('active');
            }
            isValid = false;
        } else if (partnerEmail && !validateEmail(partnerEmail.value.trim())) {
            partnerEmail.classList.add('error');
            if (partnerEmailError) {
                partnerEmailError.textContent = 'Email is invalid';
                partnerEmailError.classList.add('active');
            }
            isValid = false;
        }

        // Validate phone
        if (partnerPhone && partnerPhone.value.trim() === '') {
            partnerPhone.classList.add('error');
            if (partnerPhoneError) {
                partnerPhoneError.textContent = 'Contact number is required';
                partnerPhoneError.classList.add('active');
            }
            isValid = false;
        }

        // Validate description
        if (partnerDescription && partnerDescription.value.trim() === '') {
            partnerDescription.classList.add('error');
            if (partnerDescriptionError) {
                partnerDescriptionError.textContent = 'Business description is required';
                partnerDescriptionError.classList.add('active');
            }
            isValid = false;
        }

        return isValid;
    }

    // Handle form submission
    if (partnerForm) {
        partnerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!validatePartnerForm()) {
                return;
            }

            // Prepare form data
            const formData = {
                contact_name: partnerContactName.value.trim(),
                business_name: partnerBusinessName.value.trim(),
                email: partnerEmail.value.trim(),
                phone: partnerPhone.value.trim(),
                business_description: partnerDescription.value.trim(),
                form_type: 'Partner Application'
            };

            // Get submit button
            const submitBtn = partnerForm.querySelector('.modal-submit-button');
            const originalText = submitBtn.textContent;
            
            try {
                // Disable button and show loading state
                submitBtn.disabled = true;
                submitBtn.textContent = 'SUBMITTING...';

                // REPLACE THIS URL WITH YOUR ACTUAL FORMSPREE ENDPOINT
                const response = await fetch('https://formspree.io/f/meerpvqv', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    alert('Thank you for your application! We will review it and get back to you within 2-3 business days.');
                    closeModal();
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                alert('There was an error submitting your application. Please try again or contact us directly.');
            } finally {
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }

    // Remove error styling when user starts typing
    [partnerContactName, partnerBusinessName, partnerEmail, partnerPhone, partnerDescription].forEach(input => {
        if (input) {
            input.addEventListener('input', () => {
                input.classList.remove('error');
                const errorId = input.id + '-error';
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.classList.remove('active');
                }
            });
        }
    });

}); // End of DOMContentLoaded
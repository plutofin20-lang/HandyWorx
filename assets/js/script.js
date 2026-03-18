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
// CONTACT FORM SUBMISSION - FORMSPREE
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Contact form elements
    const contactName = document.getElementById('contact-name');
    const contactEmail = document.getElementById('contact-email');
    const contactPhone = document.getElementById('contact-phone');
    const contactService = document.getElementById('contact-service');
    const contactMessage = document.getElementById('contact-message');
    const contactSubmitBtn = document.getElementById('contact-submit-button');
    
    // Error elements
    const contactNameError = document.getElementById('contact-name-error');
    const contactEmailError = document.getElementById('contact-email-error');
    const contactPhoneError = document.getElementById('contact-phone-error');
    const contactServiceError = document.getElementById('contact-service-error');
    const contactMessageError = document.getElementById('contact-message-error');
    
    // Email validation
    function validateEmailContact(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Validate contact form
    function validateContactForm() {
        let isValid = true;
        
        // Reset errors
        [contactName, contactEmail, contactPhone, contactService, contactMessage].forEach(input => {
            if (input) input.classList.remove('error');
        });
        
        [contactNameError, contactEmailError, contactPhoneError, contactServiceError, contactMessageError].forEach(error => {
            if (error) error.classList.remove('active');
        });
        
        // Validate name
        if (contactName && contactName.value.trim() === '') {
            contactName.classList.add('error');
            if (contactNameError) {
                contactNameError.textContent = 'Name is required';
                contactNameError.classList.add('active');
            }
            isValid = false;
        }
        
        // Validate email
        if (contactEmail && contactEmail.value.trim() === '') {
            contactEmail.classList.add('error');
            if (contactEmailError) {
                contactEmailError.textContent = 'Email is required';
                contactEmailError.classList.add('active');
            }
            isValid = false;
        } else if (contactEmail && !validateEmailContact(contactEmail.value.trim())) {
            contactEmail.classList.add('error');
            if (contactEmailError) {
                contactEmailError.textContent = 'Email is invalid';
                contactEmailError.classList.add('active');
            }
            isValid = false;
        }
        
        // Validate phone
        if (contactPhone && contactPhone.value.trim() === '') {
            contactPhone.classList.add('error');
            if (contactPhoneError) {
                contactPhoneError.textContent = 'Phone is required';
                contactPhoneError.classList.add('active');
            }
            isValid = false;
        }
        
        // Validate service
        if (contactService && contactService.value === '') {
            contactService.classList.add('error');
            if (contactServiceError) {
                contactServiceError.textContent = 'Please select a service';
                contactServiceError.classList.add('active');
            }
            isValid = false;
        }
        
        // Validate message
        if (contactMessage && contactMessage.value.trim() === '') {
            contactMessage.classList.add('error');
            if (contactMessageError) {
                contactMessageError.textContent = 'Message is required';
                contactMessageError.classList.add('active');
            }
            isValid = false;
        }
        
        return isValid;
    }
    
    // Handle form submission
    if (contactSubmitBtn) {
        contactSubmitBtn.addEventListener('click', async function(e) {
            e.preventDefault();
            
            console.log('Contact form submit clicked');
            
            if (!validateContactForm()) {
                console.log('Contact form validation failed');
                return;
            }
            
            // Prepare form data
            const formData = {
                name: contactName.value.trim(),
                email: contactEmail.value.trim(),
                phone: contactPhone.value.trim(),
                service: contactService.value,
                message: contactMessage.value.trim(),
                form_type: 'Contact Form'
            };
            
            console.log('Submitting contact form data:', formData);
            
            const originalText = contactSubmitBtn.textContent;
            
            try {
                // Disable button and show loading state
                contactSubmitBtn.disabled = true;
                contactSubmitBtn.textContent = 'SENDING...';
                
                // Submit to Formspree
                const response = await fetch('https://formspree.io/f/xjgajwgr', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                console.log('Contact form response status:', response.status);
                
                if (response.ok) {
                    alert('Thank you for your message! We will get back to you shortly.');
                    
                    // Reset form
                    contactName.value = '';
                    contactEmail.value = '';
                    contactPhone.value = '';
                    contactService.value = '';
                    contactMessage.value = '';
                    
                    console.log('Contact form submitted successfully');
                } else {
                    const errorData = await response.json();
                    console.error('Formspree error:', errorData);
                    throw new Error('Submission failed');
                }
            } catch (error) {
                console.error('Contact form submission error:', error);
                alert('There was an error sending your message. Please try again or contact us directly at kate@thehandyworx.co.za');
            } finally {
                // Re-enable button
                contactSubmitBtn.disabled = false;
                contactSubmitBtn.textContent = originalText;
            }
        });
    }
    
    // Remove error styling when user starts typing
    [contactName, contactEmail, contactPhone, contactService, contactMessage].forEach(input => {
        if (input) {
            input.addEventListener('input', function() {
                this.classList.remove('error');
                const errorId = this.id + '-error';
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.classList.remove('active');
                }
            });
        }
    });
    
    console.log('Contact form initialized');
});

// ========================================
// PARTNER MODAL FUNCTIONALITY
// ========================================

// Multiple event listeners to ensure compatibility with GitHub Pages
window.addEventListener('load', initializePartnerModal);
document.addEventListener('DOMContentLoaded', initializePartnerModal);

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initializePartnerModal();
}

function initializePartnerModal() {
    console.log('Initializing partner modal...');
    
    // Modal elements
    const partnerModal = document.getElementById('partner-modal');
    const openModalBtn = document.getElementById('open-partner-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const partnerForm = document.getElementById('partner-form');
    
    console.log('Partner Modal:', partnerModal ? 'Found' : 'NOT FOUND');
    console.log('Open Button:', openModalBtn ? 'Found' : 'NOT FOUND');

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

    // Open modal function
    function openModal(e) {
        if (e) e.preventDefault();
        console.log('Opening partner modal...');
        
        if (partnerModal) {
            partnerModal.style.display = 'flex';
            setTimeout(() => {
                partnerModal.classList.add('active');
            }, 10);
            document.body.style.overflow = 'hidden';
            console.log('Partner modal opened');
        } else {
            console.error('Partner modal element not found!');
        }
    }

    // Close modal function
    function closeModal(e) {
        if (e) e.preventDefault();
        console.log('Closing partner modal...');
        
        if (partnerModal) {
            partnerModal.classList.remove('active');
            setTimeout(() => {
                partnerModal.style.display = 'none';
            }, 300);
            document.body.style.overflow = '';
            resetPartnerForm();
        }
    }

    // Reset form
    function resetPartnerForm() {
        if (partnerForm) {
            partnerForm.reset();
            
            [partnerContactName, partnerBusinessName, partnerEmail, partnerPhone, partnerDescription].forEach(input => {
                if (input) input.classList.remove('error');
            });
            
            [partnerContactNameError, partnerBusinessNameError, partnerEmailError, partnerPhoneError, partnerDescriptionError].forEach(error => {
                if (error) error.classList.remove('active');
            });
        }
    }

    // Attach event listeners
    if (openModalBtn) {
        openModalBtn.onclick = null;
        openModalBtn.addEventListener('click', openModal);
        openModalBtn.onclick = openModal;
        console.log('Partner modal button listeners attached');
    } else {
        console.error('Partner modal open button not found!');
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
        closeModalBtn.onclick = closeModal;
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
        modalOverlay.onclick = closeModal;
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && partnerModal && partnerModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Email validation
    function validateEmailPartner(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Validate partner form
    function validatePartnerForm() {
        let isValid = true;

        [partnerContactName, partnerBusinessName, partnerEmail, partnerPhone, partnerDescription].forEach(input => {
            if (input) input.classList.remove('error');
        });
        
        [partnerContactNameError, partnerBusinessNameError, partnerEmailError, partnerPhoneError, partnerDescriptionError].forEach(error => {
            if (error) error.classList.remove('active');
        });

        if (partnerContactName && partnerContactName.value.trim() === '') {
            partnerContactName.classList.add('error');
            if (partnerContactNameError) {
                partnerContactNameError.textContent = 'Contact name is required';
                partnerContactNameError.classList.add('active');
            }
            isValid = false;
        }

        if (partnerBusinessName && partnerBusinessName.value.trim() === '') {
            partnerBusinessName.classList.add('error');
            if (partnerBusinessNameError) {
                partnerBusinessNameError.textContent = 'Business name is required';
                partnerBusinessNameError.classList.add('active');
            }
            isValid = false;
        }

        if (partnerEmail && partnerEmail.value.trim() === '') {
            partnerEmail.classList.add('error');
            if (partnerEmailError) {
                partnerEmailError.textContent = 'Email is required';
                partnerEmailError.classList.add('active');
            }
            isValid = false;
        } else if (partnerEmail && !validateEmailPartner(partnerEmail.value.trim())) {
            partnerEmail.classList.add('error');
            if (partnerEmailError) {
                partnerEmailError.textContent = 'Email is invalid';
                partnerEmailError.classList.add('active');
            }
            isValid = false;
        }

        if (partnerPhone && partnerPhone.value.trim() === '') {
            partnerPhone.classList.add('error');
            if (partnerPhoneError) {
                partnerPhoneError.textContent = 'Contact number is required';
                partnerPhoneError.classList.add('active');
            }
            isValid = false;
        }

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
        partnerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            console.log('Partner form submit triggered');
            
            if (!validatePartnerForm()) {
                console.log('Partner form validation failed');
                return;
            }

            const formData = {
                contact_name: partnerContactName.value.trim(),
                business_name: partnerBusinessName.value.trim(),
                email: partnerEmail.value.trim(),
                phone: partnerPhone.value.trim(),
                business_description: partnerDescription.value.trim(),
                form_type: 'Partner Application'
            };

            console.log('Submitting partner form data:', formData);

            const submitBtn = partnerForm.querySelector('.modal-submit-button');
            const originalText = submitBtn.textContent;
            
            try {
                submitBtn.disabled = true;
                submitBtn.textContent = 'SUBMITTING...';

                const response = await fetch('https://formspree.io/f/xjgajwgr', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                console.log('Partner form response:', response.status);

                if (response.ok) {
                    alert('Thank you for your application! We will review it and get back to you within 2-3 business days.');
                    closeModal();
                    console.log('Partner form submitted successfully');
                } else {
                    const errorData = await response.json();
                    console.error('Formspree error:', errorData);
                    throw new Error('Submission failed');
                }
            } catch (error) {
                console.error('Partner form submission error:', error);
                alert('There was an error submitting your application. Please try again or contact us directly.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }

    // Remove error styling when user starts typing
    [partnerContactName, partnerBusinessName, partnerEmail, partnerPhone, partnerDescription].forEach(input => {
        if (input) {
            input.addEventListener('input', function() {
                this.classList.remove('error');
                const errorId = this.id + '-error';
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.classList.remove('active');
                }
            });
        }
    });
    
    console.log('Partner modal initialized');
}
// main.js - ES Module for Home Page

import { saveToStorage, getFromStorage } from './storage.js';

// Mobile menu toggle functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
}

// Contact form handling with validation and local storage
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (!contactForm) return;

    // Load saved form data if exists
    const savedData = getFromStorage('contactFormDraft');
    if (savedData) {
        Object.keys(savedData).forEach(key => {
            const field = contactForm.querySelector(`[name="${key}"]`);
            if (field) {
                field.value = savedData[key];
            }
        });
    }

    // Save form data as draft on input change
    contactForm.addEventListener('input', (e) => {
        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        saveToStorage('contactFormDraft', data);
    });

    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Save submission to history
            const submissions = getFromStorage('contactSubmissions') || [];
            submissions.push({
                ...data,
                timestamp: new Date().toISOString(),
                id: Date.now()
            });
            saveToStorage('contactSubmissions', submissions);

            // Clear draft
            saveToStorage('contactFormDraft', null);

            // Show success message
            showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();

            // Log submission count
            console.log(`Total submissions: ${submissions.length}`);

        } catch (error) {
            console.error('Form submission error:', error);
            showFormMessage('There was an error submitting your form. Please try again.', 'error');
        }
    });
}

// Show form message helper
function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.className = 'form-message';
        }, 5000);
    }
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Track page visits
function trackPageVisit() {
    const visits = getFromStorage('pageVisits') || {};
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    visits[currentPage] = (visits[currentPage] || 0) + 1;
    visits.lastVisit = new Date().toISOString();
    
    saveToStorage('pageVisits', visits);
    console.log(`Page visits:`, visits);
}

// Add animation on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.about-card, .contact-form');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Home page initialized');
    
    initMobileMenu();
    initContactForm();
    initSmoothScroll();
    trackPageVisit();
    initScrollAnimations();

    // Display welcome message for returning visitors
    const visits = getFromStorage('pageVisits');
    if (visits && visits['index.html'] > 1) {
        console.log(`Welcome back! This is visit #${visits['index.html']}`);
    }
});

// Export functions for testing or external use
export {
    initMobileMenu,
    initContactForm,
    showFormMessage,
    trackPageVisit
};

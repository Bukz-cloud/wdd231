// registration.js - ES Module for Registration Page

import { saveToStorage, getFromStorage, saveFormData, getFormData, clearFormData } from './storage.js';

// Global state
let currentStep = 1;
const totalSteps = 3;

// Initialize registration form
function initRegistrationForm() {
    const form = document.getElementById('registrationForm');
    
    if (!form) return;

    // Load saved form data
    loadSavedFormData();

    // Initialize step navigation
    initStepNavigation();

    // Auto-save form data on input
    form.addEventListener('input', () => {
        saveCurrentFormData();
    });

    // Handle form submission
    form.addEventListener('submit', handleFormSubmit);
}

// Initialize step navigation
function initStepNavigation() {
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');

    // Next button functionality
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (validateCurrentStep()) {
                goToStep(currentStep + 1);
            }
        });
    });

    // Previous button functionality
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            goToStep(currentStep - 1);
        });
    });
}

// Navigate to specific step
function goToStep(stepNumber) {
    if (stepNumber < 1 || stepNumber > totalSteps) return;

    // Hide current step
    const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    if (currentStepElement) {
        currentStepElement.classList.remove('active');
    }

    // Update current step
    currentStep = stepNumber;

    // Show new step
    const newStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    if (newStepElement) {
        newStepElement.classList.add('active');
    }

    // Update progress indicator
    updateProgressIndicator();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Save progress
    saveToStorage('registrationCurrentStep', currentStep);
}

// Update progress indicator
function updateProgressIndicator() {
    const steps = document.querySelectorAll('.progress-step');
    
    steps.forEach((step, index) => {
        const stepNumber = index + 1;
        
        step.classList.remove('active', 'completed');
        
        if (stepNumber < currentStep) {
            step.classList.add('completed');
        } else if (stepNumber === currentStep) {
            step.classList.add('active');
        }
    });
}

// Validate current step
function validateCurrentStep() {
    const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    
    if (!currentStepElement) return false;

    const requiredFields = currentStepElement.querySelectorAll('[required]');
    let isValid = true;
    const invalidFields = [];

    // Use forEach array method to validate each field
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = 'var(--error)';
            invalidFields.push(field.name || field.id);
            
            // Add error message
            if (!field.nextElementSibling?.classList.contains('error-message')) {
                const errorMsg = document.createElement('span');
                errorMsg.className = 'error-message';
                errorMsg.style.cssText = 'color: var(--error); font-size: 0.875rem; display: block; margin-top: 0.25rem;';
                errorMsg.textContent = 'This field is required';
                field.parentNode.insertBefore(errorMsg, field.nextSibling);
            }
        } else {
            field.style.borderColor = '';
            
            // Remove error message if exists
            const errorMsg = field.nextElementSibling;
            if (errorMsg?.classList.contains('error-message')) {
                errorMsg.remove();
            }
        }
    });

    if (!isValid) {
        console.error('Validation failed for fields:', invalidFields);
        showMessage('Please fill in all required fields', 'error');
    }

    return isValid;
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();

    try {
        if (!validateCurrentStep()) {
            return;
        }

        const formData = new FormData(e.target);
        const data = {};
        
        // Convert FormData to object using forEach
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Add submission metadata
        const submission = {
            ...data,
            submittedAt: new Date().toISOString(),
            submissionId: `REG-${Date.now()}`
        };

        // Save submission to local storage
        const submissions = getFromStorage('registrationSubmissions') || [];
        submissions.push(submission);
        saveToStorage('registrationSubmissions', submissions);

        console.log('Registration submitted:', submission);

        // Clear form data
        clearFormData('registration');
        saveToStorage('registrationCurrentStep', null);

        // Show success modal
        showSuccessModal(submission);

    } catch (error) {
        console.error('Form submission error:', error);
        showMessage('There was an error submitting your registration. Please try again.', 'error');
    }
}

// Show success modal
function showSuccessModal(submissionData) {
    const modal = document.getElementById('successModal');
    
    if (!modal) return;

    modal.classList.add('show');

    // Add close button functionality
    const closeButton = modal.querySelector('.btn-close-modal');
    
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            modal.classList.remove('show');
            
            // Reset form
            const form = document.getElementById('registrationForm');
            if (form) {
                form.reset();
            }
            
            // Go back to step 1
            goToStep(1);
        });
    }

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeButton.click();
        }
    });

    console.log('Submission successful! ID:', submissionData.submissionId);
}

// Save current form data to local storage
function saveCurrentFormData() {
    const form = document.getElementById('registrationForm');
    
    if (!form) return;

    const formData = new FormData(form);
    const data = {};
    
    formData.forEach((value, key) => {
        data[key] = value;
    });

    saveFormData('registration', data);
}

// Load saved form data
function loadSavedFormData() {
    const savedData = getFormData('registration');
    
    if (!savedData) return;

    const form = document.getElementById('registrationForm');
    
    if (!form) return;

    // Use Object.keys array method to populate form fields
    Object.keys(savedData).forEach(key => {
        const field = form.querySelector(`[name="${key}"]`);
        
        if (field) {
            if (field.type === 'checkbox') {
                field.checked = savedData[key] === 'on';
            } else {
                field.value = savedData[key];
            }
        }
    });

    // Load saved step
    const savedStep = getFromStorage('registrationCurrentStep');
    if (savedStep) {
        goToStep(savedStep);
    }

    console.log('Loaded saved form data');
}

// Show message to user
function showMessage(message, type) {
    const messageDiv = document.getElementById('registrationMessage');
    
    if (!messageDiv) return;

    messageDiv.textContent = message;
    messageDiv.className = `form-message ${type}`;
    
    setTimeout(() => {
        messageDiv.className = 'form-message';
    }, 5000);
}

// Mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

// Calculate applicant age from date of birth
function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

// Add real-time age calculation
function initAgeCalculation() {
    const dobField = document.getElementById('dateOfBirth');
    
    if (!dobField) return;

    dobField.addEventListener('change', (e) => {
        const age = calculateAge(e.target.value);
        
        if (age < 5 || age > 12) {
            showMessage(`Age calculated: ${age} years. Please ensure the age is appropriate for elementary school (5-12 years).`, 'warning');
        } else {
            console.log(`Age calculated: ${age} years`);
        }
    });
}

// Get registration statistics using array methods
function getRegistrationStats() {
    const submissions = getFromStorage('registrationSubmissions') || [];
    
    if (submissions.length === 0) {
        console.log('No registrations yet');
        return null;
    }

    const stats = {
        totalRegistrations: submissions.length,
        byGrade: {},
        byEnrollmentType: {},
        recentRegistrations: submissions.slice(-5) // Last 5 registrations
    };

    // Use reduce to count by grade
    stats.byGrade = submissions.reduce((acc, sub) => {
        const grade = sub.gradeLevel || 'Unknown';
        acc[grade] = (acc[grade] || 0) + 1;
        return acc;
    }, {});

    // Use reduce to count by enrollment type
    stats.byEnrollmentType = submissions.reduce((acc, sub) => {
        const type = sub.enrollmentType || 'Unknown';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
    }, {});

    console.log('Registration Statistics:', stats);
    return stats;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Registration page initialized');
    
    initMobileMenu();
    initRegistrationForm();
    initAgeCalculation();
    
    // Log statistics
    getRegistrationStats();

    // Keyboard navigation for steps
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('successModal');
            if (modal?.classList.contains('show')) {
                modal.classList.remove('show');
            }
        }
    });
});

// Export functions
export {
    initRegistrationForm,
    goToStep,
    validateCurrentStep,
    getRegistrationStats,
    calculateAge
};

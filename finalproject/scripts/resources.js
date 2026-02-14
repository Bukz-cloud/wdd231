// resources.js - ES Module for Resources Page

import { saveToStorage, getFromStorage } from './storage.js';

// Global state
let allResources = [];
let currentFilter = 'all';

// Fetch resources data using Fetch API with error handling
async function fetchResources() {
    try {
        // Show loading state
        showLoading(true);

        const response = await fetch('../data/resources.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        allResources = data.resources;
        
        // Save to local storage for offline access
        saveToStorage('resourcesData', data.resources);
        saveToStorage('resourcesLastFetch', new Date().toISOString());
        
        console.log(`Successfully fetched ${allResources.length} resources`);
        
        // Display resources
        displayResources(allResources);
        
    } catch (error) {
        console.error('Error fetching resources:', error);
        
        // Try to load from local storage as fallback
        const cachedResources = getFromStorage('resourcesData');
        
        if (cachedResources) {
            console.log('Loading resources from cache');
            allResources = cachedResources;
            displayResources(allResources);
            showMessage('Displaying cached data. Check your internet connection.', 'warning');
        } else {
            showMessage('Failed to load resources. Please try again later.', 'error');
        }
    } finally {
        showLoading(false);
    }
}

// Display resources dynamically using template literals and array methods
function displayResources(resources) {
    const grid = document.getElementById('resourcesGrid');
    
    if (!grid) return;

    // Use filter array method to filter by category
    const filteredResources = currentFilter === 'all' 
        ? resources 
        : resources.filter(resource => resource.category === currentFilter);

    // Use map array method to generate HTML for each resource
    const resourceCards = filteredResources.map(resource => {
        return createResourceCard(resource);
    }).join('');

    // Update DOM with generated content
    grid.innerHTML = resourceCards;

    // Attach event listeners to cards
    attachCardEventListeners();

    console.log(`Displayed ${filteredResources.length} resources`);
}

// Create resource card HTML using template literals
function createResourceCard(resource) {
    return `
        <div class="resource-card" data-id="${resource.id}" data-category="${resource.category}">
            <div class="resource-image" style="background: ${resource.imageColor}">
                <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #000; font-size: 4rem; opacity: 1;">
                    ${getCategoryIcon(resource.category)}
                </div>
            </div>
            <div class="resource-content">
                <span class="resource-category">${formatCategory(resource.category)}</span>
                <h3>${resource.name}</h3>
                <p>${resource.description}</p>
                <div class="resource-info">
                    <span>📍 Capacity: ${resource.capacity}</span>
                    <span>✅ ${resource.availability}</span>
                </div>
            </div>
        </div>
    `;
}

// Get icon for category
function getCategoryIcon(category) {
    const icons = {
        classroom: '📚',
        technology: '💻',
        facility: '🏫',
        outdoor: '🌳'
    };
    return icons[category] || '📌';
}

// Format category name
function formatCategory(category) {
    return category.charAt(0).toUpperCase() + category.slice(1);
}

// Attach event listeners to resource cards
function attachCardEventListeners() {
    const cards = document.querySelectorAll('.resource-card');
    
    // Use forEach array method to attach listeners
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const resourceId = parseInt(card.dataset.id);
            openResourceModal(resourceId);
        });
    });
}

// Modal functionality - open modal with resource details
function openResourceModal(resourceId) {
    // Use find array method to get specific resource
    const resource = allResources.find(r => r.id === resourceId);
    
    if (!resource) {
        console.error('Resource not found');
        return;
    }

    const modal = document.getElementById('resourceModal');
    const modalBody = document.getElementById('modalBody');

    if (!modal || !modalBody) return;

    // Generate modal content using template literals
    modalBody.innerHTML = `
        <h2>${resource.name}</h2>
        <span class="resource-category">${formatCategory(resource.category)}</span>
        
        <div style="margin: 1.5rem 0;">
            <div style="background: ${resource.imageColor}; height: 150px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 5rem; opacity: 0.7;">
                ${getCategoryIcon(resource.category)}
            </div>
        </div>

        <p style="font-size: 1.1rem; line-height: 1.8; margin: 1rem 0;">
            ${resource.description}
        </p>

        <div class="modal-info-grid">
            <div class="modal-info-item">
                <strong>Capacity</strong>
                <span>${resource.capacity} students</span>
            </div>
            <div class="modal-info-item">
                <strong>Availability</strong>
                <span>${resource.availability}</span>
            </div>
            <div class="modal-info-item">
                <strong>Category</strong>
                <span>${formatCategory(resource.category)}</span>
            </div>
            <div class="modal-info-item">
                <strong>Resource ID</strong>
                <span>#${resource.id}</span>
            </div>
        </div>

        <div style="margin-top: 1.5rem; padding: 1rem; background: var(--bg-light); border-radius: 8px;">
            <strong style="display: block; margin-bottom: 0.5rem; color: var(--primary-color);">Features:</strong>
            <p>${resource.features}</p>
        </div>
    `;

    // Show modal
    modal.classList.add('show');

    // Track resource views
    trackResourceView(resourceId);
}

// Close modal functionality
function closeResourceModal() {
    const modal = document.getElementById('resourceModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Track resource views in local storage
function trackResourceView(resourceId) {
    const views = getFromStorage('resourceViews') || {};
    views[resourceId] = (views[resourceId] || 0) + 1;
    views.lastViewed = new Date().toISOString();
    
    saveToStorage('resourceViews', views);
    console.log(`Resource #${resourceId} views:`, views[resourceId]);
}

// Filter functionality
function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get category and update filter
            currentFilter = button.dataset.category;
            
            // Display filtered resources
            displayResources(allResources);
            
            // Save filter preference
            saveToStorage('selectedFilter', currentFilter);
        });
    });

    // Load saved filter preference
    const savedFilter = getFromStorage('selectedFilter');
    if (savedFilter) {
        currentFilter = savedFilter;
        const savedButton = document.querySelector(`[data-category="${savedFilter}"]`);
        if (savedButton) {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            savedButton.classList.add('active');
        }
    }
}

// Show/hide loading state
function showLoading(show) {
    const grid = document.getElementById('resourcesGrid');
    if (grid) {
        grid.innerHTML = show 
            ? '<div class="loading">Loading resources...</div>' 
            : '';
    }
}

// Show message to user
function showMessage(message, type) {
    const grid = document.getElementById('resourcesGrid');
    if (grid) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 5px;
            text-align: center;
            background-color: ${type === 'error' ? '#fee2e2' : '#fef3c7'};
            color: ${type === 'error' ? '#991b1b' : '#92400e'};
        `;
        grid.insertAdjacentElement('beforebegin', messageDiv);
        
        setTimeout(() => messageDiv.remove(), 5000);
    }
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

// Get resource statistics using reduce array method
function getResourceStats() {
    const stats = allResources.reduce((acc, resource) => {
        // Count by category
        acc.byCategory[resource.category] = (acc.byCategory[resource.category] || 0) + 1;
        
        // Sum total capacity
        acc.totalCapacity += resource.capacity;
        
        // Count available resources
        if (resource.availability === 'Available') {
            acc.availableCount += 1;
        }
        
        return acc;
    }, {
        byCategory: {},
        totalCapacity: 0,
        availableCount: 0
    });

    console.log('Resource Statistics:', stats);
    return stats;
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Resources page initialized');
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize filter buttons
    initFilterButtons();
    
    // Fetch and display resources
    await fetchResources();
    
    // Get and log statistics
    const stats = getResourceStats();
    console.log(`Total resources: ${allResources.length}`);
    console.log(`Available resources: ${stats.availableCount}`);
    console.log(`Total capacity: ${stats.totalCapacity} students`);
    
    // Modal close functionality
    const closeBtn = document.querySelector('.close-modal');
    const modal = document.getElementById('resourceModal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeResourceModal);
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeResourceModal();
            }
        });
    }

    // Keyboard accessibility for modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeResourceModal();
        }
    });
});

// Export functions
export {
    fetchResources,
    displayResources,
    openResourceModal,
    closeResourceModal,
    getResourceStats
};

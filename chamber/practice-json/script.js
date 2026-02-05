// script.js - Dynamically build attraction cards
import { attractions } from '../data/attractions.mjs';

/**
 * Creates a single attraction card with semantic HTML
 * @param {Object} attraction - Attraction data object
 * @returns {HTMLElement} - Complete card element
 */
function createAttractionCard(attraction) {
    // Create main card container
    const card = document.createElement('article');
    card.className = 'attraction-card';
    card.setAttribute('data-attraction-id', attraction.id);

    // Create card header with h2 title
    const title = document.createElement('h2');
    title.className = 'card-title';
    title.textContent = attraction.name;

    // Create figure element for image
    const figure = document.createElement('figure');
    figure.className = 'card-figure';
    
    const img = document.createElement('img');
    img.src = attraction.image;
    img.alt = attraction.alt;
    img.width = 300;
    img.height = 200;
    img.loading = 'lazy'; // Performance optimization
    
    figure.appendChild(img);

    // Create address element
    const address = document.createElement('address');
    address.className = 'card-address';
    address.textContent = attraction.address;

    // Create description paragraph
    const description = document.createElement('p');
    description.className = 'card-description';
    description.textContent = attraction.description;

    // Create "Learn More" button
    const button = document.createElement('button');
    button.className = 'card-button';
    button.textContent = 'Learn More';
    button.setAttribute('aria-label', `Learn more about ${attraction.name}`);
    
    // Add click event listener
    button.addEventListener('click', () => {
        handleLearnMore(attraction);
    });

    // Assemble the card in proper order
    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(description);
    card.appendChild(button);

    return card;
}

/**
 * Handles the "Learn More" button click
 * @param {Object} attraction - Attraction data
 */
function handleLearnMore(attraction) {
    // You can customize this behavior
    alert(`You want to learn more about ${attraction.name}!\n\nIn a real application, this would navigate to a detail page or open a modal with more information.`);
    console.log('Attraction details:', attraction);
}

/**
 * Renders all attraction cards to the grid
 */
function renderAttractions() {
    const grid = document.getElementById('attractions-grid');
    
    if (!grid) {
        console.error('Grid container not found!');
        return;
    }

    // Clear any existing content
    grid.innerHTML = '';

    // Create and append each card
    attractions.forEach(attraction => {
        const card = createAttractionCard(attraction);
        grid.appendChild(card);
    });

    console.log(`Successfully rendered ${attractions.length} attraction cards`);
}

/**
 * Initialize the application when DOM is ready
 */
function init() {
    console.log('Initializing attractions grid...');
    renderAttractions();
}

// Run initialization when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

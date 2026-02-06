
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');

    hamburger.addEventListener('click', function() {
        nav.classList.toggle('active');
    })

    document.addEventListener('click', function(event) {
        if(!nav.contains(event.target) && !hamburger.contains(event.target)) {
            nav.classList.remove('active');
        }
    });
});

document.getElementById('lastModified').textContent = 'Last Modification: ' + document.lastModified;

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
    title.textContent = attraction.title;

    // Create figure element for image
    const figure = document.createElement('figure');
    figure.className = 'card-figure';
    
    const img = document.createElement('img');
    img.src = attraction.image;
    img.alt = attraction.alt;
    img.width = 300;
    img.height = 200;
    img.loading = 'lazy'; // Performance optimization
    img.decoding = 'async'; //Decode images asynchronously

    // Add fetchpriority for first few images
    if (attraction.id <= 2) {
        img.fetchpriority = 'high';
    }
    
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
    button.setAttribute('aria-label', `Learn more about ${attraction.title}`);
    
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
    if (attraction.url) {
        window.open(attraction.url, '_blank');  // Opens in new tab
    } else {
        alert(`No website available for ${attraction.title}`);
    }
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

    // Hide loading skeleton
    const skeleton = grid.querySelector('.loading-skeleton');
    if (skeleton) {
        skeleton.classList.add('hidden');
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

//Lazy load images that are not in viewport
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px'
    });

    //Observe all images
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
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

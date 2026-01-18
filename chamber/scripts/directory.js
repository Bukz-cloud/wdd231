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
    })
})

// Async function to fetch member data
async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        
        if (!response.ok) {
            throw new Error('Failed to fetch members');
        }
        
        const members = await response.json();
        return members;
    } catch (error) {
        console.error('Error loading members:', error);
        return [];
    }
}

// Function to display members in grid view
function displayGridView(members) {
    const container = document.getElementById('membersContainer');
    container.innerHTML = '';
    
    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'member-card';
        memberCard.innerHTML = `
            <div class="member-card-header">
                <h3>${member.name}</h3>
                <p class="tagline">${member.industry || 'Business Tag Line'}</p>
            </div>
            <div class="member-card-body">
                <img src="${member.image}" 
                     alt="${member.name}" 
                     onerror="this.src='https://via.placeholder.com/100x100?text=Logo'">
                <div class="member-card-info">
                    <p><strong>EMAIL:</strong> ${member.email || 'info@business.com'}</p>
                    <p><strong>PHONE:</strong> ${member.phone}</p>
                    <p><strong>URL:</strong> <a href="${member.website}" target="_blank">${member.website.replace('https://', '').replace('http://', '')}</a></p>
                </div>
            </div>
        `;
        container.appendChild(memberCard);
    });
}

// Function to display members in list view
function displayListView(members) {
    const container = document.getElementById('membersContainer');
    container.innerHTML = '';
    
    members.forEach(member => {
        const memberRow = document.createElement('div');
        memberRow.className = 'member-row';
        memberRow.innerHTML = `
            <div class="member-info">
                <h3>${member.name}</h3>
                <p>${member.membershipLevel} Member</p>
            </div>
            <div class="member-contact">
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Website</a>
            </div>
        `;
        container.appendChild(memberRow);
    });
}

// Initialize the page
async function init() {
    const members = await fetchMembers();
    
    // Display initial grid view
    displayGridView(members);
    
    // Set up view toggle buttons
    const gridViewBtn = document.getElementById('gridViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
    const container = document.getElementById('membersContainer');
    
    gridViewBtn.addEventListener('click', () => {
        container.className = 'grid-view';
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        displayGridView(members);
    });
    
    listViewBtn.addEventListener('click', () => {
        container.className = 'list-view';
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        displayListView(members);
    });
}

// Run when page loads
init();

document.getElementById('lastModified').textContent = 'Last Modification: ' + document.lastModified;
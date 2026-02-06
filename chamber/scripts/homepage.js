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

// random-members.js - Displays 3 random members from members.json

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
                <span class="membership-badge ${member.membershipLevel.toLowerCase()}">${member.membershipLevel} Member</span>
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


// Function to get random members from array
function getRandomMembers(membersArray, count) {
    // Create a copy of the array to avoid modifying original
    const shuffled = [...membersArray];
    
    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Return only the requested count
    return shuffled.slice(0, count);
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

// Initialize the page with 3 random members
async function init() {
    // Fetch all members
    const allMembers = await fetchMembers();
    
    // Get 3 random members
    const randomMembers = getRandomMembers(allMembers, 3);
    
    // Display initial grid view
    displayGridView(randomMembers);
    
    // Set up view toggle buttons
    const gridViewBtn = document.getElementById('gridViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
    const container = document.getElementById('membersContainer');
    
    gridViewBtn.addEventListener('click', () => {
        container.className = 'grid-view';
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        displayGridView(randomMembers);
    });
    
    listViewBtn.addEventListener('click', () => {
        container.className = 'list-view';
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        displayListView(randomMembers);
    });
}

// Run when page loads
init();

const currentTemp = document.querySelector("#current-temp");
const icon = document.querySelector("#weather-icon");
const caption = document.querySelector("figcaption");
const day1 = document.querySelector("#day1");
const day2 = document.querySelector("#day2");
const day3 = document.querySelector("#day3");

const url = "https://api.openweathermap.org/data/2.5/weather?lat=-26.71&lon=27.09&appid=c630c13fdbbeeb8499d1f70ff36ffc28&units=metric"
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=-26.71&lon=27.09&appid=c630c13fdbbeeb8499d1f70ff36ffc28&units=metric"

async function apiFetch(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }    
}

apiFetch(url);


async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        }
    } catch (error) { 
        console.log(error);
    }    
}

fetchForecast();

function displayResults(data) {
  currentTemp.innerHTML = `${data.main.temp}&deg;C`;
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  let desc = data.weather[0].description;
  icon.setAttribute('src', iconsrc);
  icon.setAttribute('alt', desc);
  caption.textContent = desc;
}

function displayForecast(data) {
    day1.textContent = `${data.list[8].main.temp} °C`;
    day2.textContent = `${data.list[16].main.temp} °C`;
    day3.textContent = `${data.list[24].main.temp} °C`;
}

document.getElementById('lastModified').textContent = 'Last Modification: ' + document.lastModified;

const cards = [
    {
        title: "Gold Membership",
        summary: "Premium business support and full access to exclusive chamber benefits",
        details: "Gold members receive priority visibility in all chamber communications, featured placement on the website and in member directories, and free attendance to all chamber events (including workshops, mixers, and the annual gala). This level also includes strategic business support, such as networking matchmaking, annual business consultation, and invitations to exclusive leadership roundtables. Gold membership is perfect for organizations seeking maximum community engagement and recognition.",
        level: "gold"
    },
    {
        title: "SIlver Membership",
        summary: "Enhanced access to chamber events and promotional opportunities.",
        details: "Silver members enjoy complimentary access to select chamber networking events and discounted rates for premium events and programs. They receive promotion on social media, their logo on the chamber’s member page, and opportunities to participate in committee projects. Silver membership offers a balanced mix of visibility and value — ideal for growing businesses that want strong community involvement without full premium sponsorship.",
        level: "silver"
    },
    {
        title: "Bronze Membership",
        summary: "Essential benefits to connect with the local business community.",
        details: "Bronze members gain access to the core benefits of chamber membership, including invitation to community networking events, inclusion in the online member directory, and access to select business resources and newsletters. This entry-level membership is designed for small businesses and startups looking to build connections, stay informed, and begin engaging with local partners and customers.",
        level: "bronze"
    },
    {
        title: "NP Membership",
        summary: "NP membership is for non profit organizations and there is no fee (np)",
        details: "NP members receive basic chamber benefits, including access to networking events, regular newsletters, and updates on local business opportunities, advocacy efforts, and training programs. Members are listed in the chamber’s online directory and may attend events at member-only or discounted rates. This membership level is ideal for individuals, startups, and small organizations seeking to stay informed, build relationships, and gradually engage with the local business ecosystem.",
        level: "non-profit"
    }
];

const memberLevel = document.querySelector("#member-level");

const modal = document.querySelector("#modal");
const modalTitle = document.querySelector("#modalTitle");
const modalText = document.querySelector("#modalText");
const closeModal = document.querySelector("#closeModal");


cards.forEach((card) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", card.level);

    const h3 = document.createElement("h3");
    h3.textContent = card.title;

    const p = document.createElement("p");
    p.textContent = card.summary;

    const btnCard = document.createElement("button");
    btnCard.textContent = "More Info";

    btnCard.addEventListener("click", () => {
        modalTitle.textContent = card.title;
        modalText.textContent = card.details;
        modal.showModal();
    });

    cardDiv.append(h3, p, btnCard);
    memberLevel.appendChild(cardDiv);
});

closeModal.addEventListener("click", () => {
    modal.close();
});



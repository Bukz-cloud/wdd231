// ===========================================================
// DISPLAY COURSES FUNCTION
// This function displays courses on the page based on the selected filter
// ===========================================================
function displayCourses(filter = 'all') {
    // Get the container where course cards will be displayed
    const courseList = document.querySelector('.course-list');
    
    // Clear any existing course cards before displaying new ones
    courseList.innerHTML = '';

    // Start with all courses in the array
    let filteredCourses = courses;
    
    // If a specific filter is selected (not 'all'), filter the courses array
    if (filter !== 'all') {
        // Keep only courses that match the selected subject (CSE or WDD)
        filteredCourses = courses.filter(course => course.subject === filter);
    }

    // Loop through each course in the filtered list
    filteredCourses.forEach(course => {
        // Create a new div element for each course card
        const courseCard = document.createElement('div');
        
        // Add CSS classes: 'course-card' for all, plus 'completed' if the course is completed
        courseCard.className = `course-card ${course.completed ? 'completed' : ''}`;
        
        // Set the text content to show the course subject and number (e.g., "CSE 110")
        courseCard.textContent = `${course.subject} ${course.number}`;
        
        // Add a click event listener to each course card
        // When clicked, it will open the dialog with course details
        courseCard.addEventListener('click', () => {
            displayCourseDetails(course); // Call function and pass the current course object
        });
        
        // Add the completed course card to the course list container
        courseList.appendChild(courseCard);
    });

    // Calculate the total credits for all displayed courses
    // reduce() adds up all the credits from the filtered courses
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    
    // Update the text on the page to show the total credits
    document.getElementById('creditsTotal').textContent = `Total credits for displayed courses: ${totalCredits}`;
}


// ===========================================================
// DIALOG SETUP
// Get a reference to the dialog element in the HTML
// ===========================================================
const courseDetails = document.querySelector('#course-details');


// ===========================================================
// DISPLAY COURSE DETAILS FUNCTION
// This function populates and displays the modal dialog with course information
// ===========================================================
function displayCourseDetails(course) {
    // Clear any previous content from the dialog
    courseDetails.innerHTML = '';
    
    // Build the HTML content for the dialog using template literals
    // This includes all the course information formatted nicely
    courseDetails.innerHTML = `
        <button id="closeModal">❌</button>
        <h2>${course.subject} ${course.number}</h2>
        <h3>${course.title}</h3>
        <p><strong>Credits</strong>: ${course.credits}</p>
        <p><strong>Certificate</strong>: ${course.certificate}</p>
        <p>${course.description}</p>
        <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
    `;
    
    // Show the dialog as a modal (blocks interaction with rest of page)
    courseDetails.showModal();
    
    // Get the close button that was just added to the dialog
    const closeModal = document.querySelector('#closeModal');
    
    // Add a click event listener to the close button
    closeModal.addEventListener("click", () => {
        // When clicked, close the dialog
        courseDetails.close();
    });

    // OPTIONAL FEATURE: Close dialog when clicking outside of it (on the backdrop)
    courseDetails.addEventListener('click', (e) => {
        // Get the position and size of the dialog element
        const dialogDimensions = courseDetails.getBoundingClientRect();
        
        // Check if the click was outside the dialog boundaries
        if (
            e.clientX < dialogDimensions.left ||   // Click is to the left of dialog
            e.clientX > dialogDimensions.right ||  // Click is to the right of dialog
            e.clientY < dialogDimensions.top ||    // Click is above the dialog
            e.clientY > dialogDimensions.bottom    // Click is below the dialog
        ) {
            // If click was outside, close the dialog
            courseDetails.close();
        }
    });
}


// ===========================================================
// FILTER BUTTON FUNCTIONALITY
// Setup event listeners for the filter buttons (All, CSE, WDD)
// ===========================================================

// Get all filter buttons from the page
const filterButtons = document.querySelectorAll('.filter-btn');

// Loop through each filter button
filterButtons.forEach(button => {
    // Add a click event listener to each button
    button.addEventListener('click', function() {
        // Remove the 'active' class from all buttons first
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add the 'active' class to the button that was just clicked
        this.classList.add('active');
        
        // Get the filter value from the button's data-filter attribute
        const filter = this.dataset.filter;
        
        // Call displayCourses with the selected filter ('all', 'CSE', or 'WDD')
        displayCourses(filter);
    });
});


// ===========================================================
// INITIAL PAGE LOAD
// Display all courses when the page first loads
// ===========================================================
displayCourses('all');

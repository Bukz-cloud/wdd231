// Hamburger menu functionality
        document.addEventListener('DOMContentLoaded', function() {
            const hamburger = document.querySelector('.hamburger');
            const nav = document.querySelector('nav');
            
            hamburger.addEventListener('click', function() {
                nav.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!nav.contains(event.target) && !hamburger.contains(event.target)) {
                    nav.classList.remove('active');
                }
            });

            // Copyright year
            document.getElementById('currentYear').textContent = new Date().getFullYear();

            // Last modified date
            document.getElementById('lastModified').textContent = 'Last Modification: ' + document.lastModified;

            // Course data
            const courses = [
                {
                    subject: 'CSE',
                    number: 110,
                    title: 'Introduction to Programming',
                    credits: 2,
                    certificate: 'Web and Computer Programming',
                    description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
                    technology: ['Python'],
                    completed: true
                },
                {
                    subject: 'WDD',
                    number: 130,
                    title: 'Web Fundamentals',
                    credits: 2,
                    certificate: 'Web and Computer Programming',
                    description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
                    technology: ['HTML', 'CSS'],
                    completed: true
                },
                {
                    subject: 'CSE',
                    number: 111,
                    title: 'Programming with Functions',
                    credits: 2,
                    certificate: 'Web and Computer Programming',
                    description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
                    technology: ['Python'],
                    completed: true
                },

                {
                    subject: 'CSE',
                    number: 210,
                    title: 'Programming with Classes',
                    credits: 2,
                    certificate: 'Web and Computer Programming',
                    description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
                    technology: ['C#'],
                    completed: true
                },
                {
                    subject: 'WDD',
                    number: 131,
                    title: 'Dynamic Web Fundamentals',
                    credits: 2,
                    certificate: 'Web and Computer Programming',
                    description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
                    technology: ['HTML', 'CSS', 'JavaScript'],
                    completed: true
                },
                {
                    subject: 'WDD',
                    number: 231,
                    title: 'Frontend Web Development I',
                    credits: 2,
                    certificate: 'Web and Computer Programming',
                    description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
                    technology: ['HTML', 'CSS', 'JavaScript'],
                    completed: false
                }
            ];

            // Display courses
            function displayCourses(filter = 'all') {
                const courseList = document.querySelector('.course-list');
                courseList.innerHTML = '';

                let filteredCourses = courses;
                if (filter !== 'all') {
                    filteredCourses = courses.filter(course => course.subject === filter);
                }

                filteredCourses.forEach(course => {
                    const courseCard = document.createElement('div');
                    courseCard.className = `course-card ${course.completed ? 'completed' : ''}`;
                    courseCard.textContent = `${course.subject} ${course.number}`;

                    courseCard.addEventListener('click', () => {
                        displayCourseDetails(course);
                    });
                    courseList.appendChild(courseCard);
                });

                // Calculate and display total credits
                const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
                document.getElementById('creditsTotal').textContent = `Total credits for displayed courses: ${totalCredits}`;
            }

            const courseDetails = document.querySelector('#course-details');

// Function to display course details in modal
function displayCourseDetails(course) {
    courseDetails.innerHTML = '';
    courseDetails.innerHTML = `
        <button id="closeModal">❌</button>
        <h2>${course.subject} ${course.number}</h2>
        <h3>${course.title}</h3>
        <p><strong>Credits</strong>: ${course.credits}</p>
        <p><strong>Certificate</strong>: ${course.certificate}</p>
        <p>${course.description}</p>
        <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
    `;
    
    courseDetails.showModal();
    
    // Get close button and add event listener
    const closeModal = document.querySelector('#closeModal');
    closeModal.addEventListener("click", () => {
        courseDetails.close();
    });

    // Optional: Close when clicking outside the dialog (on backdrop)
    courseDetails.addEventListener('click', (e) => {
        const dialogDimensions = courseDetails.getBoundingClientRect();
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            courseDetails.close();
        }
    });
}


// Filter button functionality
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.dataset.filter;
        displayCourses(filter);
    });
});

// Initial display
displayCourses('all');
});


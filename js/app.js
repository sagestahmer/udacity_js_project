/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

// define variable for navbar location
const navbar = document.getElementById('navbar__list');
// define variable for header location
const myHeader = document.getElementsByClassName('page__header')[0];

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// count the number of elements of a certain type in the document
const countElement = (elementType) => {
    let x = document.getElementsByTagName(elementType).length;
    return x;
}

// find greatest value in a list and return what place in the array it was
const findGreatest = (values) => {
    let greatestValue = 0;
    let greatestPosition = 0;

    for (i = 0; i < values.length; i++) {
        if (values[i] > greatestValue) {
            greatestPosition = i;
        }
    }

    return greatestPosition;
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const numberOfSections = countElement('section');
for (let i = 0; i < numberOfSections; i++) {
    // define variable for current section and get required information
    let currentSection = document.getElementsByTagName('section')[i]
    let sectionTitle = currentSection.getElementsByTagName('h2')[0].innerHTML;
    let sectionId = currentSection.id;

    // create anchor element
    let myAnchor = document.createElement('a');
    myAnchor.href = '#' + sectionId;

    // create li element and nest to anchor
    let myList = document.createElement('li');
    myList.innerHTML = sectionTitle;
    myList.classList.add('.navbar__menu');
    myAnchor.append(myList);
    
    // append anchor element to navbar
    navbar.append(myAnchor)
};



/**
 * End Main Functions
 * Begin Events
 * 
*/

// Select active section based on location within viewport
addEventListener('scroll', () => {
    // loop through each section and pull out top
    let sectionTops = [];
    
    for (let x = 0; x < numberOfSections; x++) {
        let currentSection = document.getElementsByTagName('section')[x]
        let currentPositionValue = currentSection.getBoundingClientRect();
        let currentTop = currentPositionValue.top;
        sectionTops.push(currentTop);
    }
    
    // loop through each section top value and if it is between 10 and 100, assign it to active and remove the active class from any other section that has a class assigned
    for (let y = 0; y < sectionTops.length; y++) {
        if (sectionTops[y] > 0 && sectionTops[y] < 200) {
        
            for (let n = 0; n < numberOfSections; n++) {
                // Remove active-section class from previous section
                if (n !== y && document.getElementsByTagName('section')[n] !== null) {
                    document.getElementsByTagName('section')[n].classList.remove('active-section');
                }
                // Remove active-header class from previous section
                if (n !== y && document.getElementsByTagName('a')[n] !== null) {
                    document.getElementsByTagName('a')[n].classList.remove('active-header');
                }
            }
            // add active flag to new active section
            document.getElementsByTagName('section')[y].classList.add('active-section');
            // add active flag to new active header
            document.getElementsByTagName('a')[y].classList.add('active-header');
        }
    }
    
});

// Scroll to section on link click

// define variable for all anchor elements
const navAnchors = document.querySelectorAll('a');
const numberOfAnchors = countElement('a');

index = 0;
// add click event listener to all anchors
navAnchors.forEach(function(a, index) {

    a.addEventListener('click', function(event) {
        event.preventDefault();
        
        // scroll to selected element
        let targetSection = document.getElementsByTagName('section')[index]
        targetSection.scrollIntoView({behavior: "smooth"});
    })

});

// hide header is user stops scrolling
let timer = null;
window.addEventListener('scroll', function() {
    if(timer !== null) {
        clearTimeout(timer);        
    }
    timer = setTimeout(function() {
        // do something
        myHeader.style.display = "none";
    }, 3000);
});

// resurface header when user starts scrolling
window.addEventListener('scroll', function() {
    myHeader.style.display = "flex";
});




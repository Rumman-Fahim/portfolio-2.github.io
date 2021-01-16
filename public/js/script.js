

let home = document.getElementById( "home" );
window.addEventListener( "resize", setSectionHomeHeight );
window.addEventListener( "load", setSectionHomeHeight );
function setSectionHomeHeight () {
    home.style.height = window.innerHeight + "px";
}

let sections = document.getElementsByClassName( "section" );
let pauseThisFunc = false;
$( 'body' ).scrollspy( { target: ".nav-bar" } ); // Add scrollspy to <body>
// Add smooth scrolling on all links inside the navbar
$( "#navbar a" ).on( 'click', function ( event ) {
    if ( this.hash !== "" ) {
        event.preventDefault(); // Prevent default anchor click behavior
        var hash = this.hash;   // Store hash
        pauseThisFunc = true;   // pause OnScroll handler function of navbar and section
        $( 'html, body' ).animate( {  // Using jQuery's animate() method to add smooth page scroll. The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            scrollTop: $( hash ).offset().top
        }, 800, function () {
            window.location.hash = hash; // Add hash (#) to URL when done scrolling (default click behavior)
            setActiveLink( event );  // set active link with respect to content
            pauseThisFunc = false; // reactivate OnScroll handler function
        } );
    }
} );
window.addEventListener( "scroll", () => {
    for ( var i = 0; i < sections.length; i++ ) {
        if ( isInViewport( sections[ i ] ) && !pauseThisFunc ) {
            currentActiveLink = navbarLinks[ i ];
            makeLinkActive();
        }
    }
    // console.log( sections[ 2 ].getBoundingClientRect().bottom );
} );
function isInViewport ( el ) {
    const rect = el.getBoundingClientRect();
    if ( rect.top <= 100 ) {
        return true;
    } else if ( rect.bottom == window.innerHeight ) {
        return true;
    }
}








const carouselBtnPrev = document.querySelector( '.prev.arrow-btn' );
const carouseBtnNext = document.querySelector( '.next.arrow-btn' );
const track = document.querySelector( '.content-container' );
let carouselContent = document.getElementsByClassName( 'content-box' );
let carouselContentWidth = carouselContent[ 0 ].offsetWidth;
let carouselContainerWidth = document.querySelector( '.custom-carousel' ).offsetWidth;
let currentSlideNum = 1;

setCarouselContentWidth();
carouselBtnPrevHandler();

window.addEventListener( 'resize', () => {
    carouselContainerWidth = document.querySelector( '.custom-carousel' ).offsetWidth;
    carouselContentWidth = carouselContent[ 0 ].offsetWidth;
    setCarouselContentWidth();
} );

carouseBtnNext.addEventListener( 'click', carouseBtnNextHandler );
function carouseBtnNextHandler () {
    carouselBtnPrev.classList.remove( 'disable' );
    carouselBtnPrev.disabled = false;
    currentSlideNum++;
    track.style.transform = `translateX(-${ currentSlideNum * ( carouselContentWidth + calculateContentMargin() ) }px)`;
    if ( track.offsetWidth - ( currentSlideNum * ( carouselContentWidth + calculateContentMargin() ) )
        <
        ( carouselContainerWidth + carouselContentWidth ) ) {
        carouseBtnNext.classList.add( 'disable' );
        carouseBtnNext.disabled = true;
    }
}
carouselBtnPrev.addEventListener( 'click', carouselBtnPrevHandler );
function carouselBtnPrevHandler () {
    carouseBtnNext.classList.remove( 'disable' );
    carouseBtnNext.disabled = false;
    currentSlideNum--;
    if ( currentSlideNum <= 0 ) {
        carouselBtnPrev.classList.add( 'disable' );
        carouselBtnPrev.disabled = true;
    }
    track.style.transform = `translateX(-${ currentSlideNum * ( carouselContentWidth + calculateContentMargin() ) }px)`;
}

function setCarouselContentWidth () {
    let margin = calculateContentMargin() / 2;
    for ( var i = 0; i < carouselContent.length; i++ ) {
        carouselContent[ i ].style.marginRight = margin + "px";
        carouselContent[ i ].style.marginLeft = margin + "px";
    }
}

function calculateContentMargin () {
    let numberOfCardsPerSlide = Math.floor( carouselContainerWidth / carouselContentWidth );
    let spaceOccupiedBycarouselContentPerSlide = numberOfCardsPerSlide * carouselContentWidth;
    let spaceLeft = carouselContainerWidth - spaceOccupiedBycarouselContentPerSlide;
    let divideLeftoverSpaceBtwAllBoxes = spaceLeft / numberOfCardsPerSlide;

    if ( divideLeftoverSpaceBtwAllBoxes < 10 ) {
        numberOfCardsPerSlide = numberOfCardsPerSlide - 1;
        spaceOccupiedBycarouselContentPerSlide = numberOfCardsPerSlide * carouselContentWidth;
        spaceLeft = carouselContainerWidth - spaceOccupiedBycarouselContentPerSlide;
        divideLeftoverSpaceBtwAllBoxes = spaceLeft / numberOfCardsPerSlide;
    }
    return divideLeftoverSpaceBtwAllBoxes;
}










let navToggleBtn = document.getElementById( "nav-toggle-btn" );
let navbar = document.getElementById( "navbar" );
let navbarSlider = document.getElementById( "navbar-slider" );
let navbarLinks = document.querySelectorAll( ".custome-nav .nav-bar > .links" );
let navbarCollapsePoint = 800;
let currentActiveLink = navbarLinks[ 0 ];

// By Default 
resetNavbarCollapse();
makeLinkActive();

// Handling Navbar Collapse
window.addEventListener( 'resize', resetNavbarCollapse );
function resetNavbarCollapse () {
    if ( window.innerWidth <= navbarCollapsePoint ) {
        navbar.style.maxHeight = 0 + "em";
        navToggleBtn.classList.remove( "cross" );
        document.getElementById( "nav" ).classList.remove( "whenNavbarExpands" );
    } else {
        navbar.style.maxHeight = "fit-content";
    }
}


// Toggle navbar collapse
navToggleBtn.addEventListener( "click", toggleNavbar );
function toggleNavbar () {
    if ( navbar.style.maxHeight == 0 + "em" ) {
        navbar.style.maxHeight = 30 + "em";
        navToggleBtn.classList.add( "cross" );
        document.getElementById( "nav" ).classList.add( "whenNavbarExpands" );
    } else {
        navbar.style.maxHeight = 0 + "em";
        navToggleBtn.classList.remove( "cross" );
        document.getElementById( "nav" ).classList.remove( "whenNavbarExpands" );
    }
}


// Handling Slider 
for ( var i = 0; i < navbarLinks.length; i++ ) {
    navbarLinks[ i ].addEventListener( "click", setActiveLink );
}
function setActiveLink ( event ) {
    currentActiveLink = event.currentTarget;
    makeLinkActive();
}
function makeLinkActive () {
    for ( var i = 0; i < navbarLinks.length; i++ ) {
        navbarLinks[ i ].style.fontWeight = 400;
    }
    currentActiveLink.style.fontWeight = 600;
    moveSliderToActiveLink();
}
window.addEventListener( 'resize', moveSliderToActiveLink );
function moveSliderToActiveLink () {
    if ( window.innerWidth <= navbarCollapsePoint ) {
        navbarSlider.style.width = "25px";
        navbarSlider.style.left = "0px";
        navbarSlider.style.top = currentActiveLink.offsetTop + currentActiveLink.offsetHeight + "px";
    } else {
        navbarSlider.style.width = currentActiveLink.offsetWidth + "px";
        navbarSlider.style.left = currentActiveLink.offsetLeft + "px";
        navbarSlider.style.top = "100%";
    }
}


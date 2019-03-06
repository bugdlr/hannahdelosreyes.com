// *********** Menu Dropdown ************ //
const menu = document.querySelector('.fa-bars');
const dropdown = document.querySelector('.menu');
const body = document.querySelector('body');
// const nav = document.querySelector('.nav-contents');

menu.addEventListener('click', () => {
  if (dropdown.style.display !== "flex") {
    dropdown.style.display = "flex";
  } else {
    dropdown.style.display = "none";
  }
})

body.addEventListener('click', (e) => {
  console.log(e);
  if (!e.target.closest('.nav-contents')) {
    dropdown.style.display = "none";
  }
})

window.addEventListener('resize', () => {
  const screenWidth = window.innerWidth;
  if (screenWidth > 1080) {
    dropdown.style.display = "flex";
  } else {
    dropdown.style.display = "none";
  }
})
// ********** Menu Dropdown End *********** //


// ********** Menu ************ //
const portNav = document.getElementById('portfolio-nav');
const contactNav = document.getElementById('contact-nav');
const brand = document.querySelector('.brand');
const aboutSection = document.querySelector('.about');
const portfolioSection = document.querySelector('.portfolio');
const contactSection = document.querySelector('.contact');


// Menu Scroll
brand.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
})

portNav.addEventListener('click', () => {
  portfolioSection.scrollIntoView({behavior: "smooth", block: "start"});
})

contactNav.addEventListener('click', () => {
  contactSection.scrollIntoView({behavior: "smooth", block: "start"});
})


// Menu Highlight
let portPosition = getPosition(portfolioSection);

function getPosition(el) {
  el = el.getBoundingClientRect();
  return el.top;
}

function updatePosition() {
  portPosition = getPosition(portfolioSection);
  contactPosition = getPosition(contactSection);
}

window.addEventListener("scroll", updatePosition, false);
window.addEventListener("resize", updatePosition, false);

function portHighlight() {
  if (portPosition < 250 && contactPosition > 700) {
    portNav.style.backgroundColor = "rgba(128,0,128,0.2)";
  } else {
    portNav.style.backgroundColor = "inherit";
  }
}

function contactHighlight() {
  if (contactPosition < 700) {
    contactNav.style.backgroundColor = "rgba(128,0,128,0.2)";
  } else {
    contactNav.style.backgroundColor = "inherit";
  }
}

// window.addEventListener("scroll", aboutHighlight, false);
window.addEventListener("scroll", portHighlight, false);
window.addEventListener("scroll", contactHighlight, false);


// ********** End Menu *********** //

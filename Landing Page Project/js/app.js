"use strict";
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

// Global Variables & Selecting Elements //

const allLinks = document.querySelectorAll("a:link");
const allSections = document.querySelectorAll("section");

////////////////////////////////////////////////////////////////////

// Building navigation dynamically //
function NavBar() {
  const links = [];
  const section = document.querySelectorAll("section");

  for (let i = 0; i < section.length; i++) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    const sectionName = section[i].getAttribute("data-nav");
    const sectionNamePart = sectionName.replace(" ", "").toLowerCase();

    link.setAttribute("href", "#" + sectionNamePart);
    link.classList.add("menu__link");
    link.innerText = sectionName;
    li.appendChild(link);
    document.getElementById("navbar__list").appendChild(li);

    links.push(link);
  }
  ////////////////////////////////////////////////////////////////////

  // Smooth scrolling animation

  links.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      // getAttribue return string contain the value of attribute ( location )
      const href = link.getAttribute("href");

      // Scroll to section location
      if (href !== "#" && href.startsWith("#")) {
        const secLocation = document.querySelector(href);
        secLocation.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}
////////////////////////////////////////////////////////////////////

// Highlight Active Link

const highlighter = function () {
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", navHighlighter);

  function navHighlighter() {
    // Get current scroll position
    let scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 150;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document
          .querySelector("nav a[href*=" + sectionId + "]")
          .classList.add("active");
      } else {
        document
          .querySelector("nav a[href*=" + sectionId + "]")
          .classList.remove("active");
      }
    });
  }
};

////////////////////////////////////////////////////////////////////

// Add active class to the viewport section

window.onscroll = function () {
  allSections.forEach((section) => {
    const box = section.getBoundingClientRect();
    if (box.top >= -450 && box.top <= 150) {
      section.classList.add("your-active-class");
    } else section.classList.remove("your-active-class");
  });
};

// Calling functions
NavBar();
highlighter();

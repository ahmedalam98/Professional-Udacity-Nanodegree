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

const navigationList = document.getElementById("navbar__list");
const navigationBar = document.getElementsByClassName("navbar__menu");

const section1 = document.getElementById("section1");
const section2 = document.getElementById("section2");
const section3 = document.getElementById("section3");
const section4 = document.getElementById("section4");
const buttons = document.querySelector(".menu__link");

const allSections = [section1, section2, section3, section4];

////////////////////////////////////////////////////////////////////

// Building navigation dynamically //

const newLink = document.createElement("div");
newLink.innerHTML = "";
const listElement = document.createElement("li");
listElement.innerHTML = '<a class="menu__link" href="#section4">Section 4</a>';
navigationList.appendChild(listElement);

// Add active class to the viewport section //

window.onscroll = function () {
  allSections.forEach((section) => {
    const box = section.getBoundingClientRect();
    if (box.top >= -450 && box.top <= 150) {
      section.classList.add("your-active-class");
    } else section.classList.remove("your-active-class");
  });
};

////////////////////////////////////////////////////////////////////

// Another Solution //

/*
function makeActive() {
  for (const section of allSections) {
    const box = section.getBoundingClientRect();
    if (box.top <= 150 && box.bottom >= -450) {
      section.classList.add("your-active-class");
    } else {
      section.classList.remove("your-active-class");
    }
  }
}
document.addEventListener("scroll", function () {
  makeActive();
});
*/

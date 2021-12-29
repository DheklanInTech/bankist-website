"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const allSections = document.querySelectorAll(".section");
const allButtons = document.getElementsByTagName("button");
const header = document.querySelector(".header");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const section2 = document.querySelector("#section--2");
const section3 = document.querySelector("#section--3");
// const h1 = document.querySelector("h1");

// creating and inserting elements
const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML =
  'we use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
// header.prepend(message);
header.append(message);

// deleting element

document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
  });

// creating styles
message.style.backgroundColor = "#37383d";
message.style.width = "120%";
message.style.fontSize = "25px";
message.style.height = "60px";

// attributes
const logo = document.querySelector(".nav__logo");
//  console.log(logo.alt)
//  console.log(logo.className)
logo.alt = "Beautiful bank logo";
logo.setAttribute("company", "Bankist");
// logo.getAttribute()
const link = document.querySelector(".twitter-link");
console.log(link.href);
console.log(link.getAttribute("href"));

////////////////////////////////////////////////

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// implementing scroll

btnScrollTo.addEventListener("click", function () {
  // const slcoords = section1.getBoundingClientRect();
  // console.log(slcoords);
  // window.scrollTo(
  //   slcoords.left + window.pageXOffset,
  //   slcoords.top + pageYOffset
  // );
  // we can it smooth this way
  // window.scrollTo({
  //   left: slcoords.left + window.pageXOffset,
  //   top: slcoords.top + pageYOffset,
  //   behavior: "smooth",
  // });
  // best way to do it / modern way
  section1.scrollIntoView({ behavior: "smooth" });
});

// event delegation using the idea of bubble to implement link scroll
// steps
// 1. add event listener to comon parent element
// 2.determine what element originated the event

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  //matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// tabbed content

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  //  guard clause
  if (!clicked) return;

  // remove active classes

  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((tc) =>
    tc.classList.remove("operations__content--active")
  );
  // activate tab

  clicked.classList.add("operations__tab--active");

  // activate content area
  //
  //  activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// menu fade animation
const nav = document.querySelector(".nav");

nav.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav__links").querySelectorAll(".nav__link");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = 0.5;
    });
  }
});
nav.addEventListener("mouseout", function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav__links").querySelectorAll(".nav__link");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = 1;
    });
  }
});

// sticky navigation

// implementing sticky navigation with IntersectionObserver API

// const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px`,
});

headerObserver.observe(header);

// Reveal sections ;
// const allSections = document.querySelectorAll('.sections')
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserver(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// lazy loading of images

const imgTargets = document.querySelectorAll("img[data-src]");
const loading = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserver(entry.target);
};
const imgObserver = new IntersectionObserver(loading, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});
imgTargets.forEach(function (img) {
  imgObserver.observe(img);
});

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

let curSlides = 0;
const maxSlides = slides.length;

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class = "dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();

const activateDots = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};
activateDots(0);

// way to scale down the slider
// const slider = document.querySelector(".slider");
// slider.style.transform = "scale(0.4) translateX(-800px)";
// slider.style.overflow = "visible";
// -------------------------------------

//commenting this to make our goToSlide = 0,this way our slide automatically starts at zero
// slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

// refactoring codes
const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
goToSlide(0);

// 0%,100%,200%,300%
//  go to the next slide

const nextSlide = function () {
  if (curSlides === maxSlides - 1) {
    curSlides = 0;
  } else {
    curSlides++;
  }
  goToSlide(curSlides);
  activateDots(curSlides);
};

const prevSlide = function () {
  if (curSlides === 0) {
    curSlides = maxSlides - 1;
  } else {
    curSlides--;
  }
  goToSlide(curSlides);
  activateDots(curSlides);
};
btnRight.addEventListener("click", nextSlide);

btnLeft.addEventListener("click", prevSlide);

// implementing the left and right keys to the slides
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") nextSlide();
});
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") prevSlide();
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDots(slide);
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   ///////////////////////////////////////////////////////////////

// event handlers and listener
// h1.addEventListener("mouseenter", function () {
//   alert("addeventlistener: Great!");
// });

// const alertH1 = function (e) {
//   alert("addeventlistener: Great!");

//   // h1.removeEventListener("mouseenter", alertH1);
// };
// h1.addEventListener("mouseenter", alertH1);
// // using timeout to removeEventListener
// setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 5000);

// evnt bubbling and propagation

// rgb(255,255,255)
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// // console.log(randomInt(1, 10));

// // create a random color
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
// });
// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
// });
// document.querySelector(".nav").addEventListener("click", function () {
//   console.log("LINK");
// });

// DOM TRANSVERSING

// const h1 = document.querySelector("h1");

// going downwards

// console.log(h1.querySelectorAll(".highlight"));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild
// h1.lastElementChild

// going upwards

// console.log(h1.parentNode);
// console.log(h1.parentElement);
// h1.closest(".header").style.background = "var(--gradient-secondary)";
// h1.closest("h1").style.background = "var(--gradient-primary)";

import './style.css'

const BASE = import.meta.env.BASE_URL || '/portfolio/';

// Preload dark theme icons
const icons = [
  "sun-regular-full.svg",
  "moon-solid-full.svg",
  "GitHub.svg",
  "GitHub-white.svg",
  "envelope-solid.svg",
  "envelope-solid-white.svg",
  "arrow-right-solid-full-black.svg",
  "arrow-right-solid-full-white.svg",
  "chevron-up-solid.svg",
  "bars-solid.svg"  
];

icons.forEach(file => {
  const img = new Image();
  img.src = `${BASE}icons/${file}`;
});

// Element Refs
const html = document.documentElement;
const main = document.getElementById("main");
const header = document.getElementById("banner");
const btn = document.querySelector("[aria-label='Expand Banner']");
const btnIcon = btn.querySelector("img");
const aboutExpanded = document.getElementById("about-expanded");
const themeContainer = document.getElementById("theme-container");
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const moreIcon = document.getElementById("more-icon");
const gitHubIcon = document.getElementById("github-icon");
const mailIcon = document.getElementById("mail-icon");
const mailLink = document.getElementById("mail-link");
const cards = document.querySelectorAll('.card');
const viewMoreBtn = document.querySelector('.more-btn');
// store breakpoint for resetting expansion state
const mdBreakpoint = window.matchMedia("(min-width: 768px)");

const emailParts = ["beren64","msn.com"];

let expanded = false;

// Functions
const expandHeader = () => {
  expanded = true;

  aboutExpanded.classList.remove("max-h-0");
  aboutExpanded.classList.add("max-h-[400px]");

  main.classList.add("pt-[436px]");

  btnIcon.src = `${BASE}icons/chevron-up-solid.svg`;
  btn.setAttribute("aria-expanded", "true");
}

const collapseHeader = () => {
  expanded = false;

  aboutExpanded.classList.add("max-h-0");
  aboutExpanded.classList.remove("max-h-[400px]");

  main.classList.remove("pt-[436px]");

  btnIcon.src = `${BASE}icons/bars-solid.svg`;
  btn.setAttribute("aria-expanded", "false");
}

const toggleTheme = darkTheme => {
  if (darkTheme) {
    themeIcon.src = `${BASE}icons/moon-solid-full.svg`;
    gitHubIcon.src = `${BASE}icons/GitHub-white.svg`;
    mailIcon.src = `${BASE}icons/envelope-solid-white.svg`;
    moreIcon.src = `${BASE}icons/arrow-right-solid-full-black.svg`;
    applyDarkTheme();
  } else {
    themeIcon.src = `${BASE}icons/sun-regular-full.svg`;
    gitHubIcon.src = `${BASE}icons/GitHub.svg`;
    mailIcon.src = `${BASE}icons/envelope-solid.svg`;
    moreIcon.src = `${BASE}icons/arrow-right-solid-full-white.svg`;
    removeDarkTheme();
  }
}

const applyDarkTheme = () => {
  html.classList.add("dark");
  
}

const removeDarkTheme = () => {
  html.classList.remove("dark");
}

// Center viewMoreBtn if even number of cards
if (cards.length % 2 === 0) {
  viewMoreBtn.classList.add('col-span-full');
} else {
viewMoreBtn.classList.remove('col-span-full');
}

// Event Listeners
main.addEventListener("scroll", () => {
  if (main.scrollTop > 0) {
    header.classList.add("shadow-lg");
  } else {
    header.classList.remove("shadow-lg");
  }
});

btn.addEventListener("click", () => {
  expanded ? collapseHeader() : expandHeader();
});

themeContainer.addEventListener("click", () => {
  const darkModeIsOn = themeToggleBtn.getAttribute("aria-checked") === "true";

  themeToggleBtn.setAttribute("aria-checked", String(!darkModeIsOn));

  toggleTheme(!darkModeIsOn);
});

mdBreakpoint.addEventListener("change", e => {
  if (e.matches) {
    collapseHeader();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768 && expanded) {
    collapseHeader();
  }
});

mailLink.addEventListener("click", e => {
  const email = `${emailParts[0]}@${emailParts[1]}`;
  const subject = "Portfolio Enquiry";

  e.currentTarget.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
});
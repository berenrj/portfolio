import './style.css'

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

  btnIcon.src = "/icons/chevron-up-solid.svg";
  btn.setAttribute("aria-expanded", "true");
}

const collapseHeader = () => {
  expanded = false;

  aboutExpanded.classList.add("max-h-0");
  aboutExpanded.classList.remove("max-h-[400px]");

  main.classList.remove("pt-[436px]");

  btnIcon.src = "/icons/bars-solid.svg";
  btn.setAttribute("aria-expanded", "false");
}

const toggleTheme = darkTheme => {
  if (darkTheme) {
    themeIcon.src = "/icons/moon-solid-full.svg";
    gitHubIcon.src = "/icons/GitHub-white.svg";
    mailIcon.src = "/icons/envelope-solid-white.svg";
    moreIcon.src = "/icons/arrow-right-solid-full-black.svg";
    applyDarkTheme();
  } else {
    themeIcon.src = "/icons/sun-regular-full.svg";
    gitHubIcon.src = "/icons/GitHub.svg";
    mailIcon.src = "/icons/envelope-solid.svg";
    moreIcon.src = "/icons/arrow-right-solid-full-white.svg";
    removeDarkTheme();
  }
}

const applyDarkTheme = () => {
  html.classList.add("dark");
  
}

const removeDarkTheme = () => {
  html.classList.remove("dark");
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
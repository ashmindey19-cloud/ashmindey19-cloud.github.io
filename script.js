
"use strict";

// ============================================
// 1. TYPING ANIMATION
// ============================================

const subtitle = document.querySelector(".subtitle");

if (subtitle) {

    const roles = [
        "CSE Student",
        "Programmer",
        "Web Developer",
        "Science Enthusiast",
        "Technology Explorer"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {

        const currentRole = roles[roleIndex];

        subtitle.textContent = currentRole.substring(0, charIndex);

        let delay = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex < currentRole.length) {

            charIndex++;

        } else if (!isDeleting) {

            isDeleting = true;
            delay = 1300;

        } else if (charIndex > 0) {

            charIndex--;

        } else {

            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 400;

        }

        setTimeout(typeEffect, delay);
    }

    typeEffect();
}


// ============================================
// 2. SCROLL REVEAL ANIMATION
// ============================================

const revealElements = document.querySelectorAll(
    ".section-heading, .info-card, .skill-card, " +
    ".interest-card, .empty-card, .social-card, " +
    ".profile, .contact-description"
);

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    revealObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach((element, index) => {

        element.classList.add("reveal");

        element.style.transitionDelay =
            `${(index % 4) * 100}ms`;

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach((element) => {

        element.classList.add("show");

    });

}


// ============================================
// 3. ACTIVE NAVIGATION
// ============================================

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    navLinks.forEach((link) => {

                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") ===
                            `#${entry.target.id}`
                        ) {

                            link.classList.add("active");

                        }

                    });

                }

            });

        },
        {
            rootMargin: "-30% 0px -60% 0px"
        }
    );

    sections.forEach((section) => {

        sectionObserver.observe(section);

    });

}


// ============================================
// 4. SCROLL PROGRESS BAR
// ============================================

const scrollProgress = document.getElementById("scrollProgress");

function updateScrollProgress() {

    if (!scrollProgress) return;

    const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    if (scrollableHeight <= 0) {

        scrollProgress.style.width = "0%";
        return;

    }

    const scrollPercentage =
        (window.scrollY / scrollableHeight) * 100;

    scrollProgress.style.width = `${scrollPercentage}%`;

}


// ============================================
// 5. BACK TO TOP BUTTON
// ============================================

const backToTop = document.getElementById("backToTop");

function updateBackToTop() {

    if (!backToTop) return;

    if (window.scrollY > 400) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}

if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


// ============================================
// 6. MOBILE NAVIGATION MENU
// ============================================

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

        const isOpen = mainNav.classList.toggle("active");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        const menuIcon = menuToggle.querySelector("i");

        if (menuIcon) {

            menuIcon.classList.toggle("fa-bars", !isOpen);
            menuIcon.classList.toggle("fa-xmark", isOpen);

        }

    });


    // Close menu after clicking a navigation link

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");

            const menuIcon = menuToggle.querySelector("i");

            if (menuIcon) {

                menuIcon.classList.remove("fa-xmark");
                menuIcon.classList.add("fa-bars");

            }

        });

    });


    // Close menu with Escape key

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            mainNav.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            const menuIcon = menuToggle.querySelector("i");

            if (menuIcon) {

                menuIcon.classList.remove("fa-xmark");
                menuIcon.classList.add("fa-bars");

            }

        }

    });

}


// ============================================
// 7. DARK / LIGHT THEME TOGGLE
// ============================================

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    const themeIcon = themeToggle.querySelector("i");

    function applyTheme(theme) {

        document.body.classList.toggle(
            "light-theme",
            theme === "light"
        );

        if (themeIcon) {

            themeIcon.classList.toggle(
                "fa-sun",
                theme === "light"
            );

            themeIcon.classList.toggle(
                "fa-moon",
                theme !== "light"
            );

        }

        themeToggle.setAttribute(
            "aria-label",
            theme === "light"
                ? "Switch to dark theme"
                : "Switch to light theme"
        );

    }


    // Load saved theme

    let savedTheme = "dark";

    try {

        savedTheme =
            localStorage.getItem("portfolioTheme") || "dark";

    } catch (error) {

        console.warn("Theme preference could not be loaded.");

    }

    applyTheme(savedTheme);


    // Change theme when button is clicked

    themeToggle.addEventListener("click", () => {

        const isLight =
            document.body.classList.contains("light-theme");

        const newTheme = isLight ? "dark" : "light";

        applyTheme(newTheme);

        try {

            localStorage.setItem("portfolioTheme", newTheme);

        } catch (error) {

            console.warn("Theme preference could not be saved.");

        }

    });

}


// ============================================
// 8. WINDOW SCROLL EVENTS
// ============================================

function handleScroll() {

    updateScrollProgress();
    updateBackToTop();

}

window.addEventListener("scroll", handleScroll, {
    passive: true
});


// Initial update

handleScroll();

console.log("Ashmin.DEV Portfolio JavaScript Loaded Successfully!");


/* =========================================================
   27. CHAT WIDGET FUNCTIONALITY
========================================================= */

const chatToggleButton = document.getElementById("chatToggle");
const chatCloseButton = document.getElementById("chatClose");
const chatWindowElement = document.getElementById("chatWindow");


// OPEN / CLOSE CHAT

if (chatToggleButton && chatWindowElement) {

    chatToggleButton.addEventListener("click", function () {

        const isOpen = !chatWindowElement.hidden;

        chatWindowElement.hidden = isOpen;

        chatToggleButton.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

    });

}


// CLOSE CHAT BUTTON

if (chatCloseButton && chatWindowElement && chatToggleButton) {

    chatCloseButton.addEventListener("click", function () {

        chatWindowElement.hidden = true;

        chatToggleButton.setAttribute(
            "aria-expanded",
            "false"
        );

    });

}


// CLOSE CHAT WITH ESCAPE KEY

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape" && chatWindowElement) {

        chatWindowElement.hidden = true;

        chatToggleButton?.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});

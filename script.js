// ========== CUSTOMIZATION CONFIG ==========
// Edit anything below to personalize your portfolio
const CONFIG = {
    name: "Your Name",
    title: "Web Developer & Designer",
    description: "I build beautiful, responsive websites and web applications.",
    about: [
        "Hi! I'm a passionate web developer with experience in creating modern and responsive websites. I love turning ideas into reality through clean code and thoughtful design.",
        "When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or enjoying a good cup of coffee."
    ],
    info: {
        name: "Your Name",
        email: "your@email.com",
        location: "Dhaka, Bangladesh",
        freelance: "Available"
    },
    contact: {
        email: "your@email.com",
        phone: "+880 1XXX-XXXXXX",
        location: "Dhaka, Bangladesh"
    },
    skills: [
        { name: "HTML", icon: "🌐", progress: 90 },
        { name: "CSS", icon: "🎨", progress: 85 },
        { name: "JavaScript", icon: "⚡", progress: 80 },
        { name: "React", icon: "⚛️", progress: 75 },
        { name: "Node.js", icon: "🗄️", progress: 70 },
        { name: "Python", icon: "🐍", progress: 65 }
    ],
    projects: [
        {
            title: "Project One",
            desc: "A brief description of your first amazing project goes here.",
            tags: ["HTML", "CSS", "JS"],
            demo: "#",
            source: "#"
        },
        {
            title: "Project Two",
            desc: "A brief description of your second amazing project goes here.",
            tags: ["React", "Firebase"],
            demo: "#",
            source: "#"
        },
        {
            title: "Project Three",
            desc: "A brief description of your third amazing project goes here.",
            tags: ["Node.js", "MongoDB"],
            demo: "#",
            source: "#"
        }
    ],
    socials: [
        { name: "GitHub", url: "#" },
        { name: "LinkedIn", url: "#" },
        { name: "Twitter", url: "#" }
    ]
};
// ============================================

// ===== POPULATE CONTENT =====
function populateContent() {
    document.getElementById("heroName").textContent = CONFIG.name;
    document.getElementById("heroTitle").textContent = CONFIG.title;
    document.getElementById("heroDesc").textContent = CONFIG.description;

    const aboutText = document.getElementById("aboutText");
    aboutText.innerHTML = CONFIG.about.map(p => `<p>${p}</p>`).join("");

    document.getElementById("infoName").textContent = CONFIG.info.name;
    document.getElementById("infoEmail").textContent = CONFIG.info.email;
    document.getElementById("infoLocation").textContent = CONFIG.info.location;
    document.getElementById("infoFreelance").textContent = CONFIG.info.freelance;

    document.getElementById("contactEmail").textContent = CONFIG.contact.email;
    document.getElementById("contactPhone").textContent = CONFIG.contact.phone;
    document.getElementById("contactLocation").textContent = CONFIG.contact.location;

    // Skills
    const skillsGrid = document.getElementById("skillsGrid");
    skillsGrid.innerHTML = CONFIG.skills.map(s => `
        <div class="skill-card" data-progress="${s.progress}">
            <div class="skill-icon">${s.icon}</div>
            <h3>${s.name}</h3>
            <div class="skill-bar"><div class="skill-fill"></div></div>
            <span class="skill-percent">${s.progress}%</span>
        </div>
    `).join("");

    // Projects
    const projectsGrid = document.getElementById("projectsGrid");
    projectsGrid.innerHTML = CONFIG.projects.map(p => `
        <div class="project-card">
            <div class="project-img">${p.title}</div>
            <div class="project-info">
                <h3>${p.title}</h3>
                <p>${p.desc}</p>
                <div class="project-tags">
                    ${p.tags.map(t => `<span>${t}</span>`).join("")}
                </div>
                <div class="project-links">
                    <a href="${p.demo}" class="btn btn-small">Live Demo</a>
                    <a href="${p.source}" class="btn btn-small btn-outline">Source Code</a>
                </div>
            </div>
        </div>
    `).join("");

    // Socials
    const socialsContainer = document.querySelector(".contact-socials");
    socialsContainer.innerHTML = CONFIG.socials.map(s => `
        <a href="${s.url}" class="social-link" aria-label="${s.name}">${s.name}</a>
    `).join("");

    // Footer year
    document.getElementById("year").textContent = new Date().getFullYear();
}

// ===== SKILL ANIMATION =====
function animateSkills() {
    const fills = document.querySelectorAll(".skill-fill");
    fills.forEach(fill => {
        const card = fill.closest(".skill-card");
        const progress = card.dataset.progress;
        fill.style.width = progress + "%";
    });
}

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;

function setTheme(theme) {
    html.setAttribute("data-theme", theme);
    themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
    localStorage.setItem("theme", theme);
}

themeToggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    setTheme(current === "dark" ? "light" : "dark");
});

const savedTheme = localStorage.getItem("theme");
if (savedTheme) setTheme(savedTheme);

// ===== MOBILE MENU =====
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

// ===== SCROLL ANIMATION (Intersection Observer) =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Animate skills when skills section is visible
            if (entry.target.id === "skills") {
                animateSkills();
            }
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll("section").forEach(s => observer.observe(s));

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        if (window.scrollY >= top) {
            current = section.getAttribute("id");
        }
    });
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// ===== CONTACT FORM =====
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const btn = this.querySelector("button");
    const original = btn.textContent;
    btn.textContent = "Message Sent! ✅";
    btn.style.background = "#22c55e";
    btn.style.borderColor = "#22c55e";
    setTimeout(() => {
        btn.textContent = original;
        btn.style.background = "";
        btn.style.borderColor = "";
        this.reset();
    }, 2500);
});

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
    populateContent();

    // Add visible class to sections already in view
    requestAnimationFrame(() => {
        document.querySelectorAll("section").forEach(s => {
            const rect = s.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                s.classList.add("visible");
                if (s.id === "skills") animateSkills();
            }
        });
    });
});

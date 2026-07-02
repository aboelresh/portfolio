// Project Data for detailed Modal displays
const projectsData = {
  codemaster: {
    title: "Code Master — Programming Learning Platform",
    tech: ["Laravel", "PHP 8", "MySQL", "Redis Caching", "RESTful APIs", "Background Jobs"],
    summary: "Architected a full-featured e-learning platform with a mandatory track-based system; learners cannot advance without passing a minimum-score exam per course, enforcing structured progression.",
    features: [
      "Track-based system: Enforces structured learning paths where students must pass exams before continuing.",
      "Collaboration Space: Enables learners to form project groups or study circles with shared workspaces.",
      "Analytics Engine: Evaluates exam scores, course completion, and team interaction to generate detailed skills radar charts.",
      "Workstation: Features a Pomodoro-style timer, personal to-do list, and media library to support focused study sessions.",
      "AI Assistant: Integrated FAQ chatbot and real-time AI-powered assistant to answer learner queries instantly."
    ],
    architecture: "Built with Laravel APIs and MySQL as the relational storage. Background jobs are handled via Laravel Queues and Redis for high-performance job scheduling and tracking. The analytics system runs background summarization scripts to keep calculations efficient."
  },
  studentaffairs: {
    title: "Student Affairs Management System",
    tech: ["Laravel", "PHP 8", "MySQL", "Digital Signatures", "Encryption", "RESTful APIs"],
    summary: "Designed and built a university-wide digital workflow system eliminating paper-based document submission; students submit forms, pay fees, and register for courses entirely online.",
    features: [
      "Paperless workflow: Digitalizes course registration, fee payment, and document submission.",
      "Approval Pipeline: Multi-role verification pipeline allowing academic advisors and student affairs officers to apply digital signatures and official stamps.",
      "Real-time Document Tracking: Enables students to track their application status at every single step of the process.",
      "High Security: Applies AES-256 end-to-end data encryption to protect sensitive student records in compliance with data security best practices."
    ],
    architecture: "The application relies on Laravel's middleware validation layers to handle role-based approvals. Cryptographic digital signatures are generated using public-key cryptography (OpenSSL) to verify identity, while database fields are securely encrypted at rest."
  },
  dormmgmt: {
    title: "University Dorm Management System",
    tech: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    summary: "Developed a comprehensive housing management system covering student registration, automated room allocation, maintenance request tracking, and a full admin control panel.",
    features: [
      "Automated Room Allocation: Heuristic logic to match and allocate rooms based on student profiles and preferences.",
      "Maintenance Request System: Ticket management pipeline tracking maintenance issues from submission to technician feedback.",
      "Admin Panel: Centralized dashboard for housing operations, reducing manual coordination overhead for dorm administrators."
    ],
    architecture: "Monolithic Laravel architecture using Blade templates and Bootstrap for administrative UI responsiveness. Core allocation algorithms utilize transactional database operations to avoid double-booking."
  },
  newsaggregator: {
    title: "News Aggregation & Summarization Platform",
    tech: ["Laravel", "PHP", "MySQL", "External APIs", "Automation Scripts"],
    summary: "Built an automated pipeline collecting news from multiple external APIs, classifying articles by category, and storing structured data for fast retrieval.",
    features: [
      "API Aggregator: Automated background pipelines fetching news articles from 5+ external news feeds.",
      "Classification System: Automatic tagging and categorizing of articles based on keyword matching.",
      "Text Processing Logic: Content summarization algorithms that reduce article reading length while preserving key facts."
    ],
    architecture: "Uses Laravel scheduler to run cron tasks every hour. External API data is fetched concurrently, validated, and normalized before storage. Database indexing applied to categorization columns to speed up querying."
  },
  securemessaging: {
    title: "Secure Messaging System",
    tech: ["PHP 8", "MySQL", "AES Encryption", "Data Integrity"],
    summary: "Designed and implemented a private internal messaging platform with encrypted communication between registered users.",
    features: [
      "Encrypted Messaging: Cryptographic keys protect text content in transit.",
      "Storage Secrecy: Data is stored encrypted in MySQL, shielding conversations from database admins.",
      "Integrity Check: Cryptographic hashing verifies that message packets have not been tampered with during transmission."
    ],
    architecture: "Pure PHP implementation adhering to MVC architecture. Uses PHP's OpenSSL library for secure symmetric encryption (AES-256-GCM) with random IVs generated per message."
  },
  rafeeq: {
    title: "Rafeeq — Educational Platform for Beginners",
    tech: ["PHP", "MySQL", "Content Management", "Web UX"],
    summary: "Built an interactive e-learning platform for beginners covering fundamental programming concepts, with structured lessons and quiz modules.",
    features: [
      "Interactive Learning: Modules explaining basic coding concepts with illustrations.",
      "Quiz Runner: Dynamic quiz components checking learner understanding in real time.",
      "Built-in CMS: Customized administration panel allowing curriculum creators to upload lessons without coding."
    ],
    architecture: "Developed with native PHP and custom router. Implements clean separation of concerns. Features database optimization for tracking learner progress state across multiple lessons."
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle
  const themeToggleBtn = document.getElementById("theme-toggle");
  const sunIcon = themeToggleBtn.querySelector(".sun-icon");
  const moonIcon = themeToggleBtn.querySelector(".moon-icon");
  
  // Check for saved theme preference or default to dark
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcons(savedTheme);

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcons(newTheme);
  });

  function updateThemeIcons(theme) {
    if (theme === "light") {
      sunIcon.style.display = "block";
      moonIcon.style.display = "none";
    } else {
      sunIcon.style.display = "none";
      moonIcon.style.display = "block";
    }
  }

  // Burger Menu Mobile Toggle
  const burger = document.getElementById("burger");
  const navLinks = document.querySelector(".nav-links");
  
  burger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    burger.classList.toggle("toggle");
  });

  // Close Mobile Menu on link click
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      burger.classList.remove("toggle");
    });
  });

  // Active Nav Link Scroll Tracker
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";
    
    // Add scrolled class to header
    const header = document.getElementById("header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach(item => {
      item.classList.remove("active");
      if (item.getAttribute("href").slice(1) === current) {
        item.classList.add("active");
      }
    });
  });

  // Projects Grid Filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      projectCards.forEach(card => {
        const categories = card.getAttribute("data-categories").split(" ");
        if (filterValue === "all" || categories.includes(filterValue)) {
          card.style.display = "flex";
          setTimeout(() => card.style.opacity = "1", 50);
        } else {
          card.style.opacity = "0";
          setTimeout(() => card.style.display = "none", 300);
        }
      });
    });
  });

  // Copy Email to Clipboard
  const copyBtn = document.getElementById("copy-email-btn");
  const emailText = document.getElementById("email-address").textContent;
  const toast = document.getElementById("clipboard-toast");

  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(emailText).then(() => {
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
      }, 3000);
    });
  });

  // Project Modals details
  const modalOverlay = document.getElementById("project-modal");
  const modalBodyContent = document.getElementById("modal-body-content");
  const modalClose = document.getElementById("modal-close");

  document.querySelectorAll(".read-more-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const projectKey = btn.getAttribute("data-project");
      const project = projectsData[projectKey];

      if (project) {
        // Build tech badges
        const badgesHtml = project.tech.map(t => `<span class="tech-badge">${t}</span>`).join("");
        
        // Build features list
        const featuresHtml = project.features.map(f => `<li>${f}</li>`).join("");

        modalBodyContent.innerHTML = `
          <h2 class="timeline-title" style="font-size: 1.8rem; margin-bottom: 0.5rem;">${project.title}</h2>
          <div class="modal-tech-stack">${badgesHtml}</div>
          
          <p class="timeline-desc" style="font-size: 1.05rem; margin-bottom: 1.5rem; line-height: 1.7;">${project.summary}</p>
          
          <h3 class="modal-section-title">Core Implementation Details</h3>
          <ul class="modal-features-list">${featuresHtml}</ul>
          
          <h3 class="modal-section-title">System Architecture</h3>
          <p class="timeline-desc" style="line-height: 1.7;">${project.architecture}</p>
        `;

        modalOverlay.classList.add("open");
        document.body.style.overflow = "hidden"; // Prevent scrolling
      }
    });
  });

  // Close Modal
  function closeModal() {
    modalOverlay.classList.remove("open");
    document.body.style.overflow = "auto";
  }

  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // Contact Form Handling (Simulation)
  const contactForm = document.getElementById("portfolio-contact-form");
  const formStatus = document.getElementById("form-status");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formStatus.style.display = "block";
    formStatus.className = "form-status"; // reset classes
    formStatus.textContent = "Sending message...";

    // Simulate sending message
    setTimeout(() => {
      formStatus.classList.add("success");
      formStatus.textContent = "Thank you! Your message was sent successfully. (Simulation)";
      contactForm.reset();

      setTimeout(() => {
        formStatus.style.display = "none";
      }, 5000);
    }, 1500);
  });

  // Terminal Typing Animation for Hero Section
  const terminalBody = document.getElementById("terminal-body");
  
  const terminalScript = [
    { type: "input", text: "whoami" },
    { type: "output", text: "ahmedsaad\nRole: Backend Developer & PHP/Laravel Specialist\nLocation: Cairo, Egypt" },
    { type: "input", text: "cat skills.json" },
    { type: "output", text: JSON.stringify({
        core: "PHP 8, Laravel",
        database: "MySQL, PostgreSQL",
        caching_queues: "Redis, Background Jobs",
        testing: "PHPUnit"
      }, null, 2), class: "output-cyan" },
    { type: "input", text: "php artisan test" },
    { type: "output", text: "PASS  Tests\\Unit\\CleanArchitectureTest\nPASS  Tests\\Feature\\SecureSignatureApiTest\n\nTests:  12 passed (28 assertions)\nTime:   0.84s\nMemory: 16.00 MB", class: "output-green" },
    { type: "input", text: "echo $STATUS" },
    { type: "output", text: "Ready to build next-generation backend systems.", class: "output-blue" }
  ];

  let scriptIndex = 0;
  
  function runTerminalScript() {
    if (scriptIndex >= terminalScript.length) {
      // Add standard ending cursor line
      const finalLine = document.createElement("div");
      finalLine.className = "terminal-line";
      finalLine.innerHTML = `<span class="command-input"><span class="command-prompt">developer@portfolio:~$</span><span class="cursor"></span></span>`;
      terminalBody.appendChild(finalLine);
      terminalBody.scrollTop = terminalBody.scrollHeight;
      return;
    }

    const currentItem = terminalScript[scriptIndex];
    
    if (currentItem.type === "input") {
      const inputLine = document.createElement("div");
      inputLine.className = "terminal-line";
      inputLine.innerHTML = `<span class="command-input"><span class="command-prompt">developer@portfolio:~$</span> <span class="typed-text"></span><span class="cursor"></span></span>`;
      terminalBody.appendChild(inputLine);
      
      const textSpan = inputLine.querySelector(".typed-text");
      const cursorSpan = inputLine.querySelector(".cursor");
      let charIndex = 0;
      
      function typeChar() {
        if (charIndex < currentItem.text.length) {
          textSpan.textContent += currentItem.text.charAt(charIndex);
          charIndex++;
          terminalBody.scrollTop = terminalBody.scrollHeight;
          setTimeout(typeChar, 80);
        } else {
          cursorSpan.remove(); // Remove cursor from this line
          scriptIndex++;
          setTimeout(runTerminalScript, 400); // Wait before outputting
        }
      }
      setTimeout(typeChar, 300);
      
    } else if (currentItem.type === "output") {
      const outputLine = document.createElement("div");
      outputLine.className = "terminal-line";
      
      const customClass = currentItem.class || "";
      outputLine.innerHTML = `<pre class="command-output ${customClass}">${currentItem.text}</pre>`;
      terminalBody.appendChild(outputLine);
      terminalBody.scrollTop = terminalBody.scrollHeight;
      
      scriptIndex++;
      setTimeout(runTerminalScript, 800); // Wait before next command input
    }
  }

  // Start terminal script with a slight delay
  setTimeout(runTerminalScript, 1000);
});

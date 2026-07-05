// ============================================================
// EmailJS Configuration
// Replace these values with your actual EmailJS credentials:
//   1. Go to https://emailjs.com and create a free account
//   2. Add an Email Service (Gmail recommended)
//   3. Create an Email Template — use variables:
//      {{from_name}}, {{from_email}}, {{subject}}, {{message}}
//   4. Paste your Public Key, Service ID, and Template ID below
// ============================================================
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";   // e.g. "user_abc123xyz"
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";   // e.g. "service_gmail"
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // e.g. "template_contact"

// ============================================================
// Project Data for Modal
// ============================================================
const projectsData = {
  codemaster: {
    title: "Code Master — Programming Learning Platform",
    tech: ["Laravel", "PHP 8", "MySQL", "Redis Caching", "RESTful APIs", "Background Jobs"],
    role: "Solo Architect & Developer",
    problem: "Unstructured online learning lets learners skip foundational modules, producing shallow knowledge and high dropout rates.",
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
    tech: ["Laravel", "PHP 8", "MySQL", "Digital Signatures", "AES-256 Encryption", "RESTful APIs"],
    role: "Solo Architect & Developer",
    problem: "Paper-based university workflows cause processing delays of days and expose sensitive student records to physical data loss.",
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
    role: "Solo Developer",
    problem: "Manual room allocation causes double-booking conflicts and requires significant administrative coordination time.",
    summary: "Developed a comprehensive housing management system covering student registration, automated room allocation, maintenance request tracking, and a full admin control panel.",
    features: [
      "Automated Room Allocation: Heuristic logic to match and allocate rooms based on student profiles and preferences.",
      "Maintenance Request System: Ticket management pipeline tracking maintenance issues from submission to technician feedback.",
      "Admin Panel: Centralized dashboard for housing operations, reducing manual coordination overhead for dorm administrators."
    ],
    architecture: "Monolithic Laravel architecture using Blade templates and Bootstrap for administrative UI responsiveness. Core allocation algorithms utilize transactional database operations to prevent double-booking race conditions."
  },
  newsaggregator: {
    title: "News Aggregation & Summarization Platform",
    tech: ["Laravel", "PHP", "MySQL", "External APIs", "Laravel Scheduler", "DB Indexing"],
    role: "Solo Developer",
    problem: "Tracking news across multiple sources is time-consuming; readers need a single normalized feed with concise summaries.",
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
    tech: ["PHP 8", "MySQL", "AES-256-GCM", "OpenSSL", "Cryptographic Hashing"],
    role: "Solo Developer",
    problem: "Storing plaintext messages in a database means any breach exposes every private conversation instantly.",
    summary: "Designed and implemented a private internal messaging platform with encrypted communication between registered users.",
    features: [
      "Encrypted Messaging: AES-256-GCM with unique IV per message protects text content at rest and in transit.",
      "Storage Secrecy: Data is stored encrypted in MySQL, shielding conversations even from database administrators.",
      "Integrity Check: Cryptographic hashing verifies that message packets have not been tampered with during transmission."
    ],
    architecture: "Pure PHP implementation adhering to MVC architecture. Uses PHP's OpenSSL library for secure symmetric encryption (AES-256-GCM) with random IVs generated per message to prevent pattern analysis."
  },
  rafeeq: {
    title: "Rafeeq — Educational Platform for Beginners",
    tech: ["PHP 8", "MySQL", "Custom MVC Router", "Content Management"],
    role: "Solo Developer",
    problem: "Beginners lack accessible, gamified learning paths with built-in content management that requires no technical knowledge.",
    summary: "Built an interactive e-learning platform for beginners covering fundamental programming concepts, with structured lessons and quiz modules.",
    features: [
      "Interactive Learning: Modules explaining basic coding concepts with illustrations and examples.",
      "Quiz Runner: Dynamic quiz components checking learner understanding in real time.",
      "Built-in CMS: Customized administration panel allowing curriculum creators to upload lessons without coding."
    ],
    architecture: "Developed with native PHP and a custom-built router — no framework dependency. Implements clean separation of concerns. Features database optimization for tracking learner progress state across multiple lessons."
  }
};

// ============================================================
// DOMContentLoaded — main app entry point
// ============================================================
document.addEventListener("DOMContentLoaded", () => {

  // Initialize EmailJS
  if (typeof emailjs !== "undefined" && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  // ----------------------------------------------------------
  // Theme Toggle
  // ----------------------------------------------------------
  const themeToggleBtn = document.getElementById("theme-toggle");
  const sunIcon = themeToggleBtn.querySelector(".sun-icon");
  const moonIcon = themeToggleBtn.querySelector(".moon-icon");

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

  // ----------------------------------------------------------
  // Burger Menu
  // ----------------------------------------------------------
  const burger = document.getElementById("burger");
  const navLinks = document.querySelector(".nav-links");

  burger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    burger.classList.toggle("toggle");
    burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    burger.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      burger.classList.remove("toggle");
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Open navigation menu");
    });
  });

  // ----------------------------------------------------------
  // Active Nav Scroll Tracker + Header scroll class
  // ----------------------------------------------------------
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";

    const header = document.getElementById("header");
    header.classList.toggle("scrolled", window.scrollY > 50);

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

  // ----------------------------------------------------------
  // Projects Grid Filtering
  // ----------------------------------------------------------
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards  = document.querySelectorAll(".project-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      projectCards.forEach(card => {
        const categories = card.getAttribute("data-categories").split(" ");
        if (filterValue === "all" || categories.includes(filterValue)) {
          card.style.display = "flex";
          setTimeout(() => (card.style.opacity = "1"), 50);
        } else {
          card.style.opacity = "0";
          setTimeout(() => (card.style.display = "none"), 300);
        }
      });
    });
  });

  // ----------------------------------------------------------
  // Copy Email to Clipboard — with visual icon swap
  // ----------------------------------------------------------
  const copyBtn     = document.getElementById("copy-email-btn");
  const emailEl     = document.getElementById("email-address");
  const toast       = document.getElementById("clipboard-toast");
  const copyDefault = copyBtn.querySelector(".copy-icon-default");
  const copySuccess = copyBtn.querySelector(".copy-icon-success");
  let copyTimeout   = null;

  copyBtn.addEventListener("click", () => {
    const emailText = emailEl.textContent.trim();

    navigator.clipboard.writeText(emailText).then(() => {
      // Swap icons
      copyDefault.style.display = "none";
      copySuccess.style.display = "block";
      copyBtn.style.color = "var(--secondary)";

      // Show toast
      toast.classList.add("show");

      // Reset after 3 seconds
      clearTimeout(copyTimeout);
      copyTimeout = setTimeout(() => {
        toast.classList.remove("show");
        copyDefault.style.display = "block";
        copySuccess.style.display = "none";
        copyBtn.style.color = "";
      }, 3000);
    }).catch(() => {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = emailText;
      ta.style.cssText = "position:fixed;top:-9999px;left:-9999px;opacity:0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try { document.execCommand("copy"); } catch (_) {}
      document.body.removeChild(ta);

      copyDefault.style.display = "none";
      copySuccess.style.display = "block";
      toast.classList.add("show");

      clearTimeout(copyTimeout);
      copyTimeout = setTimeout(() => {
        toast.classList.remove("show");
        copyDefault.style.display = "block";
        copySuccess.style.display = "none";
      }, 3000);
    });
  });

  // ----------------------------------------------------------
  // Project Modals
  // ----------------------------------------------------------
  const modalOverlay    = document.getElementById("project-modal");
  const modalBodyContent = document.getElementById("modal-body-content");
  const modalClose      = document.getElementById("modal-close");

  document.querySelectorAll(".read-more-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const projectKey = btn.getAttribute("data-project");
      const project = projectsData[projectKey];

      if (project) {
        const badgesHtml   = project.tech.map(t => `<span class="tech-badge">${t}</span>`).join("");
        const featuresHtml = project.features.map(f => `<li>${f}</li>`).join("");

        modalBodyContent.innerHTML = `
          <div class="modal-role-badge">${project.role}</div>
          <h2 id="modal-title" class="timeline-title" style="font-size:1.8rem;margin-bottom:0.5rem;">${project.title}</h2>
          <div class="modal-tech-stack">${badgesHtml}</div>

          <div class="modal-problem-block">
            <strong>Problem solved:</strong> ${project.problem}
          </div>

          <p class="timeline-desc" style="font-size:1.05rem;margin-bottom:1.5rem;line-height:1.7;">${project.summary}</p>

          <h3 class="modal-section-title">Core Implementation Details</h3>
          <ul class="modal-features-list">${featuresHtml}</ul>

          <h3 class="modal-section-title">System Architecture</h3>
          <p class="timeline-desc" style="line-height:1.7;">${project.architecture}</p>
        `;

        modalOverlay.classList.add("open");
        document.body.style.overflow = "hidden";
        modalClose.focus();
      }
    });
  });

  function closeModal() {
    modalOverlay.classList.remove("open");
    document.body.style.overflow = "auto";
  }

  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", e => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });

  // ----------------------------------------------------------
  // Contact Form — EmailJS Integration (real sending)
  // ----------------------------------------------------------
  const contactForm   = document.getElementById("portfolio-contact-form");
  const formStatus    = document.getElementById("form-status");
  const submitBtn     = document.getElementById("form-submit-btn");
  const submitText    = submitBtn.querySelector(".btn-submit-text");
  const submitLoading = submitBtn.querySelector(".btn-submit-loading");

  function setFormLoading(loading) {
    submitBtn.disabled = loading;
    submitText.style.display    = loading ? "none" : "inline";
    submitLoading.style.display = loading ? "inline-flex" : "none";
    submitBtn.style.opacity     = loading ? "0.75" : "1";
  }

  function showStatus(type, message) {
    formStatus.textContent  = message;
    formStatus.className    = `form-status ${type}`;
    formStatus.style.display = "block";
  }

  function validateForm(name, email, subject, message, honey) {
    if (honey && honey.trim() !== "") return null; // Honeypot triggered
    if (!name    || name.trim().length    < 2)  return "Please enter your full name (at least 2 characters).";
    if (!email   || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address.";
    if (!subject || subject.trim().length < 3)  return "Please enter a subject (at least 3 characters).";
    if (!message || message.trim().length < 10) return "Your message is too short. Please add more detail.";
    return null;
  }

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name    = document.getElementById("form-name").value;
    const email   = document.getElementById("form-email").value;
    const subject = document.getElementById("form-subject").value;
    const message = document.getElementById("form-message").value;
    const honey   = contactForm.querySelector('[name="_honey"]')?.value || "";

    // Client-side validation
    const validationError = validateForm(name, email, subject, message, honey);
    if (validationError) {
      showStatus("error", validationError);
      return;
    }

    setFormLoading(true);
    formStatus.style.display = "none";

    // Check if EmailJS is properly configured
    if (typeof emailjs === "undefined" || EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
      // Fallback: open mailto link so recruiter contact still works
      setFormLoading(false);
      showStatus(
        "error",
        "Email service not configured yet. Please reach out directly at ahmedaboelresh2004@gmail.com"
      );
      return;
    }

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name:   name.trim(),
        from_email:  email.trim(),
        subject:     subject.trim(),
        message:     message.trim(),
        to_email:    "ahmedaboelresh2004@gmail.com",
        reply_to:    email.trim()
      });

      setFormLoading(false);
      showStatus("success", "✓ Message sent successfully! I will get back to you within 24 hours.");
      contactForm.reset();

      setTimeout(() => {
        formStatus.style.display = "none";
      }, 8000);

    } catch (err) {
      setFormLoading(false);
      console.error("EmailJS error:", err);
      showStatus(
        "error",
        "Something went wrong sending your message. Please email me directly at ahmedaboelresh2004@gmail.com"
      );
    }
  });

  // ----------------------------------------------------------
  // Terminal Typing Animation
  // ----------------------------------------------------------
  const terminalBody = document.getElementById("terminal-body");

  const terminalScript = [
    { type: "input",  text: "whoami" },
    { type: "output", text: "ahmedsaad\nRole: Backend Developer & PHP/Laravel Specialist\nLocation: Cairo, Egypt" },
    { type: "input",  text: "cat skills.json" },
    { type: "output", text: JSON.stringify({
        core:            "PHP 8, Laravel",
        database:        "MySQL, PostgreSQL",
        caching_queues:  "Redis, Background Jobs",
        testing:         "PHPUnit"
      }, null, 2), class: "output-cyan" },
    { type: "input",  text: "php artisan test" },
    { type: "output", text: "PASS  Tests\\Unit\\CleanArchitectureTest\nPASS  Tests\\Feature\\SecureSignatureApiTest\n\nTests:  12 passed (28 assertions)\nTime:   0.84s\nMemory: 16.00 MB", class: "output-green" },
    { type: "input",  text: "echo $STATUS" },
    { type: "output", text: "Ready to build next-generation backend systems.", class: "output-blue" }
  ];

  let scriptIndex = 0;

  function runTerminalScript() {
    if (scriptIndex >= terminalScript.length) {
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

      const textSpan   = inputLine.querySelector(".typed-text");
      const cursorSpan = inputLine.querySelector(".cursor");
      let charIndex    = 0;

      function typeChar() {
        if (charIndex < currentItem.text.length) {
          textSpan.textContent += currentItem.text.charAt(charIndex);
          charIndex++;
          terminalBody.scrollTop = terminalBody.scrollHeight;
          setTimeout(typeChar, 80);
        } else {
          cursorSpan.remove();
          scriptIndex++;
          setTimeout(runTerminalScript, 400);
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
      setTimeout(runTerminalScript, 800);
    }
  }

  setTimeout(runTerminalScript, 1000);
});

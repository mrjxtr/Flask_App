// DOM Content Loaded Event Listener
document.addEventListener("DOMContentLoaded", initializeApp);

/**
 * Initialize the application
 */
function initializeApp() {
  setupSmoothScrolling();
  setupFormValidation();
  setupMobileNavigation();
}

/**
 * Setup smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", handleSmoothScroll);
  });
}

/**
 * Handle smooth scrolling
 * @param {Event} e - Click event
 */
function handleSmoothScroll(e) {
  e.preventDefault();
  const targetId = this.getAttribute("href");
  const target = document.querySelector(targetId);
  
  if (target) {
    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

/**
 * Setup form validation
 */
function setupFormValidation() {
  document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", validateForm);
  });
}

/**
 * Validate form submissions
 * @param {Event} e - Form submission event
 */
function validateForm(e) {
  const form = e.target;
  const requiredFields = form.querySelectorAll("[required]");
  const errors = [];

  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      field.classList.add("error");
      errors.push(`${field.name || 'Field'} is required`);
    } else {
      field.classList.remove("error");
    }
  });

  if (errors.length > 0) {
    e.preventDefault();
    alert(errors.join('\n'));
  }
}

/**
 * Setup mobile navigation
 */
function setupMobileNavigation() {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("nav ul");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("active");
      navToggle.classList.toggle("active");
    });
  }
}

// Handle responsive behavior
window.addEventListener("resize", debounce(() => {
  if (window.innerWidth > 768) {
    document.querySelector("nav ul")?.classList.remove("active");
    document.querySelector(".nav-toggle")?.classList.remove("active");
  }
}, 250));

/**
 * Debounce function for resize event
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

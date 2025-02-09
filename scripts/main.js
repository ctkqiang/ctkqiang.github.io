// Intersection Observer for animations
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".section").forEach(section => {
  observer.observe(section);
});

// Navbar hide on scroll
let lastScroll = 0;
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll && currentScroll > 100) {
    header.classList.add("hidden");
  } else {
    header.classList.remove("hidden");
  }
  lastScroll = currentScroll;
});

// Language switching logic
function updateContent(language) {
  // Update HTML lang attribute
  document.documentElement.lang = language;

  // Update all translatable elements
  document
    .querySelectorAll("[data-lang-en], [data-lang-zh]")
    .forEach(element => {
      const content = element.getAttribute(`data-lang-${language}`);
      if (!content) return;

      if (element.tagName === "META") {
        element.setAttribute("content", content);
      } else if (element.tagName === "TITLE") {
        document.title = content;
      } else if (element.tagName === "A" && element.id === "resume-button") {
        const resumePaths = {
          en: "./assets/Cheng_Tze_Keong_Resume.pdf",
          zh: "./assets/高级全栈开发工程师_钟智强.pdf"
        };
        element.href = resumePaths[language];
        element.querySelector("span:last-child").textContent = content;
      } else {
        element.textContent = content;
      }
    });

  // Store the selected language
  localStorage.setItem("preferred-language", language);
}

// Initialize language settings
function initializeLanguage() {
  const languageSelector = document.getElementById("language-selector");
  if (!languageSelector) return;

  // Get preferred language
  const savedLanguage = localStorage.getItem("preferred-language");
  const browserLanguage = navigator.language.toLowerCase().startsWith("zh")
    ? "zh"
    : "en";
  const defaultLanguage = savedLanguage || browserLanguage;

  // Set initial language
  languageSelector.value = defaultLanguage;
  updateContent(defaultLanguage);

  // Add change event listener
  languageSelector.addEventListener("change", e => {
    updateContent(e.target.value);
  });
}

// Wait for DOM to be fully loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeLanguage);
} else {
  initializeLanguage();
}
// 在语言切换函数中添加
document.addEventListener("DOMContentLoaded", function() {
  const languageSelector = document.getElementById("language-selector");
  const resumeButton = document.getElementById("resume-button");

  // Function to update resume link based on selected language
  function updateResumeLink(language) {
    if (resumeButton) {
      const resumePath =
        language === "zh"
          ? resumeButton.getAttribute("data-zh-resume")
          : resumeButton.getAttribute("data-en-resume");
      resumeButton.href = resumePath;
    }
  }

  // Update resume link when language changes
  languageSelector.addEventListener("change", function(e) {
    updateResumeLink(e.target.value);
  });

  // Set initial resume link based on default language
  updateResumeLink(languageSelector.value);
});

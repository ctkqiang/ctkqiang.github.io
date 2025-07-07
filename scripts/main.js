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
  if (language === "ja") {
    window.location.href = "/pages/no-jap.html";
    return;
  }

  // Update HTML lang attribute
  document.documentElement.lang = language;

  // Update all translatable elements
  document
    .querySelectorAll(
      "[data-lang-en], [data-lang-zh], [data-lang-ru], [data-lang-de], [data-lang-ko]"
    )
    .forEach(element => {
      const content = element.getAttribute(`data-lang-${language}`);
      if (!content) return;

      if (element.tagName === "META") {
        element.setAttribute("content", content);
      } else if (element.tagName === "TITLE") {
        document.title = content;
      } else if (element.tagName === "A" && element.id === "resume-button") {
        const resumePaths = {
          en: "./assets/CHENG_TZE_KEONG_RESUME.pdf",
          zh: "./assets/高级全栈开发工程师_钟智强.pdf",
          ru: "./assets/CHENG_TZE_KEONG_RESUME_RU.pdf",
          de: "./assets/CHENG_TZE_KEONG_RESUME_DE.pdf",
          ko: "./assets/CHENG_TZE_KEONG_RESUME_KO.pdf"
        };
        element.href = resumePaths[language] || resumePaths.en;
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
  document
    .getElementById("language-selector")
    .addEventListener("change", function(e) {
      const selectedLang = e.target.value;

      if (selectedLang === "ja") {
        document.body.innerHTML = `
            <div style="
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                flex-direction: column;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                text-align: center;
                padding: 20px;
            ">
                <img src="./assets/466814271_940006101310145_6152385849733212408_n.jpg" 
                     alt="Logo" 
                     style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 20px;">
                <h1 style="color: #333; margin-bottom: 15px; font-size: 28px;">申し訳ありません</h1>
                <p style="color: #666; margin-bottom: 20px; font-size: 16px;">日本語版は現在準備中です。</p>
                <p style="color: #888; margin-bottom: 30px; font-size: 14px;">Please check back later or select another language.</p>
                <div style="display: flex; gap: 15px;">
                    <a href="?" style="
                        text-decoration: none;
                        color: #fff;
                        background-color: #007bff;
                        padding: 10px 20px;
                        border-radius: 5px;
                        transition: background-color 0.3s;
                        font-size: 14px;
                    ">← ホームに戻る</a>
                    <a href="mailto:johnmelodymel@qq.com" style="
                        text-decoration: none;
                        color: #007bff;
                        border: 1px solid #007bff;
                        padding: 10px 20px;
                        border-radius: 5px;
                        transition: all 0.3s;
                        font-size: 14px;
                    ">お問い合わせ</a>
                </div>
            </div>
        `;
        return;
      }

      // Regular language switching logic for other languages
      document.querySelectorAll("[data-lang-en]").forEach(element => {
        const content = element.getAttribute(`data-lang-${selectedLang}`);
        if (content) {
          if (element.tagName === "META") {
            element.setAttribute("content", content);
          } else {
            element.textContent = content;
          }
        }
      });
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

// Mobile menu functionality
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navContainer = document.querySelector(".nav-container");

mobileMenuToggle.addEventListener("click", () => {
  mobileMenuToggle.classList.toggle("active");
  navContainer.classList.toggle("active");
});

// Close mobile menu when clicking a link
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenuToggle.classList.remove("active");
    navContainer.classList.remove("active");
  });
});

// Close mobile menu when clicking outside

const servicePrices = {
  "web-scraping": {
    basic: 800,
    title: {
      en: "Web Scraping & Crawling",
      zh: "网页抓取和爬虫"
    },
    features: {
      basic: {
        en: [
          "Single website scraping",
          "Basic data extraction",
          "CSV export",
          "1 week support"
        ],
        zh: ["单个网站抓取", "基础数据提取", "CSV导出", "1周技术支持"]
      },
      dev: {
        en: [
          "Multiple websites",
          "Advanced data parsing",
          "Multiple export formats",
          "API integration",
          "1 month support"
        ],
        zh: ["多个网站抓取", "高级数据解析", "多种导出格式", "API集成", "1个月技术支持"]
      }
    }
  },
  "ai-model": {
    basic: 7000,
    title: {
      en: "AI Model Development",
      zh: "AI模型开发"
    },
    features: {
      basic: {
        en: [
          "Basic model training",
          "Single task solution",
          "Standard accuracy",
          "Basic documentation"
        ],
        zh: ["基础模型训练", "单一任务解决方案", "标准精度", "基础文档"]
      },
      dev: {
        en: [
          "Custom model architecture",
          "Multi-task solution",
          "High accuracy",
          "Model optimization",
          "Comprehensive documentation"
        ],
        zh: ["自定义模型架构", "多任务解决方案", "高精度", "模型优化", "完整文档"]
      }
    }
  },
  "mobile-app": {
    basic: 5000,
    title: {
      en: "Mobile App Development",
      zh: "移动应用开发"
    },
    features: {
      basic: {
        en: [
          "Single platform (Android/iOS)",
          "Basic UI/UX",
          "Essential features",
          "3 months support"
        ],
        zh: ["单平台(安卓/苹果)", "基础界面设计", "基本功能", "3个月技术支持"]
      },
      dev: {
        en: [
          "Cross-platform",
          "Premium UI/UX",
          "Advanced features",
          "API integration",
          "6 months support"
        ],
        zh: ["跨平台开发", "高级界面设计", "进阶功能", "API集成", "6个月技术支持"]
      }
    }
  },
  website: {
    basic: 1500,
    title: {
      en: "Website Development",
      zh: "网站开发"
    },
    features: {
      basic: {
        en: [
          "5 pages",
          "Responsive design",
          "Basic SEO",
          "Contact form",
          "2 months support"
        ],
        zh: ["5个页面", "响应式设计", "基础SEO", "联系表单", "2个月技术支持"]
      },
      dev: {
        en: [
          "Unlimited pages",
          "Advanced SEO",
          "CMS integration",
          "E-commerce ready",
          "6 months support"
        ],
        zh: ["无限页面", "高级SEO", "CMS集成", "电商功能", "6个月技术支持"]
      }
    }
  }
};

// Language handling
function updateServiceLanguage(language) {
  document
    .querySelectorAll("[data-lang-en], [data-lang-zh]")
    .forEach(element => {
      const content = element.getAttribute(`data-lang-${language}`);
      if (content) {
        element.textContent = content;
      }
    });
}

// Update showPricingModal function
function showPricingModal(service) {
  const modal = document.getElementById("pricing-modal");
  const currentLang = document.documentElement.lang || "en";

  if (currentLang === "ja") {
    window.location.href = "./no-jap.html";
    return;
  }

  const basic = servicePrices[service].basic;
  const dev = basic * 1.2;
  const features = servicePrices[service].features;

  // Set modal title
  document.getElementById("modal-title").textContent =
    servicePrices[service].title[currentLang];

  // Set prices
  document.getElementById("basic-price").textContent = `¥${basic}`;
  document.getElementById("dev-price").textContent = `¥${dev}`;

  // Set features lists
  const basicFeaturesList = document.getElementById("basic-features");
  const devFeaturesList = document.getElementById("dev-features");

  basicFeaturesList.innerHTML = features.basic[currentLang]
    .map(feature => `<li>✓ ${feature}</li>`)
    .join("");

  devFeaturesList.innerHTML = features.dev[currentLang]
    .map(feature => `<li>✓ ${feature}</li>`)
    .join("");

  // Show modal and prevent body scroll
  modal.style.display = "block";
  document.body.style.overflow = "hidden";

  // Close modal handlers
  const closeModal = () => {
    modal.style.display = "none";
    document.body.style.overflow = "";
  };

  document.querySelector(".close-modal").onclick = closeModal;

  // Close on outside click
  modal.onclick = e => {
    if (e.target === modal) closeModal();
  };

  // Handle touch events for mobile
  let touchStartY = 0;
  modal.addEventListener(
    "touchstart",
    e => {
      touchStartY = e.touches[0].clientY;
    },
    { passive: true }
  );

  modal.addEventListener(
    "touchmove",
    e => {
      const touchY = e.touches[0].clientY;
      const modalContent = modal.querySelector(".modal-content");
      const isAtTop = modalContent.scrollTop === 0;
      const isAtBottom =
        modalContent.scrollHeight - modalContent.scrollTop ===
        modalContent.clientHeight;

      // Prevent pull-to-refresh when at the top of the modal
      if (isAtTop && touchY > touchStartY) {
        e.preventDefault();
      }
      // Prevent overscroll when at the bottom of the modal
      if (isAtBottom && touchY < touchStartY) {
        e.preventDefault();
      }
    },
    { passive: false }
  );
}

function selectPlan(plan) {
  const currentLang = document.documentElement.lang || "en";
  const service = document.querySelector("#modal-title").textContent;

  const subject = encodeURIComponent(
    currentLang === "en"
      ? `Service Inquiry: ${service} - ${plan.charAt(0).toUpperCase() +
          plan.slice(1)} Plan`
      : `服务咨询：${service} - ${plan === "basic" ? "基础" : "开发者"}方案`
  );

  const body = encodeURIComponent(
    currentLang === "en"
      ? `Hi, I'm interested in the ${plan} plan for ${service}. Please contact me with more details.`
      : `您好，我对${service}的${plan === "basic" ? "基础" : "开发者"}方案感兴趣。请与我联系以了解更多详情。`
  );

  window.location.href = `mailto:johnmelodymel@qq.com?subject=${subject}&body=${body}`;

  const message =
    currentLang === "en"
      ? "Thank you for your interest! We will contact you soon."
      : "感谢您的关注！我们会尽快联系您。";

  console.log(message);
  document.getElementById("pricing-modal").remove();
}

// Initialize language on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = localStorage.getItem("preferred-language") || "en";
  document.documentElement.lang = savedLanguage;
  updateServiceLanguage(savedLanguage);
});

// Listen for language changes
const languageSelector = document.getElementById("language-selector");
if (languageSelector) {
  languageSelector.value = document.documentElement.lang || "en";
  languageSelector.addEventListener("change", e => {
    const selectedLang = e.target.value;
    document.documentElement.lang = selectedLang;
    updateServiceLanguage(selectedLang);
    localStorage.setItem("preferred-language", selectedLang);
  });
}

function updateServiceLanguage(language) {
  if (language === "ja") {
    window.location.href = "./no-jap.html";
    return;
  }

  document
    .querySelectorAll(
      "[data-lang-en], [data-lang-zh], [data-lang-ru], [data-lang-de], [data-lang-ko]"
    )
    .forEach(element => {
      const content = element.getAttribute(`data-lang-${language}`);
      if (content) {
        element.textContent = content;
      }
    });
}

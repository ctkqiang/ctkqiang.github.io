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
  const modal = document.createElement("div");
  modal.id = "pricing-modal";
  modal.className =
    "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center";

  const currentLang = document.documentElement.lang || "en";
  const basic = servicePrices[service].basic;
  const dev = basic * 1.2;
  const features = servicePrices[service].features;

  modal.innerHTML = `
        <div class="bg-gray-900 rounded-lg p-8 max-w-4xl w-11/12 relative border border-orange-500">
          <button class="absolute top-4 right-4 text-gray-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          
          <h2 class="text-2xl font-bold text-orange-500 mb-6">${servicePrices[
            service
          ].title[currentLang]}</h2>
          
          <div class="grid md:grid-cols-3 gap-6">
            <div class="bg-gray-800 p-6 rounded-lg border border-orange-500/30 hover:border-orange-500 transition-all">
              <h3 class="text-xl font-semibold text-white mb-4">${currentLang ===
              "en"
                ? "Basic Plan"
                : "基础方案"}</h3>
              <p class="text-3xl font-bold text-orange-500 mb-4">¥${basic}</p>
              <ul class="text-gray-300 mb-6 text-left text-sm">
                ${features.basic[currentLang]
                  .map(feature => `<li class="mb-2">✓ ${feature}</li>`)
                  .join("")}
              </ul>
              <button onclick="selectPlan('basic')" class="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors">
                ${currentLang === "en" ? "Select" : "选择"}
              </button>
            </div>
            
            <div class="bg-gray-800 p-6 rounded-lg border border-orange-500/30 hover:border-orange-500 transition-all">
              <h3 class="text-xl font-semibold text-white mb-4">${currentLang ===
              "en"
                ? "Developer Plan"
                : "开发者方案"}</h3>
              <p class="text-3xl font-bold text-orange-500 mb-4">¥${dev}</p>
              <ul class="text-gray-300 mb-6 text-left text-sm">
                ${features.dev[currentLang]
                  .map(feature => `<li class="mb-2">✓ ${feature}</li>`)
                  .join("")}
              </ul>
              <button onclick="selectPlan('dev')" class="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors">
                ${currentLang === "en" ? "Select" : "选择"}
              </button>
            </div>
            
            <div class="bg-gray-800 p-6 rounded-lg border border-orange-500/30 hover:border-orange-500 transition-all">
              <h3 class="text-xl font-semibold text-white mb-4">${currentLang ===
              "en"
                ? "Custom Plan"
                : "定制方案"}</h3>
              <p class="text-lg text-gray-400 mb-4">${currentLang === "en"
                ? "Custom solutions tailored to your needs"
                : "根据您的需求定制解决方案"}</p>
              <ul class="text-gray-300 mb-6 text-left text-sm">
                <li class="mb-2">✓ ${currentLang === "en"
                  ? "Custom requirements"
                  : "自定义需求"}</li>
                <li class="mb-2">✓ ${currentLang === "en"
                  ? "Priority support"
                  : "优先支持"}</li>
                <li class="mb-2">✓ ${currentLang === "en"
                  ? "Flexible timeline"
                  : "灵活时间表"}</li>
                <li class="mb-2">✓ ${currentLang === "en"
                  ? "Dedicated team"
                  : "专属团队"}</li>
              </ul>
              <a href="mailto:johnmelodymel@qq.com" class="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded text-center transition-colors">
                ${currentLang === "en" ? "Contact" : "联系我们"}
              </a>
            </div>
          </div>
        </div>
      `;

  document.body.appendChild(modal);

  // Close button handler
  modal.querySelector("button").onclick = () => {
    modal.remove();
  };

  // Click outside to close
  modal.onclick = event => {
    if (event.target === modal) {
      modal.remove();
    }
  };
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

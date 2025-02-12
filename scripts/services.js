const servicePrices = {
  "web-scraping": {
    basic: 800,
    title: {
      en: "Web Scraping & Crawling",
      zh: "网页抓取和爬虫"
    }
  },
  "ai-model": {
    basic: 7000,
    title: {
      en: "AI Model Development",
      zh: "AI模型开发"
    }
  },
  "mobile-app": {
    basic: 5000,
    title: {
      en: "Mobile App Development",
      zh: "移动应用开发"
    }
  },
  website: {
    basic: 1500,
    title: {
      en: "Website Development",
      zh: "网站开发"
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

  const currencySymbol = "¥";
  const selectText = currentLang === "en" ? "Select" : "选择";
  const contactText = currentLang === "en" ? "Contact" : "联系我们";
  const basicPlanText = currentLang === "en" ? "Basic Plan" : "基础方案";
  const devPlanText = currentLang === "en" ? "Developer Plan" : "开发者方案";
  const customPlanText = currentLang === "en" ? "Custom Plan" : "定制方案";
  const contactPricingText =
    currentLang === "en" ? "Contact for pricing" : "联系获取报价";

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
                ? "Contact for pricing"
                : "联系获取报价"}</p>
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

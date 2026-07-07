document.addEventListener("DOMContentLoaded", function () {
  // Array of your local ad objects
  const ads = [
    {
      image: "images/ad1.jpg",
      url: "https://example.com/sponsor-1",
    },
    {
      image: "images/ad2.jpg",
      url: "https://example.com/sponsor-2",
    },
    {
      image: "images/ad3.jpg",
      url: "https://example.com/sponsor-3",
    },
  ];

  // Pick a random ad index
  const randomIndex = Math.floor(Math.random() * ads.length);
  const selectedAd = ads[randomIndex];

  // Inject into the HTML elements
  const adImage = document.getElementById("ad-image");
  const adLink = document.getElementById("ad-link");

  if (selectedAd && adImage && adLink) {
    adImage.src = selectedAd.image;
    adLink.href = selectedAd.url;
  }
});

// Initialize Google Translate
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "bn",
      includedLanguages: "bn,en",
      autoDisplay: false,
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    },
    "google_translate_element",
  );
}

// Load Google Translate script
(function () {
  const script = document.createElement("script");
  script.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);
})();

// Translate function
function translatePage(lang) {
  document.cookie = `googtrans=/bn/${lang};path=/`;
  document.cookie = `googtrans=/bn/${lang};domain=${location.hostname};path=/`;

  location.reload();
}

document.addEventListener("DOMContentLoaded", function () {
  const enBtn = document.getElementById("translate-to-en");
  const bnBtn = document.getElementById("translate-to-bn");

  if (enBtn) {
    enBtn.addEventListener("click", function (e) {
      e.preventDefault();
      translatePage("en");
    });
  }

  if (bnBtn) {
    bnBtn.addEventListener("click", function (e) {
      e.preventDefault();
      translatePage("bn");
    });
  }
});

$(document).ready(function () {
  var dropdown_menu_open = false;
  var click_allow = true;

  // Target your exact trigger button wrapper
  $(".dropdownAllMenuBut").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (click_allow) {
      click_allow = false;

      if (dropdown_menu_open) {
        $(".all-menu").slideUp(300);
        dropdown_menu_open = false;
      } else {
        $(".all-menu").slideDown(300);
        dropdown_menu_open = true;
      }

      var menuClickInterval = setInterval(function () {
        click_allow = true;
        clearInterval(menuClickInterval);
      }, 400);
    }
  });

  // Close the panel if user clicks anywhere else on the screen
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".all-menu, .dropdownAllMenuBut").length) {
      if (dropdown_menu_open) {
        $(".all-menu").slideUp(200);
        dropdown_menu_open = false;
      }
    }
  });
});

function updateDynamicDates() {
  const now = new Date();

  // Options for the English Top Bar date
  const enOptions = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  let enDateStr = now.toLocaleDateString("en-US", enOptions);
  enDateStr = enDateStr.replace(
    /([A-Za-z]+), ([A-Za-z]+) (\d+), (\d+)/,
    "$1, $3 $2, $4",
  );

  // Options for the Bengali Sticky Brand & Mega Menu dates
  const bnOptions = {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  const bnDateStr = now.toLocaleDateString("bn-BD", bnOptions);

  const bnDayName = now.toLocaleDateString("bn-BD", { weekday: "long" });
  const bnFullDate = now.toLocaleDateString("bn-BD", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // 1. Update English Top Bar Date safely (preserves your inner calendar icon node)
  const topBarDateEl = document.getElementById("top-bar-date");
  if (topBarDateEl) {
    Array.from(topBarDateEl.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        node.remove();
      }
    });
    topBarDateEl.appendChild(document.createTextNode(enDateStr));
  }

  // 2. Update Sticky Brand Block (Dual-line Bengali layout)
  const stickyDayEl = document.getElementById("sticky-day");
  const stickyDateEl = document.getElementById("sticky-date");
  if (stickyDayEl && stickyDateEl) {
    stickyDayEl.textContent = bnDayName;
    stickyDateEl.textContent = bnFullDate;
  }

  // 3. Update Mega Menu Panel Bengali Date
  const megaMenuDateEl = document.querySelector(
    ".all-mega-menu-panel .text-danger",
  );
  if (megaMenuDateEl) {
    megaMenuDateEl.textContent = bnDateStr;
  }
}

function handleScrollVisibility() {
  let lastScrollTop = 0;
  const brandBlock = document.getElementById("scroll-brand-block");
  const scrollThreshold = 150;

  if (!brandBlock) return;

  window.addEventListener("scroll", function () {
    const brandBlock = document.getElementById("scroll-brand-block");

    if (window.scrollY > 180) {
      brandBlock.classList.remove("d-none");
    } else {
      brandBlock.classList.add("d-none");
    }
  });
}

// Initialize both UI automation loops safely on layout ready window hooks
document.addEventListener("DOMContentLoaded", function () {
  updateDynamicDates();
  handleScrollVisibility();
});

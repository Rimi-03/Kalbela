document.addEventListener("DOMContentLoaded", function () {
  // Array of your local ad objects
  const ads = [
    { image: "assests/images/ad1.jpg" },
    { image: "assests/images/ad1.avif" },
    { image: "assests/images/ad2.jpg" },
    { image: "assests/images/ad3.jpg" },
    { image: "assests/images/ad4.jpg" },
    { image: "assests/images/ad5.jpeg" },
    { image: "assests/images/ad6.jpg" },
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
  // const stickyDayEl = document.getElementById("sticky-day");
  const stickyDateEl = document.getElementById("sticky-date");
  if (stickyDateEl) {
    // stickyDayEl.textContent = bnDayName;
    stickyDateEl.textContent = bnFullDate;
  }

  // 3. Update Mega Menu Panel Bengali Date
  const megaMenuDateEl = document.querySelector(
    ".all-mega-menu-panel .text-dark",
  );
  if (megaMenuDateEl) {
    megaMenuDateEl.textContent = bnDateStr;
  }
}

//slider function for top main head
document.addEventListener("DOMContentLoaded", () => {
  const prevBtn = document.querySelector(".slider-nav .prev-btn");
  const nextBtn = document.querySelector(".slider-nav .next-btn");
  const tabs = document.querySelectorAll("#storiesTab .tab-btn");
  const panels = document.querySelectorAll(".tab-panel-stories");

  // Helper function to find the visible/active container
  function getActiveSlider() {
    const activePanel = Array.from(panels).find(
      (panel) => panel.style.display !== "none",
    );
    return activePanel ? activePanel.querySelector(".stories-slider") : null;
  }

  // Update visibility flags dynamically
  function updateNavButtons() {
    const slider = getActiveSlider();
    if (!slider) return;

    const scrollLeft = slider.scrollLeft;
    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

    // Left conditions: Hide if fully scrolled to start
    if (scrollLeft <= 2) {
      prevBtn.classList.add("d-none");
    } else {
      prevBtn.classList.remove("d-none");
    }

    // Right conditions: Hide if fully scrolled to end
    if (scrollLeft >= maxScrollLeft - 2) {
      nextBtn.classList.add("d-none");
    } else {
      nextBtn.classList.remove("d-none");
    }
  }

  // Button Click Events
  nextBtn.addEventListener("click", () => {
    const slider = getActiveSlider();
    if (slider) {
      slider.scrollBy({ left: 240, behavior: "smooth" });
    }
  });

  prevBtn.addEventListener("click", () => {
    const slider = getActiveSlider();
    if (slider) {
      slider.scrollBy({ left: -240, behavior: "smooth" });
    }
  });

  // Watch programmatic changes or manual finger swiping
  document.querySelectorAll(".stories-slider").forEach((slider) => {
    slider.addEventListener("scroll", updateNavButtons);
  });

  // Handle Tab Swapping and Navigation Re-evaluation
  tabs.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      // 1. Reset active classes on tabs and parent elements
      tabs.forEach((t) => {
        t.classList.remove("active");
        const parentLi = t.closest(".nav-item");
        if (parentLi) parentLi.classList.remove("active");
      });

      // 2. Set active class on clicked tab items
      btn.classList.add("active");
      const currentParentLi = btn.closest(".nav-item");
      if (currentParentLi) currentParentLi.classList.add("active");

      // 3. Toggle panel views
      const targetId = currentParentLi
        ? currentParentLi.getAttribute("data-id")
        : "";
      panels.forEach((panel) => {
        if (panel.getAttribute("data") === `${targetId}-view`) {
          panel.style.display = "block";
        } else {
          panel.style.display = "none";
        }
      });

      // 4. Update arrows once the panel layouts adjust
      setTimeout(updateNavButtons, 50);
    });
  });

  // Initial Check on Load
  window.addEventListener("resize", updateNavButtons);
  setTimeout(updateNavButtons, 200);
});

//video slider
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".video-slider-track");
  const prevBtn = document.querySelector(".video-prev-btn");
  const nextBtn = document.querySelector(".video-next-btn");

  if (!track || !prevBtn || !nextBtn) return;

  function updateVideoButtons() {
    const scrollLeft = track.scrollLeft;
    const maxScrollLeft = track.scrollWidth - track.clientWidth;

    if (scrollLeft <= 2) {
      prevBtn.classList.add("d-none");
    } else {
      prevBtn.classList.remove("d-none");
    }

    if (scrollLeft >= maxScrollLeft - 2) {
      nextBtn.classList.add("d-none");
    } else {
      nextBtn.classList.remove("d-none");
    }
  }

  nextBtn.addEventListener("click", () => {
    track.scrollBy({ left: track.clientWidth / 2, behavior: "smooth" });
  });

  prevBtn.addEventListener("click", () => {
    track.scrollBy({ left: -track.clientWidth / 2, behavior: "smooth" });
  });

  track.addEventListener("scroll", updateVideoButtons);
  window.addEventListener("resize", updateVideoButtons);
  setTimeout(updateVideoButtons, 200);
});

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

document.addEventListener("DOMContentLoaded", () => {
  // ===== LEAD CAROUSEL (Existing) =====
  const carouselEl = document.getElementById("leadCarousel");
  const captionEl = document.getElementById("leadCaption");
  const thumbStrip = document.getElementById("thumbStrip");

  if (carouselEl && captionEl) {
    // Synchronize Overlayed Text Strings on Slide Event Loops
    carouselEl.addEventListener("slide.bs.carousel", (event) => {
      const nextSlide = event.relatedTarget;
      const captionText = nextSlide.getAttribute("data-caption");
      if (captionText) {
        captionEl.textContent = captionText;
      }

      // Toggle Active States across Thumb Panel
      if (thumbStrip) {
        const index = event.to;
        const thumbs = thumbStrip.querySelectorAll(".gallery-mini-thumb");
        thumbs.forEach((thumb, i) => {
          if (i === index) {
            thumb.classList.add("active");
          } else {
            thumb.classList.remove("active");
          }
        });
      }
    });

    // Make thumbnails clickable to navigate the slider
    if (thumbStrip) {
      thumbStrip.addEventListener("click", (e) => {
        const targetThumb = e.target.closest(".gallery-mini-thumb");
        if (!targetThumb) return;

        const slideIndex = parseInt(
          targetThumb.getAttribute("data-slide-to"),
          10,
        );
        const carouselInstance =
          bootstrap.Carousel.getOrCreateInstance(carouselEl);
        carouselInstance.to(slideIndex);
      });
    }
  }

  // ===== OPINION WIDGET CAROUSEL (Updated) =====
  const opinionCarouselEl = document.getElementById("opinionCarousel");
  const opinionDots = document.querySelectorAll(".opinion-dot");

  if (opinionCarouselEl) {
    // Initialize carousel with auto-slide enabled
    const opinionCarousel = new bootstrap.Carousel(opinionCarouselEl, {
      interval: 5000,
      ride: "carousel",
      touch: true, // Enable touch support
    });

    let isAutoSliding = true;

    // Function to update dots
    function updateDots(activeIndex) {
      opinionDots.forEach((dot, index) => {
        if (index === activeIndex) {
          dot.style.backgroundColor = "#222";
          dot.classList.add("active");
        } else {
          dot.style.backgroundColor = "#d1d5db";
          dot.classList.remove("active");
        }
      });
    }

    // Update dots on slide start (for immediate feedback)
    opinionCarouselEl.addEventListener("slide.bs.carousel", (event) => {
      const activeIndex = event.to;
      updateDots(activeIndex);
    });

    // Update dots when slide completes (for reliability)
    opinionCarouselEl.addEventListener("slid.bs.carousel", (event) => {
      const activeIndex = event.to;
      updateDots(activeIndex);
    });

    // Also update on any carousel change (for touch/swipe)
    opinionCarouselEl.addEventListener("slid.bs.carousel", (event) => {
      const activeIndex = event.to;
      updateDots(activeIndex);
    });

    // Manual dot click - update visual state
    opinionDots.forEach((dot) => {
      dot.addEventListener("click", function () {
        const index = parseInt(this.getAttribute("data-slide-to"), 10);
        updateDots(index);

        // Reset auto-slide timer when user manually clicks
        if (isAutoSliding) {
          opinionCarousel.cycle();
        }
      });
    });

    // Toggle auto-slide on double click of any dot
    opinionDots.forEach((dot) => {
      dot.addEventListener("dblclick", function (e) {
        e.preventDefault();
        toggleAutoSlide();
      });
    });

    // Toggle function
    function toggleAutoSlide() {
      if (isAutoSliding) {
        opinionCarousel.pause();
        isAutoSliding = false;
        // Visual feedback - change dot colors to indicate paused state
        opinionDots.forEach((dot) => {
          dot.style.opacity = "0.5";
        });
      } else {
        opinionCarousel.cycle();
        isAutoSliding = true;
        opinionDots.forEach((dot) => {
          dot.style.opacity = "1";
        });
        // Reset active dot
        const activeIndex = opinionCarouselEl.querySelector(
          ".carousel-item.active",
        );
        const index = Array.from(
          opinionCarouselEl.querySelectorAll(".carousel-item"),
        ).indexOf(activeIndex);
        updateDots(index);
      }
    }

    // Keyboard shortcut: Press 'Space' to toggle
    document.addEventListener("keydown", (e) => {
      if (e.key === " " && document.activeElement?.closest(".opinion-widget")) {
        e.preventDefault();
        toggleAutoSlide();
      }
    });

    // MutationObserver to detect slide changes from any source (including touch)
    const observer = new MutationObserver(() => {
      const activeItem = opinionCarouselEl.querySelector(
        ".carousel-item.active",
      );
      if (activeItem) {
        const index = Array.from(
          opinionCarouselEl.querySelectorAll(".carousel-item"),
        ).indexOf(activeItem);
        updateDots(index);
      }
    });

    // Observe class changes on carousel items
    const carouselItems = opinionCarouselEl.querySelectorAll(".carousel-item");
    carouselItems.forEach((item) => {
      observer.observe(item, { attributes: true, attributeFilter: ["class"] });
    });
  }
});

const track = document.querySelector(".upcoming-scroll-track");
if (track) {
  track.innerHTML += track.innerHTML;
}

//calendar
document.addEventListener("DOMContentLoaded", function () {
  const monthSelect = document.getElementById("monthSelect");
  const yearSelect = document.getElementById("yearSelect");
  const calendarBody = document.getElementById("calendarBody");
  const editionButtons = document.querySelectorAll(".btn-arch");

  // State Management
  let currentEdition = "online-edition";
  const today = new Date();
  let selectedMonth = today.getMonth(); // 0-11
  let selectedYear = today.getFullYear();

  const bnNums = [
    "০০",
    "০১",
    "০২",
    "০৩",
    "০৪",
    "০৫",
    "০৬",
    "০৭",
    "০৮",
    "০৯",
    "১০",
    "১১",
    "১২",
    "১৩",
    "১৪",
    "১৫",
    "১৬",
    "১৭",
    "১৮",
    "১৯",
    "২০",
    "২১",
    "২২",
    "২৩",
    "২৪",
    "২৫",
    "২৬",
    "২৭",
    "২৮",
    "২৯",
    "৩০",
    "৩১",
  ];

  // Initialize Selectors
  monthSelect.value = selectedMonth;
  yearSelect.value = selectedYear;

  function generateCalendar(month, year) {
    calendarBody.innerHTML = "";

    // Day mapping where Saturday is index 0 to match calendar grid headers
    // JS defaults: Sun=0, Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Sat=6
    const firstDayIndexJS = new Date(year, month, 1).getDay();
    const firstDayIndex = (firstDayIndexJS + 1) % 7;

    const totalDays = new Date(year, month + 1, 0).getDate();

    let dateCounter = 1;
    let html = "";

    for (let i = 0; i < 6; i++) {
      // Max 6 rows
      let rowHtml = "<tr>";
      let addedAnyDate = false;

      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayIndex) {
          rowHtml += "<td></td>";
        } else if (dateCounter > totalDays) {
          rowHtml += "<td></td>";
        } else {
          addedAnyDate = true;
          const loopDate = new Date(year, month, dateCounter);
          const isFuture = loopDate > today;
          const isToday = loopDate.toDateString() === today.toDateString();

          const formattedMonth = String(month + 1).padStart(2, "0");
          const formattedDay = String(dateCounter).padStart(2, "0");
          const archiveUrl = `https://www.kalbela.com/archive/${currentEdition}/${year}/${formattedMonth}/${formattedDay}`;

          if (isFuture) {
            rowHtml += `<td><a href="javascript:" class="disabled">${bnNums[dateCounter]}</a></td>`;
          } else if (isToday) {
            rowHtml += `<td><a href="${archiveUrl}" class="active" target="_blank">${bnNums[dateCounter]}</a></td>`;
          } else {
            rowHtml += `<td><a href="${archiveUrl}" target="_blank">${bnNums[dateCounter]}</a></td>`;
          }
          dateCounter++;
        }
      }
      rowHtml += "</tr>";

      if (addedAnyDate) {
        html += rowHtml;
      }
    }
    calendarBody.innerHTML = html;
  }

  // Event Listeners for controls
  monthSelect.addEventListener("change", (e) => {
    selectedMonth = parseInt(e.target.value);
    generateCalendar(selectedMonth, selectedYear);
  });

  yearSelect.addEventListener("change", (e) => {
    selectedYear = parseInt(e.target.value);
    generateCalendar(selectedMonth, selectedYear);
  });

  editionButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      editionButtons.forEach((btn) => btn.classList.remove("active"));
      e.target.classList.add("active");
      currentEdition = e.target.getAttribute("data-type");
      generateCalendar(selectedMonth, selectedYear);
    });
  });

  // Initial Run
  generateCalendar(selectedMonth, selectedYear);
});

document.addEventListener("DOMContentLoaded", function () {
  /* ---- সর্বশেষ / জনপ্রিয় : Dynamic Tab Switching ---- */
  const tabButtons = document.querySelectorAll(".tab-btn");
  const viewAllBtn = document.getElementById("tabViewAllBtn");

  // Mapping for data-tab to their respective "View All" button settings
  const btnMap = {
    "latest-tab": {
      text: "সর্বশেষ সব খবর",
      href: "https://www.kalbela.com/latest-news",
    },
    "popular-tab": {
      text: "জনপ্রিয় সব খবর",
      href: "https://www.kalbela.com/popular-news",
    },
  };

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-tab");

      // 1. Switch active tab appearance
      document.querySelectorAll(".tab-btn").forEach((b) => {
        b.classList.remove("active");
        b.style.borderBottom = "none";
        b.style.color = "#6c757d"; // grey
      });

      btn.classList.add("active");
      btn.style.borderBottom = "3px solid #000";
      btn.style.color = "#000";

      // 2. Show correct panel using d-none
      document
        .querySelectorAll(".tab-panel")
        .forEach((p) => p.classList.add("d-none"));
      document.getElementById(targetId).classList.remove("d-none");

      // 3. Update the top-right button
      if (viewAllBtn && btnMap[targetId]) {
        viewAllBtn.innerText = btnMap[targetId].text;
        viewAllBtn.href = btnMap[targetId].href;
        // Add the arrow icon back after text update
        viewAllBtn.innerHTML +=
          ' <i class="fa-solid fa-arrow-right ms-1 text-danger" style="font-size: 0.7rem;"></i>';
      }
    });
  });

  /* ---- অনলাইন জরিপ : client-side voting simulation ---- */
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  function toBanglaNumber(str) {
    return String(str).replace(/[0-9]/g, (d) => bnDigits[d]);
  }

  const pollOptionsEl = document.getElementById("pollOptions");
  if (pollOptionsEl) {
    const optionLis = Array.from(pollOptionsEl.querySelectorAll("li"));
    let voted = false;

    function renderPoll() {
      const total = optionLis.reduce(
        (sum, li) => sum + Number(li.dataset.votes),
        0,
      );
      optionLis.forEach((li) => {
        const votes = Number(li.dataset.votes);
        const pct = total > 0 ? (votes * 100) / total : 0;
        li.querySelector(".poll-option-fill").style.width =
          pct.toFixed(2) + "%";
        li.querySelector(".poll-option-pct").textContent =
          toBanglaNumber(pct.toFixed(2)) + "%";
      });
      document.getElementById("pollTotal").textContent =
        "মোট ভোটদাতাঃ " + toBanglaNumber(total.toLocaleString("en-US")) + " জন";
    }

    optionLis.forEach((li) => {
      const radio = li.querySelector('input[type="radio"]');
      radio.addEventListener("change", () => {
        if (voted) return;
        voted = true;
        li.dataset.votes = Number(li.dataset.votes) + 1;
        optionLis.forEach((l) => (l.querySelector("input").disabled = true));
        renderPoll();
      });
    });

    renderPoll();
  }

  const pollCopyLink = document.getElementById("pollCopyLink");
  const pollCopiedMsg = document.getElementById("pollCopiedMsg");
  if (pollCopyLink) {
    pollCopyLink.addEventListener("click", (e) => {
      e.preventDefault();
      const url = "https://www.kalbela.com/opinion-poll/276";
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).catch(() => {});
      }
      pollCopiedMsg.style.display = "block";
      setTimeout(() => {
        pollCopiedMsg.style.display = "none";
      }, 2000);
    });
  }
});

// Auto-highlight active navigation link
document.addEventListener("DOMContentLoaded", function () {
  // 1. Get the current page's file name (e.g., 'latest-news.html')
  const currentPath = window.location.pathname.split("/").pop();

  // 2. If the page is 'latest-news.html', apply the .nav-active class
  if (currentPath === "latest-news.html") {
    const latestNavItem = document.getElementById("nav-latest");
    if (latestNavItem) {
      latestNavItem.classList.add("nav-active");
    }
  }
});

//scroll to top and sticky ad
document.addEventListener("DOMContentLoaded", function () {
  // --- 1. Close Ad Footer Functionality ---
  const closeBtn = document.getElementById("close-sticky-ad");
  const adFooter = document.getElementById("sticky-ad-footer");

  if (closeBtn && adFooter) {
    closeBtn.addEventListener("click", function () {
      adFooter.classList.add("hidden");
      // When ad closes, move the Up button down to the very bottom
      document.getElementById("scroll-to-top").style.bottom = "20px";
    });
  }

  const upBtn = document.getElementById("scroll-to-top");

  window.addEventListener("scroll", function () {
    // If scrolled down more than 300px, show the button
    if (window.scrollY > 300) {
      upBtn.classList.add("show");
    } else {
      upBtn.classList.remove("show");
    }
  });

  upBtn.addEventListener("click", function () {
    // Smoothly scroll back to the top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

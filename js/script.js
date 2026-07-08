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
  const carouselEl = document.getElementById("leadCarousel");
  const captionEl = document.getElementById("leadCaption");
  const thumbStrip = document.getElementById("thumbStrip");

  if (!carouselEl || !captionEl) return;

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

// Data Objects from React
const latestNews = [
  {
    id: 1,
    title: "আর্জেন্টিনার প্রতিপক্ষ মিসরের ভাগ্য বদলেছেন যে যমজ দুই ভাই",
    link: "#",
  },
  {
    id: 2,
    title: "বর্জ্য ব্যবস্থাপনায় ডিএসসিসির 'ক্লিন কেয়ার' অ্যাপ চালু",
    link: "#",
  },
  {
    id: 3,
    title: "ফ্রান্স প্রেসিডেন্টের সফরের মধ্যেই সিরিয়ায় জোড়া বিস্ফোরণ",
    link: "#",
  },
  {
    id: 4,
    title: "গাজীপুর সিটি করপোরেশনে মশাবাহিত রোগ প্রতিরোধে সমন্বয় সভা",
    link: "#",
  },
  {
    id: 5,
    title: "যিনি ফিলিস্তিনিদের কষ্ট অনুভব করেন না, তিনি মানুষ নন: মিসরের কোচ",
    link: "#",
  },
  {
    id: 6,
    title:
      "প্রধানমন্ত্রীর সঙ্গে ক্যান্সার আক্রান্ত সন্তানসহ জুলাইয়ে শহীদের মায়ের সাক্ষাৎ",
    link: "#",
  },
  {
    id: 7,
    title: "پاکستان کے پولیس پوسٹ پر دہشت گردانہ حملہ، ۹ پولیس اہلکار ہلاک",
    link: "#",
  },
  {
    id: 8,
    title: "মাটির নিচে লুকিয়ে রাখা ২৯ লাখ টাকার স্বর্ণালংকার চুরি",
    link: "#",
  },
  {
    id: 9,
    title:
      "জমিসংক্রান্ত বিরোধের জেরে হামলায় আহত ১০, প্রধান অভিযুক্তসহ গ্রেপ্তার ৫",
    link: "#",
  },
  {
    id: 10,
    title: "নানা সীমাবদ্ধতায় ধুঁকছে চাঁদপুর ২৫০ শয্যা হাসপাতাল",
    link: "#",
  },
  {
    id: 11,
    title: "জর্জিনার পাঠানো উপহার নিয়ে যা বললেন মেসির স্ত্রী",
    link: "#",
  },
  {
    id: 12,
    title: "৪২ ঘণ্টা পার হলেও মেলেনি নিখোঁজ ৬ জেলের সন্ধান",
    link: "#",
  },
  {
    id: 13,
    title: "বৈরী আবহাওয়ায় চট্টগ্রামে নামতে পারেনি ৩ ফ্লাইট",
    link: "#",
  },
  { id: 14, title: "ভিসা নিয়ে বড় সুখবর দিল সৌদি আরব", link: "#" },
  {
    id: 15,
    title: "পানিসম্পদ উন্নয়নে বাংলাদেশকে সহযোগিতা করতে চায় নেদারল্যান্ডস",
    link: "#",
  },
  {
    id: 16,
    title: "মিসরের বিপক্ষে জিতলে洍আর্জেন্টিনার পরবর্তী খেলা কবে, প্রতিপক্ষ কে?",
    link: "#",
  },
  {
    id: 17,
    title: "সাভারে এনসিপির সমাবেশে বিস্ফোরণ, সাবেক যুবলীগ নেতাসহ আটক ২",
    link: "#",
  },
  { id: 18, title: "ডেঙ্গুর তথ্য জানেন না সিলেটের সিভিল সার্জন", link: "#" },
  {
    id: 19,
    title: "ঢাকা-কক্সবাজার ট্রেন চলাচল বন্ধ, মাঝপথে আটকা পর্যটক এক্সপ্রেস",
    link: "#",
  },
  {
    id: 20,
    title: "ব্রাজিলের বিদায়ে আর্জেন্টিনা কোচের সতর্কবার্তা",
    link: "#",
  },
];

const popularNews = [
  { id: 1, title: "খামেনির শেষ বিদায়ে দেখা গেল আহমাদিনেজাদকে", link: "#" },
  { id: 2, title: "এনসিপির ৫ নেতা গ্রেপ্তার", link: "#" },
  { id: 3, title: "এক উপদেষ্টাসহ আওয়ামী লীগের ৪ নেতার পদত্যাগ", link: "#" },
  { id: 4, title: "দেশের সব মাদ্রাসার জন্য জরুরি নির্দেশনা জারি", link: "#" },
  {
    id: 5,
    title: "আর্জেন্টিনা-পর্তুগাল ২০৩০ বিশ্বকাপ খেলবে বাছাইপর্ব ছাড়াই",
    link: "#",
  },
  {
    id: 6,
    title:
      "জজ-নির্বাহী ম্যাজিস্ট্রেট দম্পতির বাড়িতে দুর্ধর্ষ চুরি, ৩২ লাখ টাকার সম্পদ লুট",
    link: "#",
  },
  {
    id: 7,
    title: "হাইকোর্টের রায়ে দায়িত্বে ফিরছেন ৮ ইউপি চেয়ারম্যান",
    link: "#",
  },
  {
    id: 8,
    title: "বিশ্বকাপ ব্যর্থতার পর কোচকে নিয়ে ব্রাজিলের চূড়ান্ত সিদ্ধান্ত",
    link: "#",
  },
  {
    id: 9,
    title: "ডিজি ছাড়া ইসিতে এনআইডি সেবা বন্ধ, সেবা মিলবে মাঠে",
    link: "#",
  },
  {
    id: 10,
    title: "তুরস্ককে এফ-৩৫ যুদ্ধবিমান কর্মসূচিতে ফেরাতে প্রস্তুত ট্রাম্প",
    category: "নিউইয়র্ক টাইমসের প্রতিবেদন",
    link: "#",
  },
  {
    id: 11,
    title: "আর্জেন্টিনাসহ ২০৩০ বিশ্বকাপ নিশ্চিত করল যেসব দল",
    link: "#",
  },
  {
    id: 12,
    title:
      "প্রধানমন্ত্রীর সঙ্গে সাক্ষাৎ, যা বললেন ভোক্তা অধিকারের জব্বার মণ্ডল",
    link: "#",
  },
  { id: 13, title: "আর্জেন্টিনা-মিশর ম্যাচে কে জিতবে, জানাল এআই", link: "#" },
  { id: 14, title: "এনসিপির সমাবেশস্থলে ককটেল বিস্ফোরণ, আহত ৩", link: "#" },
  { id: 15, title: "মিসর ম্যাচের আগে স্বস্তির খবর পেল আর্জেন্টিনা", link: "#" },
  { id: 16, title: "পরিবেশ সচিবকে প্রত্যাহার", link: "#" },
  { id: 17, title: "মারা গেলেন আফগান ক্রিকেটার শাপুর জাদরান", link: "#" },
  {
    id: 18,
    title: "৩০ লাখ টাকা পেল কারখানায় হাত হারানো সেই নাঈম",
    category: "৬ বছরের আইনি লড়াই",
    link: "#",
  },
  {
    id: 19,
    title: "মেয়াদ শেষের আগেই নিয়োগ বাতিল ডেপুটি গভর্নরের",
    link: "#",
  },
  {
    id: 20,
    title: "ফাইনালের আগে বদলে যাচ্ছে বিশ্বকাপের অফিসিয়াল বল; কিন্তু কেন?",
    link: "#",
  },
];

// Number conversion Helper
function engToBngNum(str) {
  const numStr = str.toString();
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return numStr.replace(/[0-9]/g, (d) => bengaliDigits[parseInt(d)]);
}

// --- 1. Opinion Column logic ---
let currentOpinionSlide = 0;

function changeOpinionSlide(index) {
  // Select the actual slides and navigation paging dots inside the #static_opinion container
  const slides = document.querySelectorAll("#static_opinion .slides > li");
  const dots = document.querySelectorAll("#static_opinion .flex-control-nav a");

  if (slides.length === 0 || dots.length === 0) return;

  // Remove the active states from the currently visible slide and dot
  slides[currentOpinionSlide].classList.remove("flex-active-slide");
  // Optional if you want to explicitly drop display style during active switches
  slides[currentOpinionSlide].style.display = "none";
  dots[currentOpinionSlide].classList.remove("flex-active");

  // Update tracking index
  currentOpinionSlide = index;

  // Add the active states to the target slide and dot
  slides[currentOpinionSlide].classList.add("flex-active-slide");
  slides[currentOpinionSlide].style.display = "block";
  dots[currentOpinionSlide].classList.add("flex-active");
}

// --- 2. Online Poll Logic (Real-time Percentages & Layout Transitions) ---
let hasVoted = false;

function submitVote(index, percentage) {
  if (hasVoted) return;
  hasVoted = true;

  // Check the selected option input safely
  const selectedRadio = document.getElementById(`opt${index}`);
  if (selectedRadio) {
    selectedRadio.checked = true;
  }

  // Disable all radio buttons across the polling block
  const inputs = document.querySelectorAll(
    '.options_block input[type="radio"]',
  );
  inputs.forEach((input) => {
    input.disabled = true;
  });

  // Reveal percentages and trigger the progress bar fill animation
  const items = document.querySelectorAll(".options_block li");
  items.forEach((item, idx) => {
    const votesDiv = item.querySelector(".votes");
    const progressBg = item.querySelector(".progress-bg");

    // Reveal the results block container
    if (votesDiv) {
      votesDiv.style.display = "block";
    }

    // Allocate current poll tracking distributions (e.g., Yes: 60.01%, No: 35.35%, No Comment: 4.63%)
    if (progressBg) {
      let pct = idx === 0 ? 60.01 : idx === 1 ? 35.35 : 4.63;
      progressBg.style.width = pct + "%";
    }
  });
}

function copyPollLink() {
  navigator.clipboard.writeText(window.location.href);
  const toast = document.getElementById("copy-toast");
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 2000);
}

// --- 3. Latest/Popular Tab Logic ---
function renderNews(type) {
  const container = document.getElementById("news-list-container");
  const newsData = type === "latest" ? latestNews : popularNews;
  let htmlContent = "";

  newsData.forEach((item, index) => {
    const categorySpan = item.category
      ? `<span class="sholder">${item.category} / </span>`
      : "";

    htmlContent += `
      <div class="sub2-lead-content">
        <div class="d-flex align-items-center">
          <!-- Left Aligned Circular Serial Number Badge -->
          <div class="news_sl_badge">
            <span>${engToBngNum(index + 1)}</span>
          </div>
          <!-- Right Aligned News Title Text Block -->
          <div class="flex-fill ps-3">
            <h4 class="title">
              ${categorySpan}${item.title}
            </h4>
          </div>
        </div>
        <a class="link" href="${item.link}"></a>
      </div>
    `;
  });
  container.innerHTML = htmlContent;

  // Update full width footer button title
  const footerLink = document.getElementById("all-news-link");
  footerLink.textContent =
    type === "latest" ? "সর্বশেষ সব খবর" : "জনপ্রিয় সব খবর";
}

function switchTab(type) {
  document.getElementById("tab-latest").classList.remove("active");
  document.getElementById("tab-popular").classList.remove("active");

  if (type === "latest") {
    document.getElementById("tab-latest").classList.add("active");
  } else {
    document.getElementById("tab-popular").classList.add("active");
  }
  renderNews(type);
}

// Initial Load
window.onload = function () {
  renderNews("latest");
};

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

  if (selectedAd) {
    adImage.src = selectedAd.image;
    adLink.href = selectedAd.url;
  }
});

const menuBtn = document.getElementById("menuToggle");
const menu = document.getElementById("allMenu");

menuBtn.addEventListener("click", function (e) {
  e.stopPropagation();

  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
});

document.addEventListener("click", function () {
  menu.style.display = "none";
});

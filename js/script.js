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

$(document).ready(function () {
  var dropdown_menu_open = false;
  var click_allow = true;

  // Target your exact trigger button wrapper
  $(".dropdownAllMenuBut").on("click", function (e) {
    e.preventDefault(); // Stop jumping to href="#"
    e.stopPropagation(); // Stop click from immediately closing via document handler

    if (click_allow) {
      click_allow = false;

      if (dropdown_menu_open) {
        $(".all-menu").slideUp(300);
        dropdown_menu_open = false;
      } else {
        $(".all-menu").slideDown(300);
        dropdown_menu_open = true;
      }

      // Simple debounce tracking to match your timing setup
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

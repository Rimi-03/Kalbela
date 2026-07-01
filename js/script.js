const ads = [
  "images/ad1.jpg",
  "images/ad2.jpg",
  "images/ad3.jpg",
  "images/ad4.jpg",
];

const randomAd = Math.floor(Math.random() * ads.length);

document.getElementById("adBanner").src = ads[randomAd];

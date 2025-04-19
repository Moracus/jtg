const video = document.getElementById("custom-video");
const playIcon = document.getElementById("play-icon");
const items = document.querySelectorAll(".carousel-item");
const dots = document.querySelectorAll(".dot");

let currIndex = 0;
let interval;
function togglePlayPause() {
  if (video.paused || video.ended) {
    video.play();
    playIcon.style.display = "none";
  } else {
    video.pause();
    playIcon.style.display = "flex";
  }
}

// Show the play icon when the video is paused
video.addEventListener("pause", () => {
  playIcon.style.display = "flex";
});

// Hide the play icon when the video starts playing
video.addEventListener("play", () => {
  playIcon.style.display = "none";
});

function showSlide(index) {
  items.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  currIndex = (currIndex + 1) % items.length;
  showSlide(currIndex);
}

function setSlide(index) {
  currIndex = index;
  showSlide(index);
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    clearInterval(interval);
    setSlide(Number(dot.dataset.index));
    startCarousel();
  });
});

function startCarousel() {
  interval = setInterval(nextSlide, 5000);
}

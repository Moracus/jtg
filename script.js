const video = document.getElementById("custom-video");
const playIcon = document.getElementById("play-icon");

const contactForm = document.getElementById("contactForm");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const body = document.body;

let currIndex = 0;
let interval;

const carouselInner = document.querySelector(".carousel-inner");
const testimonials = document.querySelectorAll(".testimonial");
const dots = document.querySelectorAll(".crousal-btn");
let currentIndex = 0;
const totalTestimonials = testimonials.length;
let autoSlideInterval;

// Function to update carousel position
function updateCarousel() {
  carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Update active states
  testimonials.forEach((testimonial, index) => {
    testimonial.classList.toggle("selected", index === currentIndex);
  });
  dots.forEach((dot, index) => {
    dot.classList.toggle("selected", index === currentIndex);
  });
}

// Function to go to a specific testimonial
function goToTestimonial(index) {
  currentIndex = index;
  if (currentIndex >= totalTestimonials) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = totalTestimonials - 1;
  }
  updateCarousel();
}

// Auto-slide every 5 seconds
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    goToTestimonial(currentIndex + 1);
  }, 5000);
}

// Stop auto-slide (e.g., when user interacts)
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Event listeners for dots
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    stopAutoSlide();
    goToTestimonial(index);
    startAutoSlide(); // Restart auto-slide after manual interaction
  });
});

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
// Show modal on form submit
contactForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form submission
  modal.style.display = "flex"; // Show modal
  body.classList.add("no-scroll");
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  body.classList.remove("no-scroll"); // Enable scrolling
});

// Close modal on clicking outside of the modal content
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    body.classList.remove("no-scroll");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  updateCarousel();
  startAutoSlide();
});

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".carousel-slide");
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");
  let currentIndex = 0;
  let autoSlideInterval;

  function showSlide(index) {
    slides[currentIndex].classList.remove("active");
    currentIndex = (index + slides.length) % slides.length;
    slides[currentIndex].classList.add("active");
    updateCarousel();
  }

  function showNextSlide() {
    showSlide(currentIndex + 1);
  }

  function showPrevSlide() {
    showSlide(currentIndex - 1);
  }

  function updateCarousel() {
    const carouselContainer = document.querySelector(".carousel-container");
    const slideWidth = slides[currentIndex].clientWidth;
    carouselContainer.style.transform = `translateX(-${
      currentIndex * slideWidth
    }px)`;
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(showNextSlide, 7000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Event listeners for buttons
  nextButton.addEventListener("click", () => {
    stopAutoSlide();
    showNextSlide();
    startAutoSlide();
  });

  prevButton.addEventListener("click", () => {
    stopAutoSlide();
    showPrevSlide();
    startAutoSlide();
  });

  slides[currentIndex].classList.add("active");
  updateCarousel();
  startAutoSlide();
});

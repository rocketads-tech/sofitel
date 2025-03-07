document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("imagePopup");
  const popupImage = document.getElementById("popupImage");
  const closeBtn = document.querySelector(".close-btn");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const images = document.querySelectorAll(".gallery img");
  let currentIndex = 0;
  let startX = 0;
  let endX = 0;
  let isAnimating = false;

  function openPopup(index) {
    currentIndex = index;
    popupImage.src = images[currentIndex].src; // Устанавливаем изображение сразу
    popup.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  function closePopup() {
    popup.style.display = "none";
    document.body.style.overflow = "";
  }

  function updateImage(direction) {
    if (isAnimating) return;
    isAnimating = true;

    const isSwipe = direction === "swipe-left" || direction === "swipe-right";
    let animationClass = "";

    if (direction === 1 || direction === "swipe-left") {
      animationClass = "slide-left";
    } else if (direction === -1 || direction === "swipe-right") {
      animationClass = "slide-right";
    }

    popupImage.classList.add(animationClass);

    setTimeout(() => {
      popupImage.classList.remove(animationClass);
      popupImage.src = images[currentIndex].src; // Меняем изображение после анимации
      isAnimating = false;
    }, 300);
  }

  function showNext(source = "button") {
    currentIndex = (currentIndex + 1) % images.length;
    popupImage.src = images[currentIndex].src; // Устанавливаем новое изображение сразу
    updateImage(source === "swipe" ? "swipe-left" : 1);
  }

  function showPrev(source = "button") {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    popupImage.src = images[currentIndex].src; // Устанавливаем новое изображение сразу
    updateImage(source === "swipe" ? "swipe-right" : -1);
  }

  images.forEach((img, index) => {
    img.addEventListener("click", () => openPopup(index));
  });

  closeBtn.addEventListener("click", closePopup);
  popup.addEventListener("click", (e) => {
    if (e.target === popup) closePopup();
  });

  nextBtn.addEventListener("click", () => showNext("button"));
  prevBtn.addEventListener("click", () => showPrev("button"));

  document.addEventListener("keydown", (e) => {
    if (popup.style.display === "flex") {
      if (e.key === "ArrowRight") showNext("button");
      if (e.key === "ArrowLeft") showPrev("button");
      if (e.key === "Escape") closePopup();
    }
  });

  popup.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  popup.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
      endX = e.touches[0].clientX;
    },
    { passive: false }
  );

  popup.addEventListener("touchend", () => {
    const diff = startX - endX;
    if (diff > 50) {
      showNext("swipe");
    } else if (diff < -50) {
      showPrev("swipe");
    }
  });
});

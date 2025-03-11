// aspect-ratio start
const images = document.querySelectorAll(".mini-slider img");

function updateImageHeight(image) {
  const aspectRatio = 1.938; // Исходное соотношение сторон 630/325
  const newHeight = image.offsetWidth / aspectRatio;
  image.style.height = `${newHeight}px`;
}

const resizeObserver = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    updateImageHeight(entry.target);
  });
});

images.forEach((image) => {
  resizeObserver.observe(image);
  image.onload = () => {
    updateImageHeight(image);
  };
});
// aspect-ratio end

// animation start
let isDesktop = window.innerWidth > 768;
let classes = getAnimationClasses();

function getAnimationClasses() {
  return isDesktop
    ? {
        secondToFirst: "move_down_to_center",
        firstToThird: "move_down_to_bottom",
        thirdToSecond: "move_up_to_top",
        thirdToFirst: "move_up_to_center",
        secondToThird: "move_up_to_bottom",
        firstToSecond: "move_down_to_top",
      }
    : {
        secondToFirst: "mob_move_down_to_center",
        firstToThird: "mob_move_down_to_bottom",
        thirdToSecond: "mob_move_up_to_top",
        thirdToFirst: "mob_move_up_to_center",
        secondToThird: "mob_move_up_to_bottom",
        firstToSecond: "mob_move_down_to_top",
      };
}

function updateClasses() {
  isDesktop = window.innerWidth > 768;
  classes = getAnimationClasses();
}

window.addEventListener("resize", updateClasses);

function rotateForward() {
  const first = document.querySelector(".first");
  const second = document.querySelector(".second");
  const third = document.querySelector(".third");

  second.classList.add(classes.secondToFirst);
  first.classList.add(classes.firstToThird);
  third.classList.add(classes.thirdToSecond);

  // Ждем окончания анимации
  second.addEventListener(
    "animationend",
    () => {
      second.classList.remove(classes.secondToFirst);
      first.classList.remove(classes.firstToThird);
      third.classList.remove(classes.thirdToSecond);

      // Обновляем основные классы
      first.classList.replace("first", "third");
      second.classList.replace("second", "first");
      third.classList.replace("third", "second");
    },
    { once: true }
  );
}

function rotateBackward() {
  const first = document.querySelector(".first");
  const second = document.querySelector(".second");
  const third = document.querySelector(".third");

  first.classList.add(classes.firstToSecond);
  third.classList.add(classes.thirdToFirst);

  second.classList.add(classes.secondToThird);

  // Ждем окончания анимации
  third.addEventListener(
    "animationend",
    () => {
      third.classList.remove(classes.thirdToFirst);
      first.classList.remove(classes.firstToSecond);
      second.classList.remove(classes.secondToThird);

      // Обновляем основные классы
      first.classList.replace("first", "second");
      second.classList.replace("second", "third");
      third.classList.replace("third", "first");
    },
    { once: true }
  );
}

images.forEach((img) => {
  img.addEventListener("click", () => {
    images.forEach((image) => {
      image.style.zIndex = 1;
    });
    img.style.zIndex = 2;
    if (img.classList.contains("second")) {
      rotateForward();
    } else if (img.classList.contains("third")) {
      images.forEach((image) => {
        image.style.zIndex = 1;
      });
      img.style.zIndex = 2;
      rotateBackward();
    } else if (img.classList.contains("first")) {
      img.style.zIndex = 1;
      images.forEach((image) => {
        if (image.classList.contains("second")) {
          image.style.zIndex = 2;
        } else {
          image.style.zIndex = 1;
        }
      });
      rotateForward();
    }
  });
});
// animation end
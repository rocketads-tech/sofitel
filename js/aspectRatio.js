// aspect-ratio
const items = document.querySelectorAll(".service-card");

items.forEach((item) => {
  // Отсдеживание и динамическое изменение высоты изображений
  const img = item.querySelector(".service-card__img");
  function updateImageHeight(item) {
    const aspectRatio = 555 / 320;

    const newHeight = img.offsetWidth / aspectRatio;
    img.style.height = `${newHeight}px`;
  }

  const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      updateImageHeight(entry.target);
    });
  });

  items.forEach((item) => {
    resizeObserver.observe(item);
    item.onload = () => {
      updateImageHeight(item);
    };
  });
  updateImageHeight();
});

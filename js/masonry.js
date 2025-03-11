function initMasonry() {

   const images = document.querySelectorAll(
     ".gallery picture, .gallery img:not(picture img)"
   );
  const gap = 16;
  const containerWidth = document.querySelector(".gallery").offsetWidth;

  // Считаем gap в процентах от ширины контейнера
  const gapPercentage = ((gap * 2) / containerWidth) * 100;
  // Рабочая ширина после вычитания gap
  const availableWidth = 100 - gapPercentage;

  if (images.length < 3) {
    images.forEach((img) => (img.style.width = "25%"));
    return;
  }

  for (let i = 0; i < images.length; i += 3) {
    const group = Array.from(images).slice(i, i + 3);

    let totalWidth = 0;
    group.forEach((img, index) => {
      let randomWidth = Math.random() * (48 - 22) + 22;
      img.style.width = `${randomWidth}%`;
      totalWidth += randomWidth;
    });

    // Проверка на количество изображений в последней строке
    if (group.length < 3) {
      group.forEach((img) => {
        img.style.width = "25%";
      });
    } else {
      // Если сумма ширин больше или меньше доступной, меняем ширину изображений
      if (totalWidth > availableWidth) {
        group.forEach((img) => {
          let scaleFactor = availableWidth / totalWidth;
          let adjustedWidth = parseFloat(img.style.width) * scaleFactor;
          img.style.width = `${adjustedWidth}%`;
        });
      } else if (totalWidth < availableWidth) {
        group.forEach((img) => {
          let scaleFactor = availableWidth / totalWidth;
          let adjustedWidth = parseFloat(img.style.width) * scaleFactor;
          img.style.width = `${adjustedWidth}%`;
        });
      }
    }
  }
};

window.initMasonry = initMasonry;
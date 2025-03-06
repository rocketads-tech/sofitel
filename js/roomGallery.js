document.addEventListener("DOMContentLoaded", function () {
  const galleryes = document.querySelectorAll(".room-gallery");

	galleryes.forEach(gallery => {
		gallery.addEventListener("click", function (event) {
      const clickedImg = event.target.closest(".room-gallery__img");

      if (!clickedImg) return; // Если клик был не по картинке, выходим

      const firstImg = gallery.children[0];

      if (clickedImg !== firstImg) {
        gallery.insertBefore(clickedImg, firstImg);
      }
    });
	})
});

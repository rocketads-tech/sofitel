const galleryes = document.querySelectorAll(".room-gallery");

galleryes.forEach((gallery) => {
  gallery.addEventListener("click", function (event) {
    const clickedImg = event.target.closest(".room-gallery__img");

    if (!clickedImg) return;

    const firstImg = gallery.children[0];

    if (clickedImg !== firstImg) {
      gallery.insertBefore(clickedImg, firstImg);
    }
  });
});

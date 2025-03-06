// // webp checking
// function testWebP(callback) {
//   let webP = new Image();
//   webP.onload = webP.onerror = function () {
//     callback(webP.height == 2);
//   };
//   webP.src =
//     "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
// }
// // Добавляем класс _webp или _no-webp для HTML
// testWebP(function (support) {
//   let className = support === true ? "webp" : "no-webp";
//   document.documentElement.classList.add(className);
// });


function testWebP(callback) {
  let webP = new Image();
  webP.onload = function () {
    callback(webP.complete && webP.height === 2);
  };
  webP.onerror = function () {
    callback(false);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

// Добавляем класс _webp или _no-webp в HTML
document.addEventListener("DOMContentLoaded", function () {
  testWebP(function (support) {
    document.documentElement.classList.add(support ? "webp" : "no-webp");
  });
});

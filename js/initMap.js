// Проверяем, добавлен ли уже скрипт Яндекс.Карт
if (
  !document.querySelector(
    `script[src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"]`
  )
) {
  const ymapScript = document.createElement("script");
  ymapScript.type = "text/javascript";
  ymapScript.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
  ymapScript.defer = true;
  ymapScript.onload = function () {
    ymaps.ready(init); // После загрузки скрипта вызываем функцию инициализации карты
  };
  document.body.appendChild(ymapScript);
}

function init() {
  var initialCenter = [46.662265, 36.798479];
  var zoomVal = 16;
  var myMap = new ymaps.Map("map", {
    center: initialCenter,
    zoom: zoomVal,
  });

  myMap.behaviors.disable("scrollZoom");

  var myPlacemark = new ymaps.Placemark(
    [46.662265, 36.798479],
    {
      hintContent: "Отель Sofitel",
      balloonContent:
        "Отель окружен уникальной природой, способствующей восстановлению сил и душевному равновесию.",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "./img/map-mark.png",
      iconImageSize: [40, 65],
      iconImageOffset: [-20, -40],
    }
  );

  window.addEventListener("resize", function () {
    myMap.container.fitToViewport(); // Это заставит карту подстраиваться под размер окна
  });

  myMap.geoObjects.add(myPlacemark);

  // Удаляем ненужные элементы управления
  myMap.controls.remove("trafficControl");
  myMap.controls.remove("typeSelector");
  myMap.controls.remove("searchControl");
  myMap.controls.remove("routeEditor");
  myMap.controls.remove("copyrights");

  // Функция для обновления центра карты в зависимости от ширины экрана
  function updateCenter() {
    var screenWidth = window.innerWidth;

    if (screenWidth > 992) {
      myMap.setCenter([initialCenter[0], initialCenter[1] - 0.005]); // Изменяем координаты на 500px вправо
    } else {
      myMap.setCenter([initialCenter[0] - 0.0027, initialCenter[1]]); // Изменяем координаты на 270px вверх
    }
  }

  updateCenter();

  window.addEventListener("resize", updateCenter);
}

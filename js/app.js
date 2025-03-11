// check webp start
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
// check webp end

// подключаем стили и скрипты соответствующие страницам
document.addEventListener("DOMContentLoaded", function () {
  const pageName = document.body.dataset.page;

  const pages = {
    home: {
      css: ["home.min", "card-product.min"],
      js: ["miniSlider.min"],
    },
    contacts: {
      css: ["contacts.min"],
      js: ["initMap.min"],
    },
    gallery: {
      css: ["gallery.min"],
      js: ["gallery.min"],
    },
    prices: {
      css: ["prices.min"],
      js: [],
    },
    rooms: {
      css: ["rooms.min"],
      js: ["roomGallery.min"],
    },
    services: {
      css: ["services.min"],
      js: ["aspectRatio.min"],
    },
  };

  if (pageName && pages[pageName]) {
    const { css, js } = pages[pageName];

    if (css && css.length) {
      css.forEach((file) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = `./css/${file}.css`;
        document.head.appendChild(link);
      });
    }

    if (js && js.length) {
      js.forEach((file) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `./js/${file}.js`;
        script.defer = true;
        document.body.appendChild(script);
      });
    }

  }
});

  const bookingLinks = document.querySelectorAll('a[href="#booking"]');

  bookingLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));
      const offset = window.innerWidth < 992 ? 60 : 0;

      window.scrollTo({
        top: target.offsetTop - offset,
      });
    });
  });


const body = document.querySelector('body')

// active link start
const currentPage = body.id
const pageLinks = document.querySelectorAll('a[data-page]')

function activeLink() {
  pageLinks.forEach((link) => {
    link.dataset.page === currentPage
      ? link.classList.add("active")
      : link.classList.remove("active");
  });
}

pageLinks.length > 0 ? activeLink() : false;
// active link end

// home-bunner heigt start
const homeBunner = document.querySelector(".home-bunner")
const header = document.querySelector("header");

const observer = new ResizeObserver(() => {
  const headerHeight = header.getBoundingClientRect().height;

  document.documentElement.style.setProperty(
    "--header-height",
    `${headerHeight}px`
  );
});

observer.observe(header);
// home-bunner heigt end

// mob-menu start
const mobMenu = document.querySelector(".header__top")
const mobMenuBtns = document.querySelectorAll(".mob_menu_btn");
const logoHd = document.querySelector(".logo-hd");
const logoMobMenu = document.querySelector(".logo-mob-menu");

mobMenuBtns.forEach(mobMenuBtn => {
  mobMenuBtn.addEventListener("click", () => {
    mobMenu.classList.toggle("active");
    if (mobMenu.classList.contains("active")) {
      body.style.overflowY = "hidden";
       mobMenuBtn.classList.add("active");
      setTimeout(() => {
        logoHd.style.display = "none";
        logoMobMenu.style.display = "inline-block";
      }, 200);
      
    } else {
      removeActiveMobMenu();
    }

  });
});

function removeActiveMobMenu() {
  mobMenu.classList.remove("active");
  body.style.overflowY = "auto";
  mobMenuBtns.forEach((item) => {
    item.classList.remove("active");
  });
  setTimeout(() => {
    logoHd.style.display = "inline-block";
    logoMobMenu.style.display = "none";
  }, 300);
}

// remove the active class from the mob-menu when moving to page 
const linksToPage = document.querySelectorAll(".header__top a");
const mobMenuOpen = document.querySelectorAll(".header__top.active");

linksToPage.forEach(link => {
  link.addEventListener("click", (e) => {
    removeActiveMobMenu();
  })
});
// mob-menu end
// sticky header start
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header__menu");

  window.addEventListener("scroll", function () {
    if (window.innerWidth < 992) {
      // Работает только на мобильных
      if (window.scrollY > 300) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }
  });
});
// sticky header end
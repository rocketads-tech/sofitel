
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

// mob-menu
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
    // const href = link.getAttribute("href");
    removeActiveMobMenu();
    // window.location.href = href;
  })
});
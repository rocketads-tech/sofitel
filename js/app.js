
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




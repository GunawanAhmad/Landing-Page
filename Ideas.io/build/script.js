let ul = document.getElementById("ul-list");
let hamburger = document.getElementById("hamburger");
let closeBtn = document.getElementById("close-btn");
let navList = document.querySelectorAll("#ul-list li");

hamburger.addEventListener("click", toggleMobileNavbar);

closeBtn.addEventListener("click", toggleMobileNavbar);

navList.forEach((li) => li.addEventListener("click", toggleMobileNavbar));

function toggleMobileNavbar() {
  ul.classList.toggle("transform");
}

const links = document.querySelectorAll("a");

for (const link of links) {
  link.addEventListener("click", clickHandler);
}

function clickHandler(e) {
  e.preventDefault();
  const href = this.getAttribute("href");
  const offsetTop = document.querySelector(href).offsetTop;

  scroll({
    top: offsetTop,
    behavior: "smooth",
  });
}

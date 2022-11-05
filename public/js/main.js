const backdrop = document.querySelector(".backdrop");
const sideDrawer = document.querySelector(".mobile-nav");
const menuToggle = document.querySelector("#side-menu-toggle");
function isNotEmpty(item) {
  return item !== undefined && item !== null;
}

function backdropClickHandler() {
  backdrop.style.display = "none";
  sideDrawer.classList.remove("open");
}

function menuToggleClickHandler() {
  backdrop.style.display = "block";
  sideDrawer.classList.add("open");
}

if (isNotEmpty(backdrop) || isNotEmpty(sideDrawer)) {
  backdrop.addEventListener("click", backdropClickHandler);
  menuToggle.addEventListener("click", menuToggleClickHandler);
}

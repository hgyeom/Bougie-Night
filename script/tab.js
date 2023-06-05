// 변수 선언부. dom 컨트롤을 위한 querySelector
const movieListTab = document.querySelector(".movie-list-tab");
const dailyBoxofficeTab = document.querySelector(".daily-boxoffice-tab");
const movieListContainer = document.querySelector(".movie-list-container");
const dailyBoxofficeContainer = document.querySelector(
  ".daily-boxoffice-container"
);

movieListTab.addEventListener("click", () => {
  movieListContainer.className = "movie-list-container";
  dailyBoxofficeContainer.className = "daily-boxoffice-container off";
});

dailyBoxofficeTab.addEventListener("click", () => {
  movieListContainer.className = "movie-list-container off";
  dailyBoxofficeContainer.className = "daily-boxoffice-container";
});

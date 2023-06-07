// 변수 선언부. dom 컨트롤을 위한 querySelector
const movieListTab = document.querySelector(".movie-list-tab");
const dailyBoxofficeTab = document.querySelector(".daily-boxoffice-tab");
const movieListContainer = document.querySelector(".movie-list-container");
const dailyBoxofficeContainer = document.querySelector(
  ".daily-boxoffice-container"
);
const searchBox = document.querySelector(".form");

movieListTab.addEventListener("click", () => {
  movieListContainer.className = "movie-list-container";
  movieListTab.className = "movie-list-tab";
  dailyBoxofficeContainer.className = "daily-boxoffice-container off";
  dailyBoxofficeTab.className = "daily-boxoffice-tab off";
  searchBox.className = "form";
});

dailyBoxofficeTab.addEventListener("click", () => {
  movieListContainer.className = "movie-list-container off";
  movieListTab.className = "movie-list-tab off";
  dailyBoxofficeContainer.className = "daily-boxoffice-container";
  dailyBoxofficeTab.className = "daily-boxoffice-tab";
  searchBox.className = "form off";
});

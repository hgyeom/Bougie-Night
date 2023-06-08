import { getDailyBoxofficeList } from "./api.js";
const dailyBoxofficeContainer = document.querySelector(
  ".daily-boxoffice-container"
);
let data;

const getDailyList = async () => {
  data = await getDailyBoxofficeList();
  makeDailyList(data.boxOfficeResult.dailyBoxOfficeList);
};

getDailyList();

let box_id = [
  955555, 447365, 39057, 447277, 385687, 502356, 876797, 955666, 467885, 916224,
];
let box_index = 0;

const makeDailyList = async (movies) => {
  movies.forEach(async (movie) => {
    console.log(movie);

    const movieItem = document.createElement("div");
    const id = box_id[box_index];
    movieItem.setAttribute("id", id);
    console.log(id);

    movieItem.addEventListener("click", () => {
      window.location.href = `movie.html?id=${id}`;
    });

    box_index++;

    movieItem.classList.add("card-item");

    //이미지 넣기
    const moviePoster = document.createElement("img");
    moviePoster.src = `assets/${movie.movieCd}.jpg`;

    //<div img scr="">
    moviePoster.classList.add("card-img");
    moviePoster.setAttribute("alt", movie.movieNm);
    movieItem.append(moviePoster);

    //제목 넣기
    const movieTitle = document.createElement("h3");
    movieTitle.textContent = movie.movieNm;
    movieItem.append(movieTitle);

    // 개봉일 넣기
    const movieOpen = document.createElement("p");
    console.log(movie.openDt);
    movieOpen.textContent = `개봉일 : ${movie.openDt}`;
    movieItem.append(movieOpen);

    // 순위 넣기
    const rank = document.createElement("p");
    rank.textContent = movie.rank + "위";
    rank.classList.add("card-rank");
    movieItem.append(rank);

    dailyBoxofficeContainer.append(movieItem);
  });
};

import { getDailyBoxofficeList } from "./api.js";
const dailyBoxofficeContainer = document.querySelector(
  ".daily-boxoffice-container"
);
let data;
// let movieDetail;

const getDailyList = async () => {
  data = await getDailyBoxofficeList();
  makeDailyList(data.boxOfficeResult.dailyBoxOfficeList);
};

// const getMovieDetail = async (movieCd) => {
//   movieDetail = await getDailyMovie(movieCd);
//   return movieDetail.movieInfoResult.movieInfo;
// };

getDailyList();

// 만들기
const makeDailyList = async (movies) => {
  movies.forEach(async (movie) => {
    console.log(movie);

    const movieItem = document.createElement("div");

    movieItem.setAttribute("id", movie.id);

    movieItem.classList.add("card-item");

    // //이미지 넣기 - 엑박은 도대체 뭐가 문젤까
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
    const voteAverage = document.createElement("p");
    voteAverage.textContent = movie.rank + "위";
    movieItem.append(voteAverage);

    dailyBoxofficeContainer.append(movieItem);
  });
};

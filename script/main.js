const movieListContainer = document.querySelector(".movie-list-container");
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
let data;

//api
const getTopRatedMovies = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjc3YWYxMTVmNTA4MDlmOGMyZTc0ZWRiYmVhMGIxYSIsInN1YiI6IjY0NzViOWFmOTI0Y2U2MDEzM2IwNmRmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4idGHQhk6pIpbc9jzZ9lSBAwYtJNIxXpTbpsphsnOig",
    },
  };
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=ko-kr&page=1'",
      options
    );

    return res.json();
  } catch (err) {
    console.log({ err });
  }
};

const makeMovieList = (moviesData) => {
  moviesData.forEach((item) => {
    const movieItem = document.createElement("div");
    movieItem.setAttribute("id", item.id);
    movieItem.classList.add("card-item");

    const moviePoster = document.createElement("img");
    moviePoster.src = "https://image.tmdb.org/t/p/w500/" + item.poster_path;
    moviePoster.classList.add("card-img");
    moviePoster.setAttribute("alt", item.title);
    movieItem.append(moviePoster);

    const movieTitle = document.createElement("h3");
    movieTitle.textContent = item.title;
    movieItem.append(movieTitle);

    const voteAverage = document.createElement("p");
    voteAverage.textContent = item.vote_average;
    movieItem.append(voteAverage);

    const movieDesc = document.createElement("p");
    movieDesc.textContent = item.overview;
    movieItem.append(movieDesc);

    movieItem.addEventListener("click", () => {
      window.location.href = `movie.html?id=${item.id}`;
    });

    movieListContainer.append(movieItem);
  });
};
const showData = async () => {
  //1.데이터를 가져오기
  data = await getTopRatedMovies();

  //2.가져온 data를 이용해서 현재 화면에 그리기
  makeMovieList(data.results);
};

const sortname = async () => {
  movieListContainer.innerHTML = "";
  data = await getTopRatedMovies();
  data.results.sort((a, b) => {
    if (a.title > b.title) {
      return 1;
    }
    if (a.title < b.title) {
      return -1;
    }
    if ((a.title = b.title)) {
      return 0;
    }
  });
  makeMovieList(data.results.sort());
};

const sortvote = async () => {
  movieListContainer.innerHTML = "";
  data = await getTopRatedMovies();
  data.results.sort((a, b) => {
    if (a.vote_average > b.vote_average) {
      return -1;
    }
    if (a.vote_average < b.vote_average) {
      return 1;
    }
    if ((a.vote_average = b.vote_average)) {
      return 0;
    }
  });
  makeMovieList(data.results.sort());
  console.log(data.results.sort());
};

const name = document.getElementById("name");
name.onclick = sortname;

const vote = document.getElementById("vote");
vote.onclick = sortvote;

const searchMovie = async () => {
  // 1. search-input에 있는 키워드부터 가져오기
  const keyword = searchInput.value.toLowerCase();
  if (!keyword) {
    alert("검색어를 입력해 주세요.");
    searchInput.focus();
  }
  // 2. 화면에 보여주고 있는 movies를 keyword를 이용해서 필터링하기
  // 2-1. movies 가져오기
  const movies = data.results;

  // 2-2. movies에 filter 함수 쓰기

  const filteredMovies = movies.filter((movie) => {
    if (movie.title.toLowerCase().includes(keyword)) {
      return true; // 포함
    } else {
      return false; // 필터링
    }
  });

  // 2-3. 현재 화면에 그려져 있는 movies들 지우기
  movieListContainer.innerHTML = "";

  // 2-4. filteredMovies를 화면에 그리기
  makeMovieList(filteredMovies);
};

const addEventForSearch = () => {
  searchBtn.addEventListener("click", searchMovie);

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      searchMovie();
    }
  });
};

const init = () => {
  showData();

  addEventForSearch();
  searchInput.focus();
};

init();

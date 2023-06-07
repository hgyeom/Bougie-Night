const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

const getMovieDetails = async () => {
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
      `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
      options
    );
    return res.json();
  } catch (err) {
    console.log({ err });
  }
};

const showMovieDetails = async () => {
  const movieTitle = document.querySelector("#movie-title");
  const moviePoster = document.querySelector("#movie-poster");
  const voteAverage = document.querySelector("#vote-average");
  const movieOverview = document.querySelector("#movie-overview");

  const movieDetails = await getMovieDetails();

  movieTitle.textContent = movieDetails.title;
  moviePoster.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${movieDetails.poster_path})`;
  voteAverage.textContent = `평점: ${movieDetails.vote_average}`;
  movieOverview.textContent = movieDetails.overview;

  const posterAspectRatio = movieDetails.poster_path
    ? movieDetails.poster_path.width / movieDetails.poster_path.height
    : 0.67;
  moviePoster.style.height = `${moviePoster.offsetWidth / posterAspectRatio}px`;
};

const backButton = document.querySelector("#back-btn");
backButton.addEventListener("click", () => {
  history.back();
});

showMovieDetails();

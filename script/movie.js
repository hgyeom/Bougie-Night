const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

const getMovieDetails = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMmM2NTM3MzM2MTZlYzdhYTk3MDBiMGI1MTgzOTFlZSIsInN1YiI6IjY0NzA4OWI4NTQzN2Y1MDBhOTA3OGEzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4TOmGfbPiOIwgNU0M00BbY9FUDSbcgf9kIpQjieBgPc",
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
  const movieDirector = document.querySelector("#movie-director");
  const movieCast = document.querySelector("#movie-cast");
  const movieGenres = document.querySelector("#movie-genres");

  const movieDetails = await getMovieDetails();

  movieTitle.textContent = movieDetails.title;
  moviePoster.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${movieDetails.poster_path})`;
  voteAverage.textContent = `평점: ${movieDetails.vote_average}`;
  movieOverview.textContent = movieDetails.overview;

  const director = movieDetails.credits.crew.find(
    (person) => person.job === "Director"
  );
  if (director) {
    movieDirector.textContent = `감독: ${director.name}`;
  }

  const cast = movieDetails.credits.cast.slice(0, 3); // 상위 3명의 배우만 표시
  if (cast.length > 0) {
    const castList = cast.map((person) => person.name);
    movieCast.textContent = `출연: ${castList.join(", ")}`;
  }

  const genres = movieDetails.genres.map((genre) => genre.name);
  if (genres.length > 0) {
    movieGenres.textContent = `장르: ${genres.join(", ")}`;
  }

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

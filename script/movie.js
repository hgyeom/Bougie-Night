// 변수 선언부
// url로 데이터 받기
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");
// html요소 변수 선언
const movieTitle = document.querySelector("#movie-title");
const moviePoster = document.querySelector("#movie-poster");
const voteAverage = document.querySelector("#vote-average");
const movieOverview = document.querySelector("#movie-overview");
const movieDirector = document.querySelector("#movie-director");
const movieCast = document.querySelector("#movie-cast");
const movieGenres = document.querySelector("#movie-genres");

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
      `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR&append_to_response=credits`,
      options
    );
    const data = await res.json();

    return data;
  } catch (err) {
    console.log({ err });
  }
};

const showMovieDetails = async () => {
  const movieDetails = await getMovieDetails();

  movieTitle.textContent = movieDetails.title;
  moviePoster.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${movieDetails.poster_path})`;
  voteAverage.textContent = `${movieDetails.vote_average}`;
  if (movieDetails.overview) {
    movieOverview.textContent = `${movieDetails.overview}`;
  } else {
    movieOverview.textContent = `줄거리 정보가 없습니다.`;
  }

  const director = movieDetails.credits.crew.find(
    (person) => person.job === "Director"
  );
  movieDirector.textContent = `${director.name}`;

  const cast = movieDetails.credits.cast.slice(0, 3);

  const castContainer = document.createElement("div");
  castContainer.classList.add("cast-container");

  for (const actor of cast) {
    const actorContainer = document.createElement("div");
    actorContainer.classList.add("actor-container");

    const actorImage = document.createElement("img");
    actorImage.src = `https://image.tmdb.org/t/p/w200/${actor.profile_path}`;
    actorImage.alt = actor.name;

    const actorName = document.createElement("p");
    actorName.textContent = actor.name;

    actorContainer.appendChild(actorImage);
    actorContainer.appendChild(actorName);
    castContainer.appendChild(actorContainer);
  }

  movieCast.appendChild(castContainer);

  const genres = movieDetails.genres.map((genre) => genre.name);
  movieGenres.textContent = `${genres.join(", ")}`;
};

showMovieDetails();

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjc3YWYxMTVmNTA4MDlmOGMyZTc0ZWRiYmVhMGIxYSIsInN1YiI6IjY0NzViOWFmOTI0Y2U2MDEzM2IwNmRmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4idGHQhk6pIpbc9jzZ9lSBAwYtJNIxXpTbpsphsnOig",
  },
};

const getTopRatedMovies = async () => {
  try {
    //데이터를 가져오기
    const res = await fetch(
      `https://api.themoviedb.org/3/movie//movie/${id}language=en-US&api_key=b677af115f50809f8c2e74edbbea0b1a`,
      options
    );
    return res.json();
  } catch (err) {
    console.log({ err });
  }
};

// api credit
const getcredit = async () => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/movie/${id}/credits?language=en-US&api_key=b677af115f50809f8c2e74edbbea0b1a`,
      options
    );
    return res.json();
  } catch (err) {
    console.log({ err });
  }
};
const showData = async () => {
  const data = await getTopRatedMovies();
  const credit = await getcredit();
  console.log(credit);
  //1.div를 잡는다.
  const title = document.getElementById("title");
  //2.제목을 집어넣는다.
  title.innerHTML = data.title;
};

const init = () => {
  showData();
};

init();

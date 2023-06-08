// 영화진흥위원회 api 설정
const apiKey = "57f97ea74c26985c21a135aedd2b370f";

// 가져오기
export const getDailyBoxofficeList = async () => {
  const res = await fetch(
    `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${apiKey}&targetDt=20230604`
  );
  return res.json();
};

export const getMovieTrailer = async (movieId) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOWNlMTYzMDJiYjIxYWYxNjRkNjM1Y2NjZjNjNGE4ZSIsInN1YiI6IjY0NzQ4ZDM1NWNkMTZlMDBkYzNlOTVmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kSQ79jOPTs3KVTz2J-T2d5L8YSztqvG-uzemUT3TVPA'
    }
  };
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=ko-kr`, options);
    const data = await res.json();

    return data;
  } catch (err) {
    console.log({ err });
  }
}
// 영화진흥위원회 api 설정
const apiKey = "57f97ea74c26985c21a135aedd2b370f";

// 영화진흥위원회의 일일 박스오피스는 어제자를 가져온다.
// let getDate = new Date();
// let year = getDate.getFullYear();
// let month = getDate.getMonth() + 1; // month는 0부터 11까지 리턴하기에 +1을 해준다.
// let day = getDate.getDate() - 1;
// // 10월 이하거나 10일 이하이면 0을 붙여준다.
// if (month < 10) {
//   month = "0" + month;
// }
// if (day < 10) {
//   day = "0" + day;
// }
// const date = "" + year + month + day; //어제 날짜를 넣어 준다.

// 가져오기
export const getDailyBoxofficeList = async () => {
  const res = await fetch(
    `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${apiKey}&targetDt=20230604`
  );
  return res.json();
};

// export const getDailyMovie = async (movieCd) => {
//   const res = await fetch(
//     `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${apiKey}&movieCd=${movieCd}`
//   );
//   return res.json();
// };

// 크롤링

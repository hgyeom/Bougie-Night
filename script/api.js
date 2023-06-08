// 영화진흥위원회 api 설정
const apiKey = "57f97ea74c26985c21a135aedd2b370f";

// 가져오기
export const getDailyBoxofficeList = async () => {
  const res = await fetch(
    `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${apiKey}&targetDt=20230604`
  );
  return res.json();
};

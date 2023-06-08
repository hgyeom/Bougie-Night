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






// 김우리
const boardTableBody = document.querySelector('#board-body');

const contentsContainer = document.querySelector('.contents__container');

const editorForm = document.querySelector('#editor-form');
const titleInput = document.querySelector('#editor-title-input');
const pswInput = document.querySelector('#editor-psw-input');
const contentInput = document.querySelector('#editor-content-input');

const BOARDLIST_LS = 'boardLists';
const boardListsObj = [];

let nums = 1;
let date = new Date();
let views = Math.floor(Math.random() * 99) + 1;
let delBtn = "X";


// function onTitleClick(e) {
//     contentsContainer.textContent = '';
//     const lists = JSON.parse(localStorage.getItem(BOARDLIST_LS));
//     const index = e.target.parentNode.id.replace(/[a-z|-]/gi, '');
    
//     const contentsTitles = document.createElement('div');
//     contentsTitles.classList.add('contents__titles');
    
//     const contentsColumnFirst = document.createElement('div');
//     contentsColumnFirst.classList.add('contents__column');
    
//     const contentsTitle = document.createElement('div');
//     contentsTitle.classList.add('contents__title');
//     contentsTitle.textContent = lists[index].title;
    
//     // contents__titles > column >author, date, views
//     const contentsColumnSecond = document.createElement('div');
//     contentsColumnSecond.classList.add('contents__column');
    
//     const contentsAuthor = document.createElement('div');
//     contentsAuthor.classList.add('contents__author');
//     contentsAuthor.textContent = lists[index].author;
    
//     const contentsDate = document.createElement('div');
//     contentsDate.classList.add('contents__date');
//     contentsDate.textContent = lists[index].date;
    
//     const contentsViews = document.createElement('div');
//     contentsViews.classList.add('contents__views');
//     contentsViews.textContent = lists[index].views;
    
//     const contentsContent = document.createElement('div');
//     contentsContent.classList.add('contents__content');
//     contentsContent.textContent = lists[index].content;
    
//     contentsColumnFirst.appendChild(contentsTitle);
    
//     contentsColumnSecond.appendChild(contentsAuthor);
//     contentsColumnSecond.appendChild(contentsDate);
//     contentsColumnSecond.appendChild(contentsViews);
    
//     contentsTitles.appendChild(contentsColumnFirst);
//     contentsTitles.appendChild(contentsColumnSecond);
    
//     contentsContainer.appendChild(contentsTitles);
//     contentsContainer.appendChild(contentsContent);
// }


/////////////////

//인덱싱 ()
function assignIndex() {
    const lists = JSON.parse(localStorage.getItem(BOARDLIST_LS));
    if (!lists) {
    nums = 1;
    } else {
    nums = parseInt(lists[lists.length - 1].num) + 1;
    }
}


// 제출 / 작성하기 enter
function onEditorFormSubmit(e) {
e.preventDefault();

const content = contentInput.value;
const psw = pswInput.value;
const title = titleInput.value;

const lists = JSON.parse(localStorage.getItem(BOARDLIST_LS));
    if (!lists) {
        const objArr = [];
        objArr.push({
            num: `${nums++}`,
            content: `${content}`,
            author: `${title}`,
            passwards: `${psw}`,
            date: `${date.getFullYear()}
            .${date.getMonth() +1}.${date.getDate()}.`,
            views: `${views++}`,
            });

        localStorage.setItem(BOARDLIST_LS, JSON.stringify(objArr));
        } else {
            lists.push({
            num: `${nums++}`,
            content: `${content}`,
            author: `${title}`,
            passwards: `${psw}`,
            date: `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}.`,
            views: `${views++}`,
            });
            localStorage.setItem(BOARDLIST_LS, JSON.stringify(lists));
        }
    titleInput.value = '';
    contentInput.value = '';
    titleInput.focus();
    window.location.reload();
}

// removeBtn을 클릭하면 얘가 실행된다.
function delInfo(btnId){
    const modal = document.querySelector('.modal');
    modal.style.display =  "block";

    // 그 버튼을 클릭하면 localStorage에서 btnId가 일치하는 놈을 삭제하면 됨
    const pswInput = document.querySelector('#editor-psw-input');

    // pswInput.value -> 입력한 password가 나올 듯?

    // pswInput.value와 listData에서 btnId와 review.num이 같은 놈을 찾아서 -> find 메서드 사용
    const review = listData.find((review) => review.num === btnId);
    // review.password === pswInput.value 같은지 확인 

    // 같으면 아래 실행

    const listData = JSON.parse(localStorage.getItem(BOARDLIST_LS));
    
    const filtered = listData.filter((review) => review.num !== btnId);

    // review 전체
    console.log({listData})
    
    // 선택한 놈 제외하고 필터링된 reviews
    console.log({filtered})
    // localStorage.setItem(filtered);
    // 새로고침 -> window.location.reload();
}
document.addEventListener('mouseup', function(e) {
    const modal = document.querySelector('.modal');
    if (!modal.contains(e.target)) {
        modal.style.display = 'none';
    }
});
    
    
    // const arrList = JSON.parse(localStorage.getItem(BOARDLIST_LS));
    //     arrList.forEach((arr, passwards) => {
    //     if(passwards === ''){
    //         removeItem('')
    //     }else{
    //         alert('Passward is wrong!');
    //     }
    // })

// localStorage 저장하고 불러오기
function showBoardLists() {
    const lists = JSON.parse(localStorage.getItem(BOARDLIST_LS));
    
    lists.forEach((list, index) => {
    if (index < 5) {
        const tr = document.createElement('tr');
        tr.classList.add('board__content');
        
        const tdNum = document.createElement('td');
        tdNum.classList.add('board__content-column');
        tdNum.textContent = list.num;
        
        // const aTitle = document.createElement('a');
        // aTitle.href = '#';
        // aTitle.id = `link-to-content${index}`;
        
        const tdContent = document.createElement('td');
        tdContent.classList.add('board__content-column');
        tdContent.textContent = list.content;
        
        // aTitle.appendChild(tdContent);
        
        const tdAuthor = document.createElement('td');
        tdAuthor.classList.add('board__content-column');
        tdAuthor.textContent = list.author;
        
        const tdDate = document.createElement('td');
        tdDate.classList.add('board__content-column');
        tdDate.textContent = list.date;
        
        const tdViews = document.createElement('td');
        tdViews.classList.add('board__content-column');
        tdViews.textContent = list.views;
        
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('board__Btn-column');
        removeBtn.textContent = "❌";
        removeBtn.id = list.num;
        removeBtn.addEventListener('click', () => {
            // 모달창 띄우기
            // showModal(removeBtn.id);
            delInfo(removeBtn.id);
            });
        tr.appendChild(tdNum);
        tr.appendChild(tdContent);
        tr.appendChild(tdAuthor);
        tr.appendChild(tdDate);
        tr.appendChild(tdViews);
        tr.appendChild(removeBtn);
        
        boardTableBody.appendChild(tr);
        const linkToContent = document.querySelector(
        `#link-to-content${index}`
        );
        // linkToContent.addEventListener('click', onTitleClick);

        // 게시글 5개[인덱싱번호] 이상 시 페이지 넘어가게
        } else if (index === 5) {
            const boardIndexMax = Math.ceil(lists.length / 5);
            for (let i = 0; i < boardIndexMax; i++) {
            const indexContainer = document.querySelector('#index-container');
            
            const aIndex = document.createElement('a');
            aIndex.classList.add('board__index-link');
            
            const spanIndexText = document.createElement('span');
            spanIndexText.classList.add('board__index');
            spanIndexText.textContent = i + 1;
            
            aIndex.appendChild(spanIndexText);
            indexContainer.appendChild(aIndex);
            
            aIndex.addEventListener('click', () => {
            showBoardListsNewPage(i);
            });
        }
        }
    });
}
// 게시글 5개 이상 시 작동 ()
function showBoardListsNewPage(pageIndex) {
    boardTableBody.textContent = '';
    const lists = JSON.parse(localStorage.getItem(BOARDLIST_LS));
    const limitPage = pageIndex * 5;
    
    lists.forEach((list, index) => {
        if (index >= limitPage && index < limitPage + 5) {
        const tr = document.createElement('tr');
        tr.classList.add('board__content');
        const tdNum = document.createElement('td');
        tdNum.classList.add('board__content-column');
        tdNum.textContent = list.num;


        // const aTitle = document.createElement('a');
        // aTitle.href = '#';
        // aTitle.id = `link-to-content${index}`;
        
        const tdContent = document.createElement('td');
        tdContent.classList.add('board__content-column');
        tdContent.textContent = list.content;
        
        // aTitle.appendChild(tdContent);
        
        const tdAuthor = document.createElement('td');
        tdAuthor.classList.add('board__content-column');
        tdAuthor.textContent = list.author;
        
        const tdDate = document.createElement('td');
        tdDate.classList.add('board__content-column');
        tdDate.textContent = list.date;
        
        const tdViews = document.createElement('td');
        tdViews.classList.add('board__content-column');
        tdViews.textContent = list.views;
        
        const removeBtn = document.createElement('td');
        removeBtn.classList.add('board__Btn-column');
        removeBtn.textContent = list.delBtn;

        tr.appendChild(tdNum);
        tr.appendChild(tdContent);
        tr.appendChild(tdAuthor);
        tr.appendChild(tdDate);
        tr.appendChild(tdViews);
        tr.appendChild(removeBtn);
        
        boardTableBody.appendChild(tr);
        // const linkToContent = document.querySelector(
        // `#link-to-content${index}`
        // );
        // linkToContent.addEventListener('click', onTitleClick);
    }

    });
    }
    editorForm.addEventListener('submit', onEditorFormSubmit);

    if (boardTableBody) {
    assignIndex();
    showBoardLists();
    }
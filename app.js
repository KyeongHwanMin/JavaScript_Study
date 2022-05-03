
const container = document.getElementById('root');
// XMLHttpRequest 도구
let ajax = new XMLHttpRequest(); // 변수 
// const ajax2 = new XMLHttpRequest(); // 상수
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';
const store ={
    currentPage: 1,
};


function getData(url){
    ajax.open('GET', url , false);
    ajax.send(); // 데이터 가져옴

    return  JSON.parse(ajax.response);
}


console.log(ajax.response);

function newsFeed() {
    const newsFeed = getData(NEWS_URL);// 응답 값을 객체로 변환
    const newslist = [];

    newslist.push('<ul>');

    for(let i = (store.currentPage - 1) * 10; i< store.currentPage * 10; i++){
        // ${} 변수 표현
        newslist.push(`
            <li>
                <a href="#/show/${newsFeed[i].id}">
                    ${newsFeed[i].title} (${newsFeed[i].comments_count})
                </a>
            </li>
        `);  
}
newslist.push('</ul>');
newslist.push(`
    <div>
        <a href="#/page/${store.currentPage > 1 ? store.currentPage - 1 : 1}">이전 페이지</a>
        <a href="#/page/${store.currentPage + 1}">다음 페이지</a>
    </div>

`);

container.innerHTML = newslist.join(''); // 배열안에 있는 요소들을 하나의 문자열로 변환.
}



const ul = document.createElement('ul');
console.log(newsFeed);

function newsDetail() {// 자바스크립트는 함수를 값으로 취급
    const id = location.hash.substr(7); // location 주소와 관련된 객체(브라우저가 기본으로 제공) substr() 지정한 위치 이후에 값 반환

    const newsContent = getData(CONTENT_URL.replace('@id', id));
    

    container.innerHTML =`
        <h1>${newsContent.title}</h1>

        <div>
            <a href="#/page/${store.currentPage}">목록으로</a>
        </div>
    `;
    // title.innerHTML = newsContent.title;
    // content.appendChild(title);
    console.log(newsContent);

} 

function router() {
    const routePath = location.hash;

    if(routePath == ''){ // # 이면 빈값을 반환
        newsFeed();
    } else if (routePath.indexOf('#/page/') >= 0 ) { // 입력 문자열을 찾아서 0이상의 위치값을 리턴, 없으면 -를 리턴
        store.currentPage = Number(routePath.substr(7));
        newsFeed();
    } else {
        newsDetail();
    }
}
window.addEventListener('hashchange', router);

router();
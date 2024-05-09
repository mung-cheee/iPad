import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'
// import (가져올 데이터 이름) from(=가져올 경로) '(main.js기준 파일의 경로)'

//import 라는 명령어를 사용하는 자바스크립트를 html에서 불러오려면
//html에 script defer type  속성을 module로 넣어야 함



// 장바구니
const basketStarterEl = document.querySelector('header .basket-starter')
const basketEl = basketStarterEl.querySelector('.basket')

basketStarterEl.addEventListener('click', function (event) {
    event.stopPropagation()
    if (basketEl.classList.contains('show')) { // 현재 기본형 false(클래스명에 show가 없는) 상태
        // false & true
        //hide 클래스명에 show가 있으면 제거하게끔
        basketEl.classList.remove('show')
    } else {
        //show 클래스명에 show가 없으면 추가하게끔
        basketEl.classList.add('show')
    }
})
basketEl.addEventListener('click', function (event) {
    event.stopPropagation()
    // 드롭다운 메뉴가 장바구니 하위내용을 클릭해도 닫히지않도록 함
})


// 화면에 보여지는 영역 어디를 클릭하더라도 메뉴가 닫히게끔 이벤트 줌
window.addEventListener('click', function () {
    hideBasket()
})

function showBasket() {
    basketEl.classList.add('show')
}

function hideBasket() {
    basketEl.classList.remove('show')
}






// 검색

const headerEl = document.querySelector('header')
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')]
// ... (전개 연산자)
// -- 전개연산자는 []대괄호로 묶어서 배열데이터로 나타내어 활용도를 높인다.

const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const searchShadowEl = searchWrapEl.querySelector('.shadow')
const searchInputEl = searchWrapEl.querySelector('input')
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]


searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', hideSearch)
searchShadowEl.addEventListener('click', hideSearch)

// 서칭 클래스 있을 시, 없을 시 조건 (맨 처음 정의 해야 함)

function showSearch() {
    headerEl.classList.add('searching')
    document.documentElement.classList.add('fixed')
    headerMenuEls.reverse().forEach(function (el, index) {
        el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
        // el.style.(속성)을 통해, 해당 함수로 스타일 값을 제어할 수 있음
        // (Element Name).length = 해당 영역에 있는 요소의 개수를 숫자로 반환함   
    })
    searchDelayEls.forEach(function (el, index) {
        el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
    })
    setTimeout(function () {
        searchInputEl.focus()
    }, 600)
    // setTimeout을 통해 기존 애니메이션이 먼저 반영되고, 포커스 애니메이션이 작동되도록 함 
}

function hideSearch() {
    headerEl.classList.remove('searching')
    document.documentElement.classList.remove('fixed')

    // showSearch 함수에서 reverse로 뒤집어진 순서를 다시 한번 reverse를 통해 뒤집어줌
    headerMenuEls.reverse().forEach(function (el, index) {
        el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
    })
    searchDelayEls.reverse().forEach(function (el, index) {
        el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
    })
    searchDelayEls.reverse()
    // ** searchDelayEls에는 리버스가 포함 되어있기 때문에 애니메이션 처리 된 후 다시 리버스를 시켜줘야 애니메이션이 초기값으로 다시 돌아가서 정상 처리 될 수 있음 **
    searchInputEl.value = ''
    // 검색바에 입력 된 내용이 검색창을 닫은 후 다시 검색을 눌렀을 때 내용이 지워진 초기 상태로 되돌아 갈 수 있도록 value 값을 비워두는 것!
}


// 요소의 가시성 관찰

// -- 요소에 적용 될 내용
const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
            return
        }
        entry.target.classList.add('show')
    })
})


// -- 실제 요소
const infoEls = document.querySelectorAll('.info')
infoEls.forEach(function (el) {
    io.observe(el)
})

// info 라는 이름을 가진 요소들을 모두 찾아서
// infoEls라는 변수에 할당하였고,
// 이 변수의 객체(=el)들은 forEach 함수를 통하여 순차적으로 처리된다
// info 객체들은(=el) io를 통해 observe(=관찰)된다.



// Video 비디오 재생 & 일시정지 제어
const video = document.querySelector('.stage video')
const playBtn = document.querySelector('.stage .controller--play')
const pauseBtn = document.querySelector('.stage .controller--pause')

playBtn.addEventListener('click', function () {
    video.play() //** .play() = video요소에 바로 쓸 수 있는 자바스크립트 메소드
    playBtn.classList.add('hide')
    pauseBtn.classList.remove('hide')
})

pauseBtn.addEventListener('click', function () {
    video.pause() // ** .pause() = video요소에 바로 쓸 수 있는 자바스크립트 메소드
    playBtn.classList.remove('hide')
    pauseBtn.classList.add('hide')
})



// '당신에게 맞는 ipad는?' 랜더링!
const itemsEl = document.querySelector('section.compare .items')

ipads.forEach(function (ipad) {
    const itemEl = document.createElement('div')
    // 요소를 자바스크립트를 이용해서 만드는 메서드


    /* li 반복 처리 해줘야하기 때문에 innerHTML로 속성을 추가하기 전에 */
    // 각각의 li태그들에 들어갈 내용을 미리 만들어 둘 것.
    let colorList = ''
    ipad.colors.forEach(function (color) {
        colorList += `<li style="background-color: ${color};"></li>`
    })


    itemEl.classList.add('item')
    itemEl.innerHTML = /* html */ `
        <div class="thumbnail">
            <img src="${ipad.thumbnail}" alt="${ipad.name}" />
        </div>
    
        <ul class="colors">
            ${colorList}
        </ul>
    
        <h3 class="name">${ipad.name}</h3>
        <p class="tagline">${ipad.tagline}</p>
        <p class="price">₩${ipad.price.toLocaleString('en-us')}부터</p>
        <button class="btn">구입하기</button>
        <a href="${ipad.url}" class="link">더 알아보기</a>
    `

    // ${}
    // {} 중괄호 안에 출력 되길 원하는 데이터 값 입력
    // 이를 보간법이라 하며, 백틱(`)기호를 사용하여 작성한다.


    itemsEl.append(itemEl)
})



// Footer 중 navigations 선택자 js데이터 연동하여 출력
const navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(function (nav) {
    const mapEl = document.createElement('div')
    // div를 생성할거고
    mapEl.classList.add('map')
    // 그렇게 생성 된 것은
    // 클래스명에 map 이라는 클래스명이 추가되어 연동 데이터가 연결 될 것.
    //  -- * .classList = 클래스(이름)에
    //  -- * .add = 더해서  

    let mapList = ''
    nav.maps.forEach(function (map) {
        mapList += /* html */ `
        <!-- maps안에 있는 요소 => map이라는 객체로 표현 -->
        <!-- += 할당연산자 하나씩 늘어난다 -->
        <li>
            <a href="${map.url}">${map.name}</a>
        </li>`
    })

    mapEl.innerHTML = /* html */ `
        <h3>
            <span class="text">${nav.title}</span>
        </h3>
        <ul>
            ${mapList}
        </ul>
`
    navigationsEl.append(mapEl)
})


const thisYearEl = document.querySelector('span.this-year')
thisYearEl.textContent = new Date().getFullYear()
// new를 붙여야 생성자 함수를 호출 할 수 있음

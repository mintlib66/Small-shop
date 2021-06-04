
//main
loadItems()
.then(items => {
    displayItems(items);
    setEventListeners();
})
.catch(console.log);

//json파일에서 fetch
function loadItems(){
    return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.items);
}

//최초 아이템 리스트 받아오기
function displayItems(items){
    const container = document.querySelector(".item-list__list");

    //받아온 json배열을 li로 변환 -> 문자열로 변환
    container.innerHTML = items.map((item)=>createHTMLString(item)).join('');
}

function createHTMLString(item) {
    return `
        <li class="item-list__item" data-color="${item.color}" data-type="${item.type}">
            <img src="${item.image}" alt=${item.type} class="fas fa-tshirt item-list__item__thumbnail"></img>
            <span class="item-list__item__info">${item.gender}, ${item.size}</span>
        </li>
    `;
}

//--버튼 클릭--
function onLogoClick(){
    const item_list = document.querySelectorAll(".item-list__item");

    item_list.forEach(item => {
        if(item.classList.contains("hidden")){
            item.classList.remove("hidden");
        } 
    });
}

function onButtonClick(event){
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;
    
    if(key == null || value == null){
        return;
    }
    classifyItems(key, value);
}

function classifyItems(key, value){
    //새로 데이터 update없이 상태만 변경
    const item_list = document.querySelectorAll(".item-list__item");

    item_list.forEach(item => {
        //조건에 해당하는 아이템만 보여주기
        if((key === "type" && item.dataset.type === value)||
            (key ==="color" && item.dataset.color === value)){
            item.classList.remove("hidden");
        }else if(!item.classList.contains("hidden")){
            item.className += " hidden";
        } 
    });
}

//--이벤트 리스너--
function setEventListeners() {
    const logo = document.querySelector('.top__logo');
    const buttons = document.querySelector('.menu');

    logo.addEventListener('click', () => onLogoClick());

    //button들이 든 menu에 이벤트 리스너 넣어도 한번에 적용됨
    buttons.addEventListener('click', event => onButtonClick(event));
}

//main
loadItems()
.then(items => {
    displayItems(items);
    setEventListeners(items)
})
.catch(console.log);

//fetch items from json files
function loadItems(){
    return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.items);
}

//Update list with given items
function displayItems(items){
    const container = document.querySelector(".item-list__list");

    //받아온 json배열을 li로 변환 -> 문자열로 변환
    container.innerHTML = items.map((item)=>createHTMLString(item)).join('');
}

function createHTMLString(item) {
    return `
        <li class="item-list__item">
            <img src="${item.image}" alt=${item.type} class="fas fa-tshirt item-list__item__thumbnail"></img>
            <span class="item-list__item__info">${item.gender}, ${item.size}</span>
        </li>
    `;
}

function onButtonClick(event, items){
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;
    
    if(key == null || value == null){
        return;
    }
    console.log(value);
    console.log(items.filter(item => item[key] === value));
    displayItems(items.filter(item => item[key] === value));
}

function setEventListeners(items) {
    const logo = document.querySelector('.top__logo');
    const buttons = document.querySelector('.menu');

    logo.addEventListener('click', () => displayItems(items));
    //button들이 든 menu에 넣어도 한번에 적용됨
    buttons.addEventListener('click', event => onButtonClick(event, items));
}
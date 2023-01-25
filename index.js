const cardObjectDefinitions = [
    {id:1, imagePath:'/images/card-KingHearts.png'},
    {id:2, imagePath:'/images/card-JackClubs.png'},
    {id:3, imagePath:'/images/card-QueenDiamonds.png'},
    {id:4, imagePath:'/images/card-AceSpades.png'}
];

const cardBackImgPath = '/images/card-back-blue.png';

let cards = [];

const playGameButtonElem = document.getElementById('playGame');

const cardContainerElem = document.querySelector('.card-container');

const collapsedGridAreaTemplate = '"a a" "a a"';
const cardCollectionCellClass = ".card-pos-a";

const numCards = cardObjectDefinitions.length;

let cardPositions = [];

{/* <div class="card">
    <div class="card-inner">
        <div class="card-front">
            <img src="/images/card-JackClubs.png" alt="" class="card-img">
        </div>
        <div class="card-back">
            <img src="/images/card-back-Blue.png" alt="" class="card-img">
        </div>
    </div>
</div> */}

loadGame();

function loadGame() {
    createCards();

    cards = document.querySelectorAll('.card');

    playGameButtonElem.addEventListener('click', ()=>startGame());
}
function startGame(){
    initializeNewGame();
    startRound();
}
function initializeNewGame(){

}
function startRound(){
    initializeNewRound();
    collectCards();
    flipCards(true);
    shuffleCards();
}
function initializeNewRound(){

}

function collectCards(){
    transformGridArea(collapsedGridAreaTemplate);
    addCardsToGridAreaCell(cardCollectionCellClass);
}

function transformGridArea(areas){
    cardContainerElem.style.gridTemplateAreas = areas;
}
function addCardsToGridAreaCell(cellPositionClassName){
    const cellPositionElem = document.querySelector(cellPositionClassName);

    cards.forEach((card, index) =>{
        addChildElement(cellPositionElem, card)
    })
}

function flipCard(card, flipToBack){
    const innerCardElem = card.firstChild;

    if(flipToBack && !innerCardElem.classList.contains('flip-it')){
        innerCardElem.classList.add('flip-it');
    }
    else if(innerCardElem.classList.remove('flip-it'));
}

function flipCards(flipToBack){
    cards.forEach((card, index) => {
        setTimeout(() => {
            flipCard(card, flipToBack)
        }, index * 100);
    },)
}
function shuffleCards(){
    const id = setInterval(shuffle, 12)
    let shuffleCount = 0;

    function shuffle() {
        randomizeCardPositions();

        if(shuffleCount == 500){
            clearInterval(id);
            dealCards();
        }
        else {
            shuffleCount++;
        }
    }
}   
function randomizeCardPositions(){
    const random1 = Math.floor(Math.random() * numCards) + 1
    const random2 = Math.floor(Math.random() * numCards) + 1

    const temp = cardPositions[random1 - 1];

    cardPositions[random1 - 1] = cardPositions[random2 - 1];
    cardPositions[random2 - 1] = temp;
}
function dealCards(){
    addCardsToAppropriateCell();
    const areasTemplate = returnGridAreasMappedToCardPos();

    transformGridArea(areasTemplate);

}
function returnGridAreasMappedToCardPos(){
    let firstPart = "";
    let secondPart = "";
    let areas = "";

    cards.forEach((card, index) => {
        if(cardPositions[index] == 1){
            areas = areas + "a ";
        }
        else if(cardPositions[index] == 2){
            areas = areas + "b ";
        }
        else if(cardPositions[index] == 3){
            areas = areas + "c ";
        }
        else if(cardPositions[index] == 4){
            areas = areas + "d ";
        }
        if (index == 1){
            firstPart = areas.substring(0, areas.length - 1);
            areas = "";
        }
        else if (index == 3){
            secondPart = areas.substring(0, areas.length - 1);
        }

        return `"${firstPart}" "${secondPart}"`;
    })
}
function addCardsToAppropriateCell(){
    cards.forEach((card) => {
        addCardToGridCell(card);
    })
}

function createCards(){
    cardObjectDefinitions.forEach((cardItem) => {
        createCard(cardItem);
    })
}

function createCard(cardItem){
    const cardElem = document.createElement('div');
    const cardInnerElem = createElement('div');
    const cardFrontElem = createElement('div');
    const cardBackElem = createElement('div');

    const cardFrontImg = createElement('img');
    const cardBackImg = createElement('img');

    addClassToElement(cardElem, 'card');

    addIdToElement(cardElem, cardItem.id);

    addClassToElement(cardInnerElem, 'card-inner');

    addClassToElement(cardFrontElem, 'card-front');

    addClassToElement(cardBackElem,  'card-back');

    addSrcToImageElem(cardBackImg, cardBackImgPath);

    addSrcToImageElem(cardFrontImg, cardItem.imagePath);

    addClassToElement(cardBackImg, 'card-img');

    addClassToElement(cardFrontImg, 'card-img');

    addChildElement(cardFrontElem, cardFrontImg);

    addChildElement(cardBackElem, cardBackImg);

    addChildElement(cardInnerElem, cardFrontElem);

    addChildElement(cardInnerElem, cardBackElem);

    addChildElement(cardElem, cardInnerElem);

    addCardToGridCell(cardElem);

    initializeCardPositions(cardElem);
}
function initializeCardPositions(card){
    cardPositions.push(card.id);
}

function createElement(elemType){
    return document.createElement(elemType);
}
function addClassToElement(elem, className){
    elem.classList.add(className);
}
function addIdToElement(elem, id){
    elem.id = id;
}
function addSrcToImageElem(imgElem, src){
    imgElem.src = src;
}
function addChildElement(parentElem, childElem){
    parentElem.appendChild(childElem);
}
function addCardToGridCell(card){
    const cardPositionClassName = mapCardIdToGridCell(card);

    const cardPosElem = document.querySelector(cardPositionClassName);

    addChildElement(cardPosElem, card)
}
function mapCardIdToGridCell(card){
    
    if(card.id == 1)
    {
        return '.card-pos-a'
    } 
    else if (card.id == 2)
    {
        return '.card-pos-b'
    }
    else if (card.id == 3)
    {
        return '.card-pos-c'
    }
    else if (card.id == 4)
    {
        return '.card-pos-d'
    }
}
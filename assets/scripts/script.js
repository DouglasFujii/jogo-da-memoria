const FRONT = 'card_front';
const BACK = 'card_back';
const CARD = 'card';
const ICON = 'icon';

let techs = ['bootstrap',
    'css',
    'html',
    'electron',
    'firebase',
    'javascript',
    'jquery',
    'mongo',
    'node',
    'react'];

let cards = null;

startGame();

function startGame() {

    //  coloca em cards todas as 20 cartas
    cards = createCardsFromTechs(techs);

    //  embaralha as cartas
    shuffleCards(cards);

    // cria as cartas do tabuleiro
    initializeCards(cards);
    
}

function initializeCards(cards) {
    let gameBoard = document.getElementById('gameBoard');

    // cria um elemento html para cada carta em cards
    cards.forEach( card => {

        // cria a div
        let cardElement = document.createElement('div')

        // atribui o id de card para o elemento html
        cardElement.id = card.id

        // adiciona a classe do elemento
        cardElement.classList.add(CARD)

        // adiciona o data-icon do elemento que será a verificação de par
        cardElement.dataset.icon = card.icon;

        // cria o front e o back da carta
        createCardContent(card, cardElement);

        // adiciona o evento de click para virar a carta
        cardElement.addEventListener('click', flipCard)

        // coloca o elemento no tabuleiro
        gameBoard.appendChild(cardElement)
    })
}

function createCardContent(card, cardElement) {

    // função para criar a face da carta
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);

}

function createCardFace(face, card, element) {

    // cria o elemento div de cada face
    let cardElementFace = document.createElement('div');

    // adiciona a classe
    cardElementFace.classList.add(face);

    // condicional se for frente ou verso da carta receberá conteúdo diferente
    if (face === FRONT) {

        // cria o elemento img
        let iconElement= document.createElement('img');

        // adiciona a classe
        iconElement.classList.add(ICON);

        // adiciona o endereço da imagem
        iconElement.src = './assets/images/' + card.icon + '.png';

        // adiciona a face da frente ao elemento
        cardElementFace.appendChild(iconElement);

    } else {
        // contaúdo da parte de trás da carta
        cardElementFace.innerHTML = "&lt/&gt";
    }

    // colocar elemento
    element.appendChild(cardElementFace)
}

function shuffleCards(cards) {

    // index começa com o último elemento
    let currentIndex = cards.length;
    let randomIndex = 0;

    // loop enquanto currentIndex for maior que 0
    while(currentIndex > 0) {

        // atribui ao randomIndex um número aleatório relacionado com o index do array cards
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // maneira de inverter valores com JS [a, b] = [b, a]
        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]];
    }
}


function createCardsFromTechs(techs) {

    //  array com todos os pares
    let cards = [];

    // para cada tech, cria um par e coloca em cards 
    techs.forEach((tech) => {
        cards.push(createPairFromTech(tech));
    });

    // desmembra os pares (arrays) dentro de cards e retorna todos os 20 elementos
    return cards.flatMap(pair => pair);

}

function createPairFromTech(tech) {

    // retorna um array com dois objetos para cada tech
    return [{
        id: createIdWithTech(tech),
        icon: tech,
        flipped: false
    }, {
        id: createIdWithTech(tech),
        icon: tech,
        flipped: false
    }]

}

function createIdWithTech(tech) {

    // cria um numero inteiro randomico e concatena com a tech
    return tech + parseInt(Math.random() * 1000);

}

function flipCard() {

    // adiciona a classe flip para virar a carta
    this.classList.add('flip')
}
const FRONT = 'card_front';
const BACK = 'card_back';
const CARD = 'card';
const ICON = 'icon';

startGame();

function startGame() {

    // cria as cartas do tabuleiro
    initializeCards(game.createCardsFromTechs());

}

function initializeCards(cards) {
    let gameBoard = document.getElementById('gameBoard');

    // cria um elemento html para cada carta em cards
    game.cards.forEach(card => {

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
        let iconElement = document.createElement('img');

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

function flipCard() {

    // quando a carta for clicada e colocada em firstCard ou secondCard 
    if (game.setCard(this.id)) {

        // adiciona a classe flip para virar a carta
        this.classList.add('flip')

        // se houver a segunda carta
        if (game.secondCard) {

            // checar se as cartas são iguais
            if (game.checkMatch()) {

                // destravar as cartas
                game.clearCards()

            // se não, desvirar as cartas
            } else {

                setTimeout(() => {

                    const firstCardView = document.getElementById(game.firstCard.id);
                    const secondCardView = document.getElementById(game.secondCard.id);

                    // removendo a classe flip caso não  haja match
                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');

                    // limpando as cartas
                    game.unflipCards();
                }, 1000);


            };
        }



    };
}
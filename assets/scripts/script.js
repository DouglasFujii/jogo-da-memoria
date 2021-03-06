const FRONT = 'card_front';
const BACK = 'card_back';
const CARD = 'card';
const ICON = 'icon';
const hudTimer = document.getElementById('timer');
const showMoves = document.getElementById('moves');
const gameOverLayer = document.getElementById('gameover');
let moves = '00';
let timer = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let makeMove = false;




// cria as cartas do tabuleiro
game.createCardsFromTechs();

// coloca as cartas na tela
startGame();

// começando com as cartas viradas e não embaralhadas
flipAllCards();

function startGame() {
    const gameBoard = document.getElementById('gameBoard');

    // limpa o game board
    gameBoard.innerHTML = '';

    // cria um elemento html para cada carta em cards
    game.cards.forEach(card => {

        // cria a div
        const cardElement = document.createElement('div');

        // atribui o id de card para o elemento html
        cardElement.id = card.id;

        // adiciona a classe do elemento
        cardElement.classList.add(CARD);

        // adiciona o data-icon do elemento que será a verificação de par
        cardElement.dataset.icon = card.icon;

        // cria o front e o back da carta
        createCardContent(card, cardElement);

        // adiciona o evento de click para virar a carta
        cardElement.addEventListener('click', flipCard);

        // coloca o elemento no tabuleiro
        gameBoard.appendChild(cardElement);
    })
}

function createCardContent(card, cardElement) {

    // função para criar a face da carta
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);

}

function createCardFace(face, card, element) {

    // cria o elemento div de cada face
    const cardElementFace = document.createElement('div');

    // adiciona a classe
    cardElementFace.classList.add(face);

    // condicional se for frente ou verso da carta receberá conteúdo diferente
    if (face === FRONT) {

        // cria o elemento img
        const iconElement = document.createElement('img');

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

    // colocar as faces da carta
    element.appendChild(cardElementFace);
}

function flipCard() {

    // inicia quando o jogador faz um movimento. Essa checagem é necessária, pois cada movimento do jogador iria executar a função novamente, fazendo o contador acelerar. O método setInterval executa inifitamente a cada invervalo passado
    if (!makeMove) {
        timer = setInterval(countTime, 1000);
        seconds = 0;
        minutes = 0;
        hours = 0;
        makeMove = true;
    }
    // quando a carta for clicada e colocada em firstCard ou secondCard 
    if (game.setCard(this.id)) {

        // adiciona a classe flip para virar a carta
        this.classList.add('flip');

        // se houver a segunda carta
        if (game.secondCard) {

            // adiciona movimento se colocar alguma carta em secondCard
            addMove();

            // checar se as cartas são iguais
            if (game.checkMatch()) {

                // destravar as cartas
                game.clearCards();

                // checar game over
                if (game.checkGameOver()) {

                    // parar timer
                    clearInterval(timer);

                    // mostrar tela final
                    showGameOverLayer();

                };

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
        };
    };
}

function restart() {

    flipAllCards();

    // reinicia o timer
    hudTimer.innerHTML = '00:00:00';
    makeMove = false;

    // reinicia o contador
    showMoves.innerHTML = '00';
    moves = '00';

    setTimeout(() => {
        // remover as cartas das variáveis
        game.clearCards();

        game.createCardsFromTechs();

        // embaralha as cartas
        game.shuffleCards();

        // recomeça o jogo;
        startGame();

        // remover a tela de game over 
        gameOverLayer.style.display = 'none';

    }, 700);


}

function flipAllCards() {

    // para cada carta em cards coloca ou remove a classe flip
    game.cards.forEach(card => {
        const currentCard = document.getElementById(card.id);

        // propriedade toggle coloca a classe flip se não houver ou remove caso contrário
        currentCard.classList.toggle('flip');
    })

}

function countTime() {
    seconds = parseInt(seconds);
    minutes = parseInt(minutes);
    hours = parseInt(hours);

    seconds++;

    // formata o número para aparecer o zero antes
    if (seconds < 10) {
        seconds = '0' + seconds
    }

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    if (hours < 10) {
        hours = '0' + hours;
    }

    if (seconds >= 60) {
        minutes += 1;
        seconds = '00';
    }

    if (minutes >= 60) {
        hours += 1;
        minutes = '00'
    }

    // coloca na tela o tempo
    hudTimer.innerHTML = hours + ':' + minutes + ':' + seconds;

}

function addMove() {

    // transforma a string de moves em numero para ser incrementado
    moves = parseInt(moves);
    moves++;

    // se moves for menor que 10, mostrar o zero antes do número
    if (moves < 10) {
        showMoves.innerHTML = '0' + moves;
    } else {
        showMoves.innerHTML = moves;
    }
}

function showGameOverLayer() {

    const gameOverText = document.getElementById('gameOverText');
    const restartButton = document.getElementById('restart');
    const title = document.createElement('h1');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');
    const p4 = document.createElement('p');

    gameOverText.innerHTML = '';
    title.innerHTML = 'Parabéns!'
    gameOverText.appendChild(title);

    p1.innerHTML = 'Você completou o jogo!';
    gameOverText.appendChild(p1);

    p2.style.margin = '25 px 0 0 0';

    p2.innerHTML = printTime(parseInt(hours), parseInt(minutes), parseInt(seconds));
    gameOverText.appendChild(p2);

    p3.innerHTML = printMoves(moves);
    gameOverText.appendChild(p3);

    p4.innerHTML = printResult(parseInt(moves));
    gameOverText.appendChild(p4);

    restartButton.innerHTML = 'Reiniciar o jogo';

    setTimeout(() => {
        // mostrar a tela de game over
        gameOverLayer.style.display = 'flex';
    }, 500)


}

function printTime(h, m, s) {

    let res = 'Seu tempo total foi de ';
    let arr = [];

    if (h != 0) {
        if (h === 1) {
            arr.push(h + ' hora');
        } else {
            arr.push(h + ' horas');
        }        
    }

    if (m != 0) {
        if (m === 1) {
            arr.push(m + ' minuto');
        } else {
            arr.push(m + ' minutos');
        }
    }

    if (s != 0) {
        if(s === 1) {
            arr.push(s + ' segundo');
        } else {
            arr.push(s + ' segundos')
        }
    }

    if (arr.length === 3) {
        res += arr[0] + ' , ' + arr[1] + ' e ' + arr[2] + '.'; 
    }

    if (arr.length === 2) {
        res += arr[0] + ' e ' + arr[1] + '.';
    }

    if (arr.length === 1) {
        res += arr[0] + '.';
    }

    return res;
}

function printMoves(moves) {

    return 'Você terminou o jogo com ' + moves + ' movimentos!';

}

function printResult(moves) {

    let res = '';

    if (moves === 10) {
        res = 'Espera, se você não errou nenhum movimento, acho que descobriu o segredo...'
    }

    if (moves > 10 && moves <= 15) {
        res = 'Performace incrível! Para melhorar, só descobrindo o segredo...'
    }

    if (moves > 15 && moves <= 30) {
        res = 'Você foi muito bem, só que consegue melhorar ainda mais!'
    }

    if (moves > 30) {
        res = 'Vamos lá, você consegue melhorar!'
    }

    return res;
}
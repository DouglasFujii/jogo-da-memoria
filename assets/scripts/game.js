let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    techs: ['bootstrap',
        'css',
        'html',
        'electron',
        'firebase',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'],

    cards: null,

    setCard: function (id) {

        // id da carta flipada
        let card = this.cards.filter(card => card.id === id)[0]

        // não virar uma carta flipada
        if (card.flipped || this.lockMode) {
            return false;
        }

        // condicional para colocar a carta flipada em firstCard ou secondCard
        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }

    },

    checkMatch: function () {

        // checa se as cartas viradas tem a mesma imagem
        if (!this.firstCard || !this.secondCard) {
            return false
        }
        return this.firstCard.icon === this.secondCard.icon

    },

    clearCards: function () {

        // remove qualquer carta que estiver nas variaveis
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards: function () {

        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver: function () {

        // se não houver nenhuma carta virada para baixo retorna true
        return this.cards.filter(card => !card.flipped).length == 0
    },


    createCardsFromTechs: function () {

        //  array com todos os pares
        this.cards = [];

        // para cada tech, cria um par e coloca em cards 
        this.techs.forEach((tech) => {
            this.cards.push(this.createPairFromTech(tech));
        });

        // desmembra os pares (arrays) dentro de cards e retorna todos os 20 elementos
        this.cards = this.cards.flatMap(pair => pair);

        //  embaralha as cartas
        // this.shuffleCards();

        return this.cards;

    },

    createPairFromTech: function (tech) {

        // retorna um array com dois objetos para cada tech
        return [{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false
        }, {
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false
        }]

    },

    createIdWithTech: function (tech) {

        // cria um numero inteiro randomico e concatena com a tech
        return tech + parseInt(Math.random() * 1000);

    },

    shuffleCards: function () {

        // index começa com o último elemento
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        // loop enquanto currentIndex for maior que 0
        while (currentIndex > 0) {

            // atribui ao randomIndex um número aleatório relacionado com o index do array cards
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // maneira de inverter valores com JS [a, b] = [b, a]
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }
    },


}
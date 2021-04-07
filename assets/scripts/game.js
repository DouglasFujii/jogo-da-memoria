let game = {

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
        this.shuffleCards();

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

    shuffleCards: function (cards) {

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
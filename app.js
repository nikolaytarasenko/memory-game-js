// document.querySelector('.card').addEventListener('click', e => {
//     const cardInner = e.target.closest('.card__inner');
//
//     cardInner.classList.add('flipped');
// })

class Memory {
    constructor(gameField) {
        this.$gameField = gameField;
        this.initialCards = [
            {
                name: "php",
                img: "./images/php-logo_1.png",
                id: 1,
            },
            {
                name: "css3",
                img: "./images/css3-logo.png",
                id: 2
            },
            {
                name: "html5",
                img: "./images/html5-logo.png",
                id: 3
            },
            {
                name: "javascript",
                img: "./images/js-logo.png",
                id: 4
            },
            {
                name: "node",
                img: "./images/nodejs-logo.png",
                id: 5
            },
            {
                name: "python",
                img: "./images/python-logo.png",
                id: 6
            },
            {
                name: "sass",
                img: "./images/sass-logo.png",
                id: 7
            },
            {
                name: "wordpress",
                img: "./images/wordpress-logo.png",
                id: 8
            },
        ];
        this.backfaceCard = {
            name: "www",
            img: "./images/www.png",
            id: 0
        }
    }

    start() {
        this.init();
    }

    init() {
        this.drawField();
    }

    // helper functions
    shuffle(array) {
        const newArray = [...array];

        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }

        return newArray;
    }

    // game functions
    drawField() {
        const cards = this.createCardList();

        cards.forEach(card => {
            this.$gameField.insertAdjacentHTML('beforeend', card);
        })
    }

    createCardList() {
        const emptyCards = [...this.initialCards, ...this.initialCards];
        const shuffledCards = this.shuffle(emptyCards);

        return shuffledCards.map(card => {
            return this.createCard(card);
        });
    }

    createCard(cardData) {
        return `<div class="game__card card">
                    <div class="card__inner">
                        <div class="card__front">
                            <img src="${cardData.img}" alt="${cardData.name}">
                        </div>
                        <div class="card__back">
                            <img src="${this.backfaceCard.img}" alt="${this.backfaceCard.name}">
                        </div>
                    </div>
                </div>
            `;
    }
}

const gameField = document.querySelector('.game__field');
const startButton = document.querySelector('#start');

const game = new Memory(gameField);

startButton.addEventListener('click', () => game.start());
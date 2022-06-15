class Memory {
    constructor(gameField, startButton, resetButton) {
        this.$gameField = gameField;
        this.$startButton = startButton;
        this.$resetButton = resetButton;
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
        };
        this.flippedCards = [];
        this.matches = [];
        this.attempts = 0;
    }

    start() {
        this.init();
    }

    reset() {
        this.flippedCards = [];
        this.matches = [];
        this.attempts = 0;
        this.clearGameField();
        this.toggleButtons();
    }

    init() {
        this.toggleButtons();
        this.drawAttemptsCount();
        this.drawScoresCount();
        this.drawAllPairsCount();
        this.clearGameField();
        this.drawGameField();
        this.addGameFieldClickHandler();
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
    clearGameField() {
        this.$gameField.innerHTML = '';
    }

    drawGameField() {
        const cards = this.createCardList();

        cards.forEach(card => {
            this.$gameField.insertAdjacentHTML('beforeend', card);
        });
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
                    <div class="card__inner" data-card-id="${cardData.id}">
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

    addGameFieldClickHandler() {
        this.$gameField.addEventListener('click', e => this.flipCard(e));
    }

    flipCard(e) {
        const cardInner = e.target.closest('.card__inner');

        if (cardInner.classList.contains('flipped')) return;

        cardInner.classList.add('flipped');

        if (this.flippedCards.length <= 1) this.flippedCards.push(cardInner.dataset.cardId);

        if (this.flippedCards.length === 2) {
            cardInner.addEventListener('transitionend', () => this.checkFlippedCards(), { once: true });
            this.attempts++;
            this.drawAttemptsCount();
        }
    }

    checkFlippedCards() {
        if (this.flippedCards[0] === this.flippedCards[1]) {
            const matchedCard = this.initialCards.filter(card => card.id === Number(this.flippedCards[0]));

            this.matches.push(matchedCard);
            this.drawScoresCount();
            this.flippedCards = [];
        } else {
            this.hideCards();
        }
    }

    hideCards() {
        const cardsInner = document.querySelectorAll('.card__inner');

        cardsInner.forEach(cardInner => {
            const cardId = cardInner.dataset.cardId;

            if (this.flippedCards.includes(cardId)) cardInner.classList.remove('flipped');
        });

        this.flippedCards = [];
    }

    drawAttemptsCount() {
        const attempts = document.querySelector('.attempts .digit');

        attempts.textContent = this.attempts;
    }

    drawScoresCount() {
        const scores = document.querySelector('.scores .digit');

        scores.textContent = this.matches.length.toString();
    }

    drawAllPairsCount() {
        const allPairs = document.querySelector('.all .digit');

        allPairs.textContent = this.initialCards.length.toString();
    }

    toggleStartButtonState() {
        this.$startButton.disabled ?
            this.$startButton.removeAttribute('disabled') :
            this.$startButton.setAttribute('disabled', 'true');
    }

    toggleResetButtonState() {
        this.$resetButton.disabled ?
            this.$resetButton.removeAttribute('disabled') :
            this.$resetButton.setAttribute('disabled', 'true');
    }

    toggleButtons() {
        this.toggleStartButtonState();
        this.toggleResetButtonState();
    }
}

const gameField = document.querySelector('.game__field');
const startButton = document.querySelector('#start');
const resetButton = document.querySelector('#reset');

const game = new Memory(gameField, startButton, resetButton);

startButton.addEventListener('click', () => game.start());
resetButton.addEventListener('click', () => game.reset());
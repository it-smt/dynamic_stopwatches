// Конструктор для создания объекта секундомера
function Stopwatch() {
    this.startTime = 0;
    this.elapsedTime = 0;
    this.timerId = null;
}

// Методы для управления секундомером
Stopwatch.prototype.start = function () {
    if (!this.timerId) {
        this.startTime = Date.now() - this.elapsedTime;
        this.timerId = setInterval(() => {
            this.elapsedTime = Date.now() - this.startTime;
            this.updateTime();
        }, 1000);
    }

    this.stopwatchElements.forEach((element) => {
        element.addEventListener('click', () => {
            element.classList.add('_active');
        });
    });
};

Stopwatch.prototype.stop = function () {
    if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
    }
};

Stopwatch.prototype.updateTime = function () {
    let activeElementsCount = 0;
    this.stopwatchElements.forEach((element) => {
        if (element.classList.contains('_active')) {
            activeElementsCount += 1;
        }
    });

    if (this.stopwatchElements.length === activeElementsCount) {
        this.stop();
        this.stopwatchButtonDone.classList.remove('_lock');
    }

    var seconds = Math.floor((this.elapsedTime / 1000) % 60);
    var minutes = Math.floor((this.elapsedTime / (1000 * 60)) % 60);

    var timeString = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0')

    this.displayTime(timeString);
};

Stopwatch.prototype.displayTime = function (timeString) {
    var stopwatchButtonDoneText = this.stopwatchButtonDoneText;
    if (stopwatchButtonDoneText) {
        stopwatchButtonDoneText.innerHTML = timeString;
    }
};

// Функция для создания нового секундомера
function createStopwatch(card) {
    let cardElements = card.querySelectorAll('.card__element');
    let startButton = card.querySelector('.card__button-start');
    let doneButton = card.querySelector('.card__button-done');

    let stopwatch = new Stopwatch();

    stopwatch.stopwatchElements = cardElements;
    stopwatch.stopwatchButtonStart = startButton;
    stopwatch.stopwatchButtonDone = doneButton;
    stopwatch.stopwatchButtonDoneText = card.querySelector('.text');

    startButton.addEventListener('click', () => {
        stopwatch.start();
        startButton.classList.add('_active');
        doneButton.classList.add('_active');
        doneButton.classList.add('_lock');
    });

    doneButton.addEventListener('click', () => {
        stopwatch.stop();
        card.remove();
    });
}

const cardsContainer = document.querySelector('.cards');
const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
    createStopwatch(card);
});

function createCard() {
    const card = document.createElement('div');
    card.classList.add('card');
    const cardTitle = document.createElement('div');
    cardTitle.classList.add('card__title');
    cardTitle.innerText = 'Привет';
    card.appendChild(cardTitle);
    const cardElements = document.createElement('div');
    cardElements.classList.add('card__elements');
    for (let i = 0; i < 4; i++) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card__element');
        cardElement.innerText = 'Байрам';
        cardElements.appendChild(cardElement);
    }
    card.appendChild(cardElements);
    const buttonStart = document.createElement('div');
    buttonStart.classList.add('card__button-start');
    buttonStart.innerText = 'Старт';
    card.appendChild(buttonStart);
    const buttonDone = document.createElement('div');
    buttonDone.classList.add('card__button-done');
    buttonDone.innerHTML = 'Готово (<span class="text">00:00</span>)';
    card.appendChild(buttonDone);
    cardsContainer.appendChild(card);
    createStopwatch(card);
}

const buttonAddCard = document.querySelector('.add-button');
buttonAddCard.addEventListener('click', () => {
    createCard();
});
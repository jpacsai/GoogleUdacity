document.addEventListener('DOMContentLoaded', function () {

    let cards = Array.from(document.getElementsByClassName("card"));
    let moveCounter = 0;
    let matchedCards = 0;

    let openCards = [];
    let card1;
    let card2;

    let cardClick = 0;
    let timing;
    let secCounter = 0;
    let minCounter = 0;

    let starCounter = 3;

    addCards();

    function addCards() {
        cards = shuffle(cards);
        const deck = document.querySelector('.deck');
        deck.style.display === "none";
        for (let card in cards) {
            deck.appendChild(cards[card]);
        }
        deck.style.display === "flex";
    }

    function shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
  
    for (let x in cards) {
        cards[x].onclick = function(event) {
            cardClicked(event);
        };
    }

    function cardClicked(event) {
        cardClick++;
        if (cardClick === 1) {
            timer();
        }
        event.target.classList.add("open");
        setTimeout(function(){event.target.classList.add("show");}, 180);
        check(event);
    }

    function check(event) {
        openCards.push(event.target.innerHTML.trim());
        if (openCards.length === 1) {
            card1 = event.target;
        }
        else if (openCards.length === 2) {
            disable();
            counter();
            card2 = event.target;
            if (openCards[0] === openCards[1]) {
                match();
            }
            else {
                noMatch();
            }
            if (moveCounter === 15) {
                starCounter = 2;
                star2();
            }
            else if (moveCounter === 20) {
                starCounter = 1;
                star1();
            }
        }
    }

    function match() {
        openCards.length = 0;
        card1.classList.add("match");
        card2.classList.add("match");
        card1 = null;
        card2 = null;
        enable();
        matchedCards++;
        if (matchedCards === 8) {
            win();
            stopTimer();
        }
    }

    function noMatch() {
        openCards.length = 0;
        setTimeout(function(){
            card1.classList.remove("open", "show");
            card2.classList.remove("open", "show");
            card1 = null;
            card2 = null;
            enable();
        }, 1200);
    }

    function disable() {
        for (let x in cards) {
            cards[x].classList.add('disable');
        }
    }

    function enable() {
        for (let x in cards) {
            cards[x].classList.remove('disable');
        }
    }

    function counter() {
        moveCounter++;
        document.querySelector('.moves').textContent = moveCounter;
    }
    
    function win() {
        const won = document.createElement("DIV");
        won.classList.add("winner");

        const wonHeader = document.createElement("H1");
        wonHeader.classList.add("winnerHeader");
        wonHeader.textContent = "Congratulation!";

        const wonText = document.createElement("H2");
        wonText.classList.add("winnerText");
        wonText.textContent = "You won with " + moveCounter + " moves in " + minCounter + " min " + secCounter + " sec!";

        const wonStar = document.createElement("DIV");
        
        for (let i = 0; i < starCounter; i++) {
            const wonStarOne = document.createElement("I");
            wonStarOne.classList.add('fa','fa-star','fa-3x','wonStar');
            wonStar.appendChild(wonStarOne);
        } 

        const newGameButton = document.createElement('DIV');
        newGameButton.classList.add('newGameButton');
        newGameButton.textContent = 'Play again?';
        
        won.appendChild(wonHeader);
        won.appendChild(wonText);
        won.appendChild(wonStar);
        won.appendChild(newGameButton);
        newGameButton.onclick = function(event) {
            restart();
            hideWin(won);
        };

        document.body.appendChild(won);  
    }

    function timer() {
        timing = setInterval(function(){
            secCounter++;
            if (secCounter === 60) {
                secCounter = 0;
                document.querySelector('.secCount').textContent = secCounter;
                minCounter++;
                document.querySelector('.minCount').textContent = minCounter;
            }
            else {
                document.querySelector('.secCount').textContent = secCounter;
            }
        },1000);
    }

    function stopTimer() {
        clearInterval(timing);
        secCounter = 0;
        minCounter = 0;
    }

    const restartButton = document.querySelector(".restart");
    restartButton.onclick = function() {
        restart();
    };

    function restart() {
        disable();

        // reset timer
        stopTimer();
        document.querySelector('.secCount').textContent = 0;
        document.querySelector('.minCount').textContent = 0;

        // reset moves counter
        moveCounter = 0;
        document.querySelector('.moves').textContent = 0;

        // turn back open cards, reshuffle deck
        for (let card in cards) {
            cards[card].classList.remove("open", "show", "match");
        }
        setTimeout(function(){ addCards(); }, 400);

        // reset stars
        let stars = Array.from(document.getElementsByClassName("fa"));
        for (let s in stars) {
            stars[s].classList.replace('fa-star-o', 'fa-star');
        }

        // reset variables
        cardClick = 0;
        card1 = null;
        card2 = null;
        matchedCards = 0;
        starCounter = 3;
        
        enable();
    }

    function star2() {
        let star = document.getElementsByClassName("fa")[2].classList;
        star.replace('fa-star', 'fa-star-o');
    }

    function star1() {
        let star = document.getElementsByClassName("fa")[1].classList;
        star.replace('fa-star', 'fa-star-o');
    }

    function hideWin(won) {
        won.style.display === "none";
        won.remove();
    }
});
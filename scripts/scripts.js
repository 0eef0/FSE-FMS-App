// global variables
let score = 0;
let mins = 0;
let secs = 0;

let scoreInc;
let timeInc;
let dotInc = [];

// DOM elements
let exerciseDOM = document.getElementById('exercise');
let difficultyDOM = document.getElementById('difficulty');
let timeDOM = document.getElementById('time');
let dotFieldDOM = document.getElementById('dotField');
let scoreDOM = document.getElementById('score');
let timerDOM = document.getElementById('timer');
let resultsDOM = document.getElementById('results');

let scoreNumDOM = document.getElementById('scoreNum');
let scoreMulDOM = document.getElementById('scoreMul');
let scoreFinDOM = document.getElementById('scoreFin');

const OHF = () => {
    dotFieldDOM.innerHTML = `<div class="dot" id="d1" style="width: ${difficultyDOM.value / 62.5}px; height: ${difficultyDOM.value / 62.5}px;">one</div><div class="dot" id="d2" style="width: ${difficultyDOM.value / 62.5}px; height: ${difficultyDOM.value / 62.5}px;">two</div>`;
    document.getElementById("d1").style.top = `${Math.floor(Math.random() * window.innerHeight)}px`;
    document.getElementById("d1").style.left = `${Math.floor(Math.random() * window.innerWidth / 2)}px`;
    var d1Rect = document.getElementById("d1").getBoundingClientRect();
    document.getElementById("d2").style.top = `${Math.floor(Math.random() * 150 + d1Rect.y)}px`;
    document.getElementById("d2").style.left = `${Math.floor(Math.random() * 150 + d1Rect.x)}px`;

    dotInc.push(
        setInterval(() => {
            document.getElementById("d1").style.top = `${Math.floor(Math.random() * window.innerHeight + window.innerHeight / 10)}px`;
            document.getElementById("d1").style.left = `${Math.floor(Math.random() * window.innerWidth)}px`;
        }, difficultyDOM.value)
    );
    dotInc.push(
        setInterval(() => {
            var d1Rect = document.getElementById("d1").getBoundingClientRect();
            document.getElementById("d2").style.top = `${Math.floor(Math.random() * 150 + d1Rect.y / 2)}px`;
            document.getElementById("d2").style.left = `${Math.floor(Math.random() * 150 + d1Rect.x / 2)}px`;
        }, 5000)
    );
}


const THF = () => {
    dotFieldDOM.innerHTML = `<div class="dot" id="d1" style="width: ${difficultyDOM.value / 62.5}px; height: ${difficultyDOM.value / 62.5}px;"></div><div class="dot" id="d2" style="width: ${difficultyDOM.value / 62.5}px; height: ${difficultyDOM.value / 62.5}px;"></div>`;
    document.getElementById("d1").style.top = `${Math.floor(Math.random() * window.innerHeight)}px`;
    document.getElementById("d1").style.left = `${Math.floor(Math.random() * window.innerWidth / 2)}px`;
    dotInc.push(
        setInterval(() => {
            document.getElementById("d1").style.top = `${Math.floor(Math.random() * window.innerHeight + window.innerHeight / 10)}px`;
            document.getElementById("d1").style.left = `${Math.floor(Math.random() * window.innerWidth / 2)}px`;
        }, difficultyDOM.value)
    );
    dotInc.push(
        setInterval(() => {
            document.getElementById("d2").style.top = `${Math.floor(Math.random() * window.innerHeight + window.innerHeight / 10)}px`;
            document.getElementById("d2").style.left = `${Math.floor((Math.random() * window.innerWidth / 2) + window.innerWidth / 2)}px`;
        }, 5000)
    );
}

const start = () => {
    console.log('test');
    document.getElementById('startBtn').disabled = true;
    switch(exerciseDOM.value) {
        case 'OHF':
            console.log('OHF');
            OHF();
            break;
        case 'THF':
            console.log('THF');
            THF();
            break;
        case 'TDD':
            console.log('TDD');
            break;
        default:
            break;
    }

    let dotsDOM = document.getElementsByClassName('dot');
    let scoreInc = [];
    for(let i of dotsDOM) {
        i.addEventListener('touchstart', (e) => {
            e.preventDefault();
            i.classList.add('touching');
            scoreInc.push(
                setInterval(() => {
                    score++;
                    scoreDOM.textContent = `Score: ${score}`;
                }, 1)
            );
        })
        i.addEventListener('touchend', (e) => {
            e.preventDefault();
            i.classList.remove('touching');
            clearInterval(scoreInc[scoreInc.length - 1]);
        })
    }

    mins = timeDOM.value.split(":")[0];
    secs = timeDOM.value.split(":")[1];
    timerDOM.textContent = `Time: ${mins}:${secs}`;
    timeInc = setInterval(() => {
        secs--;
        if (mins == 0 && secs <= 0) {
            clearInterval(timeInc);
            clearInterval(scoreInc);
            dotInc.forEach(inc => clearInterval(inc));
            dotInc = [];

            scoreInc.forEach(inc => clearInterval(inc));
            scoreInc = [];

            let multi = (difficultyDOM.value == 5000) ? 1 : (difficultyDOM.value == 2500) ? 1.5 : 2;
            scoreNumDOM.textContent = score;
            scoreMulDOM.textContent = `x${multi}`;
            scoreFinDOM.textContent = score * multi;
            resultsDOM.style.display = 'table';
            dotFieldDOM.innerHTML = '';
        } else if (secs <= 0) {
            secs = 59;
            mins--;
        }
        timerDOM.textContent = `Time: ${mins}:${(secs < 10) ? `0${secs}` : secs}`;
    }, 1000)
}

const closePopup = () => {
    document.getElementById('startBtn').disabled = false;
    document.getElementById('results').style.display = 'none';
    score = 0;
}

// for(let i of dotsDOM) {
//     i.addEventListener('touchstart', () => {
//         i.classList.add('touching');
//         scoreInc = setInterval(() => {
//             score++;
//             scoreDOM.textContent = `Score: ${score}`;
//         }, 1)
//     })
//     i.addEventListener('touchend', () => {
//         i.classList.remove('touching');
//         clearInterval(scoreInc);
//     })
// }

// sample code for moving dot
// setInterval(() => {
//     document.getElementById("d1").style.top = `${Math.floor(Math.random() * window.innerHeight)}px`;
//     document.getElementById("d1").style.left = `${Math.floor(Math.random() * window.innerWidth / 2)}px`;
// }, 5000);
// setInterval(() => {
//     document.getElementById("d2").style.top = `${Math.floor(Math.random() * window.innerHeight)}px`;
//     document.getElementById("d2").style.left = `${Math.floor((Math.random() * window.innerWidth / 2) + window.innerWidth / 2)}px`;
// }, 5000);
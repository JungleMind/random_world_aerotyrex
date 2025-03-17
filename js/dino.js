let dino = document.getElementById('dino');
let dino1 = document.getElementById('dino1');
let helmet = document.getElementById('helmet');
let explosion = document.getElementById('explosion');
let bubble = document.getElementById('bubble');
const home = document.getElementById('home');
const spaceContainer = document.getElementById('space_container');
const gameContainer = document.getElementById('game-container');
const body = document.body;
let f_cow1 = document.getElementById('f_cow1');
let fight1 = document.getElementById('fight1');
let f_cow2 = document.getElementById('f_cow2');
let fight2 = document.getElementById('fight2');


let x = 100;
let y = -15;
let x1 = 100;
let y1 = 10;
const maxWidth = window.innerWidth - 200;
const maxHeight = window.innerHeight - 200;

document.addEventListener('keydown', (event) => {
    const display = window.getComputedStyle(gameContainer).display;
    if (display == 'none'){
        if(event.key === 'ArrowRight' && x1 < maxWidth) x1 += 10;
        if(event.key === 'ArrowLeft' && x1 > 100) x1 -= 10;
        if(event.key === 'ArrowUp' && y1 < maxHeight) y1+= 10;
        if(event.key === 'ArrowDown' && y1 > -15) y1 -= 10;

        dino1.style.left = x1 + 'px';
        dino1.style.bottom = y1 + 'px';

        helmet.style.left = (x1 + 115) + 'px';
        helmet.style.bottom = (y1 + 90) + 'px';

        checkCollisionWithCow1();
        checkCollisionWithCow2();
    } else {
        if(event.key === 'ArrowRight' && x < maxWidth) x += 10;
        if(event.key === 'ArrowLeft' && x > 100) x -= 10;
        if(event.key === 'ArrowUp' && y < maxHeight) y += 10;
        if(event.key === 'ArrowDown' && y > -15) y -= 10;


        dino.style.left = x + 'px';
        dino.style.bottom = y + 'px';

        wing.style.left = (x + 10) + 'px';
        wing.style.bottom = (y + 85) + 'px';

        if (y >= 20) {
            wing.style.opacity = '1';  
            wing.style.transform = 'scaleX(-1) rotate(-35deg) translateY(0)'; 
        } else {
            wing.style.opacity = '0';  
            wing.style.transform = 'scaleX(-1) rotate(-35deg) translateY(10px)';
        }

        checkCollision();
    }

    
});

function checkCollision() {
    const dinoRect = dino.getBoundingClientRect();
    const homeRect = home.getBoundingClientRect();

    const buffer = 100; 

    if (
        dinoRect.left + buffer < homeRect.right && 
        dinoRect.right - buffer > homeRect.left &&
        dinoRect.top + buffer < homeRect.bottom &&
        dinoRect.bottom - buffer > homeRect.top
    ) {
        triggerExplosion();
    }
}

function checkCollisionWithCow1() {
    const dinoRect = dino1.getBoundingClientRect();
    const f_cow1Rect = f_cow1.getBoundingClientRect();

    const buffer = 100; 

    if (
        dinoRect.left + buffer < f_cow1Rect.right && 
        dinoRect.right - buffer > f_cow1Rect.left &&
        dinoRect.top + buffer < f_cow1Rect.bottom &&
        dinoRect.bottom - buffer > f_cow1Rect.top
    ) {
        fight1.style.display = 'block';
        fight1.classList.add('explode'); 
    } else {
        fight1.style.display = 'none';
        fight1.classList.remove('explode'); 
    }
}

function checkCollisionWithCow2() {
    const dinoRect = dino1.getBoundingClientRect();
    const f_cow2Rect = f_cow2.getBoundingClientRect();

    const buffer = 100; 

    if (
        dinoRect.left + buffer < f_cow2Rect.right && 
        dinoRect.right - buffer > f_cow2Rect.left &&
        dinoRect.top + buffer < f_cow2Rect.bottom &&
        dinoRect.bottom - buffer > f_cow2Rect.top
    ) {
        fight2.style.display = 'block';
        fight2.classList.add('explode'); 
    } else {
        fight2.style.display = 'none';
        fight2.classList.remove('explode'); 
    }
}

function triggerExplosion() {
    explosion.style.display = 'block';
    explosion.classList.add('explode'); 

    setTimeout(() => {
        explosion.style.display = 'none';
        launchDino();
    }, 1000); 
}

function launchDino() {
    let launchInterval = setInterval(() => {
        if (y < window.innerHeight + 200) {
            y += 20;
            dino.style.bottom = y + 'px';
        } else {
            clearInterval(launchInterval);
            moveToSpace();
        }
    }, 50);
}

function moveToSpace() {
    gameContainer.style.display = 'none';
    spaceContainer.style.display = 'block';
}

function showBubble() {
    bubble.style.display = 'block';
    bubble.style.left = (x + 25) + 'px';
    bubble.style.bottom = (y + 30) + 'px';
}


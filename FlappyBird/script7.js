// Variables for board dimensions
let boardWidth, boardHeight;
let board;
let context;

// Bird dimensions and position
let birdWidth = 50; 
let birdHeight = 35;
let birdX, birdY;
let birdImg;

let bird = {
    x: 0,
    y: 0,
    width: birdWidth,
    height: birdHeight
};

// Pipes
let pipeArray = [];
let pipeWidth = 50; 
let pipeHeight = 550;

let topPipeImg;
let bottomPipeImg;

// Physics and game control
let velocityX = -2; // pipes moving left speed
let velocityY = 0; // bird jump speed
let gravity = 0.4;

let gameOver = false;
let score = 0;
let pipeInterval; // Declare a variable for the pipe generation interval

window.onload = function () {
    board = document.getElementById("board");
    boardWidth = board.offsetWidth; 
    boardHeight = board.offsetHeight; 

    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    // Initialize bird position based on board dimensions
    birdX = boardWidth / 8;
    birdY = boardHeight / 2;

    bird.x = birdX;
    bird.y = birdY;

    // Load images
    birdImg = new Image();
    birdImg.src = "./flappybird.png";
    birdImg.onload = function () {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    };

    topPipeImg = new Image();
    topPipeImg.src = "./toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./bottompipe.png";

    // Start the game loop
    requestAnimationFrame(update);
    // Start generating pipes
    pipeInterval = setInterval(placePipes, 1500); 
    document.addEventListener("keydown", moveBird);
    document.addEventListener("mousedown", moveBird); 
    document.addEventListener("touchstart", moveBird);
};

function update() {
    requestAnimationFrame(update);
    if (gameOver) return;

    context.clearRect(0, 0, board.width, board.height);

    // Bird
    velocityY += gravity;
    bird.y = Math.max(bird.y + velocityY, 0); // apply gravity to current bird.y, limit the bird.y to top of the canvas
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    // Check if bird touches the bottom of the viewport
    if (bird.y + bird.height > board.height) {
        gameOver = true;
    }

    // Check if bird touches the top of the viewport
    if (bird.y <= 0) {
        gameOver = true;
    }

    // Pipes
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5; 
            pipe.passed = true;
        }

        if (detectCollision(bird, pipe)) {
            gameOver = true;
        }
    }

    // Clear pipes
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
        pipeArray.shift();
    }

    // Score
    context.fillStyle = "black";
    context.font = "45px sans-serif";
    context.fillText(score, 5, 45);

    if (gameOver) {
        context.fillText("GAME OVER", 5, 90);
        context.fillText("Restart", 5, 140);
        clearInterval(pipeInterval); // Stop generating pipes on game over
    }
}

function placePipes() {
    if (gameOver) return;

    let openingSpace = board.height / 4; // The gap between top and bottom pipes for bird passage
    let maxPipeHeight = board.height - openingSpace - 50; // Maximum height for top pipe
    let randomTopHeight = Math.random() * (maxPipeHeight - 50) + 50; // Ensures the top pipe height is between 50 and maxPipeHeight

    // Create the top pipe with a random height
    let topPipe = {
        img: topPipeImg,
        x: boardWidth, // Start from the right side
        y: 0, // Top pipe starts from the top of the canvas
        width: pipeWidth,
        height: randomTopHeight,
        passed: false
    };
    pipeArray.push(topPipe);

    // Bottom pipe position and height
    let bottomPipeY = randomTopHeight + openingSpace; // Bottom pipe's Y position after the top pipe and opening
    let bottomPipeHeight = board.height - bottomPipeY; // Calculate the height to fit within the canvas

    let bottomPipe = {
        img: bottomPipeImg,
        x: boardWidth,
        y: bottomPipeY,
        width: pipeWidth,
        height: bottomPipeHeight,
        passed: false
    };
    pipeArray.push(bottomPipe);
}

function moveBird(e) {
    if ((e.type === "keydown" && (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyX")) ||
        e.type === "mousedown" || e.type === "touchstart") {

        // Bird jump velocity
        velocityY = -6;

        if (gameOver) {
            // Reset game
            bird.y = birdY;
            pipeArray = [];
            score = 0;
            gameOver = false;
            pipeInterval = setInterval(placePipes, 2500); // Restart pipe generation
        }
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&  
           a.x + a.width > b.x &&   
           a.y < b.y + b.height &&  
           a.y + a.height > b.y;    
}

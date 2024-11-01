// // Variables for board dimensions
// let boardWidth, boardHeight;
// let board;
// let context;

// // Bird dimensions and position
// let birdWidth = 50; 
// let birdHeight = 35;
// let birdX, birdY;
// let birdImg;

// // Bird object
// let bird = {
//     x: 0,
//     y: 0,
//     width: birdWidth,
//     height: birdHeight
// };

// // Pipes
// let pipeArray = [];
// let pipeWidth = 50; 
// let pipeHeight = 550;

// let topPipeImg;
// let bottomPipeImg;

// // Physics and game control
// let velocityX = -2; // Pipes moving left speed
// let velocityY = 0; // Bird jump speed
// let gravity = 0.4;

// let gameOver = false;
// let score = 0;
// let pipeInterval; // Variable for pipe generation interval
// let gameStarted = false; // To track if the game has started

// // Sound effect for game over
// let gameOverSound;

// window.onload = function () {
//     board = document.getElementById("board");
//     boardWidth = board.offsetWidth; 
//     boardHeight = board.offsetHeight; 

//     board.width = boardWidth;
//     board.height = boardHeight;
//     context = board.getContext("2d");

//     // Initialize bird position based on board dimensions
//     birdX = boardWidth / 8;
//     birdY = (boardHeight - birdHeight) / 2; // Centered Y position
//     bird.x = birdX;
//     bird.y = birdY;

//     // Load images
//     birdImg = new Image();
//     birdImg.src = "./flappybird.png"; // Ensure the image path is correct
//     birdImg.onload = function () {
//         context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
//     };

//     topPipeImg = new Image();
//     topPipeImg.src = "./toppipe.png"; // Ensure the image path is correct

//     bottomPipeImg = new Image();
//     bottomPipeImg.src = "./bottompipe.png"; // Ensure the image path is correct

//     // Load game-over sound
//     gameOverSound = new Audio("./gameover.mp3"); // Make sure this path is correct

//     // Start the game loop
//     requestAnimationFrame(update);
    
//     document.addEventListener("keydown", moveBird);
//     document.addEventListener("mousedown", moveBird); 
//     document.addEventListener("touchstart", moveBird);
// };

// function update() {
//     requestAnimationFrame(update);
//     if (gameOver) return;

//     context.clearRect(0, 0, board.width, board.height);

//     // Bird
//     if (gameStarted) {
//         velocityY += gravity;
//         bird.y = Math.max(bird.y + velocityY, 0); // Apply gravity to current bird.y, limit the bird.y to the top of the canvas
//     }
//     context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

//     // Check if bird touches the bottom of the viewport
//     if (bird.y + bird.height > board.height) {
//         endGame();
//     }

//     // Check if bird touches the top of the viewport
//     if (bird.y <= 0) {
//         endGame();
//     }

//     // Pipes
//     if (gameStarted) { // Only update pipes if the game has started
//         for (let i = 0; i < pipeArray.length; i++) {
//             let pipe = pipeArray[i];
//             pipe.x += velocityX;
//             context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

//             if (!pipe.passed && bird.x > pipe.x + pipe.width) {
//                 score += 0.5; 
//                 pipe.passed = true;
//             }

//             if (detectCollision(bird, pipe)) {
//                 endGame();
//             }
//         }

//         // Clear pipes
//         while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
//             pipeArray.shift();
//         }
//     }

//     // Score
//     context.fillStyle = "black";
//     context.font = "45px sans-serif";
//     context.fillText(score, 5, 45);

//     if (gameOver) {
//         context.fillText("GAME OVER", 5, 90);
//         context.fillText("Restart", 5, 140);
//         clearInterval(pipeInterval); // Stop generating pipes on game over
//     }
// }

// function placePipes() {
//     if (gameOver || !gameStarted) return; // Only generate pipes if the game is active and started

//     let openingSpace = board.height / 4; // The gap between top and bottom pipes for bird passage
//     let maxPipeHeight = board.height - openingSpace - 50; // Maximum height for top pipe
//     let randomTopHeight = Math.random() * (maxPipeHeight - 50) + 50; // Ensure top pipe height is between 50 and maxPipeHeight

//     // Create the top pipe with a random height
//     let topPipe = {
//         img: topPipeImg,
//         x: boardWidth, // Start from the right side
//         y: 0, // Top pipe starts from the top of the canvas
//         width: pipeWidth,
//         height: randomTopHeight,
//         passed: false
//     };
//     pipeArray.push(topPipe);

//     // Bottom pipe position and height
//     let bottomPipeY = randomTopHeight + openingSpace; // Bottom pipe's Y position after the top pipe and opening
//     let bottomPipeHeight = board.height - bottomPipeY; // Calculate the height to fit within the canvas

//     let bottomPipe = {
//         img: bottomPipeImg,
//         x: boardWidth,
//         y: bottomPipeY,
//         width: pipeWidth,
//         height: bottomPipeHeight,
//         passed: false
//     };
//     pipeArray.push(bottomPipe);
// }

// function moveBird(e) {
//     if ((e.type === "keydown" && (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyX")) ||
//         e.type === "mousedown" || e.type === "touchstart") {

//         if (!gameStarted) {
//             gameStarted = true; // Start the game on first interaction
//             pipeInterval = setInterval(placePipes, 2300); // Start generating pipes after the game starts
//         }

//         // Bird jump velocity
//         velocityY = -6;

//         if (gameOver) {
//             resetGame();
//         }
//     }
// }

// function detectCollision(a, b) {
//     return a.x < b.x + b.width &&  
//            a.x + a.width > b.x &&   
//            a.y < b.y + b.height &&  
//            a.y + a.height > b.y;    
// }

// function endGame() {
//     gameOver = true;
//     gameOverSound.play(); // Play game-over sound
//     clearInterval(pipeInterval); // Stop generating pipes
// }

// function resetGame() {
//     gameOverSound.pause(); // Stop the game-over sound
//     gameOverSound.currentTime = 0; // Reset sound playback position to the start
//     bird.y = (boardHeight - birdHeight) / 2; // Reset Y position to center
//     bird.x = birdX; // Reset X position
//     velocityY = 0; // Reset velocity
//     pipeArray = [];
//     score = 0;
//     gameOver = false;
//     gameStarted = false;
//     clearInterval(pipeInterval); // Clear existing interval
// }

// Variables for board dimensions
let boardWidth, boardHeight;
let board;
let context;

// Bird dimensions and position
let birdWidth = 50; 
let birdHeight = 35;
let birdX, birdY;
let birdImg;

// Bird object
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
let velocityX = -2; // Pipes moving left speed
let velocityY = 0; // Bird jump speed
let gravity = 0.4;

let gameOver = false;
let score = 0;
let pipeInterval; // Variable for pipe generation interval
let gameStarted = false; // To track if the game has started

// Sound effect for game over
let gameOverSound;

window.onload = function () {
    board = document.getElementById("board");
    boardWidth = board.offsetWidth; 
    boardHeight = board.offsetHeight; 

    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    // Initialize bird position based on board dimensions
    birdX = boardWidth / 8;
    birdY = (boardHeight - birdHeight) / 2; // Centered Y position
    bird.x = birdX;
    bird.y = birdY;

    // Load images
    birdImg = new Image();
    birdImg.src = "./flappybird.png"; // Ensure the image path is correct
    birdImg.onload = function () {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    };

    topPipeImg = new Image();
    topPipeImg.src = "./toppipe.png"; // Ensure the image path is correct

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./bottompipe.png"; // Ensure the image path is correct

    // Load game-over sound
    gameOverSound = new Audio("./gameover.mp3"); // Make sure this path is correct

    // Start the game loop
    requestAnimationFrame(update);
    
    document.addEventListener("keydown", moveBird);
    document.addEventListener("mousedown", moveBird); 
    document.addEventListener("touchstart", moveBird);
};

function update() {
    requestAnimationFrame(update);
    if (gameOver) return;

    context.clearRect(0, 0, board.width, board.height);

    // Bird
    if (gameStarted) {
        velocityY += gravity;
        bird.y = Math.max(bird.y + velocityY, 0); // Apply gravity to current bird.y, limit the bird.y to the top of the canvas
    }
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    // Check if bird touches the bottom of the viewport
    if (bird.y + bird.height > board.height) {
        endGame();
    }

    // Check if bird touches the top of the viewport
    if (bird.y <= 0) {
        endGame();
    }

    // Pipes
    if (gameStarted) { // Only update pipes if the game has started
        for (let i = 0; i < pipeArray.length; i++) {
            let pipe = pipeArray[i];
            pipe.x += velocityX;
            context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

            if (!pipe.passed && bird.x > pipe.x + pipe.width) {
                score += 0.5; 
                pipe.passed = true;
            }

            if (detectCollision(bird, pipe)) {
                endGame();
            }
        }

        // Clear pipes
        while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
            pipeArray.shift();
        }
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
    if (gameOver || !gameStarted) return; // Only generate pipes if the game is active and started

    let openingSpace = board.height / 4; // The gap between top and bottom pipes for bird passage
    let maxPipeHeight = board.height - openingSpace - 50; // Maximum height for top pipe
    let randomTopHeight = Math.random() * (maxPipeHeight - 50) + 50; // Ensure top pipe height is between 50 and maxPipeHeight

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

        if (!gameStarted) {
            gameStarted = true; // Start the game on first interaction
            pipeInterval = setInterval(placePipes, 2300); // Start generating pipes after the game starts
        }

        // Bird jump velocity
        velocityY = -6;

        if (gameOver) {
            resetGame();
        }
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&  
           a.x + a.width > b.x &&   
           a.y < b.y + b.height &&  
           a.y + a.height > b.y;    
}

function endGame() {
    gameOver = true;
    gameOverSound.play(); // Play game-over sound

    // Stop the sound after 3 seconds
    setTimeout(() => {
        gameOverSound.pause();
        gameOverSound.currentTime = 0; // Reset to the start of the sound
    }, 3000); // 3000 milliseconds = 3 seconds

    clearInterval(pipeInterval); // Stop generating pipes
}

function resetGame() {
    gameOverSound.pause(); // Stop the game-over sound
    gameOverSound.currentTime = 0; // Reset sound playback position to the start
    bird.y = (boardHeight - birdHeight) / 2; // Reset Y position to center
    bird.x = birdX; // Reset X position
    velocityY = 0; // Reset velocity
    pipeArray = [];
    score = 0;
    gameOver = false;
    gameStarted = false;
    clearInterval(pipeInterval); // Clear existing interval
}

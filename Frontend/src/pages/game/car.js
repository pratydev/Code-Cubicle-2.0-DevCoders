document.addEventListener('DOMContentLoaded', () => {
    const player = document.querySelector('.player');
    const gameContainer = document.querySelector('.game-container');
    const scoreDisplay = document.querySelector('.score');
    const gameOverDisplay = document.querySelector('.game-over');
    const finalScoreDisplay = document.querySelector('#final-score');
    const gestureButton = document.querySelector('#gestureButton');
    const videoContainer = document.querySelector('.video-container'); // Added for video container
    let score = 0;
    let gameOver = false;
    let currentLane = 1; // 0: left, 1: right
    const lanes = [gameContainer.offsetWidth / 4, (3 * gameContainer.offsetWidth) / 4];
    let playWithGesture = false; // Flag to track if user wants to play with gestures
    let gestureInterval;

    // Initialize player position
    updatePlayerPosition();

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            moveLeft();
        } else if (e.key === 'ArrowRight') {
            moveRight();
        }
    });

    // Function to get hand data
    function getHands() {
        fetch("/api/get_hands")
            .then(response => response.json())
            .then(data => {
                console.log("Fetched hand data:", data);

                if (data.left_hand) {
                    console.log("Left hand gesture detected");
                    moveLeft();
                    resetHands();
                }
                if (data.right_hand) {
                    console.log("Right hand gesture detected");
                    moveRight();
                    resetHands();
                }
            })
            .catch(error => console.error("Error fetching hand data:", error));
    }

    // Function to reset hand states
    function resetHands() {
        fetch("/api/set_hands", {
            method: "POST",
            body: JSON.stringify({
                "left_hand": false,
                "right_hand": false
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => console.log("Reset hand states:", json));
    }

    // Function to toggle video visibility
    function toggleVideo() {
        if (videoContainer.style.display === 'none' || videoContainer.style.display === '') {
            videoContainer.style.display = 'block'; // Show video
            gestureButton.textContent = 'Hide Video'; // Update button text
        } else {
            videoContainer.style.display = 'none'; // Hide video
            gestureButton.textContent = 'Play with Gesture'; // Update button text
        }
    }

    // Function to toggle gesture control and video visibility
    function toggleGesture() {
        playWithGesture = !playWithGesture;

        if (playWithGesture) {
            gestureButton.textContent = 'Stop Playing with Gesture';
            gestureInterval = setInterval(getHands, 500);
            toggleVideo(); // Show video when starting gesture control
        } else {
            gestureButton.textContent = 'Play with Gesture';
            clearInterval(gestureInterval);
            toggleVideo(); // Hide video when stopping gesture control
        }
    }
    
    // Initialize button text and event listener
    gestureButton.textContent = 'Play with Gesture';
    gestureButton.addEventListener('click', toggleGesture);

    function moveLeft() {
        if (currentLane > 0) {
            currentLane--;
            updatePlayerPosition();
        }
    }

    function moveRight() {
        if (currentLane < 1) { // Updated to match the new lane count
            currentLane++;
            updatePlayerPosition();
        }
    }

    function updatePlayerPosition() {
        player.style.transform = `translateX(${lanes[currentLane] - player.offsetWidth / 2}px)`;
    }

    setInterval(() => {
        if (!gameOver) {
            createMathObstacle();
        }
    }, 2000);

    function createMathObstacle() {
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        const laneIndex = Math.floor(Math.random() * 2); // Updated to match the new lane count
        obstacle.style.left = `${lanes[laneIndex] - 70}px`;

        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        const operator = ['+', '-', '*'][Math.floor(Math.random() * 3)];
        let correctAnswer;
        switch (operator) {
            case '+':
                correctAnswer = num1 + num2;
                break;
            case '-':
                correctAnswer = num1 - num2;
                break;
            case '*':
                correctAnswer = num1 * num2;
                break;
        }

        const answers = [
            correctAnswer,
            correctAnswer + Math.floor(Math.random() * 10) + 1,
            correctAnswer - Math.floor(Math.random() * 10) - 1,
        ];

        answers.sort(() => Math.random() - 0.5);
        obstacle.textContent = `${num1} ${operator} ${num2} = ${answers[0]}`;
        obstacle.dataset.answer = answers[0];
        obstacle.dataset.correctAnswer = correctAnswer;

        gameContainer.appendChild(obstacle);

        obstacle.addEventListener('animationend', () => {
            if (!gameOver) {
                obstacle.remove();
            }
        });

        const checkCollisionInterval = setInterval(() => {
            if (!gameOver && checkCollision(player, obstacle)) {
                clearInterval(checkCollisionInterval);
                if (parseInt(obstacle.dataset.answer) === correctAnswer) {
                    score++;
                    scoreDisplay.textContent = ` ${score}`;
                    obstacle.remove();
                } else {
                    gameOver = true;
                    gameOverDisplay.style.display = 'block';
                    finalScoreDisplay.textContent = score;
                    document.querySelectorAll('.obstacle').forEach(ob => ob.remove());
                }
            }
        }, 50);
    }

    function checkCollision(player, obstacle) {
        const playerRect = player.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();
        return !(
            playerRect.top > obstacleRect.bottom ||
            playerRect.bottom < obstacleRect.top ||
            playerRect.left > obstacleRect.right ||
            playerRect.right < obstacleRect.left
        );
    }
});
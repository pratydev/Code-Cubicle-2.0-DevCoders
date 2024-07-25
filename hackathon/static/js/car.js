document.addEventListener('DOMContentLoaded', () => {
    const player = document.querySelector('.player');
    const gameContainer = document.querySelector('.game-container');
    const scoreDisplay = document.querySelector('.score');
    const gameOverDisplay = document.querySelector('.game-over');
    const finalScoreDisplay = document.querySelector('#final-score');
    let score = 0;
    let gameOver = false;
    let currentLane = 1; // 0: left, 1: center, 2: right
    const lanes = [gameContainer.offsetWidth / 6, gameContainer.offsetWidth / 2, (5 * gameContainer.offsetWidth) / 6];

    // Initialize player position
    updatePlayerPosition();

    // Handle player movement
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            moveLeft();
        } else if (e.key === 'ArrowRight') {
            moveRight();
        }
    });

    function moveLeft() {
        if (currentLane > 0) {
            currentLane--;
            updatePlayerPosition();
        }
    }

    function moveRight() {
        if (currentLane < 2) {
            currentLane++;
            updatePlayerPosition();
        }
    }

    function updatePlayerPosition() {
        player.style.transform = `translateX(${lanes[currentLane] - player.offsetWidth / 2}px)`;
    }

    // Generate math problems as obstacles
    setInterval(() => {
        if (!gameOver) {
            createMathObstacle();
        }
    }, 2000);

    function createMathObstacle() {
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        const laneIndex = Math.floor(Math.random() * 3);
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

        // Shuffle answers
        answers.sort(() => Math.random() - 0.5);

        // Attach a random answer to the obstacle
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

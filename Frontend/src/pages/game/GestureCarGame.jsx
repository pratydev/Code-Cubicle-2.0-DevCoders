import React, { useRef, useState, useEffect } from 'react';
import Car from '../../assets/car.svg';
import './car.css';

function GestureCarGame() {
  const playerRef = useRef(null);
  const gameContainerRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [currentLane, setCurrentLane] = useState(1); // 0: left, 1: right
  const [playWithGesture, setPlayWithGesture] = useState(false);
  const [gestureInterval, setGestureInterval] = useState(null);

  useEffect(() => {
    updatePlayerPosition();
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        moveLeft();
      } else if (e.key === 'ArrowRight') {
        moveRight();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (gestureInterval) clearInterval(gestureInterval);
    };
  }, [currentLane]);

  useEffect(() => {
    if (!gameOver) {
      const obstacleInterval = setInterval(() => {
        createMathObstacle();
      }, 3000);
      return () => clearInterval(obstacleInterval);
    }
  }, [gameOver]);

  const getHands = () => {
    fetch('/api/get_hands')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched hand data:', data);
        if (data.left_hand) {
          console.log('Left hand gesture detected');
          moveLeft();
          resetHands();
        }
        if (data.right_hand) {
          console.log('Right hand gesture detected');
          moveRight();
          resetHands();
        }
      })
      .catch((error) => console.error('Error fetching hand data:', error));
  };

  const resetHands = () => {
    fetch('/api/set_hands', {
      method: 'POST',
      body: JSON.stringify({ left_hand: false, right_hand: false }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
      .then((response) => response.json())
      .then((json) => console.log('Reset hand states:', json));
  };

  const toggleGesture = () => {
    setPlayWithGesture((prev) => {
      if (prev) {
        clearInterval(gestureInterval);
      } else {
        setGestureInterval(setInterval(getHands, 500));
      }
      return !prev;
    });
  };

  const moveLeft = () => {
    if (currentLane > 0) {
      setCurrentLane(currentLane - 1);
    }
  };

  const moveRight = () => {
    if (currentLane < 1) {
      setCurrentLane(currentLane + 1);
    }
  };

  const updatePlayerPosition = () => {
    const lanes = [
      gameContainerRef.current.offsetWidth / 4,
      (3 * gameContainerRef.current.offsetWidth) / 4
    ];
    if (playerRef.current && lanes[currentLane]) {
      playerRef.current.style.transform = `translateX(${lanes[currentLane] - playerRef.current.offsetWidth / 2}px)`;
    }
  };

  const createMathObstacle = () => {
    const lanes = [
      gameContainerRef.current.offsetWidth / 4,
      (3 * gameContainerRef.current.offsetWidth) / 4
    ];

    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    const laneIndex = Math.floor(Math.random() * 2);
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
      correctAnswer - Math.floor(Math.random() * 10) - 1
    ];

    answers.sort(() => Math.random() - 0.5);
    obstacle.textContent = `${num1} ${operator} ${num2} = ${answers[0]}`;
    obstacle.dataset.answer = answers[0];
    obstacle.dataset.correctAnswer = correctAnswer;

    gameContainerRef.current.appendChild(obstacle);

    obstacle.addEventListener('animationend', () => {
      if (!gameOver) {
        obstacle.remove();
      }
    });

    const checkCollisionInterval = setInterval(() => {
      if (!gameOver && checkCollision(playerRef.current, obstacle)) {
        clearInterval(checkCollisionInterval);
        if (parseInt(obstacle.dataset.answer) === correctAnswer) {
          setScore((prevScore) => prevScore + 1);
          obstacle.remove();
        } else {
          setGameOver(true);
          document.querySelectorAll('.obstacle').forEach((ob) => ob.remove());
        }
      }
    }, 50);
  };

  const checkCollision = (player, obstacle) => {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
    return !(
      playerRect.top > obstacleRect.bottom ||
      playerRect.bottom < obstacleRect.top ||
      playerRect.left > obstacleRect.right ||
      playerRect.right < obstacleRect.left
    );
  };

  return (
    <>
      <div style={{ padding: '0 0rem', display: 'flex', height: '100vh', justifyContent: 'space-evenly', alignItems: 'center' }}>
        <div className="card-help-game" style={{ padding: '0' }}>
          <div className="game-container" ref={gameContainerRef}>
            <div className="road">
              <div className="lane">
                <svg className="" width="8" height="1642" viewBox="0 0 8 1642" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 828V865" stroke="#FF0000" strokeWidth="7" strokeLinecap="round" />
                  <path d="M4 624V661" stroke="#FF0000" strokeWidth="7" strokeLinecap="round" />
                  <path d="M4 930V967" stroke="#FF0000" strokeWidth="7" strokeLinecap="round" />
                  <path d="M4 726V763" stroke="#FF0000" strokeWidth="7" strokeLinecap="round" />
                  <path d="M4 879V916" stroke="#FF0000" strokeWidth="7" strokeLinecap="round" />
                  <path d="M4 675V712" stroke="#FF0000" strokeWidth="7" strokeLinecap="round" />
                  <path d="M4 981V1018" stroke="#FF0000" strokeWidth="7" strokeLinecap="round" />
                  <path d="M4 777V814" stroke="#FF0000" strokeWidth="7" strokeLinecap="round" />
                  <path d="M4 1601V1638" stroke="#FF0000" strokeWidth="7" strokeLinecap="round" />
                </svg>

                <svg style={{ marginLeft: '10px' }} className="" width="8" height="1642" viewBox="0 0 8 1642" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 828V865" stroke="#FF0000" strokeWidth="7" strokeLinecap="round" />
                  <path d="M4 624V661" stroke="#FF0000" strokeWidth="7" strokeLinecap="round" />
                  <path d="M4 930V967" stroke="#FF0000" strokeWidth="7" strokeLinecap="round" />
                  <path d="M4 726V763" stroke="#FF0000" strokeWidth="7" strokeLinecap="round" />
                  <path d="M4 879V916" stroke="#FF0000" strokeWidth="7" strokeLinecap="round" />
                  <path d="M4 675V712" stroke="#FF0000" strokeWidth="7" strokeLinecap="round" />
                  <path d="M4 981V1018" stroke="#FF0000" strokeWidth="7" strokeLinecap="round" />
                  <path d="M4 777V814" stroke="#FF0000" strokeWidth="7" strokeLinecap="round" />
                  <path d="M4 1601V1638" stroke="#FF0000" strokeWidth="7" strokeLinecap="round" />
                </svg>
              </div>

              <div className="player" ref={playerRef}>
                <img src={Car} alt="Car" />
              </div>
            </div>

            <div className="score-board">Score: <span className="score">{score}</span></div>

            <div className="game-over" style={{ display: gameOver ? 'block' : 'none' }}>
              Game Over<br />
              <span id="final-score">{score}</span>
            </div>
          </div>
        </div>

        <div className="card-help-game">
          <div className="card-help-game-under">
            <div className="video-container" style={{ display: playWithGesture ? 'block' : 'none' }}>
              <img style={{ borderRadius: '20px', transform: 'scale(1.33)' }} id="video_feed" src="/api/your_video_feed" height="100%" width="100%" />
            </div>
            <button id="gestureButton" className="button-home w-button close" onClick={toggleGesture}>
              {playWithGesture ? 'Stop Playing with Gesture' : 'Play with Gesture'}
            </button>
          </div>
        </div>
      </div>
      <img src="https://assets-global.website-files.com/62443d15248af30a21e60133/62568b2d90c44730e9365e5c_sphere.png" loading="lazy" width="73.5" alt="" className="image-help-3" />
      <img src="https://assets-global.website-files.com/62443d15248af30a21e60133/62568b2d90c44730e9365e5c_sphere.png" loading="lazy" width="73.5" alt="" className="image-help-1" />
    </>
  );
}

export default GestureCarGame;

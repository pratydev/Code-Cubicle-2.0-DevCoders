import random
import cv2
import mediapipe as mp
from flask import Blueprint, render_template, jsonify, Response

# from app import camera

gestureCarGame_bp = Blueprint('gestureCarGame', __name__)

camera = cv2.VideoCapture(0)


# Initialize MediaPipe Hands module
mp_hands = mp.solutions.hands
hands = mp_hands.Hands()
mp_drawing = mp.solutions.drawing_utils

# Initialize variables
rand_operator = "+"
random_number1 = random.randint(0, 9)
random_number2 = random.randint(0, 9)
random_number3 = random.randint(1, 3)
both_hands_detected = False
ans = 0
finger_touched = False
counter = 0
result = False
THRESHOLD_DISTANCE = 0.05


# Functions to manipulate global variables
def increment_counter():
    global counter
    counter += 1
    print(counter)


def decrement_counter():
    global counter
    counter -= 1
    print(counter)


def make_true():
    global both_hands_detected
    both_hands_detected = True
    print("both hands are :" + both_hands_detected)


def make_false():
    global both_hands_detected
    both_hands_detected = False


def restart():
    global both_hands_detected, ans, finger_touched, counter, random_number1, random_number2, rand_operator, result
    both_hands_detected = False
    ans = 0
    finger_touched = False
    counter = 0
    random_number1 = random.randint(1, 6)
    random_number2 = random.randint(1, 6)
    random_number3 = random.randint(1, 2)
    if random_number3 == 1:
        rand_operator = "+"
    elif random_number3 == 2:
        rand_operator = "-"
    elif random_number3 == 3:
        rand_operator = "*"


# Generator function to process frames from the webcam
def gen_frames():
    global both_hands_detected, ans, finger_touched, counter, random_number1, random_number2, rand_operator, result
    while True:
        success, frame = camera.read()
        if not success:
            return jsonify({'error': 'Error reading frame'})

        frame = cv2.flip(frame, 1)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        results = hands.process(rgb_frame)
        if results.multi_hand_landmarks:
            for landmarks in results.multi_hand_landmarks:
                handedness = results.multi_handedness[results.multi_hand_landmarks.index(landmarks)].classification[
                    0].label
                mp_drawing.draw_landmarks(frame, landmarks, mp_hands.HAND_CONNECTIONS)

                index_tip = landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP]
                thumb_tip = landmarks.landmark[mp_hands.HandLandmark.THUMB_TIP]
                distance = ((index_tip.x - thumb_tip.x) ** 2 + (index_tip.y - thumb_tip.y) ** 2) ** 0.5

                if len(results.multi_hand_landmarks) >= 2:
                    ans += 1
                    print(ans)
                    if ans == 50:
                        both_hands_detected = True

                elif handedness == "Right":
                    ans = 0
                    if distance < THRESHOLD_DISTANCE:
                        if not finger_touched:
                            increment_counter()
                            finger_touched = True
                    else:
                        finger_touched = False
                elif handedness == "Left":
                    ans = 0
                    if distance < THRESHOLD_DISTANCE:
                        if not finger_touched:
                            decrement_counter()
                            finger_touched = True
                    else:
                        finger_touched = False

        if both_hands_detected:
            break

        ret, buffer = cv2.imencode('.jpg', frame, [cv2.IMWRITE_JPEG_QUALITY, 30])
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


# Routes
@gestureCarGame_bp.route('/game/gestureCarGame')
def game():
    restart()
    return render_template('/game/gestureCarGame.html')


@gestureCarGame_bp.route('/video_feed')
def car_video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


@gestureCarGame_bp.route('/get_count')
def get_count():
    return jsonify({'count': counter})


@gestureCarGame_bp.route('/get_numbers')
def get_numbers():
    print(both_hands_detected)
    return jsonify({
        'random_number1': random_number1,
        'random_number2': random_number2,
        'rand_operator': rand_operator,
        'both_hands_detected': both_hands_detected,
        'count': counter
    })


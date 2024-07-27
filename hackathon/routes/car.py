import cv2
import mediapipe as mp
from flask import Blueprint, render_template, jsonify, Response, request

gestureCarGame_bp = Blueprint('gestureCarGame', __name__)

camera = cv2.VideoCapture(0)

# Initialize MediaPipe Hands module
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(min_detection_confidence=0.5, min_tracking_confidence=0.5)
mp_drawing = mp.solutions.drawing_utils

# Initialize variables
left_hand = False
right_hand = False


# Functions to manipulate global variables
def left_hand_info():
    global left_hand, right_hand
    left_hand = True
    right_hand = False
    print("Left hand detected")


def right_hand_info():
    global left_hand, right_hand
    left_hand = False
    right_hand = True
    print("Right hand detected")


def restart():
    global left_hand, right_hand
    left_hand = False
    right_hand = False
    print("Hand states reset")


# Generator function to process frames from the webcam
def gen_frames():
    print("Car video feed is running")
    global right_hand, left_hand
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

                if handedness == "Right":
                    right_hand = True
                    left_hand = False
                    # right_hand_info()
                elif handedness == "Left":
                    print("it is left hand -------------------- ")
                    right_hand = False
                    left_hand = True

                    print(left_hand, "=======================")
                    # left_hand_info()
                # restart()

        ret, buffer = cv2.imencode('.jpg', frame, [cv2.IMWRITE_JPEG_QUALITY, 30])
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


# Routes
@gestureCarGame_bp.route('/game/gestureCarGame')
def game():
    restart()
    return render_template('/game/gestureCarGame.html')


@gestureCarGame_bp.route('/api/car/video_feed')
def car_video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


@gestureCarGame_bp.route('/api/get_hands')
def get_hands():
    print("Left hand state:", left_hand)
    print("Right hand state:", right_hand)
    return jsonify({
        'left_hand': left_hand,
        'right_hand': right_hand
    })


@gestureCarGame_bp.route('/api/set_hands', methods=['POST'])  # Ensure POST method for setting data
def set_hands():
    global left_hand, right_hand
    data = request.get_json()
    print("Received data:", data)
    left_hand = data.get('left_hand', False)
    right_hand = data.get('right_hand', False)
    return jsonify({"message": "Data received successfully"})

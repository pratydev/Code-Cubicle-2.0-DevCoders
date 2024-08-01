from flask import Blueprint, render_template

# Define the blueprint
gestureCar_bp = Blueprint('gestureCar', __name__)


@gestureCar_bp.route('/gestureCar')
def gestureMath():
    return render_template('gestureCar.html')

from flask import Blueprint, render_template

# Define the blueprint
gestureMath_bp = Blueprint('gestureMath', __name__)


@gestureMath_bp.route('/gestureMath')
def gestureMath():
    return render_template('gestureMath.html')

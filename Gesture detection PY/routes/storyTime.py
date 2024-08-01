from flask import Blueprint, render_template

# Define the blueprint
storyTime_bp = Blueprint('storytime', __name__)


@storyTime_bp.route('/storytime')
def index():
    return render_template('storyTime.html')

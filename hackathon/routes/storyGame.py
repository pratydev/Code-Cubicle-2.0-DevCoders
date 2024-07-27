from flask import Blueprint, render_template

# Define the blueprint
storygame_bp = Blueprint('storygame', __name__)


@storygame_bp.route('/game/storygame')
def storyGame():
    return render_template('game/storyGame.html')

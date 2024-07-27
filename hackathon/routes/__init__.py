# Import the blueprints from their respective modules
# from .game import game_bp
from .car import gestureCarGame_bp
from .gestureCar import gestureCar_bp
from .gestureMath import gestureMath_bp
from .home import home_bp
from .main import main_bp
from .storyGame import storygame_bp
from .storyTime import storyTime_bp


# from .other_routes import other_bp


# This __init__.py file can be used to combine all blueprints into a single variable
# which can be imported in the main application file

def register_blueprints(app):
    """
    Register all blueprints with the Flask application.
    """
    app.register_blueprint(home_bp)
    app.register_blueprint(gestureMath_bp)
    app.register_blueprint(main_bp)
    app.register_blueprint(gestureCar_bp)
    app.register_blueprint(gestureCarGame_bp)
    app.register_blueprint(storyTime_bp)
    app.register_blueprint(storygame_bp)

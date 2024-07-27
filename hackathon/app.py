from flask import Flask
from routes import register_blueprints

# Initialize Flask application and webcam
app = Flask(__name__)

# Register blueprints
register_blueprints(app)

if __name__ == "__main__":
    app.run(debug=True)

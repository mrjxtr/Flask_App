from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()


def create_app():
    """Create and configure the Flask application."""
    app = Flask(
        __name__,
        instance_relative_config=True,
        template_folder="templates",
        static_folder="static",
    )

    # Load the default configuration
    app.config.from_object("flaskapp.config.DevelopmentConfig")

    # Load the instance config, if it exists
    app.config.from_pyfile("config.py", silent=True)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)

    # Import and register blueprints
    from flaskapp.blueprints.core.routes import core

    app.register_blueprint(core, url_prefix="/")

    return app

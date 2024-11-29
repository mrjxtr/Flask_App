import pytest

from flaskapp.app import create_app, db


@pytest.fixture
def app():
    """Create and configure a test application instance."""
    app = create_app()
    app.config.update({
        'TESTING': True,
        'SQLALCHEMY_DATABASE_URI': 'sqlite:///:memory:'
    })

    with app.app_context():
        db.create_all()
        yield app
        db.drop_all()

@pytest.fixture
def client(app):
    """Test client for the application."""
    return app.test_client()

@pytest.fixture
def runner(app):
    """Test CLI runner for the application."""
    return app.test_cli_runner()

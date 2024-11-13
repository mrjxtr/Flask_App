def test_config():
    """Test create_app without passing test config."""
    from flaskapp.app import create_app
    assert not create_app().testing
    assert create_app({'TESTING': True}).testing

def test_hello(client):
    """Test the index page."""
    response = client.get('/')
    assert response.status_code == 200
    assert b'Welcome the the homepage!' in response.data

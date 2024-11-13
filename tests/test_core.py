def test_index_page(client):
    """Test the index route returns correct status code and content."""
    response = client.get('/')
    assert response.status_code == 200
    assert b'Welcome the the homepage!' in response.data

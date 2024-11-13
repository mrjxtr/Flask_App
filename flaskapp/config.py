"""Configuration settings for the Flask application."""

class Config:
    """Base configuration class."""
    SECRET_KEY = 'dev secret key' # Change this in production!
    SQLALCHEMY_DATABASE_URI = 'sqlite:///app.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    """Development configuration."""
    DEBUG = True
    
class ProductionConfig(Config):
    """Production configuration."""
    DEBUG = False

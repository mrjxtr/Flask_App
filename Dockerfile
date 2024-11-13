# Use Python 3.11-slim as base image (3.13 is not yet available in official images)
FROM python:3.11-slim

# Prevents Python from writing pyc files
ENV PYTHONDONTWRITEBYTECODE=1
# Keeps Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED=1

# Create a non-privileged user
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "10001" \
    appuser

WORKDIR /app

# Install dependencies with specific version pinning
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . .

# Switch to non-root user
USER appuser

# Set Flask environment variables
ENV FLASK_APP=run.py
ENV FLASK_ENV=production

EXPOSE 5000

# Use array syntax for CMD
CMD ["flask", "run", "--host=0.0.0.0"] 

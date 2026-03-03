FROM python:3.11-slim

WORKDIR /app

# Install system dependencies for dkimpy and pyspf
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libffi-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first (Docker layer caching)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code into /app/backend/ so "from backend.xxx" imports resolve
COPY . ./backend/

# Expose port
EXPOSE 8000

# Run with uvicorn — backend is now a proper package at /app/backend/
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]

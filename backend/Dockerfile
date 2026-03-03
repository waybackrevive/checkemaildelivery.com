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

# Copy application code — timestamp forces cache invalidation on redeploy
ARG CACHEBUST=1
COPY . .

# Railway uses $PORT env var; default to 8000 for local dev
ENV PORT=8000
EXPOSE 8000

# Run with uvicorn — uses shell form so $PORT is expanded at runtime
CMD uvicorn main:app --host 0.0.0.0 --port $PORT

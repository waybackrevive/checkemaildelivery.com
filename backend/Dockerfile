FROM python:3.11-slim

WORKDIR /app

# Install system dependencies for dkimpy, pyspf, and SpamAssassin
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libffi-dev \
    procps \
    spamassassin \
    spamc \
    && rm -rf /var/lib/apt/lists/*

# Update SpamAssassin rules (run once during build)
RUN sa-update || true

# Copy and install requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Make start script executable (convert CRLF to LF and set permissions)
RUN sed -i 's/\r$//' /app/start.sh && chmod +x /app/start.sh

EXPOSE 8000

# Use bash to run both spamd and the app
CMD ["/bin/bash", "/app/start.sh"]

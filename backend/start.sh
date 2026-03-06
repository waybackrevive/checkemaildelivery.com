#!/bin/bash

# SpamAssassin + FastAPI startup script
# =====================================

echo "Starting SpamAssassin daemon..."
spamd --listen=127.0.0.1 --allowed-ips=127.0.0.1 --max-children=2 --pidfile=/var/run/spamd.pid &

# Wait for spamd to initialize
sleep 3

# Verify spamd is running
if pgrep -x "spamd" > /dev/null; then
    echo "SpamAssassin daemon started successfully"
else
    echo "WARNING: SpamAssassin daemon failed to start"
fi

echo "Starting FastAPI application..."
exec python run.py

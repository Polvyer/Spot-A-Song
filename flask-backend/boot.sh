#!/bin/sh
source venv/bin/activate
flask db upgrade
exec gunicorn -b :8080 --access-logfile - --error-logfile - spot-a-song:app
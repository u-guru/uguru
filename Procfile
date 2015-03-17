web: gunicorn --log-level debug run:app
worker: celery worker -A app.tasks.celery  -B -E --loglevel=info -n w1.%h
redis: redis-server
flower: flower --broker=$REDISTOGO_URL --port=5555 --logging=warning --basic_auth=$FLOWER_AUTH
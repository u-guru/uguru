web: honcho run python run.py runserver
worker: honcho run celery -A app.tasks.celery worker -B -E --loglevel=info
redis: redis-server
flower: flower --broker=$REDISTOGO_URL --port=5555 --logging=warning --basic_auth=$FLOWER_AUTH

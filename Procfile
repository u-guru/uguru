web: gunicorn run:app 
worker: celery -A app.views.celery worker -B -E --loglevel=info
redis: redis-server
flower: flower --broker=$REDISTOGO_URL --port=5555 --logging=warning --basic_auth=$FLOWER_AUTH

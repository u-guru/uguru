web: newrelic-admin run-program gunicorn run:app --reload 
worker: newrelic-admin run-program celery -A app.tasks.celery worker -B -E --loglevel=info
redis: redis-server
flower: flower --broker=$REDISTOGO_URL --port=5555 --logging=warning --basic_auth=$FLOWER_AUTH

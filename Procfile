web: gunicorn run:app
worker: celery -A app.views.celery worker -B -E --loglevel=info
redis: redis-server


web: honcho run python run.py runserver
worker: honcho run celery -A app.tasks.celery worker -B -E --loglevel=info

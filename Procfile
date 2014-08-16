web: gunicorn run:app
worker: celery -A app.views.celery worker -B --loglevel=info
migrate: alembic upgrade head
upgrade: alembic upgrate +1
downgrade: alembic downgrade -1

web: gunicorn run:app
worker: celery -A app.views worker -B --loglevel=info
migrate: alembic upgrade head
upgrade: alembic upgrate +1
downgrade: alembic downgrade -1

web: gunicorn run:app
worker: celery -A tasks worker -B --loglevel=info
migrate: alembic upgrade head
upgrade: alembic upgrate +1
downgrade: alembic downgrade -1

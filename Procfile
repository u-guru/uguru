web: gunicorn run:app
migrate: alembic upgrade head
upgrade: alembic upgrate +1
downgrade: alembic downgrade -1
worker: celery -A tasks worker -B --loglevel=info
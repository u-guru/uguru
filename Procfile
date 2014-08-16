web: gunicorn run:app
worker: celery -A run:app worker -B -E --loglevel=info
redis: redis-server
migrate: alembic upgrade head
upgrade: alembic upgrate +1
downgrade: alembic downgrade -1

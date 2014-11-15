web: gunicorn run:app 
worker: celery -A app.views.celery worker -B -E --loglevel=info
redis: redis-server
flower: celery flower --broker=$REDISTOGO_URL --logging=warning #--basic_auth=admin@uguru.me:launchuguru 

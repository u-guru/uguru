**Setup Environment**

- Install homebrew (http://brew.sh)
- % brew doctor (make sure your dev environment is sexy)
- % brew install python
- % brew linkapps python
- Install heroku toolbelt (https://toolbelt.heroku.com)
- % heroku login (enter in your heroku credentials)
- % heroku config:pull --override --app uguru (export them from your .zshrc/.bash_profile, or use an .env file)

**Pull down repo (https://github.com/sam1rm/uguru)**

- % git clone https://github.com/sam1rm/uguru
- % cd uguru
- % (sudo) pip install -r requirements.txt

**Set up local DB**

- % touch app.db
- % python manage.py initialize

**Run Locally**

- % gem install forman
- % brew install redis
- % foreman start web

or

- % redis-server 
- % celery -A app.views.celery worker -B -E --loglevel=info
- % pyton run.py

**Admin Console Login**

- Email: admin@uguru.me
- Pass: launchuguru
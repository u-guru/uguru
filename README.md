**Setup Environment**
 
- Install heroku toolbelt (https://toolbelt.heroku.com)
- Install Homebrew (http://brew.sh)
- % pip install virtualenvwrapper
- source /usr/local/bin/virtualenvwrapper.sh in your .zshrc/.bash_profile
- % brew install redis
- % mkvirtualenv uguru
- % workon uguru

**Pull down repo (https://github.com/sam1rm/uguru)**

- % git clone https://github.com/sam1rm/uguru
- % cd uguru
- % pip install -r requirements.txt 

**Set up local DB**
- % pip install -U psycopg2
- % pip install Flask-SQLAlchemy
- Download PostgreSQL (http://postgresapp.com)
- (optional) Got to Postgres.app's preferences, and set it to "automatically open after login"
- % createuser uguru -d -s -P
- Enter twice to confirm password: uguru
- % createdb -U uguru -E utf-8 -O uguru uguru_db
- % honcho run python run.py db migrate
- % honcho run python run.py db upgrade
- % honcho run python manage.py initialize

**Run Locally**

- workon uguru (if using virtualenv--you should be...)
- % honcho start -f ProcfileDev
- % (optionally) honcho run python (to jump into a python shell with the app's envirmonment)

**Admin Console Login**

- Email: admin@uguru.me
- Pass: launchuguru
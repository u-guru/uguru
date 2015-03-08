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
- % honcho run python run.py db upgrade

**Pull seed data from heroku servers**

- % heroku pgbackups:capture \-\-app uguru-testing
- % curl -o latest.dump \`heroku pgbackups:url \-\-app uguru-testing\`
- % psql (enters shell with prompt: User=#)
- User=# DROP DATABASE uguru_db;
- DROP DATABASE
- User=# \q
- % createdb -U uguru -E utf-8 -O uguru uguru_db
- % pg_restore --verbose --clean --no-acl --no-owner -h localhost -U uguru -d uguru_db latest.dump
- (it's okay if it prints out that there were errors ignored)

**Run Locally**

- workon uguru (if using virtualenv--you should be...)
- % honcho start -f ProcfileDev
- % (optionally) honcho run python (to jump into a python shell with the app's envirmonment)

**Admin Console and Celery Flower UI Login**

- Email: admin@uguru.me
- Pass: launchuguru

**Pip Dependancies**

- % [sudo] pip install <dependancy>
- % pip freeze > requirements.txt
- to uninstall
- % [sudo] pip uninstall <dependancy>
- % pip freeze > requirements.txt

**Run Tests**

- honcho run nosetests tests.py

**Update Remote App**
- Set local to 'False' on main.js
- Compile everything through Gulp Calling this command in uguru-mobile directory
    'gulp -b && cp dest/scripts/*.js www/remote/js/app.js && cp dest/styles/*.css www/remote/css/app_version.css'
- uw
- Copy all contents from uguru-mobile
	- % 'cp -r ~/Git/uguru/uguru-mobile/platforms/ios/www/plugins/ app/static/remote/plugins/ && cp -r ~/Git/uguru/uguru-mobile/www/remote/* app/static/remote/ && cp ~/Git/uguru/uguru-mobile/platforms/ios/www/cordova* app/static/remote/'



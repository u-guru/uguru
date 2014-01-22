=How to setup=
pip install -r requirements.txt 
alembic upgrade head

=db migrations=
alembic revision --autogenerate -m "<insert message here>"
alembic upgrade head

=first time heroku configuration=
heroku create <subdomain>
git push heroku master
heroku addons:add heroku-postgresql:dev
heroku pg:promote HEROKU_POSTGRESQL_COLOR
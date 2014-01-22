=How to setup=
pip install -r requirements.txt 
alembic upgrade head

=db migrations=
alembic revision --autogenerate -m "<insert message here>"
alembic upgrade head

import os

def initialize_test_db():
    #Temporarily move original local db
    os.rename('app.db', 'actual_app.db')
    from app.database import init_db
    init_db()
    print 'Test Database Successfully Initialized'

def teardown_test_db():
    #remove test_db
    os.remove('app.db') 
    #Move original local db back to where it was
    os.rename('actual_app.db', 'app.db')
    print 'Test Database Successfully Torn Down'
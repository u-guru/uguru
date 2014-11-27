# Run this to test everything. 
# TODO: Integrate this into the procfile

try:
    # Initialize test database
    from app.tests.test_util import initialize_test_db
    initialize_test_db()

    # Test Web RESTFUL API
    from app.tests.test_routes import test_user_routes
    test_user_routes()

    #Teardown test database
    from app.tests.test_util import teardown_test_db
    teardown_test_db()
except:
    from app.tests.test_util import teardown_test_db
    teardown_test_db()


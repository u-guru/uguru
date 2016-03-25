from travispy import TravisPy

def getGuruRepo(repo_name):
    travis_client = TravisPy.github_auth("gHCrtop9ngfe4YygHesf")
    from pprint import pprint
    pprint(travis_client.repo(repo_name))

getGuruRepo('Uguru/u-tests')

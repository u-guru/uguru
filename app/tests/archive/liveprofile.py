import json, nose, os, requests, sys, time
from nose.tools import *
import logging
DEFAULT_HEADERS = {'Content-type': 'application/json', 'Accept': 'text/plain'}
BASE_URL = 'http://dev.samir:5000'

def test_popular_profiles():
    eq_(False, True)
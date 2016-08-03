import json, nose, os, requests, sys, time
from nose.tools import *
import logging
DEFAULT_HEADERS = {'Content-type': 'application/json', 'Accept': 'text/plain'}
BASE_URL = 'http://dev.samir:5000'


def testPortfolioItem():
    def test_portfolio_add():
        eq_(False, True)

    def test_porfolio_item_remove():
        eq_(False, True)

    def test_portfolio_item_edit():
        eq_(False, True)

    test_portfolio_add()
    test_portfolio_item_remove()
    test_portfolio_item_edit()

def testWillWorkFor():
    def test_add_will_work_for():
        eq_(False, True)
    def test_remove_will_work_for():
        eq_(False, True)
    test_add_will_work_for()
    test_remove_will_work_for()

def testGuruProfileLanguage():
    def test_add_language_profile():
        eq_(False, True)
    def test_remove_language_profile():
        eq_(False, True)
    test_add_language_profile()
    test_remove_language_profile()

def testGeneralGuruProfileAttributes():
    def testGuruIntroduction():
        eq_(False, True)
    def testGuruProfileURL():
        eq_(False, True)
    def testCalcGuruAverage():
        eq_(False, True)
    testEditGuruIntroduction()
    testCalcGuruAverage()
    testGuruProfileURL()

def testGuruProfileCode():
    def testGuruProfile():
        eq_

def testPreferredCommunicationMethods():
    def test_add_communication_method():
        eq_(False, True)
    def test_remove_communication_method():
        eq_(False, True)
    test_add_communication_method()
    test_remove_communication_method()

def testGuruExperiences():
    def testAddGuruExperience():
        eq_(False, True)
    def testRemoveGuruExperience():
        eq_(False, True)
    def testEditGuruExperience():
        eq_(False, True)
    testEditGuruExperience()
    testAddGuruExperience()
    testRemoveGuruExperience()

def testExternalProfile():
    def test_add_external_profile():
        eq_(False, True)

    def test_add_custom_profile():
        eq_(False, True)

    def test_edit_external_profile():
        eq_(False, True)

    def test_remove_external_profile():
        eq_(False, True)

    test_add_external_profile()
    test_remove_external_profile()
    test_edit_external_profile()
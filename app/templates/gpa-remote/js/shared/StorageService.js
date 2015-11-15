angular
.module('sharedServices')
.factory("StorageService", [
  "$localstorage",
  StorageService
    ]);

function StorageService($localstorage) {


  function isFirstTimeUsingApp() {
    return !$localstorage.get('welcomeUserGPA');
  }

  function setBooleanValue(key, bool) {
    $localstorage.set(key, bool);
  }

  function clearStorage() {
    $localstorage.clear();
  }

  function isNull() {
    return $localStorage.getNumKeys() === 0;
  }

  return {

    setBooleanValue:setBooleanValue,
    clearStorage:clearStorage,
    isNull : isNull,
    isFirstTimeUsingApp: isFirstTimeUsingApp

  };

}









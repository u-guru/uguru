

angular
	.module('sharedServices')
	.factory("GUtilService", [
		'$timeout',
    GUtilService
	]);

function GUtilService($timeout) {
  var publicPlaceService;


  function latCoordToGoogleLatLng(lat, lng) {
    return new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
  }


  function initPlacesService(map) {
    return new google.maps.places.PlacesService(map);
  }

  function getAddressFromLatLng(lat, lng, scope) {
      var gCoords = latCoordToGoogleLatLng(lat, lng);
      var geoCoderObj = new google.maps.Geocoder();
      var geoCodePayload = {location: gCoords};
      geoCoderObj.geocode(geoCodePayload, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results.length) {
            if (scope && scope.requestForm) {
              scope.requestForm.address = results[0].formatted_address;
              scope.requestForm.location = {latitude: results[0].geometry.location.lat(), longitude:results[0].geometry.location.lng()};
              console.log(scope.requestForm.address, scope.requestForm.location);
            }
          }
        } else {
          console.log('GEOCODE ERROR:',results, status);
        }
      })
  }

  function coordsToNearestPlace(map, coords, requestForm, types, radius) {
    var gCoords = latCoordToGoogleLatLng(coords.latitude, coords.longitude);
    var placeService = new google.maps.places.PlacesService(map);
    var placeServiceOptions = { location: gCoords, radius:radius || 2000, rankBy: google.maps.places.RankBy.prominence, types: types};

    placeService.nearbySearch(placeServiceOptions, updateRequestFormWithPlace);

    function updateRequestFormWithPlace(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
           if (results.length) {
            for (var i = 0; i < results.length; i++) {
              console.log(results[i].name, results[i].types, results[i]);
            }
           } else {
            //get cross street
            console.log('nothing found');
            // TODO: http://stackoverflow.com/questions/10676790/getting-an-intersection-with-google-places-geocoding-api
           }
      } else {
        console.log(status, results);
      }
    }

  }

  function getMapIconPath(keyVal, stroke_hex, fill_hex, stroke_weight) {
    var mapIconDict = {
      "bus-stop": 'M33.4454342,33.1111111 C31.5542205,33.1111111 30,34.3572253 30,35.8990022 L30,49.8795222 C30,51.4212991 31.5542205,52.6666667 33.4454342,52.6666667 L66.5794259,52.6666667 C68.4715604,52.6666667 70,51.4212991 70,49.8795222 L70,35.8990022 C70,34.3572253 68.4715604,33.1111111 66.5794259,33.1111111 L33.4454342,33.1111111 L33.4454342,33.1111111 L33.4454342,33.1111111 Z M27.1810466,18 L73.8200621,18 C76.1583881,18 78,19.7325373 78,21.8989747 L78,70.9909352 C78,73.1277652 76.2215861,74.8317162 73.9442406,74.8888889 L73.8211708,74.8888889 L73.6648389,74.8888889 L65.6464541,74.8888889 C65.5233843,74.8603025 65.3969883,74.8603025 65.271701,74.8888889 L35.6972544,74.8888889 L35.3546547,74.8888889 L27.3052252,74.8888889 C27.2120913,74.8603025 27.1488933,74.8603025 27.0557594,74.8603025 L27.0247148,74.8603025 C24.7784139,74.7735225 23,73.0981579 23,70.9909352 L23,21.8979537 C23.0011087,19.7325373 24.8416119,18 27.1810466,18 L27.1810466,18 L27.1810466,18 Z M35.0135856,60.6666667 C37.2523047,60.6666667 39,62.2224603 39,64.2099486 C39,66.1728895 37.2523047,67.7777778 35.0135856,67.7777778 C32.7738962,67.7777778 31,66.1728895 31,64.2099486 C31,62.2224603 32.7748666,60.6666667 35.0135856,60.6666667 L35.0135856,60.6666667 L35.0135856,60.6666667 Z M66.0009671,60.6666667 C68.2321083,60.6666667 70,62.2224603 70,64.2099486 C70,66.1728895 68.2321083,67.7777778 66.0009671,67.7777778 C63.7678917,67.7777778 62,66.1728895 62,64.2099486 C62,62.2224603 63.7678917,60.6666667 66.0009671,60.6666667 L66.0009671,60.6666667 L66.0009671,60.6666667 Z M29,74.8888889 L37,74.8888889 L37,80.7125876 C37,81.4484067 36.3213747,82 35.4536463,82 L30.5476949,82 C29.6799665,82 29.0013412,81.447323 29.0013412,80.7125876 L29.0013412,74.8888889 L29,74.8888889 L29,74.8888889 Z M64,74.8888889 L72,74.8888889 L72,80.7125876 C72,81.4484067 71.3213747,82 70.4536463,82 L65.5476949,82 C64.6799665,82 64.0013412,81.447323 64.0013412,80.7125876 L64.0013412,74.8888889 L64,74.8888889 L64,74.8888889 Z M38,25.1111111 C38,23.6383518 39.1889834,22.4444444 40.6754379,22.4444444 L60.3245621,22.4444444 C61.8021656,22.4444444 63,23.6413485 63,25.1111111 L63,25.1111111 C63,26.5838704 61.8110166,27.7777778 60.3245621,27.7777778 L40.6754379,27.7777778 C39.1978344,27.7777778 38,26.5808737 38,25.1111111 L38,25.1111111 Z',
      "cafe": 'M69.7423747,43.7777778 L70.9810759,33.2165522 C71.0454426,32.667759 70.6517105,32.2222222 70.1015564,32.2222222 L30.1208189,32.2222222 C29.5676537,32.2222222 29.1768904,32.6673989 29.2412993,33.2165522 L30.4800005,43.7777778 L69.7423747,43.7777778 Z M66.8232158,68.6666667 L65.3760032,81.00567 C65.3115943,81.5548233 64.8075957,82 64.2513656,82 L35.9710096,82 C35.4142983,82 34.9107387,81.5544633 34.846372,81.00567 L33.3991595,68.6666667 L66.8232158,68.6666667 Z M25.0204167,23.4177221 C25.1554325,22.8801957 25.7197841,22.4444444 26.2683259,22.4444444 L73.3810662,22.4444444 C73.9352516,22.4444444 74.493207,22.8771997 74.6289754,23.4177221 L76.596021,31.2489446 C76.7310368,31.786471 76.3896116,32.2222222 75.8330941,32.2222222 L23.8162979,32.2222222 C23.2599292,32.2222222 22.9176027,31.789467 23.0533711,31.2489446 L25.0204167,23.4177221 Z M32.0394423,18.9425524 C32.2321699,18.4219951 32.8379488,18 33.3853073,18 L65.9466044,18 C66.4971775,18 67.1012808,18.426152 67.2924694,18.9425524 L68.2400219,21.5018921 C68.4327495,22.0224494 68.1375919,22.4444444 67.5961491,22.4444444 L31.7357626,22.4444444 C31.1874338,22.4444444 30.9007012,22.0182924 31.0918897,21.5018921 L32.0394423,18.9425524 Z M28.3485134,44.7688106 C28.2930377,44.2214783 28.6950797,43.7777778 29.2434991,43.7777778 L70.9785758,43.7777778 C71.5283385,43.7777778 71.9280703,44.2310173 71.8735615,44.7688106 L69.5518056,67.6756339 C69.4963299,68.2229662 69.0035795,68.6666667 68.456331,68.6666667 L31.7657433,68.6666667 C31.2162051,68.6666667 30.7247776,68.2134272 30.6702688,67.6756339 L28.3485134,44.7688106 Z',
      "establishment": 'M19,35.7777778 L81.2222222,35.7777778 L50.1107184,18 L19,35.7777778 Z M26.6704444,41.880065 L32.8926667,41.880065 L32.8926667,69.5506529 L26.6704444,69.5506529 L26.6704444,41.880065 Z M40.3333333,41.880065 L46.5555556,41.880065 L46.5555556,69.5506529 L40.3333333,69.5506529 L40.3333333,41.880065 Z M53.6666667,41.880065 L59.8888889,41.880065 L59.8888889,69.5506529 L53.6666667,69.5506529 L53.6666667,41.880065 Z M67.9984444,41.880065 L74.2206667,41.880065 L74.2206667,69.5506529 L67.9984444,69.5506529 L67.9984444,41.880065 Z M24.3333333,35.6578428 L75.8888889,35.6578428 L75.8888889,41.880065 L24.3333333,41.880065 L24.3333333,35.6578428 Z M24.3333333,69.5555556 L75.8888889,69.5555556 L75.8888889,75.7777778 L24.3333333,75.7777778 L24.3333333,69.5555556 Z M19,75.7777778 L81.2222222,75.7777778 L81.2222222,82 L19,82 L19,75.7777778 Z',
      "grocery": 'M19.6687987,51.4228417 C19.4194933,50.3468444 20.1144762,49.4745763 21.2120326,49.4745763 L79.8314457,49.4745763 C80.9330557,49.4745763 81.6231033,50.3506498 81.3746796,51.4228417 L74.9731465,79.0517345 C74.7238411,80.1277318 73.6268007,81 72.5203499,81 L28.5231284,81 C27.4177916,81 26.3187555,80.1239265 26.0703318,79.0517345 L19.6687987,51.4228417 Z M23.9130435,69.8644068 L76.0973896,69.8644068 M22.8695652,59.4576271 L78.183757,59.4576271 M32.2608696,49.4745763 L38.5217391,80.4745763 M14,45.2711864 C14,42.9497183 15.8888166,41.0677966 18.2086436,41.0677966 L81.7913564,41.0677966 C84.1157261,41.0677966 86,42.9544421 86,45.2711864 L86,45.2711864 C86,47.5926545 84.1111834,49.4745763 81.7913564,49.4745763 L18.2086436,49.4745763 C15.8842739,49.4745763 14,47.5879308 14,45.2711864 L14,45.2711864 Z M68.7826087,49.4745763 L62.5217391,80.4745763 M50.5217391,49.4745763 L50.5217391,80.4745763 M30.8183756,22.8944809 C31.3268944,20.7436185 33.5238756,19 35.7435821,19 L66.3433745,19 C68.554972,19 70.7615871,20.7500687 71.2685809,22.8944809 L75.5652174,41.0677966 L26.5217391,41.0677966 L30.8183756,22.8944809 Z',
      "library": 'M17,25 L12,25 L12,77 L88,77 L88,25 L83,25 M17,23 C17,23 24,21 33,21 C42,21 50,23 50,23 L50,73 C50,73 42,71 33,71 C24,71 17,73 17,73 L17,23 Z M50,23 C50,23 57,21 66,21 C75,21 83,23 83,23 L83,73 C83,73 75,71 66,71 C57,71 50,73 50,73 L50,23 Z M50,70.5 L50,76.5',
      "lodging": 'M14,59.4003632 L86,59.4003632 L86,67.4016015 L14,67.4016015 L14,59.4003632 Z M22.3478261,47.0030958 L77.3459525,47.0030958 C80.6606958,47.0030958 83.3478261,49.6965468 83.3478261,53.0040245 L83.3478261,59.0049532 M24.442771,67.7819727 L24.442771,75.999364 L19.2094029,75.999364 L19.2094029,67.7819727 M79.7471188,67.7819727 L79.7471188,75.999364 L74.5137507,75.999364 L74.5137507,67.7819727 M14,59 L14,32.0050741 C14,29.7931328 15.7953562,28 18,28 L18,28 C20.209139,28 22,29.8006843 22,32.0050741 L22,59',
      "parking": 'M30.2162107,36.8634124 C30.0087463,35.7775888 29.9256554,34.0037524 30.0828066,32.916777 C30.0828066,32.916777 30.8453024,15 49.9353487,15 C69.0253949,15 69.7878908,32.916777 69.7878908,32.916777 C69.9216781,34.01062 69.8632165,35.7709661 69.6544867,36.8634124 L63.3726068,69.741404 C63.1651424,70.8272276 62.0977389,71.7074615 60.9904903,71.7074615 L38.8802071,71.7074615 C37.7720649,71.7074615 36.7068203,70.8338504 36.4980905,69.741404 L30.2162107,36.8634124 Z M46.5224799,74.0592008 C46.5224799,72.9587836 47.4084377,72.0667193 48.5299823,72.0667193 L50.3483108,72.0667193 C51.4570238,72.0667193 52.3558133,72.9556761 52.3558133,74.0592008 L52.3558133,83.0075185 C52.3558133,84.1079357 51.4698555,85 50.3483108,85 L48.5299823,85 C47.4212694,85 46.5224799,84.1110432 46.5224799,83.0075185 L46.5224799,74.0592008 Z M46.5224799,46.9839985 C46.5224799,45.8795449 47.4084377,44.9842084 48.5299823,44.9842084 L50.3483108,44.9842084 C51.4570238,44.9842084 52.3558133,45.8799301 52.3558133,46.9839985 L52.3558133,59.4273715 C52.3558133,60.531825 51.4698555,61.4271615 50.3483108,61.4271615 L48.5299823,61.4271615 C47.4212694,61.4271615 46.5224799,60.5314398 46.5224799,59.4273715 L46.5224799,46.9839985 Z M62.0833333,35.8922226 C62.0833333,28.749369 56.6423494,22.958942 49.9305556,22.958942 C43.2187617,22.958942 37.7777778,28.749369 37.7777778,35.8922226 C37.7777778,35.8922227 62.0833334,35.8922227 62.0833333,35.8922226 Z M52.8472222,29.0248717 L49.9305556,35.7954994',
      "restaurant": 'M78.7777778,18 L78.7777778,38.4324336 C78.7777778,45.6100023 72.9219566,51.4285714 65.7311828,51.4285714 C58.5257474,51.4285714 52.6845878,45.6057587 52.6845878,38.4324336 L52.6845878,18 M65.7311828,52.1703404 L65.7311828,83 M22.8637993,18 L30.0782514,19.916983 C33.8139289,20.9096059 36.8422939,24.8504932 36.8422939,28.6989037 L36.8422939,40.7296677 C36.8422939,44.5871657 33.8091688,48.5202304 30.0782514,49.5115884 L22.8637993,51.4285714 M22.8637993,18 L22.8637993,83 M78.7777778,34.7142857 L78.7777778,39.4440162 C78.7777778,44.0115599 65.7311828,34.7142857 65.7311828,34.7142857 C65.7311828,34.7142857 52.6845878,44.0088594 52.6845878,39.4440162 L52.6845878,34.7142857 M65.7311828,18 L65.7311828,34.816755',
      "theater": 'M19,39 C19,39 31,44.4651163 36.4545455,44.4651163 C43,44.4651163 55,39 55,39 L55,70.6996925 C55,71.302238 54.8421766,72.2473732 54.6235513,72.8125957 C54.6235513,72.8125957 50.6363636,86 36.4545455,86 C22.2727273,86 19.3055416,72.8355416 19.3055416,72.8355416 C19.1367956,72.2584902 19,71.3017171 19,70.6996925 L19,39 L19,39 Z M28.7894737,69.6363636 C28.7894737,69.6363636 31.5087719,74 36.9473684,74 C42.3859649,74 45.1052632,69.6363636 45.1052632,69.6363636 M25.5263158,56.5454545 C25.5263158,56.5454545 26.6140351,53.2727273 29.877193,53.2727273 C33.1403509,53.2727273 34.2280702,56.5454545 34.2280702,56.5454545 M40.754386,56.5454545 C40.754386,56.5454545 41.8421053,53.2727273 45.1052632,53.2727273 C48.3684211,53.2727273 49.4561404,56.5454545 49.4561404,56.5454545 M45,14 C45,14 57,19.4651163 62.4545455,19.4651163 C69,19.4651163 81,14 81,14 L81,45.6996925 C81,46.302238 80.8421766,47.2473732 80.6235513,47.8125957 C80.6235513,47.8125957 76.6363636,61 62.4545455,61 C59.4616616,61 54.8882463,58.9889982 54.8882463,58.9889982 L54.8882467,39.1395349 L46.0395263,42.0738843 C45.4654118,42.2642681 45,41.9253466 45,41.3219748 L45,14 L45,14 Z M54.8947368,48.9090909 C54.8947368,48.9090909 57.6140351,44.5454545 63.0526316,44.5454545 C68.4912281,44.5454545 71.2105263,48.9090909 71.2105263,48.9090909 M51.6315789,31.4545455 C51.6315789,31.4545455 52.7192982,28.1818182 55.9824561,28.1818182 C59.245614,28.1818182 60.3333333,31.4545455 60.3333333,31.4545455 M66.8596491,31.4545455 C66.8596491,31.4545455 67.9473684,28.1818182 71.2105263,28.1818182 C74.4736842,28.1818182 75.5614035,31.4545455 75.5614035,31.4545455',
      "weight": 'M35.1764706,50 L64.8235294,50 M82.8235294,50 L86,50 M14,50 L17.1764706,50 M18.2352941,42.3333604 C18.2352941,40.6764912 19.577484,39.3333333 21.2336271,39.3333333 L23.7075494,39.3333333 C25.3634829,39.3333333 26.7058824,40.6678289 26.7058824,42.3333604 L26.7058824,57.6666396 C26.7058824,59.3235088 25.3636925,60.6666667 23.7075494,60.6666667 L21.2336271,60.6666667 C19.5776935,60.6666667 18.2352941,59.3321711 18.2352941,57.6666396 L18.2352941,42.3333604 Z M26.7058824,36.9961002 C26.7058824,35.3413998 28.0480722,34 29.7042153,34 L32.1781376,34 C33.8340712,34 35.1764706,35.3342595 35.1764706,36.9961002 L35.1764706,63.0038998 C35.1764706,64.6586002 33.8342807,66 32.1781376,66 L29.7042153,66 C28.0482818,66 26.7058824,64.6657405 26.7058824,63.0038998 L26.7058824,36.9961002 Z M64.8235294,36.9961002 C64.8235294,35.3413998 66.1657193,34 67.8218624,34 L70.2957847,34 C71.9517182,34 73.2941176,35.3342595 73.2941176,36.9961002 L73.2941176,63.0038998 C73.2941176,64.6586002 71.9519278,66 70.2957847,66 L67.8218624,66 C66.1659288,66 64.8235294,64.6657405 64.8235294,63.0038998 L64.8235294,36.9961002 Z M73.2941176,42.3333604 C73.2941176,40.6764912 74.6363075,39.3333333 76.2924506,39.3333333 L78.7663729,39.3333333 C80.4223065,39.3333333 81.7647059,40.6678289 81.7647059,42.3333604 L81.7647059,57.6666396 C81.7647059,59.3235088 80.422516,60.6666667 78.7663729,60.6666667 L76.2924506,60.6666667 C74.6365171,60.6666667 73.2941176,59.3321711 73.2941176,57.6666396 L73.2941176,42.3333604 Z'
    }
    var templatedPathValue = {
      'path': mapIconDict[keyVal],
      'fillOpacity': 1,
      'strokeOpacity':1,
      // labelOrigin: new google.maps.Point(0, 40),
      'rotation': 0,
      'scale': 0.5,
      'strokeColor': stroke_hex,
      'fillColor': fill_hex,
      // anchor: new google.maps.Point(0, 0),
      'strokeWeight': (!stroke_weight || 3)
    }
    return templatedPathValue;
  }

  function getInvisibleIconPath() {
    return {
      "path": "M33.4454342, 31.4545455",
      "fillOpacity": 0,
      "strokeOpacity":0,
      "rotation": 0,
      "scale":0.01,
      "strokeColor": "transparent",
      "fillColor": "transparent",
      "strokeWeight": 0
    }
  }

  function getNearestLocationOneMarker(map, lat, lng, scope) {
    if (!publicPlaceService) {
      publicPlaceService = initPlacesService(map, lat, lng);
    }
    var GLatLng = latCoordToGoogleLatLng(lat, lng);
    var requestPayload = {location: GLatLng, rankBy:google.maps.places.RankBy.DISTANCE, types:["restaurant", "cafe", "food", "bar" ,"point_of_interest", "establishment"]};
    publicPlaceService.nearbySearch(requestPayload,
      function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
           if (results.length) {
            var placeName = results[0].name;
            var placeObj = results[0];
            scope.map.centerMarker.windowText = placeName;
            scope.map.centerMarker.closestPlace = placeObj;
           }
        }
      }
    );
  }

  var createMarker = function(map, lat, lng, markerObj, iconUrl) {
    var gLocation = latCoordToGoogleLatLng(lat, lng);
    var marker = new google.maps.Marker({
        position: gLocation,
        map: map,
        title: markerObj.name,
        animation: google.maps.Animation.DROP,
        icon: iconUrl
      });
    return marker;
  }

  var createMarkerWithLabel = function(map, lat, lng, icon, options) {
    var gLocation = latCoordToGoogleLatLng(lat, lng);
    var marker = new MarkerWithLabel({
        position: gLocation,
        map: map,
        // title: markerObj.name,
        animation: options.animation,
        // icon: icon,
        labelContent: options.labelContent,
        labelAnchor: new google.maps.Point(0,20),
        labelStyle:"color:" + options.labelColor + ' !important;' + options.customStyle || '',
        labelClass: options.className, // the CSS class for the label
        labelInBackground: false,
      });
    return marker;
  }

  function generateStaticMapUrls(uni_arr, options) {
    var API_KEY = "AIzaSyAIonm682hyuTYUjpQ0rWYVvBbY4ES1D-Y"
    for (var i = 0; i < uni_arr.length; i++) {
      var indexUni = uni_arr[i];
      indexUni.static_map_url = getStaticMapUriForUniversityObj(indexUni, options.zoom, options.map_type, options.size, options.scale);
    }
    return uni_arr;
  }

  function getStaticMapUriForUniversityObj(uni, zoom, maptype, size, scale, api_key) {
    return "https://maps.googleapis.com/maps/api/staticmap?center=" + uni.latitude + ',' +  uni.longitude + "&zoom=" + zoom + "&size=" + size + "&scale=" + scale + "maptype=" + maptype  // + "&key=" + api_key || ""
  }

  var getRelevantIcon = function(color_one, color_two, g_types) {
    // https://developers.google.com/maps/documentation/javascript/reference?hl=en#Symbol
    //rotation, scale, stroke color, stroke opacity, stroke weight, path, label origin, fillOpacity, fillColor, anchor
    var formatIconSvgUrl = function(iconName,scope) {
      return scope.img_base + 'templates/svg/map/' + iconName + '.svg'
    }
    var supportedIcons = ["bus-stop", "cafe", "establishment", "grocery", "library", "lodging", "parking", "restaurant", "theater", "weight"];

    for (var i = 0; i < g_types.length; i++) {
      var gTypeIndex = g_types[i];
      var matchedIndex = supportedIcons.indexOf(gTypeIndex)
      if (matchedIndex > -1) {
        // return formatIconSvgUrl(supportedIcons[matchedIndex], scope);
        return getMapIconPath(supportedIcons[matchedIndex], color_one, color_two, 5);
      }
    }

    var randItem = supportedIcons[Math.floor(Math.random()*supportedIcons.length)];
    return getMapIconPath(randItem, color_one, color_two, 5);
  }

  var convertSVGStringIntoDataUri = function(svg_string) {
    var precursorFormat = "data:image/svg+xml,";
    var result = precursorFormat + encodeURIComponent(svg_string);
    return result;
  }

  var getHtmlForUniversityPennant = function(university) {
    return "<h1>" + university.short_name + "</h1><br>" + "<small>" + university.city + ", " + university.state + "</small>"
  }

  // (map, university_arr, scope.map.markers, {icon_type:"university_penant", label_color:"white", custom_class})
  var initSeveralMarkersWithLabel = function(map, obj_arr, scope, options, callback) {
    var result_arr = [];
    var obj_arr = JSON.parse(JSON.stringify(obj_arr));
    for (var i = 0; i < obj_arr.length; i++) {

      var objIndex = obj_arr[i];
      var icon = getRelevantIcon(objIndex.school_color_dark, objIndex.school_color_light, options.icon_type);




      var pictureLabel = document.createElement("img");
      if (objIndex.school_tiny_name && objIndex.school_tiny_name.length) {
        var universityName = objIndex.school_tiny_name
      }
      else if (objIndex.short_name && objIndex.short_name.length) {
        var universityName = objIndex.short_name;
      } else if (objIndex.name && objIndex.name.length) {
        var universityName = objIndex.name;
      }


      if (universityName.length > 4) {
        universityName = universityName.substring(0,4);
      }
      if (objIndex.school_color_light === '#757575')  {
        objIndex.school_color_light = '#FFFFFF';
      }
      var svgImage = "<svg viewBox='0 0 73 41' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><path d='M71.7272013,15.1343641 L63.071575,20.5 L72.2393802,25.9924931 L0,41 L1.42108547e-14,0 L71.7272013,15.1343641 L71.7272013,15.1343641 Z' id='flag' opacity='0.9' fill='" + objIndex.school_color_dark +"'></path><path d='M0,0 L0,41 L6.261,39.7 L6.261,1.321 L0,0 Z' id='border' fill='" + objIndex.school_color_light +"'></path><text font-family='Source Sans Pro' font-size='16' font-weight='600' line-spacing='16' fill='" + objIndex.school_color_light +"'><tspan x='8' y='26'>" + universityName + "</tspan></text></svg>"
      var pennantPaths = [];
      pictureLabel.src = convertSVGStringIntoDataUri(svgImage, options);

      var objIndex = obj_arr[i];
        // var indexmarker =
      var createMarker = function(university, i) {
        var pictureLabel = document.createElement("img");
        if (university.school_tiny_name && university.school_tiny_name.length) {
          var universityName = university.school_tiny_name
        }
        else if (university.short_name && university.short_name.length) {
          var universityName = university.short_name;
        } else if (university.name && university.name.length) {
          var universityName = university.name;
        }


        if (university.school_color_light === '#757575')  {
          university.school_color_light = '#FFFFFF';
        }
        var svgImage = "<svg viewBox='0 0 73 41' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><path d='M71.7272013,15.1343641 L63.071575,20.5 L72.2393802,25.9924931 L0,41 L1.42108547e-14,0 L71.7272013,15.1343641 L71.7272013,15.1343641 Z' id='flag' opacity='0.9' fill='" + university.school_color_dark +"'></path><path d='M0,0 L0,41 L6.261,39.7 L6.261,1.321 L0,0 Z' id='border' fill='" + university.school_color_light +"'></path><text font-family='Source Sans Pro' font-size='16' font-weight='600' line-spacing='16' fill='" + university.school_color_light +"'><tspan x='8' y='26'>" + universityName + "</tspan></text></svg>"
        var pennantPaths = [];
        pictureLabel.src = convertSVGStringIntoDataUri(svgImage, options);

        var markerWithLabelDict = {
          'position': latCoordToGoogleLatLng(university.latitude, university.longitude),
          'map': map,
          'icon':  getInvisibleIconPath(), //cant edit the icon css
          'labelContent': pictureLabel,
          'labelAnchor': new google.maps.Point(0,0),
          'labelClass': 'university-svg-icon', // the CSS class for the label
          'labelInBackground': false,
          'customInfo': {short_name: university.short_name, city:university.city, state:university.state},
          'idKey': i
        }
        return markerWithLabelDict;
        // return new MarkerWithLabel(markerWithLabelDict);
      }

      result_arr.push(createMarker(obj_arr[i], i))
      // google.maps.event.addListener(marker_arr[i], 'click', function() {
      //   alert('this was clicked')
      //   var infowindow = new google.maps.InfoWindow({
      //     content: getHtmlForUniversityPennant(this.customInfo)
      //   });
      //   infowindow.open(map, this);
      // })




      // var indexMarker = createMarkerWithLabel(map, objIndex.latitude, objIndex.longitude, null, markerOptions);
    }
    return result_arr;
    // callback && callback(result_arr);
  }

  var nearbyLocationMarkers = [];
  function getNearestLocationManyMarkers(map, lat, lng, scope) {
    if (!publicPlaceService) {
      publicPlaceService = initPlacesService(map, lat, lng);
    }
    var GLatLng = latCoordToGoogleLatLng(lat, lng);
    var requestPayload = {location: GLatLng, rankBy:google.maps.places.RankBy.DISTANCE, types:["restaurant", "cafe", "food", "bar"]};
    publicPlaceService.nearbySearch(requestPayload,
      function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
           if (results.length) {
            nearbyLocationMarkers = [];
            for (var i = 0; i < results.length; i++) {
              var placeName = results[i].name;
              var placeObj = results[i];
              var placeLat = results[i].geometry.location.G;
              var placeLng = results[i].geometry.location.K;
              var iconUrl = getRelevantIcon(scope.university.school_color_dark, scope.university.school_color_light, placeObj.types);
              var markerOptions = {
                labelContent: placeObj.types[0],
                labelColor: scope.university.school_color_dark,
                className: 'gmap-marker-label',
              }
              var indexMarker = createMarkerWithLabel(map, placeLat, placeLng, iconUrl, markerOptions);
              nearbyLocationMarkers.push(indexMarker);
            }
            scope.map.nearbyLocations.markers = JSON.parse(JSON.stringify(nearbyLocationMarkers));
           }
        }
      }
    );
  }

  return {
    latCoordToGoogleLatLng:latCoordToGoogleLatLng,
    initPlacesService:initPlacesService,
    getNearestLocationOneMarker: getNearestLocationOneMarker,
    getNearestLocationManyMarkers: getNearestLocationManyMarkers,
    initSeveralMarkersWithLabel: initSeveralMarkersWithLabel,
    generateStaticMapUrls: generateStaticMapUrls,
    coordsToNearestPlace: coordsToNearestPlace,
    getAddressFromLatLng: getAddressFromLatLng
  }

}
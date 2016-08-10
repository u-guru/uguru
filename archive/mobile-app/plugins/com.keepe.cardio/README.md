card.io iOS & Android plug-in for Cordova
-----------------------------------------

This plug-in exposes card.io credit card scanning.

[Android SDK](https://github.com/card-io/card.io-Android-SDK.git).
[iOS SDK](https://github.com/card-io/card.io-iOS-SDK.git).

Integration instructions
------------------------

The PayPal SDK Cordova/Phonegap Plugin adds support for the CardIO iOS & Android platform. It uses the native CardIO library. Cordova plugin management will set up all the required capabilities/frameworks for the project. The only bit left for you to do is to add necessary files, as described below.

1.	Follow the official [Cordova](https://cordova.apache.org) documentation to install command line tools or [Phonegap](http://phonegap.com/install/).
2.	Create project, add plugin and platforms:

```bash

   $ cordova create ScanCard com.mycompany.scancard "ScanCard"
   $ cd ScanCard
   $ cordova platform add ios
   $ cordova platform add android
   //npm
   $ cordova plugin add cordova-plugin-keepe-cardio
   OR
   //git
   $ cordova plugin add https://github.com/vkeepe/card.io.git
```

1.	Follow Your app integration section below.
2.	Run `cordova run ios` to build and the project.

Sample HTML + JS
----------------

1.	In `ScanCard/www/index.html` add the following to lines after `<p class="event received">Device is Ready</p>`:

```javascript
      <button id="scanBtn"> Scan Now!</button>
```

1.	Replace `ScanCard/www/js/index.js` with the following code:

```javascript

    /*
     * Licensed to the Apache Software Foundation (ASF) under one
     * or more contributor license agreements.  See the NOTICE file
     * distributed with this work for additional information
     * regarding copyright ownership.  The ASF licenses this file
     * to you under the Apache License, Version 2.0 (the
     * "License"); you may not use this file except in compliance
     * with the License.  You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing,
     * software distributed under the License is distributed on an
     * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
     * KIND, either express or implied.  See the License for the
     * specific language governing permissions and limitations
     * under the License.
     */
    var app = {
        // Application Constructor
        initialize: function() {
            this.bindEvents();
        },
        // Bind Event Listeners
        //
        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        bindEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },
        // deviceready Event Handler
        //
        // The scope of 'this' is the event. In order to call the 'receivedEvent'
        // function, we must explicitly call 'app.receivedEvent(...);'
        onDeviceReady: function() {
            app.receivedEvent('deviceready');
        },
        // Update DOM on a Received Event
        receivedEvent: function(id) {
            var parentElement = document.getElementById(id);
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');

            console.log('Received Event: ' + id);

            app.example();
        },

        example : function () {
          var cardIOResponseFields = [
            "card_type",
            "redacted_card_number",
            "card_number",
            "expiry_month",
            "expiry_year",
            "cvv",
            "zip"
          ];

          var onCardIOComplete = function(response) {
            console.log("card.io scan complete");
            for (var i = 0, len = cardIOResponseFields.length; i < len; i++) {
              var field = cardIOResponseFields[i];
              console.log(field + ": " + response[field]);
            }
          };

          var onCardIOCancel = function() {
            console.log("card.io scan cancelled");
          };

          var onCardIOCheck = function (canScan) {
            console.log("card.io canScan? " + canScan);
            var scanBtn = document.getElementById("scanBtn");
            if (!canScan) {
              scanBtn.innerHTML = "Manual entry";
            }
            scanBtn.onclick = function (e) {
              CardIO.scan({
                    "expiry": true,
                    "cvv": true,
                    "zip": true,
                    "suppressManual": false,
                    "suppressConfirm": false,
                    "hideLogo": true
                },
                onCardIOComplete,
                onCardIOCancel
              );
            }
          };

          CardIO.canScan(onCardIOCheck);
        }
    };

    app.initialize();

```

Android
-------

Before you build in release mode, make sure to adjust your proguard configuration by adding the following to `proguard.cnf`:
```
    -keep class io.card.** { *; }
    -keep class com.keepe.** { *; }
    -keepclassmembers class io.card.** { *;}
    -dontwarn io.card.payment.CardIOActivity
    (See bug: https://github.com/card-io/card.io-Android-SDK/issues/86)
```
License
-------

-	This plugin is released under the MIT license: http://www.opensource.org/licenses/MIT

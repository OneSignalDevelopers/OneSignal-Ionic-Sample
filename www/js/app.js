// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {    
    // Enable to debug issues.
    // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

    var notificationOpenedCallback = function(jsonData) {
      alert("Notification opened:\n" + JSON.stringify(jsonData));
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    // TODO: Update with your OneSignal AppId before running.
    window.plugins.OneSignal
      .startInit("b2f7f966-d8cc-11e4-bed1-df8f05be55ba")
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();
  });
})

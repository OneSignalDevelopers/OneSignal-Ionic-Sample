import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { OtherPage } from '../pages/otherpage/otherpage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();
    this.pages = [
      { title: 'OneSignal Home', component: HomePage },
      { title: 'OtherPage Page', component: OtherPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();


      // Optional OneSignal code for iOS to prompt users later
      // Set your iOS Settings
      var iosSettings = {};
      iosSettings["kOSSettingsKeyAutoPrompt"] = false; // will not prompt users when start app 1st time
      iosSettings["kOSSettingsKeyInAppLaunchURL"] = false; // false opens safari with Launch URL

      // OneSignal Code start:
      // Enable to debug issues.
      // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

      var notificationOpenedCallback = function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        if (jsonData.notification.payload.additionalData != null) {
          console.log("Here we access addtional data");
          if (jsonData.notification.payload.additionalData.openURL != null) {
            console.log("Here we access the openURL sent in the notification data");

          }
        }
      };

      window["plugins"].OneSignal
        .startInit("5c9ca215-e7c5-4214-8a45-6f2e1b84c12f")
        .iOSSettings(iosSettings) // only needed if added Optional OneSignal code for iOS above
        .inFocusDisplaying(window["plugins"].OneSignal.OSInFocusDisplayOption.Notification)
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();
        
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}


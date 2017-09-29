import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	constructor(public navCtrl: NavController) {
  	}

  	// for iOS only and set kOSSettingsKeyAutoPrompt to false in init call
  	registerForPushNotifications() {
  		window["plugins"].OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
  			console.log("User accepted notifications: " + accepted);
		});
  	}

  	// add tags to users
  	sendTags() {
  		window["plugins"].OneSignal.sendTags({key: "value", another_key: "another value"});
  		console.log("tags sent");
  	}


  	// get tags and upate one
  	getAndUpdateTag() {
  		window["plugins"].OneSignal.getTags(function(tags) {
  			console.log('Tags Received: ' + JSON.stringify(tags));
  			window["plugins"].OneSignal.sendTag("another_key", "another key's value changed");
		});
  	}

  	// get the OneSignal userId aka playerId
  	getOneSignalPlayerId() {
  		window["plugins"].OneSignal.getPermissionSubscriptionState(function(status) {
  			status.permissionStatus.hasPrompted;
  			status.permissionStatus.status;

  			status.subscriptionStatus.subscribed;
  			status.subscriptionStatus.userSubscriptionSetting;
  			status.subscriptionStatus.pushToken;

  			//var playerID = status.subscriptionStatus.userId;
  			console.log(status.subscriptionStatus.userId);
		});
  	}


  	// prompt user to accept sending location data
  	promptLocation() {
  		window["plugins"].OneSignal.promptLocation();
  		console.log('location prompted');
  	}


  	// send a notification with an image
  	sendNotificationwithImage() {
  		window["plugins"].OneSignal.getIds(function(ids) {
  			var notificationObj = { contents: {en: "message with image"},
                          include_player_ids: [ids.userId],
                          big_picture: "https://cdn.pixabay.com/photo/2017/09/16/16/09/sea-2755908_960_720.jpg",
                          
                          ios_attachments: {id1: "https://cdn.pixabay.com/photo/2017/09/16/16/09/sea-2755908_960_720.jpg"}
                          };
  
  			window["plugins"].OneSignal.postNotification(notificationObj,
    			function(successResponse) {
      				console.log("Notification Post Success:", successResponse);
    			},
    			function (failedResponse) {
      				console.log("Notification Post Failed: ", failedResponse);
      				alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
    			}
  			);
		});
  	}


  	// send Notification Action Buttons and Deep Link
  	sendNotificationWithActionButtonsAndDeepLink() {
  		window["plugins"].OneSignal.getIds(function(ids) {
  			var notificationObj = { contents: {en: "Message with Action Buttons and Deep link"},
                          include_player_ids: [ids.userId],
                          data: {data_key: "data_value", openURL: "https://imgur.com/"},

                          buttons: [{"id": "id1", "text": "Deep Link with URL", "icon": "ic_menu_share"}, {"id": "id2", "text": "just button2", "icon": "ic_menu_send"}]
                          };
  
  			window["plugins"].OneSignal.postNotification(notificationObj,
    			function(successResponse) {
      				console.log("Notification Post Success:", successResponse);
    			},
    			function (failedResponse) {
      				console.log("Notification Post Failed: ", failedResponse);
      				alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
    			}
  			);
		});
  	}



}

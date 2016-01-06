var app = angular.module("myApp", ["firebase"]);

app.controller("myCtrl", function($scope, $firebaseAuth) {
var ref = new Firebase("https://ang-fb.firebaseio.com/");
ref.authWithOAuthPopup("facebook", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    // the access token will allow us to make Open Graph API calls
    console.log(authData.facebook.accessToken);
  }
}, {
  scope: "email,user_likes" // the permissions requested
});
});

// https://auth.firebase.com/v2/ang-fb/auth/facebook/callback
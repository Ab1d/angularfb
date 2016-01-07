var app = angular.module("myApp", ["firebase"]);
app.run(['$rootScope', '$window',
  function($rootScope, $window) {
  	$rootScope.logged= false;
  $rootScope.user = {};
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else {
      console.log( 'Please log ' +
        'into Facebook.');
    }
  }
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '196663500681670',
    cookie     : true,  
    xfbml      : true,
    version    : 'v2.2'
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      console.log('Thanks for logging in, ' + response.name + '!');
      $rootScope.logged = true;
    });
  }


}]);


app.controller("myCtrl", function($scope, $firebaseAuth, facebookService) {
var ref = new Firebase("https://ang-fb.firebaseio.com/");
$scope.postMessage = function(){
FB.api(
    "/me/feed",
    "POST",
    {
        "message": "This is a test message"
    },
    function (response) {
      if (response && !response.error) {
        /* handle the result */
        alert("Successful");
      }else alert("fail");
    }
, {scope: 'publish_actions'});
}

$scope.Post = function() {
   facebookService.Post() 
     .then(function(response) {

       console.log(response);
     }
   );
};
});
app.factory('facebookService', function($q) {
    return {

        Post: function() {
            var deferred = $q.defer();
          var body = 'Reading JS';
          FB.api('/me/feed', 'post', { message: body }, function(response) {
            if (!response || response.error) {
              alert('Error occured');
            } else {
              alert('Post ID: ' + response.id);
            }
          });
            return deferred.promise;
        }
    }
});
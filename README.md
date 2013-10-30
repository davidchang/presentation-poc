7:48pm

hi guys. got a few hours to myself tonight, so let's build a proof of concept app. in the past, synchronizing things like presentations were super hard for a non-back-end-inclined guy like me and required all sorts of stuff like socket.io. but i realized recently that Firebase can solve this problem and can basically synchronize all of your data - the presenter can control the flow of the data and everyone else logged in will automatically see the changes. Let's build an app that will sync presentations across all devices for all users, so everyone will always be looking at the same thing.

7:53pm

```mkdir translation-poc; cd translation-poc; yo angular poc;```

which calls bower install and npm install

7:55pm

```git init; git commit -a -m "initial commit"```

working in Sublime Text 2

7:56pm

```grunt server```

pops up the working Angular app. Add Firebase scripts:

```
<script src="//cdn.firebase.com/v0/firebase.js"></script> 
<script src="//cdn.firebase.com/libs/angularfire/0.3.0/angularfire.min.js"></script>
```

7:57pm

let's create a "create" page:

```yo angular:route create```

where we'll be able to provide presentation metadata and enter the actual presentation content.

8:05pm

a basic HTML form coming together. design decision is that, since I know I want to save this all as an object in Firebase, I'm going to put all of my Angular data into a single "presentation" object with ng-model set up to different properties in that object. So the title of the presentation will be ng-model="presentation.metadata.title" and the content will be an array found in presentation.content

8:09pm

helps a lot having livereload going from the grunt server. also, scss is a joy to write.

8:12pm

and Twitter Bootstrap 2. i still haven't figured out 3, but looks like it's not standard in Yeoman yet

8:14pm

nice - basic functionality good. two inputs for the "original text" and then the "translated text", a save button that will save the two into an object that is pushed into presentation.content.

then there's an ng-repeat="row in presentation.content" that will just show row.original in one td and row.translated in the other so you can see what's being saved.

so now we should be able to hook this up to save to Firebase.

8:26pm

roadblock saving data to Firebase. this error:

```Error: Firebase.update failed: First argument contains an invalid key ($$hashKey) in property```

8:27pm

http://stackoverflow.com/questions/17680131/firebase-push-failed-first-argument-contains-an-invalid-key-hashkey

```
angular.copy($scope.presentation)
```

maddeningly simple - everything just works. Here's all of my code to save to Firebase:

```
var ref = new Firebase('https://davidchang.firebaseio.com/translation-poc');
ref.update(angular.copy($scope.presentation));
```

8:30pm

some tweaks and we're still moving:

```
var toSave = {};
toSave[$scope.desiredURL] = angular.copy($scope.presentation);
var ref = new Firebase('https://davidchang.firebaseio.com/translation-poc');
ref.update(toSave, function() {
    $location.path('/view/' + $scope.desiredURL);
});
```

8:31pm

```git commit -a -m "create page working"```

8:32pm

```yo angular:route view```

to view the presentation you just created. but will want to keep and remember the $scope.desiredURL to be able to pull down the right firebase URL

8:33pm

actually, should make that firebase URL into an angular constant or else this could get messy.

```yo angular:constant firebase-url```

then updated the value in the firebase-url.js file created; then listed that constant as a dependent in my create controller.

8:37pm

the router would look something like this:

```.when('/view/:presentationId', { })```

and the view controller would list $routeParams as a dependency and be able to do $routeParams.presentationId to retrieve.

8:41pm

forgot to list 'firebase' as an app dependency and 'angularFire' as a controller dependency. can read in data like so:

```$scope.presentation = angularFire(firebaseUrl, $scope, $routeParams.presentationId);```

8:45pm

hmm... that didn't work. reading in data like so:

```
var url = firebaseUrl + '/' + $routeParams.presentationId;
var ref = new Firebase(url);
angularFire(ref, $scope, 'presentation');
```

8:47pm

slightly modified view.html and we're good to go. now we need to find a way of controlling the current position in the presentation and how to increment it. there will be an index of 0 that i'll need to save when i save the data in the first place

8:51pm

also, ```$location.path('/view/' + $scope.desiredURL);``` alone doesn't trigger the refresh. requires a ```$scope.$apply()``` afterwards to trigger the digest cycle.

8:52pm

```git commit -a -m "view page working"```

8:53pm

```yo angular:route presenters-control```

for the presenter to navigate through the presentation

8:54pm

basically just copied what was in the view controller and partial - will need basically the same setup and HTML. the only difference should be that it shows all of the data and lets you navigate through (which, for this sake, let's just use a button and not keyboard commands)

8:57pm

this simple to get position in presentation:

```<tr ng-class="{selected: $index == presentation.content.index}" ng-repeat="row in presentation.content.data">```

9:02pm

implemented .selected styles, incrementPosition() and resetToStart() functions

9:03pm

high five! done with that page. now just need to go back to the #/view/:presentationId page and make sure that only the current and previous lines are being shown

9:04pm

```git commit -a -m "presenters-control working"```

9:06pm

oops. cleaned up #/presenters-control to indicate when you have finished the presentation, disable the increment button when that is the case.

9:09pm

done! not very efficient, but done. this would be terrible for any large data set, but i can control which rows are shown on the /view page by doing this:

```<tr ng-class="{hidden: $index > presentation.content.index}" ng-repeat="row in presentation.content.data">```

then i'll be viewing the page on:

http://localhost:9000/#/view/davids

and can manipulate the page on:

http://localhost:9000/#/presenters-control/davids

and can watch the two move in sync.

9:11pm

this is seriously lacking in efficiency, its feature set, and styling, but it was meant to be a proof of concept by inception anyways. i'll put in a more substantial presentation, put in a better index page.

9:33pm

high five! calling this done. the create page is a little weird from all of the other firebase interactions because all i want to do is save something to firebase, not actually bind it to a value on my scope and have a 3 way data binding (though that would really work just as well).

9:35pm

```git commit -a -m "main page implemented, everything finished"```

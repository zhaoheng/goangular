# goConnnection

The goConnection provider is the lowest point of access to GoInstant in GoAngular.
It's used during configuration, and as convenient means of accessing your GoInstant
connection!

## Table of Contents

1. [Code Example](#code-example)
2. [goConnection#set](#goconnection#set)
3. [goConnection#ready](#goconnection#ready)

## Code Examples

### TL;DR Example

`goConnectionProvider.set` is used just once during configuration,
`goConnection.ready` can be used in any Angular controller or service to access
your connection!

```js
// Specify GoAngular as a module dependency
angular.module('yourApp', ['goangular'])

  // Configure your GoInstant Connection
  .config(function(goConnectionProvider) {
    goConnectionProvider.set('https://goinstant.net/YOURACCOUNT/YOURAPP');
  })

  // Inject goConnection into your controller
  .controller('yourController', function(goConnection) {
    goConnection.ready().then(function(connection) {
      // Use connection to manipulate rooms & keys
    });
  });
```

### Extended Example

To use `goConnection` you must include the Angular, GoInstant, and GoAngular
JavaScript libraries.

```js
<!DOCTYPE html>
<html ng-app="GoAngularExample">
  <head>
    <title>GoAngular goConnection Provider Example</title>
    <!-- Required JavaScript libraries -->
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
    <script src="https://cdn.goinstant.net/v1/platform.min.js"></script>
    <script src="https://cdn.goinstant.net/integrations/goangular/latest/goangular.min.js"></script>
    <script>
      // Create an Angular module and declare goangular as a dependency
      angular.module('GoAngularExample', ['goangular'])

        // Configure the connection with the connect url
        .config(function(goConnectionProvider) {
          goConnectionProvider.set('https://goinstant.net/YOURACCOUNT/YOURAPP');
        })

        // Access that connection via. goConnection.ready!
        .controller('completeControl', function(goConnection) {
          goConnection.ready().then(function(connection) {
            return connection.room('a-room').join().get('room');
          })
          .then(function(aRoom) {
            // manipulate keys on aRoom
          })
          .catch(function(err) {
            // Error handler
          })
        });
    </script>
  </head>
  <body>
    <div ng-controller="completeControl"></div>
  </body>
</html>
```

## goConnection#set

### Description

Used during Angular's configuration stage to set your connection URL and options.

### Methods

- ###### **goConnectionProvider.set(connectUrl)**
- ###### **goConnectionProvider.set(connectUrl, optionsObject)**

### Parameters

| connectUrl |
|:---|
| Type: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Your registered application URL (e.g. https://goinstant.net/YOURACCOUNT/YOURAPP). |

| optionsObject |
|:---|
| Type: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) |
| An object with three properties: `user`, `room` and `rooms`. |
| - `user` is an optional [JWT](../../guides/users_and_authentication.md) or Object. If not provided, the user will connect as a guest. If provided and an Object, the user will connect as a guest with the given default user properties. |
| - `room` is an optional string. If provided, the [Room](../../javascript_api/rooms/index.md) with the provided name will be joined, otherwise the 'lobby' Room will be joined. |
| - `rooms` is an optional array if strings. If provided, all rooms specified will be joined. |

### Example

```js
// Specify GoAngular as a dependency and configure your connection
angular.module('yourApp', ['goangular'])
  .config(function(goConnectionProvider) {
    goConnectionProvider.set('https://goinstant.net/YOURACCOUNT/YOURAPP');
  });
```

## goConnection#ready

### Description

Used after your connection has been configured to access your GoInstant
connection.

### Methods

- ###### **goConnection.ready()**

### Returns

| promiseObject |
|:---|
| Type: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| A Q powered promise which is resolved once a connection to GoInstant has been established or is rejected if an error is encountered.  |

### Example

```js
// Specify GoAngular as a dependency and configure your connection
angular.module('yourApp', ['goangular'])
  .config(function(goConnectionProvider) {
    goConnectionProvider.set('https://goinstant.net/YOURACCOUNT/YOURAPP');
  })
  .controller('completeControl', function(goConnection) {
    goConnection.ready().then(
      function(connection) {
        // Connected
      },
      function(err) {
        // Error encountered
      }
    );
  });
```

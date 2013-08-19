Account-JavaScriptSDK
=====================

Wandoujia Account SDK implement in JavaScript.

# Usage:
## Login
```JavaScript
SnapPea.Account.loginAsync({
    username : 'username',
    password : 'psw'
});
```
## Logout
```JavaScript
SnapPea.Account.logoutAsync();
```
## Registration
```JavaScript
SnapPea.Account.regAsync({
    username : 'username',
    password : 'psw'
});
```
## Validate email
```JavaScript
SnapPea.Account.isEmail(email);
```
## Validaet phone number
```JavaScript
SnapPea.Account.isEmail(email);
```
## Check whether an username is already exist
```JavaScript
SnapPea.Account.checkUsernameAsync(username);
```
## Get login status
```JavaScript
SnapPea.Account.isLogined();
```
## Get user info
```JavaScript
SnapPea.Account.getUserInfo();
```

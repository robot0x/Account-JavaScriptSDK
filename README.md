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
SnapPea.Account.isPhoneNumber(email);
```
## Check whether an username is exist
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
## Ask server whether an user is logined
```JavaScript
SnapPea.Account.checkUserLoginAsync();
```
## Request server to reset password
```JavaScript
SnapPea.Account.findPwdAsync(username);
```
## Reset password
```JavaScript
SnapPea.Account.resetPwdAsync({
    username : 'username',
    passcode : 'passcode',
    password : 'password'
});
```

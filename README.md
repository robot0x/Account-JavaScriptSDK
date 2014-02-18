豌豆荚账号系统 JavaScript SDK
=====================

统一 Web 端（含 Windows 客户端和各种 Webview 中需要调用账号信息的场景）调用豌豆荚账号系统 API 的方式，封装内部细节。保证 SDK API 稳定、优雅、安全并且文件体积小巧。

目前提供两种方案使用：

1. 通过 Hook 在页面中嵌入豌豆荚账号页面，用户登录（或其它操作）成功后将返回用户信息。适合需要豌豆荚账号进行认证的产品；
2. 通过 SDK 直接访问账号系统 API。适合针对豌豆荚账号系统进行深度定制的产品。

依赖
--------------------------------------

SDK 和 Hook 都依赖 [jQuery](https://github.com/jquery/jquery)（或 [Zepto](https://github.com/madrobby/zepto)）。由于跨文档通讯的需要，Hook 还依赖 [MessengerJS](https://github.com/biqing/MessengerJS)。

其中，Zepto 需要通过定制额外支持 data / deferred / callbacks 模块。定制方法请参考[官方说明](https://github.com/madrobby/zepto)，或者直接使用我们编译好的定制版 `app/javascripts/zepto.js` 。

约定
--------------------------------------

所有异步函数（函数名以 Async 结尾）将返回 $.Deferred 对象。

Hook 用法
--------------------------------------

### 检查用户登录状态

```JavaScript
SnapPea.AccountHook.checkAsync().then(function (resp) {
    console.log('Hello, %s!', resp.data.nick); // 已登录
}).fail(function () {
    console.log('Who are you?'); // 未登录
});
```

### 在页面内嵌入豌豆荚账号页面

```JavaScript
SnapPea.AccountHook.openAsync(name).then(function (resp) {
    if (resp.isLoggedIn) {
        console.log('Welcome back, %s.', resp.data.nick); // 操作成功后处于登录状态
    } else {
        console.log('Bye.'); // 操作成功后处于未登录状态
    }
});
```

其中，`name` 可为：
* login 登录
* register 注册
* find 找回密码
* password 修改密码
* logout 退出

### 跳转到豌豆荚账号页面

```JavaScript
SnapPea.AccountHook.redirect(name);
```

SDK 用法
--------------------------------------

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
## Login with thirdpart platform
```JavaScript
SnapPea.Account.loginWithThirdParty({
    platform : 'weibo',
    callback : 'http://www.wandoujia.com/'
});
```

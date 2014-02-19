豌豆荚账号系统 JavaScript SDK
=====================

统一 Web 端（含 Windows 客户端和各种 Webview 中需要调用账号信息的场景）调用豌豆荚账号系统 API 的方式，封装内部细节。保证 SDK API 稳定、优雅、安全并且文件体积小巧。

目前提供两种方案使用：

1. 通过 Hook 在页面中嵌入豌豆荚账号页面，用户登录（或其它操作）成功后将返回用户信息。适合需要豌豆荚账号进行认证的产品；
2. 通过 SDK 直接访问账号系统 API。适合针对豌豆荚账号系统进行深度定制的产品。

依赖
--------------------------------------

Hook 和 SDK 都依赖 [jQuery](https://github.com/jquery/jquery)（或 [Zepto](https://github.com/madrobby/zepto)）。由于跨文档通讯的需要，Hook 还依赖 [MessengerJS](https://github.com/biqing/MessengerJS)。

其中，Zepto 需要通过定制额外支持 data / deferred / callbacks 模块。定制方法请参考[官方说明](https://github.com/madrobby/zepto)，或者直接使用我们编译好的定制版 `app/javascripts/zepto.js` 。

约定
--------------------------------------

所有异步函数（函数名以 `Async` 结尾）将返回 `$.Deferred` 对象。

Hook 用法
--------------------------------------

#### 检查用户登录状态

```JavaScript
SnapPea.AccountHook.checkAsync().then(function (resp) {
    console.log('Hello, %s!', resp.data.nick); // 已登录
}).fail(function () {
    console.log('Who are you?'); // 未登录
});
```

#### 在页面内嵌入豌豆荚账号页面

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

#### 跳转到豌豆荚账号页面

```JavaScript
SnapPea.AccountHook.redirect(name);
```

SDK 用法
--------------------------------------

### 登录

```JavaScript
SnapPea.Account.loginAsync({
    username : 'username',
    password : 'psw'
});
```

### 注册

```JavaScript
SnapPea.Account.regAsync({
    username : 'username',
    password : 'psw'
});
```

### 验证邮箱格式

```JavaScript
SnapPea.Account.isEmail(email);
```

### 验证手机号格式

```JavaScript
SnapPea.Account.isPhoneNumber(email);
```

### 检查用户名是否可用

```JavaScript
SnapPea.Account.checkUsernameAsync(username);
```

### 通过第三方账号登录
```JavaScript
SnapPea.Account.loginWithThirdParty({
    platform : 'sina',
    callback : 'http://www.wandoujia.com/'
});
```

### 从本地获取用户登录状态

```JavaScript
SnapPea.Account.isLogined();
```

### 从本地获取用户信息

```JavaScript
SnapPea.Account.getUserInfo();
```

### 从服务端获取用户的登录状态和信息

```JavaScript
SnapPea.Account.checkUserLoginAsync();
```

### 通过用户名找回密码

```JavaScript
SnapPea.Account.findPwdAsync(username);
```

### 判断找回密码的激活码是否正确

```JavaScript
SnapPea.Account.checkCodeAsync({
    username : 'username',
    passcode : 'passcode'
});
```

### 重置密码

```JavaScript
SnapPea.Account.resetPwdAsync({
    username : 'username',
    passcode : 'passcode',
    password : 'password'
});
```

### 修改密码

```JavaScript
SnapPea.Account.modifyPwdAsync({
    password : 'password',
    newpassword : 'newpassword'
});
```

### 修改昵称

```JavaScript
SnapPea.Account.updateProfileAsync({
    nickname : 'nickname'
});
```

### 修改头像

```JavaScript
SnapPea.Account.uploadAvatarAsync({
    file : e.currentTarget.files[0]
});
```

### 判断一键注册修改密码的激活码是否正确

```JavaScript
SnapPea.Account.checkPasscodeAsync({
    passcode : 'passcode'
});
```

### 一键注册的修改密码

```JavaScript
SnapPea.Account.modifyPwdByCodeAsync({
    passcode : 'passcode',
    password : 'password'
});
```

### 激活账号

```JavaScript
SnapPea.Account.activateAsync({
    type : 'sms' // or email
});
```

### 判断激活账号的激活码是否正确

```JavaScript
SnapPea.Account.activateValidAsync({
    passcode : 'passcode',
    password : 'password'
});
```

### 解除第三方账号的绑定

```JavaScript
SnapPea.Account. unbindThirdPartyAsync({
    platform : '1' // 1=sina / 2=qq / 3=renren
});
```

### 退出

```JavaScript
SnapPea.Account.logoutAsync();
```

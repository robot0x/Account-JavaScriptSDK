module('loginAsync');
asyncTest('loginAsync', 5, function() {
    var Account = window.SnapPea.Account;

    var userInfo = {
    };
    var userInfo2 = {
        username : 'a'
    };
    var userInfo3 = {
        password : 'b'
    };
    var userInfo4 = {
        username : 'a',
        password : 'b'
    };
    var userInfo5 = {
        username : 'test@gmail.com',
        password : 'testgmail'
    };

    Account.loginAsync(userInfo).done(function () {
        ok(false);
    }).fail(function (resp) {
        ok(resp.error === -2, 'Missing pramas.');
    });

    Account.loginAsync(userInfo2).done(function () {
        ok(false);
    }).fail(function (resp) {
        ok(resp.error === -2, 'Missing username. ');
    });

    Account.loginAsync(userInfo3).done(function () {
        ok(false);
    }).fail(function (resp) {
        ok(resp.error === -2, 'Missing password. ');
    });

    Account.loginAsync(userInfo4).done(function () {
        ok(false);
    }).fail(function (resp) {
        ok(resp.error === 1010, 'Wrong username or password. ');
    });

    Account.loginAsync(userInfo5).done(function () {
        ok(true, 'Success login. ');
        start();
    }).fail(function (resp) {
        ok(false);
    });
});

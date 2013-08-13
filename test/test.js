describe('Account', function () {
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

    describe('Account.loginAsync()', function () {
        it('Should faild when misssing params. ', function (done) {
            Account.loginAsync(userInfo).done(function () {
                done('Should faild when misssing params. ');
            }).fail(function (resp) {
                if (resp.error === -2) {
                    done();
                }
            });
        });

        it('Should faild when misssing password. ', function (done) {
            Account.loginAsync(userInfo2).done(function () {
                done('Should faild when misssing password. ');
            }).fail(function (resp) {
                if (resp.error === -2) {
                    done();
                }
            });
        });

        it('Should faild when misssing username. ', function (done) {
            Account.loginAsync(userInfo3).done(function () {
                done('Should faild when misssing username. ');
            }).fail(function (resp) {
                if (resp.error === -2) {
                    done();
                }
            });
        });

        it('Should faild when username or password is incorrect. ', function (done) {
            Account.loginAsync(userInfo4).done(function () {
                done('Should faild when username or password is wrong. ');
            }).fail(function (resp) {
                if (resp.error === 1010) {
                    done();
                }
            });
        });

        it('Should pass when username and password are correct. ', function (done) {
            Account.loginAsync(userInfo5).done(function () {
                done();
            }).fail(function (resp) {
                done('Should faild when username or password are correct. ');
            });
        });
    });

    describe('Account.logoutAsync()', function () {
        it('Should pass anyway. ', function (done) {
            Account.logoutAsync().done(function () {
                done();
            }).fail(function (resp) {
                done('Should pass anyway. ');
            });
        });
    });

    describe('Account.isLogined()', function () {
        it('Should return true when login. ', function (done) {
            Account.loginAsync(userInfo5).done(function () {
                if (Account.isLogined()) {
                    done();
                } else {
                    done('Should return true when logined. ');
                }
            });
        });

        it('Should return false when logout. ', function (done) {
            Account.logoutAsync().done(function () {
                if (Account.isLogined()) {
                    done('Should return false when logout. ');
                } else {
                    done();
                }
            });
        });
    });
});

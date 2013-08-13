describe('Account', function () {
    describe('Account.loginAsync()', function () {
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
});

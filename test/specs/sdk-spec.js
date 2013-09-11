(function (window) {
    define(['src/snappea-account-sdk'], function () {
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
                username : 'testtesttest@gmail.com',
                password : 'testtest123'
            };

            describe('Account.loginAsync()', function () {
                it('Should faild when misssing params. ', function (done) {
                    Account.loginAsync(userInfo).then(function () {
                        done('Should faild when misssing params. ');
                    }).fail(function (resp) {
                        if (resp.error === -2) {
                            done();
                        }
                    });
                });

                it('Should faild when misssing password. ', function (done) {
                    Account.loginAsync(userInfo2).then(function () {
                        done('Should faild when misssing password. ');
                    }).fail(function (resp) {
                        if (resp.error === -2) {
                            done();
                        }
                    });
                });

                it('Should faild when misssing username. ', function (done) {
                    Account.loginAsync(userInfo3).then(function () {
                        done('Should faild when misssing username. ');
                    }).fail(function (resp) {
                        if (resp.error === -2) {
                            done();
                        }
                    });
                });

                it('Should faild when username or password is incorrect. ', function (done) {
                    Account.loginAsync(userInfo4).then(function () {
                        done('Should faild when username or password is wrong. ');
                    }).fail(function (resp) {
                        if (resp.error === 1010) {
                            done();
                        }
                    });
                });

                it('Should pass when username and password are correct. ', function (done) {
                    Account.loginAsync(userInfo5).then(function () {
                        done();
                    }).fail(function (resp) {
                        done('Should faild when username or password are correct. ');
                    });
                });

                it('Should have the username "testtesttest@gmail.com". ', function (done) {
                    if (Account.getUserInfo().username === 'testtesttest@gmail.com') {
                        done();
                    } else {
                        done('Should have the username "testtesttest@gmail.com". ');
                    }
                });
            });

            describe('Account.logoutAsync()', function () {
                it('Should pass anyway. ', function (done) {
                    Account.logoutAsync().then(function () {
                        done();
                    }).fail(function (resp) {
                        done('Should pass anyway. ');
                    });
                });

                it('Should not have user info. ', function (done) {
                    if (Account.getUserInfo() === undefined) {
                        done();
                    } else {
                        done('Should not have user info. ');
                    }
                });
            });

            describe('Account.isLogined()', function () {
                it('Should return true when login. ', function (done) {
                    Account.loginAsync(userInfo5).then(function () {
                        if (Account.isLogined()) {
                            done();
                        } else {
                            done('Should return true when logined. ');
                        }
                    });
                });

                it('Should return false when logout. ', function (done) {
                    Account.logoutAsync().then(function () {
                        if (Account.isLogined()) {
                            done('Should return false when logout. ');
                        } else {
                            done();
                        }
                    });
                });
            });

            describe('Account.isEmail()', function () {
                it('Should return true: ivanzhaowy@gmail.com', function (done) {
                    if (Account.isEmail('ivanzhaowy@gmail.com') === true) {
                        done();
                    } else {
                        done('Should return true: ivanzhaowy@gmail.com');
                    }
                });


                it('Should return true: wangye.zhao@gmail.com ', function (done) {
                    if (Account.isEmail('wangye.zhao@gmail.com') === true) {
                        done();
                    } else {
                        done('Should return true: wangye.zhao@gmail.com');
                    }
                });

                it('Should return false: ivanzhaowy@gmail ', function (done) {
                    if (Account.isEmail('ivanzhaowy@gmail') === false) {
                        done();
                    } else {
                        done('Should return true: ivanzhaowy@gmail');
                    }
                });

                it('Should return false: ivanzhaowy', function (done) {
                    if (Account.isEmail('ivanzhaowy') === false) {
                        done();
                    } else {
                        done('Should return true: ivanzhaowy');
                    }
                });
            });

            describe('Account.isPhoneNumber()', function () {
                it('Should return false: 1234567890', function (done) {
                    if (Account.isPhoneNumber('1234567890') === false) {
                        done();
                    } else {
                        done('Should return false: 1234567890');
                    }
                });

                it('Should return true: 15266770014', function (done) {
                    if (Account.isPhoneNumber('15266770014') === true) {
                        done();
                    } else {
                        done('Should return true: 15266770014');
                    }
                });

                it('Should return false: 一三四六六七七零零一四', function (done) {
                    if (Account.isPhoneNumber('一三四六六七七零零一四') === false) {
                        done();
                    } else {
                        done('Should return false: 一三四六六七七零零一四');
                    }
                });
            });

            describe('Account.regAsync()', function () {
                it('Should faild when misssing params. ', function (done) {
                    Account.regAsync(userInfo).then(function () {
                        done('Should faild when misssing params. ');
                    }).fail(function (resp) {
                        if (resp.error === -2) {
                            done();
                        }
                    });
                });

                it('Should faild when misssing password. ', function (done) {
                    Account.regAsync(userInfo2).then(function () {
                        done('Should faild when misssing password. ');
                    }).fail(function (resp) {
                        if (resp.error === -2) {
                            done();
                        }
                    });
                });

                it('Should faild when misssing username. ', function (done) {
                    Account.regAsync(userInfo3).then(function () {
                        done('Should faild when misssing username. ');
                    }).fail(function (resp) {
                        if (resp.error === -2) {
                            done();
                        }
                    });
                });

                it('Should faild when user exist. ', function (done) {
                    Account.regAsync(userInfo5).then(function (resp) {
                        done('Should faild when user exist. ');
                    }).fail(function (resp) {
                        done();
                    });
                });

                var username = 'zwy-wdj-test' + new Date().getTime() + '@gmail.com';
                it('Should pass when have username and password. ', function (done) {
                    Account.regAsync({
                        username : username,
                        password : new Date().getTime() + 'abcd'
                    }).then(function () {
                        done();
                    }).fail(function (resp) {
                        done('Should pass when have username and password. ');
                    });
                });

                it('Should have the username ' + username + '. ', function (done) {
                    if (Account.getUserInfo().username === username) {
                        done();
                    } else {
                        done('Should have the username ' + username + '. ');
                    }
                });
            });

            describe('Account.checkUsernameAsync()', function () {
                it('Should faild when misssing params. ', function (done) {
                    Account.checkUsernameAsync().then(function () {
                        done('Should faild when misssing params. ');
                    }).fail(function (resp) {
                        if (resp.error === -2) {
                            done();
                        }
                    });
                });

                it('Should faild when username already exist. ', function (done) {
                    Account.checkUsernameAsync('testtesttest@gmail.com').then(function (resp) {
                        if (resp) {
                            done();
                        } else {
                            done('Should faild when username already exist. ');
                        }
                    }).fail(function (resp) {
                        done('Should faild when username already exist. ');
                    });
                });

                it('Should pass when username is fucking new. ', function (done) {
                    Account.checkUsernameAsync(new Date().getTime() + '@gmail.com').then(function (resp) {
                        if (!resp) {
                            done();
                        } else {
                            done('Should pass when username is fucking new. ');
                        }
                    }).fail(function (resp) {
                        done('Should faild when username already exist. ');
                    });
                });
            });

            describe('Account.checkUserLoginAsync()', function () {
                it('Should return true when logined. ', function (done) {
                    Account.loginAsync(userInfo5).then(function () {
                        Account.checkUserLoginAsync().then(function (resp) {
                            if (resp) {
                                done();
                            } else {
                                done('Should return true when logined. ');
                            }
                        }).fail(function () {
                            done('Should return true when logined. ');
                        });
                    });
                });

                it('Should return false when logout. ', function (done) {
                    Account.logoutAsync(userInfo5).then(function () {
                        Account.checkUserLoginAsync().then(function (resp) {
                            if (!resp) {
                                done();
                            } else {
                                done('Should return true when logined. ');
                            }
                        }).fail(function () {
                            done();
                        });
                    });
                });
            });

            describe('Account.findPwdAsync()', function () {
                it('Should fail when username is empty. ', function (done) {
                    Account.findPwdAsync().then(function () {
                        done('Should fail when user info is empty. ');
                    }).fail(function () {
                        done();
                    });
                });

                it('Should success when username is not empty. ', function (done) {
                    Account.findPwdAsync('testtesttest@gmail').then(function () {
                        done();
                    }).fail(function () {
                        done('Should success when user info is empty. ');
                    });
                });
            });

            describe('Account.resetPwdAsync()', function () {
                it('Should fail when data is not enough. ', function (done) {
                    Account.resetPwdAsync(userInfo5).then(function () {
                        done('Should fail when data is not enough. ');
                    }).fail(function () {
                        done();
                    });
                });

                it('Should fail when passcode is not correct. ', function (done) {
                    userInfo5.passcode = 123455;
                    Account.resetPwdAsync(userInfo5).then(function () {
                        done('Should fail when passcode is not correct. ');
                    }).fail(function () {
                        done();
                    });
                });
            });
        });
    });
}(this));


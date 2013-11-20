/*global define, it, describe*/
(function (window) {
    define(['app/javascripts/snappea-account-sdk'], function () {
        describe('Account', function () {
            var Account = window.SnapPea.Account;

            var userEmpty = {
            };
            var userOnlyUsername = {
                username : 'a'
            };
            var userOnlyPassword = {
                password : 'b'
            };
            var userWrong = {
                username : 'a',
                password : 'b'
            };
            var userCorrect = {
                username : 'testtesttesttest@gmail.com',
                password : 'testtesttesttest'
            };
            var userNew = {
                username : 'zwy-wdj-test' + new Date().getTime() + '@gmail.com',
                password : new Date().getTime() + 'abcd'
            };

            describe('Account.loginAsync()', function () {
                it('Should faild when misssing params. ', function (done) {
                    Account.loginAsync(userEmpty).then(function () {
                        done('Should faild when misssing params. ');
                    }).fail(function (resp) {
                        if (resp.error === -2) {
                            done();
                        }
                    });
                });

                it('Should faild when misssing password. ', function (done) {
                    Account.loginAsync(userOnlyUsername).then(function () {
                        done('Should faild when misssing password. ');
                    }).fail(function (resp) {
                        if (resp.error === -2) {
                            done();
                        }
                    });
                });

                it('Should faild when misssing username. ', function (done) {
                    Account.loginAsync(userOnlyPassword).then(function () {
                        done('Should faild when misssing username. ');
                    }).fail(function (resp) {
                        if (resp.error === -2) {
                            done();
                        }
                    });
                });

                it('Should faild when username or password is incorrect. ', function (done) {
                    Account.loginAsync(userWrong).then(function () {
                        done('Should faild when username or password is wrong. ');
                    }).fail(function (resp) {
                        if (resp.error === 1010) {
                            done();
                        } else {
                            done('Should faild when username or password is wrong. ');
                        }
                    });
                });

                it('Should pass when username and password are correct. ', function (done) {
                    Account.loginAsync(userCorrect).then(function () {
                        done();
                    }).fail(function (resp) {
                        done('Should faild when username or password are correct. Server response: ' + JSON.stringify(resp));
                    });
                });

                it('Should have the username "testtesttesttest@gmail.com". ', function (done) {
                    if (Account.getUserInfo().username === 'testtesttesttest@gmail.com') {
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
                    Account.loginAsync(userCorrect).then(function () {
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

                it('Should return true: 18400013440', function (done) {
                    if (Account.isPhoneNumber('18400013440') === true) {
                        done();
                    } else {
                        done('Should return true: 18400013440');
                    }
                });

                it('Should return true: 18809800314', function (done) {
                    if (Account.isPhoneNumber('18809800314') === true) {
                        done();
                    } else {
                        done('Should return true: 18809800314');
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
                    Account.regAsync(userEmpty).then(function () {
                        done('Should faild when misssing params. ');
                    }).fail(function (resp) {
                        if (resp.error === -2) {
                            done();
                        }
                    });
                });

                it('Should faild when misssing password. ', function (done) {
                    Account.regAsync(userOnlyUsername).then(function () {
                        done('Should faild when misssing password. ');
                    }).fail(function (resp) {
                        if (resp.error === -2) {
                            done();
                        }
                    });
                });

                it('Should faild when misssing username. ', function (done) {
                    Account.regAsync(userOnlyPassword).then(function () {
                        done('Should faild when misssing username. ');
                    }).fail(function (resp) {
                        if (resp.error === -2) {
                            done();
                        }
                    });
                });

                it('Should faild when user exist. ', function (done) {
                    Account.regAsync(userCorrect).then(function (resp) {
                        done('Should faild when user exist. ');
                    }).fail(function (resp) {
                        done();
                    });
                });

                it('Should pass when have username and password. ', function (done) {
                    Account.regAsync(userNew).then(function () {
                        done();
                    }).fail(function (resp) {
                        done('Should pass when have username and password. Server response: ' + JSON.stringify(resp));
                    });
                });

                it('Should have the username ' + userNew.username + '. ', function (done) {
                    if (Account.getUserInfo().username === userNew.username) {
                        done();
                    } else {
                        done('Should have the username ' + userNew.username + '. ');
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
                    Account.checkUsernameAsync('testtesttesttest@gmail.com').then(function (resp) {
                        if (resp) {
                            done();
                        } else {
                            done('Should faild when username already exist. ');
                        }
                    }).fail(function (resp) {
                        done('Should faild when username already exist. Server response: ' + JSON.stringify(resp));
                    });
                });

                it('Should pass when username is fucking new. ', function (done) {
                    Account.checkUsernameAsync(new Date().getTime() + '@gmail.com').then(function (resp) {
                        if (!resp || resp === 'false') {
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
                    Account.loginAsync(userCorrect).then(function () {
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
                    Account.logoutAsync(userCorrect).then(function () {
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
                    Account.findPwdAsync('testtesttesttest@gmail.com').then(function () {
                        done();
                    }).fail(function (resp) {
                        done('Should success when user info is empty. Server response: ' + JSON.stringify(resp));
                    });
                });
            });

            describe('Account.resetPwdAsync()', function () {
                it('Should fail when data is not enough. ', function (done) {
                    Account.resetPwdAsync(userCorrect).then(function () {
                        done('Should fail when data is not enough. ');
                    }).fail(function () {
                        done();
                    });
                });

                it('Should fail when passcode is not correct. ', function (done) {
                    userCorrect.passcode = 123455;
                    Account.resetPwdAsync(userCorrect).then(function () {
                        done('Should fail when passcode is not correct. ');
                    }).fail(function () {
                        done();
                    });
                });
            });

            describe('Account.modifyPwdAsync()', function () {
                it('Should pass anyway. ', function (done) {
                    Account.logoutAsync().then(function () {
                        done();
                    }).fail(function (resp) {
                        done('Should pass anyway. ');
                    });
                });

                it('Should fail when user is not logged in. ', function (done) {
                    var password = {
                        password : '123456',
                        newpassword : 'wdj123456'
                    };

                    Account.modifyPwdAsync(password).then(function () {
                        done('Should fail when user is not logged in. ');
                    }).fail(function () {
                        done();
                    });
                });

                it('Should pass anyway. ', function (done) {
                    Account.loginAsync(userNew).then(function () {
                        done();
                    }).fail(function (resp) {
                        done('Should pass anyway. ');
                    });
                });

                it('Should faild when misssing params. ', function (done) {
                    Account.modifyPwdAsync(userOnlyPassword).then(function () {
                        done('Should faild when misssing params. ');
                    }).fail(function (resp) {
                        if (resp.error === -2) {
                            done();
                        } else {
                            done('Should faild when misssing params. ');
                        }
                    });
                });

                it('Should fail when password is not correct. ', function (done) {
                    var password = {
                        password : '123456',
                        newpassword : 'wdj123456'
                    };

                    Account.modifyPwdAsync(password).then(function () {
                        done('Should fail when password is not correct. ');
                    }).fail(function () {
                        done();
                    });
                });

                it('Should success when password is correct. ', function (done) {
                    var password = {
                        password : userNew.password,
                        newpassword : 'wdj123456'
                    };

                    Account.modifyPwdAsync(password).then(function (resp) {
                        userNew.password = password.newpassword;
                        done();
                    }).fail(function () {
                        done('Should success when password is correct. ');
                    });
                });
            });

            describe('Account.updateProfileAsync()', function () {
                var nick = 'WandouLabs';

                it('Should fail when user is not logged in. ', function (done) {
                    Account.logoutAsync().then(function () {
                        Account.updateProfileAsync({
                            nickname : nick
                        }).then(function () {
                            done('Should fail when user is not logged in. ');
                        }).fail(function () {
                            done();
                        });
                    });
                });

                it('Should faild when misssing params. ', function (done) {
                    Account.loginAsync(userNew).then(function () {
                        Account.updateProfileAsync({
                            nick : 'wrongParameter'
                        }).then(function () {
                            done('Should faild when misssing params. ');
                        }).fail(function (resp) {
                            if (resp.error === -2) {
                                done();
                            } else {
                                done('Should faild when misssing params. ');
                            }
                        });
                    });
                });

                it('Should success when nickname is not empty. ', function (done) {
                    Account.loginAsync(userNew).then(function () {
                        Account.updateProfileAsync({
                            nickname : nick
                        }).then(function (resp) {
                            if (Account.getUserInfo().nick === nick) {
                                done();
                            } else {
                                done('Should success when nickname is not empty. ');
                            }
                        }).fail(function (resp) {
                            done('Should success when nickname is not empty. ');
                        });
                    });
                });
            });
        });
    });
}(this));

/*global $*/
(function (global) {
    var Deferred = $.Deferred;
    var ajax = $.ajax;

    $.ajaxSetup({
        xhrFields : {
            withCredentials : true
        }
    });

    var HOST = 'https://account.wandoujia.com';
    var API_VERSION_4 = '/v4/api';
    var API_VERSION_1 = '/v1';

    var PREFIX = HOST + API_VERSION_4;

    var CONFIG = {
        login : PREFIX + '/login',
        logout : PREFIX + '/logout',
        captcha : PREFIX + '/seccode',
        reg : PREFIX + '/register',
        checkUsername : PREFIX + '/isUsernameExisted',
        checkUserLogin : PREFIX + '/profile',
        findPwd : PREFIX + '/findpassword',
        checkCode : PREFIX + '/checkcode',
        resetPwd : PREFIX + '/resetpassword'
    };

    var CONFIG_V1 = {
        loginWithThirdParty : HOST + API_VERSION_1 + '/user/?do=login'
    };

    var USER_INFO;
    var IS_LOGINED = false;

    var Account = {};

    Account.CAPTCHA = CONFIG.captcha;

    Account.loginAsync = function (data, options) {
        var deferred = new Deferred();

        data = data || {};
        options = options || {};

        if (!data.username || !data.password) {
            deferred.reject({
                error : -2,
                msg : '参数不全'
            });
        } else {
            ajax({
                type : 'POST',
                url : CONFIG.login,
                data : {
                    username : data.username,
                    password : data.password,
                    seccode : data.seccode || ''
                },
                success : function (resp) {
                    if (resp.error === 0) {
                        IS_LOGINED = true;
                        USER_INFO = resp.member;
                        deferred.resolve(resp.member);
                    } else {
                        deferred.reject(resp);
                    }
                },
                error : function () {
                    deferred.reject({
                        error : -1,
                        msg : '请求失败，请检查网络连接状况'
                    });
                }
            });
        }

        return deferred.promise();
    };

    Account.isLogined = function () {
        return IS_LOGINED;
    };

    Account.getUserInfo = function () {
        return USER_INFO;
    };

    Account.logoutAsync = function () {
        var deferred = new Deferred();

        ajax({
            type : 'POST',
            url : CONFIG.logout,
            success : function (resp) {
                if (resp.error === 0) {
                    IS_LOGINED = false;
                    USER_INFO = undefined;
                    deferred.resolve(resp);
                } else {
                    deferred.reject(resp);
                }
            },
            error : function () {
                deferred.reject({
                    error : -1,
                    msg : '请求失败，请检查网络连接状况。'
                });
            }
        });

        return deferred.promise();
    };

    Account.regAsync = function (data, options) {
        var deferred = new Deferred();

        data = data || {};
        options = options || {};

        if (!data.username || !data.password) {
            deferred.reject({
                error : -2,
                msg : '参数不全'
            });
        } else {
            ajax({
                type : 'POST',
                url : CONFIG.reg,
                data : {
                    username : data.username,
                    password : data.password,
                    nikename : data.nikename || '',
                    seccode : data.seccode || ''
                },
                success : function (resp) {
                    if (resp.error === 0) {
                        IS_LOGINED = true;
                        USER_INFO = resp.member;
                        deferred.resolve(resp);
                    } else {
                        deferred.reject(resp);
                    }
                },
                error : function () {
                    deferred.reject({
                        error : -1,
                        msg : '请求失败，请检查网络连接状况。'
                    });
                }
            });
        }

        return deferred.promise();
    };

    Account.checkUsernameAsync = function (username, options) {
        var deferred = new Deferred();

        if (username === undefined) {
            deferred.reject({
                error : -2,
                msg : '参数不全'
            });
        } else {
            ajax({
                type : 'POST',
                url : CONFIG.checkUsername,
                data : {
                    username : username
                },
                success : function (resp) {
                    deferred.resolve(resp);
                },
                error : function () {
                    deferred.reject({
                        error : -1,
                        msg : '请求失败，请检查网络连接状况。'
                    });
                }
            });
        }

        return deferred.promise();
    };

    Account.checkUserLoginAsync = function (options) {
        var deferred = new Deferred();

        options = options || {};

        ajax({
            type : 'GET',
            url : CONFIG.checkUserLogin,
            success : function (resp) {
                if (resp.error === 0) {
                    IS_LOGINED = true;
                    USER_INFO = resp.member;
                    deferred.resolve(true);
                } else {
                    IS_LOGINED = false;
                    USER_INFO = undefined;
                    deferred.reject(false);
                }
            },
            error : function () {
                deferred.reject(false);
            }
        });

        return deferred.promise();
    };

    Account.findPwdAsync = function (username, options) {
        var deferred = new Deferred();

        if (username === undefined) {
            deferred.reject({
                error : -2,
                msg : '参数不全'
            });
        } else {
            ajax({
                type : 'POST',
                url : CONFIG.findPwd,
                data : {
                    username : username
                },
                success : function (resp) {
                    deferred.resolve(resp);
                },
                error : function () {
                    deferred.reject({
                        error : -1,
                        msg : '请求失败，请检查网络连接状况。'
                    });
                }
            });
        }

        return deferred.promise();
    };

    Account.checkCodeAsync = function (data, options) {
        var deferred = new Deferred();

        data = data || {};
        options = options || {};

        if (data.username === undefined ||
                data.passcode === undefined) {
            deferred.reject({
                error : -2,
                msg : '参数不全'
            });
        } else {
            ajax({
                type : 'POST',
                url : CONFIG.checkCode,
                data : {
                    username : data.username,
                    passcode : data.passcode
                },
                success : function (resp) {
                    if (resp.error === 0) {
                        deferred.resolve(resp);
                    } else {
                        deferred.reject(resp);
                    }
                },
                error : function () {
                    deferred.reject({
                        error : -1,
                        msg : '请求失败，请检查网络连接状况。'
                    });
                }
            });
        }

        return deferred.promise();
    }

    Account.resetPwdAsync = function (data, options) {
        var deferred = new Deferred();

        data = data || {};
        options = options || {};

        if (data.username === undefined ||
                data.passcode === undefined ||
                data.password === undefined) {
            deferred.reject({
                error : -2,
                msg : '参数不全'
            });
        } else {
            ajax({
                type : 'POST',
                url : CONFIG.resetPwd,
                data : {
                    username : data.username,
                    passcode : data.passcode,
                    password : data.password,
                    repeatedpassword : data.password
                },
                success : function (resp) {
                    if (resp.error === 0) {
                        deferred.resolve(resp);
                    } else {
                        deferred.reject(resp);
                    }
                },
                error : function () {
                    deferred.reject({
                        error : -1,
                        msg : '请求失败，请检查网络连接状况。'
                    });
                }
            });
        }

        return deferred.promise();
    };

    Account.isEmail = function (input) {
        var EMAIL_PATTREN = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/;
        return EMAIL_PATTREN.test(input);
    };

    Account.isPhoneNumber = function (input) {
        var PHONE_PATTERN = /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(13\d{9}$)|(15[0135-9]\d{8}$)|(18[267]\d{8}$)/;
        return PHONE_PATTERN.test(input);
    };

    /* `platform` could be one of `weibo`, `qq`, `renren` */
    Account.loginWithThirdParty = function (options) {
        options = options || {};

        options.callback = options.callback || 'http://www.wandoujia.com/';

        var platforms = {
            weibo : 'sina',
            sina : 'sina',
            renren : 'renren',
            qq : 'qq'
        };

        target = platforms[options.platform];

        var datas = [];
        var d;
        for (d in options) {
            if (options.hasOwnProperty(d)) {
                datas.push(d + '=' + window.encodeURIComponent(options[d]));
            }
        }

        var targeURL = CONFIG_V1.loginWithThirdParty;

        if (datas.length > 0) {
            targeURL = targeURL + '&' + datas.join('&');
        }

        location.href = targeURL;
    };

    var SnapPea = global.SnapPea || {};
    SnapPea.Account = Account;
    global.SnapPea = SnapPea;

    return Account;
}(this));

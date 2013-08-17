/*global $*/
(function (global) {
    var Deferred = $.Deferred;
    var ajax = $.ajax;

    $.ajaxSetup({
        xhrFields : {
            withCredentials : true
        }
    });

    var PREFIX = 'https://account.wandoujia.com/v4/api';

    var CONFIG = {
        login : PREFIX + '/login',
        logout : PREFIX + '/logout',
        captcha : PREFIX + '/seccode',
        reg :　PREFIX + '/register',
        checkUsername : PREFIX + '/isUsernameExisted'
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

    Account.isEmail = function (input) {
        var EMAIL_PATTREN = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/;
        return EMAIL_PATTREN.test(input);
    };

    Account.isPhoneNumer = function (input) {
        var PHONE_PATTERN = /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(13\d{9}$)|(15[0135-9]\d{8}$)|(18[267]\d{8}$)/;
        return PHONE_PATTERN.test(input);
    };

    var SnapPea = global.SnapPea || {};
    SnapPea.Account = Account;
    global.SnapPea = SnapPea;

    return Account;
}(this));

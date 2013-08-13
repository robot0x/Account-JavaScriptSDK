(function (global) {
    var Deferred = $.Deferred;
    var ajax = $.ajax;

    var getCookie = function (name) {
        var arr = global.document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
        if (arr) {
            return unescape(arr[2]);
        }
        return undefined;
    };

    var PREFIX = 'https://account.wandoujia.com';

    var CONFIG = {
        login : PREFIX + '/v4/api/login'
    };

    var WDJ_AUTH = getCookie('wdj_auth');
    var USER_INFO = undefined;
    var IS_LOGINED = false;

    var Account = function () {

    };

    Account.loginAsync = function (data, options) {
        var deferred = new Deferred();

        data = data || {};
        options = options || {};

        if (!data.username || !data.password) {
            setTimeout(function () {
                deferred.reject({
                    error : -2,
                    msg : '参数不全'
                });
            });
        } else {
            ajax({
                type : 'POST',
                url : CONFIG.login,
                data : {
                    username : data.username,
                    password : data.password
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
                        msg : '请求失败，请检查网络连接状况。'
                    });
                }
            });
        }

        return deferred.promise();
    };

    var SnapPea = global.SnapPea || {};
    SnapPea.Account = Account;
    global.SnapPea = SnapPea;

    return Account;
})(this);

if (typeof __$coverObject === "undefined"){
	if (typeof window !== "undefined") window.__$coverObject = {};
	else if (typeof global !== "undefined") global.__$coverObject = {};
	else throw new Error("cannot find the global scope");
}
var __$coverInit = function(name, code){
	if (!__$coverObject[name]) __$coverObject[name] = {__code: code};
};
var __$coverInitRange = function(name, range){
	if (!__$coverObject[name][range]) __$coverObject[name][range] = 0;
};
var __$coverCall = function(name, range){
	__$coverObject[name][range]++;
};
__$coverInit("src/snappea-account-sdk.js", "(function (global) {\n    var Deferred = $.Deferred;\n    var ajax = $.ajax;\n\n    $.ajaxSetup({\n        xhrFields : {\n            withCredentials : true\n        }\n    });\n\n    var getCookie = function (name) {\n        var arr = global.document.cookie.match(new RegExp(\"(^| )\"+name+\"=([^;]*)(;|$)\"));\n        if (arr) {\n            return unescape(arr[2]);\n        }\n        return undefined;\n    };\n\n    var PREFIX = 'https://account.wandoujia.com/v4/api';\n\n    var CONFIG = {\n        login : PREFIX + '/login',\n        logout : PREFIX + '/logout',\n        captcha : PREFIX + '/seccode'\n    };\n\n    var WDJ_AUTH = getCookie('wdj_auth');\n    var USER_INFO = undefined;\n    var IS_LOGINED = false;\n\n    var Account = function () {\n\n    };\n\n    Account.captcha = CONFIG.captcha;\n\n    Account.loginAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (!data.username || !data.password) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                url : CONFIG.login,\n                data : {\n                    username : data.username,\n                    password : data.password\n                },\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        IS_LOGINED = true;\n                        USER_INFO = resp.member;\n                        deferred.resolve(resp.member);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise();\n    };\n\n    Account.isLogined = function () {\n        return IS_LOGINED;\n    };\n\n    Account.logoutAsync = function () {\n        var deferred = new Deferred();\n\n        ajax({\n            type : 'POST',\n            url : CONFIG.logout,\n            success : function (resp) {\n                if (resp.error === 0) {\n                    IS_LOGINED = false;\n                    USER_INFO = undefined;\n                    deferred.resolve(resp);\n                } else {\n                    deferred.reject(resp);\n                }\n            },\n            error : function () {\n                deferred.reject({\n                    error : -1,\n                    msg : '请求失败，请检查网络连接状况。'\n                });\n            }\n        });\n\n        return deferred.promise();\n    };\n\n    Account.regAsync = function (data, options) {\n        data = data || {};\n        options = options || {};\n\n    };\n\n    var SnapPea = global.SnapPea || {};\n    SnapPea.Account = Account;\n    global.SnapPea = SnapPea;\n\n    return Account;\n})(this);\n");
__$coverInitRange("src/snappea-account-sdk.js", "0:2960");
__$coverInitRange("src/snappea-account-sdk.js", "25:50");
__$coverInitRange("src/snappea-account-sdk.js", "56:73");
__$coverInitRange("src/snappea-account-sdk.js", "80:167");
__$coverInitRange("src/snappea-account-sdk.js", "174:395");
__$coverInitRange("src/snappea-account-sdk.js", "402:453");
__$coverInitRange("src/snappea-account-sdk.js", "460:590");
__$coverInitRange("src/snappea-account-sdk.js", "597:633");
__$coverInitRange("src/snappea-account-sdk.js", "639:664");
__$coverInitRange("src/snappea-account-sdk.js", "670:692");
__$coverInitRange("src/snappea-account-sdk.js", "699:733");
__$coverInitRange("src/snappea-account-sdk.js", "740:772");
__$coverInitRange("src/snappea-account-sdk.js", "779:1938");
__$coverInitRange("src/snappea-account-sdk.js", "1945:2011");
__$coverInitRange("src/snappea-account-sdk.js", "2018:2708");
__$coverInitRange("src/snappea-account-sdk.js", "2715:2827");
__$coverInitRange("src/snappea-account-sdk.js", "2834:2868");
__$coverInitRange("src/snappea-account-sdk.js", "2874:2899");
__$coverInitRange("src/snappea-account-sdk.js", "2905:2929");
__$coverInitRange("src/snappea-account-sdk.js", "2936:2950");
__$coverInitRange("src/snappea-account-sdk.js", "216:296");
__$coverInitRange("src/snappea-account-sdk.js", "306:362");
__$coverInitRange("src/snappea-account-sdk.js", "372:388");
__$coverInitRange("src/snappea-account-sdk.js", "329:352");
__$coverInitRange("src/snappea-account-sdk.js", "835:864");
__$coverInitRange("src/snappea-account-sdk.js", "875:892");
__$coverInitRange("src/snappea-account-sdk.js", "902:925");
__$coverInitRange("src/snappea-account-sdk.js", "936:1895");
__$coverInitRange("src/snappea-account-sdk.js", "1906:1931");
__$coverInitRange("src/snappea-account-sdk.js", "988:1077");
__$coverInitRange("src/snappea-account-sdk.js", "1108:1885");
__$coverInitRange("src/snappea-account-sdk.js", "1381:1648");
__$coverInitRange("src/snappea-account-sdk.js", "1429:1446");
__$coverInitRange("src/snappea-account-sdk.js", "1472:1495");
__$coverInitRange("src/snappea-account-sdk.js", "1521:1550");
__$coverInitRange("src/snappea-account-sdk.js", "1605:1626");
__$coverInitRange("src/snappea-account-sdk.js", "1727:1851");
__$coverInitRange("src/snappea-account-sdk.js", "1987:2004");
__$coverInitRange("src/snappea-account-sdk.js", "2062:2091");
__$coverInitRange("src/snappea-account-sdk.js", "2102:2665");
__$coverInitRange("src/snappea-account-sdk.js", "2676:2701");
__$coverInitRange("src/snappea-account-sdk.js", "2225:2460");
__$coverInitRange("src/snappea-account-sdk.js", "2269:2287");
__$coverInitRange("src/snappea-account-sdk.js", "2309:2330");
__$coverInitRange("src/snappea-account-sdk.js", "2352:2374");
__$coverInitRange("src/snappea-account-sdk.js", "2421:2442");
__$coverInitRange("src/snappea-account-sdk.js", "2527:2639");
__$coverInitRange("src/snappea-account-sdk.js", "2769:2786");
__$coverInitRange("src/snappea-account-sdk.js", "2796:2819");
__$coverCall('src/snappea-account-sdk.js', '0:2960');
(function (global) {
    __$coverCall('src/snappea-account-sdk.js', '25:50');
    var Deferred = $.Deferred;
    __$coverCall('src/snappea-account-sdk.js', '56:73');
    var ajax = $.ajax;
    __$coverCall('src/snappea-account-sdk.js', '80:167');
    $.ajaxSetup({ xhrFields: { withCredentials: true } });
    __$coverCall('src/snappea-account-sdk.js', '174:395');
    var getCookie = function (name) {
        __$coverCall('src/snappea-account-sdk.js', '216:296');
        var arr = global.document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
        __$coverCall('src/snappea-account-sdk.js', '306:362');
        if (arr) {
            __$coverCall('src/snappea-account-sdk.js', '329:352');
            return unescape(arr[2]);
        }
        __$coverCall('src/snappea-account-sdk.js', '372:388');
        return undefined;
    };
    __$coverCall('src/snappea-account-sdk.js', '402:453');
    var PREFIX = 'https://account.wandoujia.com/v4/api';
    __$coverCall('src/snappea-account-sdk.js', '460:590');
    var CONFIG = {
            login: PREFIX + '/login',
            logout: PREFIX + '/logout',
            captcha: PREFIX + '/seccode'
        };
    __$coverCall('src/snappea-account-sdk.js', '597:633');
    var WDJ_AUTH = getCookie('wdj_auth');
    __$coverCall('src/snappea-account-sdk.js', '639:664');
    var USER_INFO = undefined;
    __$coverCall('src/snappea-account-sdk.js', '670:692');
    var IS_LOGINED = false;
    __$coverCall('src/snappea-account-sdk.js', '699:733');
    var Account = function () {
    };
    __$coverCall('src/snappea-account-sdk.js', '740:772');
    Account.captcha = CONFIG.captcha;
    __$coverCall('src/snappea-account-sdk.js', '779:1938');
    Account.loginAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '835:864');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '875:892');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '902:925');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '936:1895');
        if (!data.username || !data.password) {
            __$coverCall('src/snappea-account-sdk.js', '988:1077');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '1108:1885');
            ajax({
                type: 'POST',
                url: CONFIG.login,
                data: {
                    username: data.username,
                    password: data.password
                },
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '1381:1648');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '1429:1446');
                        IS_LOGINED = true;
                        __$coverCall('src/snappea-account-sdk.js', '1472:1495');
                        USER_INFO = resp.member;
                        __$coverCall('src/snappea-account-sdk.js', '1521:1550');
                        deferred.resolve(resp.member);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '1605:1626');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '1727:1851');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '1906:1931');
        return deferred.promise();
    };
    __$coverCall('src/snappea-account-sdk.js', '1945:2011');
    Account.isLogined = function () {
        __$coverCall('src/snappea-account-sdk.js', '1987:2004');
        return IS_LOGINED;
    };
    __$coverCall('src/snappea-account-sdk.js', '2018:2708');
    Account.logoutAsync = function () {
        __$coverCall('src/snappea-account-sdk.js', '2062:2091');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '2102:2665');
        ajax({
            type: 'POST',
            url: CONFIG.logout,
            success: function (resp) {
                __$coverCall('src/snappea-account-sdk.js', '2225:2460');
                if (resp.error === 0) {
                    __$coverCall('src/snappea-account-sdk.js', '2269:2287');
                    IS_LOGINED = false;
                    __$coverCall('src/snappea-account-sdk.js', '2309:2330');
                    USER_INFO = undefined;
                    __$coverCall('src/snappea-account-sdk.js', '2352:2374');
                    deferred.resolve(resp);
                } else {
                    __$coverCall('src/snappea-account-sdk.js', '2421:2442');
                    deferred.reject(resp);
                }
            },
            error: function () {
                __$coverCall('src/snappea-account-sdk.js', '2527:2639');
                deferred.reject({
                    error: -1,
                    msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                });
            }
        });
        __$coverCall('src/snappea-account-sdk.js', '2676:2701');
        return deferred.promise();
    };
    __$coverCall('src/snappea-account-sdk.js', '2715:2827');
    Account.regAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '2769:2786');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '2796:2819');
        options = options || {};
    };
    __$coverCall('src/snappea-account-sdk.js', '2834:2868');
    var SnapPea = global.SnapPea || {};
    __$coverCall('src/snappea-account-sdk.js', '2874:2899');
    SnapPea.Account = Account;
    __$coverCall('src/snappea-account-sdk.js', '2905:2929');
    global.SnapPea = SnapPea;
    __$coverCall('src/snappea-account-sdk.js', '2936:2950');
    return Account;
}(this));
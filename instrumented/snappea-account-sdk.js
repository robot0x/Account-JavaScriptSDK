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
__$coverInit("src/snappea-account-sdk.js", "(function (global) {\n    var Deferred = $.Deferred;\n    var ajax = $.ajax;\n\n    $.ajaxSetup({\n        xhrFields : {\n            withCredentials : true\n        }\n    });\n\n    var getCookie = function (name) {\n        var arr = global.document.cookie.match(new RegExp(\"(^| )\"+name+\"=([^;]*)(;|$)\"));\n        if (arr) {\n            return unescape(arr[2]);\n        }\n        return undefined;\n    };\n\n    var PREFIX = 'https://account.wandoujia.com';\n\n    var CONFIG = {\n        login : PREFIX + '/v4/api/login',\n        logout : PREFIX + '/v4/api/logout'\n    };\n\n    var WDJ_AUTH = getCookie('wdj_auth');\n    var USER_INFO = undefined;\n    var IS_LOGINED = false;\n\n    var Account = function () {\n\n    };\n\n    Account.loginAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (!data.username || !data.password) {\n            setTimeout(function () {\n                deferred.reject({\n                    error : -2,\n                    msg : '参数不全'\n                });\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                url : CONFIG.login,\n                data : {\n                    username : data.username,\n                    password : data.password\n                },\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        IS_LOGINED = true;\n                        USER_INFO = resp.member;\n                        deferred.resolve(resp.member);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise();\n    };\n\n    Account.isLogined = function () {\n        return IS_LOGINED;\n    };\n\n    Account.logoutAsync = function () {\n        var deferred = new Deferred();\n\n        ajax({\n            type : 'POST',\n            url : CONFIG.logout,\n            success : function (resp) {\n                if (resp.error === 0) {\n                    IS_LOGINED = false;\n                    USER_INFO = undefined;\n                    deferred.resolve(resp);\n                } else {\n                    deferred.reject(resp);\n                }\n            },\n            error : function () {\n                deferred.reject({\n                    error : -1,\n                    msg : '请求失败，请检查网络连接状况。'\n                });\n            }\n        });\n\n        return deferred.promise();\n    };\n\n    var SnapPea = global.SnapPea || {};\n    SnapPea.Account = Account;\n    global.SnapPea = SnapPea;\n\n    return Account;\n})(this);\n");
__$coverInitRange("src/snappea-account-sdk.js", "0:2839");
__$coverInitRange("src/snappea-account-sdk.js", "25:50");
__$coverInitRange("src/snappea-account-sdk.js", "56:73");
__$coverInitRange("src/snappea-account-sdk.js", "80:167");
__$coverInitRange("src/snappea-account-sdk.js", "174:395");
__$coverInitRange("src/snappea-account-sdk.js", "402:446");
__$coverInitRange("src/snappea-account-sdk.js", "453:558");
__$coverInitRange("src/snappea-account-sdk.js", "565:601");
__$coverInitRange("src/snappea-account-sdk.js", "607:632");
__$coverInitRange("src/snappea-account-sdk.js", "638:660");
__$coverInitRange("src/snappea-account-sdk.js", "667:701");
__$coverInitRange("src/snappea-account-sdk.js", "708:1936");
__$coverInitRange("src/snappea-account-sdk.js", "1943:2009");
__$coverInitRange("src/snappea-account-sdk.js", "2016:2706");
__$coverInitRange("src/snappea-account-sdk.js", "2713:2747");
__$coverInitRange("src/snappea-account-sdk.js", "2753:2778");
__$coverInitRange("src/snappea-account-sdk.js", "2784:2808");
__$coverInitRange("src/snappea-account-sdk.js", "2815:2829");
__$coverInitRange("src/snappea-account-sdk.js", "216:296");
__$coverInitRange("src/snappea-account-sdk.js", "306:362");
__$coverInitRange("src/snappea-account-sdk.js", "372:388");
__$coverInitRange("src/snappea-account-sdk.js", "329:352");
__$coverInitRange("src/snappea-account-sdk.js", "764:793");
__$coverInitRange("src/snappea-account-sdk.js", "804:821");
__$coverInitRange("src/snappea-account-sdk.js", "831:854");
__$coverInitRange("src/snappea-account-sdk.js", "865:1893");
__$coverInitRange("src/snappea-account-sdk.js", "1904:1929");
__$coverInitRange("src/snappea-account-sdk.js", "917:1075");
__$coverInitRange("src/snappea-account-sdk.js", "958:1059");
__$coverInitRange("src/snappea-account-sdk.js", "1106:1883");
__$coverInitRange("src/snappea-account-sdk.js", "1379:1646");
__$coverInitRange("src/snappea-account-sdk.js", "1427:1444");
__$coverInitRange("src/snappea-account-sdk.js", "1470:1493");
__$coverInitRange("src/snappea-account-sdk.js", "1519:1548");
__$coverInitRange("src/snappea-account-sdk.js", "1603:1624");
__$coverInitRange("src/snappea-account-sdk.js", "1725:1849");
__$coverInitRange("src/snappea-account-sdk.js", "1985:2002");
__$coverInitRange("src/snappea-account-sdk.js", "2060:2089");
__$coverInitRange("src/snappea-account-sdk.js", "2100:2663");
__$coverInitRange("src/snappea-account-sdk.js", "2674:2699");
__$coverInitRange("src/snappea-account-sdk.js", "2223:2458");
__$coverInitRange("src/snappea-account-sdk.js", "2267:2285");
__$coverInitRange("src/snappea-account-sdk.js", "2307:2328");
__$coverInitRange("src/snappea-account-sdk.js", "2350:2372");
__$coverInitRange("src/snappea-account-sdk.js", "2419:2440");
__$coverInitRange("src/snappea-account-sdk.js", "2525:2637");
__$coverCall('src/snappea-account-sdk.js', '0:2839');
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
    __$coverCall('src/snappea-account-sdk.js', '402:446');
    var PREFIX = 'https://account.wandoujia.com';
    __$coverCall('src/snappea-account-sdk.js', '453:558');
    var CONFIG = {
            login: PREFIX + '/v4/api/login',
            logout: PREFIX + '/v4/api/logout'
        };
    __$coverCall('src/snappea-account-sdk.js', '565:601');
    var WDJ_AUTH = getCookie('wdj_auth');
    __$coverCall('src/snappea-account-sdk.js', '607:632');
    var USER_INFO = undefined;
    __$coverCall('src/snappea-account-sdk.js', '638:660');
    var IS_LOGINED = false;
    __$coverCall('src/snappea-account-sdk.js', '667:701');
    var Account = function () {
    };
    __$coverCall('src/snappea-account-sdk.js', '708:1936');
    Account.loginAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '764:793');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '804:821');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '831:854');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '865:1893');
        if (!data.username || !data.password) {
            __$coverCall('src/snappea-account-sdk.js', '917:1075');
            setTimeout(function () {
                __$coverCall('src/snappea-account-sdk.js', '958:1059');
                deferred.reject({
                    error: -2,
                    msg: '\u53c2\u6570\u4e0d\u5168'
                });
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '1106:1883');
            ajax({
                type: 'POST',
                url: CONFIG.login,
                data: {
                    username: data.username,
                    password: data.password
                },
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '1379:1646');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '1427:1444');
                        IS_LOGINED = true;
                        __$coverCall('src/snappea-account-sdk.js', '1470:1493');
                        USER_INFO = resp.member;
                        __$coverCall('src/snappea-account-sdk.js', '1519:1548');
                        deferred.resolve(resp.member);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '1603:1624');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '1725:1849');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '1904:1929');
        return deferred.promise();
    };
    __$coverCall('src/snappea-account-sdk.js', '1943:2009');
    Account.isLogined = function () {
        __$coverCall('src/snappea-account-sdk.js', '1985:2002');
        return IS_LOGINED;
    };
    __$coverCall('src/snappea-account-sdk.js', '2016:2706');
    Account.logoutAsync = function () {
        __$coverCall('src/snappea-account-sdk.js', '2060:2089');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '2100:2663');
        ajax({
            type: 'POST',
            url: CONFIG.logout,
            success: function (resp) {
                __$coverCall('src/snappea-account-sdk.js', '2223:2458');
                if (resp.error === 0) {
                    __$coverCall('src/snappea-account-sdk.js', '2267:2285');
                    IS_LOGINED = false;
                    __$coverCall('src/snappea-account-sdk.js', '2307:2328');
                    USER_INFO = undefined;
                    __$coverCall('src/snappea-account-sdk.js', '2350:2372');
                    deferred.resolve(resp);
                } else {
                    __$coverCall('src/snappea-account-sdk.js', '2419:2440');
                    deferred.reject(resp);
                }
            },
            error: function () {
                __$coverCall('src/snappea-account-sdk.js', '2525:2637');
                deferred.reject({
                    error: -1,
                    msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                });
            }
        });
        __$coverCall('src/snappea-account-sdk.js', '2674:2699');
        return deferred.promise();
    };
    __$coverCall('src/snappea-account-sdk.js', '2713:2747');
    var SnapPea = global.SnapPea || {};
    __$coverCall('src/snappea-account-sdk.js', '2753:2778');
    SnapPea.Account = Account;
    __$coverCall('src/snappea-account-sdk.js', '2784:2808');
    global.SnapPea = SnapPea;
    __$coverCall('src/snappea-account-sdk.js', '2815:2829');
    return Account;
}(this));
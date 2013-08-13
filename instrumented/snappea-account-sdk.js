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
__$coverInit("src/snappea-account-sdk.js", "(function (global) {\n    var Deferred = $.Deferred;\n    var ajax = $.ajax;\n\n    var getCookie = function (name) {\n        var arr = global.document.cookie.match(new RegExp(\"(^| )\"+name+\"=([^;]*)(;|$)\"));\n        if (arr) {\n            return unescape(arr[2]);\n        }\n        return undefined;\n    };\n\n    var PREFIX = 'https://account.wandoujia.com';\n\n    var CONFIG = {\n        login : PREFIX + '/v4/api/login'\n    };\n\n    var WDJ_AUTH = getCookie('wdj_auth');\n    var USER_INFO = undefined;\n    var IS_LOGINED = false;\n\n    var Account = function () {\n\n    };\n\n    Account.loginAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (!data.username || !data.password) {\n            setTimeout(function () {\n                deferred.reject({\n                    error : -2,\n                    msg : '参数不全'\n                });\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                url : CONFIG.login,\n                data : {\n                    username : data.username,\n                    password : data.password\n                },\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        IS_LOGINED = true;\n                        USER_INFO = resp.member;\n                        deferred.resolve(resp.member);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise();\n    };\n\n    var SnapPea = global.SnapPea || {};\n    SnapPea.Account = Account;\n    global.SnapPea = SnapPea;\n\n    return Account;\n})(this);\n");
__$coverInitRange("src/snappea-account-sdk.js", "0:1931");
__$coverInitRange("src/snappea-account-sdk.js", "25:50");
__$coverInitRange("src/snappea-account-sdk.js", "56:73");
__$coverInitRange("src/snappea-account-sdk.js", "80:301");
__$coverInitRange("src/snappea-account-sdk.js", "308:352");
__$coverInitRange("src/snappea-account-sdk.js", "359:420");
__$coverInitRange("src/snappea-account-sdk.js", "427:463");
__$coverInitRange("src/snappea-account-sdk.js", "469:494");
__$coverInitRange("src/snappea-account-sdk.js", "500:522");
__$coverInitRange("src/snappea-account-sdk.js", "529:563");
__$coverInitRange("src/snappea-account-sdk.js", "570:1798");
__$coverInitRange("src/snappea-account-sdk.js", "1805:1839");
__$coverInitRange("src/snappea-account-sdk.js", "1845:1870");
__$coverInitRange("src/snappea-account-sdk.js", "1876:1900");
__$coverInitRange("src/snappea-account-sdk.js", "1907:1921");
__$coverInitRange("src/snappea-account-sdk.js", "122:202");
__$coverInitRange("src/snappea-account-sdk.js", "212:268");
__$coverInitRange("src/snappea-account-sdk.js", "278:294");
__$coverInitRange("src/snappea-account-sdk.js", "235:258");
__$coverInitRange("src/snappea-account-sdk.js", "626:655");
__$coverInitRange("src/snappea-account-sdk.js", "666:683");
__$coverInitRange("src/snappea-account-sdk.js", "693:716");
__$coverInitRange("src/snappea-account-sdk.js", "727:1755");
__$coverInitRange("src/snappea-account-sdk.js", "1766:1791");
__$coverInitRange("src/snappea-account-sdk.js", "779:937");
__$coverInitRange("src/snappea-account-sdk.js", "820:921");
__$coverInitRange("src/snappea-account-sdk.js", "968:1745");
__$coverInitRange("src/snappea-account-sdk.js", "1241:1508");
__$coverInitRange("src/snappea-account-sdk.js", "1289:1306");
__$coverInitRange("src/snappea-account-sdk.js", "1332:1355");
__$coverInitRange("src/snappea-account-sdk.js", "1381:1410");
__$coverInitRange("src/snappea-account-sdk.js", "1465:1486");
__$coverInitRange("src/snappea-account-sdk.js", "1587:1711");
__$coverCall('src/snappea-account-sdk.js', '0:1931');
(function (global) {
    __$coverCall('src/snappea-account-sdk.js', '25:50');
    var Deferred = $.Deferred;
    __$coverCall('src/snappea-account-sdk.js', '56:73');
    var ajax = $.ajax;
    __$coverCall('src/snappea-account-sdk.js', '80:301');
    var getCookie = function (name) {
        __$coverCall('src/snappea-account-sdk.js', '122:202');
        var arr = global.document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
        __$coverCall('src/snappea-account-sdk.js', '212:268');
        if (arr) {
            __$coverCall('src/snappea-account-sdk.js', '235:258');
            return unescape(arr[2]);
        }
        __$coverCall('src/snappea-account-sdk.js', '278:294');
        return undefined;
    };
    __$coverCall('src/snappea-account-sdk.js', '308:352');
    var PREFIX = 'https://account.wandoujia.com';
    __$coverCall('src/snappea-account-sdk.js', '359:420');
    var CONFIG = { login: PREFIX + '/v4/api/login' };
    __$coverCall('src/snappea-account-sdk.js', '427:463');
    var WDJ_AUTH = getCookie('wdj_auth');
    __$coverCall('src/snappea-account-sdk.js', '469:494');
    var USER_INFO = undefined;
    __$coverCall('src/snappea-account-sdk.js', '500:522');
    var IS_LOGINED = false;
    __$coverCall('src/snappea-account-sdk.js', '529:563');
    var Account = function () {
    };
    __$coverCall('src/snappea-account-sdk.js', '570:1798');
    Account.loginAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '626:655');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '666:683');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '693:716');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '727:1755');
        if (!data.username || !data.password) {
            __$coverCall('src/snappea-account-sdk.js', '779:937');
            setTimeout(function () {
                __$coverCall('src/snappea-account-sdk.js', '820:921');
                deferred.reject({
                    error: -2,
                    msg: '\u53c2\u6570\u4e0d\u5168'
                });
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '968:1745');
            ajax({
                type: 'POST',
                url: CONFIG.login,
                data: {
                    username: data.username,
                    password: data.password
                },
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '1241:1508');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '1289:1306');
                        IS_LOGINED = true;
                        __$coverCall('src/snappea-account-sdk.js', '1332:1355');
                        USER_INFO = resp.member;
                        __$coverCall('src/snappea-account-sdk.js', '1381:1410');
                        deferred.resolve(resp.member);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '1465:1486');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '1587:1711');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '1766:1791');
        return deferred.promise();
    };
    __$coverCall('src/snappea-account-sdk.js', '1805:1839');
    var SnapPea = global.SnapPea || {};
    __$coverCall('src/snappea-account-sdk.js', '1845:1870');
    SnapPea.Account = Account;
    __$coverCall('src/snappea-account-sdk.js', '1876:1900');
    global.SnapPea = SnapPea;
    __$coverCall('src/snappea-account-sdk.js', '1907:1921');
    return Account;
}(this));
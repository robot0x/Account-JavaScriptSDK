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
__$coverInit("src/snappea-account-sdk.js", "/*global $*/\n(function (global) {\n    var Deferred = $.Deferred;\n    var ajax = $.ajax;\n\n    $.ajaxSetup({\n        xhrFields : {\n            withCredentials : true\n        }\n    });\n\n    var PREFIX = 'https://account.wandoujia.com/v4/api';\n\n    var CONFIG = {\n        login : PREFIX + '/login',\n        logout : PREFIX + '/logout',\n        captcha : PREFIX + '/seccode',\n        reg :　PREFIX + '/register',\n        checkUsername : PREFIX + '/isUsernameExisted'\n    };\n\n    var USER_INFO;\n    var IS_LOGINED = false;\n\n    var Account = {};\n\n    Account.CAPTCHA = CONFIG.captcha;\n\n    Account.loginAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (!data.username || !data.password) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                url : CONFIG.login,\n                data : {\n                    username : data.username,\n                    password : data.password,\n                    seccode : data.seccode || ''\n                },\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        IS_LOGINED = true;\n                        USER_INFO = resp.member;\n                        deferred.resolve(resp.member);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise();\n    };\n\n    Account.isLogined = function () {\n        return IS_LOGINED;\n    };\n\n    Account.getUserInfo = function () {\n        return USER_INFO;\n    };\n\n    Account.logoutAsync = function () {\n        var deferred = new Deferred();\n\n        ajax({\n            type : 'POST',\n            url : CONFIG.logout,\n            success : function (resp) {\n                if (resp.error === 0) {\n                    IS_LOGINED = false;\n                    USER_INFO = undefined;\n                    deferred.resolve(resp);\n                } else {\n                    deferred.reject(resp);\n                }\n            },\n            error : function () {\n                deferred.reject({\n                    error : -1,\n                    msg : '请求失败，请检查网络连接状况。'\n                });\n            }\n        });\n\n        return deferred.promise();\n    };\n\n    Account.regAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (!data.username || !data.password) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                url : CONFIG.reg,\n                data : {\n                    username : data.username,\n                    password : data.password,\n                    nikename : data.nikename || '',\n                    seccode : data.seccode || ''\n                },\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        IS_LOGINED = true;\n                        USER_INFO = resp.member;\n                        deferred.resolve(resp);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise();\n    };\n\n    Account.checkUsernameAsync = function (username, options) {\n        var deferred = new Deferred();\n\n        if (username === undefined) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                url : CONFIG.checkUsername,\n                data : {\n                    username : username\n                },\n                success : function (resp) {\n                    deferred.resolve(resp);\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise();\n    };\n\n    Account.isEmail = function (input) {\n        var EMAIL_PATTREN = /^[A-Za-z0-9](([_\\.\\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\\.\\-]?[a-zA-Z0-9]+)*)\\.([A-Za-z]{2,})$/;\n        return EMAIL_PATTREN.test(input);\n    };\n\n    Account.isPhoneNumer = function (input) {\n        var PHONE_PATTERN = /(^[0-9]{3,4}\\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\\([0-9]{3,4}\\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(13\\d{9}$)|(15[0135-9]\\d{8}$)|(18[267]\\d{8}$)/;\n        return PHONE_PATTERN.test(input);\n    };\n\n    var SnapPea = global.SnapPea || {};\n    SnapPea.Account = Account;\n    global.SnapPea = SnapPea;\n\n    return Account;\n}(this));\n");
__$coverInitRange("src/snappea-account-sdk.js", "13:5325");
__$coverInitRange("src/snappea-account-sdk.js", "38:63");
__$coverInitRange("src/snappea-account-sdk.js", "69:86");
__$coverInitRange("src/snappea-account-sdk.js", "93:180");
__$coverInitRange("src/snappea-account-sdk.js", "187:238");
__$coverInitRange("src/snappea-account-sdk.js", "245:466");
__$coverInitRange("src/snappea-account-sdk.js", "473:486");
__$coverInitRange("src/snappea-account-sdk.js", "492:514");
__$coverInitRange("src/snappea-account-sdk.js", "521:537");
__$coverInitRange("src/snappea-account-sdk.js", "544:576");
__$coverInitRange("src/snappea-account-sdk.js", "583:1791");
__$coverInitRange("src/snappea-account-sdk.js", "1798:1864");
__$coverInitRange("src/snappea-account-sdk.js", "1871:1938");
__$coverInitRange("src/snappea-account-sdk.js", "1945:2635");
__$coverInitRange("src/snappea-account-sdk.js", "2642:3892");
__$coverInitRange("src/snappea-account-sdk.js", "3899:4711");
__$coverInitRange("src/snappea-account-sdk.js", "4718:4927");
__$coverInitRange("src/snappea-account-sdk.js", "4934:5192");
__$coverInitRange("src/snappea-account-sdk.js", "5199:5233");
__$coverInitRange("src/snappea-account-sdk.js", "5239:5264");
__$coverInitRange("src/snappea-account-sdk.js", "5270:5294");
__$coverInitRange("src/snappea-account-sdk.js", "5301:5315");
__$coverInitRange("src/snappea-account-sdk.js", "639:668");
__$coverInitRange("src/snappea-account-sdk.js", "679:696");
__$coverInitRange("src/snappea-account-sdk.js", "706:729");
__$coverInitRange("src/snappea-account-sdk.js", "740:1748");
__$coverInitRange("src/snappea-account-sdk.js", "1759:1784");
__$coverInitRange("src/snappea-account-sdk.js", "792:881");
__$coverInitRange("src/snappea-account-sdk.js", "912:1738");
__$coverInitRange("src/snappea-account-sdk.js", "1235:1502");
__$coverInitRange("src/snappea-account-sdk.js", "1283:1300");
__$coverInitRange("src/snappea-account-sdk.js", "1326:1349");
__$coverInitRange("src/snappea-account-sdk.js", "1375:1404");
__$coverInitRange("src/snappea-account-sdk.js", "1459:1480");
__$coverInitRange("src/snappea-account-sdk.js", "1581:1704");
__$coverInitRange("src/snappea-account-sdk.js", "1840:1857");
__$coverInitRange("src/snappea-account-sdk.js", "1915:1931");
__$coverInitRange("src/snappea-account-sdk.js", "1989:2018");
__$coverInitRange("src/snappea-account-sdk.js", "2029:2592");
__$coverInitRange("src/snappea-account-sdk.js", "2603:2628");
__$coverInitRange("src/snappea-account-sdk.js", "2152:2387");
__$coverInitRange("src/snappea-account-sdk.js", "2196:2214");
__$coverInitRange("src/snappea-account-sdk.js", "2236:2257");
__$coverInitRange("src/snappea-account-sdk.js", "2279:2301");
__$coverInitRange("src/snappea-account-sdk.js", "2348:2369");
__$coverInitRange("src/snappea-account-sdk.js", "2454:2566");
__$coverInitRange("src/snappea-account-sdk.js", "2696:2725");
__$coverInitRange("src/snappea-account-sdk.js", "2736:2753");
__$coverInitRange("src/snappea-account-sdk.js", "2763:2786");
__$coverInitRange("src/snappea-account-sdk.js", "2797:3849");
__$coverInitRange("src/snappea-account-sdk.js", "3860:3885");
__$coverInitRange("src/snappea-account-sdk.js", "2849:2938");
__$coverInitRange("src/snappea-account-sdk.js", "2969:3839");
__$coverInitRange("src/snappea-account-sdk.js", "3342:3602");
__$coverInitRange("src/snappea-account-sdk.js", "3390:3407");
__$coverInitRange("src/snappea-account-sdk.js", "3433:3456");
__$coverInitRange("src/snappea-account-sdk.js", "3482:3504");
__$coverInitRange("src/snappea-account-sdk.js", "3559:3580");
__$coverInitRange("src/snappea-account-sdk.js", "3681:3805");
__$coverInitRange("src/snappea-account-sdk.js", "3967:3996");
__$coverInitRange("src/snappea-account-sdk.js", "4007:4668");
__$coverInitRange("src/snappea-account-sdk.js", "4679:4704");
__$coverInitRange("src/snappea-account-sdk.js", "4049:4138");
__$coverInitRange("src/snappea-account-sdk.js", "4169:4658");
__$coverInitRange("src/snappea-account-sdk.js", "4399:4421");
__$coverInitRange("src/snappea-account-sdk.js", "4500:4624");
__$coverInitRange("src/snappea-account-sdk.js", "4763:4878");
__$coverInitRange("src/snappea-account-sdk.js", "4888:4920");
__$coverInitRange("src/snappea-account-sdk.js", "4984:5143");
__$coverInitRange("src/snappea-account-sdk.js", "5153:5185");
__$coverCall('src/snappea-account-sdk.js', '13:5325');
(function (global) {
    __$coverCall('src/snappea-account-sdk.js', '38:63');
    var Deferred = $.Deferred;
    __$coverCall('src/snappea-account-sdk.js', '69:86');
    var ajax = $.ajax;
    __$coverCall('src/snappea-account-sdk.js', '93:180');
    $.ajaxSetup({ xhrFields: { withCredentials: true } });
    __$coverCall('src/snappea-account-sdk.js', '187:238');
    var PREFIX = 'https://account.wandoujia.com/v4/api';
    __$coverCall('src/snappea-account-sdk.js', '245:466');
    var CONFIG = {
            login: PREFIX + '/login',
            logout: PREFIX + '/logout',
            captcha: PREFIX + '/seccode',
            reg: PREFIX + '/register',
            checkUsername: PREFIX + '/isUsernameExisted'
        };
    __$coverCall('src/snappea-account-sdk.js', '473:486');
    var USER_INFO;
    __$coverCall('src/snappea-account-sdk.js', '492:514');
    var IS_LOGINED = false;
    __$coverCall('src/snappea-account-sdk.js', '521:537');
    var Account = {};
    __$coverCall('src/snappea-account-sdk.js', '544:576');
    Account.CAPTCHA = CONFIG.captcha;
    __$coverCall('src/snappea-account-sdk.js', '583:1791');
    Account.loginAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '639:668');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '679:696');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '706:729');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '740:1748');
        if (!data.username || !data.password) {
            __$coverCall('src/snappea-account-sdk.js', '792:881');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '912:1738');
            ajax({
                type: 'POST',
                url: CONFIG.login,
                data: {
                    username: data.username,
                    password: data.password,
                    seccode: data.seccode || ''
                },
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '1235:1502');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '1283:1300');
                        IS_LOGINED = true;
                        __$coverCall('src/snappea-account-sdk.js', '1326:1349');
                        USER_INFO = resp.member;
                        __$coverCall('src/snappea-account-sdk.js', '1375:1404');
                        deferred.resolve(resp.member);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '1459:1480');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '1581:1704');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '1759:1784');
        return deferred.promise();
    };
    __$coverCall('src/snappea-account-sdk.js', '1798:1864');
    Account.isLogined = function () {
        __$coverCall('src/snappea-account-sdk.js', '1840:1857');
        return IS_LOGINED;
    };
    __$coverCall('src/snappea-account-sdk.js', '1871:1938');
    Account.getUserInfo = function () {
        __$coverCall('src/snappea-account-sdk.js', '1915:1931');
        return USER_INFO;
    };
    __$coverCall('src/snappea-account-sdk.js', '1945:2635');
    Account.logoutAsync = function () {
        __$coverCall('src/snappea-account-sdk.js', '1989:2018');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '2029:2592');
        ajax({
            type: 'POST',
            url: CONFIG.logout,
            success: function (resp) {
                __$coverCall('src/snappea-account-sdk.js', '2152:2387');
                if (resp.error === 0) {
                    __$coverCall('src/snappea-account-sdk.js', '2196:2214');
                    IS_LOGINED = false;
                    __$coverCall('src/snappea-account-sdk.js', '2236:2257');
                    USER_INFO = undefined;
                    __$coverCall('src/snappea-account-sdk.js', '2279:2301');
                    deferred.resolve(resp);
                } else {
                    __$coverCall('src/snappea-account-sdk.js', '2348:2369');
                    deferred.reject(resp);
                }
            },
            error: function () {
                __$coverCall('src/snappea-account-sdk.js', '2454:2566');
                deferred.reject({
                    error: -1,
                    msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                });
            }
        });
        __$coverCall('src/snappea-account-sdk.js', '2603:2628');
        return deferred.promise();
    };
    __$coverCall('src/snappea-account-sdk.js', '2642:3892');
    Account.regAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '2696:2725');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '2736:2753');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '2763:2786');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '2797:3849');
        if (!data.username || !data.password) {
            __$coverCall('src/snappea-account-sdk.js', '2849:2938');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '2969:3839');
            ajax({
                type: 'POST',
                url: CONFIG.reg,
                data: {
                    username: data.username,
                    password: data.password,
                    nikename: data.nikename || '',
                    seccode: data.seccode || ''
                },
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '3342:3602');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '3390:3407');
                        IS_LOGINED = true;
                        __$coverCall('src/snappea-account-sdk.js', '3433:3456');
                        USER_INFO = resp.member;
                        __$coverCall('src/snappea-account-sdk.js', '3482:3504');
                        deferred.resolve(resp);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '3559:3580');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '3681:3805');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '3860:3885');
        return deferred.promise();
    };
    __$coverCall('src/snappea-account-sdk.js', '3899:4711');
    Account.checkUsernameAsync = function (username, options) {
        __$coverCall('src/snappea-account-sdk.js', '3967:3996');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '4007:4668');
        if (username === undefined) {
            __$coverCall('src/snappea-account-sdk.js', '4049:4138');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '4169:4658');
            ajax({
                type: 'POST',
                url: CONFIG.checkUsername,
                data: { username: username },
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '4399:4421');
                    deferred.resolve(resp);
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '4500:4624');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '4679:4704');
        return deferred.promise();
    };
    __$coverCall('src/snappea-account-sdk.js', '4718:4927');
    Account.isEmail = function (input) {
        __$coverCall('src/snappea-account-sdk.js', '4763:4878');
        var EMAIL_PATTREN = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/;
        __$coverCall('src/snappea-account-sdk.js', '4888:4920');
        return EMAIL_PATTREN.test(input);
    };
    __$coverCall('src/snappea-account-sdk.js', '4934:5192');
    Account.isPhoneNumer = function (input) {
        __$coverCall('src/snappea-account-sdk.js', '4984:5143');
        var PHONE_PATTERN = /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(13\d{9}$)|(15[0135-9]\d{8}$)|(18[267]\d{8}$)/;
        __$coverCall('src/snappea-account-sdk.js', '5153:5185');
        return PHONE_PATTERN.test(input);
    };
    __$coverCall('src/snappea-account-sdk.js', '5199:5233');
    var SnapPea = global.SnapPea || {};
    __$coverCall('src/snappea-account-sdk.js', '5239:5264');
    SnapPea.Account = Account;
    __$coverCall('src/snappea-account-sdk.js', '5270:5294');
    global.SnapPea = SnapPea;
    __$coverCall('src/snappea-account-sdk.js', '5301:5315');
    return Account;
}(this));
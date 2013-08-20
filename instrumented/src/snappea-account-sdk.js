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
__$coverInit("src/snappea-account-sdk.js", "/*global $*/\n(function (global) {\n    var Deferred = $.Deferred;\n    var ajax = $.ajax;\n\n    $.ajaxSetup({\n        xhrFields : {\n            withCredentials : true\n        }\n    });\n\n    var PREFIX = 'https://account.wandoujia.com/v4/api';\n\n    var CONFIG = {\n        login : PREFIX + '/login',\n        logout : PREFIX + '/logout',\n        captcha : PREFIX + '/seccode',\n        reg : PREFIX + '/register',\n        checkUsername : PREFIX + '/isUsernameExisted',\n        checkUserLogin : PREFIX + '/profile'\n    };\n\n    var USER_INFO;\n    var IS_LOGINED = false;\n\n    var Account = {};\n\n    Account.CAPTCHA = CONFIG.captcha;\n\n    Account.loginAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (!data.username || !data.password) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                url : CONFIG.login,\n                data : {\n                    username : data.username,\n                    password : data.password,\n                    seccode : data.seccode || ''\n                },\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        IS_LOGINED = true;\n                        USER_INFO = resp.member;\n                        deferred.resolve(resp.member);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise();\n    };\n\n    Account.isLogined = function () {\n        return IS_LOGINED;\n    };\n\n    Account.getUserInfo = function () {\n        return USER_INFO;\n    };\n\n    Account.logoutAsync = function () {\n        var deferred = new Deferred();\n\n        ajax({\n            type : 'POST',\n            url : CONFIG.logout,\n            success : function (resp) {\n                if (resp.error === 0) {\n                    IS_LOGINED = false;\n                    USER_INFO = undefined;\n                    deferred.resolve(resp);\n                } else {\n                    deferred.reject(resp);\n                }\n            },\n            error : function () {\n                deferred.reject({\n                    error : -1,\n                    msg : '请求失败，请检查网络连接状况。'\n                });\n            }\n        });\n\n        return deferred.promise();\n    };\n\n    Account.regAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (!data.username || !data.password) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                url : CONFIG.reg,\n                data : {\n                    username : data.username,\n                    password : data.password,\n                    nikename : data.nikename || '',\n                    seccode : data.seccode || ''\n                },\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        IS_LOGINED = true;\n                        USER_INFO = resp.member;\n                        deferred.resolve(resp);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise();\n    };\n\n    Account.checkUsernameAsync = function (username, options) {\n        var deferred = new Deferred();\n\n        if (username === undefined) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                url : CONFIG.checkUsername,\n                data : {\n                    username : username\n                },\n                success : function (resp) {\n                    deferred.resolve(resp);\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise();\n    };\n\n    Account.checkUserLoginAsync = function (options) {\n        var deferred = new Deferred();\n\n        options = options || {};\n\n        ajax({\n            type : 'GET',\n            url : CONFIG.checkUserLogin,\n            success : function (resp) {\n                if (resp.error === 0) {\n                    IS_LOGINED = true;\n                    USER_INFO = resp.member;\n                    deferred.reject(true);\n                } else {\n                    IS_LOGINED = false;\n                    USER_INFO = undefined;\n                    deferred.reject(false);\n                }\n            },\n            error : function () {\n                deferred.reject(false);\n            }\n        });\n\n        return deferred.promise();\n    };\n\n    Account.isEmail = function (input) {\n        var EMAIL_PATTREN = /^[A-Za-z0-9](([_\\.\\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\\.\\-]?[a-zA-Z0-9]+)*)\\.([A-Za-z]{2,})$/;\n        return EMAIL_PATTREN.test(input);\n    };\n\n    Account.isPhoneNumber = function (input) {\n        var PHONE_PATTERN = /(^[0-9]{3,4}\\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\\([0-9]{3,4}\\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(13\\d{9}$)|(15[0135-9]\\d{8}$)|(18[267]\\d{8}$)/;\n        return PHONE_PATTERN.test(input);\n    };\n\n    var SnapPea = global.SnapPea || {};\n    SnapPea.Account = Account;\n    global.SnapPea = SnapPea;\n\n    return Account;\n}(this));\n");
__$coverInitRange("src/snappea-account-sdk.js", "13:6119");
__$coverInitRange("src/snappea-account-sdk.js", "38:63");
__$coverInitRange("src/snappea-account-sdk.js", "69:86");
__$coverInitRange("src/snappea-account-sdk.js", "93:180");
__$coverInitRange("src/snappea-account-sdk.js", "187:238");
__$coverInitRange("src/snappea-account-sdk.js", "245:512");
__$coverInitRange("src/snappea-account-sdk.js", "519:532");
__$coverInitRange("src/snappea-account-sdk.js", "538:560");
__$coverInitRange("src/snappea-account-sdk.js", "567:583");
__$coverInitRange("src/snappea-account-sdk.js", "590:622");
__$coverInitRange("src/snappea-account-sdk.js", "629:1837");
__$coverInitRange("src/snappea-account-sdk.js", "1844:1910");
__$coverInitRange("src/snappea-account-sdk.js", "1917:1984");
__$coverInitRange("src/snappea-account-sdk.js", "1991:2681");
__$coverInitRange("src/snappea-account-sdk.js", "2688:3938");
__$coverInitRange("src/snappea-account-sdk.js", "3945:4757");
__$coverInitRange("src/snappea-account-sdk.js", "4764:5504");
__$coverInitRange("src/snappea-account-sdk.js", "5511:5720");
__$coverInitRange("src/snappea-account-sdk.js", "5727:5986");
__$coverInitRange("src/snappea-account-sdk.js", "5993:6027");
__$coverInitRange("src/snappea-account-sdk.js", "6033:6058");
__$coverInitRange("src/snappea-account-sdk.js", "6064:6088");
__$coverInitRange("src/snappea-account-sdk.js", "6095:6109");
__$coverInitRange("src/snappea-account-sdk.js", "685:714");
__$coverInitRange("src/snappea-account-sdk.js", "725:742");
__$coverInitRange("src/snappea-account-sdk.js", "752:775");
__$coverInitRange("src/snappea-account-sdk.js", "786:1794");
__$coverInitRange("src/snappea-account-sdk.js", "1805:1830");
__$coverInitRange("src/snappea-account-sdk.js", "838:927");
__$coverInitRange("src/snappea-account-sdk.js", "958:1784");
__$coverInitRange("src/snappea-account-sdk.js", "1281:1548");
__$coverInitRange("src/snappea-account-sdk.js", "1329:1346");
__$coverInitRange("src/snappea-account-sdk.js", "1372:1395");
__$coverInitRange("src/snappea-account-sdk.js", "1421:1450");
__$coverInitRange("src/snappea-account-sdk.js", "1505:1526");
__$coverInitRange("src/snappea-account-sdk.js", "1627:1750");
__$coverInitRange("src/snappea-account-sdk.js", "1886:1903");
__$coverInitRange("src/snappea-account-sdk.js", "1961:1977");
__$coverInitRange("src/snappea-account-sdk.js", "2035:2064");
__$coverInitRange("src/snappea-account-sdk.js", "2075:2638");
__$coverInitRange("src/snappea-account-sdk.js", "2649:2674");
__$coverInitRange("src/snappea-account-sdk.js", "2198:2433");
__$coverInitRange("src/snappea-account-sdk.js", "2242:2260");
__$coverInitRange("src/snappea-account-sdk.js", "2282:2303");
__$coverInitRange("src/snappea-account-sdk.js", "2325:2347");
__$coverInitRange("src/snappea-account-sdk.js", "2394:2415");
__$coverInitRange("src/snappea-account-sdk.js", "2500:2612");
__$coverInitRange("src/snappea-account-sdk.js", "2742:2771");
__$coverInitRange("src/snappea-account-sdk.js", "2782:2799");
__$coverInitRange("src/snappea-account-sdk.js", "2809:2832");
__$coverInitRange("src/snappea-account-sdk.js", "2843:3895");
__$coverInitRange("src/snappea-account-sdk.js", "3906:3931");
__$coverInitRange("src/snappea-account-sdk.js", "2895:2984");
__$coverInitRange("src/snappea-account-sdk.js", "3015:3885");
__$coverInitRange("src/snappea-account-sdk.js", "3388:3648");
__$coverInitRange("src/snappea-account-sdk.js", "3436:3453");
__$coverInitRange("src/snappea-account-sdk.js", "3479:3502");
__$coverInitRange("src/snappea-account-sdk.js", "3528:3550");
__$coverInitRange("src/snappea-account-sdk.js", "3605:3626");
__$coverInitRange("src/snappea-account-sdk.js", "3727:3851");
__$coverInitRange("src/snappea-account-sdk.js", "4013:4042");
__$coverInitRange("src/snappea-account-sdk.js", "4053:4714");
__$coverInitRange("src/snappea-account-sdk.js", "4725:4750");
__$coverInitRange("src/snappea-account-sdk.js", "4095:4184");
__$coverInitRange("src/snappea-account-sdk.js", "4215:4704");
__$coverInitRange("src/snappea-account-sdk.js", "4445:4467");
__$coverInitRange("src/snappea-account-sdk.js", "4546:4670");
__$coverInitRange("src/snappea-account-sdk.js", "4823:4852");
__$coverInitRange("src/snappea-account-sdk.js", "4863:4886");
__$coverInitRange("src/snappea-account-sdk.js", "4897:5461");
__$coverInitRange("src/snappea-account-sdk.js", "5472:5497");
__$coverInitRange("src/snappea-account-sdk.js", "5027:5346");
__$coverInitRange("src/snappea-account-sdk.js", "5071:5088");
__$coverInitRange("src/snappea-account-sdk.js", "5110:5133");
__$coverInitRange("src/snappea-account-sdk.js", "5155:5176");
__$coverInitRange("src/snappea-account-sdk.js", "5223:5241");
__$coverInitRange("src/snappea-account-sdk.js", "5263:5284");
__$coverInitRange("src/snappea-account-sdk.js", "5306:5328");
__$coverInitRange("src/snappea-account-sdk.js", "5413:5435");
__$coverInitRange("src/snappea-account-sdk.js", "5556:5671");
__$coverInitRange("src/snappea-account-sdk.js", "5681:5713");
__$coverInitRange("src/snappea-account-sdk.js", "5778:5937");
__$coverInitRange("src/snappea-account-sdk.js", "5947:5979");
__$coverCall('src/snappea-account-sdk.js', '13:6119');
(function (global) {
    __$coverCall('src/snappea-account-sdk.js', '38:63');
    var Deferred = $.Deferred;
    __$coverCall('src/snappea-account-sdk.js', '69:86');
    var ajax = $.ajax;
    __$coverCall('src/snappea-account-sdk.js', '93:180');
    $.ajaxSetup({ xhrFields: { withCredentials: true } });
    __$coverCall('src/snappea-account-sdk.js', '187:238');
    var PREFIX = 'https://account.wandoujia.com/v4/api';
    __$coverCall('src/snappea-account-sdk.js', '245:512');
    var CONFIG = {
            login: PREFIX + '/login',
            logout: PREFIX + '/logout',
            captcha: PREFIX + '/seccode',
            reg: PREFIX + '/register',
            checkUsername: PREFIX + '/isUsernameExisted',
            checkUserLogin: PREFIX + '/profile'
        };
    __$coverCall('src/snappea-account-sdk.js', '519:532');
    var USER_INFO;
    __$coverCall('src/snappea-account-sdk.js', '538:560');
    var IS_LOGINED = false;
    __$coverCall('src/snappea-account-sdk.js', '567:583');
    var Account = {};
    __$coverCall('src/snappea-account-sdk.js', '590:622');
    Account.CAPTCHA = CONFIG.captcha;
    __$coverCall('src/snappea-account-sdk.js', '629:1837');
    Account.loginAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '685:714');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '725:742');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '752:775');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '786:1794');
        if (!data.username || !data.password) {
            __$coverCall('src/snappea-account-sdk.js', '838:927');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '958:1784');
            ajax({
                type: 'POST',
                url: CONFIG.login,
                data: {
                    username: data.username,
                    password: data.password,
                    seccode: data.seccode || ''
                },
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '1281:1548');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '1329:1346');
                        IS_LOGINED = true;
                        __$coverCall('src/snappea-account-sdk.js', '1372:1395');
                        USER_INFO = resp.member;
                        __$coverCall('src/snappea-account-sdk.js', '1421:1450');
                        deferred.resolve(resp.member);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '1505:1526');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '1627:1750');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '1805:1830');
        return deferred.promise();
    };
    __$coverCall('src/snappea-account-sdk.js', '1844:1910');
    Account.isLogined = function () {
        __$coverCall('src/snappea-account-sdk.js', '1886:1903');
        return IS_LOGINED;
    };
    __$coverCall('src/snappea-account-sdk.js', '1917:1984');
    Account.getUserInfo = function () {
        __$coverCall('src/snappea-account-sdk.js', '1961:1977');
        return USER_INFO;
    };
    __$coverCall('src/snappea-account-sdk.js', '1991:2681');
    Account.logoutAsync = function () {
        __$coverCall('src/snappea-account-sdk.js', '2035:2064');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '2075:2638');
        ajax({
            type: 'POST',
            url: CONFIG.logout,
            success: function (resp) {
                __$coverCall('src/snappea-account-sdk.js', '2198:2433');
                if (resp.error === 0) {
                    __$coverCall('src/snappea-account-sdk.js', '2242:2260');
                    IS_LOGINED = false;
                    __$coverCall('src/snappea-account-sdk.js', '2282:2303');
                    USER_INFO = undefined;
                    __$coverCall('src/snappea-account-sdk.js', '2325:2347');
                    deferred.resolve(resp);
                } else {
                    __$coverCall('src/snappea-account-sdk.js', '2394:2415');
                    deferred.reject(resp);
                }
            },
            error: function () {
                __$coverCall('src/snappea-account-sdk.js', '2500:2612');
                deferred.reject({
                    error: -1,
                    msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                });
            }
        });
        __$coverCall('src/snappea-account-sdk.js', '2649:2674');
        return deferred.promise();
    };
    __$coverCall('src/snappea-account-sdk.js', '2688:3938');
    Account.regAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '2742:2771');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '2782:2799');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '2809:2832');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '2843:3895');
        if (!data.username || !data.password) {
            __$coverCall('src/snappea-account-sdk.js', '2895:2984');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '3015:3885');
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
                    __$coverCall('src/snappea-account-sdk.js', '3388:3648');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '3436:3453');
                        IS_LOGINED = true;
                        __$coverCall('src/snappea-account-sdk.js', '3479:3502');
                        USER_INFO = resp.member;
                        __$coverCall('src/snappea-account-sdk.js', '3528:3550');
                        deferred.resolve(resp);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '3605:3626');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '3727:3851');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '3906:3931');
        return deferred.promise();
    };
    __$coverCall('src/snappea-account-sdk.js', '3945:4757');
    Account.checkUsernameAsync = function (username, options) {
        __$coverCall('src/snappea-account-sdk.js', '4013:4042');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '4053:4714');
        if (username === undefined) {
            __$coverCall('src/snappea-account-sdk.js', '4095:4184');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '4215:4704');
            ajax({
                type: 'POST',
                url: CONFIG.checkUsername,
                data: { username: username },
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '4445:4467');
                    deferred.resolve(resp);
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '4546:4670');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '4725:4750');
        return deferred.promise();
    };
    __$coverCall('src/snappea-account-sdk.js', '4764:5504');
    Account.checkUserLoginAsync = function (options) {
        __$coverCall('src/snappea-account-sdk.js', '4823:4852');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '4863:4886');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '4897:5461');
        ajax({
            type: 'GET',
            url: CONFIG.checkUserLogin,
            success: function (resp) {
                __$coverCall('src/snappea-account-sdk.js', '5027:5346');
                if (resp.error === 0) {
                    __$coverCall('src/snappea-account-sdk.js', '5071:5088');
                    IS_LOGINED = true;
                    __$coverCall('src/snappea-account-sdk.js', '5110:5133');
                    USER_INFO = resp.member;
                    __$coverCall('src/snappea-account-sdk.js', '5155:5176');
                    deferred.reject(true);
                } else {
                    __$coverCall('src/snappea-account-sdk.js', '5223:5241');
                    IS_LOGINED = false;
                    __$coverCall('src/snappea-account-sdk.js', '5263:5284');
                    USER_INFO = undefined;
                    __$coverCall('src/snappea-account-sdk.js', '5306:5328');
                    deferred.reject(false);
                }
            },
            error: function () {
                __$coverCall('src/snappea-account-sdk.js', '5413:5435');
                deferred.reject(false);
            }
        });
        __$coverCall('src/snappea-account-sdk.js', '5472:5497');
        return deferred.promise();
    };
    __$coverCall('src/snappea-account-sdk.js', '5511:5720');
    Account.isEmail = function (input) {
        __$coverCall('src/snappea-account-sdk.js', '5556:5671');
        var EMAIL_PATTREN = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/;
        __$coverCall('src/snappea-account-sdk.js', '5681:5713');
        return EMAIL_PATTREN.test(input);
    };
    __$coverCall('src/snappea-account-sdk.js', '5727:5986');
    Account.isPhoneNumber = function (input) {
        __$coverCall('src/snappea-account-sdk.js', '5778:5937');
        var PHONE_PATTERN = /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(13\d{9}$)|(15[0135-9]\d{8}$)|(18[267]\d{8}$)/;
        __$coverCall('src/snappea-account-sdk.js', '5947:5979');
        return PHONE_PATTERN.test(input);
    };
    __$coverCall('src/snappea-account-sdk.js', '5993:6027');
    var SnapPea = global.SnapPea || {};
    __$coverCall('src/snappea-account-sdk.js', '6033:6058');
    SnapPea.Account = Account;
    __$coverCall('src/snappea-account-sdk.js', '6064:6088');
    global.SnapPea = SnapPea;
    __$coverCall('src/snappea-account-sdk.js', '6095:6109');
    return Account;
}(this));
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
__$coverInit("src/snappea-account-sdk.js", "/*global $, Q*/\n(function (global) {\n    //@@ lib/q/q.js\n    var Deferred = Q.defer;\n    var ajax = $.ajax;\n\n    if ($.ajaxSetup) {\n        $.ajaxSetup({\n            xhrFields : {\n                withCredentials : true\n            }\n        });\n    } else {\n        // $.ajaxSettings;\n    }\n\n\n    var HOST = 'https://account.wandoujia.com';\n    var API_VERSION_4 = '/v4/api';\n    var API_VERSION_1 = '/v1';\n\n    var PREFIX = HOST + API_VERSION_4;\n\n    var CONFIG = {\n        login : PREFIX + '/login',\n        logout : PREFIX + '/logout',\n        captcha : PREFIX + '/seccode',\n        reg : PREFIX + '/register',\n        checkUsername : PREFIX + '/isUsernameExisted',\n        checkUserLogin : PREFIX + '/profile',\n        findPwd : PREFIX + '/findpassword',\n        resetPwd : PREFIX + '/resetpassword'\n    };\n\n    var CONFIG_V1 = {\n        loginWithThirdParty : HOST + API_VERSION_1 + '/user/?do=login'\n    };\n\n    var USER_INFO;\n    var IS_LOGINED = false;\n\n    var Account = {};\n\n    Account.CAPTCHA = CONFIG.captcha;\n\n    Account.loginAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (!data.username || !data.password) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.login,\n                data : {\n                    username : data.username,\n                    password : data.password,\n                    seccode : data.seccode || ''\n                },\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        IS_LOGINED = true;\n                        USER_INFO = resp.member;\n                        deferred.resolve(resp.member);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.isLogined = function () {\n        return IS_LOGINED;\n    };\n\n    Account.getUserInfo = function () {\n        return USER_INFO;\n    };\n\n    Account.logoutAsync = function () {\n        var deferred = new Deferred();\n\n        ajax({\n            type : 'POST',\n            dataType : 'json',\n            url : CONFIG.logout,\n            success : function (resp) {\n                if (resp.error === 0) {\n                    IS_LOGINED = false;\n                    USER_INFO = undefined;\n                    deferred.resolve(resp);\n                } else {\n                    deferred.reject(resp);\n                }\n            },\n            error : function () {\n                deferred.reject({\n                    error : -1,\n                    msg : '请求失败，请检查网络连接状况。'\n                });\n            }\n        });\n\n        return deferred.promise;\n    };\n\n    Account.regAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (!data.username || !data.password) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.reg,\n                data : {\n                    username : data.username,\n                    password : data.password,\n                    nikename : data.nikename || '',\n                    seccode : data.seccode || ''\n                },\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        IS_LOGINED = true;\n                        USER_INFO = resp.member;\n                        deferred.resolve(resp);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.checkUsernameAsync = function (username, options) {\n        var deferred = new Deferred();\n\n        if (username === undefined) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.checkUsername,\n                data : {\n                    username : username\n                },\n                success : function (resp) {\n                    deferred.resolve(resp);\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.checkUserLoginAsync = function (options) {\n        var deferred = new Deferred();\n\n        options = options || {};\n\n        ajax({\n            type : 'GET',\n            dataType : 'json',\n            url : CONFIG.checkUserLogin,\n            success : function (resp) {\n                if (resp.error === 0) {\n                    IS_LOGINED = true;\n                    USER_INFO = resp.member;\n                    deferred.resolve(true);\n                } else {\n                    IS_LOGINED = false;\n                    USER_INFO = undefined;\n                    deferred.reject(false);\n                }\n            },\n            error : function () {\n                deferred.reject(false);\n            }\n        });\n\n        return deferred.promise;\n    };\n\n    Account.findPwdAsync = function (username, options) {\n        var deferred = new Deferred();\n\n        if (username === undefined) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.findPwd,\n                data : {\n                    username : username\n                },\n                success : function (resp) {\n                    deferred.resolve(resp);\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.resetPwdAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (data.username === undefined ||\n                data.passcode === undefined ||\n                data.password === undefined) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.resetPwd,\n                data : {\n                    username : data.username,\n                    passcode : data.passcode,\n                    password : data.password,\n                    repeatedpassword : data.password\n                },\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        deferred.resolve(resp);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.isEmail = function (input) {\n        var EMAIL_PATTREN = /^[A-Za-z0-9](([_\\.\\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\\.\\-]?[a-zA-Z0-9]+)*)\\.([A-Za-z]{2,})$/;\n        return EMAIL_PATTREN.test(input);\n    };\n\n    Account.isPhoneNumber = function (input) {\n        var PHONE_PATTERN = /^(1(([35][0-9])|(47)|[8][01236789]))\\d{8}$/;\n        return PHONE_PATTERN.test(input);\n    };\n\n    /* `platform` could be one of `weibo`, `qq`, `renren` */\n    Account.loginWithThirdParty = function (options) {\n        options = options || {};\n\n        options.callback = options.callback || 'http://www.wandoujia.com/';\n\n        var platforms = {\n            weibo : 'sina',\n            sina : 'sina',\n            renren : 'renren',\n            qq : 'qq'\n        };\n\n        options.platform = platforms[options.platform];\n\n        var datas = [];\n        var d;\n        for (d in options) {\n            if (options.hasOwnProperty(d)) {\n                datas.push(d + '=' + global.encodeURIComponent(options[d]));\n            }\n        }\n\n        var targeURL = CONFIG_V1.loginWithThirdParty;\n\n        if (datas.length > 0) {\n            targeURL = targeURL + '&' + datas.join('&');\n        }\n\n        global.location.href = targeURL;\n    };\n\n    var SnapPea = global.SnapPea || {};\n    SnapPea.Account = Account;\n    global.SnapPea = SnapPea;\n}(this));\n");
__$coverInitRange("src/snappea-account-sdk.js", "16:9543");
__$coverInitRange("src/snappea-account-sdk.js", "61:83");
__$coverInitRange("src/snappea-account-sdk.js", "89:106");
__$coverInitRange("src/snappea-account-sdk.js", "113:289");
__$coverInitRange("src/snappea-account-sdk.js", "297:339");
__$coverInitRange("src/snappea-account-sdk.js", "345:374");
__$coverInitRange("src/snappea-account-sdk.js", "380:405");
__$coverInitRange("src/snappea-account-sdk.js", "412:445");
__$coverInitRange("src/snappea-account-sdk.js", "452:809");
__$coverInitRange("src/snappea-account-sdk.js", "816:910");
__$coverInitRange("src/snappea-account-sdk.js", "917:930");
__$coverInitRange("src/snappea-account-sdk.js", "936:958");
__$coverInitRange("src/snappea-account-sdk.js", "965:981");
__$coverInitRange("src/snappea-account-sdk.js", "988:1020");
__$coverInitRange("src/snappea-account-sdk.js", "1027:2268");
__$coverInitRange("src/snappea-account-sdk.js", "2275:2341");
__$coverInitRange("src/snappea-account-sdk.js", "2348:2415");
__$coverInitRange("src/snappea-account-sdk.js", "2422:3141");
__$coverInitRange("src/snappea-account-sdk.js", "3148:4431");
__$coverInitRange("src/snappea-account-sdk.js", "4438:5283");
__$coverInitRange("src/snappea-account-sdk.js", "5290:6060");
__$coverInitRange("src/snappea-account-sdk.js", "6067:6900");
__$coverInitRange("src/snappea-account-sdk.js", "6907:8195");
__$coverInitRange("src/snappea-account-sdk.js", "8202:8411");
__$coverInitRange("src/snappea-account-sdk.js", "8418:8582");
__$coverInitRange("src/snappea-account-sdk.js", "8650:9431");
__$coverInitRange("src/snappea-account-sdk.js", "9438:9472");
__$coverInitRange("src/snappea-account-sdk.js", "9478:9503");
__$coverInitRange("src/snappea-account-sdk.js", "9509:9533");
__$coverInitRange("src/snappea-account-sdk.js", "140:243");
__$coverInitRange("src/snappea-account-sdk.js", "1083:1112");
__$coverInitRange("src/snappea-account-sdk.js", "1123:1140");
__$coverInitRange("src/snappea-account-sdk.js", "1150:1173");
__$coverInitRange("src/snappea-account-sdk.js", "1184:2227");
__$coverInitRange("src/snappea-account-sdk.js", "2238:2261");
__$coverInitRange("src/snappea-account-sdk.js", "1236:1325");
__$coverInitRange("src/snappea-account-sdk.js", "1356:2217");
__$coverInitRange("src/snappea-account-sdk.js", "1714:1981");
__$coverInitRange("src/snappea-account-sdk.js", "1762:1779");
__$coverInitRange("src/snappea-account-sdk.js", "1805:1828");
__$coverInitRange("src/snappea-account-sdk.js", "1854:1883");
__$coverInitRange("src/snappea-account-sdk.js", "1938:1959");
__$coverInitRange("src/snappea-account-sdk.js", "2060:2183");
__$coverInitRange("src/snappea-account-sdk.js", "2317:2334");
__$coverInitRange("src/snappea-account-sdk.js", "2392:2408");
__$coverInitRange("src/snappea-account-sdk.js", "2466:2495");
__$coverInitRange("src/snappea-account-sdk.js", "2506:3100");
__$coverInitRange("src/snappea-account-sdk.js", "3111:3134");
__$coverInitRange("src/snappea-account-sdk.js", "2660:2895");
__$coverInitRange("src/snappea-account-sdk.js", "2704:2722");
__$coverInitRange("src/snappea-account-sdk.js", "2744:2765");
__$coverInitRange("src/snappea-account-sdk.js", "2787:2809");
__$coverInitRange("src/snappea-account-sdk.js", "2856:2877");
__$coverInitRange("src/snappea-account-sdk.js", "2962:3074");
__$coverInitRange("src/snappea-account-sdk.js", "3202:3231");
__$coverInitRange("src/snappea-account-sdk.js", "3242:3259");
__$coverInitRange("src/snappea-account-sdk.js", "3269:3292");
__$coverInitRange("src/snappea-account-sdk.js", "3303:4390");
__$coverInitRange("src/snappea-account-sdk.js", "4401:4424");
__$coverInitRange("src/snappea-account-sdk.js", "3355:3444");
__$coverInitRange("src/snappea-account-sdk.js", "3475:4380");
__$coverInitRange("src/snappea-account-sdk.js", "3883:4143");
__$coverInitRange("src/snappea-account-sdk.js", "3931:3948");
__$coverInitRange("src/snappea-account-sdk.js", "3974:3997");
__$coverInitRange("src/snappea-account-sdk.js", "4023:4045");
__$coverInitRange("src/snappea-account-sdk.js", "4100:4121");
__$coverInitRange("src/snappea-account-sdk.js", "4222:4346");
__$coverInitRange("src/snappea-account-sdk.js", "4506:4535");
__$coverInitRange("src/snappea-account-sdk.js", "4546:5242");
__$coverInitRange("src/snappea-account-sdk.js", "5253:5276");
__$coverInitRange("src/snappea-account-sdk.js", "4588:4677");
__$coverInitRange("src/snappea-account-sdk.js", "4708:5232");
__$coverInitRange("src/snappea-account-sdk.js", "4973:4995");
__$coverInitRange("src/snappea-account-sdk.js", "5074:5198");
__$coverInitRange("src/snappea-account-sdk.js", "5349:5378");
__$coverInitRange("src/snappea-account-sdk.js", "5389:5412");
__$coverInitRange("src/snappea-account-sdk.js", "5423:6019");
__$coverInitRange("src/snappea-account-sdk.js", "6030:6053");
__$coverInitRange("src/snappea-account-sdk.js", "5584:5904");
__$coverInitRange("src/snappea-account-sdk.js", "5628:5645");
__$coverInitRange("src/snappea-account-sdk.js", "5667:5690");
__$coverInitRange("src/snappea-account-sdk.js", "5712:5734");
__$coverInitRange("src/snappea-account-sdk.js", "5781:5799");
__$coverInitRange("src/snappea-account-sdk.js", "5821:5842");
__$coverInitRange("src/snappea-account-sdk.js", "5864:5886");
__$coverInitRange("src/snappea-account-sdk.js", "5971:5993");
__$coverInitRange("src/snappea-account-sdk.js", "6129:6158");
__$coverInitRange("src/snappea-account-sdk.js", "6169:6859");
__$coverInitRange("src/snappea-account-sdk.js", "6870:6893");
__$coverInitRange("src/snappea-account-sdk.js", "6211:6300");
__$coverInitRange("src/snappea-account-sdk.js", "6331:6849");
__$coverInitRange("src/snappea-account-sdk.js", "6590:6612");
__$coverInitRange("src/snappea-account-sdk.js", "6691:6815");
__$coverInitRange("src/snappea-account-sdk.js", "6966:6995");
__$coverInitRange("src/snappea-account-sdk.js", "7006:7023");
__$coverInitRange("src/snappea-account-sdk.js", "7033:7056");
__$coverInitRange("src/snappea-account-sdk.js", "7067:8154");
__$coverInitRange("src/snappea-account-sdk.js", "8165:8188");
__$coverInitRange("src/snappea-account-sdk.js", "7208:7297");
__$coverInitRange("src/snappea-account-sdk.js", "7328:8144");
__$coverInitRange("src/snappea-account-sdk.js", "7739:7907");
__$coverInitRange("src/snappea-account-sdk.js", "7787:7809");
__$coverInitRange("src/snappea-account-sdk.js", "7864:7885");
__$coverInitRange("src/snappea-account-sdk.js", "7986:8110");
__$coverInitRange("src/snappea-account-sdk.js", "8247:8362");
__$coverInitRange("src/snappea-account-sdk.js", "8372:8404");
__$coverInitRange("src/snappea-account-sdk.js", "8469:8533");
__$coverInitRange("src/snappea-account-sdk.js", "8543:8575");
__$coverInitRange("src/snappea-account-sdk.js", "8709:8732");
__$coverInitRange("src/snappea-account-sdk.js", "8743:8809");
__$coverInitRange("src/snappea-account-sdk.js", "8820:8955");
__$coverInitRange("src/snappea-account-sdk.js", "8966:9012");
__$coverInitRange("src/snappea-account-sdk.js", "9023:9037");
__$coverInitRange("src/snappea-account-sdk.js", "9047:9052");
__$coverInitRange("src/snappea-account-sdk.js", "9062:9227");
__$coverInitRange("src/snappea-account-sdk.js", "9238:9282");
__$coverInitRange("src/snappea-account-sdk.js", "9293:9382");
__$coverInitRange("src/snappea-account-sdk.js", "9393:9424");
__$coverInitRange("src/snappea-account-sdk.js", "9095:9217");
__$coverInitRange("src/snappea-account-sdk.js", "9144:9203");
__$coverInitRange("src/snappea-account-sdk.js", "9329:9372");
__$coverCall('src/snappea-account-sdk.js', '16:9543');
(function (global) {
    __$coverCall('src/snappea-account-sdk.js', '61:83');
    var Deferred = Q.defer;
    __$coverCall('src/snappea-account-sdk.js', '89:106');
    var ajax = $.ajax;
    __$coverCall('src/snappea-account-sdk.js', '113:289');
    if ($.ajaxSetup) {
        __$coverCall('src/snappea-account-sdk.js', '140:243');
        $.ajaxSetup({ xhrFields: { withCredentials: true } });
    } else {
    }
    __$coverCall('src/snappea-account-sdk.js', '297:339');
    var HOST = 'https://account.wandoujia.com';
    __$coverCall('src/snappea-account-sdk.js', '345:374');
    var API_VERSION_4 = '/v4/api';
    __$coverCall('src/snappea-account-sdk.js', '380:405');
    var API_VERSION_1 = '/v1';
    __$coverCall('src/snappea-account-sdk.js', '412:445');
    var PREFIX = HOST + API_VERSION_4;
    __$coverCall('src/snappea-account-sdk.js', '452:809');
    var CONFIG = {
            login: PREFIX + '/login',
            logout: PREFIX + '/logout',
            captcha: PREFIX + '/seccode',
            reg: PREFIX + '/register',
            checkUsername: PREFIX + '/isUsernameExisted',
            checkUserLogin: PREFIX + '/profile',
            findPwd: PREFIX + '/findpassword',
            resetPwd: PREFIX + '/resetpassword'
        };
    __$coverCall('src/snappea-account-sdk.js', '816:910');
    var CONFIG_V1 = { loginWithThirdParty: HOST + API_VERSION_1 + '/user/?do=login' };
    __$coverCall('src/snappea-account-sdk.js', '917:930');
    var USER_INFO;
    __$coverCall('src/snappea-account-sdk.js', '936:958');
    var IS_LOGINED = false;
    __$coverCall('src/snappea-account-sdk.js', '965:981');
    var Account = {};
    __$coverCall('src/snappea-account-sdk.js', '988:1020');
    Account.CAPTCHA = CONFIG.captcha;
    __$coverCall('src/snappea-account-sdk.js', '1027:2268');
    Account.loginAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '1083:1112');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '1123:1140');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '1150:1173');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '1184:2227');
        if (!data.username || !data.password) {
            __$coverCall('src/snappea-account-sdk.js', '1236:1325');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '1356:2217');
            ajax({
                type: 'POST',
                dataType: 'json',
                url: CONFIG.login,
                data: {
                    username: data.username,
                    password: data.password,
                    seccode: data.seccode || ''
                },
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '1714:1981');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '1762:1779');
                        IS_LOGINED = true;
                        __$coverCall('src/snappea-account-sdk.js', '1805:1828');
                        USER_INFO = resp.member;
                        __$coverCall('src/snappea-account-sdk.js', '1854:1883');
                        deferred.resolve(resp.member);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '1938:1959');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '2060:2183');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '2238:2261');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '2275:2341');
    Account.isLogined = function () {
        __$coverCall('src/snappea-account-sdk.js', '2317:2334');
        return IS_LOGINED;
    };
    __$coverCall('src/snappea-account-sdk.js', '2348:2415');
    Account.getUserInfo = function () {
        __$coverCall('src/snappea-account-sdk.js', '2392:2408');
        return USER_INFO;
    };
    __$coverCall('src/snappea-account-sdk.js', '2422:3141');
    Account.logoutAsync = function () {
        __$coverCall('src/snappea-account-sdk.js', '2466:2495');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '2506:3100');
        ajax({
            type: 'POST',
            dataType: 'json',
            url: CONFIG.logout,
            success: function (resp) {
                __$coverCall('src/snappea-account-sdk.js', '2660:2895');
                if (resp.error === 0) {
                    __$coverCall('src/snappea-account-sdk.js', '2704:2722');
                    IS_LOGINED = false;
                    __$coverCall('src/snappea-account-sdk.js', '2744:2765');
                    USER_INFO = undefined;
                    __$coverCall('src/snappea-account-sdk.js', '2787:2809');
                    deferred.resolve(resp);
                } else {
                    __$coverCall('src/snappea-account-sdk.js', '2856:2877');
                    deferred.reject(resp);
                }
            },
            error: function () {
                __$coverCall('src/snappea-account-sdk.js', '2962:3074');
                deferred.reject({
                    error: -1,
                    msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                });
            }
        });
        __$coverCall('src/snappea-account-sdk.js', '3111:3134');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '3148:4431');
    Account.regAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '3202:3231');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '3242:3259');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '3269:3292');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '3303:4390');
        if (!data.username || !data.password) {
            __$coverCall('src/snappea-account-sdk.js', '3355:3444');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '3475:4380');
            ajax({
                type: 'POST',
                dataType: 'json',
                url: CONFIG.reg,
                data: {
                    username: data.username,
                    password: data.password,
                    nikename: data.nikename || '',
                    seccode: data.seccode || ''
                },
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '3883:4143');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '3931:3948');
                        IS_LOGINED = true;
                        __$coverCall('src/snappea-account-sdk.js', '3974:3997');
                        USER_INFO = resp.member;
                        __$coverCall('src/snappea-account-sdk.js', '4023:4045');
                        deferred.resolve(resp);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '4100:4121');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '4222:4346');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '4401:4424');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '4438:5283');
    Account.checkUsernameAsync = function (username, options) {
        __$coverCall('src/snappea-account-sdk.js', '4506:4535');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '4546:5242');
        if (username === undefined) {
            __$coverCall('src/snappea-account-sdk.js', '4588:4677');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '4708:5232');
            ajax({
                type: 'POST',
                dataType: 'json',
                url: CONFIG.checkUsername,
                data: { username: username },
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '4973:4995');
                    deferred.resolve(resp);
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '5074:5198');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '5253:5276');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '5290:6060');
    Account.checkUserLoginAsync = function (options) {
        __$coverCall('src/snappea-account-sdk.js', '5349:5378');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '5389:5412');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '5423:6019');
        ajax({
            type: 'GET',
            dataType: 'json',
            url: CONFIG.checkUserLogin,
            success: function (resp) {
                __$coverCall('src/snappea-account-sdk.js', '5584:5904');
                if (resp.error === 0) {
                    __$coverCall('src/snappea-account-sdk.js', '5628:5645');
                    IS_LOGINED = true;
                    __$coverCall('src/snappea-account-sdk.js', '5667:5690');
                    USER_INFO = resp.member;
                    __$coverCall('src/snappea-account-sdk.js', '5712:5734');
                    deferred.resolve(true);
                } else {
                    __$coverCall('src/snappea-account-sdk.js', '5781:5799');
                    IS_LOGINED = false;
                    __$coverCall('src/snappea-account-sdk.js', '5821:5842');
                    USER_INFO = undefined;
                    __$coverCall('src/snappea-account-sdk.js', '5864:5886');
                    deferred.reject(false);
                }
            },
            error: function () {
                __$coverCall('src/snappea-account-sdk.js', '5971:5993');
                deferred.reject(false);
            }
        });
        __$coverCall('src/snappea-account-sdk.js', '6030:6053');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '6067:6900');
    Account.findPwdAsync = function (username, options) {
        __$coverCall('src/snappea-account-sdk.js', '6129:6158');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '6169:6859');
        if (username === undefined) {
            __$coverCall('src/snappea-account-sdk.js', '6211:6300');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '6331:6849');
            ajax({
                type: 'POST',
                dataType: 'json',
                url: CONFIG.findPwd,
                data: { username: username },
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '6590:6612');
                    deferred.resolve(resp);
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '6691:6815');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '6870:6893');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '6907:8195');
    Account.resetPwdAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '6966:6995');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '7006:7023');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '7033:7056');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '7067:8154');
        if (data.username === undefined || data.passcode === undefined || data.password === undefined) {
            __$coverCall('src/snappea-account-sdk.js', '7208:7297');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '7328:8144');
            ajax({
                type: 'POST',
                dataType: 'json',
                url: CONFIG.resetPwd,
                data: {
                    username: data.username,
                    passcode: data.passcode,
                    password: data.password,
                    repeatedpassword: data.password
                },
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '7739:7907');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '7787:7809');
                        deferred.resolve(resp);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '7864:7885');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '7986:8110');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '8165:8188');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '8202:8411');
    Account.isEmail = function (input) {
        __$coverCall('src/snappea-account-sdk.js', '8247:8362');
        var EMAIL_PATTREN = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/;
        __$coverCall('src/snappea-account-sdk.js', '8372:8404');
        return EMAIL_PATTREN.test(input);
    };
    __$coverCall('src/snappea-account-sdk.js', '8418:8582');
    Account.isPhoneNumber = function (input) {
        __$coverCall('src/snappea-account-sdk.js', '8469:8533');
        var PHONE_PATTERN = /^(1(([35][0-9])|(47)|[8][01236789]))\d{8}$/;
        __$coverCall('src/snappea-account-sdk.js', '8543:8575');
        return PHONE_PATTERN.test(input);
    };
    __$coverCall('src/snappea-account-sdk.js', '8650:9431');
    Account.loginWithThirdParty = function (options) {
        __$coverCall('src/snappea-account-sdk.js', '8709:8732');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '8743:8809');
        options.callback = options.callback || 'http://www.wandoujia.com/';
        __$coverCall('src/snappea-account-sdk.js', '8820:8955');
        var platforms = {
                weibo: 'sina',
                sina: 'sina',
                renren: 'renren',
                qq: 'qq'
            };
        __$coverCall('src/snappea-account-sdk.js', '8966:9012');
        options.platform = platforms[options.platform];
        __$coverCall('src/snappea-account-sdk.js', '9023:9037');
        var datas = [];
        __$coverCall('src/snappea-account-sdk.js', '9047:9052');
        var d;
        __$coverCall('src/snappea-account-sdk.js', '9062:9227');
        for (d in options) {
            __$coverCall('src/snappea-account-sdk.js', '9095:9217');
            if (options.hasOwnProperty(d)) {
                __$coverCall('src/snappea-account-sdk.js', '9144:9203');
                datas.push(d + '=' + global.encodeURIComponent(options[d]));
            }
        }
        __$coverCall('src/snappea-account-sdk.js', '9238:9282');
        var targeURL = CONFIG_V1.loginWithThirdParty;
        __$coverCall('src/snappea-account-sdk.js', '9293:9382');
        if (datas.length > 0) {
            __$coverCall('src/snappea-account-sdk.js', '9329:9372');
            targeURL = targeURL + '&' + datas.join('&');
        }
        __$coverCall('src/snappea-account-sdk.js', '9393:9424');
        global.location.href = targeURL;
    };
    __$coverCall('src/snappea-account-sdk.js', '9438:9472');
    var SnapPea = global.SnapPea || {};
    __$coverCall('src/snappea-account-sdk.js', '9478:9503');
    SnapPea.Account = Account;
    __$coverCall('src/snappea-account-sdk.js', '9509:9533');
    global.SnapPea = SnapPea;
}(this));
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
__$coverInit("src/snappea-account-sdk.js", "/*global $, Q*/\n(function (global) {\n    //@@ lib/q/q.js\n    var Deferred = Q.defer;\n    var ajax = $.ajax;\n\n    // if ($.ajaxSetup) {\n    //     $.ajaxSetup({\n    //         xhrFields : {\n    //             withCredentials : true\n    //         }\n    //     });\n    // } else {\n    //     $.ajaxSettings;\n    // }\n\n\n    var HOST = 'https://account.wandoujia.com';\n    var API_VERSION_4 = '/v4/api';\n    var API_VERSION_1 = '/v1';\n\n    var PREFIX = HOST + API_VERSION_4;\n\n    var CONFIG = {\n        login : PREFIX + '/login',\n        logout : PREFIX + '/logout',\n        captcha : PREFIX + '/seccode',\n        reg : PREFIX + '/register',\n        checkUsername : PREFIX + '/isUsernameExisted',\n        checkUserLogin : PREFIX + '/profile',\n        findPwd : PREFIX + '/findpassword',\n        resetPwd : PREFIX + '/resetpassword'\n    };\n\n    var CONFIG_V1 = {\n        loginWithThirdParty : HOST + API_VERSION_1 + '/user/?do=login'\n    };\n\n    var USER_INFO;\n    var IS_LOGINED = false;\n\n    var Account = {};\n\n    Account.CAPTCHA = CONFIG.captcha;\n\n    Account.loginAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (!data.username || !data.password) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.login,\n                data : {\n                    username : data.username,\n                    password : data.password,\n                    seccode : data.seccode || ''\n                },\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        IS_LOGINED = true;\n                        USER_INFO = resp.member;\n                        deferred.resolve(resp.member);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.isLogined = function () {\n        return IS_LOGINED;\n    };\n\n    Account.getUserInfo = function () {\n        return USER_INFO;\n    };\n\n    Account.logoutAsync = function () {\n        var deferred = new Deferred();\n\n        ajax({\n            type : 'POST',\n            dataType : 'json',\n            url : CONFIG.logout,\n            success : function (resp) {\n                if (resp.error === 0) {\n                    IS_LOGINED = false;\n                    USER_INFO = undefined;\n                    deferred.resolve(resp);\n                } else {\n                    deferred.reject(resp);\n                }\n            },\n            error : function () {\n                deferred.reject({\n                    error : -1,\n                    msg : '请求失败，请检查网络连接状况。'\n                });\n            }\n        });\n\n        return deferred.promise;\n    };\n\n    Account.regAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (!data.username || !data.password) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.reg,\n                data : {\n                    username : data.username,\n                    password : data.password,\n                    nikename : data.nikename || '',\n                    seccode : data.seccode || ''\n                },\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        IS_LOGINED = true;\n                        USER_INFO = resp.member;\n                        deferred.resolve(resp);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.checkUsernameAsync = function (username, options) {\n        var deferred = new Deferred();\n\n        if (username === undefined) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.checkUsername,\n                data : {\n                    username : username\n                },\n                success : function (resp) {\n                    deferred.resolve(resp);\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.checkUserLoginAsync = function (options) {\n        var deferred = new Deferred();\n\n        options = options || {};\n\n        ajax({\n            type : 'GET',\n            dataType : 'json',\n            url : CONFIG.checkUserLogin,\n            success : function (resp) {\n                if (resp.error === 0) {\n                    IS_LOGINED = true;\n                    USER_INFO = resp.member;\n                    deferred.resolve(true);\n                } else {\n                    IS_LOGINED = false;\n                    USER_INFO = undefined;\n                    deferred.reject(false);\n                }\n            },\n            error : function () {\n                deferred.reject(false);\n            }\n        });\n\n        return deferred.promise;\n    };\n\n    Account.findPwdAsync = function (username, options) {\n        var deferred = new Deferred();\n\n        if (username === undefined) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.findPwd,\n                data : {\n                    username : username\n                },\n                success : function (resp) {\n                    deferred.resolve(resp);\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.resetPwdAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (data.username === undefined ||\n                data.passcode === undefined ||\n                data.password === undefined) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.resetPwd,\n                data : {\n                    username : data.username,\n                    passcode : data.passcode,\n                    password : data.password,\n                    repeatedpassword : data.password\n                },\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        deferred.resolve(resp);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.isEmail = function (input) {\n        var EMAIL_PATTREN = /^[A-Za-z0-9](([_\\.\\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\\.\\-]?[a-zA-Z0-9]+)*)\\.([A-Za-z]{2,})$/;\n        return EMAIL_PATTREN.test(input);\n    };\n\n    Account.isPhoneNumber = function (input) {\n        var PHONE_PATTERN = /(^[0-9]{3,4}\\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\\([0-9]{3,4}\\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(13\\d{9}$)|(15[0135-9]\\d{8}$)|(18[267]\\d{8}$)/;\n        return PHONE_PATTERN.test(input);\n    };\n\n    /* `platform` could be one of `weibo`, `qq`, `renren` */\n    Account.loginWithThirdParty = function (options) {\n        options = options || {};\n\n        options.callback = options.callback || 'http://www.wandoujia.com/';\n\n        var platforms = {\n            weibo : 'sina',\n            sina : 'sina',\n            renren : 'renren',\n            qq : 'qq'\n        };\n\n        options.platform = platforms[options.platform];\n\n        var datas = [];\n        var d;\n        for (d in options) {\n            if (options.hasOwnProperty(d)) {\n                datas.push(d + '=' + global.encodeURIComponent(options[d]));\n            }\n        }\n\n        var targeURL = CONFIG_V1.loginWithThirdParty;\n\n        if (datas.length > 0) {\n            targeURL = targeURL + '&' + datas.join('&');\n        }\n\n        global.location.href = targeURL;\n    };\n\n    var SnapPea = global.SnapPea || {};\n    SnapPea.Account = Account;\n    global.SnapPea = SnapPea;\n}(this));\n");
__$coverInitRange("src/snappea-account-sdk.js", "16:9662");
__$coverInitRange("src/snappea-account-sdk.js", "61:83");
__$coverInitRange("src/snappea-account-sdk.js", "89:106");
__$coverInitRange("src/snappea-account-sdk.js", "321:363");
__$coverInitRange("src/snappea-account-sdk.js", "369:398");
__$coverInitRange("src/snappea-account-sdk.js", "404:429");
__$coverInitRange("src/snappea-account-sdk.js", "436:469");
__$coverInitRange("src/snappea-account-sdk.js", "476:833");
__$coverInitRange("src/snappea-account-sdk.js", "840:934");
__$coverInitRange("src/snappea-account-sdk.js", "941:954");
__$coverInitRange("src/snappea-account-sdk.js", "960:982");
__$coverInitRange("src/snappea-account-sdk.js", "989:1005");
__$coverInitRange("src/snappea-account-sdk.js", "1012:1044");
__$coverInitRange("src/snappea-account-sdk.js", "1051:2292");
__$coverInitRange("src/snappea-account-sdk.js", "2299:2365");
__$coverInitRange("src/snappea-account-sdk.js", "2372:2439");
__$coverInitRange("src/snappea-account-sdk.js", "2446:3165");
__$coverInitRange("src/snappea-account-sdk.js", "3172:4455");
__$coverInitRange("src/snappea-account-sdk.js", "4462:5307");
__$coverInitRange("src/snappea-account-sdk.js", "5314:6084");
__$coverInitRange("src/snappea-account-sdk.js", "6091:6924");
__$coverInitRange("src/snappea-account-sdk.js", "6931:8219");
__$coverInitRange("src/snappea-account-sdk.js", "8226:8435");
__$coverInitRange("src/snappea-account-sdk.js", "8442:8701");
__$coverInitRange("src/snappea-account-sdk.js", "8769:9550");
__$coverInitRange("src/snappea-account-sdk.js", "9557:9591");
__$coverInitRange("src/snappea-account-sdk.js", "9597:9622");
__$coverInitRange("src/snappea-account-sdk.js", "9628:9652");
__$coverInitRange("src/snappea-account-sdk.js", "1107:1136");
__$coverInitRange("src/snappea-account-sdk.js", "1147:1164");
__$coverInitRange("src/snappea-account-sdk.js", "1174:1197");
__$coverInitRange("src/snappea-account-sdk.js", "1208:2251");
__$coverInitRange("src/snappea-account-sdk.js", "2262:2285");
__$coverInitRange("src/snappea-account-sdk.js", "1260:1349");
__$coverInitRange("src/snappea-account-sdk.js", "1380:2241");
__$coverInitRange("src/snappea-account-sdk.js", "1738:2005");
__$coverInitRange("src/snappea-account-sdk.js", "1786:1803");
__$coverInitRange("src/snappea-account-sdk.js", "1829:1852");
__$coverInitRange("src/snappea-account-sdk.js", "1878:1907");
__$coverInitRange("src/snappea-account-sdk.js", "1962:1983");
__$coverInitRange("src/snappea-account-sdk.js", "2084:2207");
__$coverInitRange("src/snappea-account-sdk.js", "2341:2358");
__$coverInitRange("src/snappea-account-sdk.js", "2416:2432");
__$coverInitRange("src/snappea-account-sdk.js", "2490:2519");
__$coverInitRange("src/snappea-account-sdk.js", "2530:3124");
__$coverInitRange("src/snappea-account-sdk.js", "3135:3158");
__$coverInitRange("src/snappea-account-sdk.js", "2684:2919");
__$coverInitRange("src/snappea-account-sdk.js", "2728:2746");
__$coverInitRange("src/snappea-account-sdk.js", "2768:2789");
__$coverInitRange("src/snappea-account-sdk.js", "2811:2833");
__$coverInitRange("src/snappea-account-sdk.js", "2880:2901");
__$coverInitRange("src/snappea-account-sdk.js", "2986:3098");
__$coverInitRange("src/snappea-account-sdk.js", "3226:3255");
__$coverInitRange("src/snappea-account-sdk.js", "3266:3283");
__$coverInitRange("src/snappea-account-sdk.js", "3293:3316");
__$coverInitRange("src/snappea-account-sdk.js", "3327:4414");
__$coverInitRange("src/snappea-account-sdk.js", "4425:4448");
__$coverInitRange("src/snappea-account-sdk.js", "3379:3468");
__$coverInitRange("src/snappea-account-sdk.js", "3499:4404");
__$coverInitRange("src/snappea-account-sdk.js", "3907:4167");
__$coverInitRange("src/snappea-account-sdk.js", "3955:3972");
__$coverInitRange("src/snappea-account-sdk.js", "3998:4021");
__$coverInitRange("src/snappea-account-sdk.js", "4047:4069");
__$coverInitRange("src/snappea-account-sdk.js", "4124:4145");
__$coverInitRange("src/snappea-account-sdk.js", "4246:4370");
__$coverInitRange("src/snappea-account-sdk.js", "4530:4559");
__$coverInitRange("src/snappea-account-sdk.js", "4570:5266");
__$coverInitRange("src/snappea-account-sdk.js", "5277:5300");
__$coverInitRange("src/snappea-account-sdk.js", "4612:4701");
__$coverInitRange("src/snappea-account-sdk.js", "4732:5256");
__$coverInitRange("src/snappea-account-sdk.js", "4997:5019");
__$coverInitRange("src/snappea-account-sdk.js", "5098:5222");
__$coverInitRange("src/snappea-account-sdk.js", "5373:5402");
__$coverInitRange("src/snappea-account-sdk.js", "5413:5436");
__$coverInitRange("src/snappea-account-sdk.js", "5447:6043");
__$coverInitRange("src/snappea-account-sdk.js", "6054:6077");
__$coverInitRange("src/snappea-account-sdk.js", "5608:5928");
__$coverInitRange("src/snappea-account-sdk.js", "5652:5669");
__$coverInitRange("src/snappea-account-sdk.js", "5691:5714");
__$coverInitRange("src/snappea-account-sdk.js", "5736:5758");
__$coverInitRange("src/snappea-account-sdk.js", "5805:5823");
__$coverInitRange("src/snappea-account-sdk.js", "5845:5866");
__$coverInitRange("src/snappea-account-sdk.js", "5888:5910");
__$coverInitRange("src/snappea-account-sdk.js", "5995:6017");
__$coverInitRange("src/snappea-account-sdk.js", "6153:6182");
__$coverInitRange("src/snappea-account-sdk.js", "6193:6883");
__$coverInitRange("src/snappea-account-sdk.js", "6894:6917");
__$coverInitRange("src/snappea-account-sdk.js", "6235:6324");
__$coverInitRange("src/snappea-account-sdk.js", "6355:6873");
__$coverInitRange("src/snappea-account-sdk.js", "6614:6636");
__$coverInitRange("src/snappea-account-sdk.js", "6715:6839");
__$coverInitRange("src/snappea-account-sdk.js", "6990:7019");
__$coverInitRange("src/snappea-account-sdk.js", "7030:7047");
__$coverInitRange("src/snappea-account-sdk.js", "7057:7080");
__$coverInitRange("src/snappea-account-sdk.js", "7091:8178");
__$coverInitRange("src/snappea-account-sdk.js", "8189:8212");
__$coverInitRange("src/snappea-account-sdk.js", "7232:7321");
__$coverInitRange("src/snappea-account-sdk.js", "7352:8168");
__$coverInitRange("src/snappea-account-sdk.js", "7763:7931");
__$coverInitRange("src/snappea-account-sdk.js", "7811:7833");
__$coverInitRange("src/snappea-account-sdk.js", "7888:7909");
__$coverInitRange("src/snappea-account-sdk.js", "8010:8134");
__$coverInitRange("src/snappea-account-sdk.js", "8271:8386");
__$coverInitRange("src/snappea-account-sdk.js", "8396:8428");
__$coverInitRange("src/snappea-account-sdk.js", "8493:8652");
__$coverInitRange("src/snappea-account-sdk.js", "8662:8694");
__$coverInitRange("src/snappea-account-sdk.js", "8828:8851");
__$coverInitRange("src/snappea-account-sdk.js", "8862:8928");
__$coverInitRange("src/snappea-account-sdk.js", "8939:9074");
__$coverInitRange("src/snappea-account-sdk.js", "9085:9131");
__$coverInitRange("src/snappea-account-sdk.js", "9142:9156");
__$coverInitRange("src/snappea-account-sdk.js", "9166:9171");
__$coverInitRange("src/snappea-account-sdk.js", "9181:9346");
__$coverInitRange("src/snappea-account-sdk.js", "9357:9401");
__$coverInitRange("src/snappea-account-sdk.js", "9412:9501");
__$coverInitRange("src/snappea-account-sdk.js", "9512:9543");
__$coverInitRange("src/snappea-account-sdk.js", "9214:9336");
__$coverInitRange("src/snappea-account-sdk.js", "9263:9322");
__$coverInitRange("src/snappea-account-sdk.js", "9448:9491");
__$coverCall('src/snappea-account-sdk.js', '16:9662');
(function (global) {
    __$coverCall('src/snappea-account-sdk.js', '61:83');
    var Deferred = Q.defer;
    __$coverCall('src/snappea-account-sdk.js', '89:106');
    var ajax = $.ajax;
    __$coverCall('src/snappea-account-sdk.js', '321:363');
    var HOST = 'https://account.wandoujia.com';
    __$coverCall('src/snappea-account-sdk.js', '369:398');
    var API_VERSION_4 = '/v4/api';
    __$coverCall('src/snappea-account-sdk.js', '404:429');
    var API_VERSION_1 = '/v1';
    __$coverCall('src/snappea-account-sdk.js', '436:469');
    var PREFIX = HOST + API_VERSION_4;
    __$coverCall('src/snappea-account-sdk.js', '476:833');
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
    __$coverCall('src/snappea-account-sdk.js', '840:934');
    var CONFIG_V1 = { loginWithThirdParty: HOST + API_VERSION_1 + '/user/?do=login' };
    __$coverCall('src/snappea-account-sdk.js', '941:954');
    var USER_INFO;
    __$coverCall('src/snappea-account-sdk.js', '960:982');
    var IS_LOGINED = false;
    __$coverCall('src/snappea-account-sdk.js', '989:1005');
    var Account = {};
    __$coverCall('src/snappea-account-sdk.js', '1012:1044');
    Account.CAPTCHA = CONFIG.captcha;
    __$coverCall('src/snappea-account-sdk.js', '1051:2292');
    Account.loginAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '1107:1136');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '1147:1164');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '1174:1197');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '1208:2251');
        if (!data.username || !data.password) {
            __$coverCall('src/snappea-account-sdk.js', '1260:1349');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '1380:2241');
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
                    __$coverCall('src/snappea-account-sdk.js', '1738:2005');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '1786:1803');
                        IS_LOGINED = true;
                        __$coverCall('src/snappea-account-sdk.js', '1829:1852');
                        USER_INFO = resp.member;
                        __$coverCall('src/snappea-account-sdk.js', '1878:1907');
                        deferred.resolve(resp.member);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '1962:1983');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '2084:2207');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '2262:2285');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '2299:2365');
    Account.isLogined = function () {
        __$coverCall('src/snappea-account-sdk.js', '2341:2358');
        return IS_LOGINED;
    };
    __$coverCall('src/snappea-account-sdk.js', '2372:2439');
    Account.getUserInfo = function () {
        __$coverCall('src/snappea-account-sdk.js', '2416:2432');
        return USER_INFO;
    };
    __$coverCall('src/snappea-account-sdk.js', '2446:3165');
    Account.logoutAsync = function () {
        __$coverCall('src/snappea-account-sdk.js', '2490:2519');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '2530:3124');
        ajax({
            type: 'POST',
            dataType: 'json',
            url: CONFIG.logout,
            success: function (resp) {
                __$coverCall('src/snappea-account-sdk.js', '2684:2919');
                if (resp.error === 0) {
                    __$coverCall('src/snappea-account-sdk.js', '2728:2746');
                    IS_LOGINED = false;
                    __$coverCall('src/snappea-account-sdk.js', '2768:2789');
                    USER_INFO = undefined;
                    __$coverCall('src/snappea-account-sdk.js', '2811:2833');
                    deferred.resolve(resp);
                } else {
                    __$coverCall('src/snappea-account-sdk.js', '2880:2901');
                    deferred.reject(resp);
                }
            },
            error: function () {
                __$coverCall('src/snappea-account-sdk.js', '2986:3098');
                deferred.reject({
                    error: -1,
                    msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                });
            }
        });
        __$coverCall('src/snappea-account-sdk.js', '3135:3158');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '3172:4455');
    Account.regAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '3226:3255');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '3266:3283');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '3293:3316');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '3327:4414');
        if (!data.username || !data.password) {
            __$coverCall('src/snappea-account-sdk.js', '3379:3468');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '3499:4404');
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
                    __$coverCall('src/snappea-account-sdk.js', '3907:4167');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '3955:3972');
                        IS_LOGINED = true;
                        __$coverCall('src/snappea-account-sdk.js', '3998:4021');
                        USER_INFO = resp.member;
                        __$coverCall('src/snappea-account-sdk.js', '4047:4069');
                        deferred.resolve(resp);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '4124:4145');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '4246:4370');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '4425:4448');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '4462:5307');
    Account.checkUsernameAsync = function (username, options) {
        __$coverCall('src/snappea-account-sdk.js', '4530:4559');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '4570:5266');
        if (username === undefined) {
            __$coverCall('src/snappea-account-sdk.js', '4612:4701');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '4732:5256');
            ajax({
                type: 'POST',
                dataType: 'json',
                url: CONFIG.checkUsername,
                data: { username: username },
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '4997:5019');
                    deferred.resolve(resp);
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '5098:5222');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '5277:5300');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '5314:6084');
    Account.checkUserLoginAsync = function (options) {
        __$coverCall('src/snappea-account-sdk.js', '5373:5402');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '5413:5436');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '5447:6043');
        ajax({
            type: 'GET',
            dataType: 'json',
            url: CONFIG.checkUserLogin,
            success: function (resp) {
                __$coverCall('src/snappea-account-sdk.js', '5608:5928');
                if (resp.error === 0) {
                    __$coverCall('src/snappea-account-sdk.js', '5652:5669');
                    IS_LOGINED = true;
                    __$coverCall('src/snappea-account-sdk.js', '5691:5714');
                    USER_INFO = resp.member;
                    __$coverCall('src/snappea-account-sdk.js', '5736:5758');
                    deferred.resolve(true);
                } else {
                    __$coverCall('src/snappea-account-sdk.js', '5805:5823');
                    IS_LOGINED = false;
                    __$coverCall('src/snappea-account-sdk.js', '5845:5866');
                    USER_INFO = undefined;
                    __$coverCall('src/snappea-account-sdk.js', '5888:5910');
                    deferred.reject(false);
                }
            },
            error: function () {
                __$coverCall('src/snappea-account-sdk.js', '5995:6017');
                deferred.reject(false);
            }
        });
        __$coverCall('src/snappea-account-sdk.js', '6054:6077');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '6091:6924');
    Account.findPwdAsync = function (username, options) {
        __$coverCall('src/snappea-account-sdk.js', '6153:6182');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '6193:6883');
        if (username === undefined) {
            __$coverCall('src/snappea-account-sdk.js', '6235:6324');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '6355:6873');
            ajax({
                type: 'POST',
                dataType: 'json',
                url: CONFIG.findPwd,
                data: { username: username },
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '6614:6636');
                    deferred.resolve(resp);
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '6715:6839');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '6894:6917');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '6931:8219');
    Account.resetPwdAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '6990:7019');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '7030:7047');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '7057:7080');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '7091:8178');
        if (data.username === undefined || data.passcode === undefined || data.password === undefined) {
            __$coverCall('src/snappea-account-sdk.js', '7232:7321');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '7352:8168');
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
                    __$coverCall('src/snappea-account-sdk.js', '7763:7931');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '7811:7833');
                        deferred.resolve(resp);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '7888:7909');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '8010:8134');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '8189:8212');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '8226:8435');
    Account.isEmail = function (input) {
        __$coverCall('src/snappea-account-sdk.js', '8271:8386');
        var EMAIL_PATTREN = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/;
        __$coverCall('src/snappea-account-sdk.js', '8396:8428');
        return EMAIL_PATTREN.test(input);
    };
    __$coverCall('src/snappea-account-sdk.js', '8442:8701');
    Account.isPhoneNumber = function (input) {
        __$coverCall('src/snappea-account-sdk.js', '8493:8652');
        var PHONE_PATTERN = /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(13\d{9}$)|(15[0135-9]\d{8}$)|(18[267]\d{8}$)/;
        __$coverCall('src/snappea-account-sdk.js', '8662:8694');
        return PHONE_PATTERN.test(input);
    };
    __$coverCall('src/snappea-account-sdk.js', '8769:9550');
    Account.loginWithThirdParty = function (options) {
        __$coverCall('src/snappea-account-sdk.js', '8828:8851');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '8862:8928');
        options.callback = options.callback || 'http://www.wandoujia.com/';
        __$coverCall('src/snappea-account-sdk.js', '8939:9074');
        var platforms = {
                weibo: 'sina',
                sina: 'sina',
                renren: 'renren',
                qq: 'qq'
            };
        __$coverCall('src/snappea-account-sdk.js', '9085:9131');
        options.platform = platforms[options.platform];
        __$coverCall('src/snappea-account-sdk.js', '9142:9156');
        var datas = [];
        __$coverCall('src/snappea-account-sdk.js', '9166:9171');
        var d;
        __$coverCall('src/snappea-account-sdk.js', '9181:9346');
        for (d in options) {
            __$coverCall('src/snappea-account-sdk.js', '9214:9336');
            if (options.hasOwnProperty(d)) {
                __$coverCall('src/snappea-account-sdk.js', '9263:9322');
                datas.push(d + '=' + global.encodeURIComponent(options[d]));
            }
        }
        __$coverCall('src/snappea-account-sdk.js', '9357:9401');
        var targeURL = CONFIG_V1.loginWithThirdParty;
        __$coverCall('src/snappea-account-sdk.js', '9412:9501');
        if (datas.length > 0) {
            __$coverCall('src/snappea-account-sdk.js', '9448:9491');
            targeURL = targeURL + '&' + datas.join('&');
        }
        __$coverCall('src/snappea-account-sdk.js', '9512:9543');
        global.location.href = targeURL;
    };
    __$coverCall('src/snappea-account-sdk.js', '9557:9591');
    var SnapPea = global.SnapPea || {};
    __$coverCall('src/snappea-account-sdk.js', '9597:9622');
    SnapPea.Account = Account;
    __$coverCall('src/snappea-account-sdk.js', '9628:9652');
    global.SnapPea = SnapPea;
}(this));
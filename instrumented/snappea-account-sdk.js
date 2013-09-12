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
__$coverInit("src/snappea-account-sdk.js", "/*global $, Q*/\n(function (global) {\n    //@@ lib/q/q.js\n    var Deferred = Q.defer;\n    var ajax = $.ajax;\n\n    if ($.ajaxSetup) {\n        $.ajaxSetup({\n            xhrFields : {\n                withCredentials : true\n            }\n        });\n    } else {\n        // $.ajaxSettings;\n    }\n\n\n    var HOST = 'https://account.wandoujia.com';\n    var API_VERSION_4 = '/v4/api';\n\n    var PREFIX = HOST + API_VERSION_4;\n\n    var CONFIG = {\n        login : PREFIX + '/login',\n        logout : PREFIX + '/logout',\n        captcha : PREFIX + '/seccode',\n        reg : PREFIX + '/register',\n        checkUsername : PREFIX + '/isUsernameExisted',\n        checkUserLogin : PREFIX + '/profile',\n        findPwd : PREFIX + '/findpassword',\n        checkCode : PREFIX + '/checkcode',\n        resetPwd : PREFIX + '/resetpassword',\n        modifyPwd : PREFIX + '/profile/password'\n    };\n\n    var CONFIG_WEB = {\n        loginWithThirdParty : HOST + '/web/oauth2/{1}/login'\n    };\n\n    var USER_INFO;\n    var IS_LOGINED = false;\n\n    var Account = {};\n\n    Account.CAPTCHA = CONFIG.captcha;\n\n    Account.loginAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (!data.username || !data.password) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.login,\n                data : {\n                    username : data.username,\n                    password : data.password,\n                    seccode : data.seccode || ''\n                },\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        IS_LOGINED = true;\n                        USER_INFO = resp.member;\n                        deferred.resolve(resp.member);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.isLogined = function () {\n        return IS_LOGINED;\n    };\n\n    Account.getUserInfo = function () {\n        return USER_INFO;\n    };\n\n    Account.logoutAsync = function () {\n        var deferred = new Deferred();\n\n        ajax({\n            type : 'POST',\n            dataType : 'json',\n            url : CONFIG.logout,\n            success : function (resp) {\n                if (resp.error === 0) {\n                    IS_LOGINED = false;\n                    USER_INFO = undefined;\n                    deferred.resolve(resp);\n                } else {\n                    deferred.reject(resp);\n                }\n            },\n            error : function () {\n                deferred.reject({\n                    error : -1,\n                    msg : '请求失败，请检查网络连接状况。'\n                });\n            }\n        });\n\n        return deferred.promise;\n    };\n\n    Account.regAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (!data.username || !data.password) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.reg,\n                data : {\n                    username : data.username,\n                    password : data.password,\n                    nick : data.nickname || '',\n                    seccode : data.seccode || ''\n                },\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        IS_LOGINED = true;\n                        USER_INFO = resp.member;\n                        deferred.resolve(resp.member);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.checkUsernameAsync = function (username, options) {\n        var deferred = new Deferred();\n\n        if (username === undefined) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.checkUsername,\n                data : {\n                    username : username\n                },\n                success : function (resp) {\n                    deferred.resolve(resp);\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.checkUserLoginAsync = function (options) {\n        var deferred = new Deferred();\n\n        options = options || {};\n\n        ajax({\n            type : 'GET',\n            dataType : 'json',\n            url : CONFIG.checkUserLogin,\n            success : function (resp) {\n                if (resp.error === 0) {\n                    IS_LOGINED = true;\n                    USER_INFO = resp.member;\n                    deferred.resolve(true);\n                } else {\n                    IS_LOGINED = false;\n                    USER_INFO = undefined;\n                    deferred.reject(false);\n                }\n            },\n            error : function () {\n                deferred.reject(false);\n            }\n        });\n\n        return deferred.promise;\n    };\n\n    Account.findPwdAsync = function (username, options) {\n        var deferred = new Deferred();\n\n        if (username === undefined) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.findPwd,\n                data : {\n                    username : username\n                },\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        deferred.resolve(resp);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.checkCodeAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (data.username === undefined ||\n                data.passcode === undefined) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                url : CONFIG.checkCode,\n                data : {\n                    username : data.username,\n                    passcode : data.passcode\n                },\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        deferred.resolve(resp);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.resetPwdAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (data.username === undefined ||\n                data.passcode === undefined ||\n                data.password === undefined) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.resetPwd,\n                data : {\n                    username : data.username,\n                    passcode : data.passcode,\n                    password : data.password,\n                    repeatedpassword : data.password\n                },\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        deferred.resolve(resp);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.modifyPwdAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (data.password === undefined ||\n                data.newpassword === undefined) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.modifyPwd,\n                data : {\n                    oldpassword : data.password,\n                    newpassword : data.newpassword\n                },\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        deferred.resolve(resp);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.isEmail = function (input) {\n        var EMAIL_PATTREN = /^[A-Za-z0-9](([_\\.\\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\\.\\-]?[a-zA-Z0-9]+)*)\\.([A-Za-z]{2,})$/;\n        return EMAIL_PATTREN.test(input);\n    };\n\n    Account.isPhoneNumber = function (input) {\n        var PHONE_PATTERN = /^(1(([35][0-9])|(47)|[8][01236789]))\\d{8}$/;\n        return PHONE_PATTERN.test(input);\n    };\n\n    /* `platform` could be one of `weibo`, `qq`, `renren` */\n    Account.loginWithThirdParty = function (options) {\n        options = options || {};\n\n        options.callback = options.callback || 'http://www.wandoujia.com/';\n\n        var platforms = {\n            weibo : 'sina',\n            sina : 'sina',\n            renren : 'renren',\n            qq : 'qq'\n        };\n\n        var platform = platforms[options.platform];\n        delete options.platform;\n\n        var datas = [];\n        var d;\n        for (d in options) {\n            if (options.hasOwnProperty(d)) {\n                datas.push(d + '=' + global.encodeURIComponent(options[d]));\n            }\n        }\n\n        var targeURL = CONFIG_WEB.loginWithThirdParty.replace('{1}', platform);\n\n        if (datas.length > 0) {\n            targeURL = targeURL + '?' + datas.join('&');\n        }\n\n        global.location.href = targeURL;\n    };\n\n    var SnapPea = global.SnapPea || {};\n    SnapPea.Account = Account;\n    global.SnapPea = SnapPea;\n}(this));\n");
__$coverInitRange("src/snappea-account-sdk.js", "16:12077");
__$coverInitRange("src/snappea-account-sdk.js", "61:83");
__$coverInitRange("src/snappea-account-sdk.js", "89:106");
__$coverInitRange("src/snappea-account-sdk.js", "113:289");
__$coverInitRange("src/snappea-account-sdk.js", "297:339");
__$coverInitRange("src/snappea-account-sdk.js", "345:374");
__$coverInitRange("src/snappea-account-sdk.js", "381:414");
__$coverInitRange("src/snappea-account-sdk.js", "421:871");
__$coverInitRange("src/snappea-account-sdk.js", "878:963");
__$coverInitRange("src/snappea-account-sdk.js", "970:983");
__$coverInitRange("src/snappea-account-sdk.js", "989:1011");
__$coverInitRange("src/snappea-account-sdk.js", "1018:1034");
__$coverInitRange("src/snappea-account-sdk.js", "1041:1073");
__$coverInitRange("src/snappea-account-sdk.js", "1080:2321");
__$coverInitRange("src/snappea-account-sdk.js", "2328:2394");
__$coverInitRange("src/snappea-account-sdk.js", "2401:2468");
__$coverInitRange("src/snappea-account-sdk.js", "2475:3194");
__$coverInitRange("src/snappea-account-sdk.js", "3201:4487");
__$coverInitRange("src/snappea-account-sdk.js", "4494:5339");
__$coverInitRange("src/snappea-account-sdk.js", "5346:6116");
__$coverInitRange("src/snappea-account-sdk.js", "6123:7102");
__$coverInitRange("src/snappea-account-sdk.js", "7109:8217");
__$coverInitRange("src/snappea-account-sdk.js", "8224:9512");
__$coverInitRange("src/snappea-account-sdk.js", "9519:10674");
__$coverInitRange("src/snappea-account-sdk.js", "10681:10890");
__$coverInitRange("src/snappea-account-sdk.js", "10897:11061");
__$coverInitRange("src/snappea-account-sdk.js", "11129:11965");
__$coverInitRange("src/snappea-account-sdk.js", "11972:12006");
__$coverInitRange("src/snappea-account-sdk.js", "12012:12037");
__$coverInitRange("src/snappea-account-sdk.js", "12043:12067");
__$coverInitRange("src/snappea-account-sdk.js", "140:243");
__$coverInitRange("src/snappea-account-sdk.js", "1136:1165");
__$coverInitRange("src/snappea-account-sdk.js", "1176:1193");
__$coverInitRange("src/snappea-account-sdk.js", "1203:1226");
__$coverInitRange("src/snappea-account-sdk.js", "1237:2280");
__$coverInitRange("src/snappea-account-sdk.js", "2291:2314");
__$coverInitRange("src/snappea-account-sdk.js", "1289:1378");
__$coverInitRange("src/snappea-account-sdk.js", "1409:2270");
__$coverInitRange("src/snappea-account-sdk.js", "1767:2034");
__$coverInitRange("src/snappea-account-sdk.js", "1815:1832");
__$coverInitRange("src/snappea-account-sdk.js", "1858:1881");
__$coverInitRange("src/snappea-account-sdk.js", "1907:1936");
__$coverInitRange("src/snappea-account-sdk.js", "1991:2012");
__$coverInitRange("src/snappea-account-sdk.js", "2113:2236");
__$coverInitRange("src/snappea-account-sdk.js", "2370:2387");
__$coverInitRange("src/snappea-account-sdk.js", "2445:2461");
__$coverInitRange("src/snappea-account-sdk.js", "2519:2548");
__$coverInitRange("src/snappea-account-sdk.js", "2559:3153");
__$coverInitRange("src/snappea-account-sdk.js", "3164:3187");
__$coverInitRange("src/snappea-account-sdk.js", "2713:2948");
__$coverInitRange("src/snappea-account-sdk.js", "2757:2775");
__$coverInitRange("src/snappea-account-sdk.js", "2797:2818");
__$coverInitRange("src/snappea-account-sdk.js", "2840:2862");
__$coverInitRange("src/snappea-account-sdk.js", "2909:2930");
__$coverInitRange("src/snappea-account-sdk.js", "3015:3127");
__$coverInitRange("src/snappea-account-sdk.js", "3255:3284");
__$coverInitRange("src/snappea-account-sdk.js", "3295:3312");
__$coverInitRange("src/snappea-account-sdk.js", "3322:3345");
__$coverInitRange("src/snappea-account-sdk.js", "3356:4446");
__$coverInitRange("src/snappea-account-sdk.js", "4457:4480");
__$coverInitRange("src/snappea-account-sdk.js", "3408:3497");
__$coverInitRange("src/snappea-account-sdk.js", "3528:4436");
__$coverInitRange("src/snappea-account-sdk.js", "3932:4199");
__$coverInitRange("src/snappea-account-sdk.js", "3980:3997");
__$coverInitRange("src/snappea-account-sdk.js", "4023:4046");
__$coverInitRange("src/snappea-account-sdk.js", "4072:4101");
__$coverInitRange("src/snappea-account-sdk.js", "4156:4177");
__$coverInitRange("src/snappea-account-sdk.js", "4278:4402");
__$coverInitRange("src/snappea-account-sdk.js", "4562:4591");
__$coverInitRange("src/snappea-account-sdk.js", "4602:5298");
__$coverInitRange("src/snappea-account-sdk.js", "5309:5332");
__$coverInitRange("src/snappea-account-sdk.js", "4644:4733");
__$coverInitRange("src/snappea-account-sdk.js", "4764:5288");
__$coverInitRange("src/snappea-account-sdk.js", "5029:5051");
__$coverInitRange("src/snappea-account-sdk.js", "5130:5254");
__$coverInitRange("src/snappea-account-sdk.js", "5405:5434");
__$coverInitRange("src/snappea-account-sdk.js", "5445:5468");
__$coverInitRange("src/snappea-account-sdk.js", "5479:6075");
__$coverInitRange("src/snappea-account-sdk.js", "6086:6109");
__$coverInitRange("src/snappea-account-sdk.js", "5640:5960");
__$coverInitRange("src/snappea-account-sdk.js", "5684:5701");
__$coverInitRange("src/snappea-account-sdk.js", "5723:5746");
__$coverInitRange("src/snappea-account-sdk.js", "5768:5790");
__$coverInitRange("src/snappea-account-sdk.js", "5837:5855");
__$coverInitRange("src/snappea-account-sdk.js", "5877:5898");
__$coverInitRange("src/snappea-account-sdk.js", "5920:5942");
__$coverInitRange("src/snappea-account-sdk.js", "6027:6049");
__$coverInitRange("src/snappea-account-sdk.js", "6185:6214");
__$coverInitRange("src/snappea-account-sdk.js", "6225:7061");
__$coverInitRange("src/snappea-account-sdk.js", "7072:7095");
__$coverInitRange("src/snappea-account-sdk.js", "6267:6356");
__$coverInitRange("src/snappea-account-sdk.js", "6387:7051");
__$coverInitRange("src/snappea-account-sdk.js", "6646:6814");
__$coverInitRange("src/snappea-account-sdk.js", "6694:6716");
__$coverInitRange("src/snappea-account-sdk.js", "6771:6792");
__$coverInitRange("src/snappea-account-sdk.js", "6893:7017");
__$coverInitRange("src/snappea-account-sdk.js", "7169:7198");
__$coverInitRange("src/snappea-account-sdk.js", "7209:7226");
__$coverInitRange("src/snappea-account-sdk.js", "7236:7259");
__$coverInitRange("src/snappea-account-sdk.js", "7270:8176");
__$coverInitRange("src/snappea-account-sdk.js", "8187:8210");
__$coverInitRange("src/snappea-account-sdk.js", "7364:7453");
__$coverInitRange("src/snappea-account-sdk.js", "7484:8166");
__$coverInitRange("src/snappea-account-sdk.js", "7761:7929");
__$coverInitRange("src/snappea-account-sdk.js", "7809:7831");
__$coverInitRange("src/snappea-account-sdk.js", "7886:7907");
__$coverInitRange("src/snappea-account-sdk.js", "8008:8132");
__$coverInitRange("src/snappea-account-sdk.js", "8283:8312");
__$coverInitRange("src/snappea-account-sdk.js", "8323:8340");
__$coverInitRange("src/snappea-account-sdk.js", "8350:8373");
__$coverInitRange("src/snappea-account-sdk.js", "8384:9471");
__$coverInitRange("src/snappea-account-sdk.js", "9482:9505");
__$coverInitRange("src/snappea-account-sdk.js", "8525:8614");
__$coverInitRange("src/snappea-account-sdk.js", "8645:9461");
__$coverInitRange("src/snappea-account-sdk.js", "9056:9224");
__$coverInitRange("src/snappea-account-sdk.js", "9104:9126");
__$coverInitRange("src/snappea-account-sdk.js", "9181:9202");
__$coverInitRange("src/snappea-account-sdk.js", "9303:9427");
__$coverInitRange("src/snappea-account-sdk.js", "9579:9608");
__$coverInitRange("src/snappea-account-sdk.js", "9619:9636");
__$coverInitRange("src/snappea-account-sdk.js", "9646:9669");
__$coverInitRange("src/snappea-account-sdk.js", "9680:10633");
__$coverInitRange("src/snappea-account-sdk.js", "10644:10667");
__$coverInitRange("src/snappea-account-sdk.js", "9777:9866");
__$coverInitRange("src/snappea-account-sdk.js", "9897:10623");
__$coverInitRange("src/snappea-account-sdk.js", "10218:10386");
__$coverInitRange("src/snappea-account-sdk.js", "10266:10288");
__$coverInitRange("src/snappea-account-sdk.js", "10343:10364");
__$coverInitRange("src/snappea-account-sdk.js", "10465:10589");
__$coverInitRange("src/snappea-account-sdk.js", "10726:10841");
__$coverInitRange("src/snappea-account-sdk.js", "10851:10883");
__$coverInitRange("src/snappea-account-sdk.js", "10948:11012");
__$coverInitRange("src/snappea-account-sdk.js", "11022:11054");
__$coverInitRange("src/snappea-account-sdk.js", "11188:11211");
__$coverInitRange("src/snappea-account-sdk.js", "11222:11288");
__$coverInitRange("src/snappea-account-sdk.js", "11299:11434");
__$coverInitRange("src/snappea-account-sdk.js", "11445:11487");
__$coverInitRange("src/snappea-account-sdk.js", "11497:11520");
__$coverInitRange("src/snappea-account-sdk.js", "11531:11545");
__$coverInitRange("src/snappea-account-sdk.js", "11555:11560");
__$coverInitRange("src/snappea-account-sdk.js", "11570:11735");
__$coverInitRange("src/snappea-account-sdk.js", "11746:11816");
__$coverInitRange("src/snappea-account-sdk.js", "11827:11916");
__$coverInitRange("src/snappea-account-sdk.js", "11927:11958");
__$coverInitRange("src/snappea-account-sdk.js", "11603:11725");
__$coverInitRange("src/snappea-account-sdk.js", "11652:11711");
__$coverInitRange("src/snappea-account-sdk.js", "11863:11906");
__$coverCall('src/snappea-account-sdk.js', '16:12077');
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
    __$coverCall('src/snappea-account-sdk.js', '381:414');
    var PREFIX = HOST + API_VERSION_4;
    __$coverCall('src/snappea-account-sdk.js', '421:871');
    var CONFIG = {
            login: PREFIX + '/login',
            logout: PREFIX + '/logout',
            captcha: PREFIX + '/seccode',
            reg: PREFIX + '/register',
            checkUsername: PREFIX + '/isUsernameExisted',
            checkUserLogin: PREFIX + '/profile',
            findPwd: PREFIX + '/findpassword',
            checkCode: PREFIX + '/checkcode',
            resetPwd: PREFIX + '/resetpassword',
            modifyPwd: PREFIX + '/profile/password'
        };
    __$coverCall('src/snappea-account-sdk.js', '878:963');
    var CONFIG_WEB = { loginWithThirdParty: HOST + '/web/oauth2/{1}/login' };
    __$coverCall('src/snappea-account-sdk.js', '970:983');
    var USER_INFO;
    __$coverCall('src/snappea-account-sdk.js', '989:1011');
    var IS_LOGINED = false;
    __$coverCall('src/snappea-account-sdk.js', '1018:1034');
    var Account = {};
    __$coverCall('src/snappea-account-sdk.js', '1041:1073');
    Account.CAPTCHA = CONFIG.captcha;
    __$coverCall('src/snappea-account-sdk.js', '1080:2321');
    Account.loginAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '1136:1165');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '1176:1193');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '1203:1226');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '1237:2280');
        if (!data.username || !data.password) {
            __$coverCall('src/snappea-account-sdk.js', '1289:1378');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '1409:2270');
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
                    __$coverCall('src/snappea-account-sdk.js', '1767:2034');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '1815:1832');
                        IS_LOGINED = true;
                        __$coverCall('src/snappea-account-sdk.js', '1858:1881');
                        USER_INFO = resp.member;
                        __$coverCall('src/snappea-account-sdk.js', '1907:1936');
                        deferred.resolve(resp.member);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '1991:2012');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '2113:2236');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '2291:2314');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '2328:2394');
    Account.isLogined = function () {
        __$coverCall('src/snappea-account-sdk.js', '2370:2387');
        return IS_LOGINED;
    };
    __$coverCall('src/snappea-account-sdk.js', '2401:2468');
    Account.getUserInfo = function () {
        __$coverCall('src/snappea-account-sdk.js', '2445:2461');
        return USER_INFO;
    };
    __$coverCall('src/snappea-account-sdk.js', '2475:3194');
    Account.logoutAsync = function () {
        __$coverCall('src/snappea-account-sdk.js', '2519:2548');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '2559:3153');
        ajax({
            type: 'POST',
            dataType: 'json',
            url: CONFIG.logout,
            success: function (resp) {
                __$coverCall('src/snappea-account-sdk.js', '2713:2948');
                if (resp.error === 0) {
                    __$coverCall('src/snappea-account-sdk.js', '2757:2775');
                    IS_LOGINED = false;
                    __$coverCall('src/snappea-account-sdk.js', '2797:2818');
                    USER_INFO = undefined;
                    __$coverCall('src/snappea-account-sdk.js', '2840:2862');
                    deferred.resolve(resp);
                } else {
                    __$coverCall('src/snappea-account-sdk.js', '2909:2930');
                    deferred.reject(resp);
                }
            },
            error: function () {
                __$coverCall('src/snappea-account-sdk.js', '3015:3127');
                deferred.reject({
                    error: -1,
                    msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                });
            }
        });
        __$coverCall('src/snappea-account-sdk.js', '3164:3187');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '3201:4487');
    Account.regAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '3255:3284');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '3295:3312');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '3322:3345');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '3356:4446');
        if (!data.username || !data.password) {
            __$coverCall('src/snappea-account-sdk.js', '3408:3497');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '3528:4436');
            ajax({
                type: 'POST',
                dataType: 'json',
                url: CONFIG.reg,
                data: {
                    username: data.username,
                    password: data.password,
                    nick: data.nickname || '',
                    seccode: data.seccode || ''
                },
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '3932:4199');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '3980:3997');
                        IS_LOGINED = true;
                        __$coverCall('src/snappea-account-sdk.js', '4023:4046');
                        USER_INFO = resp.member;
                        __$coverCall('src/snappea-account-sdk.js', '4072:4101');
                        deferred.resolve(resp.member);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '4156:4177');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '4278:4402');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '4457:4480');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '4494:5339');
    Account.checkUsernameAsync = function (username, options) {
        __$coverCall('src/snappea-account-sdk.js', '4562:4591');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '4602:5298');
        if (username === undefined) {
            __$coverCall('src/snappea-account-sdk.js', '4644:4733');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '4764:5288');
            ajax({
                type: 'POST',
                dataType: 'json',
                url: CONFIG.checkUsername,
                data: { username: username },
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '5029:5051');
                    deferred.resolve(resp);
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '5130:5254');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '5309:5332');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '5346:6116');
    Account.checkUserLoginAsync = function (options) {
        __$coverCall('src/snappea-account-sdk.js', '5405:5434');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '5445:5468');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '5479:6075');
        ajax({
            type: 'GET',
            dataType: 'json',
            url: CONFIG.checkUserLogin,
            success: function (resp) {
                __$coverCall('src/snappea-account-sdk.js', '5640:5960');
                if (resp.error === 0) {
                    __$coverCall('src/snappea-account-sdk.js', '5684:5701');
                    IS_LOGINED = true;
                    __$coverCall('src/snappea-account-sdk.js', '5723:5746');
                    USER_INFO = resp.member;
                    __$coverCall('src/snappea-account-sdk.js', '5768:5790');
                    deferred.resolve(true);
                } else {
                    __$coverCall('src/snappea-account-sdk.js', '5837:5855');
                    IS_LOGINED = false;
                    __$coverCall('src/snappea-account-sdk.js', '5877:5898');
                    USER_INFO = undefined;
                    __$coverCall('src/snappea-account-sdk.js', '5920:5942');
                    deferred.reject(false);
                }
            },
            error: function () {
                __$coverCall('src/snappea-account-sdk.js', '6027:6049');
                deferred.reject(false);
            }
        });
        __$coverCall('src/snappea-account-sdk.js', '6086:6109');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '6123:7102');
    Account.findPwdAsync = function (username, options) {
        __$coverCall('src/snappea-account-sdk.js', '6185:6214');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '6225:7061');
        if (username === undefined) {
            __$coverCall('src/snappea-account-sdk.js', '6267:6356');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '6387:7051');
            ajax({
                type: 'POST',
                dataType: 'json',
                url: CONFIG.findPwd,
                data: { username: username },
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '6646:6814');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '6694:6716');
                        deferred.resolve(resp);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '6771:6792');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '6893:7017');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '7072:7095');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '7109:8217');
    Account.checkCodeAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '7169:7198');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '7209:7226');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '7236:7259');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '7270:8176');
        if (data.username === undefined || data.passcode === undefined) {
            __$coverCall('src/snappea-account-sdk.js', '7364:7453');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '7484:8166');
            ajax({
                type: 'POST',
                url: CONFIG.checkCode,
                data: {
                    username: data.username,
                    passcode: data.passcode
                },
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '7761:7929');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '7809:7831');
                        deferred.resolve(resp);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '7886:7907');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '8008:8132');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '8187:8210');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '8224:9512');
    Account.resetPwdAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '8283:8312');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '8323:8340');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '8350:8373');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '8384:9471');
        if (data.username === undefined || data.passcode === undefined || data.password === undefined) {
            __$coverCall('src/snappea-account-sdk.js', '8525:8614');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '8645:9461');
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
                    __$coverCall('src/snappea-account-sdk.js', '9056:9224');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '9104:9126');
                        deferred.resolve(resp);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '9181:9202');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '9303:9427');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '9482:9505');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '9519:10674');
    Account.modifyPwdAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '9579:9608');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '9619:9636');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '9646:9669');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '9680:10633');
        if (data.password === undefined || data.newpassword === undefined) {
            __$coverCall('src/snappea-account-sdk.js', '9777:9866');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '9897:10623');
            ajax({
                type: 'POST',
                dataType: 'json',
                url: CONFIG.modifyPwd,
                data: {
                    oldpassword: data.password,
                    newpassword: data.newpassword
                },
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '10218:10386');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '10266:10288');
                        deferred.resolve(resp);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '10343:10364');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '10465:10589');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '10644:10667');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '10681:10890');
    Account.isEmail = function (input) {
        __$coverCall('src/snappea-account-sdk.js', '10726:10841');
        var EMAIL_PATTREN = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/;
        __$coverCall('src/snappea-account-sdk.js', '10851:10883');
        return EMAIL_PATTREN.test(input);
    };
    __$coverCall('src/snappea-account-sdk.js', '10897:11061');
    Account.isPhoneNumber = function (input) {
        __$coverCall('src/snappea-account-sdk.js', '10948:11012');
        var PHONE_PATTERN = /^(1(([35][0-9])|(47)|[8][01236789]))\d{8}$/;
        __$coverCall('src/snappea-account-sdk.js', '11022:11054');
        return PHONE_PATTERN.test(input);
    };
    __$coverCall('src/snappea-account-sdk.js', '11129:11965');
    Account.loginWithThirdParty = function (options) {
        __$coverCall('src/snappea-account-sdk.js', '11188:11211');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '11222:11288');
        options.callback = options.callback || 'http://www.wandoujia.com/';
        __$coverCall('src/snappea-account-sdk.js', '11299:11434');
        var platforms = {
                weibo: 'sina',
                sina: 'sina',
                renren: 'renren',
                qq: 'qq'
            };
        __$coverCall('src/snappea-account-sdk.js', '11445:11487');
        var platform = platforms[options.platform];
        __$coverCall('src/snappea-account-sdk.js', '11497:11520');
        delete options.platform;
        __$coverCall('src/snappea-account-sdk.js', '11531:11545');
        var datas = [];
        __$coverCall('src/snappea-account-sdk.js', '11555:11560');
        var d;
        __$coverCall('src/snappea-account-sdk.js', '11570:11735');
        for (d in options) {
            __$coverCall('src/snappea-account-sdk.js', '11603:11725');
            if (options.hasOwnProperty(d)) {
                __$coverCall('src/snappea-account-sdk.js', '11652:11711');
                datas.push(d + '=' + global.encodeURIComponent(options[d]));
            }
        }
        __$coverCall('src/snappea-account-sdk.js', '11746:11816');
        var targeURL = CONFIG_WEB.loginWithThirdParty.replace('{1}', platform);
        __$coverCall('src/snappea-account-sdk.js', '11827:11916');
        if (datas.length > 0) {
            __$coverCall('src/snappea-account-sdk.js', '11863:11906');
            targeURL = targeURL + '?' + datas.join('&');
        }
        __$coverCall('src/snappea-account-sdk.js', '11927:11958');
        global.location.href = targeURL;
    };
    __$coverCall('src/snappea-account-sdk.js', '11972:12006');
    var SnapPea = global.SnapPea || {};
    __$coverCall('src/snappea-account-sdk.js', '12012:12037');
    SnapPea.Account = Account;
    __$coverCall('src/snappea-account-sdk.js', '12043:12067');
    global.SnapPea = SnapPea;
}(this));
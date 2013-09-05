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
__$coverInit("src\\snappea-account-sdk.js", "/*global $, Q*/\r\n(function (global) {\r\n    //@@ lib/q/q.js\r\n    var Deferred = Q.defer;\r\n    var ajax = $.ajax;\r\n\r\n    if ($.ajaxSetup) {\r\n        $.ajaxSetup({\r\n            xhrFields : {\r\n                withCredentials : true\r\n            }\r\n        });\r\n    } else {\r\n        // $.ajaxSettings;\r\n    }\r\n\r\n\r\n    var HOST = 'https://account.wandoujia.com';\r\n    var API_VERSION_4 = '/v4/api';\r\n    var API_VERSION_1 = '/v1';\r\n\r\n    var PREFIX = HOST + API_VERSION_4;\r\n\r\n    var CONFIG = {\r\n        login : PREFIX + '/login',\r\n        logout : PREFIX + '/logout',\r\n        captcha : PREFIX + '/seccode',\r\n        reg : PREFIX + '/register',\r\n        checkUsername : PREFIX + '/isUsernameExisted',\r\n        checkUserLogin : PREFIX + '/profile',\r\n        findPwd : PREFIX + '/findpassword',\r\n        checkCode : PREFIX + '/checkcode',\r\n        resetPwd : PREFIX + '/resetpassword'\r\n    };\r\n\r\n    var CONFIG_V1 = {\r\n        loginWithThirdParty : HOST + API_VERSION_1 + '/user/?do=login'\r\n    };\r\n\r\n    var USER_INFO;\r\n    var IS_LOGINED = false;\r\n\r\n    var Account = {};\r\n\r\n    Account.CAPTCHA = CONFIG.captcha;\r\n\r\n    Account.loginAsync = function (data, options) {\r\n        var deferred = new Deferred();\r\n\r\n        data = data || {};\r\n        options = options || {};\r\n\r\n        if (!data.username || !data.password) {\r\n            deferred.reject({\r\n                error : -2,\r\n                msg : '参数不全'\r\n            });\r\n        } else {\r\n            ajax({\r\n                type : 'POST',\r\n                dataType : 'json',\r\n                url : CONFIG.login,\r\n                data : {\r\n                    username : data.username,\r\n                    password : data.password,\r\n                    seccode : data.seccode || ''\r\n                },\r\n                success : function (resp) {\r\n                    if (resp.error === 0) {\r\n                        IS_LOGINED = true;\r\n                        USER_INFO = resp.member;\r\n                        deferred.resolve(resp.member);\r\n                    } else {\r\n                        deferred.reject(resp);\r\n                    }\r\n                },\r\n                error : function () {\r\n                    deferred.reject({\r\n                        error : -1,\r\n                        msg : '请求失败，请检查网络连接状况'\r\n                    });\r\n                }\r\n            });\r\n        }\r\n\r\n        return deferred.promise;\r\n    };\r\n\r\n    Account.isLogined = function () {\r\n        return IS_LOGINED;\r\n    };\r\n\r\n    Account.getUserInfo = function () {\r\n        return USER_INFO;\r\n    };\r\n\r\n    Account.logoutAsync = function () {\r\n        var deferred = new Deferred();\r\n\r\n        ajax({\r\n            type : 'POST',\r\n            dataType : 'json',\r\n            url : CONFIG.logout,\r\n            success : function (resp) {\r\n                if (resp.error === 0) {\r\n                    IS_LOGINED = false;\r\n                    USER_INFO = undefined;\r\n                    deferred.resolve(resp);\r\n                } else {\r\n                    deferred.reject(resp);\r\n                }\r\n            },\r\n            error : function () {\r\n                deferred.reject({\r\n                    error : -1,\r\n                    msg : '请求失败，请检查网络连接状况。'\r\n                });\r\n            }\r\n        });\r\n\r\n        return deferred.promise;\r\n    };\r\n\r\n    Account.regAsync = function (data, options) {\r\n        var deferred = new Deferred();\r\n\r\n        data = data || {};\r\n        options = options || {};\r\n\r\n        if (!data.username || !data.password) {\r\n            deferred.reject({\r\n                error : -2,\r\n                msg : '参数不全'\r\n            });\r\n        } else {\r\n            ajax({\r\n                type : 'POST',\r\n                dataType : 'json',\r\n                url : CONFIG.reg,\r\n                data : {\r\n                    username : data.username,\r\n                    password : data.password,\r\n                    nikename : data.nikename || '',\r\n                    seccode : data.seccode || ''\r\n                },\r\n                success : function (resp) {\r\n                    if (resp.error === 0) {\r\n                        IS_LOGINED = true;\r\n                        USER_INFO = resp.member;\r\n                        deferred.resolve(resp.member);\r\n                    } else {\r\n                        deferred.reject(resp);\r\n                    }\r\n                },\r\n                error : function () {\r\n                    deferred.reject({\r\n                        error : -1,\r\n                        msg : '请求失败，请检查网络连接状况。'\r\n                    });\r\n                }\r\n            });\r\n        }\r\n\r\n        return deferred.promise;\r\n    };\r\n\r\n    Account.checkUsernameAsync = function (username, options) {\r\n        var deferred = new Deferred();\r\n\r\n        if (username === undefined) {\r\n            deferred.reject({\r\n                error : -2,\r\n                msg : '参数不全'\r\n            });\r\n        } else {\r\n            ajax({\r\n                type : 'POST',\r\n                dataType : 'json',\r\n                url : CONFIG.checkUsername,\r\n                data : {\r\n                    username : username\r\n                },\r\n                success : function (resp) {\r\n                    deferred.resolve(resp);\r\n                },\r\n                error : function () {\r\n                    deferred.reject({\r\n                        error : -1,\r\n                        msg : '请求失败，请检查网络连接状况。'\r\n                    });\r\n                }\r\n            });\r\n        }\r\n\r\n        return deferred.promise;\r\n    };\r\n\r\n    Account.checkUserLoginAsync = function (options) {\r\n        var deferred = new Deferred();\r\n\r\n        options = options || {};\r\n\r\n        ajax({\r\n            type : 'GET',\r\n            dataType : 'json',\r\n            url : CONFIG.checkUserLogin,\r\n            success : function (resp) {\r\n                if (resp.error === 0) {\r\n                    IS_LOGINED = true;\r\n                    USER_INFO = resp.member;\r\n                    deferred.resolve(true);\r\n                } else {\r\n                    IS_LOGINED = false;\r\n                    USER_INFO = undefined;\r\n                    deferred.reject(false);\r\n                }\r\n            },\r\n            error : function () {\r\n                deferred.reject(false);\r\n            }\r\n        });\r\n\r\n        return deferred.promise;\r\n    };\r\n\r\n    Account.findPwdAsync = function (username, options) {\r\n        var deferred = new Deferred();\r\n\r\n        if (username === undefined) {\r\n            deferred.reject({\r\n                error : -2,\r\n                msg : '参数不全'\r\n            });\r\n        } else {\r\n            ajax({\r\n                type : 'POST',\r\n                dataType : 'json',\r\n                url : CONFIG.findPwd,\r\n                data : {\r\n                    username : username\r\n                },\r\n                success : function (resp) {\r\n                    if (resp.error === 0) {\r\n                        deferred.resolve(resp);\r\n                    } else {\r\n                        deferred.reject(resp);\r\n                    }\r\n                },\r\n                error : function () {\r\n                    deferred.reject({\r\n                        error : -1,\r\n                        msg : '请求失败，请检查网络连接状况。'\r\n                    });\r\n                }\r\n            });\r\n        }\r\n\r\n        return deferred.promise;\r\n    };\r\n\r\n    Account.checkCodeAsync = function (data, options) {\r\n        var deferred = new Deferred();\r\n\r\n        data = data || {};\r\n        options = options || {};\r\n\r\n        if (data.username === undefined ||\r\n                data.passcode === undefined) {\r\n            deferred.reject({\r\n                error : -2,\r\n                msg : '参数不全'\r\n            });\r\n        } else {\r\n            ajax({\r\n                type : 'POST',\r\n                url : CONFIG.checkCode,\r\n                data : {\r\n                    username : data.username,\r\n                    passcode : data.passcode\r\n                },\r\n                success : function (resp) {\r\n                    if (resp.error === 0) {\r\n                        deferred.resolve(resp);\r\n                    } else {\r\n                        deferred.reject(resp);\r\n                    }\r\n                },\r\n                error : function () {\r\n                    deferred.reject({\r\n                        error : -1,\r\n                        msg : '请求失败，请检查网络连接状况。'\r\n                    });\r\n                }\r\n            });\r\n        }\r\n\r\n        return deferred.promise;\r\n    };\r\n\r\n    Account.resetPwdAsync = function (data, options) {\r\n        var deferred = new Deferred();\r\n\r\n        data = data || {};\r\n        options = options || {};\r\n\r\n        if (data.username === undefined ||\r\n                data.passcode === undefined ||\r\n                data.password === undefined) {\r\n            deferred.reject({\r\n                error : -2,\r\n                msg : '参数不全'\r\n            });\r\n        } else {\r\n            ajax({\r\n                type : 'POST',\r\n                dataType : 'json',\r\n                url : CONFIG.resetPwd,\r\n                data : {\r\n                    username : data.username,\r\n                    passcode : data.passcode,\r\n                    password : data.password,\r\n                    repeatedpassword : data.password\r\n                },\r\n                success : function (resp) {\r\n                    if (resp.error === 0) {\r\n                        deferred.resolve(resp);\r\n                    } else {\r\n                        deferred.reject(resp);\r\n                    }\r\n                },\r\n                error : function () {\r\n                    deferred.reject({\r\n                        error : -1,\r\n                        msg : '请求失败，请检查网络连接状况。'\r\n                    });\r\n                }\r\n            });\r\n        }\r\n\r\n        return deferred.promise;\r\n    };\r\n\r\n    Account.isEmail = function (input) {\r\n        var EMAIL_PATTREN = /^[A-Za-z0-9](([_\\.\\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\\.\\-]?[a-zA-Z0-9]+)*)\\.([A-Za-z]{2,})$/;\r\n        return EMAIL_PATTREN.test(input);\r\n    };\r\n\r\n    Account.isPhoneNumber = function (input) {\r\n        var PHONE_PATTERN = /^(1(([35][0-9])|(47)|[8][01236789]))\\d{8}$/;\r\n        return PHONE_PATTERN.test(input);\r\n    };\r\n\r\n    /* `platform` could be one of `weibo`, `qq`, `renren` */\r\n    Account.loginWithThirdParty = function (options) {\r\n        options = options || {};\r\n\r\n        options.callback = options.callback || 'http://www.wandoujia.com/';\r\n\r\n        var platforms = {\r\n            weibo : 'sina',\r\n            sina : 'sina',\r\n            renren : 'renren',\r\n            qq : 'qq'\r\n        };\r\n\r\n        options.platform = platforms[options.platform];\r\n\r\n        var datas = [];\r\n        var d;\r\n        for (d in options) {\r\n            if (options.hasOwnProperty(d)) {\r\n                datas.push(d + '=' + global.encodeURIComponent(options[d]));\r\n            }\r\n        }\r\n\r\n        var targeURL = CONFIG_V1.loginWithThirdParty;\r\n\r\n        if (datas.length > 0) {\r\n            targeURL = targeURL + '&' + datas.join('&');\r\n        }\r\n\r\n        global.location.href = targeURL;\r\n    };\r\n\r\n    var SnapPea = global.SnapPea || {};\r\n    SnapPea.Account = Account;\r\n    global.SnapPea = SnapPea;\r\n}(this));\r\n");
__$coverInitRange("src\\snappea-account-sdk.js", "17:11241");
__$coverInitRange("src\\snappea-account-sdk.js", "64:86");
__$coverInitRange("src\\snappea-account-sdk.js", "93:110");
__$coverInitRange("src\\snappea-account-sdk.js", "119:303");
__$coverInitRange("src\\snappea-account-sdk.js", "314:356");
__$coverInitRange("src\\snappea-account-sdk.js", "363:392");
__$coverInitRange("src\\snappea-account-sdk.js", "399:424");
__$coverInitRange("src\\snappea-account-sdk.js", "433:466");
__$coverInitRange("src\\snappea-account-sdk.js", "475:885");
__$coverInitRange("src\\snappea-account-sdk.js", "894:990");
__$coverInitRange("src\\snappea-account-sdk.js", "999:1012");
__$coverInitRange("src\\snappea-account-sdk.js", "1019:1041");
__$coverInitRange("src\\snappea-account-sdk.js", "1050:1066");
__$coverInitRange("src\\snappea-account-sdk.js", "1075:1107");
__$coverInitRange("src\\snappea-account-sdk.js", "1116:2397");
__$coverInitRange("src\\snappea-account-sdk.js", "2406:2474");
__$coverInitRange("src\\snappea-account-sdk.js", "2483:2552");
__$coverInitRange("src\\snappea-account-sdk.js", "2561:3305");
__$coverInitRange("src\\snappea-account-sdk.js", "3314:4645");
__$coverInitRange("src\\snappea-account-sdk.js", "4654:5528");
__$coverInitRange("src\\snappea-account-sdk.js", "5537:6333");
__$coverInitRange("src\\snappea-account-sdk.js", "6342:7354");
__$coverInitRange("src\\snappea-account-sdk.js", "7363:8508");
__$coverInitRange("src\\snappea-account-sdk.js", "8517:9846");
__$coverInitRange("src\\snappea-account-sdk.js", "9855:10067");
__$coverInitRange("src\\snappea-account-sdk.js", "10076:10243");
__$coverInitRange("src\\snappea-account-sdk.js", "10314:11124");
__$coverInitRange("src\\snappea-account-sdk.js", "11133:11167");
__$coverInitRange("src\\snappea-account-sdk.js", "11174:11199");
__$coverInitRange("src\\snappea-account-sdk.js", "11206:11230");
__$coverInitRange("src\\snappea-account-sdk.js", "147:254");
__$coverInitRange("src\\snappea-account-sdk.js", "1173:1202");
__$coverInitRange("src\\snappea-account-sdk.js", "1215:1232");
__$coverInitRange("src\\snappea-account-sdk.js", "1243:1266");
__$coverInitRange("src\\snappea-account-sdk.js", "1279:2353");
__$coverInitRange("src\\snappea-account-sdk.js", "2366:2389");
__$coverInitRange("src\\snappea-account-sdk.js", "1332:1424");
__$coverInitRange("src\\snappea-account-sdk.js", "1457:2342");
__$coverInitRange("src\\snappea-account-sdk.js", "1825:2098");
__$coverInitRange("src\\snappea-account-sdk.js", "1874:1891");
__$coverInitRange("src\\snappea-account-sdk.js", "1918:1941");
__$coverInitRange("src\\snappea-account-sdk.js", "1968:1997");
__$coverInitRange("src\\snappea-account-sdk.js", "2054:2075");
__$coverInitRange("src\\snappea-account-sdk.js", "2180:2306");
__$coverInitRange("src\\snappea-account-sdk.js", "2449:2466");
__$coverInitRange("src\\snappea-account-sdk.js", "2528:2544");
__$coverInitRange("src\\snappea-account-sdk.js", "2606:2635");
__$coverInitRange("src\\snappea-account-sdk.js", "2648:3261");
__$coverInitRange("src\\snappea-account-sdk.js", "3274:3297");
__$coverInitRange("src\\snappea-account-sdk.js", "2807:3048");
__$coverInitRange("src\\snappea-account-sdk.js", "2852:2870");
__$coverInitRange("src\\snappea-account-sdk.js", "2893:2914");
__$coverInitRange("src\\snappea-account-sdk.js", "2937:2959");
__$coverInitRange("src\\snappea-account-sdk.js", "3008:3029");
__$coverInitRange("src\\snappea-account-sdk.js", "3118:3233");
__$coverInitRange("src\\snappea-account-sdk.js", "3369:3398");
__$coverInitRange("src\\snappea-account-sdk.js", "3411:3428");
__$coverInitRange("src\\snappea-account-sdk.js", "3439:3462");
__$coverInitRange("src\\snappea-account-sdk.js", "3475:4601");
__$coverInitRange("src\\snappea-account-sdk.js", "4614:4637");
__$coverInitRange("src\\snappea-account-sdk.js", "3528:3620");
__$coverInitRange("src\\snappea-account-sdk.js", "3653:4590");
__$coverInitRange("src\\snappea-account-sdk.js", "4072:4345");
__$coverInitRange("src\\snappea-account-sdk.js", "4121:4138");
__$coverInitRange("src\\snappea-account-sdk.js", "4165:4188");
__$coverInitRange("src\\snappea-account-sdk.js", "4215:4244");
__$coverInitRange("src\\snappea-account-sdk.js", "4301:4322");
__$coverInitRange("src\\snappea-account-sdk.js", "4427:4554");
__$coverInitRange("src\\snappea-account-sdk.js", "4723:4752");
__$coverInitRange("src\\snappea-account-sdk.js", "4765:5484");
__$coverInitRange("src\\snappea-account-sdk.js", "5497:5520");
__$coverInitRange("src\\snappea-account-sdk.js", "4808:4900");
__$coverInitRange("src\\snappea-account-sdk.js", "4933:5473");
__$coverInitRange("src\\snappea-account-sdk.js", "5206:5228");
__$coverInitRange("src\\snappea-account-sdk.js", "5310:5437");
__$coverInitRange("src\\snappea-account-sdk.js", "5597:5626");
__$coverInitRange("src\\snappea-account-sdk.js", "5639:5662");
__$coverInitRange("src\\snappea-account-sdk.js", "5675:6289");
__$coverInitRange("src\\snappea-account-sdk.js", "6302:6325");
__$coverInitRange("src\\snappea-account-sdk.js", "5841:6169");
__$coverInitRange("src\\snappea-account-sdk.js", "5886:5903");
__$coverInitRange("src\\snappea-account-sdk.js", "5926:5949");
__$coverInitRange("src\\snappea-account-sdk.js", "5972:5994");
__$coverInitRange("src\\snappea-account-sdk.js", "6043:6061");
__$coverInitRange("src\\snappea-account-sdk.js", "6084:6105");
__$coverInitRange("src\\snappea-account-sdk.js", "6128:6150");
__$coverInitRange("src\\snappea-account-sdk.js", "6239:6261");
__$coverInitRange("src\\snappea-account-sdk.js", "6405:6434");
__$coverInitRange("src\\snappea-account-sdk.js", "6447:7310");
__$coverInitRange("src\\snappea-account-sdk.js", "7323:7346");
__$coverInitRange("src\\snappea-account-sdk.js", "6490:6582");
__$coverInitRange("src\\snappea-account-sdk.js", "6615:7299");
__$coverInitRange("src\\snappea-account-sdk.js", "6882:7054");
__$coverInitRange("src\\snappea-account-sdk.js", "6931:6953");
__$coverInitRange("src\\snappea-account-sdk.js", "7010:7031");
__$coverInitRange("src\\snappea-account-sdk.js", "7136:7263");
__$coverInitRange("src\\snappea-account-sdk.js", "7424:7453");
__$coverInitRange("src\\snappea-account-sdk.js", "7466:7483");
__$coverInitRange("src\\snappea-account-sdk.js", "7494:7517");
__$coverInitRange("src\\snappea-account-sdk.js", "7530:8464");
__$coverInitRange("src\\snappea-account-sdk.js", "8477:8500");
__$coverInitRange("src\\snappea-account-sdk.js", "7626:7718");
__$coverInitRange("src\\snappea-account-sdk.js", "7751:8453");
__$coverInitRange("src\\snappea-account-sdk.js", "8036:8208");
__$coverInitRange("src\\snappea-account-sdk.js", "8085:8107");
__$coverInitRange("src\\snappea-account-sdk.js", "8164:8185");
__$coverInitRange("src\\snappea-account-sdk.js", "8290:8417");
__$coverInitRange("src\\snappea-account-sdk.js", "8577:8606");
__$coverInitRange("src\\snappea-account-sdk.js", "8619:8636");
__$coverInitRange("src\\snappea-account-sdk.js", "8647:8670");
__$coverInitRange("src\\snappea-account-sdk.js", "8683:9802");
__$coverInitRange("src\\snappea-account-sdk.js", "9815:9838");
__$coverInitRange("src\\snappea-account-sdk.js", "8827:8919");
__$coverInitRange("src\\snappea-account-sdk.js", "8952:9791");
__$coverInitRange("src\\snappea-account-sdk.js", "9374:9546");
__$coverInitRange("src\\snappea-account-sdk.js", "9423:9445");
__$coverInitRange("src\\snappea-account-sdk.js", "9502:9523");
__$coverInitRange("src\\snappea-account-sdk.js", "9628:9755");
__$coverInitRange("src\\snappea-account-sdk.js", "9901:10016");
__$coverInitRange("src\\snappea-account-sdk.js", "10027:10059");
__$coverInitRange("src\\snappea-account-sdk.js", "10128:10192");
__$coverInitRange("src\\snappea-account-sdk.js", "10203:10235");
__$coverInitRange("src\\snappea-account-sdk.js", "10374:10397");
__$coverInitRange("src\\snappea-account-sdk.js", "10410:10476");
__$coverInitRange("src\\snappea-account-sdk.js", "10489:10629");
__$coverInitRange("src\\snappea-account-sdk.js", "10642:10688");
__$coverInitRange("src\\snappea-account-sdk.js", "10701:10715");
__$coverInitRange("src\\snappea-account-sdk.js", "10726:10731");
__$coverInitRange("src\\snappea-account-sdk.js", "10742:10911");
__$coverInitRange("src\\snappea-account-sdk.js", "10924:10968");
__$coverInitRange("src\\snappea-account-sdk.js", "10981:11072");
__$coverInitRange("src\\snappea-account-sdk.js", "11085:11116");
__$coverInitRange("src\\snappea-account-sdk.js", "10776:10900");
__$coverInitRange("src\\snappea-account-sdk.js", "10826:10885");
__$coverInitRange("src\\snappea-account-sdk.js", "11018:11061");
__$coverCall('src\\snappea-account-sdk.js', '17:11241');
(function (global) {
    __$coverCall('src\\snappea-account-sdk.js', '64:86');
    var Deferred = Q.defer;
    __$coverCall('src\\snappea-account-sdk.js', '93:110');
    var ajax = $.ajax;
    __$coverCall('src\\snappea-account-sdk.js', '119:303');
    if ($.ajaxSetup) {
        __$coverCall('src\\snappea-account-sdk.js', '147:254');
        $.ajaxSetup({ xhrFields: { withCredentials: true } });
    } else {
    }
    __$coverCall('src\\snappea-account-sdk.js', '314:356');
    var HOST = 'https://account.wandoujia.com';
    __$coverCall('src\\snappea-account-sdk.js', '363:392');
    var API_VERSION_4 = '/v4/api';
    __$coverCall('src\\snappea-account-sdk.js', '399:424');
    var API_VERSION_1 = '/v1';
    __$coverCall('src\\snappea-account-sdk.js', '433:466');
    var PREFIX = HOST + API_VERSION_4;
    __$coverCall('src\\snappea-account-sdk.js', '475:885');
    var CONFIG = {
            login: PREFIX + '/login',
            logout: PREFIX + '/logout',
            captcha: PREFIX + '/seccode',
            reg: PREFIX + '/register',
            checkUsername: PREFIX + '/isUsernameExisted',
            checkUserLogin: PREFIX + '/profile',
            findPwd: PREFIX + '/findpassword',
            checkCode: PREFIX + '/checkcode',
            resetPwd: PREFIX + '/resetpassword'
        };
    __$coverCall('src\\snappea-account-sdk.js', '894:990');
    var CONFIG_V1 = { loginWithThirdParty: HOST + API_VERSION_1 + '/user/?do=login' };
    __$coverCall('src\\snappea-account-sdk.js', '999:1012');
    var USER_INFO;
    __$coverCall('src\\snappea-account-sdk.js', '1019:1041');
    var IS_LOGINED = false;
    __$coverCall('src\\snappea-account-sdk.js', '1050:1066');
    var Account = {};
    __$coverCall('src\\snappea-account-sdk.js', '1075:1107');
    Account.CAPTCHA = CONFIG.captcha;
    __$coverCall('src\\snappea-account-sdk.js', '1116:2397');
    Account.loginAsync = function (data, options) {
        __$coverCall('src\\snappea-account-sdk.js', '1173:1202');
        var deferred = new Deferred();
        __$coverCall('src\\snappea-account-sdk.js', '1215:1232');
        data = data || {};
        __$coverCall('src\\snappea-account-sdk.js', '1243:1266');
        options = options || {};
        __$coverCall('src\\snappea-account-sdk.js', '1279:2353');
        if (!data.username || !data.password) {
            __$coverCall('src\\snappea-account-sdk.js', '1332:1424');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src\\snappea-account-sdk.js', '1457:2342');
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
                    __$coverCall('src\\snappea-account-sdk.js', '1825:2098');
                    if (resp.error === 0) {
                        __$coverCall('src\\snappea-account-sdk.js', '1874:1891');
                        IS_LOGINED = true;
                        __$coverCall('src\\snappea-account-sdk.js', '1918:1941');
                        USER_INFO = resp.member;
                        __$coverCall('src\\snappea-account-sdk.js', '1968:1997');
                        deferred.resolve(resp.member);
                    } else {
                        __$coverCall('src\\snappea-account-sdk.js', '2054:2075');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src\\snappea-account-sdk.js', '2180:2306');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5'
                    });
                }
            });
        }
        __$coverCall('src\\snappea-account-sdk.js', '2366:2389');
        return deferred.promise;
    };
    __$coverCall('src\\snappea-account-sdk.js', '2406:2474');
    Account.isLogined = function () {
        __$coverCall('src\\snappea-account-sdk.js', '2449:2466');
        return IS_LOGINED;
    };
    __$coverCall('src\\snappea-account-sdk.js', '2483:2552');
    Account.getUserInfo = function () {
        __$coverCall('src\\snappea-account-sdk.js', '2528:2544');
        return USER_INFO;
    };
    __$coverCall('src\\snappea-account-sdk.js', '2561:3305');
    Account.logoutAsync = function () {
        __$coverCall('src\\snappea-account-sdk.js', '2606:2635');
        var deferred = new Deferred();
        __$coverCall('src\\snappea-account-sdk.js', '2648:3261');
        ajax({
            type: 'POST',
            dataType: 'json',
            url: CONFIG.logout,
            success: function (resp) {
                __$coverCall('src\\snappea-account-sdk.js', '2807:3048');
                if (resp.error === 0) {
                    __$coverCall('src\\snappea-account-sdk.js', '2852:2870');
                    IS_LOGINED = false;
                    __$coverCall('src\\snappea-account-sdk.js', '2893:2914');
                    USER_INFO = undefined;
                    __$coverCall('src\\snappea-account-sdk.js', '2937:2959');
                    deferred.resolve(resp);
                } else {
                    __$coverCall('src\\snappea-account-sdk.js', '3008:3029');
                    deferred.reject(resp);
                }
            },
            error: function () {
                __$coverCall('src\\snappea-account-sdk.js', '3118:3233');
                deferred.reject({
                    error: -1,
                    msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                });
            }
        });
        __$coverCall('src\\snappea-account-sdk.js', '3274:3297');
        return deferred.promise;
    };
    __$coverCall('src\\snappea-account-sdk.js', '3314:4645');
    Account.regAsync = function (data, options) {
        __$coverCall('src\\snappea-account-sdk.js', '3369:3398');
        var deferred = new Deferred();
        __$coverCall('src\\snappea-account-sdk.js', '3411:3428');
        data = data || {};
        __$coverCall('src\\snappea-account-sdk.js', '3439:3462');
        options = options || {};
        __$coverCall('src\\snappea-account-sdk.js', '3475:4601');
        if (!data.username || !data.password) {
            __$coverCall('src\\snappea-account-sdk.js', '3528:3620');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src\\snappea-account-sdk.js', '3653:4590');
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
                    __$coverCall('src\\snappea-account-sdk.js', '4072:4345');
                    if (resp.error === 0) {
                        __$coverCall('src\\snappea-account-sdk.js', '4121:4138');
                        IS_LOGINED = true;
                        __$coverCall('src\\snappea-account-sdk.js', '4165:4188');
                        USER_INFO = resp.member;
                        __$coverCall('src\\snappea-account-sdk.js', '4215:4244');
                        deferred.resolve(resp.member);
                    } else {
                        __$coverCall('src\\snappea-account-sdk.js', '4301:4322');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src\\snappea-account-sdk.js', '4427:4554');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src\\snappea-account-sdk.js', '4614:4637');
        return deferred.promise;
    };
    __$coverCall('src\\snappea-account-sdk.js', '4654:5528');
    Account.checkUsernameAsync = function (username, options) {
        __$coverCall('src\\snappea-account-sdk.js', '4723:4752');
        var deferred = new Deferred();
        __$coverCall('src\\snappea-account-sdk.js', '4765:5484');
        if (username === undefined) {
            __$coverCall('src\\snappea-account-sdk.js', '4808:4900');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src\\snappea-account-sdk.js', '4933:5473');
            ajax({
                type: 'POST',
                dataType: 'json',
                url: CONFIG.checkUsername,
                data: { username: username },
                success: function (resp) {
                    __$coverCall('src\\snappea-account-sdk.js', '5206:5228');
                    deferred.resolve(resp);
                },
                error: function () {
                    __$coverCall('src\\snappea-account-sdk.js', '5310:5437');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src\\snappea-account-sdk.js', '5497:5520');
        return deferred.promise;
    };
    __$coverCall('src\\snappea-account-sdk.js', '5537:6333');
    Account.checkUserLoginAsync = function (options) {
        __$coverCall('src\\snappea-account-sdk.js', '5597:5626');
        var deferred = new Deferred();
        __$coverCall('src\\snappea-account-sdk.js', '5639:5662');
        options = options || {};
        __$coverCall('src\\snappea-account-sdk.js', '5675:6289');
        ajax({
            type: 'GET',
            dataType: 'json',
            url: CONFIG.checkUserLogin,
            success: function (resp) {
                __$coverCall('src\\snappea-account-sdk.js', '5841:6169');
                if (resp.error === 0) {
                    __$coverCall('src\\snappea-account-sdk.js', '5886:5903');
                    IS_LOGINED = true;
                    __$coverCall('src\\snappea-account-sdk.js', '5926:5949');
                    USER_INFO = resp.member;
                    __$coverCall('src\\snappea-account-sdk.js', '5972:5994');
                    deferred.resolve(true);
                } else {
                    __$coverCall('src\\snappea-account-sdk.js', '6043:6061');
                    IS_LOGINED = false;
                    __$coverCall('src\\snappea-account-sdk.js', '6084:6105');
                    USER_INFO = undefined;
                    __$coverCall('src\\snappea-account-sdk.js', '6128:6150');
                    deferred.reject(false);
                }
            },
            error: function () {
                __$coverCall('src\\snappea-account-sdk.js', '6239:6261');
                deferred.reject(false);
            }
        });
        __$coverCall('src\\snappea-account-sdk.js', '6302:6325');
        return deferred.promise;
    };
    __$coverCall('src\\snappea-account-sdk.js', '6342:7354');
    Account.findPwdAsync = function (username, options) {
        __$coverCall('src\\snappea-account-sdk.js', '6405:6434');
        var deferred = new Deferred();
        __$coverCall('src\\snappea-account-sdk.js', '6447:7310');
        if (username === undefined) {
            __$coverCall('src\\snappea-account-sdk.js', '6490:6582');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src\\snappea-account-sdk.js', '6615:7299');
            ajax({
                type: 'POST',
                dataType: 'json',
                url: CONFIG.findPwd,
                data: { username: username },
                success: function (resp) {
                    __$coverCall('src\\snappea-account-sdk.js', '6882:7054');
                    if (resp.error === 0) {
                        __$coverCall('src\\snappea-account-sdk.js', '6931:6953');
                        deferred.resolve(resp);
                    } else {
                        __$coverCall('src\\snappea-account-sdk.js', '7010:7031');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src\\snappea-account-sdk.js', '7136:7263');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src\\snappea-account-sdk.js', '7323:7346');
        return deferred.promise;
    };
    __$coverCall('src\\snappea-account-sdk.js', '7363:8508');
    Account.checkCodeAsync = function (data, options) {
        __$coverCall('src\\snappea-account-sdk.js', '7424:7453');
        var deferred = new Deferred();
        __$coverCall('src\\snappea-account-sdk.js', '7466:7483');
        data = data || {};
        __$coverCall('src\\snappea-account-sdk.js', '7494:7517');
        options = options || {};
        __$coverCall('src\\snappea-account-sdk.js', '7530:8464');
        if (data.username === undefined || data.passcode === undefined) {
            __$coverCall('src\\snappea-account-sdk.js', '7626:7718');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src\\snappea-account-sdk.js', '7751:8453');
            ajax({
                type: 'POST',
                url: CONFIG.checkCode,
                data: {
                    username: data.username,
                    passcode: data.passcode
                },
                success: function (resp) {
                    __$coverCall('src\\snappea-account-sdk.js', '8036:8208');
                    if (resp.error === 0) {
                        __$coverCall('src\\snappea-account-sdk.js', '8085:8107');
                        deferred.resolve(resp);
                    } else {
                        __$coverCall('src\\snappea-account-sdk.js', '8164:8185');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src\\snappea-account-sdk.js', '8290:8417');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src\\snappea-account-sdk.js', '8477:8500');
        return deferred.promise;
    };
    __$coverCall('src\\snappea-account-sdk.js', '8517:9846');
    Account.resetPwdAsync = function (data, options) {
        __$coverCall('src\\snappea-account-sdk.js', '8577:8606');
        var deferred = new Deferred();
        __$coverCall('src\\snappea-account-sdk.js', '8619:8636');
        data = data || {};
        __$coverCall('src\\snappea-account-sdk.js', '8647:8670');
        options = options || {};
        __$coverCall('src\\snappea-account-sdk.js', '8683:9802');
        if (data.username === undefined || data.passcode === undefined || data.password === undefined) {
            __$coverCall('src\\snappea-account-sdk.js', '8827:8919');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src\\snappea-account-sdk.js', '8952:9791');
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
                    __$coverCall('src\\snappea-account-sdk.js', '9374:9546');
                    if (resp.error === 0) {
                        __$coverCall('src\\snappea-account-sdk.js', '9423:9445');
                        deferred.resolve(resp);
                    } else {
                        __$coverCall('src\\snappea-account-sdk.js', '9502:9523');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src\\snappea-account-sdk.js', '9628:9755');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src\\snappea-account-sdk.js', '9815:9838');
        return deferred.promise;
    };
    __$coverCall('src\\snappea-account-sdk.js', '9855:10067');
    Account.isEmail = function (input) {
        __$coverCall('src\\snappea-account-sdk.js', '9901:10016');
        var EMAIL_PATTREN = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/;
        __$coverCall('src\\snappea-account-sdk.js', '10027:10059');
        return EMAIL_PATTREN.test(input);
    };
    __$coverCall('src\\snappea-account-sdk.js', '10076:10243');
    Account.isPhoneNumber = function (input) {
        __$coverCall('src\\snappea-account-sdk.js', '10128:10192');
        var PHONE_PATTERN = /^(1(([35][0-9])|(47)|[8][01236789]))\d{8}$/;
        __$coverCall('src\\snappea-account-sdk.js', '10203:10235');
        return PHONE_PATTERN.test(input);
    };
    __$coverCall('src\\snappea-account-sdk.js', '10314:11124');
    Account.loginWithThirdParty = function (options) {
        __$coverCall('src\\snappea-account-sdk.js', '10374:10397');
        options = options || {};
        __$coverCall('src\\snappea-account-sdk.js', '10410:10476');
        options.callback = options.callback || 'http://www.wandoujia.com/';
        __$coverCall('src\\snappea-account-sdk.js', '10489:10629');
        var platforms = {
                weibo: 'sina',
                sina: 'sina',
                renren: 'renren',
                qq: 'qq'
            };
        __$coverCall('src\\snappea-account-sdk.js', '10642:10688');
        options.platform = platforms[options.platform];
        __$coverCall('src\\snappea-account-sdk.js', '10701:10715');
        var datas = [];
        __$coverCall('src\\snappea-account-sdk.js', '10726:10731');
        var d;
        __$coverCall('src\\snappea-account-sdk.js', '10742:10911');
        for (d in options) {
            __$coverCall('src\\snappea-account-sdk.js', '10776:10900');
            if (options.hasOwnProperty(d)) {
                __$coverCall('src\\snappea-account-sdk.js', '10826:10885');
                datas.push(d + '=' + global.encodeURIComponent(options[d]));
            }
        }
        __$coverCall('src\\snappea-account-sdk.js', '10924:10968');
        var targeURL = CONFIG_V1.loginWithThirdParty;
        __$coverCall('src\\snappea-account-sdk.js', '10981:11072');
        if (datas.length > 0) {
            __$coverCall('src\\snappea-account-sdk.js', '11018:11061');
            targeURL = targeURL + '&' + datas.join('&');
        }
        __$coverCall('src\\snappea-account-sdk.js', '11085:11116');
        global.location.href = targeURL;
    };
    __$coverCall('src\\snappea-account-sdk.js', '11133:11167');
    var SnapPea = global.SnapPea || {};
    __$coverCall('src\\snappea-account-sdk.js', '11174:11199');
    SnapPea.Account = Account;
    __$coverCall('src\\snappea-account-sdk.js', '11206:11230');
    global.SnapPea = SnapPea;
}(this));
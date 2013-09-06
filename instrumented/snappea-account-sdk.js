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
__$coverInit("src\\snappea-account-sdk.js", "/*global $, Q*/\r\n(function (global) {\r\n    //@@ lib/q/q.js\r\n    var Deferred = Q.defer;\r\n    var ajax = $.ajax;\r\n\r\n    if ($.ajaxSetup) {\r\n        $.ajaxSetup({\r\n            xhrFields : {\r\n                withCredentials : true\r\n            }\r\n        });\r\n    } else {\r\n        // $.ajaxSettings;\r\n    }\r\n\r\n\r\n    var HOST = 'https://account.wandoujia.com';\r\n    var API_VERSION_4 = '/v4/api';\r\n    var API_VERSION_1 = '/v1';\r\n\r\n    var PREFIX = HOST + API_VERSION_4;\r\n\r\n    var CONFIG = {\r\n        login : PREFIX + '/login',\r\n        logout : PREFIX + '/logout',\r\n        captcha : PREFIX + '/seccode',\r\n        reg : PREFIX + '/register',\r\n        checkUsername : PREFIX + '/isUsernameExisted',\r\n        checkUserLogin : PREFIX + '/profile',\r\n        findPwd : PREFIX + '/findpassword',\r\n        checkCode : PREFIX + '/checkcode',\r\n        resetPwd : PREFIX + '/resetpassword',\r\n        modifyPwd : PREFIX + '/profile/password'\r\n    };\r\n\r\n    var CONFIG_V1 = {\r\n        loginWithThirdParty : HOST + API_VERSION_1 + '/user/?do=login'\r\n    };\r\n\r\n    var USER_INFO;\r\n    var IS_LOGINED = false;\r\n\r\n    var Account = {};\r\n\r\n    Account.CAPTCHA = CONFIG.captcha;\r\n\r\n    Account.loginAsync = function (data, options) {\r\n        var deferred = new Deferred();\r\n\r\n        data = data || {};\r\n        options = options || {};\r\n\r\n        if (!data.username || !data.password) {\r\n            deferred.reject({\r\n                error : -2,\r\n                msg : '参数不全'\r\n            });\r\n        } else {\r\n            ajax({\r\n                type : 'POST',\r\n                dataType : 'json',\r\n                url : CONFIG.login,\r\n                data : {\r\n                    username : data.username,\r\n                    password : data.password,\r\n                    seccode : data.seccode || ''\r\n                },\r\n                success : function (resp) {\r\n                    if (resp.error === 0) {\r\n                        IS_LOGINED = true;\r\n                        USER_INFO = resp.member;\r\n                        deferred.resolve(resp.member);\r\n                    } else {\r\n                        deferred.reject(resp);\r\n                    }\r\n                },\r\n                error : function () {\r\n                    deferred.reject({\r\n                        error : -1,\r\n                        msg : '请求失败，请检查网络连接状况'\r\n                    });\r\n                }\r\n            });\r\n        }\r\n\r\n        return deferred.promise;\r\n    };\r\n\r\n    Account.isLogined = function () {\r\n        return IS_LOGINED;\r\n    };\r\n\r\n    Account.getUserInfo = function () {\r\n        return USER_INFO;\r\n    };\r\n\r\n    Account.logoutAsync = function () {\r\n        var deferred = new Deferred();\r\n\r\n        ajax({\r\n            type : 'POST',\r\n            dataType : 'json',\r\n            url : CONFIG.logout,\r\n            success : function (resp) {\r\n                if (resp.error === 0) {\r\n                    IS_LOGINED = false;\r\n                    USER_INFO = undefined;\r\n                    deferred.resolve(resp);\r\n                } else {\r\n                    deferred.reject(resp);\r\n                }\r\n            },\r\n            error : function () {\r\n                deferred.reject({\r\n                    error : -1,\r\n                    msg : '请求失败，请检查网络连接状况。'\r\n                });\r\n            }\r\n        });\r\n\r\n        return deferred.promise;\r\n    };\r\n\r\n    Account.regAsync = function (data, options) {\r\n        var deferred = new Deferred();\r\n\r\n        data = data || {};\r\n        options = options || {};\r\n\r\n        if (!data.username || !data.password) {\r\n            deferred.reject({\r\n                error : -2,\r\n                msg : '参数不全'\r\n            });\r\n        } else {\r\n            ajax({\r\n                type : 'POST',\r\n                dataType : 'json',\r\n                url : CONFIG.reg,\r\n                data : {\r\n                    username : data.username,\r\n                    password : data.password,\r\n                    nikename : data.nikename || '',\r\n                    seccode : data.seccode || ''\r\n                },\r\n                success : function (resp) {\r\n                    if (resp.error === 0) {\r\n                        IS_LOGINED = true;\r\n                        USER_INFO = resp.member;\r\n                        deferred.resolve(resp.member);\r\n                    } else {\r\n                        deferred.reject(resp);\r\n                    }\r\n                },\r\n                error : function () {\r\n                    deferred.reject({\r\n                        error : -1,\r\n                        msg : '请求失败，请检查网络连接状况。'\r\n                    });\r\n                }\r\n            });\r\n        }\r\n\r\n        return deferred.promise;\r\n    };\r\n\r\n    Account.checkUsernameAsync = function (username, options) {\r\n        var deferred = new Deferred();\r\n\r\n        if (username === undefined) {\r\n            deferred.reject({\r\n                error : -2,\r\n                msg : '参数不全'\r\n            });\r\n        } else {\r\n            ajax({\r\n                type : 'POST',\r\n                dataType : 'json',\r\n                url : CONFIG.checkUsername,\r\n                data : {\r\n                    username : username\r\n                },\r\n                success : function (resp) {\r\n                    deferred.resolve(resp);\r\n                },\r\n                error : function () {\r\n                    deferred.reject({\r\n                        error : -1,\r\n                        msg : '请求失败，请检查网络连接状况。'\r\n                    });\r\n                }\r\n            });\r\n        }\r\n\r\n        return deferred.promise;\r\n    };\r\n\r\n    Account.checkUserLoginAsync = function (options) {\r\n        var deferred = new Deferred();\r\n\r\n        options = options || {};\r\n\r\n        ajax({\r\n            type : 'GET',\r\n            dataType : 'json',\r\n            url : CONFIG.checkUserLogin,\r\n            success : function (resp) {\r\n                if (resp.error === 0) {\r\n                    IS_LOGINED = true;\r\n                    USER_INFO = resp.member;\r\n                    deferred.resolve(true);\r\n                } else {\r\n                    IS_LOGINED = false;\r\n                    USER_INFO = undefined;\r\n                    deferred.reject(false);\r\n                }\r\n            },\r\n            error : function () {\r\n                deferred.reject(false);\r\n            }\r\n        });\r\n\r\n        return deferred.promise;\r\n    };\r\n\r\n    Account.findPwdAsync = function (username, options) {\r\n        var deferred = new Deferred();\r\n\r\n        if (username === undefined) {\r\n            deferred.reject({\r\n                error : -2,\r\n                msg : '参数不全'\r\n            });\r\n        } else {\r\n            ajax({\r\n                type : 'POST',\r\n                dataType : 'json',\r\n                url : CONFIG.findPwd,\r\n                data : {\r\n                    username : username\r\n                },\r\n                success : function (resp) {\r\n                    if (resp.error === 0) {\r\n                        deferred.resolve(resp);\r\n                    } else {\r\n                        deferred.reject(resp);\r\n                    }\r\n                },\r\n                error : function () {\r\n                    deferred.reject({\r\n                        error : -1,\r\n                        msg : '请求失败，请检查网络连接状况。'\r\n                    });\r\n                }\r\n            });\r\n        }\r\n\r\n        return deferred.promise;\r\n    };\r\n\r\n    Account.checkCodeAsync = function (data, options) {\r\n        var deferred = new Deferred();\r\n\r\n        data = data || {};\r\n        options = options || {};\r\n\r\n        if (data.username === undefined ||\r\n                data.passcode === undefined) {\r\n            deferred.reject({\r\n                error : -2,\r\n                msg : '参数不全'\r\n            });\r\n        } else {\r\n            ajax({\r\n                type : 'POST',\r\n                url : CONFIG.checkCode,\r\n                data : {\r\n                    username : data.username,\r\n                    passcode : data.passcode\r\n                },\r\n                success : function (resp) {\r\n                    if (resp.error === 0) {\r\n                        deferred.resolve(resp);\r\n                    } else {\r\n                        deferred.reject(resp);\r\n                    }\r\n                },\r\n                error : function () {\r\n                    deferred.reject({\r\n                        error : -1,\r\n                        msg : '请求失败，请检查网络连接状况。'\r\n                    });\r\n                }\r\n            });\r\n        }\r\n\r\n        return deferred.promise;\r\n    };\r\n\r\n    Account.resetPwdAsync = function (data, options) {\r\n        var deferred = new Deferred();\r\n\r\n        data = data || {};\r\n        options = options || {};\r\n\r\n        if (data.username === undefined ||\r\n                data.passcode === undefined ||\r\n                data.password === undefined) {\r\n            deferred.reject({\r\n                error : -2,\r\n                msg : '参数不全'\r\n            });\r\n        } else {\r\n            ajax({\r\n                type : 'POST',\r\n                dataType : 'json',\r\n                url : CONFIG.resetPwd,\r\n                data : {\r\n                    username : data.username,\r\n                    passcode : data.passcode,\r\n                    password : data.password,\r\n                    repeatedpassword : data.password\r\n                },\r\n                success : function (resp) {\r\n                    if (resp.error === 0) {\r\n                        deferred.resolve(resp);\r\n                    } else {\r\n                        deferred.reject(resp);\r\n                    }\r\n                },\r\n                error : function () {\r\n                    deferred.reject({\r\n                        error : -1,\r\n                        msg : '请求失败，请检查网络连接状况。'\r\n                    });\r\n                }\r\n            });\r\n        }\r\n\r\n        return deferred.promise;\r\n    };\r\n\r\n    Account.modifyPwdAsync = function (data, options) {\r\n        var deferred = new Deferred();\r\n\r\n        data = data || {};\r\n        options = options || {};\r\n\r\n        if (data.password === undefined ||\r\n                data.newpassword === undefined) {\r\n            deferred.reject({\r\n                error : -2,\r\n                msg : '参数不全'\r\n            });\r\n        } else {\r\n            ajax({\r\n                type : 'POST',\r\n                dataType : 'json',\r\n                url : CONFIG.modifyPwd,\r\n                data : {\r\n                    oldpassword : data.password,\r\n                    newpassword : data.newpassword\r\n                },\r\n                success : function (resp) {\r\n                    if (resp.error === 0) {\r\n                        deferred.resolve(resp);\r\n                    } else {\r\n                        deferred.reject(resp);\r\n                    }\r\n                },\r\n                error : function () {\r\n                    deferred.reject({\r\n                        error : -1,\r\n                        msg : '请求失败，请检查网络连接状况。'\r\n                    });\r\n                }\r\n            });\r\n        }\r\n\r\n        return deferred.promise;\r\n    };\r\n\r\n    Account.isEmail = function (input) {\r\n        var EMAIL_PATTREN = /^[A-Za-z0-9](([_\\.\\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\\.\\-]?[a-zA-Z0-9]+)*)\\.([A-Za-z]{2,})$/;\r\n        return EMAIL_PATTREN.test(input);\r\n    };\r\n\r\n    Account.isPhoneNumber = function (input) {\r\n        var PHONE_PATTERN = /^(1(([35][0-9])|(47)|[8][01236789]))\\d{8}$/;\r\n        return PHONE_PATTERN.test(input);\r\n    };\r\n\r\n    /* `platform` could be one of `weibo`, `qq`, `renren` */\r\n    Account.loginWithThirdParty = function (options) {\r\n        options = options || {};\r\n\r\n        options.callback = options.callback || 'http://www.wandoujia.com/';\r\n\r\n        var platforms = {\r\n            weibo : 'sina',\r\n            sina : 'sina',\r\n            renren : 'renren',\r\n            qq : 'qq'\r\n        };\r\n\r\n        options.platform = platforms[options.platform];\r\n\r\n        var datas = [];\r\n        var d;\r\n        for (d in options) {\r\n            if (options.hasOwnProperty(d)) {\r\n                datas.push(d + '=' + global.encodeURIComponent(options[d]));\r\n            }\r\n        }\r\n\r\n        var targeURL = CONFIG_V1.loginWithThirdParty;\r\n\r\n        if (datas.length > 0) {\r\n            targeURL = targeURL + '&' + datas.join('&');\r\n        }\r\n\r\n        global.location.href = targeURL;\r\n    };\r\n\r\n    var SnapPea = global.SnapPea || {};\r\n    SnapPea.Account = Account;\r\n    global.SnapPea = SnapPea;\r\n}(this));\r\n");
__$coverInitRange("src\\snappea-account-sdk.js", "17:12494");
__$coverInitRange("src\\snappea-account-sdk.js", "64:86");
__$coverInitRange("src\\snappea-account-sdk.js", "93:110");
__$coverInitRange("src\\snappea-account-sdk.js", "119:303");
__$coverInitRange("src\\snappea-account-sdk.js", "314:356");
__$coverInitRange("src\\snappea-account-sdk.js", "363:392");
__$coverInitRange("src\\snappea-account-sdk.js", "399:424");
__$coverInitRange("src\\snappea-account-sdk.js", "433:466");
__$coverInitRange("src\\snappea-account-sdk.js", "475:936");
__$coverInitRange("src\\snappea-account-sdk.js", "945:1041");
__$coverInitRange("src\\snappea-account-sdk.js", "1050:1063");
__$coverInitRange("src\\snappea-account-sdk.js", "1070:1092");
__$coverInitRange("src\\snappea-account-sdk.js", "1101:1117");
__$coverInitRange("src\\snappea-account-sdk.js", "1126:1158");
__$coverInitRange("src\\snappea-account-sdk.js", "1167:2448");
__$coverInitRange("src\\snappea-account-sdk.js", "2457:2525");
__$coverInitRange("src\\snappea-account-sdk.js", "2534:2603");
__$coverInitRange("src\\snappea-account-sdk.js", "2612:3356");
__$coverInitRange("src\\snappea-account-sdk.js", "3365:4696");
__$coverInitRange("src\\snappea-account-sdk.js", "4705:5579");
__$coverInitRange("src\\snappea-account-sdk.js", "5588:6384");
__$coverInitRange("src\\snappea-account-sdk.js", "6393:7405");
__$coverInitRange("src\\snappea-account-sdk.js", "7414:8559");
__$coverInitRange("src\\snappea-account-sdk.js", "8568:9897");
__$coverInitRange("src\\snappea-account-sdk.js", "9906:11099");
__$coverInitRange("src\\snappea-account-sdk.js", "11108:11320");
__$coverInitRange("src\\snappea-account-sdk.js", "11329:11496");
__$coverInitRange("src\\snappea-account-sdk.js", "11567:12377");
__$coverInitRange("src\\snappea-account-sdk.js", "12386:12420");
__$coverInitRange("src\\snappea-account-sdk.js", "12427:12452");
__$coverInitRange("src\\snappea-account-sdk.js", "12459:12483");
__$coverInitRange("src\\snappea-account-sdk.js", "147:254");
__$coverInitRange("src\\snappea-account-sdk.js", "1224:1253");
__$coverInitRange("src\\snappea-account-sdk.js", "1266:1283");
__$coverInitRange("src\\snappea-account-sdk.js", "1294:1317");
__$coverInitRange("src\\snappea-account-sdk.js", "1330:2404");
__$coverInitRange("src\\snappea-account-sdk.js", "2417:2440");
__$coverInitRange("src\\snappea-account-sdk.js", "1383:1475");
__$coverInitRange("src\\snappea-account-sdk.js", "1508:2393");
__$coverInitRange("src\\snappea-account-sdk.js", "1876:2149");
__$coverInitRange("src\\snappea-account-sdk.js", "1925:1942");
__$coverInitRange("src\\snappea-account-sdk.js", "1969:1992");
__$coverInitRange("src\\snappea-account-sdk.js", "2019:2048");
__$coverInitRange("src\\snappea-account-sdk.js", "2105:2126");
__$coverInitRange("src\\snappea-account-sdk.js", "2231:2357");
__$coverInitRange("src\\snappea-account-sdk.js", "2500:2517");
__$coverInitRange("src\\snappea-account-sdk.js", "2579:2595");
__$coverInitRange("src\\snappea-account-sdk.js", "2657:2686");
__$coverInitRange("src\\snappea-account-sdk.js", "2699:3312");
__$coverInitRange("src\\snappea-account-sdk.js", "3325:3348");
__$coverInitRange("src\\snappea-account-sdk.js", "2858:3099");
__$coverInitRange("src\\snappea-account-sdk.js", "2903:2921");
__$coverInitRange("src\\snappea-account-sdk.js", "2944:2965");
__$coverInitRange("src\\snappea-account-sdk.js", "2988:3010");
__$coverInitRange("src\\snappea-account-sdk.js", "3059:3080");
__$coverInitRange("src\\snappea-account-sdk.js", "3169:3284");
__$coverInitRange("src\\snappea-account-sdk.js", "3420:3449");
__$coverInitRange("src\\snappea-account-sdk.js", "3462:3479");
__$coverInitRange("src\\snappea-account-sdk.js", "3490:3513");
__$coverInitRange("src\\snappea-account-sdk.js", "3526:4652");
__$coverInitRange("src\\snappea-account-sdk.js", "4665:4688");
__$coverInitRange("src\\snappea-account-sdk.js", "3579:3671");
__$coverInitRange("src\\snappea-account-sdk.js", "3704:4641");
__$coverInitRange("src\\snappea-account-sdk.js", "4123:4396");
__$coverInitRange("src\\snappea-account-sdk.js", "4172:4189");
__$coverInitRange("src\\snappea-account-sdk.js", "4216:4239");
__$coverInitRange("src\\snappea-account-sdk.js", "4266:4295");
__$coverInitRange("src\\snappea-account-sdk.js", "4352:4373");
__$coverInitRange("src\\snappea-account-sdk.js", "4478:4605");
__$coverInitRange("src\\snappea-account-sdk.js", "4774:4803");
__$coverInitRange("src\\snappea-account-sdk.js", "4816:5535");
__$coverInitRange("src\\snappea-account-sdk.js", "5548:5571");
__$coverInitRange("src\\snappea-account-sdk.js", "4859:4951");
__$coverInitRange("src\\snappea-account-sdk.js", "4984:5524");
__$coverInitRange("src\\snappea-account-sdk.js", "5257:5279");
__$coverInitRange("src\\snappea-account-sdk.js", "5361:5488");
__$coverInitRange("src\\snappea-account-sdk.js", "5648:5677");
__$coverInitRange("src\\snappea-account-sdk.js", "5690:5713");
__$coverInitRange("src\\snappea-account-sdk.js", "5726:6340");
__$coverInitRange("src\\snappea-account-sdk.js", "6353:6376");
__$coverInitRange("src\\snappea-account-sdk.js", "5892:6220");
__$coverInitRange("src\\snappea-account-sdk.js", "5937:5954");
__$coverInitRange("src\\snappea-account-sdk.js", "5977:6000");
__$coverInitRange("src\\snappea-account-sdk.js", "6023:6045");
__$coverInitRange("src\\snappea-account-sdk.js", "6094:6112");
__$coverInitRange("src\\snappea-account-sdk.js", "6135:6156");
__$coverInitRange("src\\snappea-account-sdk.js", "6179:6201");
__$coverInitRange("src\\snappea-account-sdk.js", "6290:6312");
__$coverInitRange("src\\snappea-account-sdk.js", "6456:6485");
__$coverInitRange("src\\snappea-account-sdk.js", "6498:7361");
__$coverInitRange("src\\snappea-account-sdk.js", "7374:7397");
__$coverInitRange("src\\snappea-account-sdk.js", "6541:6633");
__$coverInitRange("src\\snappea-account-sdk.js", "6666:7350");
__$coverInitRange("src\\snappea-account-sdk.js", "6933:7105");
__$coverInitRange("src\\snappea-account-sdk.js", "6982:7004");
__$coverInitRange("src\\snappea-account-sdk.js", "7061:7082");
__$coverInitRange("src\\snappea-account-sdk.js", "7187:7314");
__$coverInitRange("src\\snappea-account-sdk.js", "7475:7504");
__$coverInitRange("src\\snappea-account-sdk.js", "7517:7534");
__$coverInitRange("src\\snappea-account-sdk.js", "7545:7568");
__$coverInitRange("src\\snappea-account-sdk.js", "7581:8515");
__$coverInitRange("src\\snappea-account-sdk.js", "8528:8551");
__$coverInitRange("src\\snappea-account-sdk.js", "7677:7769");
__$coverInitRange("src\\snappea-account-sdk.js", "7802:8504");
__$coverInitRange("src\\snappea-account-sdk.js", "8087:8259");
__$coverInitRange("src\\snappea-account-sdk.js", "8136:8158");
__$coverInitRange("src\\snappea-account-sdk.js", "8215:8236");
__$coverInitRange("src\\snappea-account-sdk.js", "8341:8468");
__$coverInitRange("src\\snappea-account-sdk.js", "8628:8657");
__$coverInitRange("src\\snappea-account-sdk.js", "8670:8687");
__$coverInitRange("src\\snappea-account-sdk.js", "8698:8721");
__$coverInitRange("src\\snappea-account-sdk.js", "8734:9853");
__$coverInitRange("src\\snappea-account-sdk.js", "9866:9889");
__$coverInitRange("src\\snappea-account-sdk.js", "8878:8970");
__$coverInitRange("src\\snappea-account-sdk.js", "9003:9842");
__$coverInitRange("src\\snappea-account-sdk.js", "9425:9597");
__$coverInitRange("src\\snappea-account-sdk.js", "9474:9496");
__$coverInitRange("src\\snappea-account-sdk.js", "9553:9574");
__$coverInitRange("src\\snappea-account-sdk.js", "9679:9806");
__$coverInitRange("src\\snappea-account-sdk.js", "9967:9996");
__$coverInitRange("src\\snappea-account-sdk.js", "10009:10026");
__$coverInitRange("src\\snappea-account-sdk.js", "10037:10060");
__$coverInitRange("src\\snappea-account-sdk.js", "10073:11055");
__$coverInitRange("src\\snappea-account-sdk.js", "11068:11091");
__$coverInitRange("src\\snappea-account-sdk.js", "10172:10264");
__$coverInitRange("src\\snappea-account-sdk.js", "10297:11044");
__$coverInitRange("src\\snappea-account-sdk.js", "10627:10799");
__$coverInitRange("src\\snappea-account-sdk.js", "10676:10698");
__$coverInitRange("src\\snappea-account-sdk.js", "10755:10776");
__$coverInitRange("src\\snappea-account-sdk.js", "10881:11008");
__$coverInitRange("src\\snappea-account-sdk.js", "11154:11269");
__$coverInitRange("src\\snappea-account-sdk.js", "11280:11312");
__$coverInitRange("src\\snappea-account-sdk.js", "11381:11445");
__$coverInitRange("src\\snappea-account-sdk.js", "11456:11488");
__$coverInitRange("src\\snappea-account-sdk.js", "11627:11650");
__$coverInitRange("src\\snappea-account-sdk.js", "11663:11729");
__$coverInitRange("src\\snappea-account-sdk.js", "11742:11882");
__$coverInitRange("src\\snappea-account-sdk.js", "11895:11941");
__$coverInitRange("src\\snappea-account-sdk.js", "11954:11968");
__$coverInitRange("src\\snappea-account-sdk.js", "11979:11984");
__$coverInitRange("src\\snappea-account-sdk.js", "11995:12164");
__$coverInitRange("src\\snappea-account-sdk.js", "12177:12221");
__$coverInitRange("src\\snappea-account-sdk.js", "12234:12325");
__$coverInitRange("src\\snappea-account-sdk.js", "12338:12369");
__$coverInitRange("src\\snappea-account-sdk.js", "12029:12153");
__$coverInitRange("src\\snappea-account-sdk.js", "12079:12138");
__$coverInitRange("src\\snappea-account-sdk.js", "12271:12314");
__$coverCall('src\\snappea-account-sdk.js', '17:12494');
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
    __$coverCall('src\\snappea-account-sdk.js', '475:936');
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
    __$coverCall('src\\snappea-account-sdk.js', '945:1041');
    var CONFIG_V1 = { loginWithThirdParty: HOST + API_VERSION_1 + '/user/?do=login' };
    __$coverCall('src\\snappea-account-sdk.js', '1050:1063');
    var USER_INFO;
    __$coverCall('src\\snappea-account-sdk.js', '1070:1092');
    var IS_LOGINED = false;
    __$coverCall('src\\snappea-account-sdk.js', '1101:1117');
    var Account = {};
    __$coverCall('src\\snappea-account-sdk.js', '1126:1158');
    Account.CAPTCHA = CONFIG.captcha;
    __$coverCall('src\\snappea-account-sdk.js', '1167:2448');
    Account.loginAsync = function (data, options) {
        __$coverCall('src\\snappea-account-sdk.js', '1224:1253');
        var deferred = new Deferred();
        __$coverCall('src\\snappea-account-sdk.js', '1266:1283');
        data = data || {};
        __$coverCall('src\\snappea-account-sdk.js', '1294:1317');
        options = options || {};
        __$coverCall('src\\snappea-account-sdk.js', '1330:2404');
        if (!data.username || !data.password) {
            __$coverCall('src\\snappea-account-sdk.js', '1383:1475');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src\\snappea-account-sdk.js', '1508:2393');
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
                    __$coverCall('src\\snappea-account-sdk.js', '1876:2149');
                    if (resp.error === 0) {
                        __$coverCall('src\\snappea-account-sdk.js', '1925:1942');
                        IS_LOGINED = true;
                        __$coverCall('src\\snappea-account-sdk.js', '1969:1992');
                        USER_INFO = resp.member;
                        __$coverCall('src\\snappea-account-sdk.js', '2019:2048');
                        deferred.resolve(resp.member);
                    } else {
                        __$coverCall('src\\snappea-account-sdk.js', '2105:2126');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src\\snappea-account-sdk.js', '2231:2357');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5'
                    });
                }
            });
        }
        __$coverCall('src\\snappea-account-sdk.js', '2417:2440');
        return deferred.promise;
    };
    __$coverCall('src\\snappea-account-sdk.js', '2457:2525');
    Account.isLogined = function () {
        __$coverCall('src\\snappea-account-sdk.js', '2500:2517');
        return IS_LOGINED;
    };
    __$coverCall('src\\snappea-account-sdk.js', '2534:2603');
    Account.getUserInfo = function () {
        __$coverCall('src\\snappea-account-sdk.js', '2579:2595');
        return USER_INFO;
    };
    __$coverCall('src\\snappea-account-sdk.js', '2612:3356');
    Account.logoutAsync = function () {
        __$coverCall('src\\snappea-account-sdk.js', '2657:2686');
        var deferred = new Deferred();
        __$coverCall('src\\snappea-account-sdk.js', '2699:3312');
        ajax({
            type: 'POST',
            dataType: 'json',
            url: CONFIG.logout,
            success: function (resp) {
                __$coverCall('src\\snappea-account-sdk.js', '2858:3099');
                if (resp.error === 0) {
                    __$coverCall('src\\snappea-account-sdk.js', '2903:2921');
                    IS_LOGINED = false;
                    __$coverCall('src\\snappea-account-sdk.js', '2944:2965');
                    USER_INFO = undefined;
                    __$coverCall('src\\snappea-account-sdk.js', '2988:3010');
                    deferred.resolve(resp);
                } else {
                    __$coverCall('src\\snappea-account-sdk.js', '3059:3080');
                    deferred.reject(resp);
                }
            },
            error: function () {
                __$coverCall('src\\snappea-account-sdk.js', '3169:3284');
                deferred.reject({
                    error: -1,
                    msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                });
            }
        });
        __$coverCall('src\\snappea-account-sdk.js', '3325:3348');
        return deferred.promise;
    };
    __$coverCall('src\\snappea-account-sdk.js', '3365:4696');
    Account.regAsync = function (data, options) {
        __$coverCall('src\\snappea-account-sdk.js', '3420:3449');
        var deferred = new Deferred();
        __$coverCall('src\\snappea-account-sdk.js', '3462:3479');
        data = data || {};
        __$coverCall('src\\snappea-account-sdk.js', '3490:3513');
        options = options || {};
        __$coverCall('src\\snappea-account-sdk.js', '3526:4652');
        if (!data.username || !data.password) {
            __$coverCall('src\\snappea-account-sdk.js', '3579:3671');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src\\snappea-account-sdk.js', '3704:4641');
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
                    __$coverCall('src\\snappea-account-sdk.js', '4123:4396');
                    if (resp.error === 0) {
                        __$coverCall('src\\snappea-account-sdk.js', '4172:4189');
                        IS_LOGINED = true;
                        __$coverCall('src\\snappea-account-sdk.js', '4216:4239');
                        USER_INFO = resp.member;
                        __$coverCall('src\\snappea-account-sdk.js', '4266:4295');
                        deferred.resolve(resp.member);
                    } else {
                        __$coverCall('src\\snappea-account-sdk.js', '4352:4373');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src\\snappea-account-sdk.js', '4478:4605');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src\\snappea-account-sdk.js', '4665:4688');
        return deferred.promise;
    };
    __$coverCall('src\\snappea-account-sdk.js', '4705:5579');
    Account.checkUsernameAsync = function (username, options) {
        __$coverCall('src\\snappea-account-sdk.js', '4774:4803');
        var deferred = new Deferred();
        __$coverCall('src\\snappea-account-sdk.js', '4816:5535');
        if (username === undefined) {
            __$coverCall('src\\snappea-account-sdk.js', '4859:4951');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src\\snappea-account-sdk.js', '4984:5524');
            ajax({
                type: 'POST',
                dataType: 'json',
                url: CONFIG.checkUsername,
                data: { username: username },
                success: function (resp) {
                    __$coverCall('src\\snappea-account-sdk.js', '5257:5279');
                    deferred.resolve(resp);
                },
                error: function () {
                    __$coverCall('src\\snappea-account-sdk.js', '5361:5488');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src\\snappea-account-sdk.js', '5548:5571');
        return deferred.promise;
    };
    __$coverCall('src\\snappea-account-sdk.js', '5588:6384');
    Account.checkUserLoginAsync = function (options) {
        __$coverCall('src\\snappea-account-sdk.js', '5648:5677');
        var deferred = new Deferred();
        __$coverCall('src\\snappea-account-sdk.js', '5690:5713');
        options = options || {};
        __$coverCall('src\\snappea-account-sdk.js', '5726:6340');
        ajax({
            type: 'GET',
            dataType: 'json',
            url: CONFIG.checkUserLogin,
            success: function (resp) {
                __$coverCall('src\\snappea-account-sdk.js', '5892:6220');
                if (resp.error === 0) {
                    __$coverCall('src\\snappea-account-sdk.js', '5937:5954');
                    IS_LOGINED = true;
                    __$coverCall('src\\snappea-account-sdk.js', '5977:6000');
                    USER_INFO = resp.member;
                    __$coverCall('src\\snappea-account-sdk.js', '6023:6045');
                    deferred.resolve(true);
                } else {
                    __$coverCall('src\\snappea-account-sdk.js', '6094:6112');
                    IS_LOGINED = false;
                    __$coverCall('src\\snappea-account-sdk.js', '6135:6156');
                    USER_INFO = undefined;
                    __$coverCall('src\\snappea-account-sdk.js', '6179:6201');
                    deferred.reject(false);
                }
            },
            error: function () {
                __$coverCall('src\\snappea-account-sdk.js', '6290:6312');
                deferred.reject(false);
            }
        });
        __$coverCall('src\\snappea-account-sdk.js', '6353:6376');
        return deferred.promise;
    };
    __$coverCall('src\\snappea-account-sdk.js', '6393:7405');
    Account.findPwdAsync = function (username, options) {
        __$coverCall('src\\snappea-account-sdk.js', '6456:6485');
        var deferred = new Deferred();
        __$coverCall('src\\snappea-account-sdk.js', '6498:7361');
        if (username === undefined) {
            __$coverCall('src\\snappea-account-sdk.js', '6541:6633');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src\\snappea-account-sdk.js', '6666:7350');
            ajax({
                type: 'POST',
                dataType: 'json',
                url: CONFIG.findPwd,
                data: { username: username },
                success: function (resp) {
                    __$coverCall('src\\snappea-account-sdk.js', '6933:7105');
                    if (resp.error === 0) {
                        __$coverCall('src\\snappea-account-sdk.js', '6982:7004');
                        deferred.resolve(resp);
                    } else {
                        __$coverCall('src\\snappea-account-sdk.js', '7061:7082');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src\\snappea-account-sdk.js', '7187:7314');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src\\snappea-account-sdk.js', '7374:7397');
        return deferred.promise;
    };
    __$coverCall('src\\snappea-account-sdk.js', '7414:8559');
    Account.checkCodeAsync = function (data, options) {
        __$coverCall('src\\snappea-account-sdk.js', '7475:7504');
        var deferred = new Deferred();
        __$coverCall('src\\snappea-account-sdk.js', '7517:7534');
        data = data || {};
        __$coverCall('src\\snappea-account-sdk.js', '7545:7568');
        options = options || {};
        __$coverCall('src\\snappea-account-sdk.js', '7581:8515');
        if (data.username === undefined || data.passcode === undefined) {
            __$coverCall('src\\snappea-account-sdk.js', '7677:7769');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src\\snappea-account-sdk.js', '7802:8504');
            ajax({
                type: 'POST',
                url: CONFIG.checkCode,
                data: {
                    username: data.username,
                    passcode: data.passcode
                },
                success: function (resp) {
                    __$coverCall('src\\snappea-account-sdk.js', '8087:8259');
                    if (resp.error === 0) {
                        __$coverCall('src\\snappea-account-sdk.js', '8136:8158');
                        deferred.resolve(resp);
                    } else {
                        __$coverCall('src\\snappea-account-sdk.js', '8215:8236');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src\\snappea-account-sdk.js', '8341:8468');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src\\snappea-account-sdk.js', '8528:8551');
        return deferred.promise;
    };
    __$coverCall('src\\snappea-account-sdk.js', '8568:9897');
    Account.resetPwdAsync = function (data, options) {
        __$coverCall('src\\snappea-account-sdk.js', '8628:8657');
        var deferred = new Deferred();
        __$coverCall('src\\snappea-account-sdk.js', '8670:8687');
        data = data || {};
        __$coverCall('src\\snappea-account-sdk.js', '8698:8721');
        options = options || {};
        __$coverCall('src\\snappea-account-sdk.js', '8734:9853');
        if (data.username === undefined || data.passcode === undefined || data.password === undefined) {
            __$coverCall('src\\snappea-account-sdk.js', '8878:8970');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src\\snappea-account-sdk.js', '9003:9842');
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
                    __$coverCall('src\\snappea-account-sdk.js', '9425:9597');
                    if (resp.error === 0) {
                        __$coverCall('src\\snappea-account-sdk.js', '9474:9496');
                        deferred.resolve(resp);
                    } else {
                        __$coverCall('src\\snappea-account-sdk.js', '9553:9574');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src\\snappea-account-sdk.js', '9679:9806');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src\\snappea-account-sdk.js', '9866:9889');
        return deferred.promise;
    };
    __$coverCall('src\\snappea-account-sdk.js', '9906:11099');
    Account.modifyPwdAsync = function (data, options) {
        __$coverCall('src\\snappea-account-sdk.js', '9967:9996');
        var deferred = new Deferred();
        __$coverCall('src\\snappea-account-sdk.js', '10009:10026');
        data = data || {};
        __$coverCall('src\\snappea-account-sdk.js', '10037:10060');
        options = options || {};
        __$coverCall('src\\snappea-account-sdk.js', '10073:11055');
        if (data.password === undefined || data.newpassword === undefined) {
            __$coverCall('src\\snappea-account-sdk.js', '10172:10264');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src\\snappea-account-sdk.js', '10297:11044');
            ajax({
                type: 'POST',
                dataType: 'json',
                url: CONFIG.modifyPwd,
                data: {
                    oldpassword: data.password,
                    newpassword: data.newpassword
                },
                success: function (resp) {
                    __$coverCall('src\\snappea-account-sdk.js', '10627:10799');
                    if (resp.error === 0) {
                        __$coverCall('src\\snappea-account-sdk.js', '10676:10698');
                        deferred.resolve(resp);
                    } else {
                        __$coverCall('src\\snappea-account-sdk.js', '10755:10776');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src\\snappea-account-sdk.js', '10881:11008');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src\\snappea-account-sdk.js', '11068:11091');
        return deferred.promise;
    };
    __$coverCall('src\\snappea-account-sdk.js', '11108:11320');
    Account.isEmail = function (input) {
        __$coverCall('src\\snappea-account-sdk.js', '11154:11269');
        var EMAIL_PATTREN = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/;
        __$coverCall('src\\snappea-account-sdk.js', '11280:11312');
        return EMAIL_PATTREN.test(input);
    };
    __$coverCall('src\\snappea-account-sdk.js', '11329:11496');
    Account.isPhoneNumber = function (input) {
        __$coverCall('src\\snappea-account-sdk.js', '11381:11445');
        var PHONE_PATTERN = /^(1(([35][0-9])|(47)|[8][01236789]))\d{8}$/;
        __$coverCall('src\\snappea-account-sdk.js', '11456:11488');
        return PHONE_PATTERN.test(input);
    };
    __$coverCall('src\\snappea-account-sdk.js', '11567:12377');
    Account.loginWithThirdParty = function (options) {
        __$coverCall('src\\snappea-account-sdk.js', '11627:11650');
        options = options || {};
        __$coverCall('src\\snappea-account-sdk.js', '11663:11729');
        options.callback = options.callback || 'http://www.wandoujia.com/';
        __$coverCall('src\\snappea-account-sdk.js', '11742:11882');
        var platforms = {
                weibo: 'sina',
                sina: 'sina',
                renren: 'renren',
                qq: 'qq'
            };
        __$coverCall('src\\snappea-account-sdk.js', '11895:11941');
        options.platform = platforms[options.platform];
        __$coverCall('src\\snappea-account-sdk.js', '11954:11968');
        var datas = [];
        __$coverCall('src\\snappea-account-sdk.js', '11979:11984');
        var d;
        __$coverCall('src\\snappea-account-sdk.js', '11995:12164');
        for (d in options) {
            __$coverCall('src\\snappea-account-sdk.js', '12029:12153');
            if (options.hasOwnProperty(d)) {
                __$coverCall('src\\snappea-account-sdk.js', '12079:12138');
                datas.push(d + '=' + global.encodeURIComponent(options[d]));
            }
        }
        __$coverCall('src\\snappea-account-sdk.js', '12177:12221');
        var targeURL = CONFIG_V1.loginWithThirdParty;
        __$coverCall('src\\snappea-account-sdk.js', '12234:12325');
        if (datas.length > 0) {
            __$coverCall('src\\snappea-account-sdk.js', '12271:12314');
            targeURL = targeURL + '&' + datas.join('&');
        }
        __$coverCall('src\\snappea-account-sdk.js', '12338:12369');
        global.location.href = targeURL;
    };
    __$coverCall('src\\snappea-account-sdk.js', '12386:12420');
    var SnapPea = global.SnapPea || {};
    __$coverCall('src\\snappea-account-sdk.js', '12427:12452');
    SnapPea.Account = Account;
    __$coverCall('src\\snappea-account-sdk.js', '12459:12483');
    global.SnapPea = SnapPea;
}(this));
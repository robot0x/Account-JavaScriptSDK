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
__$coverInit("src/snappea-account-sdk.js", "/*global $, Q*/\n(function (global) {\n    //@@ lib/q/q.js\n    var Deferred = Q.defer;\n    var ajax = $.ajax;\n\n    if ($.ajaxSetup) {\n        $.ajaxSetup({\n            xhrFields : {\n                withCredentials : true\n            }\n        });\n    } else {\n        // $.ajaxSettings;\n    }\n\n    var extend = function (dist, source) {\n        if (!source) {\n            return dist;\n        }\n\n        var prop;\n        for (prop in source) {\n            if (source.hasOwnProperty(prop)) {\n                dist[prop] = source[prop];\n            }\n        }\n\n        return dist;\n    };\n\n    var HOST = 'https://account.wandoujia.com';\n    var API_VERSION_4 = '/v4/api';\n\n    var PREFIX = HOST + API_VERSION_4;\n\n    var CONFIG = {\n        login : PREFIX + '/login',\n        logout : PREFIX + '/logout',\n        captcha : PREFIX + '/seccode',\n        reg : PREFIX + '/register',\n        checkUsername : PREFIX + '/isUsernameExisted',\n        checkUserLogin : PREFIX + '/profile',\n        findPwd : PREFIX + '/findpassword',\n        checkCode : PREFIX + '/checkcode',\n        resetPwd : PREFIX + '/resetpassword',\n        modifyPwd : PREFIX + '/profile/password'\n    };\n\n    var CONFIG_WEB = {\n        loginWithThirdParty : HOST + '/web/oauth2/{1}/login'\n    };\n\n    var USER_INFO;\n    var IS_LOGINED = false;\n\n    var Account = {};\n\n    Account.CAPTCHA = CONFIG.captcha;\n\n    Account.loginAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (!data.username || !data.password) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.login,\n                data : extend({\n                    username : data.username,\n                    password : data.password,\n                    seccode : data.seccode || ''\n                }, options),\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        IS_LOGINED = true;\n                        USER_INFO = resp.member;\n                        deferred.resolve(resp.member);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.isLogined = function () {\n        return IS_LOGINED;\n    };\n\n    Account.getUserInfo = function () {\n        return USER_INFO;\n    };\n\n    Account.logoutAsync = function (options) {\n        var deferred = new Deferred();\n\n        options = options || {};\n\n        ajax({\n            type : 'POST',\n            dataType : 'json',\n            url : CONFIG.logout,\n            data : options,\n            success : function (resp) {\n                if (resp.error === 0) {\n                    IS_LOGINED = false;\n                    USER_INFO = undefined;\n                    deferred.resolve(resp);\n                } else {\n                    deferred.reject(resp);\n                }\n            },\n            error : function () {\n                deferred.reject({\n                    error : -1,\n                    msg : '请求失败，请检查网络连接状况。'\n                });\n            }\n        });\n\n        return deferred.promise;\n    };\n\n    Account.regAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (!data.username || !data.password) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.reg,\n                data : extend({\n                    username : data.username,\n                    password : data.password,\n                    nick : data.nickname || '',\n                    seccode : data.seccode || ''\n                }, options),\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        IS_LOGINED = true;\n                        USER_INFO = resp.member;\n                        deferred.resolve(resp.member);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.checkUsernameAsync = function (username, options) {\n        var deferred = new Deferred();\n\n        options = options || {};\n\n        if (username === undefined) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.checkUsername,\n                data : extend({\n                    username : username\n                }, options),\n                success : function (resp) {\n                    deferred.resolve(resp);\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.checkUserLoginAsync = function (options) {\n        var deferred = new Deferred();\n\n        options = options || {};\n\n        ajax({\n            type : 'GET',\n            dataType : 'json',\n            url : CONFIG.checkUserLogin,\n            data : options,\n            success : function (resp) {\n                if (resp.error === 0) {\n                    IS_LOGINED = true;\n                    USER_INFO = resp.member;\n                    deferred.resolve(true);\n                } else {\n                    IS_LOGINED = false;\n                    USER_INFO = undefined;\n                    deferred.reject(false);\n                }\n            },\n            error : function () {\n                deferred.reject(false);\n            }\n        });\n\n        return deferred.promise;\n    };\n\n    Account.findPwdAsync = function (username, options) {\n        var deferred = new Deferred();\n\n        options = options || {};\n\n        if (username === undefined) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.findPwd,\n                data : extend({\n                    username : username\n                }, options),\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        deferred.resolve(resp);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.checkCodeAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (data.username === undefined ||\n                data.passcode === undefined) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                url : CONFIG.checkCode,\n                data : extend({\n                    username : data.username,\n                    passcode : data.passcode\n                }, options),\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        deferred.resolve(resp);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.resetPwdAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (data.username === undefined ||\n                data.passcode === undefined ||\n                data.password === undefined) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.resetPwd,\n                data : extend({\n                    username : data.username,\n                    passcode : data.passcode,\n                    password : data.password,\n                    repeatedpassword : data.password\n                }, options),\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        deferred.resolve(resp);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.modifyPwdAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (data.password === undefined ||\n                data.newpassword === undefined) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.modifyPwd,\n                data : extend({\n                    oldpassword : data.password,\n                    newpassword : data.newpassword\n                }, options),\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        deferred.resolve(resp);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.isEmail = function (input) {\n        var EMAIL_PATTREN = /^[A-Za-z0-9](([_\\.\\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\\.\\-]?[a-zA-Z0-9]+)*)\\.([A-Za-z]{2,})$/;\n        return EMAIL_PATTREN.test(input);\n    };\n\n    Account.isPhoneNumber = function (input) {\n        var PHONE_PATTERN = /^(1(([35][0-9])|(47)|[8][01236789]))\\d{8}$/;\n        return PHONE_PATTERN.test(input);\n    };\n\n    /* `platform` could be one of `weibo`, `qq`, `renren` */\n    Account.loginWithThirdParty = function (options) {\n        options = options || {};\n\n        options.callback = options.callback || 'http://www.wandoujia.com/';\n\n        var platforms = {\n            weibo : 'sina',\n            sina : 'sina',\n            renren : 'renren',\n            qq : 'qq'\n        };\n\n        var platform = platforms[options.platform];\n        delete options.platform;\n\n        var datas = [];\n        var d;\n        for (d in options) {\n            if (options.hasOwnProperty(d)) {\n                datas.push(d + '=' + global.encodeURIComponent(options[d]));\n            }\n        }\n\n        var targeURL = CONFIG_WEB.loginWithThirdParty.replace('{1}', platform);\n\n        if (datas.length > 0) {\n            targeURL = targeURL + '?' + datas.join('&');\n        }\n\n        global.location.href = targeURL;\n    };\n\n    var SnapPea = global.SnapPea || {};\n    SnapPea.Account = Account;\n    global.SnapPea = SnapPea;\n}(this));\n");
__$coverInitRange("src/snappea-account-sdk.js", "16:12655");
__$coverInitRange("src/snappea-account-sdk.js", "61:83");
__$coverInitRange("src/snappea-account-sdk.js", "89:106");
__$coverInitRange("src/snappea-account-sdk.js", "113:289");
__$coverInitRange("src/snappea-account-sdk.js", "296:584");
__$coverInitRange("src/snappea-account-sdk.js", "591:633");
__$coverInitRange("src/snappea-account-sdk.js", "639:668");
__$coverInitRange("src/snappea-account-sdk.js", "675:708");
__$coverInitRange("src/snappea-account-sdk.js", "715:1165");
__$coverInitRange("src/snappea-account-sdk.js", "1172:1257");
__$coverInitRange("src/snappea-account-sdk.js", "1264:1277");
__$coverInitRange("src/snappea-account-sdk.js", "1283:1305");
__$coverInitRange("src/snappea-account-sdk.js", "1312:1328");
__$coverInitRange("src/snappea-account-sdk.js", "1335:1367");
__$coverInitRange("src/snappea-account-sdk.js", "1374:2632");
__$coverInitRange("src/snappea-account-sdk.js", "2639:2705");
__$coverInitRange("src/snappea-account-sdk.js", "2712:2779");
__$coverInitRange("src/snappea-account-sdk.js", "2786:3574");
__$coverInitRange("src/snappea-account-sdk.js", "3581:4884");
__$coverInitRange("src/snappea-account-sdk.js", "4891:5787");
__$coverInitRange("src/snappea-account-sdk.js", "5794:6592");
__$coverInitRange("src/snappea-account-sdk.js", "6599:7629");
__$coverInitRange("src/snappea-account-sdk.js", "7636:8761");
__$coverInitRange("src/snappea-account-sdk.js", "8768:10073");
__$coverInitRange("src/snappea-account-sdk.js", "10080:11252");
__$coverInitRange("src/snappea-account-sdk.js", "11259:11468");
__$coverInitRange("src/snappea-account-sdk.js", "11475:11639");
__$coverInitRange("src/snappea-account-sdk.js", "11707:12543");
__$coverInitRange("src/snappea-account-sdk.js", "12550:12584");
__$coverInitRange("src/snappea-account-sdk.js", "12590:12615");
__$coverInitRange("src/snappea-account-sdk.js", "12621:12645");
__$coverInitRange("src/snappea-account-sdk.js", "140:243");
__$coverInitRange("src/snappea-account-sdk.js", "343:391");
__$coverInitRange("src/snappea-account-sdk.js", "402:410");
__$coverInitRange("src/snappea-account-sdk.js", "420:555");
__$coverInitRange("src/snappea-account-sdk.js", "566:577");
__$coverInitRange("src/snappea-account-sdk.js", "370:381");
__$coverInitRange("src/snappea-account-sdk.js", "455:545");
__$coverInitRange("src/snappea-account-sdk.js", "506:531");
__$coverInitRange("src/snappea-account-sdk.js", "1430:1459");
__$coverInitRange("src/snappea-account-sdk.js", "1470:1487");
__$coverInitRange("src/snappea-account-sdk.js", "1497:1520");
__$coverInitRange("src/snappea-account-sdk.js", "1531:2591");
__$coverInitRange("src/snappea-account-sdk.js", "2602:2625");
__$coverInitRange("src/snappea-account-sdk.js", "1583:1672");
__$coverInitRange("src/snappea-account-sdk.js", "1703:2581");
__$coverInitRange("src/snappea-account-sdk.js", "2078:2345");
__$coverInitRange("src/snappea-account-sdk.js", "2126:2143");
__$coverInitRange("src/snappea-account-sdk.js", "2169:2192");
__$coverInitRange("src/snappea-account-sdk.js", "2218:2247");
__$coverInitRange("src/snappea-account-sdk.js", "2302:2323");
__$coverInitRange("src/snappea-account-sdk.js", "2424:2547");
__$coverInitRange("src/snappea-account-sdk.js", "2681:2698");
__$coverInitRange("src/snappea-account-sdk.js", "2756:2772");
__$coverInitRange("src/snappea-account-sdk.js", "2837:2866");
__$coverInitRange("src/snappea-account-sdk.js", "2877:2900");
__$coverInitRange("src/snappea-account-sdk.js", "2911:3533");
__$coverInitRange("src/snappea-account-sdk.js", "3544:3567");
__$coverInitRange("src/snappea-account-sdk.js", "3093:3328");
__$coverInitRange("src/snappea-account-sdk.js", "3137:3155");
__$coverInitRange("src/snappea-account-sdk.js", "3177:3198");
__$coverInitRange("src/snappea-account-sdk.js", "3220:3242");
__$coverInitRange("src/snappea-account-sdk.js", "3289:3310");
__$coverInitRange("src/snappea-account-sdk.js", "3395:3507");
__$coverInitRange("src/snappea-account-sdk.js", "3635:3664");
__$coverInitRange("src/snappea-account-sdk.js", "3675:3692");
__$coverInitRange("src/snappea-account-sdk.js", "3702:3725");
__$coverInitRange("src/snappea-account-sdk.js", "3736:4843");
__$coverInitRange("src/snappea-account-sdk.js", "4854:4877");
__$coverInitRange("src/snappea-account-sdk.js", "3788:3877");
__$coverInitRange("src/snappea-account-sdk.js", "3908:4833");
__$coverInitRange("src/snappea-account-sdk.js", "4329:4596");
__$coverInitRange("src/snappea-account-sdk.js", "4377:4394");
__$coverInitRange("src/snappea-account-sdk.js", "4420:4443");
__$coverInitRange("src/snappea-account-sdk.js", "4469:4498");
__$coverInitRange("src/snappea-account-sdk.js", "4553:4574");
__$coverInitRange("src/snappea-account-sdk.js", "4675:4799");
__$coverInitRange("src/snappea-account-sdk.js", "4959:4988");
__$coverInitRange("src/snappea-account-sdk.js", "4999:5022");
__$coverInitRange("src/snappea-account-sdk.js", "5033:5746");
__$coverInitRange("src/snappea-account-sdk.js", "5757:5780");
__$coverInitRange("src/snappea-account-sdk.js", "5075:5164");
__$coverInitRange("src/snappea-account-sdk.js", "5195:5736");
__$coverInitRange("src/snappea-account-sdk.js", "5477:5499");
__$coverInitRange("src/snappea-account-sdk.js", "5578:5702");
__$coverInitRange("src/snappea-account-sdk.js", "5853:5882");
__$coverInitRange("src/snappea-account-sdk.js", "5893:5916");
__$coverInitRange("src/snappea-account-sdk.js", "5927:6551");
__$coverInitRange("src/snappea-account-sdk.js", "6562:6585");
__$coverInitRange("src/snappea-account-sdk.js", "6116:6436");
__$coverInitRange("src/snappea-account-sdk.js", "6160:6177");
__$coverInitRange("src/snappea-account-sdk.js", "6199:6222");
__$coverInitRange("src/snappea-account-sdk.js", "6244:6266");
__$coverInitRange("src/snappea-account-sdk.js", "6313:6331");
__$coverInitRange("src/snappea-account-sdk.js", "6353:6374");
__$coverInitRange("src/snappea-account-sdk.js", "6396:6418");
__$coverInitRange("src/snappea-account-sdk.js", "6503:6525");
__$coverInitRange("src/snappea-account-sdk.js", "6661:6690");
__$coverInitRange("src/snappea-account-sdk.js", "6701:6724");
__$coverInitRange("src/snappea-account-sdk.js", "6735:7588");
__$coverInitRange("src/snappea-account-sdk.js", "7599:7622");
__$coverInitRange("src/snappea-account-sdk.js", "6777:6866");
__$coverInitRange("src/snappea-account-sdk.js", "6897:7578");
__$coverInitRange("src/snappea-account-sdk.js", "7173:7341");
__$coverInitRange("src/snappea-account-sdk.js", "7221:7243");
__$coverInitRange("src/snappea-account-sdk.js", "7298:7319");
__$coverInitRange("src/snappea-account-sdk.js", "7420:7544");
__$coverInitRange("src/snappea-account-sdk.js", "7696:7725");
__$coverInitRange("src/snappea-account-sdk.js", "7736:7753");
__$coverInitRange("src/snappea-account-sdk.js", "7763:7786");
__$coverInitRange("src/snappea-account-sdk.js", "7797:8720");
__$coverInitRange("src/snappea-account-sdk.js", "8731:8754");
__$coverInitRange("src/snappea-account-sdk.js", "7891:7980");
__$coverInitRange("src/snappea-account-sdk.js", "8011:8710");
__$coverInitRange("src/snappea-account-sdk.js", "8305:8473");
__$coverInitRange("src/snappea-account-sdk.js", "8353:8375");
__$coverInitRange("src/snappea-account-sdk.js", "8430:8451");
__$coverInitRange("src/snappea-account-sdk.js", "8552:8676");
__$coverInitRange("src/snappea-account-sdk.js", "8827:8856");
__$coverInitRange("src/snappea-account-sdk.js", "8867:8884");
__$coverInitRange("src/snappea-account-sdk.js", "8894:8917");
__$coverInitRange("src/snappea-account-sdk.js", "8928:10032");
__$coverInitRange("src/snappea-account-sdk.js", "10043:10066");
__$coverInitRange("src/snappea-account-sdk.js", "9069:9158");
__$coverInitRange("src/snappea-account-sdk.js", "9189:10022");
__$coverInitRange("src/snappea-account-sdk.js", "9617:9785");
__$coverInitRange("src/snappea-account-sdk.js", "9665:9687");
__$coverInitRange("src/snappea-account-sdk.js", "9742:9763");
__$coverInitRange("src/snappea-account-sdk.js", "9864:9988");
__$coverInitRange("src/snappea-account-sdk.js", "10140:10169");
__$coverInitRange("src/snappea-account-sdk.js", "10180:10197");
__$coverInitRange("src/snappea-account-sdk.js", "10207:10230");
__$coverInitRange("src/snappea-account-sdk.js", "10241:11211");
__$coverInitRange("src/snappea-account-sdk.js", "11222:11245");
__$coverInitRange("src/snappea-account-sdk.js", "10338:10427");
__$coverInitRange("src/snappea-account-sdk.js", "10458:11201");
__$coverInitRange("src/snappea-account-sdk.js", "10796:10964");
__$coverInitRange("src/snappea-account-sdk.js", "10844:10866");
__$coverInitRange("src/snappea-account-sdk.js", "10921:10942");
__$coverInitRange("src/snappea-account-sdk.js", "11043:11167");
__$coverInitRange("src/snappea-account-sdk.js", "11304:11419");
__$coverInitRange("src/snappea-account-sdk.js", "11429:11461");
__$coverInitRange("src/snappea-account-sdk.js", "11526:11590");
__$coverInitRange("src/snappea-account-sdk.js", "11600:11632");
__$coverInitRange("src/snappea-account-sdk.js", "11766:11789");
__$coverInitRange("src/snappea-account-sdk.js", "11800:11866");
__$coverInitRange("src/snappea-account-sdk.js", "11877:12012");
__$coverInitRange("src/snappea-account-sdk.js", "12023:12065");
__$coverInitRange("src/snappea-account-sdk.js", "12075:12098");
__$coverInitRange("src/snappea-account-sdk.js", "12109:12123");
__$coverInitRange("src/snappea-account-sdk.js", "12133:12138");
__$coverInitRange("src/snappea-account-sdk.js", "12148:12313");
__$coverInitRange("src/snappea-account-sdk.js", "12324:12394");
__$coverInitRange("src/snappea-account-sdk.js", "12405:12494");
__$coverInitRange("src/snappea-account-sdk.js", "12505:12536");
__$coverInitRange("src/snappea-account-sdk.js", "12181:12303");
__$coverInitRange("src/snappea-account-sdk.js", "12230:12289");
__$coverInitRange("src/snappea-account-sdk.js", "12441:12484");
__$coverCall('src/snappea-account-sdk.js', '16:12655');
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
    __$coverCall('src/snappea-account-sdk.js', '296:584');
    var extend = function (dist, source) {
        __$coverCall('src/snappea-account-sdk.js', '343:391');
        if (!source) {
            __$coverCall('src/snappea-account-sdk.js', '370:381');
            return dist;
        }
        __$coverCall('src/snappea-account-sdk.js', '402:410');
        var prop;
        __$coverCall('src/snappea-account-sdk.js', '420:555');
        for (prop in source) {
            __$coverCall('src/snappea-account-sdk.js', '455:545');
            if (source.hasOwnProperty(prop)) {
                __$coverCall('src/snappea-account-sdk.js', '506:531');
                dist[prop] = source[prop];
            }
        }
        __$coverCall('src/snappea-account-sdk.js', '566:577');
        return dist;
    };
    __$coverCall('src/snappea-account-sdk.js', '591:633');
    var HOST = 'https://account.wandoujia.com';
    __$coverCall('src/snappea-account-sdk.js', '639:668');
    var API_VERSION_4 = '/v4/api';
    __$coverCall('src/snappea-account-sdk.js', '675:708');
    var PREFIX = HOST + API_VERSION_4;
    __$coverCall('src/snappea-account-sdk.js', '715:1165');
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
    __$coverCall('src/snappea-account-sdk.js', '1172:1257');
    var CONFIG_WEB = { loginWithThirdParty: HOST + '/web/oauth2/{1}/login' };
    __$coverCall('src/snappea-account-sdk.js', '1264:1277');
    var USER_INFO;
    __$coverCall('src/snappea-account-sdk.js', '1283:1305');
    var IS_LOGINED = false;
    __$coverCall('src/snappea-account-sdk.js', '1312:1328');
    var Account = {};
    __$coverCall('src/snappea-account-sdk.js', '1335:1367');
    Account.CAPTCHA = CONFIG.captcha;
    __$coverCall('src/snappea-account-sdk.js', '1374:2632');
    Account.loginAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '1430:1459');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '1470:1487');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '1497:1520');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '1531:2591');
        if (!data.username || !data.password) {
            __$coverCall('src/snappea-account-sdk.js', '1583:1672');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '1703:2581');
            ajax({
                type: 'POST',
                dataType: 'json',
                url: CONFIG.login,
                data: extend({
                    username: data.username,
                    password: data.password,
                    seccode: data.seccode || ''
                }, options),
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '2078:2345');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '2126:2143');
                        IS_LOGINED = true;
                        __$coverCall('src/snappea-account-sdk.js', '2169:2192');
                        USER_INFO = resp.member;
                        __$coverCall('src/snappea-account-sdk.js', '2218:2247');
                        deferred.resolve(resp.member);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '2302:2323');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '2424:2547');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '2602:2625');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '2639:2705');
    Account.isLogined = function () {
        __$coverCall('src/snappea-account-sdk.js', '2681:2698');
        return IS_LOGINED;
    };
    __$coverCall('src/snappea-account-sdk.js', '2712:2779');
    Account.getUserInfo = function () {
        __$coverCall('src/snappea-account-sdk.js', '2756:2772');
        return USER_INFO;
    };
    __$coverCall('src/snappea-account-sdk.js', '2786:3574');
    Account.logoutAsync = function (options) {
        __$coverCall('src/snappea-account-sdk.js', '2837:2866');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '2877:2900');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '2911:3533');
        ajax({
            type: 'POST',
            dataType: 'json',
            url: CONFIG.logout,
            data: options,
            success: function (resp) {
                __$coverCall('src/snappea-account-sdk.js', '3093:3328');
                if (resp.error === 0) {
                    __$coverCall('src/snappea-account-sdk.js', '3137:3155');
                    IS_LOGINED = false;
                    __$coverCall('src/snappea-account-sdk.js', '3177:3198');
                    USER_INFO = undefined;
                    __$coverCall('src/snappea-account-sdk.js', '3220:3242');
                    deferred.resolve(resp);
                } else {
                    __$coverCall('src/snappea-account-sdk.js', '3289:3310');
                    deferred.reject(resp);
                }
            },
            error: function () {
                __$coverCall('src/snappea-account-sdk.js', '3395:3507');
                deferred.reject({
                    error: -1,
                    msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                });
            }
        });
        __$coverCall('src/snappea-account-sdk.js', '3544:3567');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '3581:4884');
    Account.regAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '3635:3664');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '3675:3692');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '3702:3725');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '3736:4843');
        if (!data.username || !data.password) {
            __$coverCall('src/snappea-account-sdk.js', '3788:3877');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '3908:4833');
            ajax({
                type: 'POST',
                dataType: 'json',
                url: CONFIG.reg,
                data: extend({
                    username: data.username,
                    password: data.password,
                    nick: data.nickname || '',
                    seccode: data.seccode || ''
                }, options),
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '4329:4596');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '4377:4394');
                        IS_LOGINED = true;
                        __$coverCall('src/snappea-account-sdk.js', '4420:4443');
                        USER_INFO = resp.member;
                        __$coverCall('src/snappea-account-sdk.js', '4469:4498');
                        deferred.resolve(resp.member);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '4553:4574');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '4675:4799');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '4854:4877');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '4891:5787');
    Account.checkUsernameAsync = function (username, options) {
        __$coverCall('src/snappea-account-sdk.js', '4959:4988');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '4999:5022');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '5033:5746');
        if (username === undefined) {
            __$coverCall('src/snappea-account-sdk.js', '5075:5164');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '5195:5736');
            ajax({
                type: 'POST',
                dataType: 'json',
                url: CONFIG.checkUsername,
                data: extend({ username: username }, options),
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '5477:5499');
                    deferred.resolve(resp);
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '5578:5702');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '5757:5780');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '5794:6592');
    Account.checkUserLoginAsync = function (options) {
        __$coverCall('src/snappea-account-sdk.js', '5853:5882');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '5893:5916');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '5927:6551');
        ajax({
            type: 'GET',
            dataType: 'json',
            url: CONFIG.checkUserLogin,
            data: options,
            success: function (resp) {
                __$coverCall('src/snappea-account-sdk.js', '6116:6436');
                if (resp.error === 0) {
                    __$coverCall('src/snappea-account-sdk.js', '6160:6177');
                    IS_LOGINED = true;
                    __$coverCall('src/snappea-account-sdk.js', '6199:6222');
                    USER_INFO = resp.member;
                    __$coverCall('src/snappea-account-sdk.js', '6244:6266');
                    deferred.resolve(true);
                } else {
                    __$coverCall('src/snappea-account-sdk.js', '6313:6331');
                    IS_LOGINED = false;
                    __$coverCall('src/snappea-account-sdk.js', '6353:6374');
                    USER_INFO = undefined;
                    __$coverCall('src/snappea-account-sdk.js', '6396:6418');
                    deferred.reject(false);
                }
            },
            error: function () {
                __$coverCall('src/snappea-account-sdk.js', '6503:6525');
                deferred.reject(false);
            }
        });
        __$coverCall('src/snappea-account-sdk.js', '6562:6585');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '6599:7629');
    Account.findPwdAsync = function (username, options) {
        __$coverCall('src/snappea-account-sdk.js', '6661:6690');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '6701:6724');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '6735:7588');
        if (username === undefined) {
            __$coverCall('src/snappea-account-sdk.js', '6777:6866');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '6897:7578');
            ajax({
                type: 'POST',
                dataType: 'json',
                url: CONFIG.findPwd,
                data: extend({ username: username }, options),
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '7173:7341');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '7221:7243');
                        deferred.resolve(resp);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '7298:7319');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '7420:7544');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '7599:7622');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '7636:8761');
    Account.checkCodeAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '7696:7725');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '7736:7753');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '7763:7786');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '7797:8720');
        if (data.username === undefined || data.passcode === undefined) {
            __$coverCall('src/snappea-account-sdk.js', '7891:7980');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '8011:8710');
            ajax({
                type: 'POST',
                url: CONFIG.checkCode,
                data: extend({
                    username: data.username,
                    passcode: data.passcode
                }, options),
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '8305:8473');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '8353:8375');
                        deferred.resolve(resp);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '8430:8451');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '8552:8676');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '8731:8754');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '8768:10073');
    Account.resetPwdAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '8827:8856');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '8867:8884');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '8894:8917');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '8928:10032');
        if (data.username === undefined || data.passcode === undefined || data.password === undefined) {
            __$coverCall('src/snappea-account-sdk.js', '9069:9158');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '9189:10022');
            ajax({
                type: 'POST',
                dataType: 'json',
                url: CONFIG.resetPwd,
                data: extend({
                    username: data.username,
                    passcode: data.passcode,
                    password: data.password,
                    repeatedpassword: data.password
                }, options),
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '9617:9785');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '9665:9687');
                        deferred.resolve(resp);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '9742:9763');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '9864:9988');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '10043:10066');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '10080:11252');
    Account.modifyPwdAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '10140:10169');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '10180:10197');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '10207:10230');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '10241:11211');
        if (data.password === undefined || data.newpassword === undefined) {
            __$coverCall('src/snappea-account-sdk.js', '10338:10427');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '10458:11201');
            ajax({
                type: 'POST',
                dataType: 'json',
                url: CONFIG.modifyPwd,
                data: extend({
                    oldpassword: data.password,
                    newpassword: data.newpassword
                }, options),
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '10796:10964');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '10844:10866');
                        deferred.resolve(resp);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '10921:10942');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '11043:11167');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '11222:11245');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '11259:11468');
    Account.isEmail = function (input) {
        __$coverCall('src/snappea-account-sdk.js', '11304:11419');
        var EMAIL_PATTREN = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/;
        __$coverCall('src/snappea-account-sdk.js', '11429:11461');
        return EMAIL_PATTREN.test(input);
    };
    __$coverCall('src/snappea-account-sdk.js', '11475:11639');
    Account.isPhoneNumber = function (input) {
        __$coverCall('src/snappea-account-sdk.js', '11526:11590');
        var PHONE_PATTERN = /^(1(([35][0-9])|(47)|[8][01236789]))\d{8}$/;
        __$coverCall('src/snappea-account-sdk.js', '11600:11632');
        return PHONE_PATTERN.test(input);
    };
    __$coverCall('src/snappea-account-sdk.js', '11707:12543');
    Account.loginWithThirdParty = function (options) {
        __$coverCall('src/snappea-account-sdk.js', '11766:11789');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '11800:11866');
        options.callback = options.callback || 'http://www.wandoujia.com/';
        __$coverCall('src/snappea-account-sdk.js', '11877:12012');
        var platforms = {
                weibo: 'sina',
                sina: 'sina',
                renren: 'renren',
                qq: 'qq'
            };
        __$coverCall('src/snappea-account-sdk.js', '12023:12065');
        var platform = platforms[options.platform];
        __$coverCall('src/snappea-account-sdk.js', '12075:12098');
        delete options.platform;
        __$coverCall('src/snappea-account-sdk.js', '12109:12123');
        var datas = [];
        __$coverCall('src/snappea-account-sdk.js', '12133:12138');
        var d;
        __$coverCall('src/snappea-account-sdk.js', '12148:12313');
        for (d in options) {
            __$coverCall('src/snappea-account-sdk.js', '12181:12303');
            if (options.hasOwnProperty(d)) {
                __$coverCall('src/snappea-account-sdk.js', '12230:12289');
                datas.push(d + '=' + global.encodeURIComponent(options[d]));
            }
        }
        __$coverCall('src/snappea-account-sdk.js', '12324:12394');
        var targeURL = CONFIG_WEB.loginWithThirdParty.replace('{1}', platform);
        __$coverCall('src/snappea-account-sdk.js', '12405:12494');
        if (datas.length > 0) {
            __$coverCall('src/snappea-account-sdk.js', '12441:12484');
            targeURL = targeURL + '?' + datas.join('&');
        }
        __$coverCall('src/snappea-account-sdk.js', '12505:12536');
        global.location.href = targeURL;
    };
    __$coverCall('src/snappea-account-sdk.js', '12550:12584');
    var SnapPea = global.SnapPea || {};
    __$coverCall('src/snappea-account-sdk.js', '12590:12615');
    SnapPea.Account = Account;
    __$coverCall('src/snappea-account-sdk.js', '12621:12645');
    global.SnapPea = SnapPea;
}(this));
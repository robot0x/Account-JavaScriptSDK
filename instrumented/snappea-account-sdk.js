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
__$coverInit("src/snappea-account-sdk.js", "/*global $, Q*/\n(function (global) {\n    //@@ lib/q/q.js\n    var Deferred = Q.defer;\n    var ajax = $.ajax;\n\n    if ($.ajaxSetup) {\n        $.ajaxSetup({\n            xhrFields : {\n                withCredentials : true\n            }\n        });\n    } else {\n        // $.ajaxSettings;\n    }\n\n    var extend = function (dist, source) {\n        if (!source) {\n            return dist;\n        }\n\n        var prop;\n        for (prop in source) {\n            if (source.hasOwnProperty(prop)) {\n                dist[prop] = source[prop];\n            }\n        }\n\n        return dist;\n    };\n\n    var HOST = 'https://account.wandoujia.com';\n    var API_VERSION_4 = '/v4/api';\n\n    var PREFIX = HOST + API_VERSION_4;\n\n    var CONFIG = {\n        login : PREFIX + '/login',\n        logout : PREFIX + '/logout',\n        captcha : PREFIX + '/seccode',\n        reg : PREFIX + '/register',\n        checkUsername : PREFIX + '/isUsernameExisted',\n        checkUserLogin : PREFIX + '/profile',\n        findPwd : PREFIX + '/findpassword',\n        checkCode : PREFIX + '/checkcode',\n        resetPwd : PREFIX + '/resetpassword',\n        modifyPwd : PREFIX + '/profile/password',\n        completeProfile : PREFIX + '/completeProfile',\n        avatar : PREFIX + '/avatar'\n    };\n\n    var CONFIG_WEB = {\n        loginWithThirdParty : HOST + '/web/oauth2/{1}/login'\n    };\n\n    var USER_INFO;\n    var IS_LOGINED = false;\n\n    var Account = {};\n\n    Account.CAPTCHA = CONFIG.captcha;\n\n    Account.loginAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (!data.username || !data.password) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.login,\n                data : extend({\n                    username : data.username,\n                    password : data.password,\n                    seccode : data.seccode || ''\n                }, options),\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        IS_LOGINED = true;\n                        USER_INFO = resp.member;\n                        deferred.resolve(resp.member);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.isLogined = function () {\n        return IS_LOGINED;\n    };\n\n    Account.getUserInfo = function () {\n        return USER_INFO;\n    };\n\n    Account.logoutAsync = function (options) {\n        var deferred = new Deferred();\n\n        options = options || {};\n\n        ajax({\n            type : 'POST',\n            dataType : 'json',\n            url : CONFIG.logout,\n            data : options,\n            success : function (resp) {\n                if (resp.error === 0) {\n                    IS_LOGINED = false;\n                    USER_INFO = undefined;\n                    deferred.resolve(resp);\n                } else {\n                    deferred.reject(resp);\n                }\n            },\n            error : function () {\n                deferred.reject({\n                    error : -1,\n                    msg : '请求失败，请检查网络连接状况。'\n                });\n            }\n        });\n\n        return deferred.promise;\n    };\n\n    Account.regAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (!data.username || !data.password) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.reg,\n                data : extend({\n                    username : data.username,\n                    password : data.password,\n                    nick : data.nickname || '',\n                    seccode : data.seccode || ''\n                }, options),\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        IS_LOGINED = true;\n                        USER_INFO = resp.member;\n                        deferred.resolve(resp.member);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.checkUsernameAsync = function (username, options) {\n        var deferred = new Deferred();\n\n        options = options || {};\n\n        if (username === undefined) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.checkUsername,\n                data : extend({\n                    username : username\n                }, options),\n                success : function (resp) {\n                    deferred.resolve(resp);\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.checkUserLoginAsync = function (options) {\n        var deferred = new Deferred();\n\n        options = options || {};\n\n        ajax({\n            type : 'GET',\n            dataType : 'json',\n            url : CONFIG.checkUserLogin,\n            data : options,\n            success : function (resp) {\n                if (resp.error === 0) {\n                    IS_LOGINED = true;\n                    USER_INFO = resp.member;\n                    deferred.resolve(true);\n                } else {\n                    IS_LOGINED = false;\n                    USER_INFO = undefined;\n                    deferred.reject(false);\n                }\n            },\n            error : function () {\n                deferred.reject(false);\n            }\n        });\n\n        return deferred.promise;\n    };\n\n    Account.findPwdAsync = function (username, options) {\n        var deferred = new Deferred();\n\n        options = options || {};\n\n        if (username === undefined) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.findPwd,\n                data : extend({\n                    username : username\n                }, options),\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        deferred.resolve(resp);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.checkCodeAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (data.username === undefined ||\n                data.passcode === undefined) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                url : CONFIG.checkCode,\n                data : extend({\n                    username : data.username,\n                    passcode : data.passcode\n                }, options),\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        deferred.resolve(resp);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.resetPwdAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (data.username === undefined ||\n                data.passcode === undefined ||\n                data.password === undefined) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.resetPwd,\n                data : extend({\n                    username : data.username,\n                    passcode : data.passcode,\n                    password : data.password,\n                    repeatedpassword : data.password\n                }, options),\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        deferred.resolve(resp);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.modifyPwdAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (data.password === undefined ||\n                data.newpassword === undefined) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.modifyPwd,\n                data : extend({\n                    oldpassword : data.password,\n                    newpassword : data.newpassword\n                }, options),\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        deferred.resolve(resp);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.updateProfileAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (data.nickname === undefined) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.completeProfile,\n                data : extend({\n                    nick : data.nickname\n                }, options),\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        USER_INFO = resp.member;\n                        deferred.resolve(resp.member);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    /* `data.file` should be `File` */\n    Account.uploadAvatarAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        var formData, f;\n\n        if (data.file === undefined) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            formData = new global.FormData();\n            formData.append('file', data.file);\n\n            for (f in options) {\n                if (options.hasOwnProperty(f)) {\n                    formData.append(f, options[f]);\n                }\n            }\n\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.avatar,\n                data : formData,\n                processData : false,\n                contentType : false,\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        USER_INFO = resp.member;\n                        deferred.resolve(resp.member.avatar);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.isEmail = function (input) {\n        var EMAIL_PATTREN = /^[A-Za-z0-9](([_\\.\\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\\.\\-]?[a-zA-Z0-9]+)*)\\.([A-Za-z]{2,})$/;\n        return EMAIL_PATTREN.test(input);\n    };\n\n    Account.isPhoneNumber = function (input) {\n        var PHONE_PATTERN = /^(1(([35][0-9])|(47)|[8][01236789]))\\d{8}$/;\n        return PHONE_PATTERN.test(input);\n    };\n\n    /* `platform` could be one of `weibo`, `qq`, `renren` */\n    Account.loginWithThirdParty = function (options) {\n        options = options || {};\n\n        options.callback = options.callback || 'http://www.wandoujia.com/';\n\n        var platforms = {\n            weibo : 'sina',\n            sina : 'sina',\n            renren : 'renren',\n            qq : 'qq'\n        };\n\n        var platform = platforms[options.platform];\n        delete options.platform;\n\n        var datas = [];\n        var d;\n        for (d in options) {\n            if (options.hasOwnProperty(d)) {\n                datas.push(d + '=' + global.encodeURIComponent(options[d]));\n            }\n        }\n\n        var targeURL = CONFIG_WEB.loginWithThirdParty.replace('{1}', platform);\n\n        if (datas.length > 0) {\n            targeURL = targeURL + '?' + datas.join('&');\n        }\n\n        global.location.href = targeURL;\n    };\n\n    var SnapPea = global.SnapPea || {};\n    SnapPea.Account = Account;\n    global.SnapPea = SnapPea;\n}(this));\n");
__$coverInitRange("src/snappea-account-sdk.js", "16:15344");
__$coverInitRange("src/snappea-account-sdk.js", "61:83");
__$coverInitRange("src/snappea-account-sdk.js", "89:106");
__$coverInitRange("src/snappea-account-sdk.js", "113:289");
__$coverInitRange("src/snappea-account-sdk.js", "296:584");
__$coverInitRange("src/snappea-account-sdk.js", "591:633");
__$coverInitRange("src/snappea-account-sdk.js", "639:668");
__$coverInitRange("src/snappea-account-sdk.js", "675:708");
__$coverInitRange("src/snappea-account-sdk.js", "715:1257");
__$coverInitRange("src/snappea-account-sdk.js", "1264:1349");
__$coverInitRange("src/snappea-account-sdk.js", "1356:1369");
__$coverInitRange("src/snappea-account-sdk.js", "1375:1397");
__$coverInitRange("src/snappea-account-sdk.js", "1404:1420");
__$coverInitRange("src/snappea-account-sdk.js", "1427:1459");
__$coverInitRange("src/snappea-account-sdk.js", "1466:2724");
__$coverInitRange("src/snappea-account-sdk.js", "2731:2797");
__$coverInitRange("src/snappea-account-sdk.js", "2804:2871");
__$coverInitRange("src/snappea-account-sdk.js", "2878:3666");
__$coverInitRange("src/snappea-account-sdk.js", "3673:4976");
__$coverInitRange("src/snappea-account-sdk.js", "4983:5879");
__$coverInitRange("src/snappea-account-sdk.js", "5886:6684");
__$coverInitRange("src/snappea-account-sdk.js", "6691:7721");
__$coverInitRange("src/snappea-account-sdk.js", "7728:8853");
__$coverInitRange("src/snappea-account-sdk.js", "8860:10165");
__$coverInitRange("src/snappea-account-sdk.js", "10172:11344");
__$coverInitRange("src/snappea-account-sdk.js", "11351:12480");
__$coverInitRange("src/snappea-account-sdk.js", "12526:13941");
__$coverInitRange("src/snappea-account-sdk.js", "13948:14157");
__$coverInitRange("src/snappea-account-sdk.js", "14164:14328");
__$coverInitRange("src/snappea-account-sdk.js", "14396:15232");
__$coverInitRange("src/snappea-account-sdk.js", "15239:15273");
__$coverInitRange("src/snappea-account-sdk.js", "15279:15304");
__$coverInitRange("src/snappea-account-sdk.js", "15310:15334");
__$coverInitRange("src/snappea-account-sdk.js", "140:243");
__$coverInitRange("src/snappea-account-sdk.js", "343:391");
__$coverInitRange("src/snappea-account-sdk.js", "402:410");
__$coverInitRange("src/snappea-account-sdk.js", "420:555");
__$coverInitRange("src/snappea-account-sdk.js", "566:577");
__$coverInitRange("src/snappea-account-sdk.js", "370:381");
__$coverInitRange("src/snappea-account-sdk.js", "455:545");
__$coverInitRange("src/snappea-account-sdk.js", "506:531");
__$coverInitRange("src/snappea-account-sdk.js", "1522:1551");
__$coverInitRange("src/snappea-account-sdk.js", "1562:1579");
__$coverInitRange("src/snappea-account-sdk.js", "1589:1612");
__$coverInitRange("src/snappea-account-sdk.js", "1623:2683");
__$coverInitRange("src/snappea-account-sdk.js", "2694:2717");
__$coverInitRange("src/snappea-account-sdk.js", "1675:1764");
__$coverInitRange("src/snappea-account-sdk.js", "1795:2673");
__$coverInitRange("src/snappea-account-sdk.js", "2170:2437");
__$coverInitRange("src/snappea-account-sdk.js", "2218:2235");
__$coverInitRange("src/snappea-account-sdk.js", "2261:2284");
__$coverInitRange("src/snappea-account-sdk.js", "2310:2339");
__$coverInitRange("src/snappea-account-sdk.js", "2394:2415");
__$coverInitRange("src/snappea-account-sdk.js", "2516:2639");
__$coverInitRange("src/snappea-account-sdk.js", "2773:2790");
__$coverInitRange("src/snappea-account-sdk.js", "2848:2864");
__$coverInitRange("src/snappea-account-sdk.js", "2929:2958");
__$coverInitRange("src/snappea-account-sdk.js", "2969:2992");
__$coverInitRange("src/snappea-account-sdk.js", "3003:3625");
__$coverInitRange("src/snappea-account-sdk.js", "3636:3659");
__$coverInitRange("src/snappea-account-sdk.js", "3185:3420");
__$coverInitRange("src/snappea-account-sdk.js", "3229:3247");
__$coverInitRange("src/snappea-account-sdk.js", "3269:3290");
__$coverInitRange("src/snappea-account-sdk.js", "3312:3334");
__$coverInitRange("src/snappea-account-sdk.js", "3381:3402");
__$coverInitRange("src/snappea-account-sdk.js", "3487:3599");
__$coverInitRange("src/snappea-account-sdk.js", "3727:3756");
__$coverInitRange("src/snappea-account-sdk.js", "3767:3784");
__$coverInitRange("src/snappea-account-sdk.js", "3794:3817");
__$coverInitRange("src/snappea-account-sdk.js", "3828:4935");
__$coverInitRange("src/snappea-account-sdk.js", "4946:4969");
__$coverInitRange("src/snappea-account-sdk.js", "3880:3969");
__$coverInitRange("src/snappea-account-sdk.js", "4000:4925");
__$coverInitRange("src/snappea-account-sdk.js", "4421:4688");
__$coverInitRange("src/snappea-account-sdk.js", "4469:4486");
__$coverInitRange("src/snappea-account-sdk.js", "4512:4535");
__$coverInitRange("src/snappea-account-sdk.js", "4561:4590");
__$coverInitRange("src/snappea-account-sdk.js", "4645:4666");
__$coverInitRange("src/snappea-account-sdk.js", "4767:4891");
__$coverInitRange("src/snappea-account-sdk.js", "5051:5080");
__$coverInitRange("src/snappea-account-sdk.js", "5091:5114");
__$coverInitRange("src/snappea-account-sdk.js", "5125:5838");
__$coverInitRange("src/snappea-account-sdk.js", "5849:5872");
__$coverInitRange("src/snappea-account-sdk.js", "5167:5256");
__$coverInitRange("src/snappea-account-sdk.js", "5287:5828");
__$coverInitRange("src/snappea-account-sdk.js", "5569:5591");
__$coverInitRange("src/snappea-account-sdk.js", "5670:5794");
__$coverInitRange("src/snappea-account-sdk.js", "5945:5974");
__$coverInitRange("src/snappea-account-sdk.js", "5985:6008");
__$coverInitRange("src/snappea-account-sdk.js", "6019:6643");
__$coverInitRange("src/snappea-account-sdk.js", "6654:6677");
__$coverInitRange("src/snappea-account-sdk.js", "6208:6528");
__$coverInitRange("src/snappea-account-sdk.js", "6252:6269");
__$coverInitRange("src/snappea-account-sdk.js", "6291:6314");
__$coverInitRange("src/snappea-account-sdk.js", "6336:6358");
__$coverInitRange("src/snappea-account-sdk.js", "6405:6423");
__$coverInitRange("src/snappea-account-sdk.js", "6445:6466");
__$coverInitRange("src/snappea-account-sdk.js", "6488:6510");
__$coverInitRange("src/snappea-account-sdk.js", "6595:6617");
__$coverInitRange("src/snappea-account-sdk.js", "6753:6782");
__$coverInitRange("src/snappea-account-sdk.js", "6793:6816");
__$coverInitRange("src/snappea-account-sdk.js", "6827:7680");
__$coverInitRange("src/snappea-account-sdk.js", "7691:7714");
__$coverInitRange("src/snappea-account-sdk.js", "6869:6958");
__$coverInitRange("src/snappea-account-sdk.js", "6989:7670");
__$coverInitRange("src/snappea-account-sdk.js", "7265:7433");
__$coverInitRange("src/snappea-account-sdk.js", "7313:7335");
__$coverInitRange("src/snappea-account-sdk.js", "7390:7411");
__$coverInitRange("src/snappea-account-sdk.js", "7512:7636");
__$coverInitRange("src/snappea-account-sdk.js", "7788:7817");
__$coverInitRange("src/snappea-account-sdk.js", "7828:7845");
__$coverInitRange("src/snappea-account-sdk.js", "7855:7878");
__$coverInitRange("src/snappea-account-sdk.js", "7889:8812");
__$coverInitRange("src/snappea-account-sdk.js", "8823:8846");
__$coverInitRange("src/snappea-account-sdk.js", "7983:8072");
__$coverInitRange("src/snappea-account-sdk.js", "8103:8802");
__$coverInitRange("src/snappea-account-sdk.js", "8397:8565");
__$coverInitRange("src/snappea-account-sdk.js", "8445:8467");
__$coverInitRange("src/snappea-account-sdk.js", "8522:8543");
__$coverInitRange("src/snappea-account-sdk.js", "8644:8768");
__$coverInitRange("src/snappea-account-sdk.js", "8919:8948");
__$coverInitRange("src/snappea-account-sdk.js", "8959:8976");
__$coverInitRange("src/snappea-account-sdk.js", "8986:9009");
__$coverInitRange("src/snappea-account-sdk.js", "9020:10124");
__$coverInitRange("src/snappea-account-sdk.js", "10135:10158");
__$coverInitRange("src/snappea-account-sdk.js", "9161:9250");
__$coverInitRange("src/snappea-account-sdk.js", "9281:10114");
__$coverInitRange("src/snappea-account-sdk.js", "9709:9877");
__$coverInitRange("src/snappea-account-sdk.js", "9757:9779");
__$coverInitRange("src/snappea-account-sdk.js", "9834:9855");
__$coverInitRange("src/snappea-account-sdk.js", "9956:10080");
__$coverInitRange("src/snappea-account-sdk.js", "10232:10261");
__$coverInitRange("src/snappea-account-sdk.js", "10272:10289");
__$coverInitRange("src/snappea-account-sdk.js", "10299:10322");
__$coverInitRange("src/snappea-account-sdk.js", "10333:11303");
__$coverInitRange("src/snappea-account-sdk.js", "11314:11337");
__$coverInitRange("src/snappea-account-sdk.js", "10430:10519");
__$coverInitRange("src/snappea-account-sdk.js", "10550:11293");
__$coverInitRange("src/snappea-account-sdk.js", "10888:11056");
__$coverInitRange("src/snappea-account-sdk.js", "10936:10958");
__$coverInitRange("src/snappea-account-sdk.js", "11013:11034");
__$coverInitRange("src/snappea-account-sdk.js", "11135:11259");
__$coverInitRange("src/snappea-account-sdk.js", "11415:11444");
__$coverInitRange("src/snappea-account-sdk.js", "11455:11472");
__$coverInitRange("src/snappea-account-sdk.js", "11482:11505");
__$coverInitRange("src/snappea-account-sdk.js", "11516:12439");
__$coverInitRange("src/snappea-account-sdk.js", "12450:12473");
__$coverInitRange("src/snappea-account-sdk.js", "11563:11652");
__$coverInitRange("src/snappea-account-sdk.js", "11683:12429");
__$coverInitRange("src/snappea-account-sdk.js", "11968:12192");
__$coverInitRange("src/snappea-account-sdk.js", "12016:12039");
__$coverInitRange("src/snappea-account-sdk.js", "12065:12094");
__$coverInitRange("src/snappea-account-sdk.js", "12149:12170");
__$coverInitRange("src/snappea-account-sdk.js", "12271:12395");
__$coverInitRange("src/snappea-account-sdk.js", "12589:12618");
__$coverInitRange("src/snappea-account-sdk.js", "12629:12646");
__$coverInitRange("src/snappea-account-sdk.js", "12656:12679");
__$coverInitRange("src/snappea-account-sdk.js", "12690:12705");
__$coverInitRange("src/snappea-account-sdk.js", "12716:13900");
__$coverInitRange("src/snappea-account-sdk.js", "13911:13934");
__$coverInitRange("src/snappea-account-sdk.js", "12759:12848");
__$coverInitRange("src/snappea-account-sdk.js", "12879:12911");
__$coverInitRange("src/snappea-account-sdk.js", "12925:12959");
__$coverInitRange("src/snappea-account-sdk.js", "12974:13126");
__$coverInitRange("src/snappea-account-sdk.js", "13141:13890");
__$coverInitRange("src/snappea-account-sdk.js", "13011:13112");
__$coverInitRange("src/snappea-account-sdk.js", "13064:13094");
__$coverInitRange("src/snappea-account-sdk.js", "13422:13653");
__$coverInitRange("src/snappea-account-sdk.js", "13470:13493");
__$coverInitRange("src/snappea-account-sdk.js", "13519:13555");
__$coverInitRange("src/snappea-account-sdk.js", "13610:13631");
__$coverInitRange("src/snappea-account-sdk.js", "13732:13856");
__$coverInitRange("src/snappea-account-sdk.js", "13993:14108");
__$coverInitRange("src/snappea-account-sdk.js", "14118:14150");
__$coverInitRange("src/snappea-account-sdk.js", "14215:14279");
__$coverInitRange("src/snappea-account-sdk.js", "14289:14321");
__$coverInitRange("src/snappea-account-sdk.js", "14455:14478");
__$coverInitRange("src/snappea-account-sdk.js", "14489:14555");
__$coverInitRange("src/snappea-account-sdk.js", "14566:14701");
__$coverInitRange("src/snappea-account-sdk.js", "14712:14754");
__$coverInitRange("src/snappea-account-sdk.js", "14764:14787");
__$coverInitRange("src/snappea-account-sdk.js", "14798:14812");
__$coverInitRange("src/snappea-account-sdk.js", "14822:14827");
__$coverInitRange("src/snappea-account-sdk.js", "14837:15002");
__$coverInitRange("src/snappea-account-sdk.js", "15013:15083");
__$coverInitRange("src/snappea-account-sdk.js", "15094:15183");
__$coverInitRange("src/snappea-account-sdk.js", "15194:15225");
__$coverInitRange("src/snappea-account-sdk.js", "14870:14992");
__$coverInitRange("src/snappea-account-sdk.js", "14919:14978");
__$coverInitRange("src/snappea-account-sdk.js", "15130:15173");
__$coverCall('src/snappea-account-sdk.js', '16:15344');
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
    __$coverCall('src/snappea-account-sdk.js', '715:1257');
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
            modifyPwd: PREFIX + '/profile/password',
            completeProfile: PREFIX + '/completeProfile',
            avatar: PREFIX + '/avatar'
        };
    __$coverCall('src/snappea-account-sdk.js', '1264:1349');
    var CONFIG_WEB = { loginWithThirdParty: HOST + '/web/oauth2/{1}/login' };
    __$coverCall('src/snappea-account-sdk.js', '1356:1369');
    var USER_INFO;
    __$coverCall('src/snappea-account-sdk.js', '1375:1397');
    var IS_LOGINED = false;
    __$coverCall('src/snappea-account-sdk.js', '1404:1420');
    var Account = {};
    __$coverCall('src/snappea-account-sdk.js', '1427:1459');
    Account.CAPTCHA = CONFIG.captcha;
    __$coverCall('src/snappea-account-sdk.js', '1466:2724');
    Account.loginAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '1522:1551');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '1562:1579');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '1589:1612');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '1623:2683');
        if (!data.username || !data.password) {
            __$coverCall('src/snappea-account-sdk.js', '1675:1764');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '1795:2673');
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
                    __$coverCall('src/snappea-account-sdk.js', '2170:2437');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '2218:2235');
                        IS_LOGINED = true;
                        __$coverCall('src/snappea-account-sdk.js', '2261:2284');
                        USER_INFO = resp.member;
                        __$coverCall('src/snappea-account-sdk.js', '2310:2339');
                        deferred.resolve(resp.member);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '2394:2415');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '2516:2639');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '2694:2717');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '2731:2797');
    Account.isLogined = function () {
        __$coverCall('src/snappea-account-sdk.js', '2773:2790');
        return IS_LOGINED;
    };
    __$coverCall('src/snappea-account-sdk.js', '2804:2871');
    Account.getUserInfo = function () {
        __$coverCall('src/snappea-account-sdk.js', '2848:2864');
        return USER_INFO;
    };
    __$coverCall('src/snappea-account-sdk.js', '2878:3666');
    Account.logoutAsync = function (options) {
        __$coverCall('src/snappea-account-sdk.js', '2929:2958');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '2969:2992');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '3003:3625');
        ajax({
            type: 'POST',
            dataType: 'json',
            url: CONFIG.logout,
            data: options,
            success: function (resp) {
                __$coverCall('src/snappea-account-sdk.js', '3185:3420');
                if (resp.error === 0) {
                    __$coverCall('src/snappea-account-sdk.js', '3229:3247');
                    IS_LOGINED = false;
                    __$coverCall('src/snappea-account-sdk.js', '3269:3290');
                    USER_INFO = undefined;
                    __$coverCall('src/snappea-account-sdk.js', '3312:3334');
                    deferred.resolve(resp);
                } else {
                    __$coverCall('src/snappea-account-sdk.js', '3381:3402');
                    deferred.reject(resp);
                }
            },
            error: function () {
                __$coverCall('src/snappea-account-sdk.js', '3487:3599');
                deferred.reject({
                    error: -1,
                    msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                });
            }
        });
        __$coverCall('src/snappea-account-sdk.js', '3636:3659');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '3673:4976');
    Account.regAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '3727:3756');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '3767:3784');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '3794:3817');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '3828:4935');
        if (!data.username || !data.password) {
            __$coverCall('src/snappea-account-sdk.js', '3880:3969');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '4000:4925');
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
                    __$coverCall('src/snappea-account-sdk.js', '4421:4688');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '4469:4486');
                        IS_LOGINED = true;
                        __$coverCall('src/snappea-account-sdk.js', '4512:4535');
                        USER_INFO = resp.member;
                        __$coverCall('src/snappea-account-sdk.js', '4561:4590');
                        deferred.resolve(resp.member);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '4645:4666');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '4767:4891');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '4946:4969');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '4983:5879');
    Account.checkUsernameAsync = function (username, options) {
        __$coverCall('src/snappea-account-sdk.js', '5051:5080');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '5091:5114');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '5125:5838');
        if (username === undefined) {
            __$coverCall('src/snappea-account-sdk.js', '5167:5256');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '5287:5828');
            ajax({
                type: 'POST',
                dataType: 'json',
                url: CONFIG.checkUsername,
                data: extend({ username: username }, options),
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '5569:5591');
                    deferred.resolve(resp);
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '5670:5794');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '5849:5872');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '5886:6684');
    Account.checkUserLoginAsync = function (options) {
        __$coverCall('src/snappea-account-sdk.js', '5945:5974');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '5985:6008');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '6019:6643');
        ajax({
            type: 'GET',
            dataType: 'json',
            url: CONFIG.checkUserLogin,
            data: options,
            success: function (resp) {
                __$coverCall('src/snappea-account-sdk.js', '6208:6528');
                if (resp.error === 0) {
                    __$coverCall('src/snappea-account-sdk.js', '6252:6269');
                    IS_LOGINED = true;
                    __$coverCall('src/snappea-account-sdk.js', '6291:6314');
                    USER_INFO = resp.member;
                    __$coverCall('src/snappea-account-sdk.js', '6336:6358');
                    deferred.resolve(true);
                } else {
                    __$coverCall('src/snappea-account-sdk.js', '6405:6423');
                    IS_LOGINED = false;
                    __$coverCall('src/snappea-account-sdk.js', '6445:6466');
                    USER_INFO = undefined;
                    __$coverCall('src/snappea-account-sdk.js', '6488:6510');
                    deferred.reject(false);
                }
            },
            error: function () {
                __$coverCall('src/snappea-account-sdk.js', '6595:6617');
                deferred.reject(false);
            }
        });
        __$coverCall('src/snappea-account-sdk.js', '6654:6677');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '6691:7721');
    Account.findPwdAsync = function (username, options) {
        __$coverCall('src/snappea-account-sdk.js', '6753:6782');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '6793:6816');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '6827:7680');
        if (username === undefined) {
            __$coverCall('src/snappea-account-sdk.js', '6869:6958');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '6989:7670');
            ajax({
                type: 'POST',
                dataType: 'json',
                url: CONFIG.findPwd,
                data: extend({ username: username }, options),
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '7265:7433');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '7313:7335');
                        deferred.resolve(resp);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '7390:7411');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '7512:7636');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '7691:7714');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '7728:8853');
    Account.checkCodeAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '7788:7817');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '7828:7845');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '7855:7878');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '7889:8812');
        if (data.username === undefined || data.passcode === undefined) {
            __$coverCall('src/snappea-account-sdk.js', '7983:8072');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '8103:8802');
            ajax({
                type: 'POST',
                url: CONFIG.checkCode,
                data: extend({
                    username: data.username,
                    passcode: data.passcode
                }, options),
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '8397:8565');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '8445:8467');
                        deferred.resolve(resp);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '8522:8543');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '8644:8768');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '8823:8846');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '8860:10165');
    Account.resetPwdAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '8919:8948');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '8959:8976');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '8986:9009');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '9020:10124');
        if (data.username === undefined || data.passcode === undefined || data.password === undefined) {
            __$coverCall('src/snappea-account-sdk.js', '9161:9250');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '9281:10114');
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
                    __$coverCall('src/snappea-account-sdk.js', '9709:9877');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '9757:9779');
                        deferred.resolve(resp);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '9834:9855');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '9956:10080');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '10135:10158');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '10172:11344');
    Account.modifyPwdAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '10232:10261');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '10272:10289');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '10299:10322');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '10333:11303');
        if (data.password === undefined || data.newpassword === undefined) {
            __$coverCall('src/snappea-account-sdk.js', '10430:10519');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '10550:11293');
            ajax({
                type: 'POST',
                dataType: 'json',
                url: CONFIG.modifyPwd,
                data: extend({
                    oldpassword: data.password,
                    newpassword: data.newpassword
                }, options),
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '10888:11056');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '10936:10958');
                        deferred.resolve(resp);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '11013:11034');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '11135:11259');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '11314:11337');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '11351:12480');
    Account.updateProfileAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '11415:11444');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '11455:11472');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '11482:11505');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '11516:12439');
        if (data.nickname === undefined) {
            __$coverCall('src/snappea-account-sdk.js', '11563:11652');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '11683:12429');
            ajax({
                type: 'POST',
                dataType: 'json',
                url: CONFIG.completeProfile,
                data: extend({ nick: data.nickname }, options),
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '11968:12192');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '12016:12039');
                        USER_INFO = resp.member;
                        __$coverCall('src/snappea-account-sdk.js', '12065:12094');
                        deferred.resolve(resp.member);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '12149:12170');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '12271:12395');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '12450:12473');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '12526:13941');
    Account.uploadAvatarAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '12589:12618');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '12629:12646');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '12656:12679');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '12690:12705');
        var formData, f;
        __$coverCall('src/snappea-account-sdk.js', '12716:13900');
        if (data.file === undefined) {
            __$coverCall('src/snappea-account-sdk.js', '12759:12848');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '12879:12911');
            formData = new global.FormData();
            __$coverCall('src/snappea-account-sdk.js', '12925:12959');
            formData.append('file', data.file);
            __$coverCall('src/snappea-account-sdk.js', '12974:13126');
            for (f in options) {
                __$coverCall('src/snappea-account-sdk.js', '13011:13112');
                if (options.hasOwnProperty(f)) {
                    __$coverCall('src/snappea-account-sdk.js', '13064:13094');
                    formData.append(f, options[f]);
                }
            }
            __$coverCall('src/snappea-account-sdk.js', '13141:13890');
            ajax({
                type: 'POST',
                dataType: 'json',
                url: CONFIG.avatar,
                data: formData,
                processData: false,
                contentType: false,
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '13422:13653');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '13470:13493');
                        USER_INFO = resp.member;
                        __$coverCall('src/snappea-account-sdk.js', '13519:13555');
                        deferred.resolve(resp.member.avatar);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '13610:13631');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '13732:13856');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '13911:13934');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '13948:14157');
    Account.isEmail = function (input) {
        __$coverCall('src/snappea-account-sdk.js', '13993:14108');
        var EMAIL_PATTREN = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/;
        __$coverCall('src/snappea-account-sdk.js', '14118:14150');
        return EMAIL_PATTREN.test(input);
    };
    __$coverCall('src/snappea-account-sdk.js', '14164:14328');
    Account.isPhoneNumber = function (input) {
        __$coverCall('src/snappea-account-sdk.js', '14215:14279');
        var PHONE_PATTERN = /^(1(([35][0-9])|(47)|[8][01236789]))\d{8}$/;
        __$coverCall('src/snappea-account-sdk.js', '14289:14321');
        return PHONE_PATTERN.test(input);
    };
    __$coverCall('src/snappea-account-sdk.js', '14396:15232');
    Account.loginWithThirdParty = function (options) {
        __$coverCall('src/snappea-account-sdk.js', '14455:14478');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '14489:14555');
        options.callback = options.callback || 'http://www.wandoujia.com/';
        __$coverCall('src/snappea-account-sdk.js', '14566:14701');
        var platforms = {
                weibo: 'sina',
                sina: 'sina',
                renren: 'renren',
                qq: 'qq'
            };
        __$coverCall('src/snappea-account-sdk.js', '14712:14754');
        var platform = platforms[options.platform];
        __$coverCall('src/snappea-account-sdk.js', '14764:14787');
        delete options.platform;
        __$coverCall('src/snappea-account-sdk.js', '14798:14812');
        var datas = [];
        __$coverCall('src/snappea-account-sdk.js', '14822:14827');
        var d;
        __$coverCall('src/snappea-account-sdk.js', '14837:15002');
        for (d in options) {
            __$coverCall('src/snappea-account-sdk.js', '14870:14992');
            if (options.hasOwnProperty(d)) {
                __$coverCall('src/snappea-account-sdk.js', '14919:14978');
                datas.push(d + '=' + global.encodeURIComponent(options[d]));
            }
        }
        __$coverCall('src/snappea-account-sdk.js', '15013:15083');
        var targeURL = CONFIG_WEB.loginWithThirdParty.replace('{1}', platform);
        __$coverCall('src/snappea-account-sdk.js', '15094:15183');
        if (datas.length > 0) {
            __$coverCall('src/snappea-account-sdk.js', '15130:15173');
            targeURL = targeURL + '?' + datas.join('&');
        }
        __$coverCall('src/snappea-account-sdk.js', '15194:15225');
        global.location.href = targeURL;
    };
    __$coverCall('src/snappea-account-sdk.js', '15239:15273');
    var SnapPea = global.SnapPea || {};
    __$coverCall('src/snappea-account-sdk.js', '15279:15304');
    SnapPea.Account = Account;
    __$coverCall('src/snappea-account-sdk.js', '15310:15334');
    global.SnapPea = SnapPea;
}(this));
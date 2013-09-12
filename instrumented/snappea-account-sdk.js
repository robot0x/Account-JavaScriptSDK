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
__$coverInit("src/snappea-account-sdk.js", "/*global $, Q*/\n(function (global) {\n    //@@ lib/q/q.js\n    var Deferred = Q.defer;\n    var ajax = $.ajax;\n\n    if ($.ajaxSetup) {\n        $.ajaxSetup({\n            xhrFields : {\n                withCredentials : true\n            }\n        });\n    } else {\n        // $.ajaxSettings;\n    }\n\n    var extend = function (dist, source) {\n        if (!source) {\n            return dist;\n        }\n\n        var prop;\n        for (prop in source) {\n            if (source.hasOwnProperty(prop)) {\n                dist[prop] = source[prop];\n            }\n        }\n\n        return dist;\n    };\n\n    var HOST = 'https://account.wandoujia.com';\n    var API_VERSION_4 = '/v4/api';\n\n    var PREFIX = HOST + API_VERSION_4;\n\n    var CONFIG = {\n        login : PREFIX + '/login',\n        logout : PREFIX + '/logout',\n        captcha : PREFIX + '/seccode',\n        reg : PREFIX + '/register',\n        checkUsername : PREFIX + '/isUsernameExisted',\n        checkUserLogin : PREFIX + '/profile',\n        findPwd : PREFIX + '/findpassword',\n        checkCode : PREFIX + '/checkcode',\n        resetPwd : PREFIX + '/resetpassword',\n        modifyPwd : PREFIX + '/profile/password',\n        avatar : PREFIX + '/avatar'\n    };\n\n    var CONFIG_WEB = {\n        loginWithThirdParty : HOST + '/web/oauth2/{1}/login'\n    };\n\n    var USER_INFO;\n    var IS_LOGINED = false;\n\n    var Account = {};\n\n    Account.CAPTCHA = CONFIG.captcha;\n\n    Account.loginAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (!data.username || !data.password) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.login,\n                data : extend({\n                    username : data.username,\n                    password : data.password,\n                    seccode : data.seccode || ''\n                }, options),\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        IS_LOGINED = true;\n                        USER_INFO = resp.member;\n                        deferred.resolve(resp.member);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.isLogined = function () {\n        return IS_LOGINED;\n    };\n\n    Account.getUserInfo = function () {\n        return USER_INFO;\n    };\n\n    Account.logoutAsync = function (options) {\n        var deferred = new Deferred();\n\n        options = options || {};\n\n        ajax({\n            type : 'POST',\n            dataType : 'json',\n            url : CONFIG.logout,\n            data : options,\n            success : function (resp) {\n                if (resp.error === 0) {\n                    IS_LOGINED = false;\n                    USER_INFO = undefined;\n                    deferred.resolve(resp);\n                } else {\n                    deferred.reject(resp);\n                }\n            },\n            error : function () {\n                deferred.reject({\n                    error : -1,\n                    msg : '请求失败，请检查网络连接状况。'\n                });\n            }\n        });\n\n        return deferred.promise;\n    };\n\n    Account.regAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (!data.username || !data.password) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.reg,\n                data : extend({\n                    username : data.username,\n                    password : data.password,\n                    nick : data.nickname || '',\n                    seccode : data.seccode || ''\n                }, options),\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        IS_LOGINED = true;\n                        USER_INFO = resp.member;\n                        deferred.resolve(resp.member);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.checkUsernameAsync = function (username, options) {\n        var deferred = new Deferred();\n\n        options = options || {};\n\n        if (username === undefined) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.checkUsername,\n                data : extend({\n                    username : username\n                }, options),\n                success : function (resp) {\n                    deferred.resolve(resp);\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.checkUserLoginAsync = function (options) {\n        var deferred = new Deferred();\n\n        options = options || {};\n\n        ajax({\n            type : 'GET',\n            dataType : 'json',\n            url : CONFIG.checkUserLogin,\n            data : options,\n            success : function (resp) {\n                if (resp.error === 0) {\n                    IS_LOGINED = true;\n                    USER_INFO = resp.member;\n                    deferred.resolve(true);\n                } else {\n                    IS_LOGINED = false;\n                    USER_INFO = undefined;\n                    deferred.reject(false);\n                }\n            },\n            error : function () {\n                deferred.reject(false);\n            }\n        });\n\n        return deferred.promise;\n    };\n\n    Account.findPwdAsync = function (username, options) {\n        var deferred = new Deferred();\n\n        options = options || {};\n\n        if (username === undefined) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.findPwd,\n                data : extend({\n                    username : username\n                }, options),\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        deferred.resolve(resp);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.checkCodeAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (data.username === undefined ||\n                data.passcode === undefined) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                url : CONFIG.checkCode,\n                data : extend({\n                    username : data.username,\n                    passcode : data.passcode\n                }, options),\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        deferred.resolve(resp);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.resetPwdAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (data.username === undefined ||\n                data.passcode === undefined ||\n                data.password === undefined) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.resetPwd,\n                data : extend({\n                    username : data.username,\n                    passcode : data.passcode,\n                    password : data.password,\n                    repeatedpassword : data.password\n                }, options),\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        deferred.resolve(resp);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.modifyPwdAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        if (data.password === undefined ||\n                data.newpassword === undefined) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.modifyPwd,\n                data : extend({\n                    oldpassword : data.password,\n                    newpassword : data.newpassword\n                }, options),\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        deferred.resolve(resp);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n        return deferred.promise;\n    };\n\n    Account.uploadAvatarAsync = function (data, options) {\n        var deferred = new Deferred();\n\n        data = data || {};\n        options = options || {};\n\n        var formData, f;\n\n        if (data.file === undefined) {\n            deferred.reject({\n                error : -2,\n                msg : '参数不全'\n            });\n        } else {\n            formData = new global.FormData();\n            formData.append('file', data.file);\n\n            for (f in options) {\n                if (options.hasOwnProperty(f)) {\n                    formData.append(f, options[f]);\n                }\n            }\n\n            ajax({\n                type : 'POST',\n                dataType : 'json',\n                url : CONFIG.avatar,\n                data : formData,\n                processData : false,\n                contentType : false,\n                success : function (resp) {\n                    if (resp.error === 0) {\n                        deferred.resolve(resp.member.avatar);\n                    } else {\n                        deferred.reject(resp);\n                    }\n                },\n                error : function () {\n                    deferred.reject({\n                        error : -1,\n                        msg : '请求失败，请检查网络连接状况。'\n                    });\n                }\n            });\n        }\n\n\n        return deferred.promise;\n    };\n\n    Account.isEmail = function (input) {\n        var EMAIL_PATTREN = /^[A-Za-z0-9](([_\\.\\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\\.\\-]?[a-zA-Z0-9]+)*)\\.([A-Za-z]{2,})$/;\n        return EMAIL_PATTREN.test(input);\n    };\n\n    Account.isPhoneNumber = function (input) {\n        var PHONE_PATTERN = /^(1(([35][0-9])|(47)|[8][01236789]))\\d{8}$/;\n        return PHONE_PATTERN.test(input);\n    };\n\n    /* `platform` could be one of `weibo`, `qq`, `renren` */\n    Account.loginWithThirdParty = function (options) {\n        options = options || {};\n\n        options.callback = options.callback || 'http://www.wandoujia.com/';\n\n        var platforms = {\n            weibo : 'sina',\n            sina : 'sina',\n            renren : 'renren',\n            qq : 'qq'\n        };\n\n        var platform = platforms[options.platform];\n        delete options.platform;\n\n        var datas = [];\n        var d;\n        for (d in options) {\n            if (options.hasOwnProperty(d)) {\n                datas.push(d + '=' + global.encodeURIComponent(options[d]));\n            }\n        }\n\n        var targeURL = CONFIG_WEB.loginWithThirdParty.replace('{1}', platform);\n\n        if (datas.length > 0) {\n            targeURL = targeURL + '?' + datas.join('&');\n        }\n\n        global.location.href = targeURL;\n    };\n\n    var SnapPea = global.SnapPea || {};\n    SnapPea.Account = Account;\n    global.SnapPea = SnapPea;\n}(this));\n");
__$coverInitRange("src/snappea-account-sdk.js", "16:14066");
__$coverInitRange("src/snappea-account-sdk.js", "61:83");
__$coverInitRange("src/snappea-account-sdk.js", "89:106");
__$coverInitRange("src/snappea-account-sdk.js", "113:289");
__$coverInitRange("src/snappea-account-sdk.js", "296:584");
__$coverInitRange("src/snappea-account-sdk.js", "591:633");
__$coverInitRange("src/snappea-account-sdk.js", "639:668");
__$coverInitRange("src/snappea-account-sdk.js", "675:708");
__$coverInitRange("src/snappea-account-sdk.js", "715:1202");
__$coverInitRange("src/snappea-account-sdk.js", "1209:1294");
__$coverInitRange("src/snappea-account-sdk.js", "1301:1314");
__$coverInitRange("src/snappea-account-sdk.js", "1320:1342");
__$coverInitRange("src/snappea-account-sdk.js", "1349:1365");
__$coverInitRange("src/snappea-account-sdk.js", "1372:1404");
__$coverInitRange("src/snappea-account-sdk.js", "1411:2669");
__$coverInitRange("src/snappea-account-sdk.js", "2676:2742");
__$coverInitRange("src/snappea-account-sdk.js", "2749:2816");
__$coverInitRange("src/snappea-account-sdk.js", "2823:3611");
__$coverInitRange("src/snappea-account-sdk.js", "3618:4921");
__$coverInitRange("src/snappea-account-sdk.js", "4928:5824");
__$coverInitRange("src/snappea-account-sdk.js", "5831:6629");
__$coverInitRange("src/snappea-account-sdk.js", "6636:7666");
__$coverInitRange("src/snappea-account-sdk.js", "7673:8798");
__$coverInitRange("src/snappea-account-sdk.js", "8805:10110");
__$coverInitRange("src/snappea-account-sdk.js", "10117:11289");
__$coverInitRange("src/snappea-account-sdk.js", "11296:12663");
__$coverInitRange("src/snappea-account-sdk.js", "12670:12879");
__$coverInitRange("src/snappea-account-sdk.js", "12886:13050");
__$coverInitRange("src/snappea-account-sdk.js", "13118:13954");
__$coverInitRange("src/snappea-account-sdk.js", "13961:13995");
__$coverInitRange("src/snappea-account-sdk.js", "14001:14026");
__$coverInitRange("src/snappea-account-sdk.js", "14032:14056");
__$coverInitRange("src/snappea-account-sdk.js", "140:243");
__$coverInitRange("src/snappea-account-sdk.js", "343:391");
__$coverInitRange("src/snappea-account-sdk.js", "402:410");
__$coverInitRange("src/snappea-account-sdk.js", "420:555");
__$coverInitRange("src/snappea-account-sdk.js", "566:577");
__$coverInitRange("src/snappea-account-sdk.js", "370:381");
__$coverInitRange("src/snappea-account-sdk.js", "455:545");
__$coverInitRange("src/snappea-account-sdk.js", "506:531");
__$coverInitRange("src/snappea-account-sdk.js", "1467:1496");
__$coverInitRange("src/snappea-account-sdk.js", "1507:1524");
__$coverInitRange("src/snappea-account-sdk.js", "1534:1557");
__$coverInitRange("src/snappea-account-sdk.js", "1568:2628");
__$coverInitRange("src/snappea-account-sdk.js", "2639:2662");
__$coverInitRange("src/snappea-account-sdk.js", "1620:1709");
__$coverInitRange("src/snappea-account-sdk.js", "1740:2618");
__$coverInitRange("src/snappea-account-sdk.js", "2115:2382");
__$coverInitRange("src/snappea-account-sdk.js", "2163:2180");
__$coverInitRange("src/snappea-account-sdk.js", "2206:2229");
__$coverInitRange("src/snappea-account-sdk.js", "2255:2284");
__$coverInitRange("src/snappea-account-sdk.js", "2339:2360");
__$coverInitRange("src/snappea-account-sdk.js", "2461:2584");
__$coverInitRange("src/snappea-account-sdk.js", "2718:2735");
__$coverInitRange("src/snappea-account-sdk.js", "2793:2809");
__$coverInitRange("src/snappea-account-sdk.js", "2874:2903");
__$coverInitRange("src/snappea-account-sdk.js", "2914:2937");
__$coverInitRange("src/snappea-account-sdk.js", "2948:3570");
__$coverInitRange("src/snappea-account-sdk.js", "3581:3604");
__$coverInitRange("src/snappea-account-sdk.js", "3130:3365");
__$coverInitRange("src/snappea-account-sdk.js", "3174:3192");
__$coverInitRange("src/snappea-account-sdk.js", "3214:3235");
__$coverInitRange("src/snappea-account-sdk.js", "3257:3279");
__$coverInitRange("src/snappea-account-sdk.js", "3326:3347");
__$coverInitRange("src/snappea-account-sdk.js", "3432:3544");
__$coverInitRange("src/snappea-account-sdk.js", "3672:3701");
__$coverInitRange("src/snappea-account-sdk.js", "3712:3729");
__$coverInitRange("src/snappea-account-sdk.js", "3739:3762");
__$coverInitRange("src/snappea-account-sdk.js", "3773:4880");
__$coverInitRange("src/snappea-account-sdk.js", "4891:4914");
__$coverInitRange("src/snappea-account-sdk.js", "3825:3914");
__$coverInitRange("src/snappea-account-sdk.js", "3945:4870");
__$coverInitRange("src/snappea-account-sdk.js", "4366:4633");
__$coverInitRange("src/snappea-account-sdk.js", "4414:4431");
__$coverInitRange("src/snappea-account-sdk.js", "4457:4480");
__$coverInitRange("src/snappea-account-sdk.js", "4506:4535");
__$coverInitRange("src/snappea-account-sdk.js", "4590:4611");
__$coverInitRange("src/snappea-account-sdk.js", "4712:4836");
__$coverInitRange("src/snappea-account-sdk.js", "4996:5025");
__$coverInitRange("src/snappea-account-sdk.js", "5036:5059");
__$coverInitRange("src/snappea-account-sdk.js", "5070:5783");
__$coverInitRange("src/snappea-account-sdk.js", "5794:5817");
__$coverInitRange("src/snappea-account-sdk.js", "5112:5201");
__$coverInitRange("src/snappea-account-sdk.js", "5232:5773");
__$coverInitRange("src/snappea-account-sdk.js", "5514:5536");
__$coverInitRange("src/snappea-account-sdk.js", "5615:5739");
__$coverInitRange("src/snappea-account-sdk.js", "5890:5919");
__$coverInitRange("src/snappea-account-sdk.js", "5930:5953");
__$coverInitRange("src/snappea-account-sdk.js", "5964:6588");
__$coverInitRange("src/snappea-account-sdk.js", "6599:6622");
__$coverInitRange("src/snappea-account-sdk.js", "6153:6473");
__$coverInitRange("src/snappea-account-sdk.js", "6197:6214");
__$coverInitRange("src/snappea-account-sdk.js", "6236:6259");
__$coverInitRange("src/snappea-account-sdk.js", "6281:6303");
__$coverInitRange("src/snappea-account-sdk.js", "6350:6368");
__$coverInitRange("src/snappea-account-sdk.js", "6390:6411");
__$coverInitRange("src/snappea-account-sdk.js", "6433:6455");
__$coverInitRange("src/snappea-account-sdk.js", "6540:6562");
__$coverInitRange("src/snappea-account-sdk.js", "6698:6727");
__$coverInitRange("src/snappea-account-sdk.js", "6738:6761");
__$coverInitRange("src/snappea-account-sdk.js", "6772:7625");
__$coverInitRange("src/snappea-account-sdk.js", "7636:7659");
__$coverInitRange("src/snappea-account-sdk.js", "6814:6903");
__$coverInitRange("src/snappea-account-sdk.js", "6934:7615");
__$coverInitRange("src/snappea-account-sdk.js", "7210:7378");
__$coverInitRange("src/snappea-account-sdk.js", "7258:7280");
__$coverInitRange("src/snappea-account-sdk.js", "7335:7356");
__$coverInitRange("src/snappea-account-sdk.js", "7457:7581");
__$coverInitRange("src/snappea-account-sdk.js", "7733:7762");
__$coverInitRange("src/snappea-account-sdk.js", "7773:7790");
__$coverInitRange("src/snappea-account-sdk.js", "7800:7823");
__$coverInitRange("src/snappea-account-sdk.js", "7834:8757");
__$coverInitRange("src/snappea-account-sdk.js", "8768:8791");
__$coverInitRange("src/snappea-account-sdk.js", "7928:8017");
__$coverInitRange("src/snappea-account-sdk.js", "8048:8747");
__$coverInitRange("src/snappea-account-sdk.js", "8342:8510");
__$coverInitRange("src/snappea-account-sdk.js", "8390:8412");
__$coverInitRange("src/snappea-account-sdk.js", "8467:8488");
__$coverInitRange("src/snappea-account-sdk.js", "8589:8713");
__$coverInitRange("src/snappea-account-sdk.js", "8864:8893");
__$coverInitRange("src/snappea-account-sdk.js", "8904:8921");
__$coverInitRange("src/snappea-account-sdk.js", "8931:8954");
__$coverInitRange("src/snappea-account-sdk.js", "8965:10069");
__$coverInitRange("src/snappea-account-sdk.js", "10080:10103");
__$coverInitRange("src/snappea-account-sdk.js", "9106:9195");
__$coverInitRange("src/snappea-account-sdk.js", "9226:10059");
__$coverInitRange("src/snappea-account-sdk.js", "9654:9822");
__$coverInitRange("src/snappea-account-sdk.js", "9702:9724");
__$coverInitRange("src/snappea-account-sdk.js", "9779:9800");
__$coverInitRange("src/snappea-account-sdk.js", "9901:10025");
__$coverInitRange("src/snappea-account-sdk.js", "10177:10206");
__$coverInitRange("src/snappea-account-sdk.js", "10217:10234");
__$coverInitRange("src/snappea-account-sdk.js", "10244:10267");
__$coverInitRange("src/snappea-account-sdk.js", "10278:11248");
__$coverInitRange("src/snappea-account-sdk.js", "11259:11282");
__$coverInitRange("src/snappea-account-sdk.js", "10375:10464");
__$coverInitRange("src/snappea-account-sdk.js", "10495:11238");
__$coverInitRange("src/snappea-account-sdk.js", "10833:11001");
__$coverInitRange("src/snappea-account-sdk.js", "10881:10903");
__$coverInitRange("src/snappea-account-sdk.js", "10958:10979");
__$coverInitRange("src/snappea-account-sdk.js", "11080:11204");
__$coverInitRange("src/snappea-account-sdk.js", "11359:11388");
__$coverInitRange("src/snappea-account-sdk.js", "11399:11416");
__$coverInitRange("src/snappea-account-sdk.js", "11426:11449");
__$coverInitRange("src/snappea-account-sdk.js", "11460:11475");
__$coverInitRange("src/snappea-account-sdk.js", "11486:12621");
__$coverInitRange("src/snappea-account-sdk.js", "12633:12656");
__$coverInitRange("src/snappea-account-sdk.js", "11529:11618");
__$coverInitRange("src/snappea-account-sdk.js", "11649:11681");
__$coverInitRange("src/snappea-account-sdk.js", "11695:11729");
__$coverInitRange("src/snappea-account-sdk.js", "11744:11896");
__$coverInitRange("src/snappea-account-sdk.js", "11911:12611");
__$coverInitRange("src/snappea-account-sdk.js", "11781:11882");
__$coverInitRange("src/snappea-account-sdk.js", "11834:11864");
__$coverInitRange("src/snappea-account-sdk.js", "12192:12374");
__$coverInitRange("src/snappea-account-sdk.js", "12240:12276");
__$coverInitRange("src/snappea-account-sdk.js", "12331:12352");
__$coverInitRange("src/snappea-account-sdk.js", "12453:12577");
__$coverInitRange("src/snappea-account-sdk.js", "12715:12830");
__$coverInitRange("src/snappea-account-sdk.js", "12840:12872");
__$coverInitRange("src/snappea-account-sdk.js", "12937:13001");
__$coverInitRange("src/snappea-account-sdk.js", "13011:13043");
__$coverInitRange("src/snappea-account-sdk.js", "13177:13200");
__$coverInitRange("src/snappea-account-sdk.js", "13211:13277");
__$coverInitRange("src/snappea-account-sdk.js", "13288:13423");
__$coverInitRange("src/snappea-account-sdk.js", "13434:13476");
__$coverInitRange("src/snappea-account-sdk.js", "13486:13509");
__$coverInitRange("src/snappea-account-sdk.js", "13520:13534");
__$coverInitRange("src/snappea-account-sdk.js", "13544:13549");
__$coverInitRange("src/snappea-account-sdk.js", "13559:13724");
__$coverInitRange("src/snappea-account-sdk.js", "13735:13805");
__$coverInitRange("src/snappea-account-sdk.js", "13816:13905");
__$coverInitRange("src/snappea-account-sdk.js", "13916:13947");
__$coverInitRange("src/snappea-account-sdk.js", "13592:13714");
__$coverInitRange("src/snappea-account-sdk.js", "13641:13700");
__$coverInitRange("src/snappea-account-sdk.js", "13852:13895");
__$coverCall('src/snappea-account-sdk.js', '16:14066');
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
    __$coverCall('src/snappea-account-sdk.js', '715:1202');
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
            avatar: PREFIX + '/avatar'
        };
    __$coverCall('src/snappea-account-sdk.js', '1209:1294');
    var CONFIG_WEB = { loginWithThirdParty: HOST + '/web/oauth2/{1}/login' };
    __$coverCall('src/snappea-account-sdk.js', '1301:1314');
    var USER_INFO;
    __$coverCall('src/snappea-account-sdk.js', '1320:1342');
    var IS_LOGINED = false;
    __$coverCall('src/snappea-account-sdk.js', '1349:1365');
    var Account = {};
    __$coverCall('src/snappea-account-sdk.js', '1372:1404');
    Account.CAPTCHA = CONFIG.captcha;
    __$coverCall('src/snappea-account-sdk.js', '1411:2669');
    Account.loginAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '1467:1496');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '1507:1524');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '1534:1557');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '1568:2628');
        if (!data.username || !data.password) {
            __$coverCall('src/snappea-account-sdk.js', '1620:1709');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '1740:2618');
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
                    __$coverCall('src/snappea-account-sdk.js', '2115:2382');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '2163:2180');
                        IS_LOGINED = true;
                        __$coverCall('src/snappea-account-sdk.js', '2206:2229');
                        USER_INFO = resp.member;
                        __$coverCall('src/snappea-account-sdk.js', '2255:2284');
                        deferred.resolve(resp.member);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '2339:2360');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '2461:2584');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '2639:2662');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '2676:2742');
    Account.isLogined = function () {
        __$coverCall('src/snappea-account-sdk.js', '2718:2735');
        return IS_LOGINED;
    };
    __$coverCall('src/snappea-account-sdk.js', '2749:2816');
    Account.getUserInfo = function () {
        __$coverCall('src/snappea-account-sdk.js', '2793:2809');
        return USER_INFO;
    };
    __$coverCall('src/snappea-account-sdk.js', '2823:3611');
    Account.logoutAsync = function (options) {
        __$coverCall('src/snappea-account-sdk.js', '2874:2903');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '2914:2937');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '2948:3570');
        ajax({
            type: 'POST',
            dataType: 'json',
            url: CONFIG.logout,
            data: options,
            success: function (resp) {
                __$coverCall('src/snappea-account-sdk.js', '3130:3365');
                if (resp.error === 0) {
                    __$coverCall('src/snappea-account-sdk.js', '3174:3192');
                    IS_LOGINED = false;
                    __$coverCall('src/snappea-account-sdk.js', '3214:3235');
                    USER_INFO = undefined;
                    __$coverCall('src/snappea-account-sdk.js', '3257:3279');
                    deferred.resolve(resp);
                } else {
                    __$coverCall('src/snappea-account-sdk.js', '3326:3347');
                    deferred.reject(resp);
                }
            },
            error: function () {
                __$coverCall('src/snappea-account-sdk.js', '3432:3544');
                deferred.reject({
                    error: -1,
                    msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                });
            }
        });
        __$coverCall('src/snappea-account-sdk.js', '3581:3604');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '3618:4921');
    Account.regAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '3672:3701');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '3712:3729');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '3739:3762');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '3773:4880');
        if (!data.username || !data.password) {
            __$coverCall('src/snappea-account-sdk.js', '3825:3914');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '3945:4870');
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
                    __$coverCall('src/snappea-account-sdk.js', '4366:4633');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '4414:4431');
                        IS_LOGINED = true;
                        __$coverCall('src/snappea-account-sdk.js', '4457:4480');
                        USER_INFO = resp.member;
                        __$coverCall('src/snappea-account-sdk.js', '4506:4535');
                        deferred.resolve(resp.member);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '4590:4611');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '4712:4836');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '4891:4914');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '4928:5824');
    Account.checkUsernameAsync = function (username, options) {
        __$coverCall('src/snappea-account-sdk.js', '4996:5025');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '5036:5059');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '5070:5783');
        if (username === undefined) {
            __$coverCall('src/snappea-account-sdk.js', '5112:5201');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '5232:5773');
            ajax({
                type: 'POST',
                dataType: 'json',
                url: CONFIG.checkUsername,
                data: extend({ username: username }, options),
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '5514:5536');
                    deferred.resolve(resp);
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '5615:5739');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '5794:5817');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '5831:6629');
    Account.checkUserLoginAsync = function (options) {
        __$coverCall('src/snappea-account-sdk.js', '5890:5919');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '5930:5953');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '5964:6588');
        ajax({
            type: 'GET',
            dataType: 'json',
            url: CONFIG.checkUserLogin,
            data: options,
            success: function (resp) {
                __$coverCall('src/snappea-account-sdk.js', '6153:6473');
                if (resp.error === 0) {
                    __$coverCall('src/snappea-account-sdk.js', '6197:6214');
                    IS_LOGINED = true;
                    __$coverCall('src/snappea-account-sdk.js', '6236:6259');
                    USER_INFO = resp.member;
                    __$coverCall('src/snappea-account-sdk.js', '6281:6303');
                    deferred.resolve(true);
                } else {
                    __$coverCall('src/snappea-account-sdk.js', '6350:6368');
                    IS_LOGINED = false;
                    __$coverCall('src/snappea-account-sdk.js', '6390:6411');
                    USER_INFO = undefined;
                    __$coverCall('src/snappea-account-sdk.js', '6433:6455');
                    deferred.reject(false);
                }
            },
            error: function () {
                __$coverCall('src/snappea-account-sdk.js', '6540:6562');
                deferred.reject(false);
            }
        });
        __$coverCall('src/snappea-account-sdk.js', '6599:6622');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '6636:7666');
    Account.findPwdAsync = function (username, options) {
        __$coverCall('src/snappea-account-sdk.js', '6698:6727');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '6738:6761');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '6772:7625');
        if (username === undefined) {
            __$coverCall('src/snappea-account-sdk.js', '6814:6903');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '6934:7615');
            ajax({
                type: 'POST',
                dataType: 'json',
                url: CONFIG.findPwd,
                data: extend({ username: username }, options),
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '7210:7378');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '7258:7280');
                        deferred.resolve(resp);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '7335:7356');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '7457:7581');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '7636:7659');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '7673:8798');
    Account.checkCodeAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '7733:7762');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '7773:7790');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '7800:7823');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '7834:8757');
        if (data.username === undefined || data.passcode === undefined) {
            __$coverCall('src/snappea-account-sdk.js', '7928:8017');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '8048:8747');
            ajax({
                type: 'POST',
                url: CONFIG.checkCode,
                data: extend({
                    username: data.username,
                    passcode: data.passcode
                }, options),
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '8342:8510');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '8390:8412');
                        deferred.resolve(resp);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '8467:8488');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '8589:8713');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '8768:8791');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '8805:10110');
    Account.resetPwdAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '8864:8893');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '8904:8921');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '8931:8954');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '8965:10069');
        if (data.username === undefined || data.passcode === undefined || data.password === undefined) {
            __$coverCall('src/snappea-account-sdk.js', '9106:9195');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '9226:10059');
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
                    __$coverCall('src/snappea-account-sdk.js', '9654:9822');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '9702:9724');
                        deferred.resolve(resp);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '9779:9800');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '9901:10025');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '10080:10103');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '10117:11289');
    Account.modifyPwdAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '10177:10206');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '10217:10234');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '10244:10267');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '10278:11248');
        if (data.password === undefined || data.newpassword === undefined) {
            __$coverCall('src/snappea-account-sdk.js', '10375:10464');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '10495:11238');
            ajax({
                type: 'POST',
                dataType: 'json',
                url: CONFIG.modifyPwd,
                data: extend({
                    oldpassword: data.password,
                    newpassword: data.newpassword
                }, options),
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '10833:11001');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '10881:10903');
                        deferred.resolve(resp);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '10958:10979');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '11080:11204');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '11259:11282');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '11296:12663');
    Account.uploadAvatarAsync = function (data, options) {
        __$coverCall('src/snappea-account-sdk.js', '11359:11388');
        var deferred = new Deferred();
        __$coverCall('src/snappea-account-sdk.js', '11399:11416');
        data = data || {};
        __$coverCall('src/snappea-account-sdk.js', '11426:11449');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '11460:11475');
        var formData, f;
        __$coverCall('src/snappea-account-sdk.js', '11486:12621');
        if (data.file === undefined) {
            __$coverCall('src/snappea-account-sdk.js', '11529:11618');
            deferred.reject({
                error: -2,
                msg: '\u53c2\u6570\u4e0d\u5168'
            });
        } else {
            __$coverCall('src/snappea-account-sdk.js', '11649:11681');
            formData = new global.FormData();
            __$coverCall('src/snappea-account-sdk.js', '11695:11729');
            formData.append('file', data.file);
            __$coverCall('src/snappea-account-sdk.js', '11744:11896');
            for (f in options) {
                __$coverCall('src/snappea-account-sdk.js', '11781:11882');
                if (options.hasOwnProperty(f)) {
                    __$coverCall('src/snappea-account-sdk.js', '11834:11864');
                    formData.append(f, options[f]);
                }
            }
            __$coverCall('src/snappea-account-sdk.js', '11911:12611');
            ajax({
                type: 'POST',
                dataType: 'json',
                url: CONFIG.avatar,
                data: formData,
                processData: false,
                contentType: false,
                success: function (resp) {
                    __$coverCall('src/snappea-account-sdk.js', '12192:12374');
                    if (resp.error === 0) {
                        __$coverCall('src/snappea-account-sdk.js', '12240:12276');
                        deferred.resolve(resp.member.avatar);
                    } else {
                        __$coverCall('src/snappea-account-sdk.js', '12331:12352');
                        deferred.reject(resp);
                    }
                },
                error: function () {
                    __$coverCall('src/snappea-account-sdk.js', '12453:12577');
                    deferred.reject({
                        error: -1,
                        msg: '\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5\u72b6\u51b5\u3002'
                    });
                }
            });
        }
        __$coverCall('src/snappea-account-sdk.js', '12633:12656');
        return deferred.promise;
    };
    __$coverCall('src/snappea-account-sdk.js', '12670:12879');
    Account.isEmail = function (input) {
        __$coverCall('src/snappea-account-sdk.js', '12715:12830');
        var EMAIL_PATTREN = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/;
        __$coverCall('src/snappea-account-sdk.js', '12840:12872');
        return EMAIL_PATTREN.test(input);
    };
    __$coverCall('src/snappea-account-sdk.js', '12886:13050');
    Account.isPhoneNumber = function (input) {
        __$coverCall('src/snappea-account-sdk.js', '12937:13001');
        var PHONE_PATTERN = /^(1(([35][0-9])|(47)|[8][01236789]))\d{8}$/;
        __$coverCall('src/snappea-account-sdk.js', '13011:13043');
        return PHONE_PATTERN.test(input);
    };
    __$coverCall('src/snappea-account-sdk.js', '13118:13954');
    Account.loginWithThirdParty = function (options) {
        __$coverCall('src/snappea-account-sdk.js', '13177:13200');
        options = options || {};
        __$coverCall('src/snappea-account-sdk.js', '13211:13277');
        options.callback = options.callback || 'http://www.wandoujia.com/';
        __$coverCall('src/snappea-account-sdk.js', '13288:13423');
        var platforms = {
                weibo: 'sina',
                sina: 'sina',
                renren: 'renren',
                qq: 'qq'
            };
        __$coverCall('src/snappea-account-sdk.js', '13434:13476');
        var platform = platforms[options.platform];
        __$coverCall('src/snappea-account-sdk.js', '13486:13509');
        delete options.platform;
        __$coverCall('src/snappea-account-sdk.js', '13520:13534');
        var datas = [];
        __$coverCall('src/snappea-account-sdk.js', '13544:13549');
        var d;
        __$coverCall('src/snappea-account-sdk.js', '13559:13724');
        for (d in options) {
            __$coverCall('src/snappea-account-sdk.js', '13592:13714');
            if (options.hasOwnProperty(d)) {
                __$coverCall('src/snappea-account-sdk.js', '13641:13700');
                datas.push(d + '=' + global.encodeURIComponent(options[d]));
            }
        }
        __$coverCall('src/snappea-account-sdk.js', '13735:13805');
        var targeURL = CONFIG_WEB.loginWithThirdParty.replace('{1}', platform);
        __$coverCall('src/snappea-account-sdk.js', '13816:13905');
        if (datas.length > 0) {
            __$coverCall('src/snappea-account-sdk.js', '13852:13895');
            targeURL = targeURL + '?' + datas.join('&');
        }
        __$coverCall('src/snappea-account-sdk.js', '13916:13947');
        global.location.href = targeURL;
    };
    __$coverCall('src/snappea-account-sdk.js', '13961:13995');
    var SnapPea = global.SnapPea || {};
    __$coverCall('src/snappea-account-sdk.js', '14001:14026');
    SnapPea.Account = Account;
    __$coverCall('src/snappea-account-sdk.js', '14032:14056');
    global.SnapPea = SnapPea;
}(this));
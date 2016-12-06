/*global $, assure*/
(function (global) {
    var Deferred = window.$.Deferred;
    var ajax = window.$.ajax;

    if ($.ajaxSetup) {
        $.ajaxSetup({
            xhrFields : {
                withCredentials : true
            }
        });
    }

    var extend = function (dist, source) {
        if (!source) {
            return dist;
        }

        var prop;
        for (prop in source) {
            if (source.hasOwnProperty(prop)) {
                dist[prop] = source[prop];
            }
        }

        return dist;
    };

    var error = {
        ajax : {
            error : -1,
            msg : '请求失败，请检查网络连接状况。'
        },
        missingParameters : {
            error : -2,
            msg : '参数不全'
        }
    };
    var PARAM_LIST = (function () {
        var list = {};
        var search = window.location.search.substr(1).split('&');
        var i;
        var key;

        if (search[0] === '') {
            return list;
        }

        for (i = 0; i < search.length; i++) {
            key = search[i].split('=');
            list[key[0].toLowerCase()] = decodeURIComponent(key[1]);
        }
        return list;
    }());
    var Utils = {};

    var getParam = function (key) {
        return PARAM_LIST[key.toLowerCase()];
    };
    Utils.getParam = getParam;

    // 测试
    var ALI_OPEN_HOST_POSTFIX = 'uc.cn'; // 适配阿里开放平台逻辑(后面要修改为可配置)
    var ALI_OPEN_NAME = 'aliopen';
    var ALI_OPEN_HOST = '//wdj.account.test.uc.cn';// wdj account 域名
    var ALI_OPEN_MAIN_HOST = '//openplatform.test2.uae.uc.cn';// 新开放平台主站域名
    var AliOpen = {
        from: {
            aliOpen: ALI_OPEN_NAME
        },
        host: ALI_OPEN_HOST, // wdj account 域名
        mainHost: ALI_OPEN_MAIN_HOST, // 新开放平台主站域名
        postfix: ALI_OPEN_HOST_POSTFIX // 新开放平台主站域名后缀
    };
    if(window.location.href.indexOf(ALI_OPEN_HOST_POSTFIX) > -1){
        if(window.location.host.indexOf('open.uc.cn') > -1) { // 线上
            AliOpen.host = 'https://wdjaccountapi.open.uc.cn'; // wdjaccountapi 是 https 的
            AliOpen.mainHost = '//open.uc.cn';
        }
        PARAM_LIST.from = AliOpen.from.aliOpen;
    }
    var HOST = getParam('from') === AliOpen.from.aliOpen ? AliOpen.host : 'https://account.wandoujia.com',
        HOST_HTTP = getParam('from') === AliOpen.from.aliOpen ? AliOpen.host : 'http://www.wandoujia.com/api/account',
        API_VERSION_4 = '/v4/api',
        USE_HTTP_API = navigator.userAgent.toLowerCase().indexOf('msie') > -1,
        PREFIX = (USE_HTTP_API ? HOST_HTTP : HOST) + API_VERSION_4;

    var CONFIG = {
        login : PREFIX + '/login',
        logout : PREFIX + '/logout',
        captcha : PREFIX + '/seccode',
        reg : PREFIX + '/register',
        checkUsername : PREFIX + '/isUsernameExisted',
        checkUserLogin : PREFIX + '/profile',
        checkUserLoginWithAuth : PREFIX + '/profile_with_auth',
        findPwd : PREFIX + '/findpassword',
        checkCode : PREFIX + '/checkcode',
        resetPwd : PREFIX + '/resetpassword',
        modifyPwd : PREFIX + '/profile/password',
        checkPasscode : PREFIX + '/checkpasscode',
        modifyPwdByCode : PREFIX + '/modifypassword',
        completeProfile : PREFIX + '/completeProfile',
        activate : PREFIX + '/activation/initialization',
        activateValid : PREFIX + '/activation/validation',
        unbindThirdParty : PREFIX + '/social/unbind',
        avatar : PREFIX + '/avatar',
        confirm : PREFIX + '/account/confirm'
    };

    var CONFIG_WEB = {
        loginWithThirdParty : HOST + '/web/oauth2/{1}/login'
    };

    var USER_INFO = {};
    var IS_LOGINED = false;

    var Account = {};

    Account.CAPTCHA = CONFIG.captcha;

    Account.loginAsync = function (data, options) {
        var deferred = new Deferred();

        data = data || {};
        options = options || {};

        if (!data.username || !data.password) {
            deferred.reject(error.missingParameters);
        } else {
            ajax({
                type : 'POST',
                dataType : 'json',
                url : CONFIG.login,
                data : extend({
                    username : data.username,
                    password : data.password,
                    seccode : data.seccode || ''
                }, options),
                success : function (resp, textStatus, jqXHR) {
                    if (resp.error === 0) {
                        resp.member.auth = jqXHR.getResponseHeader('X-Wdj-Auth');

                        IS_LOGINED = true;
                        USER_INFO = resp.member;
                        deferred.resolve(resp.member);
                    } else if(resp.error === 1000004) {
                        deferred.resolve(resp);
                    } else {
                        deferred.reject(resp);
                    }
                },
                error : function (xhr) {
                    if (xhr.readyState === 4) {
                        deferred.reject(xhr.responseJSON || {});
                    }

                    deferred.reject(error.ajax);
                }
            });
        }

        return deferred.promise();
    };

    Account.isLogined = function () {
        return IS_LOGINED;
    };

    Account.getUserInfo = function () {
        return USER_INFO || {};
    };

    Account.logoutAsync = function (options) {
        var deferred = new Deferred();

        options = options || {};

        var jsonp = !!options.jsonp;
        delete options.jsonp;

        ajax({
            type : 'POST',
            dataType : jsonp ? 'jsonp' : 'json',
            url : CONFIG.logout,
            data : options,
            crossDomain: jsonp ? true : undefined,
            success : function (resp) {
                if (resp.error === 0) {
                    IS_LOGINED = false;
                    USER_INFO = undefined;
                    deferred.resolve(resp);
                } else {
                    deferred.reject(resp);
                }
            },
            error : function (xhr) {
                if (xhr.readyState === 4) {
                    deferred.reject(xhr.responseJSON || {});
                }

                deferred.reject(error.ajax);
            }
        });

        return deferred.promise();
    };

    Account.regAsync = function (data, options) {
        var deferred = new Deferred();

        data = data || {};
        options = options || {};

        if (!data.username || (!data.oneKeyRegister && !data.password)) {
            deferred.reject(error.missingParameters);
        } else {
            ajax({
                type : 'POST',
                dataType : 'json',
                url : CONFIG.reg,
                data : extend({
                    username : data.username,
                    password : data.password,
                    oneKeyRegister : data.oneKeyRegister || false,
                    nick : data.nickname || '',
                    seccode : data.seccode || ''
                }, options),
                success : function (resp, textStatus, jqXHR) {
                    if (resp.error === 0) {
                        resp.member.auth = jqXHR.getResponseHeader('X-Wdj-Auth');

                        IS_LOGINED = true;
                        USER_INFO = resp.member;
                        deferred.resolve(resp.member);
                    } else {
                        deferred.reject(resp);
                    }
                },
                error : function (xhr) {
                    if (xhr.readyState === 4) {
                        deferred.reject(xhr.responseJSON || {});
                    }

                    deferred.reject(error.ajax);
                }
            });
        }

        return deferred.promise();
    };

    Account.checkUsernameAsync = function (username, options) {
        var deferred = new Deferred();

        options = options || {};

        if (username === undefined) {
            deferred.reject(error.missingParameters);
        } else {
            ajax({
                type : 'POST',
                dataType : 'json',
                url : CONFIG.checkUsername,
                data : extend({
                    username : username
                }, options),
                success : function (resp) {
                    deferred.resolve(resp);
                },
                error : function (xhr) {
                    if (xhr.readyState === 4) {
                        deferred.reject(xhr.responseJSON || {});
                    }

                    deferred.reject(error.ajax);
                }
            });
        }

        return deferred.promise();
    };

    Account.checkUserLoginAsync = function (options) {
        var deferred = new Deferred();

        options = options || {};

        var jsonp = !!options.jsonp;
        delete options.jsonp;

        ajax({
            type : 'GET',
            dataType : jsonp ? 'jsonp' : 'json',
            url : CONFIG.checkUserLogin,
            data : options,
            crossDomain: jsonp ? true : undefined,
            success : function (resp) {
                if (resp.error === 0) {
                    IS_LOGINED = true;
                    USER_INFO = resp.member;
                    deferred.resolve(true);
                } else {
                    IS_LOGINED = false;
                    USER_INFO = undefined;
                    deferred.reject(false);
                }
            },
            error : function () {
                deferred.reject(false);
            }
        });

        return deferred.promise();
    };

    Account.checkUserLoginWithAuthAsync = function (options) {
        var deferred = new Deferred();

        options = options || {};

        var jsonp = !!options.jsonp;
        delete options.jsonp;

        ajax({
            type : 'GET',
            dataType : jsonp ? 'jsonp' : 'json',
            url : CONFIG.checkUserLoginWithAuth,
            data : options,
            crossDomain: jsonp ? true : undefined,
            success : function (resp, textStatus, jqXHR) {
                if (resp.error === 0) {
                    resp.member.auth = jqXHR.getResponseHeader('X-Wdj-Auth');

                    IS_LOGINED = true;
                    USER_INFO = resp.member;
                    deferred.resolve(resp.member);
                } else {
                    IS_LOGINED = false;
                    USER_INFO = undefined;
                    deferred.reject(resp);
                }
            },
            error : function (xhr) {
                if (xhr.readyState === 4) {
                    deferred.reject(xhr.responseJSON || {});
                }

                deferred.reject(error.ajax);
            }
        });

        return deferred.promise();
    };

    Account.findPwdAsync = function (username, options) {
        var deferred = new Deferred();

        options = options || {};

        if (username === undefined) {
            deferred.reject(error.missingParameters);
        } else {
            ajax({
                type : 'POST',
                dataType : 'json',
                url : CONFIG.findPwd,
                data : extend({
                    username : username
                }, options),
                success : function (resp) {
                    if (resp.error === 0) {
                        deferred.resolve(resp);
                    } else {
                        deferred.reject(resp);
                    }
                },
                error : function (xhr) {
                    if (xhr.readyState === 4) {
                        deferred.reject(xhr.responseJSON || {});
                    }

                    deferred.reject(error.ajax);
                }
            });
        }

        return deferred.promise();
    };

    Account.checkCodeAsync = function (data, options) {
        var deferred = new Deferred();

        data = data || {};
        options = options || {};

        if (data.username === undefined ||
            data.passcode === undefined) {
            deferred.reject(error.missingParameters);
        } else {
            ajax({
                type : 'POST',
                dataType : 'json',
                url : CONFIG.checkCode,
                data : extend({
                    username : data.username,
                    passcode : data.passcode
                }, options),
                success : function (resp) {
                    if (resp.error === 0) {
                        deferred.resolve(resp);
                    } else {
                        deferred.reject(resp);
                    }
                },
                error : function (xhr) {
                    if (xhr.readyState === 4) {
                        deferred.reject(xhr.responseJSON || {});
                    }

                    deferred.reject(error.ajax);
                }
            });
        }

        return deferred.promise();
    };

    Account.resetPwdAsync = function (data, options) {
        var deferred = new Deferred();

        data = data || {};
        options = options || {};

        if (data.username === undefined ||
            data.passcode === undefined ||
            data.password === undefined) {
            deferred.reject(error.missingParameters);
        } else {
            ajax({
                type : 'POST',
                dataType : 'json',
                url : CONFIG.resetPwd,
                data : extend({
                    username : data.username,
                    passcode : data.passcode,
                    password : data.password,
                    repeatedpassword : data.password
                }, options),
                success : function (resp) {
                    if (resp.error === 0) {
                        deferred.resolve(resp);
                    } else {
                        deferred.reject(resp);
                    }
                },
                error : function (xhr) {
                    if (xhr.readyState === 4) {
                        deferred.reject(xhr.responseJSON || {});
                    }

                    deferred.reject(error.ajax);
                }
            });
        }

        return deferred.promise();
    };

    Account.modifyPwdAsync = function (data, options) {
        var deferred = new Deferred();

        data = data || {};
        options = options || {};

        if (data.password === undefined ||
            data.newpassword === undefined) {
            deferred.reject(error.missingParameters);
        } else {
            ajax({
                type : 'POST',
                dataType : 'json',
                url : CONFIG.modifyPwd,
                data : extend({
                    oldpassword : data.password,
                    newpassword : data.newpassword
                }, options),
                success : function (resp, textStatus, jqXHR) {
                    if (resp.error === 0) {
                        resp.member.auth = jqXHR.getResponseHeader('X-Wdj-Auth');

                        USER_INFO = resp.member;
                        deferred.resolve(resp.member);
                    } else {
                        deferred.reject(resp);
                    }
                },
                error : function (xhr) {
                    if (xhr.readyState === 4) {
                        deferred.reject(xhr.responseJSON || {});
                    }

                    deferred.reject(error.ajax);
                }
            });
        }

        return deferred.promise();
    };

    Account.checkPasscodeAsync = function (data, options) {
        var deferred = new Deferred();

        data = data || {};
        options = options || {};

        if (data.passcode === undefined) {
            deferred.reject(error.missingParameters);
        } else {
            ajax({
                type : 'POST',
                dataType : 'json',
                url : CONFIG.checkPasscode,
                data : extend({
                    passcode : data.passcode
                }, options),
                success : function (resp) {
                    if (resp.error === 0) {
                        deferred.resolve(resp);
                    } else {
                        deferred.reject(resp);
                    }
                },
                error : function (xhr) {
                    if (xhr.readyState === 4) {
                        deferred.reject(xhr.responseJSON || {});
                    }

                    deferred.reject(error.ajax);
                }
            });
        }

        return deferred.promise();
    };

    Account.modifyPwdByCodeAsync = function (data, options) {
        var deferred = new Deferred();

        data = data || {};
        options = options || {};

        if (data.username === undefined ||
            data.passcode === undefined ||
            data.password === undefined) {
            deferred.reject(error.missingParameters);
        } else {
            ajax({
                type : 'POST',
                dataType : 'json',
                url : CONFIG.modifyPwdByCode,
                data : extend({
                    username : data.username,
                    passcode : data.passcode,
                    password : data.password
                }, options),
                success : function (resp) {
                    if (resp.error === 0) {
                        deferred.resolve(resp);
                    } else {
                        deferred.reject(resp);
                    }
                },
                error : function (xhr) {
                    if (xhr.readyState === 4) {
                        deferred.reject(xhr.responseJSON || {});
                    }

                    deferred.reject(error.ajax);
                }
            });
        }

        return deferred.promise();
    };

    Account.updateProfileAsync = function (data, options) {
        var deferred = new Deferred();

        data = data || {};
        options = options || {};

        if (data.nickname === undefined) {
            deferred.reject(error.missingParameters);
        } else {
            ajax({
                type : 'POST',
                dataType : 'json',
                url : CONFIG.completeProfile,
                data : extend({
                    nick : data.nickname
                }, options),
                success : function (resp) {
                    if (resp.error === 0) {
                        USER_INFO = resp.member;
                        deferred.resolve(resp.member);
                    } else {
                        deferred.reject(resp);
                    }
                },
                error : function (xhr) {
                    if (xhr.readyState === 4) {
                        deferred.reject(xhr.responseJSON || {});
                    }

                    deferred.reject(error.ajax);
                }
            });
        }

        return deferred.promise();
    };

    Account.activateAsync = function (data, options) {
        var deferred = new Deferred();

        data = data || {};
        options = options || {};

        if (data.type === undefined) {
            deferred.reject(error.missingParameters);
        } else {
            ajax({
                type : 'GET',
                dataType : 'json',
                url : CONFIG.activate,
                data : extend({
                    type : data.type,
                    account : data.account
                }, options),
                success : function (resp) {
                    if (resp.error === 0) {
                        deferred.resolve(resp);
                    } else {
                        deferred.reject(resp);
                    }
                },
                error : function (xhr) {
                    if (xhr.readyState === 4) {
                        deferred.reject(xhr.responseJSON || {});
                    }

                    deferred.reject(error.ajax);
                }
            });
        }

        return deferred.promise();
    };

    Account.activateValidAsync = function (data, options) {
        var deferred = new Deferred();

        data = data || {};
        options = options || {};

        if (data.code === undefined) {
            deferred.reject(error.missingParameters);
        } else {
            ajax({
                type : 'POST',
                dataType : 'json',
                url : CONFIG.activateValid,
                data : extend({
                    code : data.code,
                    type : 'sms'
                }, options),
                success : function (resp) {
                    if (resp.error === 0) {
                        USER_INFO.telephoneValidated = true;
                        deferred.resolve(resp);
                    } else {
                        deferred.reject(resp);
                    }
                },
                error : function (xhr) {
                    if (xhr.readyState === 4) {
                        deferred.reject(xhr.responseJSON || {});
                    }

                    deferred.reject(error.ajax);
                }
            });
        }

        return deferred.promise();
    };

    /* `data.file` should be `File` */
    Account.uploadAvatarAsync = function (data, options) {
        var deferred = new Deferred();

        data = data || {};
        options = options || {};

        var formData, f;

        if (data.file === undefined) {
            deferred.reject(error.missingParameters);
        } else {
            formData = new global.FormData();
            formData.append('file', data.file);

            for (f in options) {
                if (options.hasOwnProperty(f)) {
                    formData.append(f, options[f]);
                }
            }

            ajax({
                type : 'POST',
                dataType : 'json',
                url : CONFIG.avatar,
                data : formData,
                processData : false,
                contentType : false,
                success : function (resp) {
                    if (resp.error === 0) {
                        USER_INFO = resp.member;
                        deferred.resolve(resp.member.avatar);
                    } else {
                        deferred.reject(resp);
                    }
                },
                error : function (xhr) {
                    if (xhr.readyState === 4) {
                        deferred.reject(xhr.responseJSON || {});
                    }

                    deferred.reject(error.ajax);
                }
            });
        }

        return deferred.promise();
    };

    Account.unbindThirdPartyAsync = function (data, options) {
        var deferred = new Deferred();

        data = data || {};
        options = options || {};

        var platforms = {
            weibo : '1',
            sina : '1',
            qq : '2',
            renren : '3'
        };

        if (data.platform === undefined ||
            platforms[data.platform] === undefined) {
            deferred.reject(error.missingParameters);
        } else {
            ajax({
                type : 'POST',
                dataType : 'json',
                url : CONFIG.unbindThirdParty,
                data : extend({
                    platid : platforms[data.platform]
                }, options),
                success : function (resp) {
                    if (resp.error === 0) {
                        USER_INFO = resp.member;
                        deferred.resolve(resp.member);
                    } else {
                        deferred.reject(resp);
                    }
                },
                error : function (xhr) {
                    if (xhr.readyState === 4) {
                        deferred.reject(xhr.responseJSON || {});
                    }

                    deferred.reject(error.ajax);
                }
            });
        }

        return deferred.promise();
    };

    Account.confirmAsync = function (data, options) {
        var deferred = new Deferred();

        data = data || {};
        options = options || {};

        if (data.code === undefined) {
            deferred.reject(error.missingParameters);
        } else {
            ajax({
                type : 'POST',
                dataType : 'json',
                url : CONFIG.confirm,
                data : extend({
                    code : data.code
                }, options),
                success : function (resp) {
                    if (resp.error === 0) {
                        deferred.resolve(resp);
                    } else {
                        deferred.reject(resp);
                    }
                },
                error : function (xhr) {
                    if (xhr.readyState === 4) {
                        deferred.reject(xhr.responseJSON || {});
                    }

                    deferred.reject(error.ajax);
                }
            });
        }

        return deferred.promise();
    };

    Account.isEmail = function (input) {
        var EMAIL_PATTREN = /^\s*?(.+)@(.+?)\.(.+?)\s*$/;
        return EMAIL_PATTREN.test(input);
    };

    Account.isPhoneNumber = function (input) {
        var PHONE_PATTERN = /^1[34578]\d{9}$/;
        return PHONE_PATTERN.test(input);
    };

    /* `platform` could be one of `weibo`, `qq`, `renren` */
    Account.loginWithThirdParty = function (options) {
        // TODO: Need simplify
        options = options || {};

        options.callback = options.callback || 'http://www.wandoujia.com/';

        var platforms = {
            weibo : 'sina',
            sina : 'sina',
            renren : 'renren',
            qq : 'qq'
        };

        var platform = platforms[options.platform];
        delete options.platform;

        var onclose = options.onclose || function () { return; };
        delete options.onclose;

        var datas = [];
        var d;
        for (d in options) {
            if (options.hasOwnProperty(d)) {
                datas.push(d + '=' + global.encodeURIComponent(options[d]));
            }
        }

        var targetURL = CONFIG_WEB.loginWithThirdParty.replace('{1}', platform);

        if (datas.length > 0) {
            targetURL = targetURL + '?' + datas.join('&');
        }

        if (options.popup) {
            var win = window.open(targetURL, 'loginWithThirdParty', 'width=650, height=480');

            var winInterval = setInterval(function () {
                if (win.closed) {
                    clearInterval(winInterval);
                    onclose.call(this);
                }
            }, 200);
        } else {
            global.location.href = targetURL;
        }
    };

    var SnapPea = global.SnapPea || {};
    SnapPea.Account = Account;
    SnapPea.Utils = Utils;
    SnapPea.AliOpen = AliOpen;
    global.SnapPea = SnapPea;
}(this));

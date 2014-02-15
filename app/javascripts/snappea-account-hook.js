/*global $, assure*/
(function (global) {
    var $ = global.$;
    var ajax = global.$.ajax;
    var Deferred = global.Q.defer;

    /**
     * Configuration
     */

    if ($.ajaxSetup) {
        $.ajaxSetup({
            xhrFields : {
                withCredentials : true
            }
        });
    }

    window.Q.stopUnhandledRejectionTracking();

    /**
     * Windows Client Logic
     */

    var IS_WINDOWS = !!window.OneRingRequest;

    var oneRingRequestAsync = window.orr = function (options) {
        var deferred = new Deferred();

        options = options || {};
        options.data = options.data || {};
        options.type = options.type || 'get';
        options.url = options.url || '';

        var url =  options.url;

        var done = function (resp) {
            resp = JSON.parse(resp);
            resp.state_line = resp.state_line || resp.state_code;

            console.log('IO - Callback message for \'' + options.url + '\'', resp);

            deferred.resolve(resp);
        };

        switch (options.type.toLowerCase()) {
        case 'get':
            var datas = [];
            var d;
            for (d in options.data) {
                if (options.data.hasOwnProperty(d)) {
                    datas.push(d + '=' + window.encodeURIComponent(options.data[d]));
                }
            }

            if (datas.length > 0) {
                url = url + '?' + datas.join('&');
            }

            window.OneRingRequest(options.type, url, null, done);
            break;
        case 'post':
            window.OneRingRequest(options.type, url, window.encodeURIComponent(JSON.stringify(options.data)), done);
            break;
        }

        console.log('IO - AJAX call: ' + options.url, options);

        return deferred.promise;
    };

    /**
     * Hook Logic
     */

    var IFRAME_STYLE = [
        'border: none;',
        'border-radius: 10px;',
        'left: 50%;',
        'height: 417px;',
        'margin: -215px 0 0 -208px;',
        'position: fixed;',
        'top: 50%;',
        'width: 434px;'
    ].join('');

    var CTN_STYLE = [
        'background: #4C4C4C;',
        'background: url(http://img.wdjimg.com/account/overlay.png);',
        'background: rgba(0, 0, 0, .7);',
        'bottom: 0;',
        'left: 0;',
        'position: fixed;',
        'right: 0;',
        'top: 0;',
        'z-index: 999;'
    ].join('');

    var AccountHook = {};

    var CONFIG = {
        checkUserLogin : 'https://account.wandoujia.com/v4/api/profile'
    };

    AccountHook.checkAsync = function (data) {
        var deferred = new Deferred();

        var returnData = {
            isLoggedIn : false,
            data : {}
        };

        ajax({
            type : 'GET',
            dataType : 'json',
            url : CONFIG.checkUserLogin,
            data :  data || {},
            success : function (resp) {
                if (resp.error === 0) {
                    returnData.isLoggedIn = true;
                    returnData.data = resp.member;
                    deferred.resolve(returnData);
                } else {
                    deferred.reject(returnData);
                }
            },
            error : function () {
                deferred.reject(returnData);
            }
        });

        return deferred.promise;
    };

    AccountHook.openAsync = function (name) {
        var deferred = new Deferred();
        var defaultData = {
            isLoggedIn : false,
            data : {}
        };
        var url = '';

        name = (name && name.toLowerCase()) || 'login';

        if (IS_WINDOWS) {
            switch (name) {
            case 'login':
                url = 'wdj://account/login.json';
                break;

            case 'register':
                url = 'wdj://account/register.json';
                break;

            case 'find':
                url = 'wdj://account/reset.json';
                break;

            case 'logout':
                url = 'wdj://account/logout.json';
                break;
            }

            oneRingRequestAsync({
                url : url
            }).then(function () {
                var intervalCheck;
                var intervalFunc;
                var doneFunc = function (resp) {
                    clearInterval(intervalCheck);
                    deferred.resolve(resp);
                };

                if (name !== 'logout') {
                    intervalFunc = function () {
                        AccountHook.checkAsync().then(doneFunc);
                    };
                } else {
                    intervalFunc = function () {
                        AccountHook.checkAsync().fail(doneFunc);
                    };
                }

                intervalCheck = setInterval(intervalFunc, 500);
            });

            return deferred.promise;
        }

        url = 'http://www.wandoujia.com/account/' +
                    '?source=web' +
                    '&medium=' + encodeURIComponent(location.host + location.pathname) +
                    '&close=1' +
                    '#' + name;

        var $ctn = $('<div>').attr('style', CTN_STYLE).appendTo('body');

        var $iframe = $('<iframe>').attr({
            src : url,
            style : IFRAME_STYLE
        }).appendTo($ctn);

        var messenger = new global.Messenger('parent', 'Account');
        messenger.addTarget($iframe[0].contentWindow, 'iframe');

        messenger.listen(function (message) {
            var msg = message.split(':'),
                data = decodeURIComponent(msg[1]);

            switch (msg[0]) {
            case 'height':
                if (navigator.userAgent.toLowerCase().indexOf('msie') > -1) {
                    data = Number(data) + 4;
                }

                $iframe.css('height', data + 'px');
                break;

            case 'close':
                $ctn.remove();
                deferred.reject(defaultData);
                break;

            case 'done':
                deferred.resolve(AccountHook.checkAsync().fail(function (resp) {
                    return resp;
                }).fin(function () {
                    $ctn.remove();
                }));
                break;

            case 'redirect':
                global.document.location.href = data;
                break;
            }
        });

        $ctn.on('click', function () {
            $ctn.remove();
        });

        return deferred.promise;
    };

    var SnapPea = global.SnapPea || {};
    SnapPea.AccountHook = AccountHook;
    global.SnapPea = SnapPea;
}(this));

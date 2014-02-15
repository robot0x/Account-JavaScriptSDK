/*global $, assure*/
(function (global) {
    var $ = global.$;
    var ajax = global.$.ajax;
    var Deferred = global.Q.defer;

    if ($.ajaxSetup) {
        $.ajaxSetup({
            xhrFields : {
                withCredentials : true
            }
        });
    }

    window.Q.stopUnhandledRejectionTracking();

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

        name = name || '';

        var url = 'http://www.wandoujia.com/account/' +
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

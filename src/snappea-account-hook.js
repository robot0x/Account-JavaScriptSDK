/*global $, assure*/
(function (global) {
    var $ = global.$;

    var IFRAME_STYLE = [
        'border: none;',
        'border-radius: 10px;',
        'left: 50%;',
        'height: 417px;',
        'margin: -215px 0 0 -208px;',
        'position: absolute;',
        'position: fixed;',
        'top: 50%;',
        'width: 430px;'
    ].join('');

    var CTN_STYLE = [
        'background: #4C4C4C;',
        'background: url(http://img.wdjimg.com/account/overlay.png);',
        'background: rgba(0, 0, 0, .7);',
        'bottom: 0;',
        'left: 0;',
        'position: absolute;',
        'position: fixed;',
        'right: 0;',
        'top: 0;',
        'z-index: 999;'
    ].join('');

    var AccountHook = {};

    AccountHook.open = function (name, callback, context) {
        if (!global.Messenger) {
            global.document.location.href = 'http://www.wandoujia.com/account/?callback=' + encodeURIComponent(global.document.location.href) + '#' + name;
            return;
        }

        var $ctn = $('<div>').attr('style', CTN_STYLE).appendTo('body');

        var $iframe = $('<iframe>').attr({
            src : 'http://www.wandoujia.com/account/?source=web&close=1#' + name,
            style : IFRAME_STYLE
        }).appendTo($ctn);

        var messenger = global.Messenger.initInParent($iframe[0]);

        var close = function () {
            $ctn.remove();
            callback.call(context || window);
        };

        messenger.onmessage = function (data) {
            if (data === 'close') {
                close();
            }
        };

        $ctn.on('click', function () {
            close();
        });
    };

    var SnapPea = global.SnapPea || {};
    SnapPea.AccountHook = AccountHook;
    global.SnapPea = SnapPea;
}(this));

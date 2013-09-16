/*global $, assure*/
(function (global) {
    var $ = global.$;

    var IFRAME_STYLE = [
        'border: none;',
        'border-radius: 10px;',
        'left: 50%;',
        'height: 450px;',
        'margin: -225px 0 0 -215px;',
        'position: absolute;',
        'top: 50%;',
        'width: 430px;'
    ].join('');

    var CTN_STYLE = [
        'background-color: rgba(0, 0, 0, .7);',
        'bottom: 0;',
        'left: 0;',
        'position: absolute;',
        'right: 0;',
        'top: 0;'
    ].join('');

    var AccountHook = {};

    AccountHook.open = function (name, callback, context) {
        var $ctn = $('<div>').attr('style', CTN_STYLE).appendTo('body');

        var $iframe = $('<iframe>').attr({
            src : 'http://www.wandoujia.com/account/?source=web&close=1#' + name,
            style : IFRAME_STYLE
        }).appendTo($ctn);

        var messenger = global.Messenger.initInParent($iframe[0]);

        messenger.onmessage = function (data) {
            if (data === 'close') {
                $ctn.remove();
                callback.call(context || window);
            }
        };
    };

    var SnapPea = global.SnapPea || {};
    SnapPea.AccountHook = AccountHook;
    global.SnapPea = SnapPea;
}(this));

/*global $, assure*/
(function (global) {
    var $ = global.$;

    var IFRAME_STYLE = {
        'border' : 'none',
        'border-radius' : '10px',
        'left' : '50%',
        'height' : '450px',
        'margin' : '-225px 0 0 -215px',
        'position' : 'absolute',
        'top' : '50%',
        'width' : '430px'
    };

    var CTN_STYLE = {
        'background-color' : 'rgba(0, 0, 0, .7)',
        'bottom' : '0',
        'left' : '0',
        'position' : 'absolute',
        'right' : '0',
        'top' : '0'
    };

    var AccountHook = {};

    AccountHook.open = function () {
        var $iframe = $('<iframe>').css(IFRAME_STYLE).attr({
            src : 'http://www.wandoujia.com/account'
        });

        var $ctn = $('<div>').css(CTN_STYLE).append($iframe);

        $('body').append($ctn);

        var messenger = global.Messenger.initInParent($iframe[0]);

        messenger.onmessage = function (data) {
            if (data === 'close') {
                $ctn.remove();
            }
        };
    };

    var SnapPea = global.SnapPea || {};
    SnapPea.AccountHook = AccountHook;
    global.SnapPea = SnapPea;
}(this));

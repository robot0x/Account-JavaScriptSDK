require.config({
    baseUrl: '/base/',
    paths : {
        $ : 'app/components/jquery/jquery',
        Zepto : 'app/components/zepto/zepto',
        Q : 'app/components/q/q'
    },
    shim : {
        $ : {
            exports : '$'
        },
        Zepto : {
            exports : 'Zepto'
        },
        Q : {
            exports : 'Q'
        }
    }
});

require(['$', 'Zepto', 'Q'], function ($, Zepto, Q) {
    window.Q = Q;
    require(['test/specs/spec-sdk'], function () {
        window.__karma__.start();
    });
});

require.config({
    baseUrl: '/base/',
    paths : {
        $ : 'components/jquery/jquery',
        Zepto : 'components/zepto/zepto',
        Q : 'components/q/q'
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
    require(['test/specs/sdk-spec'], function () {
        window.__karma__.start();
    });
});

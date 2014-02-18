require.config({
    baseUrl: '/base/',
    paths : {
        $ : 'app/components/jquery/jquery',
        Zepto : 'app/javascripts/zepto'
    },
    shim : {
        $ : {
            exports : '$'
        },
        Zepto : {
            exports : 'Zepto'
        }
    }
});

require(['$', 'Zepto'], function ($, Zepto, Q) {
    require(['test/specs/spec-sdk'], function () {
        window.__karma__.start();
    });
});

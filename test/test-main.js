require.config({
    baseUrl: '/base/',
    paths : {
        jQuery : 'app/components/jquery/dist/jquery.min',
        Zepto : 'app/javascripts/zepto'
    },
    shim : {
        jQuery : {
            exports : '$'
        },
        Zepto : {
            exports : 'Zepto'
        }
    }
});

require(['jQuery'], function ($) {
    require(['test/specs/spec-sdk'], function () {
        window.__karma__.start();
    });
});

require.config({
    baseUrl: '/base/',
    paths : {
        $ : 'components/jquery/jquery',
        Zepto : 'components/zepto/zepto'
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

require(['$', 'Zepto'], function ($, Zepto) {
    require(['test/specs/sdk-spec'], function  () {
        window.__karma__.start();
    });
});

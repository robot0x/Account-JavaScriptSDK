require.config({
    baseUrl: '/base/',
    paths : {
        $ : 'components/jquery/jquery'
    },
    shim : {
        $ : {
            exports : '$'
        }
    }
});

require(['$'], function ($) {
    require(['test/specs/sdk-spec'], function  () {
        window.__karma__.start();
    });
});

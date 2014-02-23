require.config({
    baseUrl: '/base/',
    paths : {
        Zepto : 'app/javascripts/zepto.min'
    }
});

require(['Zepto'], function ($) {
    require(['test/specs/spec-sdk'], function () {
        window.__karma__.start();
    });
});

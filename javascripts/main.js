/* global $ */
$(function () {
    var AccountHook = window.SnapPea.AccountHook;

    AccountHook.checkAsync().then(function (resp) {
        console.log('Hello, ' + resp.data.nick + '!');
    }).fail(function () {
        console.log('Who are you?');
    });

    $('.btn').on('click', function (e) {
        e.preventDefault();

        var name = $(this).data('name');

        AccountHook.openAsync(name).then(function (resp) {
            if (resp.isLoggedIn) {
                console.log('Welcome back, %s.', resp.data.nick);
            } else {
                console.log('Bye.');
            }
        });
    });
});

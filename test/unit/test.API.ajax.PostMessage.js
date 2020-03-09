var helper = require( './helper' );
var Feedback = require( 'Feedback' );

module.exports = function() {
    beforeEach(function() {
        helper.fakeAjax.install();

        jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    });
    afterEach(function() {
        helper.fakeAjax.uninstall();

        jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
    });

    if( helper.isInternetExplorerBrowser() === 9 ) {
        it( 'test cross domain (only IE9) "iframePolyfill" = true; "iframeTimeout" = 0; "iframePostMessage" = false;', function( done ) {
            var feedback = new Feedback( helper.form.el );

            spyOn( console, 'warn' );
            spyOn( console, 'error' );

            feedback.ajax({
                url: 'https://www.google.com/',
                iframePolyfill: true,
                iframeTimeout: 0,
                iframePostMessage: false
            });

            feedback.ajax();
            feedback.iframe.addEventListener( 'load', function() {
                done();
                expect( console.warn ).toHaveBeenCalledWith( 'You need use postMessage, read more - https://furashcka.github.io/feedback.js/docs/' );
                expect( console.error ).toHaveBeenCalled();
            });

            feedback = feedback.destroy();
        });
    }

    it( 'test (iframe abort by timeout) "iframePolyfill" = true; "iframeTimeout" = 10; "iframePostMessage" = false;', function( done ) {
        var feedback = new Feedback( helper.form.el );
        var statusText = '';

        feedback.ajax({
            url: helper.serverURL,
            iframePolyfill: true,
            iframeTimeout: 10,
            iframePostMessage: false,
            error: function( e ) {
                statusText = e.xhr.statusText;
            }
        });

        feedback.ajax();

        setTimeout(function() {
            done();
            expect( statusText ).toBe( 'abort' );
        }, 11);

        feedback = feedback.destroy();
    });

    it( 'test (window.postMessage) "iframePolyfill" = true; "iframeTimeout" = 60000; "iframePostMessage" = true;', function( done ) {
        var feedback = new Feedback( helper.form.el );

        feedback.ajax({
            url: helper.serverURL + '?use_post_message=1',
            iframePolyfill: true,
            iframeTimeout: 60000,
            iframePostMessage: true,
            success: function( e ) {
                done();
                expect( e.xhr.status ).toBe( 200 );
                expect( e.xhr.responseText ).toBe( '{"Request Method":"POST","args":{"phone":"7777-7777","age":""}}' );
            }
        });
        feedback.ajax();

        feedback = feedback.destroy();
    });

    it( 'test (window.postMessage result type not a text, show error) "iframePolyfill" = true; "iframeTimeout" = 60000; "iframePostMessage" = true;', function( done ) {
        var feedback = new Feedback( helper.form.el );

        spyOn( console, 'error' );

        window.addEventListener( 'message', function() {
            expect( console.error ).toHaveBeenCalledWith( 'You must return text in post message' );
            done();
        });

        feedback.ajax({
            url: helper.serverURL + '?use_post_message=1&need_incorrect_data=1',
            iframePolyfill: true,
            iframeTimeout: 60000,
            iframePostMessage: true
        });
        feedback.ajax();

        feedback = feedback.destroy();
    });
};
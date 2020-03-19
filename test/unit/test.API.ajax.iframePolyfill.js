var helper = require( './helper' );
var Feedback = require( 'Feedback' );

module.exports = function() {
    beforeEach(function() {
        helper.fakeAjax.install();
    });
    afterEach(function() {
        helper.fakeAjax.uninstall();
    });

    it( 'test "progress" event if "iframePolyfill" = true', function() {
        var feedback = new Feedback( helper.form.el );
        var success = jasmine.createSpy( 'success' );

        feedback.ajax({
            url: helper.serverURL,
            iframePolyfill: true,
            progress: function() {
                success();
            }
        });
        feedback.ajax();
        feedback.iframe.onload();

        expect( success ).toHaveBeenCalled();
    });

    it( 'test "iframePolyfill" = auto', function() {
        _test({
            ajax: {
                iframePolyfill: 'auto'
            }
        });
    });

    it( 'test "iframePolyfill" = auto; with input[type="file"]', function() {
        helper.form.add.input({
            name: 'avatar',
            type: 'file'
        });

        _test({
            ajax: {
                iframePolyfill: 'auto'
            }
        });
    });

    it( 'test "iframePolyfill" = true', function() {
        _test({
            ajax: {
                iframePolyfill: true
            }
        });
    });

    it( 'test "iframePolyfill" = false', function() {
        _test({
            ajax: {
                iframePolyfill: false
            }
        });
    });

    it( 'test "iframePolyfill" = false; with input[type="file"]', function() {
        helper.form.add.input({
            name: 'avatar',
            type: 'file'
        });

        _test({
            ajax: {
                iframePolyfill: false
            }
        });
    });
};

function _test( options, addInputsCallback ) {
    var feedback = new Feedback( helper.form.el );
    var ajaxType = null;
    var hasFile = null;

    hasFile = _formHasInputWithFileType( helper.form.el );

    spyOn( console, 'warn' );

    feedback.ajax({
        url: helper.serverURL,
        method: 'POST',
        success: function( e ) {
            ajaxType = e.type;
        }
    });
    feedback.ajax( options.ajax );
    feedback.ajax();

    if( !feedback.iframe ) {
        helper.fakeAjax.respondWith({
            'status': 200
        });
    }
    else {
        feedback.iframe.onload();
    }

    if( options.ajax.iframePolyfill === 'auto' ) {
        if( !helper.isCantUseFormData() ) {
            expect( ajaxType ).toBe( 'ajax.2.0' );
        }
        else {
            if( hasFile ) {
                expect( console.warn ).toHaveBeenCalledWith( 'You can\'t use XMLHttpRequest 2.0 because browser not support it. Used polyfill ajax iframe.' );
                expect( ajaxType ).toBe( 'ajax.iframe' );
            }
            else {
                expect( ajaxType ).toBe( 'ajax.1.0' );
            }
        }
    }
    else if( options.ajax.iframePolyfill === true ) {
        expect( ajaxType ).toBe( 'ajax.iframe' );
    }
    else {
        expect([ 'ajax.1.0', 'ajax.2.0' ]).toContain( ajaxType );

        if( hasFile && ajaxType === 'ajax.1.0' ) {
            expect( console.warn ).toHaveBeenCalledWith( 'Ignoring inputs with file type, because used XMLHttpRequest 1.0' );
        }
    }
}

function _formHasInputWithFileType( form ) {
    return form.querySelectorAll( 'input[type="file"]' ).length > 0;
}
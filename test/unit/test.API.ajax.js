var helper = require( './helper' );
var Feedback = require( 'Feedback' );

module.exports = function() {
    beforeEach(function() {
        helper.fakeAjax.install();
    });
    afterEach(function() {
        helper.fakeAjax.uninstall();
    });

    it( 'send only one input', function() {
        var feedback = new Feedback( helper.form.el );

        helper.form.clear();
        helper.form.add.input({
            name: 'login',
            value: 'f-cka'
        });
        helper.form.add.input({
            name: 'age',
            value: '18'
        });

        feedback.update();
        feedback.ajax({
            method: 'GET',
            url: helper.serverURL
        });
        feedback.ajax([ 'login' ]);
        helper.fakeAjax.respondWith({
            'status': 200
        });

        expect( helper.fakeAjax.getCurrentInstance().url ).toBe( helper.serverURL + '?login=f-cka' );

        feedback = feedback.destroy();
    });

    it( 'test "loadingClass" option', function() {
        var feedback = new Feedback( helper.form.el );
        var success = jasmine.createSpy( 'success' );

        feedback.ajax({
            loadingClass: 'show-loader',
            success: function() {
                success();
            }
        });
        feedback.ajax();

        expect( helper.form.el.className ).toBe( 'show-loader' );

        helper.fakeAjax.respondWith({
            'status': 200
        });

        expect( success ).toHaveBeenCalled();
        expect( helper.form.el.className.trim() ).toBe( '' );

        feedback = feedback.destroy();
    });

    it( 'test "url" option', function() {
        var feedback = new Feedback( helper.form.el );

        feedback.ajax({
            url: helper.serverURL
        });

        expect( feedback.options.ajax.url ).toBe( helper.serverURL );

        feedback = feedback.destroy();
    });

    it( 'test "method" option', function() {
        var feedback = new Feedback( helper.form.el );
        var success = jasmine.createSpy( 'success' );

        helper.form.clear();
        helper.form.add.input({
            name: 'age',
            value: '15'
        });

        feedback.update();
        feedback.ajax({
            url: helper.serverURL,
            method: 'GET',
            success: function() {
                success();
            }
        });
        feedback.ajax();

        helper.fakeAjax.respondWith({
            'status': 200
        });

        expect( helper.fakeAjax.getCurrentInstance().url ).toBe( helper.serverURL + '?age=15' );

        feedback = feedback.destroy();
    });

    it( 'test "before", "after", "success", "error", "progress" events', function() {
        var feedback = new Feedback( helper.form.el );
        var callback = {
            before: jasmine.createSpy( 'success' ),
            after: jasmine.createSpy( 'success' ),
            success: jasmine.createSpy( 'success' ),
            error: jasmine.createSpy( 'success' ),
            progress: jasmine.createSpy( 'success' ),
        };

        feedback.ajax({
            before: function() {
                callback.before();
            },
            after: function() {
                callback.after();
            },
            success: function() {
                callback.success();
            },
            error: function() {
                callback.error();
            },
            progress: function() {
                callback.progress();
            }
        });

        feedback.ajax();
        helper.fakeAjax.respondWith({
            'status': 200
        });

        if( helper.isProgressEventSupport() ) {
            jasmine.Ajax.requests.mostRecent().upload.onprogress({
                loaded: 100,
                total: 100
            });

            expect( callback.progress ).toHaveBeenCalled();
        }

        feedback.ajax();
        helper.fakeAjax.respondWith({
            'status': 404
        });

        expect( callback.before ).toHaveBeenCalled();
        expect( callback.after ).toHaveBeenCalled();
        expect( callback.success ).toHaveBeenCalled();
        expect( callback.error ).toHaveBeenCalled();

        feedback = feedback.destroy();
    });
};
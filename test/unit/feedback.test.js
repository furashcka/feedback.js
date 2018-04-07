var Form = require( 'util/Form' );
var Feedback = require( 'Feedback' );

module.exports = function() {
    var form = new Form();
    var feedback = null;

    _reinitFeedback();

    it( 'error test: new Feedback() dependencies not included', function() {
        var validator = window.validator;
        delete window.validator;

        expect(function() { new Feedback() }).toThrow();

        window.validator = validator;
    });

    it( 'error test: new Feedback() first argument must be a form element', function() {
        expect(function() { new Feedback() }).toThrow();
    });

    it( 'new Feedback() must return object', function() {
        var obj = jasmine.any( Object );

        expect( feedback ).toEqual( obj );
    });

    it( 'must have API "ajax, schema, update, validate"', function() {
        var fn = jasmine.any( Function );

        expect( feedback.ajax ).toEqual( fn );
        expect( feedback.schema ).toEqual( fn );
        expect( feedback.update ).toEqual( fn );
        expect( feedback.validate ).toEqual( fn );
    });

    it( 'test API "update"', function() {
        var obj = jasmine.any( Object );

        _reinitFeedback();
        _addInputs();

        feedback.update();
        expect( feedback.inputsGroupedByName.age ).toEqual( obj );
    });

    it( 'test API "schema"', function() {
        var fn = jasmine.any( Function );

        _reinitFeedback();
        _addInputs();

        feedback.update();
        feedback.schema({
            age: function() {}
        });

        expect( feedback.options.schema.age ).toEqual( fn );
    });

    describe( 'test API "validate"', function() {
        it( 'setting and calling with and without filter by schema name', function() {
            var callback = {
                before: jasmine.createSpy( 'success' ),
                after: jasmine.createSpy( 'success' ),
                success: jasmine.createSpy( 'success' ),
                error: jasmine.createSpy( 'success' )
            };

            _reinitFeedback();
            _addInputs();

            feedback.update();
            feedback.schema({
                age: function() {
                    if( this.isEmpty() ) return 'Error';
                },
                phone: function() {
                    if( this.get().value !== '7777-7777' ) return 'Error';
                }
            });

            feedback.validate({
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
                }
            });

            expect( feedback.validate() ).toEqual( false );
            expect( feedback.validate([ 'phone' ]) ).toEqual( true );
            expect( callback.before ).toHaveBeenCalled();
            expect( callback.after ).toHaveBeenCalled();
            expect( callback.success ).toHaveBeenCalled();
            expect( callback.error ).toHaveBeenCalled();
        });
    });

    describe( 'test API "ajax"', function() {
        beforeEach(function() { jasmine.Ajax.install() });
        afterEach(function() { jasmine.Ajax.uninstall() });

        it( 'setting and calling', function() {
            var callback = {
                before: jasmine.createSpy( 'success' ),
                after: jasmine.createSpy( 'success' ),
                success: jasmine.createSpy( 'success' ),
                error: jasmine.createSpy( 'success' )
            };

            _reinitFeedback();
            form.clear();

            feedback.update();
            feedback.ajax({
                url: 'localhost',
                method: 'GET',
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
                }
            });

            feedback.ajax();
            jasmine.Ajax.requests.mostRecent().respondWith({
                'status': 200
            });

            feedback.ajax();
            jasmine.Ajax.requests.mostRecent().respondWith({
                'status': 404
            });

            expect( callback.before ).toHaveBeenCalled();
            expect( callback.after ).toHaveBeenCalled();
            expect( callback.success ).toHaveBeenCalled();
            expect( callback.error ).toHaveBeenCalled();
            expect( jasmine.Ajax.requests.mostRecent().url ).toBe( 'localhost?' );
            expect( jasmine.Ajax.requests.mostRecent().method ).toBe( 'GET' );
        });
    });

    function _reinitFeedback() {
        feedback = new Feedback( form.getFormEl() );
    }

    function _addInputs() {
        form.clear();
        form.addInput({
            name: 'age',
            type: 'number'
        });

        form.addInput({
            name: 'phone',
            type: 'tel',
            value: '7777-7777'
        });
    }
};
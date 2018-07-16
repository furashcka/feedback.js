var Form = require( 'util/Form' );
var Feedback = require( 'Feedback' );

module.exports = function() {
    var feedback = null;
    var test = {};
    var form = new Form();

    form.addToDocument(); // if don't do this we get warning, need for options testing

    _init();
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

    it( 'must have API "ajax, schema, update, validate, resetForm, destroy"', function() {
        var fn = jasmine.any( Function );

        expect( feedback.ajax ).toEqual( fn );
        expect( feedback.schema ).toEqual( fn );
        expect( feedback.update ).toEqual( fn );
        expect( feedback.validate ).toEqual( fn );
        expect( feedback.resetForm ).toEqual( fn );
        expect( feedback.destroy ).toEqual( fn );
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

    it( 'test API "resetForm"', function() {
        _reinitFeedback();
        _addInputs();

        form.getInputEl( 'age' ).value = 24;
        feedback.resetForm();

        expect( form.getInputEl( 'age' ).value ).toBe( '' );
    });

    it( 'test API "destroy"', function() {
        _reinitFeedback();
        _addInputs();

        feedback = feedback.destroy();

        expect( feedback ).toBe( null );
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
            expect( jasmine.Ajax.requests.mostRecent().url ).toBe( 'localhost' );
            expect( jasmine.Ajax.requests.mostRecent().method ).toBe( 'GET' );
        });
    });

    describe( 'test options', function() {
        beforeEach(function() { jasmine.Ajax.install() });
        afterEach(function() { jasmine.Ajax.uninstall() });

        it( 'iframePolyfill = auto', function() {
            test.iframePolyfill({
                ajax: {
                    iframePolyfill: 'auto'
                }
            });
        });

        it( 'iframePolyfill = auto; with input, type attribute equals file', function() {
            test.iframePolyfill({
                ajax: {
                    iframePolyfill: 'auto'
                }
            }, _addAvatarInput );
        });

        it( 'iframePolyfill = true', function() {
            test.iframePolyfill({
                ajax: {
                    iframePolyfill: true
                }
            });
        });

        it( 'iframePolyfill = false', function() {
            test.iframePolyfill({
                ajax: {
                    iframePolyfill: false
                }
            });
        });

        it( 'iframePolyfill = false; with input, type attribute equals file', function() {
            test.iframePolyfill({
                ajax: {
                    iframePolyfill: false
                }
            }, _addAvatarInput );
        });

        it( 'focusIncorrectInput = true', function() {
            test.focusIncorrectInput({
                toggle: 'on'
            });
        });

        it( 'focusIncorrectInput = false', function() {
            test.focusIncorrectInput({
                toggle: 'off'
            });
        });

        it( 'fireSchemaByTurn = true', function() {
            test.fireSchemaByTurn({
                toggle: 'on'
            });
        });

        it( 'fireSchemaByTurn = false', function() {
            test.fireSchemaByTurn({
                toggle: 'off'
            });
        });

        it( 'fireValidateAndAjaxWhenSubmit = true', function() {
            test.fireValidateAndAjaxWhenSubmit({
                toggle: 'on'
            });
        });

        it( 'fireValidateAndAjaxWhenSubmit = false', function() {
            test.fireValidateAndAjaxWhenSubmit({
                toggle: 'off'
            });
        });

        it( 'resetFormAfterAjax = true', function() {
            test.resetFormAfterAjax({
                toggle: 'on'
            });
        });

        it( 'resetFormAfterAjax = false', function() {
            test.resetFormAfterAjax({
                toggle: 'off'
            });
        });
    });

    function _init() {
        test.iframePolyfill = function( options, addInputsCallback ) {
            var url = './fake-url/'; //for prevent error: ...cross-origin frame.
            var ajaxType = null;
            var cantUseFormData = window.FormData === undefined;
            var hasFile = null;

            _addInputs( addInputsCallback );
            _reinitFeedback( options );

            hasFile = _formHasInputWithFileType( form.getFormEl() );

            feedback.ajax({
                url: url,
                method: 'POST',
                success: function( e ) {
                    ajaxType = e.type;
                }
            });
            feedback.ajax();

            if( jasmine.Ajax.requests.mostRecent() ) {
                jasmine.Ajax.requests.mostRecent().respondWith({
                    'status': 200
                });
            }
            else {
                feedback.iframe.onload();
            }

            if( options.ajax.iframePolyfill === 'auto' ) {
                if( !cantUseFormData ) {
                    expect( ajaxType ).toBe( 'ajax.2.0' );
                }
                else {
                    if( hasFile ) {
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
            }
        };

        test.focusIncorrectInput = function( options ) {
            var inputEl = null;
            var bool = options.toggle === 'on';

            _addInputs();
            _reinitFeedback({
                focusIncorrectInput: bool
            });

            inputEl = form.getInputEl( 'age' );
            spyOn( inputEl, 'focus' );

            feedback.schema({
                age: function() { return 'Error'; }
            });
            feedback.validate();

            if( bool ) {
                expect( inputEl.focus ).toHaveBeenCalled();
            }
            else {
                expect( inputEl.focus ).not.toHaveBeenCalled();
            }
        };

        test.fireSchemaByTurn = function( options ) {
            var count = 0;
            var bool = options.toggle === 'on';

            _addInputs();
            _reinitFeedback({
                fireSchemaByTurn: bool
            });

            feedback.schema({
                age: function() { return 'Error'; },
                phone: function() { return 'Error'; }
            });
            feedback.validate({
                error: function() { count++; }
            });
            feedback.validate();

            expect( count ).toEqual( bool ? 1 : 2 );
        };

        test.fireValidateAndAjaxWhenSubmit = function( options ) {
            var bool = options.toggle === 'on';
            var callback = {
                validate: jasmine.createSpy( 'success' ),
                ajax: jasmine.createSpy( 'success' )
            };

            _addInputs();
            _reinitFeedback({
                fireValidateAndAjaxWhenSubmit: bool
            });

            feedback.validate({
                before: function() {
                    callback.validate();
                }
            });
            feedback.ajax({
                before: function() {
                    callback.ajax();
                }
            });

            form.getInputEl( 'submit-name' ).click();

            if( bool ) {
                expect( callback.validate ).toHaveBeenCalled();
                expect( callback.ajax ).toHaveBeenCalled();
            }
            else {
                expect( callback.validate ).not.toHaveBeenCalled();
                expect( callback.ajax ).not.toHaveBeenCalled();
            }
        };

        test.resetFormAfterAjax = function( options ) {
            var bool = options.toggle === 'on';

            spyOn( form.getFormEl(), 'reset' );

            _addInputs();
            _reinitFeedback({
                resetFormAfterAjax: bool
            });

            feedback.ajax();
            jasmine.Ajax.requests.mostRecent().respondWith({
                'status': 200
            });

            if( bool ) {
                expect( form.getFormEl().reset ).toHaveBeenCalled();
            }
            else {
                expect( form.getFormEl().reset ).not.toHaveBeenCalled();
            }
        };
    }

    function _reinitFeedback( options ) {
        feedback = feedback && feedback.destroy();
        feedback = new Feedback( form.getFormEl(), options || {} );
    }

    function _formHasInputWithFileType( form ) {
        return form.querySelectorAll( 'input[type="file"]' ).length > 0;
    }

    function _addInputs( addInputsCallback ) {
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

        form.addInput({
            name: 'submit-name',
            type: 'submit'
        });

        addInputsCallback && addInputsCallback();
    }

    function _addAvatarInput() {
        form.addInput({
            name: 'avatar',
            type: 'file'
        });
    }
};
var Form = require( 'util/Form' );
var Feedback = require( 'Feedback' );

module.exports = function() {
    var feedback = null;
    var test = {};
    var form = new Form();

    form.addToDocument(); // if don't do this we get warning, need for options testing

    _init();
    _reinitFeedback();

    it( 'error test: new Feedback() first argument must be a form element', function() {
        expect(function() { new Feedback() }).toThrow();
    });

    it( 'error test: new Feedback() element with attribute name = submit not allowed', function() {
        _reinitFeedback();
        _addInputs(function() {
            form.addInput({
                name: 'submit',
                type: 'submit'
            });
        });
        _addInputs(); //remove input written above

        expect(function() { new Feedback() }).toThrow();
    });

    it( 'new Feedback() must return object', function() {
        var obj = jasmine.any( Object );

        expect( feedback ).toEqual( obj );
    });

    it( 'must have API "ajax, schema, update, validate, resetForm, fireValidateError, destroy"', function() {
        var fn = jasmine.any( Function );

        expect( feedback.ajax ).toEqual( fn );
        expect( feedback.schema ).toEqual( fn );
        expect( feedback.update ).toEqual( fn );
        expect( feedback.validate ).toEqual( fn );
        expect( feedback.resetForm ).toEqual( fn );
        expect( feedback.fireValidateError ).toEqual( fn );
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

    it( 'test API "fireValidateError"', function() {
        var errorFn = jasmine.createSpy( 'success' );

        _reinitFeedback({
            validate: {
                error: errorFn
            }
        });
        feedback.fireValidateError( 'error' );

        expect( errorFn ).toHaveBeenCalled();
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
                url: location.href,
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
            expect( jasmine.Ajax.requests.mostRecent().url ).toBe( location.href );
            expect( jasmine.Ajax.requests.mostRecent().method ).toBe( 'GET' );
        });

        it( 'test adding and removing loadingClass', function() {
            _reinitFeedback();
            form.clear();

            feedback.update();
            feedback.ajax();

            expect( form.getFormEl().className.trim() ).toBe( '--loading' );

            jasmine.Ajax.requests.mostRecent().respondWith({
                'status': 200
            });

            expect( form.getFormEl().className.trim() ).toBe( '' );
        });

        it( 'test onprogress event', function() {
            var success = jasmine.createSpy( 'success' );

            _reinitFeedback();
            form.clear();

            feedback.update();
            feedback.ajax({
                progress: function() {
                    success();
                }
            });
            feedback.ajax();
            jasmine.Ajax.requests.mostRecent().respondWith({
                'status': 200
            });

            jasmine.Ajax.requests.mostRecent().upload.onprogress({
                loaded: 100,
                total: 100
            });

            expect( success ).toHaveBeenCalled();
        });

        it( 'test onprogress event for iframePolyfill', function() {
            var success = jasmine.createSpy( 'success' );

            _reinitFeedback();
            form.clear();

            feedback.update();
            feedback.ajax({
                iframePolyfill: true,
                progress: function() {
                    success();
                }
            });
            feedback.ajax();
            feedback.iframe.onload();

            expect( success ).toHaveBeenCalled();
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

    describe( 'validation functions', function() {
        var res = null;

        it( 'get', function() {
            test.validationFunctions({
                input: {
                    name: 'login',
                    value: 'furashcka'
                },
                fn: function() {
                    res = this.get().value;
                },
                expect: function() {
                    expect( res ).toBe( 'furashcka' );
                }
            });
        });

        it( 'contains', function() {
            test.validationFunctions({
                input: {
                    name: 'about',
                    value: 'i am web developer'
                },
                fn: function() {
                    res = this.contains( 'web' );
                },
                expect: function() {
                    expect( res ).toBe( true );
                }
            });
        });

        it( 'equals', function() {
            test.validationFunctions({
                input: {
                    name: 'password',
                    value: '1q2w3e4r5t'
                },
                fn: function() {
                    res = this.equals( '1q2w3e4r5t' );
                },
                expect: function() {
                    expect( res ).toBe( true );
                }
            });
        });

        it( 'isAlpha', function() {
            test.validationFunctions({
                input: {
                    name: 'user',
                    value: 'jony'
                },
                fn: function() {
                    res = this.isAlpha( 'en-US' );
                },
                expect: function() {
                    expect( res ).toBe( true );
                }
            });
        });

        it( 'isAlphanumeric', function() {
            test.validationFunctions({
                input: {
                    name: 'user',
                    value: 'jony123'
                },
                fn: function() {
                    res = this.isAlphanumeric( 'en-US' );
                },
                expect: function() {
                    expect( res ).toBe( true );
                }
            });
        });

        it( 'isCreditCard', function() {
            test.validationFunctions({
                input: {
                    name: 'card',
                    value: '4111 1111 1111 1111'
                },
                fn: function() {
                    res = this.isCreditCard();
                },
                expect: function() {
                    expect( res ).toBe( true );
                }
            });
        });

        it( 'isEmail', function() {
            test.validationFunctions({
                input: {
                    name: 'email',
                    value: 'furashcka@gmail.com'
                },
                fn: function() {
                    res = this.isEmail();
                },
                expect: function() {
                    expect( res ).toBe( true );
                }
            });
        });

        it( 'isEmpty', function() {
            test.validationFunctions({
                input: {
                    name: 'email',
                    value: ' '
                },
                fn: function() {
                    res = this.isEmpty();
                },
                expect: function() {
                    expect( res ).toBe( true );
                }
            });
        });

        it( 'isFloat', function() {
            test.validationFunctions({
                input: {
                    name: 'price',
                    value: '5.99'
                },
                fn: function() {
                    res = this.isFloat();
                },
                expect: function() {
                    expect( res ).toBe( true );
                }
            });
        });

        it( 'isIn', function() {
            test.validationFunctions({
                input: {
                    name: 'sex',
                    value: 'male'
                },
                fn: function() {
                    res = this.isIn([ 'male', 'female' ]);
                },
                expect: function() {
                    expect( res ).toBe( true );
                }
            });
        });

        it( 'isInt', function() {
            test.validationFunctions({
                input: {
                    name: 'age',
                    value: '26'
                },
                fn: function() {
                    res = this.isInt();
                },
                expect: function() {
                    expect( res ).toBe( true );
                }
            });
        });

        it( 'isMobilePhone', function() {
            test.validationFunctions({
                input: {
                    name: 'tel',
                    value: '+77777777777'
                },
                fn: function() {
                    res = this.isMobilePhone();
                },
                expect: function() {
                    expect( res ).toBe( true );
                }
            });
        });

        it( 'isNumeric', function() {
            test.validationFunctions({
                input: {
                    name: 'numbers',
                    value: '77777777777'
                },
                fn: function() {
                    res = this.isNumeric();
                },
                expect: function() {
                    expect( res ).toBe( true );
                }
            });
        });

        it( 'isURL', function() {
            test.validationFunctions({
                input: {
                    name: 'blog',
                    value: 'https://f-cka.com/'
                },
                fn: function() {
                    res = this.isURL();
                },
                expect: function() {
                    expect( res ).toBe( true );
                }
            });
        });

        it( 'matches', function() {
            test.validationFunctions({
                input: {
                    name: 'name',
                    value: 'Evgeny Krylov'
                },
                fn: function() {
                    res = this.matches( /[A-Za-z]/g );
                },
                expect: function() {
                    expect( res ).toBe( true );
                }
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

        test.validationFunctions = function( options ) {
            var schema = {};
            schema[ options.input.name ] = options.fn;

            _reinitFeedback();

            form.clear();
            form.addInput({
                name: options.input.name,
                type: 'text',
                value: options.input.value
            });

            feedback.schema( schema );
            feedback.update();
            feedback.validate();

            options.expect();
        }
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
var helper = require( './helper' );
var Feedback = require( 'Feedback' );

module.exports = function() {
    it( 'must have API "schema", "ajax", "update", "validate", "resetForm", "fireValidateError", "destroy"', function() {
        var feedback = new Feedback( helper.form.el );
        var fn = jasmine.any( Function );

        expect( feedback.schema ).toEqual( fn );
        expect( feedback.ajax ).toEqual( fn );
        expect( feedback.update ).toEqual( fn );
        expect( feedback.validate ).toEqual( fn );
        expect( feedback.resetForm ).toEqual( fn );
        expect( feedback.fireValidateError ).toEqual( fn );
        expect( feedback.destroy ).toEqual( fn );

        feedback = feedback.destroy();
    });

    it( 'test API "schema"', function() {
        var feedback = new Feedback( helper.form.el );
        var fn = jasmine.any( Function );
        var callback = {
            step_0: jasmine.createSpy( 'success' ),
            step_1: jasmine.createSpy( 'success' ),
        };
        var changed = jasmine.createSpy( 'success' );

        //test without steps
        feedback.update();
        feedback.schema({
            age: fn
        });

        expect( feedback.options.schema[ feedback.options.validationStep ].age ).toEqual( fn );

        //test with steps
        feedback.schema( 'step-0', {
            phone: function() {
                callback.step_0();
            }
        });

        feedback.schema( 'step-1', {
            age: function() {
                callback.step_1();
            }
        });

        feedback.step('changed', changed);
        feedback.step('set', 1);
        feedback.validate();

        expect( callback.step_0 ).not.toHaveBeenCalled();
        expect( callback.step_1 ).toHaveBeenCalled();
        expect( changed ).toHaveBeenCalled();

        feedback = feedback.destroy();
    });

    it( 'test API "step"', function() {
        var feedback = new Feedback( helper.form.el, {
            schema: {
                'step-0': {
                    login: function() {
                        callback.step_0();
                    }
                },
                'step-1': {
                    name: function() {
                        callback.step_1();
                    }
                }
            }
        });
        var callback = {
            step_0: jasmine.createSpy( 'success' ),
            step_1: jasmine.createSpy( 'success' ),
            step_2: jasmine.createSpy( 'success' ),
        };

        helper.form.add.input({
            name: 'login',
            type: 'text',
            value: 'furashcka'
        });

        feedback.schema('step-2', {
            age: function() {
                callback.step_2();
            }
        });
        feedback.update();

        expect( feedback.step( 'get' ) ).toEqual( 0 );
        expect( feedback.step( 'next' ) ).toEqual( true );
        expect( feedback.step( 'next' ) ).toEqual( true );
        expect( feedback.step( 'next' ) ).toEqual( false );
        expect( feedback.step( 'next' ) ).toEqual( false );
        expect( feedback.step( 'next' ) ).toEqual( false );
        expect( feedback.step( 'get' ) ).toEqual( 2 );
        expect( feedback.step( 'prev' ) ).toEqual( true );
        expect( feedback.step( 'prev' ) ).toEqual( true );
        expect( feedback.step( 'prev' ) ).toEqual( false );
        expect( feedback.step( 'prev' ) ).toEqual( false );
        expect( feedback.step( 'prev' ) ).toEqual( false );
        expect( feedback.step( 'get' ) ).toEqual( 0 );

        feedback.step( 'set', 200 );

        expect( feedback.step( 'get' ) ).toEqual( 2 );
        expect( feedback.step( 'set', 'sdfsdf' ) ).toEqual( false );

        feedback = feedback.destroy();
    });

    it( 'test API "update"', function() {
        var feedback = new Feedback( helper.form.el );
        var obj = jasmine.any( Object );

        helper.form.add.input({
            name: 'price',
            value: '15.00'
        });

        feedback.update();

        expect( feedback.inputsGroupedByName.price ).toEqual( obj );

        feedback = feedback.destroy();
    });

    it( 'test API "validate"', function() {
        var feedback = new Feedback( helper.form.el );
        var callback = {
            before: jasmine.createSpy( 'success' ),
            after: jasmine.createSpy( 'success' ),
            success: jasmine.createSpy( 'success' ),
            error: jasmine.createSpy( 'success' )
        };

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

        feedback = feedback.destroy();
    });

    it( 'test API "resetForm"', function() {
        var feedback = new Feedback( helper.form.el );
        var input = helper.form.getFormElementsByName( 'age' )[0];

        input.value = 24;

        feedback.resetForm();
        expect( input.value ).toBe( '' );

        feedback = feedback.destroy();
    });

    it( 'test API "fireValidateError"', function() {
        var feedback = new Feedback( helper.form.el );
        var errorFn = jasmine.createSpy( 'success' );

        feedback.validate({
            error: errorFn
        });
        feedback.fireValidateError( 'error' );

        expect( errorFn ).toHaveBeenCalled();

        feedback = feedback.destroy();
    });

    it( 'test API "destroy"', function() {
        var feedback = new Feedback( helper.form.el );

        feedback = feedback.destroy();

        expect( feedback ).toBe( null );
    });
};
var helper = require( './helper' );
var Feedback = require( 'Feedback' );

module.exports = function() {
    beforeEach(function() {
        helper.fakeAjax.install();
    });
    afterEach(function() {
        helper.fakeAjax.uninstall();
    });



    it( '"focusIncorrectInput" = true', function() {
        _testFocusIncorrectInput({
            focusIncorrectInput: true
        });
    });

    it( '"focusIncorrectInput" = false', function() {
        _testFocusIncorrectInput({
            focusIncorrectInput: false
        });
    });



    it( '"fireSchemaByTurn" = true', function() {
        _testSchemaByTurn({
            fireSchemaByTurn: true
        });
    });

    it( '"fireSchemaByTurn" = false', function() {
        _testSchemaByTurn({
            fireSchemaByTurn: false
        });
    });



    it( '"validateAndAjaxWhenSubmit" = true', function() {
        _testValidateAndAjaxWhenSubmit({
            fireValidateAndAjaxWhenSubmit: true
        });
    });

    it( '"validateAndAjaxWhenSubmit" = false', function() {
        _testValidateAndAjaxWhenSubmit({
            fireValidateAndAjaxWhenSubmit: false
        });
    });



    it( '"resetFormAfterAjax" = true', function() {
        _testResetFormAfterAjax({
            resetFormAfterAjax: true
        });
    });

    it( '"resetFormAfterAjax" = false', function() {
        _testResetFormAfterAjax({
            resetFormAfterAjax: false
        });
    });
};

function _testFocusIncorrectInput( options ) {
    var inputElement = helper.form.getFormElementsByName( 'phone' )[0];
    var feedback = new Feedback( helper.form.el, {
        focusIncorrectInput: options.focusIncorrectInput
    });

    spyOn( inputElement, 'focus' );

    feedback.schema({
        phone: function() {
            return 'Error';
        }
    });

    feedback.validate();

    if( options.focusIncorrectInput === true ) {
        expect( inputElement.focus ).toHaveBeenCalled();
    }
    else {
        expect( inputElement.focus ).not.toHaveBeenCalled();
    }

    feedback = feedback.destroy();
}

function _testSchemaByTurn( options ) {
    var feedback = new Feedback( helper.form.el, {
        fireSchemaByTurn: options.fireSchemaByTurn
    });
    var errorCount = 0;

    feedback.schema({
        'phone': function() {
            return 'Error';
        },
        'age': function() {
            return 'Error';
        }
    });

    feedback.validate({
        error: function() {
            errorCount++;
        }
    });
    feedback.validate();

    if( options.fireSchemaByTurn === true ) {
        expect( errorCount ).toBe( 1 );
    }
    else {
        expect( errorCount ).toBe( 2 );
    }

    feedback = feedback.destroy();
}

function _testValidateAndAjaxWhenSubmit( options ) {
    var feedback = new Feedback( helper.form.el, {
        fireValidateAndAjaxWhenSubmit: options.fireValidateAndAjaxWhenSubmit
    });
    var validateAfter = jasmine.createSpy( 'validateAfter' );
    var ajaxAfter = jasmine.createSpy( 'ajaxAfter' );

    feedback.schema({
        phone: function() {}
    });

    feedback.validate({
        after: function() {
            validateAfter();
        }
    });

    feedback.ajax({
        after: function() {
            ajaxAfter();
        }
    });

    helper.triggerEvent( helper.form.el, 'submit' );

    if( options.fireValidateAndAjaxWhenSubmit === true ) {
        helper.fakeAjax.respondWith({
            'status': 200
        });

        expect( validateAfter ).toHaveBeenCalled();
        expect( ajaxAfter ).toHaveBeenCalled();
    }
    else {
        expect( validateAfter ).not.toHaveBeenCalled();
        expect( ajaxAfter ).not.toHaveBeenCalled();
    }

    feedback = feedback.destroy();
}

function _testResetFormAfterAjax( options ) {
    var feedback = new Feedback( helper.form.el, {
        resetFormAfterAjax: options.resetFormAfterAjax
    });

    spyOn(helper.form.el, 'reset');

    helper.triggerEvent( helper.form.el, 'submit' );
    helper.fakeAjax.respondWith({
        'status': 200
    });

    if(options.resetFormAfterAjax === true) {
        expect( helper.form.el.reset ).toHaveBeenCalled();
    }
    else {
        expect( helper.form.el.reset ).not.toHaveBeenCalled();
    }
}
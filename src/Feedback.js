var consoleObj = require( 'console' );
var getInputsGroupedByName = require( 'getInputsGroupedByName' );
var helper = require( 'helper' );

module.exports = function( form, options ) {
    consoleObj.firstArgumentMustBeFormElement( form );
    consoleObj.incorrectSubmitButtonName( form );

    var self = this;

    helper.addFeedback2List( self );

    self.version = '0.1.6';
    self.form = form;
    self.iframe = null; //for polifill ajax
    self.inputsGroupedByName = {};
    self.submitFn = null;
    self.progressTimeoutID = null;
    self.options = {
        focusIncorrectInput: true,
        fireSchemaByTurn: true,
        blockSubmitWhenFormSending: true,
        fireValidateAndAjaxWhenSubmit: true,
        resetFormAfterAjax: true,
        schema: {},
        validationStep: 0,
        ajax: {
            loadingClass: '--loading',
            url: form.getAttribute( 'action' ) || location.href,
            method: form.getAttribute( 'method' ) || 'POST',
            iframePolyfill: 'auto',
            iframePostMessage: false,
            iframeTimeout: 0,
            before: function() {},
            after: function() {},
            success: function() {},
            error: function() {},
            progress: function() {}
        },
        validate: {
            before: function() {},
            after: function() {},
            success: function() {},
            error: function() {}
        }
    };
    self.options = helper.extend( true, self.options, options || {} );

    _prepareSchema( this );
    _updateFormAttributes( this );
    self.update();

    if( self.options.fireValidateAndAjaxWhenSubmit === true ) {
        self.submitFn = function( e ) {
            var isLoading = helper.hasClass( self.form, self.options.ajax.loadingClass );

            e.preventDefault();

            if( self.options.blockSubmitWhenFormSending === true && isLoading ) {
                return false;
            }

            if( self.validate() === true ) {
                self.ajax();
            }
        };

        self.form.addEventListener( 'submit', self.submitFn );
    }
};

module.exports.prototype.schema = function() {
    var args = arguments;
    var argsIndex = 0;
    var isFirstArgumentStep = helper.isString( args[ 0 ] ) && helper.isValidationStep( args[ 0 ] );
    var stepIndex = 0;

    if( isFirstArgumentStep ) {
        stepIndex = helper.getValidationStepIndex( args[ 0 ] );
        argsIndex = 1;
    }

    this.options.schema[ stepIndex ] = args[ argsIndex ];

    return this;
};

module.exports.prototype.step = function( controller, step ) {
    var self = this;
    var res = undefined;

    switch( controller ) {
        case 'get':
            res = self.options.validationStep;
            break;

        case 'set':
            res = false;

            if( typeof step === 'number' ) {
                res = true;
                self.options.validationStep = step;
            }
            break;

        case 'next':
            res = true;
            self.options.validationStep++;
            break;

        case 'prev':
            res = true;
            self.options.validationStep--;
            break;
    }

    if( self.options.validationStep < 0 ) {
        res = false;
        self.options.validationStep = 0;
    }

    if( self.options.validationStep > self.options.schema.length - 1 ) {
        res = false;
        self.options.validationStep = self.options.schema.length - 1;
    }

    return res;
};

module.exports.prototype.ajax = function( ajax ) {
    if( typeof ajax === 'undefined' ) {
        return require( 'ajax' ).call( this );
    }

    this.options.ajax = helper.extend( this.options.ajax, ajax || {} );
    this.options.ajax.method = this.options.ajax.method.toUpperCase();

    _updateFormAttributes( this );

    return this;
};

module.exports.prototype.validate = function( validate ) {
    if( typeof validate === 'undefined' || helper.isArray( validate ) ) {
        return require( 'validate' ).call( this, validate );
    }

    this.options.validate = helper.extend( this.options.validate, validate || {} );

    return this;
};

module.exports.prototype.update = function() {
    var addValidateApi = require( 'addValidateApi' );

    this.inputsGroupedByName = getInputsGroupedByName( this.form );
    this.inputsGroupedByName = addValidateApi( this.inputsGroupedByName );

    return this;
};

module.exports.prototype.fireValidateError = function( message, element ) {
    this.options.validate.error.call( helper.getEmptyObj(), message, element );
    this.options.focusIncorrectInput === true && element && element[0] && element[0].focus && element[0].focus();

    return this;
};

module.exports.prototype.resetForm = function() {
    require( 'resetForm' )( this );

    return this;
};

module.exports.prototype.destroy = function() {
    this.form.removeEventListener( 'submit', this.submitFn );
    this.iframe && this.iframe.parentNode.removeChild( this.iframe );

    return null;
};

/*
    API destroy call example
    var feedback = new Feedback( form );
    feedback = feedback.destroy();
*/

function _updateFormAttributes( self ) {
    self.form.setAttribute( 'novalidate', '' );
    self.form.setAttribute( 'action', self.options.ajax.url );
    self.form.setAttribute( 'method', self.options.ajax.method );
}

function _prepareSchema( self ) {
    var keys = Object.keys( self.options.schema );
    var schema = [{}];

    if( keys < 1 ) return;

    helper.forEach( self.options.schema, function( val, key ) {
        var stepIndex = null;
        var isStep = helper.isValidationStep( key );
        var isFn = helper.isFunction( val );

        if( isStep ) {
            stepIndex = helper.getValidationStepIndex( key );
            schema[stepIndex] = val;
        }
        else if( isFn ) {
            schema[ 0 ][key] = val;
        }
    });

    for( var i = 0; i < schema.length; i++ ) {
        if( schema[ i ] === undefined ) {
            schema[ i ] = {};
        }
    }

    self.options.schema = schema;
}
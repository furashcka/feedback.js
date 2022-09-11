var helper = require( 'helper' );
var inspector = require( 'inspector' );
var getInputsGroupedByName = require( 'getInputsGroupedByName' );

module.exports = function( form, options ) {
    if (
      !inspector.checkFirstArgument( form ) ||
      !inspector.checkSubmitButton( form )
    ) {
      return;
    }

    var self = this;

    helper.addFeedback2List( self );

    self.version = '0.1.9';
    self.form = form;
    self.iframe = null; // for polifill ajax
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
        validationStepChanged: function() {},
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

            var isValid = _validateSchemaSteps( self );

            if( isValid ) {
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

module.exports.prototype.step = function( controller, payload ) {
    var self = this;
    var res = undefined;

    switch( controller ) {
        case 'get':
            return self.options.validationStep;

        case 'set':
            res = false;

            if( typeof payload === 'number' ) {
                res = true;
                self.options.validationStep = payload;
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

        case 'changed':
            if ( helper.isFunction( payload ) ) {
                self.options.validationStepChanged = payload;
            }
            return;
    }

    var stepsSize = Object.keys( self.options.schema ).length - 1;

    if( self.options.validationStep < 0 ) {
        res = false;
        self.options.validationStep = 0;
    }

    if( self.options.validationStep > stepsSize ) {
        res = false;
        self.options.validationStep = stepsSize;
    }

    if ( helper.isFunction( self.options.validationStepChanged ) ) {
        self.options.validationStepChanged( self.options.validationStep );
    }

    return res;
};

module.exports.prototype.ajax = function( args ) {
    if( typeof args === 'undefined' || helper.isArray( args ) ) {
        return require( 'ajax' ).call( this, args );
    }

    this.options.ajax = helper.extend( this.options.ajax, args || {} );
    this.options.ajax.method = this.options.ajax.method.toUpperCase();

    _updateFormAttributes( this );

    return this;
};

module.exports.prototype.validate = function( args ) {
    if( typeof args === 'undefined' || helper.isArray( args ) ) {
        return require( 'validate' ).call( this, args );
    }

    this.options.validate = helper.extend( this.options.validate, args || {} );

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
    this.form.reset();

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

function _validateSchemaSteps( self ) {
    var stepsSize = Object.keys( self.options.schema ).length;
    var isValid = true;

    for( var i = 0; i < stepsSize; i++ ) {
        if ( !self.validate() ) {
            isValid = false;
            break;
        }

        self.step( 'next' );
    }

    return isValid;
}
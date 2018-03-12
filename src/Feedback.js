var exceptions = require( './exceptions.js' );
var getInputsGroupedByName = require( './getInputsGroupedByName.js' );
var helper = require( './helper.js' );



module.exports = function( form, options ) {
    exceptions.checkIncludeValidatorJs();
    exceptions.firstArgumentMustBeFormElement( form );

    var self = this;

    self.form = form;
    self.inputsGroupedByName = {};
    self.options = {
        polyfillAjaxIframe: 'auto',
        focusIncorrectInput: true,
        fireSchemaByTurn: true,
        fireValidateAndAjaxWhenSubmit: true,
        resetFormAfterAjax: true,
        schema: {},
        ajax: {
            url: form.getAttribute( 'action' ) || '/',
            method: form.getAttribute( 'method' ) || 'POST',
            before: function() {},
            after: function() {},
            success: function() {},
            error: function() {}
        },
        validate: {
            before: function() {},
            after: function() {},
            success: function() {},
            error: function() {}
        }
    };
    self.options = helper.extend( true, self.options, options || {} );

    self.update();

    if( self.options.fireValidateAndAjaxWhenSubmit === true ) {
        self.form.addEventListener( 'submit', function( e ) {
            e.preventDefault();

            if( self.validate() === true ) {
                self.ajax();
            }
        });
    }
};

module.exports.prototype.schema = function( schema ) {
    this.options.schema = schema;
};

module.exports.prototype.validate = function( validate ) {
    if( typeof validate === 'undefined' || helper.isArray( validate ) ) {
        return require( './validate.js' ).call( this, validate );
    }

    this.options.validate = helper.extend( this.options.validate, validate || {} );
};

module.exports.prototype.ajax = function( ajax ) {
    if( typeof ajax === 'undefined' ) {
        return require( './ajax.js' ).call( this );
    }

    this.options.ajax = helper.extend( this.options.ajax, ajax || {} );
};

module.exports.prototype.update = function() {
    var addValidateApi = require( './addValidateApi.js' );

    this.inputsGroupedByName = getInputsGroupedByName( this.form );
    this.inputsGroupedByName = addValidateApi( this.inputsGroupedByName );
};
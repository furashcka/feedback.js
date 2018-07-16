var logger = require( 'logger' );
var getInputsGroupedByName = require( 'getInputsGroupedByName' );
var helper = require( 'helper' );

module.exports = function( form, options ) {
    logger.checkDependencies();
    logger.firstArgumentMustBeFormElement( form );

    var self = this;

    self.form = form;
    self.iframe = null; //for polifill ajax
    self.inputsGroupedByName = {};
    self.options = {
        focusIncorrectInput: true,
        fireSchemaByTurn: true,
        fireValidateAndAjaxWhenSubmit: true,
        resetFormAfterAjax: true,
        schema: {},
        ajax: {
            url: form.getAttribute( 'action' ) || location.href,
            method: form.getAttribute( 'method' ) || 'POST',
            iframePolyfill: 'auto',
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

    _updateFormAttributes( self.form, self.options.ajax.url, self.options.ajax.method );
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
        return require( 'validate' ).call( this, validate );
    }

    this.options.validate = helper.extend( this.options.validate, validate || {} );
};

module.exports.prototype.ajax = function( ajax ) {
    if( typeof ajax === 'undefined' ) {
        return require( 'ajax' ).call( this );
    }

    this.options.ajax = helper.extend( this.options.ajax, ajax || {} );

    _updateFormAttributes( this.form, this.options.ajax.url, this.options.ajax.method );
};

module.exports.prototype.update = function() {
    var addValidateApi = require( 'addValidateApi' );

    this.inputsGroupedByName = getInputsGroupedByName( this.form );
    this.inputsGroupedByName = addValidateApi( this.inputsGroupedByName );
};

module.exports.prototype.resetForm = function() {
    require( 'resetForm' )( this );
};

function _updateFormAttributes( form, action, method ) {
    form.setAttribute( 'action', action );
    form.setAttribute( 'method', method );
}
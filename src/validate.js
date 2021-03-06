var helper = require( 'helper' );

module.exports = function( validateOnlySchemaItems ) {
    var self = this;
    var firstInvalidInput = null;
    var schema = _resolveSchema( self, self.options.schema[ self.options.validationStep ] || {}, validateOnlySchemaItems );

    self.options.validate.before.call( helper.getEmptyObj() );

    helper.forEach( schema, function( item, key ) {
        if( !( key in self.inputsGroupedByName ) ) return;

        var inputsGroup = self.inputsGroupedByName[ key ];
        var inputsArr = _inputsGroup2Array( inputsGroup );
        var errorMessage = item.call( inputsGroup );

        if( typeof errorMessage !== 'undefined' ) {
            if( firstInvalidInput === null ) {
                firstInvalidInput = inputsGroup.get();
            }

            self.options.validate.error.call( helper.getEmptyObj(), errorMessage, inputsArr );

            return !self.options.fireSchemaByTurn;
        }
    });

    if( firstInvalidInput !== null && self.options.focusIncorrectInput === true ) {
        firstInvalidInput.focus();
    }

    if( firstInvalidInput === null ) {
        self.options.validate.success.call( helper.getEmptyObj() );
    }

    self.options.validate.after.call( helper.getEmptyObj() );

    return firstInvalidInput === null;
};

function _resolveSchema( self, schema, validateOnlySchemaItems ) {
    if( helper.isArray( validateOnlySchemaItems ) ) {
        schema = {};

        helper.forEach( validateOnlySchemaItems, function( key ) {
            schema[ key ] = self.options.schema[ self.options.validationStep ][ key ];
        });
    }

    return schema;
};

function _inputsGroup2Array( inputsGroup ) {
    var arr = [];

    helper.forEach( inputsGroup, function( input ) {
        arr.push( input );
    });

    return arr;
}
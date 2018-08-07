var helper = require( 'helper' );

module.exports = function( validateOnlySchemaItems ) {
    var self = this;
    var schema = _resolveSchema( self, self.options.schema, validateOnlySchemaItems );
    var firstInvalidInput = null;

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

            self.options.validate.error.call( inputsArr, errorMessage );

            return !self.options.fireSchemaByTurn;
        }
    });

    self.options.validate.after.call( helper.getEmptyObj() );

    if( firstInvalidInput !== null && self.options.focusIncorrectInput === true ) {
        firstInvalidInput.focus();
    }

    if( firstInvalidInput === null ) {
        self.options.validate.success.call( helper.getEmptyObj() );
    }

    return firstInvalidInput === null;
};

function _resolveSchema( self, schema, validateOnlySchemaItems ) {
    if( helper.isArray( validateOnlySchemaItems ) ) {
        schema = {};

        helper.forEach( validateOnlySchemaItems, function( key ) {
            schema[ key ] = self.options.schema[ key ];
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
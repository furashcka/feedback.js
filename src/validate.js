var helper = require( './helper.js' );



module.exports = function( ignoreEverySchemaItemsExcept ) {
    var self = this;
    var schema = _resolveSchema( self, self.options.schema, ignoreEverySchemaItemsExcept );
    var firstInvalidInput = null;

    self.options.validate.before.call( null );

    helper.forEach( schema, function( item, key ) {
        if( !( key in self.inputsGroupedByName ) ) return;

        var inputsGroup = self.inputsGroupedByName[ key ];
        var errorMessage = item.call( inputsGroup );

        if( typeof errorMessage !== 'undefined' ) {
            if( firstInvalidInput === null ) {
                firstInvalidInput = inputsGroup.get();
            }

            self.options.validate.error.call( inputsGroup, errorMessage );

            return !self.options.fireSchemaByTurn;
        }
    });

    self.options.validate.after.call( null );

    if( firstInvalidInput !== null && self.options.focusIncorrectInput === true ) {
        firstInvalidInput.focus();
    }

    if( firstInvalidInput === null ) {
        self.options.validate.success.call( null );
    }

    return firstInvalidInput === null;
};

function _resolveSchema( self, schema, ignoreEverySchemaItemsExcept ) {
    if( helper.isArray( ignoreEverySchemaItemsExcept ) ) {
        schema = {};

        helper.forEach( ignoreEverySchemaItemsExcept, function( key ) {
            schema[ key ] = self.options.schema[ key ];
        });
    }

    return schema;
};
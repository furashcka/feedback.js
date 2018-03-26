var helper = require( 'helper' );
var createValidateObject = require( 'createValidateObject' );

module.exports = function( inputsGroupedByName ) {
    helper.forEach( inputsGroupedByName, function( inputsGroup, key ) {
        inputsGroupedByName[ key ] = createValidateObject( inputsGroup );
    });

    return inputsGroupedByName;
};
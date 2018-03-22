var helper = require( './helper.js' );
var createValidateObject = require( './createValidateObject.js' );

module.exports = function( inputsGroupedByName ) {
    helper.forEach( inputsGroupedByName, function( inputsGroup, key ) {
        inputsGroupedByName[ key ] = createValidateObject( inputsGroup );
    });

    return inputsGroupedByName;
};
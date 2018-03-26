var helper = require( 'helper' );
var ignoreInputTypesRegex = /^(?:submit|button|image|reset)$/i;

module.exports = function( form ) {
    var inputs = form.querySelectorAll( 'input, textarea, select' );
    var groups = {};

    helper.forEach( inputs, function( item ) {
        var name = item.name || '';
        var type = item.type || '';
        var test = name.trim() === '' || ignoreInputTypesRegex.test( type );

        if( test ) return;

        if( !( name in groups ) ) {
            groups[ name ] = [];
        }

        groups[ name ].push( item );
    });

    return groups;
};
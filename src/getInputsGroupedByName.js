var helper = require( './helper.js' );

module.exports = function( form ) {
    var inputs = form.querySelectorAll( 'input, textarea, select' );
    var groups = {};

    helper.forEach( inputs, function( item ) {
        var name = item.getAttribute( 'name' );
        
        if( name.trim() === '' ) return;

        if( !( name in groups ) ) {
            groups[ name ] = [];
        }

        groups[ name ].push( item );
    });

    return groups;
};
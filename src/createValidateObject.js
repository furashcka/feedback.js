var helper = require( 'helper' );
var prototype = {
    get: function( index ) {
        if( index === -1 ) return this[ this.length - 1 ];

        return this[ index || 0 ];
    },
    isAnyChecked: function() {
        var isAnyChecked = false;

        helper.forEach( this, function( input ) {
            if( input.checked === true ) {
                isAnyChecked = true;

                return false;
            }
        });

        return isAnyChecked;
    },
    contains: function( seed ) {
        return require( 'node_modules/validator/lib/contains' )( this.get().value, seed );
    },
    equals: function( comparison ) {
        return require( 'node_modules/validator/lib/equals' )( this.get().value, comparison );
    },
    isAlpha: function( locale ) {
        return require( 'node_modules/validator/lib/isAlpha' ).default( this.get().value, locale );
    },
    isAlphanumeric: function( locale ) {
        return require( 'node_modules/validator/lib/isAlphanumeric' ).default( this.get().value, locale );
    },
    isCreditCard: function() {
        return require( 'node_modules/validator/lib/isCreditCard' )( this.get().value );
    },
    isEmail: function( options ) {
        return require( 'node_modules/validator/lib/isEmail' )( this.get().value, options );
    },
    isEmpty: function() {
        return require( 'node_modules/validator/lib/isEmpty' )( this.get().value, {
            ignore_whitespace: true
        });
    },
    isFloat: function() {
        return require( 'node_modules/validator/lib/isFloat' ).default( this.get().value );
    },
    isIn: function( values ) {
        return require( 'node_modules/validator/lib/isIn' ).default( this.get().value, values );
    },
    isInt: function( options ) {
        return require( 'node_modules/validator/lib/isInt' ).default( this.get().value, options );
    },
    isMobilePhone: function( options ) {
        return require( 'node_modules/validator/lib/isMobilePhone' ).default( this.get().value, options );
    },
    isNumeric: function( options ) {
        return require( 'node_modules/validator/lib/isNumeric' ).default( this.get().value, options );
    },
    isURL: function( options ) {
        return require( 'node_modules/validator/lib/isURL' ).default( this.get().value, options );
    },
    matches: function( pattern, modifiers ) {
        return require( 'node_modules/validator/lib/matches' ).default( this.get().value, pattern, modifiers );
    }
};

_defineProperties( prototype );

module.exports = function( array ) {
    var obj = Object.create( prototype );
    var i = 0;

    helper.forEach( array, function( item ) {
        obj[ i++ ] = item;
    });

    return obj;
};

function _defineProperties( obj ) {
    helper.forEach( obj, function( val, key ) {
        Object.defineProperty( obj, key, {
            writable: false,
            enumerable: false,
            configurable: false
        });
    });
}
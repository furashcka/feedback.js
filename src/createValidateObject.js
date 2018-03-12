var helper = require( './helper.js' );
var ignoreApi = {
    version: '',
    blacklist: '',
    escape: '',
    unescape: '',
    ltrim: '',
    normalizeEmail: '',
    rtrim: '',
    stripLow: '',
    toBoolean: '',
    toDate: '',
    toFloat: '',
    toInt: '',
    trim: '',
    whitelist: '',
    isEmpty: ''
};
var prototype = {
    get: function( index ) {
        if( index === -1 ) return this[ this.length - 1 ];

        return this[ index || 0 ];
    },
    isEmpty: function() {
        var val = this.get().value.trim();
        return window.validator.isEmpty( val );
    }
};



helper.forEach( window.validator, function( api, key ) {
    if( key in ignoreApi ) return;

    prototype[ key ] = function() {
        var value = this.get().value;
        var args = Array.prototype.splice.call( arguments, 0, arguments.length );

        args = [ value ].concat( args );

        return window.validator[ key ].apply( null, args );
    };
});



module.exports = function( array ) {
    var obj = Object.create( prototype );
    var i = 0;

    helper.forEach( array, function( item ) {
        obj[ i++ ] = item;
    });

    return obj;
};
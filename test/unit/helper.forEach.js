module.exports = function( obj, fn ) {
    var keys = Object.keys( obj );
    var len = keys.length;

    for( var i = 0; i < len; i++ ) {
        var key = keys[ i ];
        var val = obj[ key ];
        var res = fn.call( val, val, key );

        if( res === false ) break;
    }
};
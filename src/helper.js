module.exports = {
    extend: _extend,
    forEach: _forEach,
    isArray: _isArray,
    isBoolean: _isBoolean,
    isObject: _isObject
};

function _extend() {
    var extended = {};
    var deep = false;
    var i = 0;
    var length = arguments.length;

    if ( _isBoolean( arguments[ 0 ] ) ) {
        deep = arguments[ 0 ];
        i++;
    }

    for ( ; i < length; i++ ) {
        var obj = arguments[ i ];
        _merge( obj );
    }

    function _merge( obj ) {
        for ( var prop in obj ) {
            if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
                if ( deep && _isObject( obj[ prop ] ) ) {
                    extended[ prop ] = _extend( true, extended[ prop ], obj[ prop ] );
                }
                else {
                    extended[ prop ] = obj[ prop ];
                }
            }
        }
    };

    return extended;
}

function _forEach( obj, fn ) {
    for( var key in obj ) {
        if( !Object.prototype.hasOwnProperty.call( obj, key ) ) continue;

        var res = fn.call( obj[ key ], obj[ key ], key );

        if( res === false ) break;
    }
}

function _isArray( obj ) {
    return Object.prototype.toString.call( obj ) === '[object Array]';
}

function _isBoolean( obj ) {
    return Object.prototype.toString.call( obj ) === '[object Boolean]';
}

function _isObject( obj ) {
    return Object.prototype.toString.call( obj ) === '[object Object]';
}
module.exports = {
    addClass: _addClass,
    removeClass: _removeClass,
    extend: _extend,
    forEach: _forEach,
    isArray: _isArray,
    isBoolean: _isBoolean,
    isObject: _isObject,
    guid: _guid,
    cantUseFormData: _cantUseFormData
};

function _addClass( el, className ) {
    var classAttr = el.getAttribute( 'class' ) || '';
    var classNames = classAttr.split( ' ' );
    var searchIndex = classNames.indexOf( className );

    classNames.push( className );

    if( searchIndex === -1 ) {
        classNames = classNames.join( ' ' );
        el.setAttribute( 'class', classNames );
    }
}

function _removeClass( el, className ) {
    var classAttr = el.getAttribute( 'class' ) || '';
    var classNames = classAttr.split( ' ' );
    var searchIndex = classNames.indexOf( className );

    if( searchIndex > -1 ) {
        classNames.splice( searchIndex, 1 );

        classNames = classNames.join( ' ' );

        el.setAttribute( 'class', classNames );
    }
}

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
    var keys = Object.keys( obj );
    var len = 'length' in obj ? obj.length : keys.length;

    for( var i = 0; i < len; i++ ) {
        var key = keys[ i ];
        var val = obj[ key ];
        var res = fn.call( val, val, key );

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

function _guid() {
    function s4() {
        return Math.floor( (1 + Math.random()) * 0x10000 )
            .toString( 16 )
            .substring( 1 );
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function _cantUseFormData() {
    return window.FormData === undefined;
}
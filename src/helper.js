var feedbackList = [];

module.exports = {
    hasClass: _hasClass,
    addClass: _addClass,
    removeClass: _removeClass,
    extend: _extend,
    forEach: _forEach,
    isString: _isString,
    isArray: _isArray,
    isBoolean: _isBoolean,
    isObject: _isObject,
    isValidationStep: _isValidationStep,
    isFunction: _isFunction,
    getValidationStepIndex: _getValidationStepIndex,
    guid: _guid,
    getEmptyObj: _getEmptyObj,
    makeSerializationURL: _makeSerializationURL,
    cantUseFormData: _cantUseFormData,
    hostnameFromStr: _hostnameFromStr,
    canUseProgressEvent: function() { return canUseProgressEvent },
    addFeedback2List: function( obj ) {
        feedbackList.push( obj );
    },
    getFeedbackList: function() {
        return feedbackList;
    },
    isUnitTestingNow: function() {
        return Boolean( window.jasmine && window.jasmine.isUnitTestingNow );
    }
};

var canUseProgressEvent = (function() {
    var xhr = new XMLHttpRequest();

    return 'upload' in xhr && 'onprogress' in xhr.upload;
})();

function _hasClass( el, className ) {
    var classAttr = el.getAttribute( 'class' ) || '';
    var classNames = classAttr.split( ' ' );

    return classNames.indexOf( className ) !== -1;
}

function _addClass( el, className ) {
    var classAttr = el.getAttribute( 'class' ) || '';
    var classNames = classAttr.split( ' ' );
    var searchIndex = classNames.indexOf( className );

    classNames.push( className );

    if( searchIndex === -1 ) {
        classNames = classNames.join( ' ' );
        el.setAttribute( 'class', classNames.trim() );
    }
}

function _removeClass( el, className ) {
    var classAttr = el.getAttribute( 'class' ) || '';
    var classNames = classAttr.split( ' ' );
    var searchIndex = classNames.indexOf( className );

    if( searchIndex > -1 ) {
        classNames.splice( searchIndex, 1 );

        classNames = classNames.join( ' ' );

        el.setAttribute( 'class', classNames.trim() );
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

function _isString( obj ) {
    return typeof obj === 'string' || obj instanceof String;
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

function _isFunction( obj ) {
    return Object.prototype.toString.call( obj ) === '[object Function]';
}

function _isValidationStep( str ) {
    var regex = /^step\-[0-9]+$/gm;

    return regex.test( str );
}

function _getValidationStepIndex( str ) {
    return +str.replace('step-', '');
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

function _getEmptyObj() {
    return Object.create( null );
}

function _makeSerializationURL( obj ) {
    var regex = /\?/g;
    var hasVariables = regex.test( obj.url );
    var delimiter = hasVariables === true ? '&' : '?';

    if( obj.serializedString === '' ) {
        delimiter = '';
    }

    return obj.url + delimiter + obj.serializedString;
}

function _hostnameFromStr(url) {
    var hostname;

    if ( url.indexOf( '//' ) > -1 ) {
        hostname = url.split( '/' )[ 2 ];
    }
    else {
        hostname = url.split( '/' )[ 0 ];
    }

    hostname = hostname.split( ':' )[ 0 ];
    hostname = hostname.split( '?' )[ 0 ];

    return hostname;
}
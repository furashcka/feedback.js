/*!
 * license: MIT
 * https://furashcka.github.io/feedback.js/docs/
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Feedback"] = factory();
	else
		root["Feedback"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = {
    addClass: _addClass,
    removeClass: _removeClass,
    extend: _extend,
    forEach: _forEach,
    isArray: _isArray,
    isBoolean: _isBoolean,
    isObject: _isObject,
    guid: _guid,
    getEmptyObj: _getEmptyObj,
    cantUseFormData: _cantUseFormData,
    canUseProgressEvent: function() { return canUseProgressEvent },
};

var canUseProgressEvent = (function() {
    var xhr = new XMLHttpRequest();

    return 'upload' in xhr && 'onprogress' in xhr.upload;
})();

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

function _getEmptyObj() {
    return Object.create( null );
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = function( self ) {
    if( !self.options.resetFormAfterAjax ) return;
    self.form.reset();
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {
    firstArgumentMustBeFormElement: function( el ) {
        if( !el || !el.nodeName || el.nodeName !== 'FORM' ) {
            throw 'First argument must be a form element!';
        }
    },
    incorrectSubmitButtonName: function( el ) {
        var hasElementWithSubmitName = el.querySelector( '[name="submit"]' );

        if( hasElementWithSubmitName ) {
            throw 'Element with attribute name = submit not allowed';
        }
    },
    checkDependencies: function() {
        if( !window.validator ) {
            throw 'Please include validator.js. You can download from https://github.com/chriso/validator.js';
        }
    },
    showWarningWhenFormHasInputWithFileTypeAndNeedAjaxPolyfill: function() {
        _warn('You can\'t use XMLHttpRequest 2.0 because browser not support it. Used polyfill ajax iframe.');
    },
    showWarningWhenIgnoringInputWithFileType: function() {
        _warn( 'Ignoring inputs with file type, because used XMLHttpRequest 1.0' );
    }
};

function _warn( text ) {
    if( console.warn ) {
        console.warn( text );
    }
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var helper = __webpack_require__( 0 );
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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var helper = __webpack_require__( 0 );
var handlersByType = {
    text: _text,
    hidden: _text,
    password: _text,
    search: _text,
    email: _text,
    url: _text,
    tel: _text,
    date: _text,
    time: _text,
    number: _text,
    range: _text,
    color: _text,
    'datetime-local': _text,
    month: _text,
    week: _text,
    datetime: _text,
    textarea: _text,
    radio: _radioAndCheckbox,
    checkbox: _radioAndCheckbox,
    'select-one': _text,
    'select-multiple': _selectMultiple
};

module.exports = function( self ) {
    var result = [];

    helper.forEach( self.inputsGroupedByName, function( group, name ) {
        helper.forEach( group, function( inputEl ) {
            inputEl.type in handlersByType &&
            !inputEl.disabled &&
            handlersByType[ inputEl.type ]( inputEl, result );
        });
    });

    return result.join( '&' );
};

function _text( inputEl, result ) {
    _push( inputEl, result );
}

function _radioAndCheckbox( inputEl, result ) {
    if( !inputEl.checked ) return;
    _push( inputEl, result );
}

function _selectMultiple( inputEl, result ) {
    helper.forEach( inputEl.options, function( optionEl ) {
        optionEl.selected && _push( optionEl, result, inputEl.name, optionEl.value );
    });
}

function _push( inputEl, result, hardSetName, hardSetValue ) {
    var name = encodeURIComponent( hardSetName || inputEl.name );
    var value = encodeURIComponent( hardSetValue || inputEl.value ).replace( /%20/g, '+' );

    result.push( name + '=' + value );
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var logger = __webpack_require__( 2 );
var getInputsGroupedByName = __webpack_require__( 3 );
var helper = __webpack_require__( 0 );

module.exports = function( form, options ) {
    logger.checkDependencies();
    logger.firstArgumentMustBeFormElement( form );
    logger.incorrectSubmitButtonName( form );

    var self = this;

    self.form = form;
    self.iframe = null; //for polifill ajax
    self.inputsGroupedByName = {};
    self.submitFn = null;
    self.options = {
        focusIncorrectInput: true,
        fireSchemaByTurn: true,
        fireValidateAndAjaxWhenSubmit: true,
        resetFormAfterAjax: true,
        schema: {},
        ajax: {
            loadingClass: '--loading',
            url: form.getAttribute( 'action' ) || location.href,
            method: form.getAttribute( 'method' ) || 'POST',
            iframePolyfill: 'auto',
            before: function() {},
            after: function() {},
            success: function() {},
            error: function() {},
            progress: function() {}
        },
        validate: {
            before: function() {},
            after: function() {},
            success: function() {},
            error: function() {}
        }
    };
    self.options = helper.extend( true, self.options, options || {} );

    _updateFormAttributes( self.form, self.options.ajax.url, self.options.ajax.method );
    self.update();

    if( self.options.fireValidateAndAjaxWhenSubmit === true ) {
        self.submitFn = function( e ) {
            e.preventDefault();

            if( self.validate() === true ) {
                self.ajax();
            }
        };

        self.form.addEventListener( 'submit', self.submitFn );
    }
};

module.exports.prototype.schema = function( schema ) {
    this.options.schema = schema;

    return this;
};

module.exports.prototype.validate = function( validate ) {
    if( typeof validate === 'undefined' || helper.isArray( validate ) ) {
        return __webpack_require__( 6 ).call( this, validate );
    }

    this.options.validate = helper.extend( this.options.validate, validate || {} );

    return this;
};

module.exports.prototype.ajax = function( ajax ) {
    if( typeof ajax === 'undefined' ) {
        return __webpack_require__( 7 ).call( this );
    }

    this.options.ajax = helper.extend( this.options.ajax, ajax || {} );

    _updateFormAttributes( this.form, this.options.ajax.url, this.options.ajax.method );

    return this;
};

module.exports.prototype.update = function() {
    var addValidateApi = __webpack_require__( 10 );

    this.inputsGroupedByName = getInputsGroupedByName( this.form );
    this.inputsGroupedByName = addValidateApi( this.inputsGroupedByName );

    return this;
};

module.exports.prototype.fireValidateError = function( message, element ) {
    this.options.validate.error.call( element || helper.getEmptyObj(), message );

    return this;
};

module.exports.prototype.resetForm = function() {
    __webpack_require__( 1 )( this );

    return this;
};

module.exports.prototype.destroy = function( variableNameFromScope ) {
    this.form.removeEventListener( 'submit', this.submitFn );

    return null;
};

/*
    API destroy call example
    var feedback = new Feedback( form );
    feedback = feedback.destroy();
*/

function _updateFormAttributes( form, action, method ) {
    form.setAttribute( 'action', action );
    form.setAttribute( 'method', method );
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var helper = __webpack_require__( 0 );

module.exports = function( validateOnlySchemaItems ) {
    var self = this;
    var schema = _resolveSchema( self, self.options.schema, validateOnlySchemaItems );
    var firstInvalidInput = null;

    self.options.validate.before.call( helper.getEmptyObj() );

    helper.forEach( schema, function( item, key ) {
        if( !( key in self.inputsGroupedByName ) ) return;

        var inputsGroup = self.inputsGroupedByName[ key ];
        var inputsArr = _inputsGroup2Array( inputsGroup );
        var errorMessage = item.call( inputsGroup );

        if( typeof errorMessage !== 'undefined' ) {
            if( firstInvalidInput === null ) {
                firstInvalidInput = inputsGroup.get();
            }

            self.options.validate.error.call( helper.getEmptyObj(), errorMessage, inputsArr );

            return !self.options.fireSchemaByTurn;
        }
    });

    if( firstInvalidInput !== null && self.options.focusIncorrectInput === true ) {
        firstInvalidInput.focus();
    }

    if( firstInvalidInput === null ) {
        self.options.validate.success.call( helper.getEmptyObj() );
    }

    self.options.validate.after.call( helper.getEmptyObj() );

    return firstInvalidInput === null;
};

function _resolveSchema( self, schema, validateOnlySchemaItems ) {
    if( helper.isArray( validateOnlySchemaItems ) ) {
        schema = {};

        helper.forEach( validateOnlySchemaItems, function( key ) {
            schema[ key ] = self.options.schema[ key ];
        });
    }

    return schema;
};

function _inputsGroup2Array( inputsGroup ) {
    var arr = [];

    helper.forEach( inputsGroup, function( input ) {
        arr.push( input );
    });

    return arr;
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var logger = __webpack_require__( 2 );
var helper = __webpack_require__( 0 );
var ajaxFnList = {
    iframe: __webpack_require__( 8 ),
    XMLHttpRequest: __webpack_require__( 9 )
};

module.exports = function() {
    var self = this;
    var ajaxFn = _detectAjaxFn( self );

    ajaxFnList[ ajaxFn ]( self );
};

function _detectAjaxFn( self ) {
    var hasFileType = _formHasInputWithFileType( self );
    var isAutoUsePolyfill = ( hasFileType && self.options.ajax.iframePolyfill === 'auto' ) && helper.cantUseFormData();

    if( self.options.ajax.iframePolyfill === true || isAutoUsePolyfill ) {
        isAutoUsePolyfill && logger.showWarningWhenFormHasInputWithFileTypeAndNeedAjaxPolyfill();
        return 'iframe';
    }
    if( helper.cantUseFormData() && hasFileType ) {
        logger.showWarningWhenIgnoringInputWithFileType();
    }

    return 'XMLHttpRequest';
}

function _formHasInputWithFileType( self ) {
    try {
        helper.forEach( self.inputsGroupedByName, function( group ) {
            helper.forEach( group, function( input ) {
                if( String( input.type ).toLowerCase() === 'file' ) throw 'found!';
            });
        });
    }
    catch( e ) {
        return true;
    }

    return false;
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var helper = __webpack_require__( 0 );
var resetForm = __webpack_require__( 1 );

module.exports = function( self ) {
    if( self.iframe === null ) {
        self.iframe = _createIframe( self );

        helper.addClass( self.form, self.options.ajax.loadingClass );
        self.options.ajax.before();

        self.iframe.onload = function() {
            var innerDoc = this.contentDocument || this.contentWindow.document;

            self.options.ajax.success({
                type: 'ajax.iframe',
                xhr: {
                    responseText: String( innerDoc.body && innerDoc.body.innerHTML )
                }
            });

            self.options.ajax.progress.call( self.form, 100 );
            helper.removeClass( self.form, self.options.ajax.loadingClass );
            self.options.ajax.after();
            _fakeProgressEventForOldBrowser( self );
            resetForm( self );
        };
    }

    self.form.submit();
};

function _createIframe( self ) {
    var iframeName = 'feedback-polyfill-ajax-iframe-' + helper.guid();
    var iframe = document.createElement( 'iframe' );

    iframe.name = iframeName;
    iframe.style.display = 'none';

    self.form.setAttribute( 'enctype', 'multipart/form-data' );
    self.form.setAttribute( 'method', self.options.ajax.method );
    self.form.setAttribute( 'target', iframeName );

    document.body.appendChild( iframe );

    return iframe;
}

function _fakeProgressEventForOldBrowser( self ) {
    !helper.canUseProgressEvent() && self.options.ajax.progress.call( self.form, 100 );
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var helper = __webpack_require__( 0 );
var resetForm = __webpack_require__( 1 );
var serialize = __webpack_require__( 4 );

module.exports = function( self ) {
    var method = self.options.ajax.method.toUpperCase();
    var url = self.options.ajax.url;
    var data = null;
    var version = '1.0';
    var setRequestHeader = false;
    var xhr = new XMLHttpRequest();

    if( method === 'GET' ) {
        url = _makeSerializationURL( self );
    }
    else {
        if( helper.cantUseFormData() ) {
            setRequestHeader = true;
            data = serialize( self );
        }
        else {
            version = '2.0';
            data = new FormData( self.form );
        }
    }

    helper.addClass( self.form, self.options.ajax.loadingClass );
    self.options.ajax.before();

    _onprogress( self, xhr );

    xhr.onreadystatechange = function() {
        if( xhr.readyState !== 4 ) return;

        if( xhr.status === 200 ) {
            self.options.ajax.success({
                type: 'ajax.' + version,
                xhr: xhr
            });
        }
        else {
            self.options.ajax.error({
                type: 'ajax.' + version,
                xhr: xhr
            });
        }

        helper.removeClass( self.form, self.options.ajax.loadingClass );
        self.options.ajax.after();
        _fakeProgressEventForOldBrowser( self );
        resetForm( self );
    };

    xhr.open( method, url );
    setRequestHeader && xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
    xhr.send( data );
};

function _makeSerializationURL( self ) {
    var regex = /\?/g;
    var hasVariables = regex.test( self.options.ajax.url );
    var delimiter = hasVariables === true ? '&' : '?';
    var data = serialize( self );

    if( data === '' ) {
        delimiter = '';
    }

    return self.options.ajax.url + delimiter + data;
}

function _onprogress( self, xhr ) {
    if( !helper.canUseProgressEvent() ) return;

    xhr.upload.onprogress = function( e ) {
        var percent = Math.round( e.loaded / e.total * 100 );

        self.options.ajax.progress.call( self.form, percent );
    };
}

function _fakeProgressEventForOldBrowser( self ) {
    !helper.canUseProgressEvent() && self.options.ajax.progress.call( self.form, 100 );
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var helper = __webpack_require__( 0 );
var createValidateObject = __webpack_require__( 11 );

module.exports = function( inputsGroupedByName ) {
    helper.forEach( inputsGroupedByName, function( inputsGroup, key ) {
        inputsGroupedByName[ key ] = createValidateObject( inputsGroup );
    });

    return inputsGroupedByName;
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var helper = __webpack_require__( 0 );
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

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function() {
    this.lastAddedElement = null;
    this.$form = $( '<form />', {
        method: 'post',
        action: 'https://httpbin.org/post',
        css: {
            position: 'fixed',
            top: -999999,
            left: -999999
        }
    });
};

module.exports.prototype.addInput = function( attr ) {
    var self = this;
    var $el = $( '<input />', attr );

    this.$form.append( $el );

    return {
        addInput: function( attr ) {
            self.addInput( attr );
        }
    };
}

module.exports.prototype.addSelect = function( attr ) {
    var $el = $( '<select />', attr );
    var obj = {
        addOption: function( attr ) {
            _addOption( $el, attr );
            return obj;
        }
    };

    this.$form.append( $el );

    return obj;
};

module.exports.prototype.getFormEl = function() {
    return this.$form.get( 0 );
};

module.exports.prototype.getInputEl = function( name ) {
    return this.$form.find( '[name="' + name + '"]' ).get( 0 );
};

module.exports.prototype.log = function() {
    console.log( this.getFormEl() );
};

module.exports.prototype.clear = function() {
    this.$form.html( '' );
};

module.exports.prototype.getUrl = function() {
    return this.$form.attr( 'action' );
};

module.exports.prototype.addToDocument = function() {
    $( 'body' ).append( this.$form );
};

function _addOption( $parent, attr ) {
    var $el = $( '<option />', attr );
    $parent.append( $el );
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

describe("Feedback.js initialization and test API", function() {
    __webpack_require__( 14 )();
});

describe("serialize.js", function() {
    __webpack_require__( 15 )();
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var Form = __webpack_require__( 12 );
var Feedback = __webpack_require__( 5 );

module.exports = function() {
    var feedback = null;
    var test = {};
    var form = new Form();

    form.addToDocument(); // if don't do this we get warning, need for options testing

    _init();
    _reinitFeedback();

    it( 'error test: new Feedback() dependencies not included', function() {
        var validator = window.validator;
        delete window.validator;

        expect(function() { new Feedback() }).toThrow();

        window.validator = validator;
    });

    it( 'error test: new Feedback() first argument must be a form element', function() {
        expect(function() { new Feedback() }).toThrow();
    });

    it( 'error test: new Feedback() element with attribute name = submit not allowed', function() {
        _reinitFeedback();
        _addInputs(function() {
            form.addInput({
                name: 'submit',
                type: 'submit'
            });
        });
        _addInputs(); //remove input written above

        expect(function() { new Feedback() }).toThrow();
    });

    it( 'new Feedback() must return object', function() {
        var obj = jasmine.any( Object );

        expect( feedback ).toEqual( obj );
    });

    it( 'must have API "ajax, schema, update, validate, resetForm, fireValidateError, destroy"', function() {
        var fn = jasmine.any( Function );

        expect( feedback.ajax ).toEqual( fn );
        expect( feedback.schema ).toEqual( fn );
        expect( feedback.update ).toEqual( fn );
        expect( feedback.validate ).toEqual( fn );
        expect( feedback.resetForm ).toEqual( fn );
        expect( feedback.fireValidateError ).toEqual( fn );
        expect( feedback.destroy ).toEqual( fn );
    });

    it( 'test API "update"', function() {
        var obj = jasmine.any( Object );

        _reinitFeedback();
        _addInputs();

        feedback.update();
        expect( feedback.inputsGroupedByName.age ).toEqual( obj );
    });

    it( 'test API "schema"', function() {
        var fn = jasmine.any( Function );

        _reinitFeedback();
        _addInputs();

        feedback.update();
        feedback.schema({
            age: function() {}
        });

        expect( feedback.options.schema.age ).toEqual( fn );
    });

    it( 'test API "resetForm"', function() {
        _reinitFeedback();
        _addInputs();

        form.getInputEl( 'age' ).value = 24;
        feedback.resetForm();

        expect( form.getInputEl( 'age' ).value ).toBe( '' );
    });

    it( 'test API "fireValidateError"', function() {
        var errorFn = jasmine.createSpy( 'success' );

        _reinitFeedback({
            validate: {
                error: errorFn
            }
        });
        feedback.fireValidateError( 'error' );

        expect( errorFn ).toHaveBeenCalled();
    });

    it( 'test API "destroy"', function() {
        _reinitFeedback();
        _addInputs();

        feedback = feedback.destroy();

        expect( feedback ).toBe( null );
    });

    describe( 'test API "validate"', function() {
        it( 'setting and calling with and without filter by schema name', function() {
            var callback = {
                before: jasmine.createSpy( 'success' ),
                after: jasmine.createSpy( 'success' ),
                success: jasmine.createSpy( 'success' ),
                error: jasmine.createSpy( 'success' )
            };

            _reinitFeedback();
            _addInputs();

            feedback.update();
            feedback.schema({
                age: function() {
                    if( this.isEmpty() ) return 'Error';
                },
                phone: function() {
                    if( this.get().value !== '7777-7777' ) return 'Error';
                }
            });

            feedback.validate({
                before: function() {
                    callback.before();
                },
                after: function() {
                    callback.after();
                },
                success: function() {
                    callback.success();
                },
                error: function() {
                    callback.error();
                }
            });

            expect( feedback.validate() ).toEqual( false );
            expect( feedback.validate([ 'phone' ]) ).toEqual( true );
            expect( callback.before ).toHaveBeenCalled();
            expect( callback.after ).toHaveBeenCalled();
            expect( callback.success ).toHaveBeenCalled();
            expect( callback.error ).toHaveBeenCalled();
        });
    });

    describe( 'test API "ajax"', function() {
        beforeEach(function() { jasmine.Ajax.install() });
        afterEach(function() { jasmine.Ajax.uninstall() });

        it( 'setting and calling', function() {
            var callback = {
                before: jasmine.createSpy( 'success' ),
                after: jasmine.createSpy( 'success' ),
                success: jasmine.createSpy( 'success' ),
                error: jasmine.createSpy( 'success' )
            };

            _reinitFeedback();
            form.clear();

            feedback.update();
            feedback.ajax({
                url: location.href,
                method: 'GET',
                before: function() {
                    callback.before();
                },
                after: function() {
                    callback.after();
                },
                success: function() {
                    callback.success();
                },
                error: function() {
                    callback.error();
                }
            });

            feedback.ajax();
            jasmine.Ajax.requests.mostRecent().respondWith({
                'status': 200
            });

            feedback.ajax();
            jasmine.Ajax.requests.mostRecent().respondWith({
                'status': 404
            });

            expect( callback.before ).toHaveBeenCalled();
            expect( callback.after ).toHaveBeenCalled();
            expect( callback.success ).toHaveBeenCalled();
            expect( callback.error ).toHaveBeenCalled();
            expect( jasmine.Ajax.requests.mostRecent().url ).toBe( location.href );
            expect( jasmine.Ajax.requests.mostRecent().method ).toBe( 'GET' );
        });

        it( 'test adding and removing loadingClass', function() {
            _reinitFeedback();
            form.clear();

            feedback.update();
            feedback.ajax();

            expect( form.getFormEl().className.trim() ).toBe( '--loading' );

            jasmine.Ajax.requests.mostRecent().respondWith({
                'status': 200
            });

            expect( form.getFormEl().className.trim() ).toBe( '' );
        });

        it( 'test onprogress event', function() {
            var success = jasmine.createSpy( 'success' );

            _reinitFeedback();
            form.clear();

            feedback.update();
            feedback.ajax({
                progress: function() {
                    success();
                }
            });
            feedback.ajax();
            jasmine.Ajax.requests.mostRecent().respondWith({
                'status': 200
            });

            jasmine.Ajax.requests.mostRecent().upload.onprogress({
                loaded: 100,
                total: 100
            });

            expect( success ).toHaveBeenCalled();
        });

        it( 'test onprogress event for iframePolyfill', function() {
            var success = jasmine.createSpy( 'success' );

            _reinitFeedback();
            form.clear();

            feedback.update();
            feedback.ajax({
                iframePolyfill: true,
                progress: function() {
                    success();
                }
            });
            feedback.ajax();
            feedback.iframe.onload();

            expect( success ).toHaveBeenCalled();
        });
    });

    describe( 'test options', function() {
        beforeEach(function() { jasmine.Ajax.install() });
        afterEach(function() { jasmine.Ajax.uninstall() });

        it( 'iframePolyfill = auto', function() {
            test.iframePolyfill({
                ajax: {
                    iframePolyfill: 'auto'
                }
            });
        });

        it( 'iframePolyfill = auto; with input, type attribute equals file', function() {
            test.iframePolyfill({
                ajax: {
                    iframePolyfill: 'auto'
                }
            }, _addAvatarInput );
        });

        it( 'iframePolyfill = true', function() {
            test.iframePolyfill({
                ajax: {
                    iframePolyfill: true
                }
            });
        });

        it( 'iframePolyfill = false', function() {
            test.iframePolyfill({
                ajax: {
                    iframePolyfill: false
                }
            });
        });

        it( 'iframePolyfill = false; with input, type attribute equals file', function() {
            test.iframePolyfill({
                ajax: {
                    iframePolyfill: false
                }
            }, _addAvatarInput );
        });

        it( 'focusIncorrectInput = true', function() {
            test.focusIncorrectInput({
                toggle: 'on'
            });
        });

        it( 'focusIncorrectInput = false', function() {
            test.focusIncorrectInput({
                toggle: 'off'
            });
        });

        it( 'fireSchemaByTurn = true', function() {
            test.fireSchemaByTurn({
                toggle: 'on'
            });
        });

        it( 'fireSchemaByTurn = false', function() {
            test.fireSchemaByTurn({
                toggle: 'off'
            });
        });

        it( 'fireValidateAndAjaxWhenSubmit = true', function() {
            test.fireValidateAndAjaxWhenSubmit({
                toggle: 'on'
            });
        });

        it( 'fireValidateAndAjaxWhenSubmit = false', function() {
            test.fireValidateAndAjaxWhenSubmit({
                toggle: 'off'
            });
        });

        it( 'resetFormAfterAjax = true', function() {
            test.resetFormAfterAjax({
                toggle: 'on'
            });
        });

        it( 'resetFormAfterAjax = false', function() {
            test.resetFormAfterAjax({
                toggle: 'off'
            });
        });
    });

    function _init() {
        test.iframePolyfill = function( options, addInputsCallback ) {
            var url = './fake-url/'; //for prevent error: ...cross-origin frame.
            var ajaxType = null;
            var cantUseFormData = window.FormData === undefined;
            var hasFile = null;

            _addInputs( addInputsCallback );
            _reinitFeedback( options );

            hasFile = _formHasInputWithFileType( form.getFormEl() );

            feedback.ajax({
                url: url,
                method: 'POST',
                success: function( e ) {
                    ajaxType = e.type;
                }
            });
            feedback.ajax();

            if( jasmine.Ajax.requests.mostRecent() ) {
                jasmine.Ajax.requests.mostRecent().respondWith({
                    'status': 200
                });
            }
            else {
                feedback.iframe.onload();
            }

            if( options.ajax.iframePolyfill === 'auto' ) {
                if( !cantUseFormData ) {
                    expect( ajaxType ).toBe( 'ajax.2.0' );
                }
                else {
                    if( hasFile ) {
                        expect( ajaxType ).toBe( 'ajax.iframe' );
                    }
                    else {
                        expect( ajaxType ).toBe( 'ajax.1.0' );
                    }
                }
            }
            else if( options.ajax.iframePolyfill === true ) {
                expect( ajaxType ).toBe( 'ajax.iframe' );
            }
            else {
                expect([ 'ajax.1.0', 'ajax.2.0' ]).toContain( ajaxType );
            }
        };

        test.focusIncorrectInput = function( options ) {
            var inputEl = null;
            var bool = options.toggle === 'on';

            _addInputs();
            _reinitFeedback({
                focusIncorrectInput: bool
            });

            inputEl = form.getInputEl( 'age' );
            spyOn( inputEl, 'focus' );

            feedback.schema({
                age: function() { return 'Error'; }
            });
            feedback.validate();

            if( bool ) {
                expect( inputEl.focus ).toHaveBeenCalled();
            }
            else {
                expect( inputEl.focus ).not.toHaveBeenCalled();
            }
        };

        test.fireSchemaByTurn = function( options ) {
            var count = 0;
            var bool = options.toggle === 'on';

            _addInputs();
            _reinitFeedback({
                fireSchemaByTurn: bool
            });

            feedback.schema({
                age: function() { return 'Error'; },
                phone: function() { return 'Error'; }
            });
            feedback.validate({
                error: function() { count++; }
            });
            feedback.validate();

            expect( count ).toEqual( bool ? 1 : 2 );
        };

        test.fireValidateAndAjaxWhenSubmit = function( options ) {
            var bool = options.toggle === 'on';
            var callback = {
                validate: jasmine.createSpy( 'success' ),
                ajax: jasmine.createSpy( 'success' )
            };

            _addInputs();
            _reinitFeedback({
                fireValidateAndAjaxWhenSubmit: bool
            });

            feedback.validate({
                before: function() {
                    callback.validate();
                }
            });
            feedback.ajax({
                before: function() {
                    callback.ajax();
                }
            });

            form.getInputEl( 'submit-name' ).click();

            if( bool ) {
                expect( callback.validate ).toHaveBeenCalled();
                expect( callback.ajax ).toHaveBeenCalled();
            }
            else {
                expect( callback.validate ).not.toHaveBeenCalled();
                expect( callback.ajax ).not.toHaveBeenCalled();
            }
        };

        test.resetFormAfterAjax = function( options ) {
            var bool = options.toggle === 'on';

            spyOn( form.getFormEl(), 'reset' );

            _addInputs();
            _reinitFeedback({
                resetFormAfterAjax: bool
            });

            feedback.ajax();
            jasmine.Ajax.requests.mostRecent().respondWith({
                'status': 200
            });

            if( bool ) {
                expect( form.getFormEl().reset ).toHaveBeenCalled();
            }
            else {
                expect( form.getFormEl().reset ).not.toHaveBeenCalled();
            }
        };
    }

    function _reinitFeedback( options ) {
        feedback = feedback && feedback.destroy();
        feedback = new Feedback( form.getFormEl(), options || {} );
    }

    function _formHasInputWithFileType( form ) {
        return form.querySelectorAll( 'input[type="file"]' ).length > 0;
    }

    function _addInputs( addInputsCallback ) {
        form.clear();
        form.addInput({
            name: 'age',
            type: 'number'
        });

        form.addInput({
            name: 'phone',
            type: 'tel',
            value: '7777-7777'
        });

        form.addInput({
            name: 'submit-name',
            type: 'submit'
        });

        addInputsCallback && addInputsCallback();
    }

    function _addAvatarInput() {
        form.addInput({
            name: 'avatar',
            type: 'file'
        });
    }
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var Form = __webpack_require__( 12 );
var getInputsGroupedByName = __webpack_require__( 3 );
var serialize = __webpack_require__( 4 );

module.exports = function() {
    _test(function( form ) {
        form.addInput({
            type: 'text',
            name: 'name',
            value: 'Evgeny Krylov'
        });
    })
    .run({
        desc: 'input type text',
        toBe: 'name=Evgeny+Krylov'
    });

    _test(function( form ) {
        form.addInput({
            type: 'text',
            name: 'name',
            value: 'Evgeny Krylov',
            disabled: true
        });
    })
    .run({
        desc: 'disabled input type text',
        toBe: ''
    });

    _test(function( form ) {
        form
            .addInput({
                type: 'radio',
                name: 'sex',
                value: 'female'
            })
            .addInput({
                type: 'radio',
                name: 'sex',
                value: 'male'
            });
    })
    .run({
        desc: 'not checked input type radio',
        toBe: ''
    });

    _test(function( form ) {
        form
            .addInput({
                type: 'radio',
                name: 'sex',
                value: 'female',
                checked: true
            })
            .addInput({
                type: 'radio',
                name: 'sex',
                value: 'male'
            });
    })
    .run({
        desc: 'checked input type radio',
        toBe: 'sex=female'
    });

    _test(function( form ) {
        form
            .addInput({
                type: 'radio',
                name: 'sex',
                value: 'female',
                checked: true,
                disabled: true
            })
            .addInput({
                type: 'radio',
                name: 'sex',
                value: 'male',
                checked: true,
                disabled: true
            });
    })
    .run({
        desc: 'checked disabled input type radio',
        toBe: ''
    });

    _test(function( form ) {
        form
            .addInput({
                type: 'checkbox',
                name: 'country[]',
                value: 'United Kingdom',
                checked: true
            })
            .addInput({
                type: 'checkbox',
                name: 'country[]',
                value: 'Germany',
                checked: true
            });
    })
    .run({
        desc: 'checked 2 inputs type checkbox, must be array',
        toBe: 'country%5B%5D=United+Kingdom&country%5B%5D=Germany'
    });

    _test(function( form ) {
        form.addSelect({
            name: 'language'
        })
            .addOption({
                text: 'php',
                value: 'php'
            })
            .addOption({
                text: 'javascript',
                value: 'javascript',
                selected: true
            })
            .addOption({
                text: 'css',
                value: 'css'
            });
    })
    .run({
        desc: 'select-one test',
        toBe: 'language=javascript'
    });

    _test(function( form ) {
        form.addSelect({
            name: 'language',
            disabled: true
        })
            .addOption({
                text: 'php',
                value: 'php'
            })
            .addOption({
                text: 'javascript',
                value: 'javascript',
                selected: true
            })
            .addOption({
                text: 'css',
                value: 'css'
            });
    })
    .run({
        desc: 'disabled select-one test',
        toBe: ''
    });

    _test(function( form ) {
        form.addSelect({
            name: 'language[]',
            multiple: true
        })
            .addOption({
                text: 'php',
                value: 'php',
                selected: true
            })
            .addOption({
                text: 'javascript',
                value: 'javascript',
                selected: true
            })
            .addOption({
                text: 'css',
                value: 'css'
            });
    })
    .run({
        desc: 'select-multiple test',
        toBe: 'language%5B%5D=php&language%5B%5D=javascript'
    });
};

function _test( fn ) {
    var form = new Form();

    fn( form );

    var res = serialize({
        inputsGroupedByName: getInputsGroupedByName( form.getFormEl() )
    });

    return {
        run: function( obj ) {
            it( obj.desc, function() {
                expect( res ).toBe( obj.toBe );
            });
        }
    };
}

/***/ })
/******/ ]);
});
var serialize = require( './serialize.js' );

module.exports = function( self ) {
    var res = serialize( self );

    require( './ajax.IframePolyfill.js' )( self );
};
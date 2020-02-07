var forEach = require( 'helper.forEach' );
var nativeXDomainRequest = window.XDomainRequest;
var instance = null;
var fakeXDomainRequest = function() {
    instance = this;
};

fakeXDomainRequest.prototype.open = function( method, url ) {
    this.requestMethod = method;
    this.requestURL = url;
    this.url = url;
};

fakeXDomainRequest.prototype.send = function( body ) {
    this.requestBody = body;
};

fakeXDomainRequest.prototype.onload = function() {};
fakeXDomainRequest.prototype.onerror = function() {};

module.exports = {
    getCurrentInstance: function() {
        return instance;
    },
    respondWith: function( obj ) {
        if( obj.status === 200 ) {
            instance && instance.onload();
        }
        else {
            instance && instance.onerror();
        }

        instance && forEach( obj, function( key, val ) {
            instance[ key ] = val;
        });
    },
    install: function() {
        window.XDomainRequest = fakeXDomainRequest;
    },
    uninstall: function() {
        instance = null;
        window.XDomainRequest = nativeXDomainRequest;
    }
};
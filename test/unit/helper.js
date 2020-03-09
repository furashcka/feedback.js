var fakeXDomainRequest = require( 'helper.fakeXDomainRequest' );
var isCantUseFormData = window.FormData === undefined;

module.exports = {
    serverURL: _getServerURL(),
    form: require( 'helper.form' ),
    forEach: require( 'helper.forEach' ),
    fakeXDomainRequest: fakeXDomainRequest,
    fakeAjax: {
        getCurrentInstance: function() {
            return fakeXDomainRequest.getCurrentInstance() || jasmine.Ajax.requests.mostRecent();
        },
        respondWith: function( obj ) {
            jasmine.Ajax.requests.mostRecent().respondWith( obj );
            fakeXDomainRequest.respondWith( obj );
        },
        install: function() {
            jasmine.Ajax.install();
            fakeXDomainRequest.install();
        },
        uninstall: function() {
            jasmine.Ajax.uninstall();
            fakeXDomainRequest.uninstall();
        },
    },
    isProgressEventSupport: function() {
        var xhr = new XMLHttpRequest();
        var test = 'upload' in xhr && 'onprogress' in xhr.upload;

        xhr = null;

        return test;
    },
    isCantUseFormData: function() {
        return isCantUseFormData;
    },
    isInternetExplorerBrowser: function() {
        var userAgent = navigator.userAgent.toLowerCase();
        return ( userAgent.indexOf( 'msie' ) != -1 ) ? parseInt( userAgent.split( 'msie' )[ 1 ] ) : false;
    },
    triggerEvent: function( el, eventName ) {
        var event;

        if( document.createEvent ){
            event = document.createEvent( 'HTMLEvents' );
            event.initEvent( eventName, true, true );
            event.eventName = eventName;
            el.dispatchEvent( event );
        } else {
            event = document.createEventObject();
            event.eventName = eventName;
            event.eventType = eventName;
            el.fireEvent( 'on' + event.eventType, event );
        }
    }
};

//_getServerURL duplicated in docs/js/examples.js
function _getServerURL() {
    var breakPoints = ['docs', 'test'];
    var oldArr = location.href.split('/');
    var newArr = [];

    for(var i = 0; i < oldArr.length; i++) {
        if(breakPoints.indexOf(oldArr[i]) !== -1) break;

        newArr.push(oldArr[i]);
    }

    newArr.push('server/');

    return newArr.join('/');
}
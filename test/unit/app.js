var helper = require( './helper' );
var Feedback = require( 'Feedback' );

//need for async test, checks in Feedback library
window.jasmine = window.jasmine || {};
window.jasmine.isUnitTestingNow = true;

helper.form.setEventListener( 'afterInit', function() {
    helper.form.add.input({
        name: 'phone',
        type: 'tel',
        value: '7777-7777'
    });

    helper.form.add.input({
        name: 'age',
        type: 'number'
    });

    helper.form.add.input({
        name: 'submit-name',
        type: 'submit'
    });
});
helper.form.init();

beforeEach(function() {
    helper.form.reinit();
});

describe( 'test initialize', function() {
    require( 'test.initialize' )();
});

describe( 'test options', function() {
    require( 'test.options' )();
});

describe( 'test API', function() {
    require( 'test.API' )();
});

describe( 'test API "ajax" - for this need more tests', function() {
    require( 'test.API.ajax' )();
});

describe( 'test API "ajax" "iframePolyfill" option - for this need more tests', function() {
    require( 'test.API.ajax.iframePolyfill' )(); // iframePolyfill option
});

describe( 'test API "ajax" "iframePolyfill", "iframeTimeout", "iframePostMessage" options together - for this need more tests', function() {
    require( 'test.API.ajax.PostMessage' )(); // (iframePolyfill, iframeTimeout, iframePostMessage, ) option
});

describe( 'test serialize', function() {
    require( 'test.serialize' )();
});
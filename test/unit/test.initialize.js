var helper = require( './helper' );
var Feedback = require( 'Feedback' );

module.exports = function() {
    it( 'error test: new Feedback() first argument must be a form element', function() {
        var tmp = console.error;
        var message = "";

        console.error = function(msg) { message = msg; };

        new Feedback();

        console.error = tmp;
        expect( message ).toEqual( 'First argument must be a form element!' );
    });

    it( 'error test: new Feedback() element with attribute name = submit not allowed', function() {
        var tmp = console.error;
        var message = "";

        console.error = function(msg) { message = msg; };

        helper.form.reinit();
        helper.form.clear();
        helper.form.add.input({
            name: 'submit',
            type: 'submit'
        });

        new Feedback( helper.form.el );

        console.error = tmp;
        expect( message ).toEqual( 'Element with attribute name = submit not allowed' );
    });

    it( 'new Feedback() must return object', function() {
        var obj = jasmine.any( Object );
        var feedback = new Feedback( helper.form.el );

        expect( feedback ).toEqual( obj );

        feedback = feedback.destroy();
    });
};
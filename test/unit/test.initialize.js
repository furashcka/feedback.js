var helper = require( './helper' );
var Feedback = require( 'Feedback' );

module.exports = function() {
    it( 'error test: new Feedback() first argument must be a form element', function() {
        expect(function() { new Feedback(); }).toThrow();
    });

    it( 'error test: new Feedback() element with attribute name = submit not allowed', function() {
        helper.form.reinit();
        helper.form.clear();
        helper.form.add.input({
            name: 'submit',
            type: 'submit'
        });

        expect(function() { new Feedback( helper.form.el ); }).toThrow();
    });

    it( 'new Feedback() must return object', function() {
        var obj = jasmine.any( Object );
        var feedback = new Feedback( helper.form.el );

        expect( feedback ).toEqual( obj );

        feedback = feedback.destroy();
    });
};
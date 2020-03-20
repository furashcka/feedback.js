var helper = require( './helper' );
var Feedback = require( 'Feedback' );

module.exports = function() {
    it( 'test "get"', function() {
        var feedback = new Feedback( helper.form.el );
        var inputVal = '';

        feedback.schema({
            phone: function() {
                inputVal = this.get().value;
            }
        });
        feedback.validate();

        expect( inputVal ).toEqual( '7777-7777' );

        feedback = feedback.destroy();
    });

    it( 'test "isAnyChecked"', function() {
        var feedback = new Feedback( helper.form.el );
        var isAnyChecked = null;

        helper.form.add.input({
            name: 'types',
            type: 'checkbox',
            value: '1'
        });

        helper.form.add.input({
            name: 'types',
            type: 'checkbox',
            value: '2'
        });

        feedback.update();
        feedback.schema({
            types: function() {
                isAnyChecked = this.isAnyChecked();
            }
        });
        feedback.validate();

        expect( isAnyChecked ).toEqual( false );

        helper.form.add.input({
            name: 'types',
            type: 'checkbox',
            checked: true,
            value: '3'
        });

        feedback.update();
        feedback.validate();

        expect( isAnyChecked ).toEqual( true );

        feedback = feedback.destroy();
    });

    it( 'test "forEach"', function() {
        var feedback = new Feedback( helper.form.el );
        var arr = [];

        helper.form.add.input({
            name: 'types',
            type: 'checkbox',
            value: '1'
        });

        helper.form.add.input({
            name: 'types',
            type: 'checkbox',
            value: '2'
        });

        feedback.update();
        feedback.schema({
            types: function() {
                this.forEach(function( input ) {
                    arr.push( input.value );
                });
            }
        });
        feedback.validate();

        expect( arr ).toEqual( ['1', '2'] );

        feedback = feedback.destroy();
    });
};
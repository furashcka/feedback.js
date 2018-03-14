module.exports = function( self ) {
    if( !self.options.resetFormAfterAjax ) return;
    self.form.reset();
};
(function () {
  var app = (window.app = window.app || {});
  var $el = {
    form: $("form").get(0),
    errorEl: $("form .error"),
  };
  var feedback = new Feedback($el.form);

  feedback.schema({
    name: function () {
      if (this.isEmpty()) return "Please, write your name.";
    },
    email: function () {
      if (!this.isEmail()) return "Email is not correct!";
    },
  });

  feedback.validate({
    error: function (msg) {
      $el.errorEl.text(msg).show();
    },
    success: function () {
      $el.errorEl.hide();
    },
  });

  feedback.ajax({
    url: app.serverURL,
    success: function (e) {
      parent.$("body").trigger("feedback.response", e);
    },
  });
})();

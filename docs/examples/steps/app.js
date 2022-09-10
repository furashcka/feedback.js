(function () {
  var $el = {
    form: $("form"),
    errorEl: $("form .error"),
    nextBtn: $("form .next"),
    stepsContainer: $("form .steps__container"),
    recaptcha: $("form #recaptcha"),
  };
  var feedback = new Feedback($el.form.get(0), {
    fireValidateAndAjaxWhenSubmit: false,
  });

  feedback.schema("step-0", {
    name: function () {
      if (this.isEmpty()) return "Please, write your name.";
    },
  });

  feedback.schema("step-1", {
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
    iframePostMessage: app.isInternetExplorerBrowser() === 9,
    success: function (e) {
      parent.$("body").trigger("feedback.response", e);
    },
  });

  $el.nextBtn.on("click", function () {
    if (feedback.validate()) {
      feedback.step("next");
    }

    var currentStep = feedback.step("get");
    var css = "transform: translate(-" + 100 * currentStep + "%, 0);";

    $el.stepsContainer.attr("style", css);
  });

  window.onRecaptchaReady = function () {
    grecaptcha.render($el.recaptcha.get(0), {
      sitekey: "6LfRuuohAAAAACHCOrjvQIWosPJQuzxCrA0AeKaU",
      callback: function () {
        feedback.ajax();
      },
    });

    setTimeout(function () {
      feedback.update();
    }, 300);
  };
})();

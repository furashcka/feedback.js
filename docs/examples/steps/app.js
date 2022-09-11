(function () {
  var $el = {
    form: $("form"),
    errorEl: $("form .error"),
    nextBtn: $("form .next"),
    stepsContainer: $("form .steps__container"),
    recaptcha: $("form #recaptcha"),
  };
  var feedback = new Feedback($el.form.get(0));

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

  feedback.schema("step-2", {
    "g-recaptcha-response": function () {
      if (this.isEmpty()) return "Please confirm you are not a robot.";
    },
  });

  feedback.step("changed", function (currentStep) {
    var css = "transform: translate(-" + 100 * currentStep + "%, 0);";

    $el.stepsContainer.attr("style", css);
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

  // alternative element.focus({ preventScroll: true });
  $el.form.find("input").on("focus", function () {
    $el.stepsContainer.parent().scrollLeft(0);
  });

  $el.nextBtn.on("click", function () {
    if (feedback.validate()) {
      feedback.step("next");
    }
  });

  window.onRecaptchaReady = function () {
    grecaptcha.render($el.recaptcha.get(0), {
      sitekey: "6LfRuuohAAAAACHCOrjvQIWosPJQuzxCrA0AeKaU",
      callback: function () {
        // you can also send form after recaptcha validate, without click submit button
        // feedback.ajax();
      },
    });

    setTimeout(function () {
      feedback.update();
    }, 300);
  };
})();

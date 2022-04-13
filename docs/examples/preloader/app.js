(function () {
  var $el = {
    form: $("form"),
    preloader: $(".preloader"),
    errorEl: $("form .error"),
  };
  var feedback = new Feedback($el.form.get(0));
  var maxSizeMB = 6;

  feedback.schema({
    avatar: function () {
      var file = this.get().files[0];
      var fileSizeMB = file && (file.size / 1024 / 1024).toFixed(2);
      var fileType = file && _getTypeOfFile(this.get().files[0]);

      if (!file) {
        return "please, select file";
      }

      if (fileType !== "png" && fileType !== "jpeg" && fileType !== "jpg") {
        return "unsupported file format";
      }

      if (fileSizeMB > maxSizeMB) {
        return "Max file size " + maxSizeMB + "Mb";
      }
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
    loadingClass: "form--loading",
    iframePostMessage: app.isInternetExplorerBrowser() === 9,
    success: function (e) {
      parent.$("body").trigger("feedback.response", e);
    },
  });

  if (app.isInternetExplorerBrowser() === 9) {
    $el.form.append('<input type="hidden" name="use_post_message" value="1">');
    feedback.update();
  }

  function _getTypeOfFile(file) {
    type = file.name.split(".");
    type = type[type.length - 1];
    type = type.toLowerCase();

    return type;
  }
})();

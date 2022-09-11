# About

feedback.js it's simple library with beautiful API for validation and sending forms.

## Why use feedback.js?

1\. You don't need thinking about browser supporting, supports ie9+\
2\. You can sending data with files, if browser not supports FormData feedback.js sends form to iframe\
3\. Very simple API\
4\. Convenient validation\
5\. Your code becomes more understandable and takes up less space\
6\. Without dependencies

# Installation

```javascript
<script src="https://cdn.jsdelivr.net/gh/furashcka/feedback.js@0.1.10/dist/feedback.min.js"></script>
```

Install via NPM

```sh
npm i @furashcka/feedback.js
```

Install via Yarn

```sh
yarn add @furashcka/feedback.js
```

# Quick start

```html
<form method="post">
  <div class="error" style="display: none;"></div>

  <input type="text" name="name" placeholder="Your name" />
  <input type="text" name="email" placeholder="Your E-mail" />

  <button>Submit</button>
</form>
```

```javascript
var feedback = new Feedback($("form").get(0));

// Validation initialization
feedback.schema({
  name: function () {
    if (this.isEmpty()) return "Please, write your name.";
  },
  email: function () {
    if (!this.isEmail()) return "Email is not correct!";
  },
});

// Error handling
feedback.validate({
  error: function (msg) {
    $("form .error").text(msg).show();
  },
  success: function () {
    $("form .error").hide();
  },
});
```

# Options and Events

default options

```javascript
var el = document.querySelector("form");
var opts = {
  focusIncorrectInput: true,
  fireSchemaByTurn: true,
  blockSubmitWhenFormSending: true,
  fireValidateAndAjaxWhenSubmit: true,
  resetFormAfterAjax: true,
  schema: {},
  validationStep: 0,
  validationStepChanged: function () {},
  ajax: {
    loadingClass: "--loading",
    url: el.action || location.href,
    method: el.method || "POST",
    iframePolyfill: "auto",
    iframePostMessage: false,
    iframeTimeout: 0,
    before: function () {},
    after: function () {},
    success: function () {},
    error: function () {},
    progress: function () {},
  },
  validate: {
    before: function () {},
    after: function () {},
    success: function () {},
    error: function () {},
  },
};

var feedback = new Feedback(el, opts);
```

## focusIncorrectInput

**true**: set focus in incorrect input\
**false**: nothing happens

Type: boolean\
Default: true

## fireSchemaByTurn

**true**: if you want to show the first error found and stop validating\
**false**: if you want to show all errors at once

Type: boolean\
Default: true

## blockSubmitWhenFormSending

**true**: the next form sending is blocked while the previous one is sending\
**false**: nothing happens, form send by default

Type: boolean\
Default: true

## fireValidateAndAjaxWhenSubmit

**true**: when form sending, checks all errors and send form by AJAX\
**false**: nothing happens, form send by default

Type: boolean\
Default: true

## resetFormAfterAjax

**true**: calls `form.reset()`; after successful send\
**false**: nothing happens

Type: boolean\
Default: true

## schema

{key: value} - object with all logics for validations inputs, key it's name attribute `<input name="email">` or other form element, value it's function, calls when fires **[validate](#validate)** API.\
Also you can use steps, when need step by step validation.\
When you set step index, you need set "step-{number}"

```javascript
var feedback = new Feedback(el, {
  schema: {
    email: function () {
      if (!this.isEmail()) return "Email is not correct!";
    },
  },
});

// with steps
var feedback = new Feedback(el, {
  schema: {
    "step-0": {
      name: function () {
        if (!this.isEmpty()) return "Please, enter your name.";
      },
    },
    "step-1": {
      email: function () {
        if (!this.isEmail()) return "Email is not correct!";
      },
    },
  },
});

// is recommended use API:
var feedback = new Feedback(el);
feedback.schema({
  email: function () {
    if (!this.isEmail()) return "Email is not correct!";
  },
});

// with steps
feedback.schema("step-0", {
  name: function () {
    if (!this.isEmpty()) return "Please, enter your name.";
  },
});

feedback.schema("step-1", {
  email: function () {
    if (!this.isEmail()) return "Email is not correct!";
  },
});
```

**Input API**
**this** - it's array of inputs grouped by name with API from [validator.js](https://github.com/chriso/validator.js) if need validate input without **this** context, call like: **Instance.inputsGroupedByName.inputName.isEmpty()**

**get** - returns input element by index; if index empty returns first element; if index -1 returns last element\
**isAnyChecked** - returns true if any input checked, and return false if any not checked\
**forEach** - method calls a function once for each element in an array inputs\
**equals** - check if the string matches the comparison\
**isAlpha** - check if the string contains only letters (a-zA-Z)\
**isAlphanumeric** - check if the string contains only letters and numbers\
**isCreditCard** - check if the string is a credit card\
**isEmail** - check if the string is an email\
**isEmpty** - check if the string has a length of zero\
**isFloat** - check if the string is a float\
**isIn** - check if the string is in a array of allowed values\
**isInt** - check if the string is an integer\
**isMobilePhone** - check if the string is a mobile phone number\
**isNumeric** - check if the string contains only numbers\
**isURL** - check if the string is an URL\
**matches** - check if string matches the pattern

read more about each can be [here](https://github.com/chriso/validator.js)

Type: Object\
Default: empty object

## validationStep

needs for step by step validation

Type: number\
Default: 0

## validationStepChanged

calls after **validationStep** changes

Type: function\
Default: empty function

## ajax

object for setting AJAX options:

```javascript
var feedback = new Feedback(el, {
  ajax: {
    url: "//httpbin.org/post",
    method: "post",
  },
});

// is recommended use API:
var feedback = new Feedback(el);
feedback.ajax({
  url: "//httpbin.org/post",
  method: "post",
});
```

Type: object\
Default: object

## ajax.loadingClass

adds class to form element when sends data

Type: string\
Default: --loading

## ajax.url

URL address to which the request is sent

Type: string\
Default: **action** attribute from form element or location.href (if empty **action** attribute)

## ajax.method

HTTP request method: GET | POST | PUT | PATCH | DELETE

Type: string\
Default: **method** attribute from form element or 'POST' (if empty **method** attribute)

## ajax.iframePolyfill

**auto**: 1) browser supports XMLHttpRequest v2.0, feedback.js sends files and strings together, 2) browser supports only XMLHttpRequest v1.0, feedback.js sends only strings, XMLHttpRequest v1.0 will be uses if form element don't have any inputs with type=file 3) need send files and strings together, but browser don't support XMLHttpRequest v2.0, feedback.js sends to iframe and show warning to console\
**true**: feedback.js sends strings and files always to iframe\
**false**: uses XMLHttpRequest v2.0 or XMLHttpRequest v1.0, if browser not support XMLHttpRequest v2.0 and form element have any inputs with type=file, feedback.js sends only strings and show warning to console

Type: string or boolean\
Default: auto

## ajax.iframePostMessage

**true**: waits until call [Window.postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) from iframe for response from server and after call ajax.success\
**false**: nothing happens

Type: boolean\
Default: false

## ajax.iframeTimeout

**1000 (or more)**: waits 1000 (or more) milliseconds for iframe.load event, if iframe.load event not called until 1000 (or more) milliseconds, calls ajax.error\
**0**: waits endlessly

Type: number\
Default: 0

## ajax.before

calls before sending by AJAX

Type: function\
Default: empty function

## ajax.after

calls after sending by AJAX

Type: function\
Default: empty function

## ajax.success

calls if the request succeeds, arguments: **type** (String) - 'ajax.2.0 or ajax.1.0 or iframe'; **xhr** (XMLHttpRequest object)

```javascript
feedback.ajax({
  success: function (type, xhr) {
    switch (type) {
      case "ajax.1.0":
        console.log("1.0", xhr);
        break;
      case "ajax.2.0":
        console.log("2.0", xhr);
        break;
      case "iframe":
        console.log("iframe", xhr);
        break;
    }
  },
});
```

Type: function\
Default: empty function

## ajax.error

calls if the request fails, arguments: **type** (String) - 'ajax.2.0 or ajax.1.0'; **xhr** (XMLHttpRequest object), not calls if uses iframe

```javascript
feedback.ajax({
  error: function (type, xhr) {
    switch (type) {
      case "ajax.1.0":
        console.log("1.0", xhr);
        break;
      case "ajax.2.0":
        console.log("2.0", xhr);
        break;
    }
  },
});
```

Type: function\
Default: empty function

## ajax.progress

calls periodically with information when an **XMLHttpRequest** before success completely, **this** in function it's form element, arguments: **percent** (Number)

```javascript
feedback.ajax({
  progress: function (percent) {
    console.log("progress - " + percent + "%");
  },
});
```

Type: function\
Default: empty function

## validate

object with validation events:

```javascript
var feedback = new Feedback(el, {
  validate: {
    error: function (err, inputsArray) {},
  },
});

// is recommended use API:
var feedback = new Feedback(el);
feedback.validate({
  error: function (err, inputsArray) {},
});
```

Type: object\
Default: object

## validate.before

calls before validating

Type: function\
Default: empty function

## validate.after

calls after validating

Type: function\
Default: empty function

## validate.success

calls, if validation successful

Type: function\
Default: empty function

## validate.error

calls, if validation has errors, arguments: **errorMessage** (String); **inputsArr** (Array) - inputs grouped by name

```javascript
feedback.validate({
  error: function (errorMessage, inputsArr) {
    var err = "<p>" + errorMessage + "</p>";
    var el = inputsArr[0];

    el.insertAdjacentHTML("beforebegin", err);
    // or with jQuery
    $(el).before(err);
  },
});
```

Type: function\
Default: empty function

# API

```javascript
// you can do:
feedback.schema(/* ... */).validate(/* ... */).ajax(/* ... */);
/* ... other API */

// or

feedback.schema(/* ... */);
feedback.validate(/* ... */);
feedback.ajax(/* ... */);
```

## schema

function for updating [options.schema](#options-and-events)

```javascript
feedback.schema({
  /* ... */
});

// with steps
feedback.schema("step-0", {
  /* ... */
});

feedback.schema("step-1", {
  /* ... */
});
```

## step

function for updating [options.validationStep](#options-and-events); and [options.validationStepChanged](#options-and-events);\
**get** return current step;\
**set**, **next**, **prev** update current step;\
**changed** init change event.

```javascript
feedback.step("get"); // return options.validationStep
feedback.step("set", 1); // options.validationStep = 1;
feedback.step("next"); // options.validationStep++;
feedback.step("prev"); // options.validationStep--;
feedback.step("changed", function () {}); // options.validationStepChanged = function () {};
```

## ajax

function for updating [options.ajax](#options-and-events) and sending\
updating:

```javascript
feedback.ajax({
  /* ... */
});
```

sending form:

```javascript
feedback.ajax();
```

sending selected inputs:

```javascript
feedback.ajax(["name", "age"]);
```

## validate

function for updating [options.validate](#options-and-events) and validating; returns boolean\
updating:

```javascript
feedback.validate({
  /* ... */
});
```

validating:

```javascript
if (feedback.validate() === true) {
  /* ... */
}
```

## update

if your form is dynamical you need call **update** when your form changed

```javascript
feedback.update();
```

## fireValidateError

call [validate.error](#validateerror) event

```javascript
var el = form.querySelector('input[name="email"]');
feedback.fireValidateError("Error: wrong email!", [el]);
```

## resetForm

reset form by default

```javascript
feedback.resetForm();
```

## destroy

remove all events and return null for clearing variable

```javascript
feedback = feedback.destroy();
console.log(feedback); // null
```

# Examples

[BASIC](https://f-cka.com/projects/feedback.js/docs/#demos)
[PRELOADER](https://f-cka.com/projects/feedback.js/docs/#demos)
[PROGRESS](https://f-cka.com/projects/feedback.js/docs/#demos)
[STEPS](https://f-cka.com/projects/feedback.js/docs/#demos)

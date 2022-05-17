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
<script src="https://cdn.jsdelivr.net/gh/furashcka/feedback.js@0.1.7/dist/feedback.min.js"></script>
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

      <button">Submit</button>
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

## fireValidateAndAjaxWhenSubmit

**true**: when form sending, checks all errors and send form by AJAX\
**false**: nothing happens, form send by default

Type: boolean\
Default: true

## resetFormAfterAjax

**true**: calls form.reset(); after successful send\
**false**: nothing happens

Type: boolean\
Default: true

## schema

{key: value} - object with all logics for validations inputs, key it's name attribute **<input name="email">** or other form element, value it's function, calls when fires **[validate](#api-validate)** API.\
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

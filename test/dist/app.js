/*!
 * license: MIT
 * feedback.js v0.1.10
 * https://f-cka.com/projects/feedback.js/docs/
 */
(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === "object" && typeof module === "object") module.exports = factory(); else if (typeof define === "function" && define.amd) define([], factory); else if (typeof exports === "object") exports["Feedback"] = factory(); else root["Feedback"] = factory();
})(typeof self !== "undefined" ? self : this, function() {
    return function(modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) {
                return installedModules[moduleId].exports;
            }
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: false,
                exports: {}
            };
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.l = true;
            return module.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.d = function(exports, name, getter) {
            if (!__webpack_require__.o(exports, name)) {
                Object.defineProperty(exports, name, {
                    configurable: false,
                    enumerable: true,
                    get: getter
                });
            }
        };
        __webpack_require__.n = function(module) {
            var getter = module && module.__esModule ? function getDefault() {
                return module["default"];
            } : function getModuleExports() {
                return module;
            };
            __webpack_require__.d(getter, "a", getter);
            return getter;
        };
        __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        __webpack_require__.p = "";
        return __webpack_require__(__webpack_require__.s = 35);
    }([ function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = assertString;
        function _typeof(obj) {
            if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                _typeof = function _typeof(obj) {
                    return typeof obj;
                };
            } else {
                _typeof = function _typeof(obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                };
            }
            return _typeof(obj);
        }
        function assertString(input) {
            var isString = typeof input === "string" || input instanceof String;
            if (!isString) {
                var invalidType;
                if (input === null) {
                    invalidType = "null";
                } else {
                    invalidType = _typeof(input);
                    if (invalidType === "object" && input.constructor && input.constructor.hasOwnProperty("name")) {
                        invalidType = input.constructor.name;
                    } else {
                        invalidType = "a ".concat(invalidType);
                    }
                }
                throw new TypeError("Expected string but received ".concat(invalidType, "."));
            }
        }
        module.exports = exports.default;
        module.exports.default = exports.default;
    }, function(module, exports) {
        var feedbackList = [];
        module.exports = {
            hasClass: _hasClass,
            addClass: _addClass,
            removeClass: _removeClass,
            extend: _extend,
            forEach: _forEach,
            isString: _isString,
            isArray: _isArray,
            isBoolean: _isBoolean,
            isObject: _isObject,
            isValidationStep: _isValidationStep,
            isFunction: _isFunction,
            getValidationStepIndex: _getValidationStepIndex,
            guid: _guid,
            getEmptyObj: _getEmptyObj,
            makeSerializationURL: _makeSerializationURL,
            cantUseFormData: _cantUseFormData,
            hostnameFromStr: _hostnameFromStr,
            canUseProgressEvent: function() {
                return canUseProgressEvent;
            },
            addFeedback2List: function(obj) {
                feedbackList.push(obj);
            },
            getFeedbackList: function() {
                return feedbackList;
            },
            isUnitTestingNow: function() {
                return Boolean(window.jasmine && window.jasmine.isUnitTestingNow);
            }
        };
        var canUseProgressEvent = function() {
            var xhr = new XMLHttpRequest();
            return "upload" in xhr && "onprogress" in xhr.upload;
        }();
        function _hasClass(el, className) {
            var classAttr = el.getAttribute("class") || "";
            var classNames = classAttr.split(" ");
            return classNames.indexOf(className) !== -1;
        }
        function _addClass(el, className) {
            var classAttr = el.getAttribute("class") || "";
            var classNames = classAttr.split(" ");
            var searchIndex = classNames.indexOf(className);
            classNames.push(className);
            if (searchIndex === -1) {
                classNames = classNames.join(" ");
                el.setAttribute("class", classNames.trim());
            }
        }
        function _removeClass(el, className) {
            var classAttr = el.getAttribute("class") || "";
            var classNames = classAttr.split(" ");
            var searchIndex = classNames.indexOf(className);
            if (searchIndex > -1) {
                classNames.splice(searchIndex, 1);
                classNames = classNames.join(" ");
                el.setAttribute("class", classNames.trim());
            }
        }
        function _extend() {
            var extended = {};
            var deep = false;
            var i = 0;
            var length = arguments.length;
            if (_isBoolean(arguments[0])) {
                deep = arguments[0];
                i++;
            }
            for (;i < length; i++) {
                var obj = arguments[i];
                _merge(obj);
            }
            function _merge(obj) {
                for (var prop in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                        if (deep && _isObject(obj[prop])) {
                            extended[prop] = _extend(true, extended[prop], obj[prop]);
                        } else {
                            extended[prop] = obj[prop];
                        }
                    }
                }
            }
            return extended;
        }
        function _forEach(obj, fn) {
            var keys = Object.keys(obj);
            var len = keys.length;
            for (var i = 0; i < len; i++) {
                var key = keys[i];
                var val = obj[key];
                var res = fn.call(val, val, key);
                if (res === false) break;
            }
        }
        function _isString(obj) {
            return typeof obj === "string" || obj instanceof String;
        }
        function _isArray(obj) {
            return Object.prototype.toString.call(obj) === "[object Array]";
        }
        function _isBoolean(obj) {
            return Object.prototype.toString.call(obj) === "[object Boolean]";
        }
        function _isObject(obj) {
            return Object.prototype.toString.call(obj) === "[object Object]";
        }
        function _isFunction(obj) {
            return Object.prototype.toString.call(obj) === "[object Function]";
        }
        function _isValidationStep(str) {
            var regex = /^step\-[0-9]+$/gm;
            return regex.test(str);
        }
        function _getValidationStepIndex(str) {
            return +str.replace("step-", "");
        }
        function _guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
            }
            return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
        }
        function _cantUseFormData() {
            return window.FormData === undefined;
        }
        function _getEmptyObj() {
            return Object.create(null);
        }
        function _makeSerializationURL(obj) {
            var regex = /\?/g;
            var hasVariables = regex.test(obj.url);
            var delimiter = hasVariables === true ? "&" : "?";
            if (obj.serializedString === "") {
                delimiter = "";
            }
            return obj.url + delimiter + obj.serializedString;
        }
        function _hostnameFromStr(url) {
            var hostname;
            if (url.indexOf("//") > -1) {
                hostname = url.split("/")[2];
            } else {
                hostname = url.split("/")[0];
            }
            hostname = hostname.split(":")[0];
            hostname = hostname.split("?")[0];
            return hostname;
        }
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = merge;
        function merge() {
            var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var defaults = arguments.length > 1 ? arguments[1] : undefined;
            for (var key in defaults) {
                if (typeof obj[key] === "undefined") {
                    obj[key] = defaults[key];
                }
            }
            return obj;
        }
        module.exports = exports.default;
        module.exports.default = exports.default;
    }, function(module, exports, __webpack_require__) {
        var helper = __webpack_require__(1);
        var inspector = __webpack_require__(11);
        var getInputsGroupedByName = __webpack_require__(10);
        module.exports = function(form, options) {
            if (!inspector.checkFirstArgument(form) || !inspector.checkSubmitButton(form)) {
                return;
            }
            var self = this;
            helper.addFeedback2List(self);
            self.version = "0.1.10";
            self.form = form;
            self.iframe = null;
            self.inputsGroupedByName = {};
            self.submitFn = null;
            self.progressTimeoutID = null;
            self.options = {
                focusIncorrectInput: true,
                fireSchemaByTurn: true,
                blockSubmitWhenFormSending: true,
                fireValidateAndAjaxWhenSubmit: true,
                resetFormAfterAjax: true,
                schema: {},
                validationStep: 0,
                validationStepChanged: function() {},
                ajax: {
                    loadingClass: "--loading",
                    url: form.getAttribute("action") || location.href,
                    method: form.getAttribute("method") || "POST",
                    iframePolyfill: "auto",
                    iframePostMessage: false,
                    iframeTimeout: 0,
                    before: function() {},
                    after: function() {},
                    success: function() {},
                    error: function() {},
                    progress: function() {}
                },
                validate: {
                    before: function() {},
                    after: function() {},
                    success: function() {},
                    error: function() {}
                }
            };
            self.options = helper.extend(true, self.options, options || {});
            _prepareSchema(this);
            _updateFormAttributes(this);
            self.update();
            if (self.options.fireValidateAndAjaxWhenSubmit === true) {
                self.submitFn = function(e) {
                    var isLoading = helper.hasClass(self.form, self.options.ajax.loadingClass);
                    e.preventDefault();
                    if (self.options.blockSubmitWhenFormSending === true && isLoading) {
                        return false;
                    }
                    var isValid = _validateSchemaSteps(self);
                    if (isValid) {
                        self.ajax();
                    }
                };
                self.form.addEventListener("submit", self.submitFn);
            }
        };
        module.exports.prototype.schema = function() {
            var args = arguments;
            var argsIndex = 0;
            var isFirstArgumentStep = helper.isString(args[0]) && helper.isValidationStep(args[0]);
            var stepIndex = 0;
            if (isFirstArgumentStep) {
                stepIndex = helper.getValidationStepIndex(args[0]);
                argsIndex = 1;
            }
            this.options.schema[stepIndex] = args[argsIndex];
            return this;
        };
        module.exports.prototype.step = function(controller, payload) {
            var self = this;
            var res = undefined;
            switch (controller) {
              case "get":
                return self.options.validationStep;

              case "set":
                res = false;
                if (typeof payload === "number") {
                    res = true;
                    self.options.validationStep = payload;
                }
                break;

              case "next":
                res = true;
                self.options.validationStep++;
                break;

              case "prev":
                res = true;
                self.options.validationStep--;
                break;

              case "changed":
                if (helper.isFunction(payload)) {
                    self.options.validationStepChanged = payload;
                }
                return;
            }
            var stepsSize = Object.keys(self.options.schema).length - 1;
            if (self.options.validationStep < 0) {
                res = false;
                self.options.validationStep = 0;
            }
            if (self.options.validationStep > stepsSize) {
                res = false;
                self.options.validationStep = stepsSize;
            }
            if (helper.isFunction(self.options.validationStepChanged)) {
                self.options.validationStepChanged(self.options.validationStep);
            }
            return res;
        };
        module.exports.prototype.ajax = function(args) {
            if (typeof args === "undefined" || helper.isArray(args)) {
                return __webpack_require__(12).call(this, args);
            }
            this.options.ajax = helper.extend(this.options.ajax, args || {});
            this.options.ajax.method = this.options.ajax.method.toUpperCase();
            _updateFormAttributes(this);
            return this;
        };
        module.exports.prototype.validate = function(args) {
            if (typeof args === "undefined" || helper.isArray(args)) {
                return __webpack_require__(16).call(this, args);
            }
            this.options.validate = helper.extend(this.options.validate, args || {});
            return this;
        };
        module.exports.prototype.update = function() {
            var addValidateApi = __webpack_require__(17);
            this.inputsGroupedByName = getInputsGroupedByName(this.form);
            this.inputsGroupedByName = addValidateApi(this.inputsGroupedByName);
            return this;
        };
        module.exports.prototype.fireValidateError = function(message, element) {
            this.options.validate.error.call(helper.getEmptyObj(), message, element);
            this.options.focusIncorrectInput === true && element && element[0] && element[0].focus && element[0].focus();
            return this;
        };
        module.exports.prototype.resetForm = function() {
            this.form.reset();
            return this;
        };
        module.exports.prototype.destroy = function() {
            this.form.removeEventListener("submit", this.submitFn);
            this.iframe && this.iframe.parentNode.removeChild(this.iframe);
            return null;
        };
        function _updateFormAttributes(self) {
            self.form.setAttribute("novalidate", "");
            self.form.setAttribute("action", self.options.ajax.url);
            self.form.setAttribute("method", self.options.ajax.method);
        }
        function _prepareSchema(self) {
            var keys = Object.keys(self.options.schema);
            var schema = [ {} ];
            if (keys < 1) return;
            helper.forEach(self.options.schema, function(val, key) {
                var stepIndex = null;
                var isStep = helper.isValidationStep(key);
                var isFn = helper.isFunction(val);
                if (isStep) {
                    stepIndex = helper.getValidationStepIndex(key);
                    schema[stepIndex] = val;
                } else if (isFn) {
                    schema[0][key] = val;
                }
            });
            for (var i = 0; i < schema.length; i++) {
                if (schema[i] === undefined) {
                    schema[i] = {};
                }
            }
            self.options.schema = schema;
        }
        function _validateSchemaSteps(self) {
            var stepsSize = Object.keys(self.options.schema).length;
            var isValid = true;
            for (var i = 0; i < stepsSize; i++) {
                if (!self.validate()) {
                    isValid = false;
                    break;
                }
                self.step("next");
            }
            return isValid;
        }
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.commaDecimal = exports.dotDecimal = exports.arabicLocales = exports.englishLocales = exports.decimal = exports.alphanumeric = exports.alpha = void 0;
        var alpha = {
            "en-US": /^[A-Z]+$/i,
            "bg-BG": /^[А-Я]+$/i,
            "cs-CZ": /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
            "da-DK": /^[A-ZÆØÅ]+$/i,
            "de-DE": /^[A-ZÄÖÜß]+$/i,
            "el-GR": /^[Α-ω]+$/i,
            "es-ES": /^[A-ZÁÉÍÑÓÚÜ]+$/i,
            "fr-FR": /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
            "it-IT": /^[A-ZÀÉÈÌÎÓÒÙ]+$/i,
            "nb-NO": /^[A-ZÆØÅ]+$/i,
            "nl-NL": /^[A-ZÁÉËÏÓÖÜÚ]+$/i,
            "nn-NO": /^[A-ZÆØÅ]+$/i,
            "hu-HU": /^[A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
            "pl-PL": /^[A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
            "pt-PT": /^[A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ]+$/i,
            "ru-RU": /^[А-ЯЁ]+$/i,
            "sl-SI": /^[A-ZČĆĐŠŽ]+$/i,
            "sk-SK": /^[A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,
            "sr-RS@latin": /^[A-ZČĆŽŠĐ]+$/i,
            "sr-RS": /^[А-ЯЂЈЉЊЋЏ]+$/i,
            "sv-SE": /^[A-ZÅÄÖ]+$/i,
            "tr-TR": /^[A-ZÇĞİıÖŞÜ]+$/i,
            "uk-UA": /^[А-ЩЬЮЯЄIЇҐі]+$/i,
            "ku-IQ": /^[ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,
            ar: /^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/
        };
        exports.alpha = alpha;
        var alphanumeric = {
            "en-US": /^[0-9A-Z]+$/i,
            "bg-BG": /^[0-9А-Я]+$/i,
            "cs-CZ": /^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
            "da-DK": /^[0-9A-ZÆØÅ]+$/i,
            "de-DE": /^[0-9A-ZÄÖÜß]+$/i,
            "el-GR": /^[0-9Α-ω]+$/i,
            "es-ES": /^[0-9A-ZÁÉÍÑÓÚÜ]+$/i,
            "fr-FR": /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
            "it-IT": /^[0-9A-ZÀÉÈÌÎÓÒÙ]+$/i,
            "hu-HU": /^[0-9A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
            "nb-NO": /^[0-9A-ZÆØÅ]+$/i,
            "nl-NL": /^[0-9A-ZÁÉËÏÓÖÜÚ]+$/i,
            "nn-NO": /^[0-9A-ZÆØÅ]+$/i,
            "pl-PL": /^[0-9A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
            "pt-PT": /^[0-9A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ]+$/i,
            "ru-RU": /^[0-9А-ЯЁ]+$/i,
            "sl-SI": /^[0-9A-ZČĆĐŠŽ]+$/i,
            "sk-SK": /^[0-9A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,
            "sr-RS@latin": /^[0-9A-ZČĆŽŠĐ]+$/i,
            "sr-RS": /^[0-9А-ЯЂЈЉЊЋЏ]+$/i,
            "sv-SE": /^[0-9A-ZÅÄÖ]+$/i,
            "tr-TR": /^[0-9A-ZÇĞİıÖŞÜ]+$/i,
            "uk-UA": /^[0-9А-ЩЬЮЯЄIЇҐі]+$/i,
            "ku-IQ": /^[٠١٢٣٤٥٦٧٨٩0-9ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,
            ar: /^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/
        };
        exports.alphanumeric = alphanumeric;
        var decimal = {
            "en-US": ".",
            ar: "٫"
        };
        exports.decimal = decimal;
        var englishLocales = [ "AU", "GB", "HK", "IN", "NZ", "ZA", "ZM" ];
        exports.englishLocales = englishLocales;
        for (var locale, i = 0; i < englishLocales.length; i++) {
            locale = "en-".concat(englishLocales[i]);
            alpha[locale] = alpha["en-US"];
            alphanumeric[locale] = alphanumeric["en-US"];
            decimal[locale] = decimal["en-US"];
        }
        var arabicLocales = [ "AE", "BH", "DZ", "EG", "IQ", "JO", "KW", "LB", "LY", "MA", "QM", "QA", "SA", "SD", "SY", "TN", "YE" ];
        exports.arabicLocales = arabicLocales;
        for (var _locale, _i = 0; _i < arabicLocales.length; _i++) {
            _locale = "ar-".concat(arabicLocales[_i]);
            alpha[_locale] = alpha.ar;
            alphanumeric[_locale] = alphanumeric.ar;
            decimal[_locale] = decimal.ar;
        }
        var dotDecimal = [];
        exports.dotDecimal = dotDecimal;
        var commaDecimal = [ "bg-BG", "cs-CZ", "da-DK", "de-DE", "el-GR", "es-ES", "fr-FR", "it-IT", "ku-IQ", "hu-HU", "nb-NO", "nn-NO", "nl-NL", "pl-PL", "pt-PT", "ru-RU", "sl-SI", "sr-RS@latin", "sr-RS", "sv-SE", "tr-TR", "uk-UA" ];
        exports.commaDecimal = commaDecimal;
        for (var _i2 = 0; _i2 < dotDecimal.length; _i2++) {
            decimal[dotDecimal[_i2]] = decimal["en-US"];
        }
        for (var _i3 = 0; _i3 < commaDecimal.length; _i3++) {
            decimal[commaDecimal[_i3]] = ",";
        }
        alpha["pt-BR"] = alpha["pt-PT"];
        alphanumeric["pt-BR"] = alphanumeric["pt-PT"];
        decimal["pt-BR"] = decimal["pt-PT"];
        alpha["pl-Pl"] = alpha["pl-PL"];
        alphanumeric["pl-Pl"] = alphanumeric["pl-PL"];
        decimal["pl-Pl"] = decimal["pl-PL"];
    }, function(module, exports, __webpack_require__) {
        var helper = __webpack_require__(1);
        var handlersByType = {
            text: _text,
            hidden: _text,
            password: _text,
            search: _text,
            email: _text,
            url: _text,
            tel: _text,
            date: _text,
            time: _text,
            number: _text,
            range: _text,
            color: _text,
            "datetime-local": _text,
            month: _text,
            week: _text,
            datetime: _text,
            textarea: _text,
            radio: _radioAndCheckbox,
            checkbox: _radioAndCheckbox,
            "select-one": _text,
            "select-multiple": _selectMultiple
        };
        module.exports = function(self) {
            var result = [];
            helper.forEach(self.inputsGroupedByName, function(group, name) {
                helper.forEach(group, function(inputEl) {
                    inputEl.type in handlersByType && !inputEl.disabled && handlersByType[inputEl.type](inputEl, result);
                });
            });
            return result.join("&");
        };
        function _text(inputEl, result) {
            _push(inputEl, result);
        }
        function _radioAndCheckbox(inputEl, result) {
            if (!inputEl.checked) return;
            _push(inputEl, result);
        }
        function _selectMultiple(inputEl, result) {
            helper.forEach(inputEl.options, function(optionEl) {
                optionEl.selected && _push(optionEl, result, inputEl.name, optionEl.value);
            });
        }
        function _push(inputEl, result, hardSetName, hardSetValue) {
            var name = encodeURIComponent(hardSetName || inputEl.name);
            var value = encodeURIComponent(hardSetValue || inputEl.value).replace(/%20/g, "+");
            result.push(name + "=" + value);
        }
    }, function(module, exports, __webpack_require__) {
        var fakeXDomainRequest = __webpack_require__(36);
        var isCantUseFormData = window.FormData === undefined;
        module.exports = {
            serverURL: _getServerURL(),
            form: __webpack_require__(37),
            forEach: __webpack_require__(34),
            fakeXDomainRequest: fakeXDomainRequest,
            fakeAjax: {
                getCurrentInstance: function() {
                    return fakeXDomainRequest.getCurrentInstance() || jasmine.Ajax.requests.mostRecent();
                },
                respondWith: function(obj) {
                    jasmine.Ajax.requests.mostRecent().respondWith(obj);
                    fakeXDomainRequest.respondWith(obj);
                },
                install: function() {
                    jasmine.Ajax.install();
                    fakeXDomainRequest.install();
                },
                uninstall: function() {
                    jasmine.Ajax.uninstall();
                    fakeXDomainRequest.uninstall();
                }
            },
            isProgressEventSupport: function() {
                var xhr = new XMLHttpRequest();
                var test = "upload" in xhr && "onprogress" in xhr.upload;
                xhr = null;
                return test;
            },
            isCantUseFormData: function() {
                return isCantUseFormData;
            },
            isInternetExplorerBrowser: function() {
                var userAgent = navigator.userAgent.toLowerCase();
                return userAgent.indexOf("msie") != -1 ? parseInt(userAgent.split("msie")[1]) : false;
            },
            triggerEvent: function(el, eventName) {
                var event;
                if (document.createEvent) {
                    event = document.createEvent("HTMLEvents");
                    event.initEvent(eventName, true, true);
                    event.eventName = eventName;
                    el.dispatchEvent(event);
                } else {
                    event = document.createEventObject();
                    event.eventName = eventName;
                    event.eventType = eventName;
                    el.fireEvent("on" + event.eventType, event);
                }
            }
        };
        function _getServerURL() {
            var breakPoints = [ "docs", "test" ];
            var oldArr = location.href.split("/");
            var newArr = [];
            for (var i = 0; i < oldArr.length; i++) {
                if (breakPoints.indexOf(oldArr[i]) !== -1) break;
                newArr.push(oldArr[i]);
            }
            newArr.push("server/");
            return newArr.join("/");
        }
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = toString;
        function _typeof(obj) {
            if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                _typeof = function _typeof(obj) {
                    return typeof obj;
                };
            } else {
                _typeof = function _typeof(obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                };
            }
            return _typeof(obj);
        }
        function toString(input) {
            if (_typeof(input) === "object" && input !== null) {
                if (typeof input.toString === "function") {
                    input = input.toString();
                } else {
                    input = "[object Object]";
                }
            } else if (input === null || typeof input === "undefined" || isNaN(input) && !input.length) {
                input = "";
            }
            return String(input);
        }
        module.exports = exports.default;
        module.exports.default = exports.default;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = isFQDN;
        var _assertString = _interopRequireDefault(__webpack_require__(0));
        var _merge = _interopRequireDefault(__webpack_require__(2));
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        var default_fqdn_options = {
            require_tld: true,
            allow_underscores: false,
            allow_trailing_dot: false
        };
        function isFQDN(str, options) {
            (0, _assertString.default)(str);
            options = (0, _merge.default)(options, default_fqdn_options);
            if (options.allow_trailing_dot && str[str.length - 1] === ".") {
                str = str.substring(0, str.length - 1);
            }
            var parts = str.split(".");
            for (var i = 0; i < parts.length; i++) {
                if (parts[i].length > 63) {
                    return false;
                }
            }
            if (options.require_tld) {
                var tld = parts.pop();
                if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
                    return false;
                }
                if (/[\s\u2002-\u200B\u202F\u205F\u3000\uFEFF\uDB40\uDC20]/.test(tld)) {
                    return false;
                }
            }
            for (var part, _i = 0; _i < parts.length; _i++) {
                part = parts[_i];
                if (options.allow_underscores) {
                    part = part.replace(/_/g, "");
                }
                if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
                    return false;
                }
                if (/[\uff01-\uff5e]/.test(part)) {
                    return false;
                }
                if (part[0] === "-" || part[part.length - 1] === "-") {
                    return false;
                }
            }
            return true;
        }
        module.exports = exports.default;
        module.exports.default = exports.default;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = isIP;
        var _assertString = _interopRequireDefault(__webpack_require__(0));
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        var ipv4Maybe = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
        var ipv6Block = /^[0-9A-F]{1,4}$/i;
        function isIP(str) {
            var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
            (0, _assertString.default)(str);
            version = String(version);
            if (!version) {
                return isIP(str, 4) || isIP(str, 6);
            } else if (version === "4") {
                if (!ipv4Maybe.test(str)) {
                    return false;
                }
                var parts = str.split(".").sort(function(a, b) {
                    return a - b;
                });
                return parts[3] <= 255;
            } else if (version === "6") {
                var blocks = str.split(":");
                var foundOmissionBlock = false;
                var foundIPv4TransitionBlock = isIP(blocks[blocks.length - 1], 4);
                var expectedNumberOfBlocks = foundIPv4TransitionBlock ? 7 : 8;
                if (blocks.length > expectedNumberOfBlocks) {
                    return false;
                }
                if (str === "::") {
                    return true;
                } else if (str.substr(0, 2) === "::") {
                    blocks.shift();
                    blocks.shift();
                    foundOmissionBlock = true;
                } else if (str.substr(str.length - 2) === "::") {
                    blocks.pop();
                    blocks.pop();
                    foundOmissionBlock = true;
                }
                for (var i = 0; i < blocks.length; ++i) {
                    if (blocks[i] === "" && i > 0 && i < blocks.length - 1) {
                        if (foundOmissionBlock) {
                            return false;
                        }
                        foundOmissionBlock = true;
                    } else if (foundIPv4TransitionBlock && i === blocks.length - 1) {} else if (!ipv6Block.test(blocks[i])) {
                        return false;
                    }
                }
                if (foundOmissionBlock) {
                    return blocks.length >= 1;
                }
                return blocks.length === expectedNumberOfBlocks;
            }
            return false;
        }
        module.exports = exports.default;
        module.exports.default = exports.default;
    }, function(module, exports, __webpack_require__) {
        var helper = __webpack_require__(1);
        var ignoreInputTypesRegex = /^(?:submit|button|image|reset)$/i;
        module.exports = function(form) {
            var inputs = form.querySelectorAll("input, textarea, select");
            var groups = {};
            helper.forEach(inputs, function(item) {
                var name = item.name || "";
                var type = item.type || "";
                var test = name.trim() === "" || ignoreInputTypesRegex.test(type);
                if (test) return;
                if (!(name in groups)) {
                    groups[name] = [];
                }
                groups[name].push(item);
            });
            return groups;
        };
    }, function(module, exports) {
        module.exports = {
            checkFirstArgument: function(el) {
                if (!el || !el.nodeName || el.nodeName !== "FORM") {
                    console.error("First argument must be a form element!");
                    return false;
                }
                return true;
            },
            checkSubmitButton: function(el) {
                var hasElementWithSubmitName = el.querySelector('[name="submit"]');
                if (hasElementWithSubmitName) {
                    console.error("Element with attribute name = submit not allowed");
                    return false;
                }
                return true;
            }
        };
    }, function(module, exports, __webpack_require__) {
        var helper = __webpack_require__(1);
        var ajaxFnList = {
            iframe: __webpack_require__(13),
            XMLHttpRequest: __webpack_require__(14),
            XDomainRequest: __webpack_require__(15)
        };
        module.exports = function(submitInputs) {
            var self = this;
            var ajaxFn = _detectAjaxFn(self);
            if (helper.isArray(submitInputs)) {
                _ajaxSubmitInputs(self, ajaxFnList[ajaxFn], submitInputs);
            } else {
                ajaxFnList[ajaxFn](self);
            }
        };
        function _detectAjaxFn(self) {
            var hasFileType = _formHasInputWithFileType(self);
            var isAutoUsePolyfill = hasFileType && self.options.ajax.iframePolyfill === "auto" && helper.cantUseFormData();
            var isNeedUseXDomainRequest = _isNeedUseXDomainRequest(self);
            if (self.options.ajax.iframePolyfill === true || isAutoUsePolyfill) {
                if (isAutoUsePolyfill) {
                    console.warn("You can't use XMLHttpRequest 2.0 because browser not support it. Used polyfill ajax iframe.");
                }
                return "iframe";
            }
            if (isNeedUseXDomainRequest) {
                return "XDomainRequest";
            }
            if (helper.cantUseFormData() && hasFileType) {
                console.warn("Ignoring inputs with file type, because used XMLHttpRequest 1.0");
            }
            return "XMLHttpRequest";
        }
        function _formHasInputWithFileType(self) {
            try {
                helper.forEach(self.inputsGroupedByName, function(group) {
                    helper.forEach(group, function(input) {
                        if (String(input.type).toLowerCase() === "file") throw "found!";
                    });
                });
            } catch (e) {
                return true;
            }
            return false;
        }
        function _isNeedUseXDomainRequest(self) {
            var a = document.createElement("A");
            var xhr = new XMLHttpRequest();
            var hostname = null;
            a.href = self.options.ajax.url;
            hostname = a.hostname = helper.hostnameFromStr(a.href);
            a = null;
            return hostname !== location.hostname && typeof xhr.withCredentials === "undefined" && typeof XDomainRequest !== "undefined";
        }
        function _ajaxSubmitInputs(self, ajaxFn, submitInputs) {
            var inputs = self.form.querySelectorAll("[name]");
            helper.forEach(inputs, function(input) {
                if (submitInputs.indexOf(input.name) !== -1) return;
                input.disabledCache = input.disabled;
                input.setAttribute("disabled", "true");
            });
            ajaxFn(self);
            helper.forEach(inputs, function(input) {
                if (input.disabledCache) return;
                input.removeAttribute("disabled");
            });
        }
    }, function(module, exports, __webpack_require__) {
        var helper = __webpack_require__(1);
        module.exports = function(self) {
            helper.addClass(self.form, self.options.ajax.loadingClass);
            self.options.ajax.before();
            if (self.iframe === null) {
                self.iframe = _createIframe(self);
                if (!self.options.ajax.iframePostMessage) {
                    self.iframe.onload = function() {
                        var innerDoc, responseText;
                        if (!self.iframe) return;
                        try {
                            innerDoc = self.iframe.contentDocument || self.iframe.contentWindow.document;
                            responseText = String(innerDoc.body && innerDoc.body.innerHTML);
                        } catch (e) {
                            console.warn("You need use postMessage, read more - https://furashcka.github.io/feedback.js/docs/");
                            if (helper.isUnitTestingNow()) {
                                console.error(e);
                                return false;
                            } else {
                                throw e;
                            }
                        }
                        self.options.ajax.success({
                            type: "ajax.iframe",
                            xhr: {
                                responseText: responseText,
                                status: 200,
                                statusText: "OK"
                            }
                        });
                        _end(self);
                    };
                    self.iframe.src = self.options.ajax.url;
                }
            }
            if (self.options.ajax.iframeTimeout > 0) {
                self.iframe.timeoutLink = window.setTimeout(function() {
                    _iframeAbort(self);
                    self.options.ajax.error({
                        type: "ajax.iframe",
                        xhr: {
                            responseText: "",
                            status: 0,
                            statusText: "abort"
                        }
                    });
                    _end(self);
                }, self.options.ajax.iframeTimeout);
            }
            self.form.submit();
            self.progressTimeoutID = window.setTimeout(function() {
                self.options.ajax.progress.call(self.form, 30);
            }, 500);
        };
        window.addEventListener("message", function(e) {
            var self = null;
            var data = null;
            var isCantReadResponse = false;
            helper.forEach(helper.getFeedbackList(), function(instance) {
                if (!instance.iframe) return;
                if (e.source !== instance.iframe.contentWindow) return;
                self = instance;
                return false;
            });
            if (!self || !self.options.ajax.iframePostMessage) return;
            isCantReadResponse = helper.isObject(e.data) || e.data === "[object Object]";
            if (isCantReadResponse) {
                try {
                    throw "You must return text in post message";
                } catch (e) {
                    if (helper.isUnitTestingNow()) {
                        console.error(e);
                        return false;
                    } else {
                        throw e;
                    }
                }
            }
            window.clearTimeout(self.iframe.timeoutLink);
            self.options.ajax.success({
                type: "ajax.iframe",
                xhr: {
                    responseText: e.data,
                    status: 200,
                    statusText: "OK"
                }
            });
            _end(self);
        });
        function _createIframe(self) {
            var iframeName = "feedback-polyfill-ajax-iframe-" + helper.guid();
            var iframe = document.createElement("iframe");
            iframe.timeoutLink = null;
            iframe.name = iframeName;
            iframe.style.display = "none";
            self.form.setAttribute("enctype", "multipart/form-data");
            self.form.setAttribute("method", self.options.ajax.method);
            self.form.setAttribute("target", iframeName);
            document.body.appendChild(iframe);
            return iframe;
        }
        function _iframeAbort(self) {
            self.iframe && self.iframe.parentNode && self.iframe.parentNode.removeChild(self.iframe);
            self.iframe = null;
        }
        function _end(self) {
            clearTimeout(self.progressTimeoutID);
            self.options.ajax.progress.call(self.form, 100);
            helper.removeClass(self.form, self.options.ajax.loadingClass);
            self.options.ajax.after();
            self.options.resetFormAfterAjax && self.form.reset();
        }
    }, function(module, exports, __webpack_require__) {
        var helper = __webpack_require__(1);
        var serialize = __webpack_require__(5);
        module.exports = function(self) {
            var method = self.options.ajax.method;
            var url = self.options.ajax.url;
            var data = null;
            var version = "1.0";
            var setRequestHeader = false;
            var xhr = new XMLHttpRequest();
            helper.addClass(self.form, self.options.ajax.loadingClass);
            self.options.ajax.before();
            if (method === "GET") {
                url = helper.makeSerializationURL({
                    url: self.options.ajax.url,
                    serializedString: serialize(self)
                });
            } else {
                if (helper.cantUseFormData()) {
                    setRequestHeader = true;
                    data = serialize(self);
                } else {
                    version = "2.0";
                    data = new FormData(self.form);
                }
            }
            _onprogress(self, xhr);
            xhr.onreadystatechange = function() {
                if (xhr.readyState !== 4) return;
                window.clearTimeout(self.progressTimeoutID);
                if (xhr.status === 200) {
                    self.options.ajax.success({
                        type: "ajax." + version,
                        xhr: xhr
                    });
                } else {
                    self.options.ajax.error({
                        type: "ajax." + version,
                        xhr: xhr
                    });
                }
                helper.removeClass(self.form, self.options.ajax.loadingClass);
                self.options.ajax.after();
                !helper.canUseProgressEvent() && self.options.ajax.progress.call(self.form, 100);
                self.options.resetFormAfterAjax && self.form.reset();
            };
            xhr.open(method, url);
            setRequestHeader && xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(data);
            if (!helper.canUseProgressEvent()) {
                self.progressTimeoutID = window.setTimeout(function() {
                    self.options.ajax.progress.call(self.form, 30);
                }, 500);
            }
        };
        function _onprogress(self, xhr) {
            if (!helper.canUseProgressEvent()) return;
            xhr.upload.onprogress = function(e) {
                var percent = Math.round(e.loaded / e.total * 100);
                self.options.ajax.progress.call(self.form, percent);
            };
        }
    }, function(module, exports, __webpack_require__) {
        var helper = __webpack_require__(1);
        var serialize = __webpack_require__(5);
        module.exports = function(self) {
            var method = self.options.ajax.method;
            var url = self.options.ajax.url;
            var data = null;
            var xdr = new XDomainRequest();
            var ajaxType = "ajax.1.0";
            helper.addClass(self.form, self.options.ajax.loadingClass);
            self.options.ajax.before();
            if (method === "GET") {
                url = helper.makeSerializationURL({
                    url: self.options.ajax.url,
                    serializedString: serialize(self)
                });
            } else {
                data = serialize(self);
            }
            xdr.onload = function() {
                self.options.ajax.success({
                    type: ajaxType,
                    xhr: xdr
                });
                _end(self);
            };
            xdr.onerror = function() {
                self.options.ajax.error({
                    type: ajaxType,
                    xhr: xdr
                });
                _end(self);
            };
            xdr.open(method, url);
            xdr.send(data);
            self.progressTimeoutID = window.setTimeout(function() {
                self.options.ajax.progress.call(self.form, 30);
            }, 500);
        };
        function _end(self) {
            window.clearTimeout(self.progressTimeoutID);
            helper.removeClass(self.form, self.options.ajax.loadingClass);
            self.options.ajax.after();
            self.options.ajax.progress.call(self.form, 100);
            self.options.resetFormAfterAjax && self.form.reset();
        }
    }, function(module, exports, __webpack_require__) {
        var helper = __webpack_require__(1);
        module.exports = function(validateOnlySchemaItems) {
            var self = this;
            var firstInvalidInput = null;
            var schema = _resolveSchema(self, self.options.schema[self.options.validationStep] || {}, validateOnlySchemaItems);
            self.options.validate.before.call(helper.getEmptyObj());
            helper.forEach(schema, function(item, key) {
                if (!(key in self.inputsGroupedByName)) return;
                var inputsGroup = self.inputsGroupedByName[key];
                var inputsArr = _inputsGroup2Array(inputsGroup);
                var errorMessage = item.call(inputsGroup);
                if (typeof errorMessage !== "undefined") {
                    if (firstInvalidInput === null) {
                        firstInvalidInput = inputsGroup.get();
                    }
                    self.options.validate.error.call(helper.getEmptyObj(), errorMessage, inputsArr);
                    return !self.options.fireSchemaByTurn;
                }
            });
            if (firstInvalidInput !== null && self.options.focusIncorrectInput === true) {
                firstInvalidInput.focus();
            }
            if (firstInvalidInput === null) {
                self.options.validate.success.call(helper.getEmptyObj());
            }
            self.options.validate.after.call(helper.getEmptyObj());
            return firstInvalidInput === null;
        };
        function _resolveSchema(self, schema, validateOnlySchemaItems) {
            if (helper.isArray(validateOnlySchemaItems)) {
                schema = {};
                helper.forEach(validateOnlySchemaItems, function(key) {
                    schema[key] = self.options.schema[self.options.validationStep][key];
                });
            }
            return schema;
        }
        function _inputsGroup2Array(inputsGroup) {
            var arr = [];
            helper.forEach(inputsGroup, function(input) {
                arr.push(input);
            });
            return arr;
        }
    }, function(module, exports, __webpack_require__) {
        var helper = __webpack_require__(1);
        var createValidateObject = __webpack_require__(18);
        module.exports = function(inputsGroupedByName) {
            helper.forEach(inputsGroupedByName, function(inputsGroup, key) {
                inputsGroupedByName[key] = createValidateObject(inputsGroup);
            });
            return inputsGroupedByName;
        };
    }, function(module, exports, __webpack_require__) {
        var helper = __webpack_require__(1);
        var prototype = {
            get: function(index) {
                if (index === -1) return this[this.length - 1];
                return this[index || 0];
            },
            isAnyChecked: function() {
                var isAnyChecked = false;
                helper.forEach(this, function(input) {
                    if (input.checked === true) {
                        isAnyChecked = true;
                        return false;
                    }
                });
                return isAnyChecked;
            },
            forEach: function(fn) {
                helper.forEach(this, fn);
            },
            contains: function(seed) {
                return __webpack_require__(19)(this.get().value, seed);
            },
            equals: function(comparison) {
                return __webpack_require__(20)(this.get().value, comparison);
            },
            isAlpha: function(locale) {
                return __webpack_require__(21).default(this.get().value, locale);
            },
            isAlphanumeric: function(locale) {
                return __webpack_require__(22).default(this.get().value, locale);
            },
            isCreditCard: function() {
                return __webpack_require__(23)(this.get().value);
            },
            isEmail: function(options) {
                return __webpack_require__(24)(this.get().value, options);
            },
            isEmpty: function() {
                return __webpack_require__(26)(this.get().value, {
                    ignore_whitespace: true
                });
            },
            isFloat: function() {
                return __webpack_require__(27).default(this.get().value);
            },
            isIn: function(values) {
                return __webpack_require__(28).default(this.get().value, values);
            },
            isInt: function(options) {
                return __webpack_require__(29).default(this.get().value, options);
            },
            isMobilePhone: function(options) {
                return __webpack_require__(30).default(this.get().value, options);
            },
            isNumeric: function(options) {
                return __webpack_require__(31).default(this.get().value, options);
            },
            isURL: function(options) {
                return __webpack_require__(32).default(this.get().value, options);
            },
            matches: function(pattern, modifiers) {
                return __webpack_require__(33).default(this.get().value, pattern, modifiers);
            }
        };
        _defineProperties(prototype);
        module.exports = function(array) {
            var obj = Object.create(prototype);
            var i = 0;
            helper.forEach(array, function(item) {
                obj[i++] = item;
            });
            return obj;
        };
        function _defineProperties(obj) {
            helper.forEach(obj, function(val, key) {
                Object.defineProperty(obj, key, {
                    writable: false,
                    enumerable: false,
                    configurable: false
                });
            });
        }
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = contains;
        var _assertString = _interopRequireDefault(__webpack_require__(0));
        var _toString = _interopRequireDefault(__webpack_require__(7));
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function contains(str, elem) {
            (0, _assertString.default)(str);
            return str.indexOf((0, _toString.default)(elem)) >= 0;
        }
        module.exports = exports.default;
        module.exports.default = exports.default;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = equals;
        var _assertString = _interopRequireDefault(__webpack_require__(0));
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function equals(str, comparison) {
            (0, _assertString.default)(str);
            return str === comparison;
        }
        module.exports = exports.default;
        module.exports.default = exports.default;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = isAlpha;
        exports.locales = void 0;
        var _assertString = _interopRequireDefault(__webpack_require__(0));
        var _alpha = __webpack_require__(4);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function isAlpha(str) {
            var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "en-US";
            (0, _assertString.default)(str);
            if (locale in _alpha.alpha) {
                return _alpha.alpha[locale].test(str);
            }
            throw new Error("Invalid locale '".concat(locale, "'"));
        }
        var locales = Object.keys(_alpha.alpha);
        exports.locales = locales;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = isAlphanumeric;
        exports.locales = void 0;
        var _assertString = _interopRequireDefault(__webpack_require__(0));
        var _alpha = __webpack_require__(4);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function isAlphanumeric(str) {
            var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "en-US";
            (0, _assertString.default)(str);
            if (locale in _alpha.alphanumeric) {
                return _alpha.alphanumeric[locale].test(str);
            }
            throw new Error("Invalid locale '".concat(locale, "'"));
        }
        var locales = Object.keys(_alpha.alphanumeric);
        exports.locales = locales;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = isCreditCard;
        var _assertString = _interopRequireDefault(__webpack_require__(0));
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        var creditCard = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|6[27][0-9]{14})$/;
        function isCreditCard(str) {
            (0, _assertString.default)(str);
            var sanitized = str.replace(/[- ]+/g, "");
            if (!creditCard.test(sanitized)) {
                return false;
            }
            var sum = 0;
            var digit;
            var tmpNum;
            var shouldDouble;
            for (var i = sanitized.length - 1; i >= 0; i--) {
                digit = sanitized.substring(i, i + 1);
                tmpNum = parseInt(digit, 10);
                if (shouldDouble) {
                    tmpNum *= 2;
                    if (tmpNum >= 10) {
                        sum += tmpNum % 10 + 1;
                    } else {
                        sum += tmpNum;
                    }
                } else {
                    sum += tmpNum;
                }
                shouldDouble = !shouldDouble;
            }
            return !!(sum % 10 === 0 ? sanitized : false);
        }
        module.exports = exports.default;
        module.exports.default = exports.default;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = isEmail;
        var _assertString = _interopRequireDefault(__webpack_require__(0));
        var _merge = _interopRequireDefault(__webpack_require__(2));
        var _isByteLength = _interopRequireDefault(__webpack_require__(25));
        var _isFQDN = _interopRequireDefault(__webpack_require__(8));
        var _isIP = _interopRequireDefault(__webpack_require__(9));
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        var default_email_options = {
            allow_display_name: false,
            require_display_name: false,
            allow_utf8_local_part: true,
            require_tld: true
        };
        var displayName = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\,\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i;
        var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
        var gmailUserPart = /^[a-z\d]+$/;
        var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
        var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
        var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
        function isEmail(str, options) {
            (0, _assertString.default)(str);
            options = (0, _merge.default)(options, default_email_options);
            if (options.require_display_name || options.allow_display_name) {
                var display_email = str.match(displayName);
                if (display_email) {
                    str = display_email[1];
                } else if (options.require_display_name) {
                    return false;
                }
            }
            var parts = str.split("@");
            var domain = parts.pop();
            var user = parts.join("@");
            var lower_domain = domain.toLowerCase();
            if (options.domain_specific_validation && (lower_domain === "gmail.com" || lower_domain === "googlemail.com")) {
                user = user.toLowerCase();
                var username = user.split("+")[0];
                if (!(0, _isByteLength.default)(username.replace(".", ""), {
                    min: 6,
                    max: 30
                })) {
                    return false;
                }
                var _user_parts = username.split(".");
                for (var i = 0; i < _user_parts.length; i++) {
                    if (!gmailUserPart.test(_user_parts[i])) {
                        return false;
                    }
                }
            }
            if (!(0, _isByteLength.default)(user, {
                max: 64
            }) || !(0, _isByteLength.default)(domain, {
                max: 254
            })) {
                return false;
            }
            if (!(0, _isFQDN.default)(domain, {
                require_tld: options.require_tld
            })) {
                if (!options.allow_ip_domain) {
                    return false;
                }
                if (!(0, _isIP.default)(domain)) {
                    if (!domain.startsWith("[") || !domain.endsWith("]")) {
                        return false;
                    }
                    var noBracketdomain = domain.substr(1, domain.length - 2);
                    if (noBracketdomain.length === 0 || !(0, _isIP.default)(noBracketdomain)) {
                        return false;
                    }
                }
            }
            if (user[0] === '"') {
                user = user.slice(1, user.length - 1);
                return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
            }
            var pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;
            var user_parts = user.split(".");
            for (var _i = 0; _i < user_parts.length; _i++) {
                if (!pattern.test(user_parts[_i])) {
                    return false;
                }
            }
            return true;
        }
        module.exports = exports.default;
        module.exports.default = exports.default;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = isByteLength;
        var _assertString = _interopRequireDefault(__webpack_require__(0));
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function _typeof(obj) {
            if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                _typeof = function _typeof(obj) {
                    return typeof obj;
                };
            } else {
                _typeof = function _typeof(obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                };
            }
            return _typeof(obj);
        }
        function isByteLength(str, options) {
            (0, _assertString.default)(str);
            var min;
            var max;
            if (_typeof(options) === "object") {
                min = options.min || 0;
                max = options.max;
            } else {
                min = arguments[1];
                max = arguments[2];
            }
            var len = encodeURI(str).split(/%..|./).length - 1;
            return len >= min && (typeof max === "undefined" || len <= max);
        }
        module.exports = exports.default;
        module.exports.default = exports.default;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = isEmpty;
        var _assertString = _interopRequireDefault(__webpack_require__(0));
        var _merge = _interopRequireDefault(__webpack_require__(2));
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        var default_is_empty_options = {
            ignore_whitespace: false
        };
        function isEmpty(str, options) {
            (0, _assertString.default)(str);
            options = (0, _merge.default)(options, default_is_empty_options);
            return (options.ignore_whitespace ? str.trim().length : str.length) === 0;
        }
        module.exports = exports.default;
        module.exports.default = exports.default;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = isFloat;
        exports.locales = void 0;
        var _assertString = _interopRequireDefault(__webpack_require__(0));
        var _alpha = __webpack_require__(4);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function isFloat(str, options) {
            (0, _assertString.default)(str);
            options = options || {};
            var float = new RegExp("^(?:[-+])?(?:[0-9]+)?(?:\\".concat(options.locale ? _alpha.decimal[options.locale] : ".", "[0-9]*)?(?:[eE][\\+\\-]?(?:[0-9]+))?$"));
            if (str === "" || str === "." || str === "-" || str === "+") {
                return false;
            }
            var value = parseFloat(str.replace(",", "."));
            return float.test(str) && (!options.hasOwnProperty("min") || value >= options.min) && (!options.hasOwnProperty("max") || value <= options.max) && (!options.hasOwnProperty("lt") || value < options.lt) && (!options.hasOwnProperty("gt") || value > options.gt);
        }
        var locales = Object.keys(_alpha.decimal);
        exports.locales = locales;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = isIn;
        var _assertString = _interopRequireDefault(__webpack_require__(0));
        var _toString = _interopRequireDefault(__webpack_require__(7));
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function _typeof(obj) {
            if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                _typeof = function _typeof(obj) {
                    return typeof obj;
                };
            } else {
                _typeof = function _typeof(obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                };
            }
            return _typeof(obj);
        }
        function isIn(str, options) {
            (0, _assertString.default)(str);
            var i;
            if (Object.prototype.toString.call(options) === "[object Array]") {
                var array = [];
                for (i in options) {
                    if ({}.hasOwnProperty.call(options, i)) {
                        array[i] = (0, _toString.default)(options[i]);
                    }
                }
                return array.indexOf(str) >= 0;
            } else if (_typeof(options) === "object") {
                return options.hasOwnProperty(str);
            } else if (options && typeof options.indexOf === "function") {
                return options.indexOf(str) >= 0;
            }
            return false;
        }
        module.exports = exports.default;
        module.exports.default = exports.default;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = isInt;
        var _assertString = _interopRequireDefault(__webpack_require__(0));
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        var int = /^(?:[-+]?(?:0|[1-9][0-9]*))$/;
        var intLeadingZeroes = /^[-+]?[0-9]+$/;
        function isInt(str, options) {
            (0, _assertString.default)(str);
            options = options || {};
            var regex = options.hasOwnProperty("allow_leading_zeroes") && !options.allow_leading_zeroes ? int : intLeadingZeroes;
            var minCheckPassed = !options.hasOwnProperty("min") || str >= options.min;
            var maxCheckPassed = !options.hasOwnProperty("max") || str <= options.max;
            var ltCheckPassed = !options.hasOwnProperty("lt") || str < options.lt;
            var gtCheckPassed = !options.hasOwnProperty("gt") || str > options.gt;
            return regex.test(str) && minCheckPassed && maxCheckPassed && ltCheckPassed && gtCheckPassed;
        }
        module.exports = exports.default;
        module.exports.default = exports.default;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = isMobilePhone;
        exports.locales = void 0;
        var _assertString = _interopRequireDefault(__webpack_require__(0));
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        var phones = {
            "ar-AE": /^((\+?971)|0)?5[024568]\d{7}$/,
            "ar-DZ": /^(\+?213|0)(5|6|7)\d{8}$/,
            "ar-EG": /^((\+?20)|0)?1[012]\d{8}$/,
            "ar-IQ": /^(\+?964|0)?7[0-9]\d{8}$/,
            "ar-JO": /^(\+?962|0)?7[789]\d{7}$/,
            "ar-KW": /^(\+?965)[569]\d{7}$/,
            "ar-SA": /^(!?(\+?966)|0)?5\d{8}$/,
            "ar-SY": /^(!?(\+?963)|0)?9\d{8}$/,
            "ar-TN": /^(\+?216)?[2459]\d{7}$/,
            "be-BY": /^(\+?375)?(24|25|29|33|44)\d{7}$/,
            "bg-BG": /^(\+?359|0)?8[789]\d{7}$/,
            "bn-BD": /\+?(88)?0?1[356789][0-9]{8}\b/,
            "cs-CZ": /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
            "da-DK": /^(\+?45)?\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/,
            "de-DE": /^(\+49)?0?1(5[0-25-9]\d|6([23]|0\d?)|7([0-57-9]|6\d))\d{7}$/,
            "el-GR": /^(\+?30|0)?(69\d{8})$/,
            "en-AU": /^(\+?61|0)4\d{8}$/,
            "en-GB": /^(\+?44|0)7\d{9}$/,
            "en-GH": /^(\+233|0)(20|50|24|54|27|57|26|56|23|28)\d{7}$/,
            "en-HK": /^(\+?852\-?)?[456789]\d{3}\-?\d{4}$/,
            "en-IE": /^(\+?353|0)8[356789]\d{7}$/,
            "en-IN": /^(\+?91|0)?[6789]\d{9}$/,
            "en-KE": /^(\+?254|0)?[7]\d{8}$/,
            "en-MU": /^(\+?230|0)?\d{8}$/,
            "en-NG": /^(\+?234|0)?[789]\d{9}$/,
            "en-NZ": /^(\+?64|0)[28]\d{7,9}$/,
            "en-PK": /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/,
            "en-RW": /^(\+?250|0)?[7]\d{8}$/,
            "en-SG": /^(\+65)?[89]\d{7}$/,
            "en-TZ": /^(\+?255|0)?[67]\d{8}$/,
            "en-UG": /^(\+?256|0)?[7]\d{8}$/,
            "en-US": /^((\+1|1)?( |-)?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})( |-)?([2-9][0-9]{2}( |-)?[0-9]{4})$/,
            "en-ZA": /^(\+?27|0)\d{9}$/,
            "en-ZM": /^(\+?26)?09[567]\d{7}$/,
            "es-ES": /^(\+?34)?(6\d{1}|7[1234])\d{7}$/,
            "es-MX": /^(\+?52)?(1|01)?\d{10,11}$/,
            "es-UY": /^(\+598|0)9[1-9][\d]{6}$/,
            "et-EE": /^(\+?372)?\s?(5|8[1-4])\s?([0-9]\s?){6,7}$/,
            "fa-IR": /^(\+?98[\-\s]?|0)9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/,
            "fi-FI": /^(\+?358|0)\s?(4(0|1|2|4|5|6)?|50)\s?(\d\s?){4,8}\d$/,
            "fo-FO": /^(\+?298)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
            "fr-FR": /^(\+?33|0)[67]\d{8}$/,
            "he-IL": /^(\+972|0)([23489]|5[012345689]|77)[1-9]\d{6}$/,
            "hu-HU": /^(\+?36)(20|30|70)\d{7}$/,
            "id-ID": /^(\+?62|0)8(1[123456789]|2[1238]|3[1238]|5[12356789]|7[78]|9[56789]|8[123456789])([\s?|\d]{5,11})$/,
            "it-IT": /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
            "ja-JP": /^(\+?81|0)[789]0[ \-]?[1-9]\d{2}[ \-]?\d{5}$/,
            "kk-KZ": /^(\+?7|8)?7\d{9}$/,
            "kl-GL": /^(\+?299)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
            "ko-KR": /^((\+?82)[ \-]?)?0?1([0|1|6|7|8|9]{1})[ \-]?\d{3,4}[ \-]?\d{4}$/,
            "lt-LT": /^(\+370|8)\d{8}$/,
            "ms-MY": /^(\+?6?01){1}(([0145]{1}(\-|\s)?\d{7,8})|([236789]{1}(\s|\-)?\d{7}))$/,
            "nb-NO": /^(\+?47)?[49]\d{7}$/,
            "nl-BE": /^(\+?32|0)4?\d{8}$/,
            "nn-NO": /^(\+?47)?[49]\d{7}$/,
            "pl-PL": /^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,
            "pt-BR": /(?=^(\+?5{2}\-?|0)[1-9]{2}\-?\d{4}\-?\d{4}$)(^(\+?5{2}\-?|0)[1-9]{2}\-?[6-9]{1}\d{3}\-?\d{4}$)|(^(\+?5{2}\-?|0)[1-9]{2}\-?9[6-9]{1}\d{3}\-?\d{4}$)/,
            "pt-PT": /^(\+?351)?9[1236]\d{7}$/,
            "ro-RO": /^(\+?4?0)\s?7\d{2}(\/|\s|\.|\-)?\d{3}(\s|\.|\-)?\d{3}$/,
            "ru-RU": /^(\+?7|8)?9\d{9}$/,
            "sl-SI": /^(\+386\s?|0)(\d{1}\s?\d{3}\s?\d{2}\s?\d{2}|\d{2}\s?\d{3}\s?\d{3})$/,
            "sk-SK": /^(\+?421)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
            "sr-RS": /^(\+3816|06)[- \d]{5,9}$/,
            "sv-SE": /^(\+?46|0)[\s\-]?7[\s\-]?[02369]([\s\-]?\d){7}$/,
            "th-TH": /^(\+66|66|0)\d{9}$/,
            "tr-TR": /^(\+?90|0)?5\d{9}$/,
            "uk-UA": /^(\+?38|8)?0\d{9}$/,
            "vi-VN": /^(\+?84|0)((3([2-9]))|(5([689]))|(7([0|6-9]))|(8([1-5]))|(9([0-9])))([0-9]{7})$/,
            "zh-CN": /^((\+|00)86)?1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
            "zh-TW": /^(\+?886\-?|0)?9\d{8}$/
        };
        phones["en-CA"] = phones["en-US"];
        phones["fr-BE"] = phones["nl-BE"];
        phones["zh-HK"] = phones["en-HK"];
        function isMobilePhone(str, locale, options) {
            (0, _assertString.default)(str);
            if (options && options.strictMode && !str.startsWith("+")) {
                return false;
            }
            if (Array.isArray(locale)) {
                return locale.some(function(key) {
                    if (phones.hasOwnProperty(key)) {
                        var phone = phones[key];
                        if (phone.test(str)) {
                            return true;
                        }
                    }
                    return false;
                });
            } else if (locale in phones) {
                return phones[locale].test(str);
            } else if (!locale || locale === "any") {
                for (var key in phones) {
                    if (phones.hasOwnProperty(key)) {
                        var phone = phones[key];
                        if (phone.test(str)) {
                            return true;
                        }
                    }
                }
                return false;
            }
            throw new Error("Invalid locale '".concat(locale, "'"));
        }
        var locales = Object.keys(phones);
        exports.locales = locales;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = isNumeric;
        var _assertString = _interopRequireDefault(__webpack_require__(0));
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        var numeric = /^[+-]?([0-9]*[.])?[0-9]+$/;
        var numericNoSymbols = /^[0-9]+$/;
        function isNumeric(str, options) {
            (0, _assertString.default)(str);
            if (options && options.no_symbols) {
                return numericNoSymbols.test(str);
            }
            return numeric.test(str);
        }
        module.exports = exports.default;
        module.exports.default = exports.default;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = isURL;
        var _assertString = _interopRequireDefault(__webpack_require__(0));
        var _isFQDN = _interopRequireDefault(__webpack_require__(8));
        var _isIP = _interopRequireDefault(__webpack_require__(9));
        var _merge = _interopRequireDefault(__webpack_require__(2));
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        var default_url_options = {
            protocols: [ "http", "https", "ftp" ],
            require_tld: true,
            require_protocol: false,
            require_host: true,
            require_valid_protocol: true,
            allow_underscores: false,
            allow_trailing_dot: false,
            allow_protocol_relative_urls: false
        };
        var wrapped_ipv6 = /^\[([^\]]+)\](?::([0-9]+))?$/;
        function isRegExp(obj) {
            return Object.prototype.toString.call(obj) === "[object RegExp]";
        }
        function checkHost(host, matches) {
            for (var i = 0; i < matches.length; i++) {
                var match = matches[i];
                if (host === match || isRegExp(match) && match.test(host)) {
                    return true;
                }
            }
            return false;
        }
        function isURL(url, options) {
            (0, _assertString.default)(url);
            if (!url || url.length >= 2083 || /[\s<>]/.test(url)) {
                return false;
            }
            if (url.indexOf("mailto:") === 0) {
                return false;
            }
            options = (0, _merge.default)(options, default_url_options);
            var protocol, auth, host, hostname, port, port_str, split, ipv6;
            split = url.split("#");
            url = split.shift();
            split = url.split("?");
            url = split.shift();
            split = url.split("://");
            if (split.length > 1) {
                protocol = split.shift().toLowerCase();
                if (options.require_valid_protocol && options.protocols.indexOf(protocol) === -1) {
                    return false;
                }
            } else if (options.require_protocol) {
                return false;
            } else if (url.substr(0, 2) === "//") {
                if (!options.allow_protocol_relative_urls) {
                    return false;
                }
                split[0] = url.substr(2);
            }
            url = split.join("://");
            if (url === "") {
                return false;
            }
            split = url.split("/");
            url = split.shift();
            if (url === "" && !options.require_host) {
                return true;
            }
            split = url.split("@");
            if (split.length > 1) {
                if (options.disallow_auth) {
                    return false;
                }
                auth = split.shift();
                if (auth.indexOf(":") >= 0 && auth.split(":").length > 2) {
                    return false;
                }
            }
            hostname = split.join("@");
            port_str = null;
            ipv6 = null;
            var ipv6_match = hostname.match(wrapped_ipv6);
            if (ipv6_match) {
                host = "";
                ipv6 = ipv6_match[1];
                port_str = ipv6_match[2] || null;
            } else {
                split = hostname.split(":");
                host = split.shift();
                if (split.length) {
                    port_str = split.join(":");
                }
            }
            if (port_str !== null) {
                port = parseInt(port_str, 10);
                if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
                    return false;
                }
            }
            if (!(0, _isIP.default)(host) && !(0, _isFQDN.default)(host, options) && (!ipv6 || !(0, 
            _isIP.default)(ipv6, 6))) {
                return false;
            }
            host = host || ipv6;
            if (options.host_whitelist && !checkHost(host, options.host_whitelist)) {
                return false;
            }
            if (options.host_blacklist && checkHost(host, options.host_blacklist)) {
                return false;
            }
            return true;
        }
        module.exports = exports.default;
        module.exports.default = exports.default;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = matches;
        var _assertString = _interopRequireDefault(__webpack_require__(0));
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function matches(str, pattern, modifiers) {
            (0, _assertString.default)(str);
            if (Object.prototype.toString.call(pattern) !== "[object RegExp]") {
                pattern = new RegExp(pattern, modifiers);
            }
            return pattern.test(str);
        }
        module.exports = exports.default;
        module.exports.default = exports.default;
    }, function(module, exports) {
        module.exports = function(obj, fn) {
            var keys = Object.keys(obj);
            var len = keys.length;
            for (var i = 0; i < len; i++) {
                var key = keys[i];
                var val = obj[key];
                var res = fn.call(val, val, key);
                if (res === false) break;
            }
        };
    }, function(module, exports, __webpack_require__) {
        var helper = __webpack_require__(6);
        window.jasmine = window.jasmine || {};
        window.jasmine.isUnitTestingNow = true;
        helper.form.setEventListener("afterInit", function() {
            helper.form.add.input({
                name: "phone",
                type: "tel",
                value: "7777-7777"
            });
            helper.form.add.input({
                name: "age",
                type: "number"
            });
            helper.form.add.input({
                name: "submit-name",
                type: "submit"
            });
        });
        helper.form.init();
        beforeEach(function() {
            helper.form.reinit();
        });
        describe("test initialize", function() {
            __webpack_require__(38)();
        });
        describe("test options", function() {
            __webpack_require__(39)();
        });
        describe("test API", function() {
            __webpack_require__(40)();
        });
        describe("test Input API", function() {
            __webpack_require__(41)();
        });
        describe('test API "ajax" - for this need more tests', function() {
            __webpack_require__(42)();
        });
        describe('test API "ajax" "iframePolyfill" option - for this need more tests', function() {
            __webpack_require__(43)();
        });
        describe('test API "ajax" "iframePolyfill", "iframeTimeout", "iframePostMessage" options together - for this need more tests', function() {
            __webpack_require__(44)();
        });
        describe("test serialize", function() {
            __webpack_require__(45)();
        });
    }, function(module, exports, __webpack_require__) {
        var forEach = __webpack_require__(34);
        var nativeXDomainRequest = window.XDomainRequest;
        var instance = null;
        var fakeXDomainRequest = function() {
            instance = this;
        };
        fakeXDomainRequest.prototype.open = function(method, url) {
            this.requestMethod = method;
            this.requestURL = url;
            this.url = url;
        };
        fakeXDomainRequest.prototype.send = function(body) {
            this.requestBody = body;
        };
        fakeXDomainRequest.prototype.onload = function() {};
        fakeXDomainRequest.prototype.onerror = function() {};
        module.exports = {
            getCurrentInstance: function() {
                return instance;
            },
            respondWith: function(obj) {
                if (obj.status === 200) {
                    instance && instance.onload();
                } else {
                    instance && instance.onerror();
                }
                instance && forEach(obj, function(key, val) {
                    instance[key] = val;
                });
            },
            install: function() {
                window.XDomainRequest = fakeXDomainRequest;
            },
            uninstall: function() {
                instance = null;
                window.XDomainRequest = nativeXDomainRequest;
            }
        };
    }, function(module, exports, __webpack_require__) {
        var forEach = __webpack_require__(34);
        var form = module.exports = {
            el: null,
            events: {
                afterInit: function() {}
            },
            init: function() {
                form.el = document.createElement("form");
                form.el.setAttribute("method", "post");
                form.el.setAttribute("action", "http://f-cka.com/other/response-server/post.php");
                form.el.style.position = "fixed";
                form.el.style.top = "-9999px";
                form.el.style.left = "-9999px";
                document.body.appendChild(form.el);
                form.events.afterInit();
            },
            add: {
                input: function(attr) {
                    form.el.appendChild(_createElementWithAttr("input", attr));
                    return form.add;
                },
                select: function(attr) {
                    var select = _createElementWithAttr("select", attr);
                    var obj = {
                        add: {
                            option: function(attr) {
                                var option = _createElementWithAttr("option", attr);
                                select.appendChild(option);
                                return obj;
                            }
                        }
                    };
                    form.el.appendChild(select);
                    return obj;
                }
            },
            getFormElementsByName: function(name) {
                return form.el.querySelectorAll('[name="' + name + '"]');
            },
            setEventListener: function(name, fn) {
                if (name in form.events) {
                    form.events[name] = fn;
                }
            },
            clear: function() {
                form.el.innerHTML = "";
            },
            destroy: function() {
                if (form.el) {
                    form.el.parentNode.removeChild(form.el);
                }
                form.el = null;
            },
            reinit: function() {
                form.destroy();
                form.init();
            }
        };
        function _createElementWithAttr(name, attr) {
            var el = document.createElement(name);
            forEach(attr || [], function(val, key) {
                el.setAttribute(key, val);
            });
            return el;
        }
    }, function(module, exports, __webpack_require__) {
        var helper = __webpack_require__(6);
        var Feedback = __webpack_require__(3);
        module.exports = function() {
            it("error test: new Feedback() first argument must be a form element", function() {
                var tmp = console.error;
                var message = "";
                console.error = function(msg) {
                    message = msg;
                };
                new Feedback();
                console.error = tmp;
                expect(message).toEqual("First argument must be a form element!");
            });
            it("error test: new Feedback() element with attribute name = submit not allowed", function() {
                var tmp = console.error;
                var message = "";
                console.error = function(msg) {
                    message = msg;
                };
                helper.form.reinit();
                helper.form.clear();
                helper.form.add.input({
                    name: "submit",
                    type: "submit"
                });
                new Feedback(helper.form.el);
                console.error = tmp;
                expect(message).toEqual("Element with attribute name = submit not allowed");
            });
            it("new Feedback() must return object", function() {
                var obj = jasmine.any(Object);
                var feedback = new Feedback(helper.form.el);
                expect(feedback).toEqual(obj);
                feedback = feedback.destroy();
            });
        };
    }, function(module, exports, __webpack_require__) {
        var helper = __webpack_require__(6);
        var Feedback = __webpack_require__(3);
        module.exports = function() {
            beforeEach(function() {
                helper.fakeAjax.install();
            });
            afterEach(function() {
                helper.fakeAjax.uninstall();
            });
            it('"focusIncorrectInput" = true', function() {
                _testFocusIncorrectInput({
                    focusIncorrectInput: true
                });
            });
            it('"focusIncorrectInput" = false', function() {
                _testFocusIncorrectInput({
                    focusIncorrectInput: false
                });
            });
            it('"fireSchemaByTurn" = true', function() {
                _testSchemaByTurn({
                    fireSchemaByTurn: true
                });
            });
            it('"fireSchemaByTurn" = false', function() {
                _testSchemaByTurn({
                    fireSchemaByTurn: false
                });
            });
            it('"blockSubmitWhenFormSending" = true', function() {
                _testBlockSubmitWhenFormSending({
                    blockSubmitWhenFormSending: true
                });
            });
            it('"blockSubmitWhenFormSending" = false', function() {
                _testBlockSubmitWhenFormSending({
                    blockSubmitWhenFormSending: false
                });
            });
            it('"validateAndAjaxWhenSubmit" = true', function() {
                _testValidateAndAjaxWhenSubmit({
                    fireValidateAndAjaxWhenSubmit: true
                });
            });
            it('"validateAndAjaxWhenSubmit" = false', function() {
                _testValidateAndAjaxWhenSubmit({
                    fireValidateAndAjaxWhenSubmit: false
                });
            });
            it('"resetFormAfterAjax" = true', function() {
                _testResetFormAfterAjax({
                    resetFormAfterAjax: true
                });
            });
            it('"resetFormAfterAjax" = false', function() {
                _testResetFormAfterAjax({
                    resetFormAfterAjax: false
                });
            });
        };
        function _testFocusIncorrectInput(options) {
            var inputElement = helper.form.getFormElementsByName("phone")[0];
            var feedback = new Feedback(helper.form.el, {
                focusIncorrectInput: options.focusIncorrectInput
            });
            spyOn(inputElement, "focus");
            feedback.schema({
                phone: function() {
                    return "Error";
                }
            });
            feedback.validate();
            if (options.focusIncorrectInput === true) {
                expect(inputElement.focus).toHaveBeenCalled();
            } else {
                expect(inputElement.focus).not.toHaveBeenCalled();
            }
            feedback = feedback.destroy();
        }
        function _testSchemaByTurn(options) {
            var feedback = new Feedback(helper.form.el, {
                fireSchemaByTurn: options.fireSchemaByTurn
            });
            var errorCount = 0;
            feedback.schema({
                phone: function() {
                    return "Error";
                },
                age: function() {
                    return "Error";
                }
            });
            feedback.validate({
                error: function() {
                    errorCount++;
                }
            });
            feedback.validate();
            if (options.fireSchemaByTurn === true) {
                expect(errorCount).toBe(1);
            } else {
                expect(errorCount).toBe(2);
            }
            feedback = feedback.destroy();
        }
        function _testValidateAndAjaxWhenSubmit(options) {
            var feedback = new Feedback(helper.form.el, {
                fireValidateAndAjaxWhenSubmit: options.fireValidateAndAjaxWhenSubmit
            });
            var validateAfter = jasmine.createSpy("validateAfter");
            var ajaxAfter = jasmine.createSpy("ajaxAfter");
            feedback.schema({
                phone: function() {}
            });
            feedback.validate({
                after: function() {
                    validateAfter();
                }
            });
            feedback.ajax({
                after: function() {
                    ajaxAfter();
                }
            });
            helper.triggerEvent(helper.form.el, "submit");
            if (options.fireValidateAndAjaxWhenSubmit === true) {
                helper.fakeAjax.respondWith({
                    status: 200
                });
                expect(validateAfter).toHaveBeenCalled();
                expect(ajaxAfter).toHaveBeenCalled();
            } else {
                expect(validateAfter).not.toHaveBeenCalled();
                expect(ajaxAfter).not.toHaveBeenCalled();
            }
            feedback = feedback.destroy();
        }
        function _testBlockSubmitWhenFormSending(options) {
            var feedback = new Feedback(helper.form.el, {
                blockSubmitWhenFormSending: options.blockSubmitWhenFormSending
            });
            var count = 0;
            feedback.ajax({
                before: function() {
                    count++;
                }
            });
            helper.triggerEvent(helper.form.el, "submit");
            helper.triggerEvent(helper.form.el, "submit");
            if (options.blockSubmitWhenFormSending === true) {
                expect(count).toBe(1);
            } else {
                expect(count).toBe(2);
            }
            feedback = feedback.destroy();
        }
        function _testResetFormAfterAjax(options) {
            var feedback = new Feedback(helper.form.el, {
                resetFormAfterAjax: options.resetFormAfterAjax
            });
            spyOn(helper.form.el, "reset");
            helper.triggerEvent(helper.form.el, "submit");
            helper.fakeAjax.respondWith({
                status: 200
            });
            if (options.resetFormAfterAjax === true) {
                expect(helper.form.el.reset).toHaveBeenCalled();
            } else {
                expect(helper.form.el.reset).not.toHaveBeenCalled();
            }
        }
    }, function(module, exports, __webpack_require__) {
        var helper = __webpack_require__(6);
        var Feedback = __webpack_require__(3);
        module.exports = function() {
            it('must have API "schema", "ajax", "update", "validate", "resetForm", "fireValidateError", "destroy"', function() {
                var feedback = new Feedback(helper.form.el);
                var fn = jasmine.any(Function);
                expect(feedback.schema).toEqual(fn);
                expect(feedback.ajax).toEqual(fn);
                expect(feedback.update).toEqual(fn);
                expect(feedback.validate).toEqual(fn);
                expect(feedback.resetForm).toEqual(fn);
                expect(feedback.fireValidateError).toEqual(fn);
                expect(feedback.destroy).toEqual(fn);
                feedback = feedback.destroy();
            });
            it('test API "schema"', function() {
                var feedback = new Feedback(helper.form.el);
                var fn = jasmine.any(Function);
                var callback = {
                    step_0: jasmine.createSpy("success"),
                    step_1: jasmine.createSpy("success")
                };
                var changed = jasmine.createSpy("success");
                feedback.update();
                feedback.schema({
                    age: fn
                });
                expect(feedback.options.schema[feedback.options.validationStep].age).toEqual(fn);
                feedback.schema("step-0", {
                    phone: function() {
                        callback.step_0();
                    }
                });
                feedback.schema("step-1", {
                    age: function() {
                        callback.step_1();
                    }
                });
                feedback.step("changed", changed);
                feedback.step("set", 1);
                feedback.validate();
                expect(callback.step_0).not.toHaveBeenCalled();
                expect(callback.step_1).toHaveBeenCalled();
                expect(changed).toHaveBeenCalled();
                feedback = feedback.destroy();
            });
            it('test API "step"', function() {
                var feedback = new Feedback(helper.form.el, {
                    schema: {
                        "step-0": {
                            login: function() {
                                callback.step_0();
                            }
                        },
                        "step-1": {
                            name: function() {
                                callback.step_1();
                            }
                        }
                    }
                });
                var callback = {
                    step_0: jasmine.createSpy("success"),
                    step_1: jasmine.createSpy("success"),
                    step_2: jasmine.createSpy("success")
                };
                helper.form.add.input({
                    name: "login",
                    type: "text",
                    value: "furashcka"
                });
                feedback.schema("step-2", {
                    age: function() {
                        callback.step_2();
                    }
                });
                feedback.update();
                expect(feedback.step("get")).toEqual(0);
                expect(feedback.step("next")).toEqual(true);
                expect(feedback.step("next")).toEqual(true);
                expect(feedback.step("next")).toEqual(false);
                expect(feedback.step("next")).toEqual(false);
                expect(feedback.step("next")).toEqual(false);
                expect(feedback.step("get")).toEqual(2);
                expect(feedback.step("prev")).toEqual(true);
                expect(feedback.step("prev")).toEqual(true);
                expect(feedback.step("prev")).toEqual(false);
                expect(feedback.step("prev")).toEqual(false);
                expect(feedback.step("prev")).toEqual(false);
                expect(feedback.step("get")).toEqual(0);
                feedback.step("set", 200);
                expect(feedback.step("get")).toEqual(2);
                expect(feedback.step("set", "sdfsdf")).toEqual(false);
                feedback = feedback.destroy();
            });
            it('test API "update"', function() {
                var feedback = new Feedback(helper.form.el);
                var obj = jasmine.any(Object);
                helper.form.add.input({
                    name: "price",
                    value: "15.00"
                });
                feedback.update();
                expect(feedback.inputsGroupedByName.price).toEqual(obj);
                feedback = feedback.destroy();
            });
            it('test API "validate"', function() {
                var feedback = new Feedback(helper.form.el);
                var callback = {
                    before: jasmine.createSpy("success"),
                    after: jasmine.createSpy("success"),
                    success: jasmine.createSpy("success"),
                    error: jasmine.createSpy("success")
                };
                feedback.schema({
                    age: function() {
                        if (this.isEmpty()) return "Error";
                    },
                    phone: function() {
                        if (this.get().value !== "7777-7777") return "Error";
                    }
                });
                feedback.validate({
                    before: function() {
                        callback.before();
                    },
                    after: function() {
                        callback.after();
                    },
                    success: function() {
                        callback.success();
                    },
                    error: function() {
                        callback.error();
                    }
                });
                expect(feedback.validate()).toEqual(false);
                expect(feedback.validate([ "phone" ])).toEqual(true);
                expect(callback.before).toHaveBeenCalled();
                expect(callback.after).toHaveBeenCalled();
                expect(callback.success).toHaveBeenCalled();
                expect(callback.error).toHaveBeenCalled();
                feedback = feedback.destroy();
            });
            it('test API "resetForm"', function() {
                var feedback = new Feedback(helper.form.el);
                var input = helper.form.getFormElementsByName("age")[0];
                input.value = 24;
                feedback.resetForm();
                expect(input.value).toBe("");
                feedback = feedback.destroy();
            });
            it('test API "fireValidateError"', function() {
                var feedback = new Feedback(helper.form.el);
                var errorFn = jasmine.createSpy("success");
                feedback.validate({
                    error: errorFn
                });
                feedback.fireValidateError("error");
                expect(errorFn).toHaveBeenCalled();
                feedback = feedback.destroy();
            });
            it('test API "destroy"', function() {
                var feedback = new Feedback(helper.form.el);
                feedback = feedback.destroy();
                expect(feedback).toBe(null);
            });
        };
    }, function(module, exports, __webpack_require__) {
        var helper = __webpack_require__(6);
        var Feedback = __webpack_require__(3);
        module.exports = function() {
            it('test "get"', function() {
                var feedback = new Feedback(helper.form.el);
                var inputVal = "";
                feedback.schema({
                    phone: function() {
                        inputVal = this.get().value;
                    }
                });
                feedback.validate();
                expect(inputVal).toEqual("7777-7777");
                feedback = feedback.destroy();
            });
            it('test "isAnyChecked"', function() {
                var feedback = new Feedback(helper.form.el);
                var isAnyChecked = null;
                helper.form.add.input({
                    name: "types",
                    type: "checkbox",
                    value: "1"
                });
                helper.form.add.input({
                    name: "types",
                    type: "checkbox",
                    value: "2"
                });
                feedback.update();
                feedback.schema({
                    types: function() {
                        isAnyChecked = this.isAnyChecked();
                    }
                });
                feedback.validate();
                expect(isAnyChecked).toEqual(false);
                helper.form.add.input({
                    name: "types",
                    type: "checkbox",
                    checked: true,
                    value: "3"
                });
                feedback.update();
                feedback.validate();
                expect(isAnyChecked).toEqual(true);
                feedback = feedback.destroy();
            });
            it('test "forEach"', function() {
                var feedback = new Feedback(helper.form.el);
                var arr = [];
                helper.form.add.input({
                    name: "types",
                    type: "checkbox",
                    value: "1"
                });
                helper.form.add.input({
                    name: "types",
                    type: "checkbox",
                    value: "2"
                });
                feedback.update();
                feedback.schema({
                    types: function() {
                        this.forEach(function(input) {
                            arr.push(input.value);
                        });
                    }
                });
                feedback.validate();
                expect(arr).toEqual([ "1", "2" ]);
                feedback = feedback.destroy();
            });
        };
    }, function(module, exports, __webpack_require__) {
        var helper = __webpack_require__(6);
        var Feedback = __webpack_require__(3);
        module.exports = function() {
            beforeEach(function() {
                helper.fakeAjax.install();
            });
            afterEach(function() {
                helper.fakeAjax.uninstall();
            });
            it("send only one input", function() {
                var feedback = new Feedback(helper.form.el);
                helper.form.clear();
                helper.form.add.input({
                    name: "login",
                    value: "f-cka"
                });
                helper.form.add.input({
                    name: "age",
                    value: "18"
                });
                feedback.update();
                feedback.ajax({
                    method: "GET",
                    url: helper.serverURL
                });
                feedback.ajax([ "login" ]);
                helper.fakeAjax.respondWith({
                    status: 200
                });
                expect(helper.fakeAjax.getCurrentInstance().url).toBe(helper.serverURL + "?login=f-cka");
                feedback = feedback.destroy();
            });
            it('test "loadingClass" option', function() {
                var feedback = new Feedback(helper.form.el);
                var success = jasmine.createSpy("success");
                feedback.ajax({
                    loadingClass: "show-loader",
                    success: function() {
                        success();
                    }
                });
                feedback.ajax();
                expect(helper.form.el.className).toBe("show-loader");
                helper.fakeAjax.respondWith({
                    status: 200
                });
                expect(success).toHaveBeenCalled();
                expect(helper.form.el.className.trim()).toBe("");
                feedback = feedback.destroy();
            });
            it('test "url" option', function() {
                var feedback = new Feedback(helper.form.el);
                feedback.ajax({
                    url: helper.serverURL
                });
                expect(feedback.options.ajax.url).toBe(helper.serverURL);
                feedback = feedback.destroy();
            });
            it('test "method" option', function() {
                var feedback = new Feedback(helper.form.el);
                var success = jasmine.createSpy("success");
                helper.form.clear();
                helper.form.add.input({
                    name: "age",
                    value: "15"
                });
                feedback.update();
                feedback.ajax({
                    url: helper.serverURL,
                    method: "GET",
                    success: function() {
                        success();
                    }
                });
                feedback.ajax();
                helper.fakeAjax.respondWith({
                    status: 200
                });
                expect(helper.fakeAjax.getCurrentInstance().url).toBe(helper.serverURL + "?age=15");
                feedback = feedback.destroy();
            });
            it('test "before", "after", "success", "error", "progress" events', function() {
                var feedback = new Feedback(helper.form.el);
                var callback = {
                    before: jasmine.createSpy("success"),
                    after: jasmine.createSpy("success"),
                    success: jasmine.createSpy("success"),
                    error: jasmine.createSpy("success"),
                    progress: jasmine.createSpy("success")
                };
                feedback.ajax({
                    before: function() {
                        callback.before();
                    },
                    after: function() {
                        callback.after();
                    },
                    success: function() {
                        callback.success();
                    },
                    error: function() {
                        callback.error();
                    },
                    progress: function() {
                        callback.progress();
                    }
                });
                feedback.ajax();
                helper.fakeAjax.respondWith({
                    status: 200
                });
                if (helper.isProgressEventSupport()) {
                    jasmine.Ajax.requests.mostRecent().upload.onprogress({
                        loaded: 100,
                        total: 100
                    });
                    expect(callback.progress).toHaveBeenCalled();
                }
                feedback.ajax();
                helper.fakeAjax.respondWith({
                    status: 404
                });
                expect(callback.before).toHaveBeenCalled();
                expect(callback.after).toHaveBeenCalled();
                expect(callback.success).toHaveBeenCalled();
                expect(callback.error).toHaveBeenCalled();
                feedback = feedback.destroy();
            });
        };
    }, function(module, exports, __webpack_require__) {
        var helper = __webpack_require__(6);
        var Feedback = __webpack_require__(3);
        module.exports = function() {
            beforeEach(function() {
                helper.fakeAjax.install();
            });
            afterEach(function() {
                helper.fakeAjax.uninstall();
            });
            it('test "progress" event if "iframePolyfill" = true', function() {
                var feedback = new Feedback(helper.form.el);
                var success = jasmine.createSpy("success");
                feedback.ajax({
                    url: helper.serverURL,
                    iframePolyfill: true,
                    progress: function() {
                        success();
                    }
                });
                feedback.ajax();
                feedback.iframe.onload();
                expect(success).toHaveBeenCalled();
            });
            it('test "iframePolyfill" = auto', function() {
                _test({
                    ajax: {
                        iframePolyfill: "auto"
                    }
                });
            });
            it('test "iframePolyfill" = auto; with input[type="file"]', function() {
                helper.form.add.input({
                    name: "avatar",
                    type: "file"
                });
                _test({
                    ajax: {
                        iframePolyfill: "auto"
                    }
                });
            });
            it('test "iframePolyfill" = true', function() {
                _test({
                    ajax: {
                        iframePolyfill: true
                    }
                });
            });
            it('test "iframePolyfill" = false', function() {
                _test({
                    ajax: {
                        iframePolyfill: false
                    }
                });
            });
            it('test "iframePolyfill" = false; with input[type="file"]', function() {
                helper.form.add.input({
                    name: "avatar",
                    type: "file"
                });
                _test({
                    ajax: {
                        iframePolyfill: false
                    }
                });
            });
        };
        function _test(options, addInputsCallback) {
            var feedback = new Feedback(helper.form.el);
            var ajaxType = null;
            var hasFile = null;
            hasFile = _formHasInputWithFileType(helper.form.el);
            spyOn(console, "warn");
            feedback.ajax({
                url: helper.serverURL,
                method: "POST",
                success: function(e) {
                    ajaxType = e.type;
                }
            });
            feedback.ajax(options.ajax);
            feedback.ajax();
            if (!feedback.iframe) {
                helper.fakeAjax.respondWith({
                    status: 200
                });
            } else {
                feedback.iframe.onload();
            }
            if (options.ajax.iframePolyfill === "auto") {
                if (!helper.isCantUseFormData()) {
                    expect(ajaxType).toBe("ajax.2.0");
                } else {
                    if (hasFile) {
                        expect(console.warn).toHaveBeenCalledWith("You can't use XMLHttpRequest 2.0 because browser not support it. Used polyfill ajax iframe.");
                        expect(ajaxType).toBe("ajax.iframe");
                    } else {
                        expect(ajaxType).toBe("ajax.1.0");
                    }
                }
            } else if (options.ajax.iframePolyfill === true) {
                expect(ajaxType).toBe("ajax.iframe");
            } else {
                expect([ "ajax.1.0", "ajax.2.0" ]).toContain(ajaxType);
                if (hasFile && ajaxType === "ajax.1.0") {
                    expect(console.warn).toHaveBeenCalledWith("Ignoring inputs with file type, because used XMLHttpRequest 1.0");
                }
            }
        }
        function _formHasInputWithFileType(form) {
            return form.querySelectorAll('input[type="file"]').length > 0;
        }
    }, function(module, exports, __webpack_require__) {
        var helper = __webpack_require__(6);
        var Feedback = __webpack_require__(3);
        module.exports = function() {
            beforeEach(function() {
                helper.fakeAjax.install();
                jasmine.DEFAULT_TIMEOUT_INTERVAL = 6e4;
            });
            afterEach(function() {
                helper.fakeAjax.uninstall();
                jasmine.DEFAULT_TIMEOUT_INTERVAL = 5e3;
            });
            if (helper.isInternetExplorerBrowser() === 9) {
                it('test cross domain (only IE9) "iframePolyfill" = true; "iframeTimeout" = 0; "iframePostMessage" = false;', function(done) {
                    var feedback = new Feedback(helper.form.el);
                    spyOn(console, "warn");
                    spyOn(console, "error");
                    feedback.ajax({
                        url: "https://www.google.com/",
                        iframePolyfill: true,
                        iframeTimeout: 0,
                        iframePostMessage: false
                    });
                    feedback.ajax();
                    feedback.iframe.addEventListener("load", function() {
                        done();
                        expect(console.warn).toHaveBeenCalledWith("You need use postMessage, read more - https://furashcka.github.io/feedback.js/docs/");
                        expect(console.error).toHaveBeenCalled();
                        feedback = feedback.destroy();
                    });
                });
            }
            it('test (iframe abort by timeout) "iframePolyfill" = true; "iframeTimeout" = 10; "iframePostMessage" = false;', function(done) {
                var feedback = new Feedback(helper.form.el);
                var statusText = "";
                feedback.ajax({
                    url: helper.serverURL,
                    iframePolyfill: true,
                    iframeTimeout: 10,
                    iframePostMessage: false,
                    error: function(e) {
                        statusText = e.xhr.statusText;
                    }
                });
                feedback.ajax();
                setTimeout(function() {
                    done();
                    expect(statusText).toBe("abort");
                    feedback = feedback.destroy();
                }, 11);
            });
            it('test (window.postMessage) "iframePolyfill" = true; "iframeTimeout" = 60000; "iframePostMessage" = true;', function(done) {
                var feedback = new Feedback(helper.form.el);
                feedback.ajax({
                    url: helper.serverURL + "?use_post_message=1",
                    iframePolyfill: true,
                    iframeTimeout: 6e4,
                    iframePostMessage: true,
                    success: function(e) {
                        done();
                        expect(e.xhr.status).toBe(200);
                        expect(e.xhr.responseText).toBe('{"Request Method":"POST","args":{"phone":"7777-7777","age":""}}');
                        feedback = feedback.destroy();
                    }
                });
                feedback.ajax();
            });
            it('test (window.postMessage result type not a text, show error) "iframePolyfill" = true; "iframeTimeout" = 60000; "iframePostMessage" = true;', function(done) {
                var feedback = new Feedback(helper.form.el);
                spyOn(console, "error");
                window.addEventListener("message", function() {
                    expect(console.error).toHaveBeenCalledWith("You must return text in post message");
                    done();
                    feedback = feedback.destroy();
                });
                feedback.ajax({
                    url: helper.serverURL + "?use_post_message=1&need_incorrect_data=1",
                    iframePolyfill: true,
                    iframeTimeout: 6e4,
                    iframePostMessage: true
                });
                feedback.ajax();
            });
        };
    }, function(module, exports, __webpack_require__) {
        var helper = __webpack_require__(6);
        var getInputsGroupedByName = __webpack_require__(10);
        var serialize = __webpack_require__(5);
        module.exports = function() {
            _test(function(form) {
                form.add.input({
                    type: "text",
                    name: "name",
                    value: "Evgeny Krylov"
                });
            }).run({
                desc: "input type text",
                toBe: "name=Evgeny+Krylov"
            });
            _test(function(form) {
                form.add.input({
                    type: "text",
                    name: "name",
                    value: "Evgeny Krylov",
                    disabled: true
                });
            }).run({
                desc: "disabled input type text",
                toBe: ""
            });
            _test(function(form) {
                form.add.input({
                    type: "radio",
                    name: "sex",
                    value: "female"
                });
                form.add.input({
                    type: "radio",
                    name: "sex",
                    value: "male"
                });
            }).run({
                desc: "not checked input type radio",
                toBe: ""
            });
            _test(function(form) {
                form.add.input({
                    type: "radio",
                    name: "sex",
                    value: "female",
                    checked: true
                });
                form.add.input({
                    type: "radio",
                    name: "sex",
                    value: "male"
                });
            }).run({
                desc: "checked input type radio",
                toBe: "sex=female"
            });
            _test(function(form) {
                form.add.input({
                    type: "radio",
                    name: "sex",
                    value: "female",
                    checked: true,
                    disabled: true
                });
                form.add.input({
                    type: "radio",
                    name: "sex",
                    value: "male",
                    checked: true,
                    disabled: true
                });
            }).run({
                desc: "checked disabled input type radio",
                toBe: ""
            });
            _test(function(form) {
                form.add.input({
                    type: "checkbox",
                    name: "country[]",
                    value: "United Kingdom",
                    checked: true
                });
                form.add.input({
                    type: "checkbox",
                    name: "country[]",
                    value: "Germany",
                    checked: true
                });
            }).run({
                desc: "checked 2 inputs type checkbox, must be array",
                toBe: "country%5B%5D=United+Kingdom&country%5B%5D=Germany"
            });
            _test(function(form) {
                form.add.select({
                    name: "language"
                }).add.option({
                    text: "php",
                    value: "php"
                }).add.option({
                    text: "javascript",
                    value: "javascript",
                    selected: true
                }).add.option({
                    text: "css",
                    value: "css"
                });
            }).run({
                desc: "select-one test",
                toBe: "language=javascript"
            });
            _test(function(form) {
                form.add.select({
                    name: "language",
                    disabled: true
                }).add.option({
                    text: "php",
                    value: "php"
                }).add.option({
                    text: "javascript",
                    value: "javascript",
                    selected: true
                }).add.option({
                    text: "css",
                    value: "css"
                });
            }).run({
                desc: "disabled select-one test",
                toBe: ""
            });
            _test(function(form) {
                form.add.select({
                    name: "language[]",
                    multiple: true
                }).add.option({
                    text: "php",
                    value: "php",
                    selected: true
                }).add.option({
                    text: "javascript",
                    value: "javascript",
                    selected: true
                }).add.option({
                    text: "css",
                    value: "css"
                });
            }).run({
                desc: "select-multiple test",
                toBe: "language%5B%5D=php&language%5B%5D=javascript"
            });
        };
        function _test(fn) {
            helper.form.clear();
            fn(helper.form);
            var res = serialize({
                inputsGroupedByName: getInputsGroupedByName(helper.form.el)
            });
            return {
                run: function(obj) {
                    it(obj.desc, function() {
                        expect(res).toBe(obj.toBe);
                    });
                }
            };
        }
    } ]);
});
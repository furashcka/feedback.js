/*!
 * license: MIT
 * https://furashcka.github.io/feedback.js/docs/
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
        return __webpack_require__(__webpack_require__.s = 4);
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
            isArray: _isArray,
            isBoolean: _isBoolean,
            isObject: _isObject,
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
            var len = "length" in obj ? obj.length : keys.length;
            for (var i = 0; i < len; i++) {
                var key = keys[i];
                var val = obj[key];
                var res = fn.call(val, val, key);
                if (res === false) break;
            }
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
    }, function(module, exports) {
        module.exports = function(self) {
            self.options.resetFormAfterAjax && self.form.reset();
        };
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
        var consoleObj = __webpack_require__(5);
        var getInputsGroupedByName = __webpack_require__(12);
        var helper = __webpack_require__(1);
        module.exports = function(form, options) {
            consoleObj.firstArgumentMustBeFormElement(form);
            consoleObj.incorrectSubmitButtonName(form);
            var self = this;
            helper.addFeedback2List(self);
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
            _updateFormAttributes(self.form, self.options.ajax.url, self.options.ajax.method);
            self.update();
            if (self.options.fireValidateAndAjaxWhenSubmit === true) {
                self.submitFn = function(e) {
                    var isLoading = helper.hasClass(self.form, self.options.ajax.loadingClass);
                    e.preventDefault();
                    if (self.options.blockSubmitWhenFormSending === true && isLoading) {
                        return false;
                    }
                    if (self.validate() === true) {
                        self.ajax();
                    }
                };
                self.form.addEventListener("submit", self.submitFn);
            }
        };
        module.exports.prototype.schema = function(schema) {
            this.options.schema = schema || this.options.schema;
            return this;
        };
        module.exports.prototype.ajax = function(ajax) {
            if (typeof ajax === "undefined") {
                return __webpack_require__(13).call(this);
            }
            this.options.ajax = helper.extend(this.options.ajax, ajax || {});
            this.options.ajax.method = this.options.ajax.method.toUpperCase();
            _updateFormAttributes(this.form, this.options.ajax.url, this.options.ajax.method);
            return this;
        };
        module.exports.prototype.validate = function(validate) {
            if (typeof validate === "undefined" || helper.isArray(validate)) {
                return __webpack_require__(17).call(this, validate);
            }
            this.options.validate = helper.extend(this.options.validate, validate || {});
            return this;
        };
        module.exports.prototype.update = function() {
            var addValidateApi = __webpack_require__(18);
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
            __webpack_require__(2)(this);
            return this;
        };
        module.exports.prototype.destroy = function() {
            this.form.removeEventListener("submit", this.submitFn);
            this.iframe && this.iframe.parentNode.removeChild(this.iframe);
            return null;
        };
        function _updateFormAttributes(form, action, method) {
            form.setAttribute("novalidate", "");
            form.setAttribute("action", action);
            form.setAttribute("method", method);
        }
    }, function(module, exports) {
        module.exports = {
            firstArgumentMustBeFormElement: function(el) {
                if (!el || !el.nodeName || el.nodeName !== "FORM") {
                    throw "First argument must be a form element!";
                }
            },
            incorrectSubmitButtonName: function(el) {
                var hasElementWithSubmitName = el.querySelector('[name="submit"]');
                if (hasElementWithSubmitName) {
                    throw "Element with attribute name = submit not allowed";
                }
            },
            showWarningWhenFormHasInputWithFileTypeAndNeedAjaxPolyfill: function() {
                console.warn("You can't use XMLHttpRequest 2.0 because browser not support it. Used polyfill ajax iframe.");
            },
            showWarningWhenIgnoringInputWithFileType: function() {
                console.warn("Ignoring inputs with file type, because used XMLHttpRequest 1.0");
            },
            youMustReturnTextInPostMessage: function() {
                throw "You must return text in post message";
            },
            youNeedUsePostMessage: function() {
                console.warn("You need use postMessage, read more - https://furashcka.github.io/feedback.js/docs/");
            }
        };
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
    }, , function(module, exports, __webpack_require__) {
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
        var _merge = _interopRequireDefault(__webpack_require__(3));
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
    }, function(module, exports, __webpack_require__) {
        var consoleObj = __webpack_require__(5);
        var helper = __webpack_require__(1);
        var ajaxFnList = {
            iframe: __webpack_require__(14),
            XMLHttpRequest: __webpack_require__(15),
            XDomainRequest: __webpack_require__(16)
        };
        module.exports = function() {
            var self = this;
            var ajaxFn = _detectAjaxFn(self);
            ajaxFnList[ajaxFn](self);
        };
        function _detectAjaxFn(self) {
            var hasFileType = _formHasInputWithFileType(self);
            var isAutoUsePolyfill = hasFileType && self.options.ajax.iframePolyfill === "auto" && helper.cantUseFormData();
            var isNeedUseXDomainRequest = _isNeedUseXDomainRequest(self);
            if (self.options.ajax.iframePolyfill === true || isAutoUsePolyfill) {
                isAutoUsePolyfill && consoleObj.showWarningWhenFormHasInputWithFileTypeAndNeedAjaxPolyfill();
                return "iframe";
            }
            if (isNeedUseXDomainRequest) {
                return "XDomainRequest";
            }
            if (helper.cantUseFormData() && hasFileType) {
                consoleObj.showWarningWhenIgnoringInputWithFileType();
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
    }, function(module, exports, __webpack_require__) {
        var consoleObj = __webpack_require__(5);
        var helper = __webpack_require__(1);
        var resetForm = __webpack_require__(2);
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
                            consoleObj.youNeedUsePostMessage();
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
                    consoleObj.youMustReturnTextInPostMessage();
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
            resetForm(self);
        }
    }, function(module, exports, __webpack_require__) {
        var helper = __webpack_require__(1);
        var resetForm = __webpack_require__(2);
        var serialize = __webpack_require__(7);
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
                resetForm(self);
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
        var resetForm = __webpack_require__(2);
        var serialize = __webpack_require__(7);
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
            resetForm(self);
        }
    }, function(module, exports, __webpack_require__) {
        var helper = __webpack_require__(1);
        module.exports = function(validateOnlySchemaItems) {
            var self = this;
            var schema = _resolveSchema(self, self.options.schema, validateOnlySchemaItems);
            var firstInvalidInput = null;
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
                    schema[key] = self.options.schema[key];
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
        var createValidateObject = __webpack_require__(19);
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
                return __webpack_require__(20)(this.get().value, seed);
            },
            equals: function(comparison) {
                return __webpack_require__(21)(this.get().value, comparison);
            },
            isAlpha: function(locale) {
                return __webpack_require__(22).default(this.get().value, locale);
            },
            isAlphanumeric: function(locale) {
                return __webpack_require__(23).default(this.get().value, locale);
            },
            isCreditCard: function() {
                return __webpack_require__(24)(this.get().value);
            },
            isEmail: function(options) {
                return __webpack_require__(25)(this.get().value, options);
            },
            isEmpty: function() {
                return __webpack_require__(27)(this.get().value, {
                    ignore_whitespace: true
                });
            },
            isFloat: function() {
                return __webpack_require__(28).default(this.get().value);
            },
            isIn: function(values) {
                return __webpack_require__(29).default(this.get().value, values);
            },
            isInt: function(options) {
                return __webpack_require__(30).default(this.get().value, options);
            },
            isMobilePhone: function(options) {
                return __webpack_require__(31).default(this.get().value, options);
            },
            isNumeric: function(options) {
                return __webpack_require__(32).default(this.get().value, options);
            },
            isURL: function(options) {
                return __webpack_require__(33).default(this.get().value, options);
            },
            matches: function(pattern, modifiers) {
                return __webpack_require__(34).default(this.get().value, pattern, modifiers);
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
        var _toString = _interopRequireDefault(__webpack_require__(9));
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
        var _alpha = __webpack_require__(6);
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
        var _alpha = __webpack_require__(6);
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
        var _merge = _interopRequireDefault(__webpack_require__(3));
        var _isByteLength = _interopRequireDefault(__webpack_require__(26));
        var _isFQDN = _interopRequireDefault(__webpack_require__(10));
        var _isIP = _interopRequireDefault(__webpack_require__(11));
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
        var _merge = _interopRequireDefault(__webpack_require__(3));
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
        var _alpha = __webpack_require__(6);
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
        var _toString = _interopRequireDefault(__webpack_require__(9));
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
        var _isFQDN = _interopRequireDefault(__webpack_require__(10));
        var _isIP = _interopRequireDefault(__webpack_require__(11));
        var _merge = _interopRequireDefault(__webpack_require__(3));
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
    } ]);
});
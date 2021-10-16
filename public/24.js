(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[24],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/auth/NewRegister.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/auth/NewRegister.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "NewRegister",
  title: "Bus Finder - Register",
  data: function data() {
    return {
      registerData: {
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        user_role_id: ''
      },
      errors: {}
    };
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_1__["mapState"])({
    message: function message(state) {
      return state.success_message;
    }
  })),
  methods: {
    register: function () {
      var _register = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var _this = this;

        var formData;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                formData = new FormData();
                formData.append('name', this.registerData.name);
                formData.append('email', this.registerData.email);
                formData.append('phone', this.registerData.phone);
                formData.append('user_role_id', this.registerData.user_role_id);
                formData.append('password', this.registerData.password);
                formData.append('password_confirmation', this.registerData.password_confirmation);
                _context.next = 10;
                return this.$store.dispatch('add_user', formData).then(function () {
                  _this.$swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: _this.message,
                    showConfirmButton: false,
                    timer: 1500
                  });

                  _this.registerData = {};

                  _this.$router.push('/');
                });

              case 10:
                _context.next = 21;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](0);
                _context.t1 = _context.t0.response.status;
                _context.next = _context.t1 === 422 ? 17 : 19;
                break;

              case 17:
                this.errors = _context.t0.response.data.errors;
                return _context.abrupt("break", 21);

              case 19:
                this.$swal.fire({
                  icon: 'error',
                  text: 'Oops',
                  title: _context.t0.response.data.error
                });
                return _context.abrupt("break", 21);

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 12]]);
      }));

      function register() {
        return _register.apply(this, arguments);
      }

      return register;
    }()
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/auth/NewRegister.vue?vue&type=template&id=3c3be54a&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/auth/NewRegister.vue?vue&type=template&id=3c3be54a& ***!
  \**************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { attrs: { id: "new-register" } }, [
    _c(
      "div",
      { staticClass: "register-box", staticStyle: { "margin-top": "90px" } },
      [
        _vm._m(0),
        _vm._v(" "),
        _c("div", { staticClass: "card" }, [
          _c(
            "div",
            { staticClass: "card-body register-card-body" },
            [
              _c("p", { staticClass: "login-box-msg" }, [
                _vm._v("Register a new membership")
              ]),
              _vm._v(" "),
              _c(
                "form",
                {
                  on: {
                    submit: function($event) {
                      $event.preventDefault()
                      return _vm.register($event)
                    }
                  }
                },
                [
                  _c("div", { staticClass: "input-group mb-3" }, [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.registerData.name,
                          expression: "registerData.name"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        type: "text",
                        name: "name",
                        placeholder: "Full name"
                      },
                      domProps: { value: _vm.registerData.name },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.registerData,
                            "name",
                            $event.target.value
                          )
                        }
                      }
                    }),
                    _vm._v(" "),
                    _vm._m(1)
                  ]),
                  _vm._v(" "),
                  _vm.errors.name
                    ? _c("span", { staticClass: "text-danger" }, [
                        _vm._v(_vm._s(_vm.errors.name[0]))
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c("div", { staticClass: "input-group mb-3" }, [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.registerData.email,
                          expression: "registerData.email"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        type: "email",
                        name: "email",
                        placeholder: "Email"
                      },
                      domProps: { value: _vm.registerData.email },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.registerData,
                            "email",
                            $event.target.value
                          )
                        }
                      }
                    }),
                    _vm._v(" "),
                    _vm._m(2)
                  ]),
                  _vm._v(" "),
                  _vm.errors.email
                    ? _c("span", { staticClass: "text-danger" }, [
                        _vm._v(_vm._s(_vm.errors.email[0]))
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c("div", { staticClass: "input-group mb-3" }, [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.registerData.phone,
                          expression: "registerData.phone"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        type: "number",
                        name: "phone",
                        placeholder: "Phone"
                      },
                      domProps: { value: _vm.registerData.phone },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.registerData,
                            "phone",
                            $event.target.value
                          )
                        }
                      }
                    }),
                    _vm._v(" "),
                    _vm._m(3)
                  ]),
                  _vm._v(" "),
                  _vm.errors.phone
                    ? _c("span", { staticClass: "text-danger" }, [
                        _vm._v(_vm._s(_vm.errors.phone[0]))
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c("div", { staticClass: "input-group mb-3" }, [
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.registerData.user_role_id,
                            expression: "registerData.user_role_id"
                          }
                        ],
                        staticClass: "form-control",
                        attrs: { name: "user_role_id" },
                        on: {
                          change: function($event) {
                            var $$selectedVal = Array.prototype.filter
                              .call($event.target.options, function(o) {
                                return o.selected
                              })
                              .map(function(o) {
                                var val = "_value" in o ? o._value : o.value
                                return val
                              })
                            _vm.$set(
                              _vm.registerData,
                              "user_role_id",
                              $event.target.multiple
                                ? $$selectedVal
                                : $$selectedVal[0]
                            )
                          }
                        }
                      },
                      [
                        _c("option", { attrs: { value: "" } }, [
                          _vm._v("Select Role")
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "2" } }, [
                          _vm._v("Driver")
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "3" } }, [
                          _vm._v("Bus Owner")
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "4" } }, [
                          _vm._v("Customer")
                        ])
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "input-group mb-3" }, [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.registerData.password,
                          expression: "registerData.password"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        type: "password",
                        name: "password",
                        placeholder: "Password"
                      },
                      domProps: { value: _vm.registerData.password },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.registerData,
                            "password",
                            $event.target.value
                          )
                        }
                      }
                    }),
                    _vm._v(" "),
                    _vm._m(4)
                  ]),
                  _vm._v(" "),
                  _vm.errors.password
                    ? _c("span", { staticClass: "text-danger" }, [
                        _vm._v(_vm._s(_vm.errors.password[0]))
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c("div", { staticClass: "input-group mb-3" }, [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.registerData.password_confirmation,
                          expression: "registerData.password_confirmation"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        type: "password",
                        name: "password_confirmation",
                        placeholder: "Retype password"
                      },
                      domProps: {
                        value: _vm.registerData.password_confirmation
                      },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.registerData,
                            "password_confirmation",
                            $event.target.value
                          )
                        }
                      }
                    }),
                    _vm._v(" "),
                    _vm._m(5)
                  ]),
                  _vm._v(" "),
                  _vm.errors.password_confirmation
                    ? _c("span", { staticClass: "text-danger" }, [
                        _vm._v(_vm._s(_vm.errors.password_confirmation[0]))
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm._m(6)
                ]
              ),
              _vm._v(" "),
              _vm._m(7),
              _vm._v(" "),
              _c(
                "router-link",
                { staticClass: "text-center", attrs: { to: "/" } },
                [_vm._v("I already have a membership")]
              )
            ],
            1
          )
        ])
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "register-logo" }, [
      _c("a", { attrs: { href: "" } }, [
        _c("b", [_vm._v("Bus Finder")]),
        _vm._v("Register")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-append" }, [
      _c("div", { staticClass: "input-group-text" }, [
        _c("span", { staticClass: "fas fa-user" })
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-append" }, [
      _c("div", { staticClass: "input-group-text" }, [
        _c("span", { staticClass: "fas fa-envelope" })
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-append" }, [
      _c("div", { staticClass: "input-group-text" }, [
        _c("span", { staticClass: "fas fa-phone" })
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-append" }, [
      _c("div", { staticClass: "input-group-text" }, [
        _c("span", { staticClass: "fas fa-lock" })
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-append" }, [
      _c("div", { staticClass: "input-group-text" }, [
        _c("span", { staticClass: "fas fa-lock" })
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-8" }, [
        _c("div", { staticClass: "icheck-primary" }, [
          _c("input", {
            attrs: {
              type: "checkbox",
              id: "agreeTerms",
              name: "terms",
              value: "agree"
            }
          }),
          _vm._v(" "),
          _c("label", { attrs: { for: "agreeTerms" } }, [
            _vm._v("\n                                    I agree to the "),
            _c("a", { attrs: { href: "#" } }, [_vm._v("terms")])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-4" }, [
        _c(
          "button",
          {
            staticClass: "btn btn-primary btn-block",
            attrs: { type: "submit" }
          },
          [_vm._v("Register")]
        )
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "social-auth-links text-center" }, [
      _c("p", [_vm._v("- OR -")]),
      _vm._v(" "),
      _c(
        "a",
        { staticClass: "btn btn-block btn-primary", attrs: { href: "#" } },
        [
          _c("i", { staticClass: "fab fa-facebook mr-2" }),
          _vm._v(
            "\n                        Sign up using Facebook\n                    "
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "a",
        { staticClass: "btn btn-block btn-danger", attrs: { href: "#" } },
        [
          _c("i", { staticClass: "fab fa-google-plus mr-2" }),
          _vm._v(
            "\n                        Sign up using Google+\n                    "
          )
        ]
      )
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/auth/NewRegister.vue":
/*!*************************************************!*\
  !*** ./resources/js/views/auth/NewRegister.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewRegister_vue_vue_type_template_id_3c3be54a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewRegister.vue?vue&type=template&id=3c3be54a& */ "./resources/js/views/auth/NewRegister.vue?vue&type=template&id=3c3be54a&");
/* harmony import */ var _NewRegister_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewRegister.vue?vue&type=script&lang=js& */ "./resources/js/views/auth/NewRegister.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NewRegister_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NewRegister_vue_vue_type_template_id_3c3be54a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NewRegister_vue_vue_type_template_id_3c3be54a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/auth/NewRegister.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/auth/NewRegister.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/views/auth/NewRegister.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewRegister_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./NewRegister.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/auth/NewRegister.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewRegister_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/auth/NewRegister.vue?vue&type=template&id=3c3be54a&":
/*!********************************************************************************!*\
  !*** ./resources/js/views/auth/NewRegister.vue?vue&type=template&id=3c3be54a& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewRegister_vue_vue_type_template_id_3c3be54a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./NewRegister.vue?vue&type=template&id=3c3be54a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/auth/NewRegister.vue?vue&type=template&id=3c3be54a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewRegister_vue_vue_type_template_id_3c3be54a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewRegister_vue_vue_type_template_id_3c3be54a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
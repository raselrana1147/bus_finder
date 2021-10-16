(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/bus_driver/EditBusDriver.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/bus_driver/EditBusDriver.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
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

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "EditBusDriver",
  title: "Bus Finder - Edit Bus Finder",
  data: function data() {
    return {
      errors: {}
    };
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_1__["mapState"])({
    current_driver: function current_driver(state) {
      return state.bus_driver.current_driver;
    },
    editBusDriver: function editBusDriver(state) {
      return state.bus_driver.bus_assign_to_d;
    },
    bus_number: function bus_number(state) {
      return state.bus_driver.bus_number;
    },
    bus_numbers: function bus_numbers(state) {
      return state.bus_driver.all_bus_numbers;
    },
    bus_groups: function bus_groups(state) {
      return state.bus_owner.bus_groups;
    },
    message: function message(state) {
      return state.bus_driver.success_message;
    }
  })),
  mounted: function mounted() {
    this.getBusGroups();
    this.getEditBusAssign(this.$route.params.id);
    this.getAllBusNumber();
    this.getDriver(this.$route.params.user_id);
  },
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_1__["mapActions"])({
    getBusGroups: 'bus_owner/get_bus_gourp',
    getEditBusAssign: 'bus_driver/getEditBusAssign',
    getDriver: 'bus_driver/get_Assign_driver'
  })), {}, {
    getAllBusNumber: function () {
      var _getAllBusNumber = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var bus_group_id;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                bus_group_id = this.$route.params.id;
                _context.next = 4;
                return this.$store.dispatch('bus_driver/get_all_bus_number', bus_group_id);

              case 4:
                _context.next = 9;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 6]]);
      }));

      function getAllBusNumber() {
        return _getAllBusNumber.apply(this, arguments);
      }

      return getAllBusNumber;
    }(),
    getBusNumber: function () {
      var _getBusNumber = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var bus_group_id;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                bus_group_id = this.editBusDriver.bus_group_id;
                _context2.next = 4;
                return this.$store.dispatch('bus_driver/get_bus_number', bus_group_id);

              case 4:
                this.editBusDriver.bus_assign_id = '';
                _context2.next = 10;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                console.log(_context2.t0);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 7]]);
      }));

      function getBusNumber() {
        return _getBusNumber.apply(this, arguments);
      }

      return getBusNumber;
    }(),
    editBusAssignDriver: function () {
      var _editBusAssignDriver = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        var _this = this;

        var id, user_id, formData;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                id = this.$route.params.id;
                user_id = this.$route.params.user_id;
                formData = new FormData();
                formData.append('bus_group_id', this.editBusDriver.bus_group_id);
                formData.append('bus_assign_id', this.editBusDriver.bus_assign_id);
                formData.append('bus_driver_id', user_id);
                formData.append('assign_date', this.editBusDriver.assign_date);
                _context3.next = 10;
                return this.$store.dispatch('bus_driver/update_bus_driver', {
                  id: id,
                  data: formData
                }).then(function () {
                  _this.$swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: _this.message,
                    showConfirmButton: false,
                    timer: 1500
                  });

                  _this.getEditBusAssign(id);
                });

              case 10:
                _context3.next = 21;
                break;

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](0);
                _context3.t1 = _context3.t0.response.status;
                _context3.next = _context3.t1 === 422 ? 17 : 19;
                break;

              case 17:
                this.errors = _context3.t0.response.data.errors;
                return _context3.abrupt("break", 21);

              case 19:
                this.$swal.fire({
                  icon: 'error',
                  text: 'Oops',
                  title: _context3.t0.response.data.error
                });
                return _context3.abrupt("break", 21);

              case 21:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 12]]);
      }));

      function editBusAssignDriver() {
        return _editBusAssignDriver.apply(this, arguments);
      }

      return editBusAssignDriver;
    }()
  })
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/bus_driver/EditBusDriver.vue?vue&type=template&id=248746f5&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/bus_driver/EditBusDriver.vue?vue&type=template&id=248746f5& ***!
  \****************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { attrs: { id: "edit-bus-driver" } }, [
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-md-12" }, [
        _c("div", { staticClass: "card card-primary" }, [
          _c("div", { staticClass: "card-header" }, [
            _vm._v("Edit Bus Assign To Driver")
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "card-body" }, [
            _c(
              "form",
              {
                on: {
                  submit: function($event) {
                    $event.preventDefault()
                    return _vm.editBusAssignDriver($event)
                  }
                }
              },
              [
                _c("div", { staticClass: "form-group row" }, [
                  _c("label", { staticClass: "control-label" }, [
                    _vm._v("Bus Group")
                  ]),
                  _vm._v(" "),
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.editBusDriver.bus_group_id,
                          expression: "editBusDriver.bus_group_id"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: { name: "bus_group_id" },
                      on: {
                        change: [
                          function($event) {
                            var $$selectedVal = Array.prototype.filter
                              .call($event.target.options, function(o) {
                                return o.selected
                              })
                              .map(function(o) {
                                var val = "_value" in o ? o._value : o.value
                                return val
                              })
                            _vm.$set(
                              _vm.editBusDriver,
                              "bus_group_id",
                              $event.target.multiple
                                ? $$selectedVal
                                : $$selectedVal[0]
                            )
                          },
                          function($event) {
                            return _vm.getBusNumber()
                          }
                        ]
                      }
                    },
                    [
                      _c("option", { attrs: { value: "" } }, [
                        _vm._v("Chose Bus Group")
                      ]),
                      _vm._v(" "),
                      _vm._l(_vm.bus_groups, function(bus) {
                        return _c(
                          "option",
                          { key: bus.id, domProps: { value: bus.id } },
                          [_vm._v(_vm._s(bus.bus_group_name))]
                        )
                      })
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _vm.errors.bus_group_id
                    ? _c("span", { staticClass: "text-danger" }, [
                        _vm._v(_vm._s(_vm.errors.bus_group_id[0]))
                      ])
                    : _vm._e()
                ]),
                _vm._v(" "),
                _vm.editBusDriver
                  ? _c("div", { staticClass: "form-group row" }, [
                      _c("label", { staticClass: "control-label" }, [
                        _vm._v("Bus Number")
                      ]),
                      _vm._v(" "),
                      _c(
                        "select",
                        {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.editBusDriver.bus_assign_id,
                              expression: "editBusDriver.bus_assign_id"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: { name: "bus_assign_id" },
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
                                _vm.editBusDriver,
                                "bus_assign_id",
                                $event.target.multiple
                                  ? $$selectedVal
                                  : $$selectedVal[0]
                              )
                            }
                          }
                        },
                        [
                          _c("option", { attrs: { value: "" } }, [
                            _vm._v("Chose Bus Number")
                          ]),
                          _vm._v(" "),
                          _vm._l(_vm.bus_numbers, function(bn) {
                            return (_vm.editBusDriver.bus_group_id ==
                            bn.bus_group_id
                            ? true
                            : false)
                              ? _c("option", { domProps: { value: bn.id } }, [
                                  _vm._v(_vm._s(bn.bus_number))
                                ])
                              : _vm._e()
                          })
                        ],
                        2
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c("div", { staticClass: "form-group row" }, [
                  _c("label", { staticClass: "control-label" }, [
                    _vm._v("Driver name")
                  ]),
                  _vm._v(" "),
                  _c("input", {
                    staticClass: "form-control",
                    attrs: { type: "text" },
                    domProps: { value: _vm.current_driver.name }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-group row" }, [
                  _c("label", { staticClass: "control-label" }, [
                    _vm._v("Assign Date")
                  ]),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.editBusDriver.assign_date,
                        expression: "editBusDriver.assign_date"
                      }
                    ],
                    staticClass: "form-control",
                    attrs: { type: "date", name: "assign_date" },
                    domProps: { value: _vm.editBusDriver.assign_date },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(
                          _vm.editBusDriver,
                          "assign_date",
                          $event.target.value
                        )
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "form-group" },
                  [
                    _c(
                      "router-link",
                      {
                        staticClass: "btn btn-warning",
                        attrs: {
                          to:
                            "/dashboard/assign_driver/" +
                            this.editBusDriver.bus_driver_id
                        }
                      },
                      [_vm._v("Back")]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-success",
                        attrs: { type: "submit" }
                      },
                      [_vm._v("Submit")]
                    )
                  ],
                  1
                )
              ]
            )
          ])
        ])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/admin/bus_driver/EditBusDriver.vue":
/*!***************************************************************!*\
  !*** ./resources/js/views/admin/bus_driver/EditBusDriver.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditBusDriver_vue_vue_type_template_id_248746f5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditBusDriver.vue?vue&type=template&id=248746f5& */ "./resources/js/views/admin/bus_driver/EditBusDriver.vue?vue&type=template&id=248746f5&");
/* harmony import */ var _EditBusDriver_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditBusDriver.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/bus_driver/EditBusDriver.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EditBusDriver_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EditBusDriver_vue_vue_type_template_id_248746f5___WEBPACK_IMPORTED_MODULE_0__["render"],
  _EditBusDriver_vue_vue_type_template_id_248746f5___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/bus_driver/EditBusDriver.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/bus_driver/EditBusDriver.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/views/admin/bus_driver/EditBusDriver.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditBusDriver_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./EditBusDriver.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/bus_driver/EditBusDriver.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditBusDriver_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/bus_driver/EditBusDriver.vue?vue&type=template&id=248746f5&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/views/admin/bus_driver/EditBusDriver.vue?vue&type=template&id=248746f5& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditBusDriver_vue_vue_type_template_id_248746f5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./EditBusDriver.vue?vue&type=template&id=248746f5& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/bus_driver/EditBusDriver.vue?vue&type=template&id=248746f5&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditBusDriver_vue_vue_type_template_id_248746f5___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditBusDriver_vue_vue_type_template_id_248746f5___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
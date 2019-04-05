webpackJsonp([29],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/admin/views/backend/Container.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__("./node_modules/babel-runtime/regenerator/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store__ = __webpack_require__("./resources/assets/js/admin/store.js");


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
    data: function data() {
        return {
            activeIndex: '1',
            formLabelWidth: '120px',
            dialogFormVisible: false,
            rules: {
                name: [{ required: true, message: '请输入空间名称', trigger: 'blur' }],
                desc: [{ required: true, message: '请输入空间描述', trigger: 'blur' }]
            },
            form: {
                name: '',
                desc: ''
            }
        };
    },

    computed: {
        lists: function lists() {
            return __WEBPACK_IMPORTED_MODULE_1__store__["a" /* default */].state.space.list;
        }

    },
    beforeRouteEnter: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee(to, from, next) {
            return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return __WEBPACK_IMPORTED_MODULE_1__store__["a" /* default */].dispatch('spaceFetch');

                        case 2:
                            next();

                        case 3:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function beforeRouteEnter(_x, _x2, _x3) {
            return _ref.apply(this, arguments);
        }

        return beforeRouteEnter;
    }(),

    methods: {
        handleSelect: function handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        logout: function logout() {
            localStorage.removeItem('token');
            this.$router.push({ name: 'login' });
        },
        to_space: function to_space(id) {
            this.$router.push({ name: 'spaces.show', params: { id: id } });
        },
        submitForm: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2(formName) {
                var state, _form, name, desc;

                return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                state = 0;

                                this.$refs[formName].validate(function (valid) {
                                    if (valid) {
                                        state = 1;
                                    } else {
                                        return false;
                                    }
                                });

                                if (state) {
                                    _context2.next = 4;
                                    break;
                                }

                                return _context2.abrupt('return');

                            case 4:
                                _form = this.form, name = _form.name, desc = _form.desc;
                                _context2.prev = 5;
                                _context2.next = 8;
                                return __WEBPACK_IMPORTED_MODULE_1__store__["a" /* default */].dispatch('spaceStore', { name: name, desc: desc });

                            case 8:
                                this.dialogFormVisible = false;
                                this.intForm();
                                _context2.next = 12;
                                return __WEBPACK_IMPORTED_MODULE_1__store__["a" /* default */].dispatch('spaceFetch', { id: 1 });

                            case 12:
                                this.$message.success('创建成功');
                                _context2.next = 17;
                                break;

                            case 15:
                                _context2.prev = 15;
                                _context2.t0 = _context2['catch'](5);

                            case 17:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[5, 15]]);
            }));

            function submitForm(_x4) {
                return _ref2.apply(this, arguments);
            }

            return submitForm;
        }(),
        intForm: function intForm() {
            this.form = {
                name: '',
                desc: ''
            };
        }
    }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-35d42f43\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/admin/views/backend/Container.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-container",
    [
      _c(
        "el-header",
        [
          _c(
            "el-menu",
            {
              staticClass: "el-menu-demo",
              attrs: { "default-active": _vm.activeIndex, mode: "horizontal" },
              on: { select: _vm.handleSelect }
            },
            [
              _c(
                "el-submenu",
                { attrs: { index: "1" } },
                [
                  _c("template", { slot: "title" }, [_vm._v("空间")]),
                  _vm._v(" "),
                  _vm._l(_vm.lists, function(list, index) {
                    return _c(
                      "el-menu-item",
                      {
                        key: index,
                        attrs: { index: "1-" + (index + 1) },
                        on: {
                          click: function($event) {
                            return _vm.to_space(list.id)
                          }
                        }
                      },
                      [_vm._v(_vm._s(list.name))]
                    )
                  })
                ],
                2
              ),
              _vm._v(" "),
              _c(
                "el-menu-item",
                { attrs: { index: "2" } },
                [
                  _c(
                    "el-button",
                    {
                      attrs: { type: "text" },
                      on: {
                        click: function($event) {
                          _vm.dialogFormVisible = true
                        }
                      }
                    },
                    [
                      _vm._v("新建空间"),
                      _c("i", { staticClass: "el-icon-plus" })
                    ]
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-menu-item",
                { staticStyle: { float: "right" }, attrs: { index: "3" } },
                [
                  _c(
                    "el-button",
                    { attrs: { type: "text" }, on: { click: _vm.logout } },
                    [_vm._v("退出")]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-main",
        [
          _c(
            "el-dialog",
            {
              attrs: { title: "新建空间", visible: _vm.dialogFormVisible },
              on: {
                "update:visible": function($event) {
                  _vm.dialogFormVisible = $event
                }
              }
            },
            [
              _c(
                "el-form",
                { ref: "form", attrs: { model: _vm.form, rules: _vm.rules } },
                [
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        label: "空间名称",
                        "label-width": _vm.formLabelWidth,
                        prop: "name"
                      }
                    },
                    [
                      _c("el-input", {
                        attrs: { autocomplete: "off" },
                        model: {
                          value: _vm.form.name,
                          callback: function($$v) {
                            _vm.$set(_vm.form, "name", $$v)
                          },
                          expression: "form.name"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        label: "空间详情",
                        "label-width": _vm.formLabelWidth,
                        prop: "desc"
                      }
                    },
                    [
                      _c("el-input", {
                        attrs: { autocomplete: "off" },
                        model: {
                          value: _vm.form.desc,
                          callback: function($$v) {
                            _vm.$set(_vm.form, "desc", $$v)
                          },
                          expression: "form.desc"
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "dialog-footer",
                  attrs: { slot: "footer" },
                  slot: "footer"
                },
                [
                  _c(
                    "el-button",
                    {
                      on: {
                        click: function($event) {
                          _vm.dialogFormVisible = false
                        }
                      }
                    },
                    [_vm._v("取 消")]
                  ),
                  _vm._v(" "),
                  _c(
                    "el-button",
                    {
                      attrs: { type: "primary" },
                      on: {
                        click: function($event) {
                          return _vm.submitForm("form")
                        }
                      }
                    },
                    [_vm._v("确 定")]
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("router-view")
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-35d42f43", module.exports)
  }
}

/***/ }),

/***/ "./resources/assets/js/admin/views/backend/Container.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/admin/views/backend/Container.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-35d42f43\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/admin/views/backend/Container.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/admin/views/backend/Container.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-35d42f43", Component.options)
  } else {
    hotAPI.reload("data-v-35d42f43", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});
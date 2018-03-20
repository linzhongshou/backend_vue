webpackJsonp([4],{

/***/ 519:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(200)(
  /* script */
  __webpack_require__(535),
  /* template */
  __webpack_require__(907),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 522:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 字符串工具类
 * @Autor linzs
 * @Date 2018/01/30
 */
class stringUtil {

    /**
     * 判断有效值
     * null 或 undefined 或 NaN 或 空字符 或布尔的"false" 或 数组的长度小等于0 都返回true
     */
    static isNull(val) {
        var result = true;

        if (typeof val == "undefined") {
            result = false;
        } else if (val == null) {
            result = false;
        } else if (typeof val == "number" && isNaN(val)) {
            result = false;
        } else if (typeof val == "string") {
            var str = val.replace(/(^\s*)|(\s*$)/g, "");
            if (str == "") {
                result = false;
            }
        } else if (typeof val == "boolean") {
            result = val;
        } else if (val instanceof Array && val.length <= 0) {
            result = false;
        } else if (typeof val == "object") {
            for (var key in val) {
                break;
            }
        }

        return !result;
    }

    /**
     * 去掉数组或Object的value字符串值前后空格
     * */
    static trim(obj) {
        if (!stringUtil.isNull(obj)) {
            for (var key in obj) {
                var value = obj[key];
                if (typeof value == "string") {
                    var str = value.replace(/(^\s*)|(\s*$)/g, "");
                    obj[key] = str;
                }
            }
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (stringUtil);

/***/ }),

/***/ 535:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_qs__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_qs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_qs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_utils_stringUtil__ = __webpack_require__(522);
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
    data: function () {
        return {
            form: {
                id: '',
                name: '',
                createDate: '',
                updateDate: ''
            }
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            let category = this.$route.params.category;
            if (category) {
                this.form = category;
            }
        },
        onSubmit() {
            __WEBPACK_IMPORTED_MODULE_1_utils_stringUtil__["a" /* default */].trim(this.form);
            this.$axios.post('http://139.199.202.137:9090/api/category', __WEBPACK_IMPORTED_MODULE_0_qs___default.a.stringify(this.form)).then(res => {
                if (res.data.code == 1) {
                    this.$alert('提交成功', '提示', { callback: action => {
                            this.prevPage();
                        } });
                } else {
                    this.$message.error(res.data.data.join('<br/>'));
                }
            });
        },
        prevPage() {
            let currPage = this.$route.params.currPage;
            this.$router.push({ name: 'category', params: { currPage: currPage } });
        }
    }
});

/***/ }),

/***/ 907:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "crumbs"
  }, [_c('el-breadcrumb', {
    attrs: {
      "separator": "/"
    }
  }, [_c('el-breadcrumb-item', [_c('i', {
    staticClass: "el-icon-menu"
  }), _vm._v(" 主页")]), _vm._v(" "), _c('el-breadcrumb-item', [_vm._v("目录")]), _vm._v(" "), _c('el-breadcrumb-item', [_vm._v("编辑目录")])], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "form-box"
  }, [_c('el-form', {
    ref: "form",
    attrs: {
      "model": _vm.form,
      "label-width": "80px"
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "名称"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.form.name),
      callback: function($$v) {
        _vm.$set(_vm.form, "name", $$v)
      },
      expression: "form.name"
    }
  })], 1), _vm._v(" "), _c('el-form-item', [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.onSubmit
    }
  }, [_vm._v("提交")]), _vm._v(" "), _c('el-button', {
    on: {
      "click": function($event) {
        _vm.prevPage()
      }
    }
  }, [_vm._v("返回")])], 1)], 1)], 1)])
},staticRenderFns: []}

/***/ })

});
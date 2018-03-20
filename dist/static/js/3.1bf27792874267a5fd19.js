webpackJsonp([3],{

/***/ 516:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(912)

var Component = __webpack_require__(200)(
  /* script */
  __webpack_require__(531),
  /* template */
  __webpack_require__(906),
  /* scopeId */
  "data-v-b9b7aeb6",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 531:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_qs__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_qs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_qs__);
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
			ruleForm: {
				account: '',
				password: ''
			},
			rules: {
				account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
				password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
			}
		};
	},
	methods: {
		submitForm(formName) {
			const self = this;
			this.$axios.post('http://139.199.202.137:9090/api/user/validUser', __WEBPACK_IMPORTED_MODULE_0_qs___default.a.stringify({ 'account': this.ruleForm.account, 'password': this.ruleForm.password })).then(function (result) {
				var resultData = result.data;
				if (resultData.code == 1) {
					window.sessionStorage.setItem('access_token', resultData.data.accessToken);
					window.sessionStorage.setItem('refresh_token', resultData.data.refreshToken);
					self.$router.push({ path: '/index' }); // 登录成功之后重定向到首页
				} else {
					alert(resultData.data);
				}
			}).catch(function (err) {
				console.error(err);
			});
			return false;
		},
		setUserInfo() {
			const self = this;
			this.$axios.get('http://139.199.202.137:9090/api/user/userinfo', {}).then(function (result) {
				if (result.data.code == 1) {
					self.$store.commit('setUser', JSON.stringify(result.data.data));
				} else {
					console.log("get user information error. error: " + JSON.stringify(result.data.data));
				}
			}).catch(function (err) {
				console.error(err);
			});
		}
	},
	mounted() {
		this.$refs.ruleForm.$el[0].focus();
	}
});

/***/ }),

/***/ 625:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(87)(false);
// imports


// module
exports.push([module.i, ".login-wrap[data-v-b9b7aeb6]{position:relative;width:100%;height:100%}.ms-title[data-v-b9b7aeb6]{position:absolute;top:50%;width:100%;margin-top:-230px;text-align:center;font-size:30px;color:#fff}.ms-login[data-v-b9b7aeb6]{position:absolute;left:50%;top:50%;width:300px;height:160px;margin:-150px 0 0 -190px;padding:40px;border-radius:5px;background:#fff}.login-btn[data-v-b9b7aeb6]{text-align:center}.login-btn button[data-v-b9b7aeb6]{width:100%;height:36px}", ""]);

// exports


/***/ }),

/***/ 906:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "login-wrap"
  }, [_c('div', {
    staticClass: "ms-title"
  }, [_vm._v("后台管理系统")]), _vm._v(" "), _c('div', {
    staticClass: "ms-login"
  }, [_c('el-form', {
    ref: "ruleForm",
    staticClass: "demo-ruleForm",
    attrs: {
      "model": _vm.ruleForm,
      "rules": _vm.rules,
      "label-width": "0px"
    }
  }, [_c('el-form-item', {
    attrs: {
      "prop": "account"
    }
  }, [_c('el-input', {
    attrs: {
      "placeholder": "用户名"
    },
    model: {
      value: (_vm.ruleForm.account),
      callback: function($$v) {
        _vm.$set(_vm.ruleForm, "account", $$v)
      },
      expression: "ruleForm.account"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "prop": "password"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "password",
      "placeholder": "密码"
    },
    nativeOn: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) { return null; }
        _vm.submitForm('ruleForm')
      }
    },
    model: {
      value: (_vm.ruleForm.password),
      callback: function($$v) {
        _vm.$set(_vm.ruleForm, "password", $$v)
      },
      expression: "ruleForm.password"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "login-btn"
  }, [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.submitForm('ruleForm')
      }
    }
  }, [_vm._v("登录")])], 1)], 1)], 1)])
},staticRenderFns: []}

/***/ }),

/***/ 912:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(625);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(199)("799e9c49", content, true);

/***/ })

});
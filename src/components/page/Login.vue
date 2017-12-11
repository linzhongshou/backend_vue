<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="account">
                    <el-input v-model="ruleForm.account" placeholder="account"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
import qs from 'qs'
export default {
	data: function(){
		return {
			ruleForm: {
				account: '',
				password: ''
			},
			rules: {
				account: [
					{ required: true, message: '请输入用户名', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' }
				]
			}
		}
	},
	methods: {
		submitForm(formName) {
			const self = this;
			this.$axios.post('http://localhost:9090/user/validUser', qs.stringify({'account': this.ruleForm.account, 'password': this.ruleForm.password}))
				.then(function(result) {
					result = result.data;
					if(result.code == 1) {
						window.sessionStorage.setItem('token', result.data);
						self.$router.push({ path: '/index' }); // 登录成功之后重定向到首页

						// self.setUserInfo();
					} else {
						alert(result.data);
					}
				}).catch(function(err) {
					console.error(err);
				});
			return false;
		},
		setUserInfo() {
			const self = this;
			this.$axios.get('http://localhost:9090/api/user/userinfo', {}).then(function(result) {
				if(result.data.code == 1) {
					self.$store.commit('setUser', JSON.stringify(result.data.data));
				} else {
					console.log("get user information error. error: " + JSON.stringify(result.data.data));
				}
				}).catch(function(err) {
					console.error(err);
				});
		}
	},
	mounted() {
		this.$refs.ruleForm.$el[0].focus();
	}
}
</script>

<style scoped>
.login-wrap{
	position: relative;
	width:100%;
	height:100%;
}
.ms-title{
	position: absolute;
	top:50%;
	width:100%;
	margin-top: -230px;
	text-align: center;
	font-size:30px;
	color: #fff;

}
.ms-login{
	position: absolute;
	left:50%;
	top:50%;
	width:300px;
	height:160px;
	margin:-150px 0 0 -190px;
	padding:40px;
	border-radius: 5px;
	background: #fff;
}
.login-btn{
	text-align: center;
}
.login-btn button{
	width:100%;
	height:36px;
}
</style>
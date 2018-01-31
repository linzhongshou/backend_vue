<template>
    <div class="header">
        <div class="logo">后台管理系统</div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/img.jpg">
                    {{ name }}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: ''
            }
        },
        mounted() {
            const self = this
			this.$axios.get('http://localhost:9090/api/user/userinfo', {}).then(function(result) {
				if(result.data.code == 1) {
                    self.name = result.data.data.name
                    self.$store.commit('setUser', JSON.stringify(result.data.data));
				} else {
					console.log("get user information error. error: " + JSON.stringify(result.data.data))
				}
				}).catch(function(err) {
					console.error(err)
				})
        },
        methods:{
            handleCommand(command) {
                if(command == 'loginout'){
                    window.sessionStorage.setItem("access_token", "");
                    window.sessionStorage.setItem("refresh_token", "");
                    this.$store.commit("setUser", "");
                    this.$router.push('/login');
                }
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }
    .header .logo{
        float: left;
        width:250px;
        text-align: center;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>

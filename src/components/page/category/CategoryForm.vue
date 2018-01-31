<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 主页</el-breadcrumb-item>
                <el-breadcrumb-item>目录</el-breadcrumb-item>
                <el-breadcrumb-item>编辑目录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button @click="prevPage()">返回</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    import qs from 'qs';
    import stringUtil from 'utils/stringUtil';

    export default {
        data: function(){
            return {
                form: {
                    id: '',
                    name: '',
                    createDate: '',
                    updateDate: ''
                }
            }
        },
        created () {
            this.fetchData();
        },
        methods: {
            fetchData() {
                let category = this.$route.params.category;
                if(category) { this.form = category; }
            },
            onSubmit() {
                stringUtil.trim(this.form);
                this.$axios.post('http://localhost:9090/api/category', qs.stringify( this.form )).then( (res) => {
                    if (res.data.code == 1) {
                        this.$alert('提交成功', '提示', { callback: action => { this.prevPage(); } });
                    } else {
                        this.$message.error(res.data.data.join('<br/>'));
                    }
                } );
                
            },
            prevPage() {
                let currPage = this.$route.params.currPage;
                this.$router.push({ name: 'category', params: { currPage: currPage } });
            }
        }
    }
</script>
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
                <!-- <el-form-item label="选择器">
                    <el-select v-model="form.region" placeholder="请选择">
                        <el-option key="bbk" label="步步高" value="bbk"></el-option>
                        <el-option key="xtc" label="小天才" value="xtc"></el-option>
                        <el-option key="imoo" label="imoo" value="imoo"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="日期时间">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="选择开关">
                    <el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
                </el-form-item>
                <el-form-item label="多选框">
                    <el-checkbox-group v-model="form.type">
                        <el-checkbox label="步步高" name="type"></el-checkbox>
                        <el-checkbox label="小天才" name="type"></el-checkbox>
                        <el-checkbox label="imoo" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="单选框">
                    <el-radio-group v-model="form.resource">
                        <el-radio label="步步高"></el-radio>
                        <el-radio label="小天才"></el-radio>
                        <el-radio label="imoo"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="文本框">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item> -->
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
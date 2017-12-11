<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 表格</el-breadcrumb-item>
                <el-breadcrumb-item>Vue表格组件</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <datasource language="en" :table-data="getData" :columns="columns" :pagination="information.pagination" :limits="false"
                v-on:change="changePage"
                v-on:searching="onSearch"></datasource>
    </div>
</template>

<script>
    import Datasource from 'vue-datasource';
    export default {
        data: function(){
            const self = this;
            return {
                url: 'http://localhost:9090/api/category/categorys',
                information: {
                    pagination:{},
                    data:[]
                },
                columns: [
                    {
                        name: 'Id',
                        key: 'id',
                    },
                    {
                        name: 'Name',
                        key: 'name',
                    },
                    {
                        name: 'CreateDate',
                        key: 'createDate',
                        render (value) {
                            return new Date(value);
                        }
                    },
                    {
                        name: 'UpdateDate',
                        key: 'updateDate',
                        render (value) {
                            return new Date(value);
                        }
                    }
                ],
                actions: [
                    {
                        text: 'Click',
                        class: 'btn-primary',
                        event(e, row) {
                            self.$message('选中的行数： ' + row.row.id);
                        }
                    }
                ],
                query:'',
                limits: 10
            }
        },
        components: {
            Datasource
        },
        methods: {
            changePage(values) {
                this.information.pagination.per_page = values.perpage;
                this.information.data = this.information.data;
            },
            onSearch(searchQuery) {
                this.query = searchQuery;
            }
        },
        computed:{
            getData(){
                const self = this;
                return self.information.data.filter(function (d) {
                    if(d.name.indexOf(self.query) > -1){
                        return d;
                    }
                })
            }
        },
        beforeMount(){
            this.$axios.get(this.url).then( (res) => {
                var pagination = {};
                this.information.data = res.data.content;
                this.information.pagination = pagination;

                pagination.total = res.data.totalElements;
                pagination.per_page = res.data.size;
                pagination.current_page = res.data.number + 1;
                pagination.last_page = res.data.totalPages;
                pagination.from = (res.data.number * res.data.size) + 1;
                pagination.to = (res.data.number + 1) * res.data.size;
            })
        }
    }
</script>

<style src="../../../static/css/datasource.css"></style>
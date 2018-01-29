<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 表格</el-breadcrumb-item>
                <el-breadcrumb-item>Vue表格组件</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <datasource language="en" :table-data="getData" :columns="columns" :pagination="information.pagination"
                :actions="actions"
                v-on:change="changePage"
                v-on:searching="onSearch"></datasource>
    </div>
</template>

<script>
    import Datasource from 'vue-datasource';
    import dateUtil from 'utils/dateUtil';
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
                            return dateUtil.format('yyyy-MM-dd HH:mm', value);
                        }
                    },
                    {
                        name: 'UpdateDate',
                        key: 'updateDate',
                        render (value) {
                            return dateUtil.format('yyyy-MM-dd HH:mm', value);
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
                if ( res.data.code != 1 ) {
                    alert(res.data.data);
                } else {
                    var pagination = {};
                    let categorys = res.data.data;
                    this.information.data = categorys.content;
                    this.information.pagination = pagination;

                    pagination.total = categorys.totalElements;
                    pagination.per_page = categorys.size;
                    pagination.current_page = categorys.number + 1;
                    pagination.last_page = categorys.totalPages;
                    pagination.from = (categorys.number * categorys.size) + 1;
                    pagination.to = (categorys.number + 1) * categorys.size;
                }
            })
        }
    }
</script>

<style src="../../../static/css/datasource.css"></style>
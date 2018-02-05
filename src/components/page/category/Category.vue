<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 主页</el-breadcrumb-item>
                <el-breadcrumb-item>目录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-table :data="tableData" :stripe="true" style="width: 100%">
            <el-table-column label="名称">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建时间">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ dateFormat(scope.row.createDate) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="修改时间">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ dateFormat(scope.row.updateDate) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="small" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div>
            <div style="float:left; padding: 2px 5px;">
                <el-button size="small" type="primary" @click="handleAdd()">新增</el-button>
            </div>
            <div align="right">
                <el-pagination
                    @current-change="handleChangePage"
                    :current-page="currPage"
                    :page-size="pageSize"
                    :page-count="pageCount"
                    :total="totalCount"
                    layout="total, prev, pager, next, jumper">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import qs from 'qs';
    import dateUtil from 'utils/dateUtil';

    export default {
        data: function() {
            const self = this;
            return {
                url: 'http://localhost:9090/api/category/categorys',
                tableData: [],
                //当前页码
                currPage: 1,
                // 页大小
                pageSize: 10,
                //默认高亮行数据id
                highlightId: -1,
                //查询的页码
                start: 1,
                // 总记录数
                totalCount: 0,
                // 总页数
                pageCount: 0
            }
        },
        methods: {
            //从服务器读取数据
            loadData: function(currPage, pageSize) {
                this.$axios.get(this.url, { params: {'currPage': currPage, 'pageSize': pageSize } }
                ).then( (res) => {
                    let pageData = res.data.data;
                    this.tableData = pageData.content;
                    this.totalCount = pageData.totalElements;
                } ).catch( (err) => {
                    this.$message.error('获取表格数据错误！');
                } );        
            },
            dateFormat: function(value) {
                return dateUtil.format('yyyy-MM-dd HH:mm', value);
            },
            handleChangePage: function(currPage) {
                this.currPage = currPage;
                this.loadData(this.currPage, this.pageSize);
            },
            handleAdd: function() {
                this.$router.push('/edit_category');
            },
            handleEdit: function(index, row) {
                this.$router.push({ name: 'edit_category', params: { category: row, currPage: this.currPage } });
            },
            handleDelete: function(index, row) {
                this.$confirm('确定删除[' + row.name + ']?', '提示', { type: 'warning' }).then( () => {

                   this.$axios.delete('http://localhost:9090/api/category/'+row.id).then( (res) => {
                       if(res.data.code == 1) {
                           this.$alert('删除成功', '提示', { callback: action => { this.loadData(this.currPage, this.pageSize); } });
                       }
                   } ).catch( (err) => {
                       this.$message.error("删除错误，错误信息：" + err);
                   } );

                } );
            }
        },
        beforeMount() {
            let currPage = this.$route.params.currPage;
            if (currPage) { this.currPage = currPage; }
            this.loadData(this.currPage, this.pageSize);
        }
    }
</script>
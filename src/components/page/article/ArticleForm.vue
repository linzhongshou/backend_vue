<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 主页</el-breadcrumb-item>
                <el-breadcrumb-item>文章</el-breadcrumb-item>
                <el-breadcrumb-item>编辑文章</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="width: 1000px;">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="标题">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="摘要">
                    <el-input v-model="form.summary"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <mavonEditor v-model="form.content" ref=md @imgAdd="$imgAdd" @imgDel="$imgDel"></mavonEditor>
                </el-form-item>
                <el-form-item label="所属目录">
                    <el-select v-model="form.categoryId" placeholder="请选择">
                        <el-option
                            v-for="category in categoryList"
                            :key="category.id"
                            :label="category.name"
                            :value="category.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否发布">
                    <el-radio-group v-model="form.visible">
                        <el-radio label="y">发布</el-radio>
                        <el-radio label="n">禁止</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="允许评论">
                    <el-radio-group v-model="form.allowComment">
                        <el-radio label="y">允许</el-radio>
                        <el-radio label="n">禁止</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="允许点赞">
                    <el-radio-group v-model="form.allowThumbup">
                        <el-radio label="y">允许</el-radio>
                        <el-radio label="n">禁止</el-radio>
                    </el-radio-group>
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
import qs from "qs";
import { mavonEditor } from "mavon-editor";
import stringUtil from "utils/stringUtil";
import "mavon-editor/dist/css/index.css";

export default {
  data: function() {
    return {
      form: {
        id: "",
        title: "",
        categoryId: "",
        summary: "",
        content: "",
        visible: "y",
        allowComment: "y",
        allowThumbup: "y",
        readCount: "0",
        commentCount: "0",
        thumbupCount: "0",
        createDate: "",
        updateDate: ""
      },
      categoryList: []
    };
  },
  components: {
    mavonEditor
  },
  created() {
    this.fetchData();
  },
  mounted() {
    this.editorSwitch();
  },
  methods: {
    fetchData() {
      let article = this.$route.params.article;
      if (article) {
        this.form = article;
      }

      this.$axios.get("/apis/category/all").then(res => {
        if (res.data.code == 1) {
          this.categoryList = res.data.data;
        }
      });
    },
    onSubmit() {
      this.form.category = null;
      stringUtil.trim(this.form);
      this.$axios
        .post("/apis/api/article", qs.stringify(this.form))
        .then(res => {
          if (res.data.code == 1) {
            this.$alert("提交成功", "提示", {
              callback: action => {
                this.prevPage();
              }
            });
          } else {
            this.$message.error(res.data.data.join("<br/>"));
          }
        });
    },
    prevPage() {
      let currPage = this.$route.params.currPage;
      this.$router.push({ name: "article", params: { currPage: currPage } });
    },
    editorSwitch() {
      let containerDiv = $("div.editor-toolbar");
      let switchDiv =
        '<div style="float: right;"><select class="el-input__inner"><option>Markdown</option><option>富文本编辑器</option></select></div>';
      $(containerDiv).append(switchDiv);
    },
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append('file', $file);
      formdata.append('path', '/article/images');
      this.$axios({
          url: '/apis/api/upload',
          method: 'post',
          data: formdata,
          headers: { 'Content-Type': 'multipart/form-data' },
      }).then( (res) => {
        if(res.data.code == 1) {
          let fileList = res.data.data;
          for(let index in fileList) {
            let file = fileList[index];
            if(file.code == 1) {
              this.$refs.md.$img2Url(pos, "/apis" + file.data);
            }
          }
        }
      } );
    },
    $imgDel() {

    }
  }
};
</script>
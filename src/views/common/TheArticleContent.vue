<style scoped>
.preview-content-title {font-size: 21px;}
.preview-content-info {font-size: 12px; color: #666;}
.quill-editor >>> .ql-editor {min-height: 255px; }
.preview-content-wrap {text-align: left; }

@media screen and (max-width: 320px){
  .preview-content-title {margin-top: 0px;}
    .quill-editor >>> .ql-editor {min-height: 150px;}
}
</style>

<style>
.preview-content-wrap img {display: block; width: 100%;}
</style>

<template>
  <div class="preview-content">
    <h3 class="preview-content-title text-left mb-0">{{ article.news_headline }}</h3>
    <p class="preview-content-info text-left">
      <span>来源：{{ article.new_agencies }}</span>
      <span class="pl-sm">{{ article.create_time }}</span>
    </p>
    <template>
      <quill-editor 
        v-if="contenteditable"
        ref="myQuillEditor"
        v-model="article.text" 
        class="quill-editor" 
        :options="editorOption" 
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)"
      />
      <div v-else class="preview-content-wrap" v-html="article.text"></div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'TheArticleContent',
  props: {
    options: {
      type: Object,
      default: () => {}
    },
    contenteditable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      article: {},
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
            // ['blockquote', 'code-block'],     //引用，代码块
            [{ 'header': 1 }, { 'header': 2 }]        // 标题，键值对的形式；1、2表示字体大小
            // [{ 'list': 'ordered' }, { 'list': 'bullet' }],     //列表
            // [{ 'script': 'sub' }, { 'script': 'super' }],   // 上下标
            // [{ 'indent': '-1' }, { 'indent': '+1' }],     // 缩进
            // [{ 'direction': 'rtl' }],             // 文本方向
            // [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
            // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],     //几级标题
            // [{ 'color': [] }, { 'background': [] }],     // 字体颜色，字体背景颜色
            // [{ 'font': [] }],     //字体
            // [{ 'align': [] }]    //对齐方式
            // ['clean']    //清除字体样式
            // ['image', 'video']    //上传图片、上传视频
          ]
        }
      }
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  watch: {
    options: {
      handler: function(nv) {
        this.article = nv;
      },
      deep: true
    }
  },
  created() {
    this.article = this.options;
  },
  mounted() {
  },
  methods: {
    onEditorReady(editor) { // 准备编辑器
    },
    onEditorChange(value) {

    },
    onEditorBlur(quill) {
      console.log('editor blur!', quill);
    },
    onEditorFocus(quill) {
      console.log('editor focus!', quill);
    }
  }
};
</script>


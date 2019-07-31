<template>
  <div class="preview-content">
    <h3 class="preview-content-title">为什么说贸易战美国一定会输？</h3>
    <p class="preview-content-info">
      <span>来源：央广新闻</span>
      <span>2019-07-11</span>
    </p>
    <template>
      <quill-editor
        v-if="contenteditable"
        ref="myQuillEditor"
        v-model="article.content"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
      />
      <div v-else class="preview-content-wrap" v-html="article.content"></div>
      
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
            [{ 'size': ['small', false, 'large'] }],
            ['bold', 'italic'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image']
          ],
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          },
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
          }
        }
      }
    };
  },
  watch: {
    options: {
      handler: (nv) => {
        this.article = nv;
      },
      deep: true
    },
    'article.content': (nv) => {
      console.log(nv);
    }
  },
  created() {
    this.article = this.options;
  },
  mounted() {
  },
  methods: {
    updateContent(value) {

    },
    onEditorBlur(quill) {
      console.log('editor blur!', quill);
    },
    onEditorFocus(quill) {
      console.log('editor focus!', quill);
    },
    onEditorReady(quill) {
      console.log('editor ready!', quill);
    }
  }
};
</script>


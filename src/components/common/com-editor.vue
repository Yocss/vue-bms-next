<template>
  <div class="com-editor">
    <div  ref="toastuiEditor" />
  </div>
</template>
<script>
import { Alioss } from 'alioss-file-uploader'
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import Editor from '@toast-ui/editor'
const editorEvents = ['load', 'change', 'paste', 'stateChange', 'focus', 'blur']
export default {
  name: 'ComEditor',
  props: {
    initialValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: '400px'
    },
    initialEditType: {
      type: String,
      default: 'wysiwyg'
    },
    options: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    const eventOptions = {}
    editorEvents.forEach(e => {
      eventOptions[e] = (...args) => {
        this.doEmit(e, ...args)
      }
    })
    return {
      editor: null,
      option: {
        events: eventOptions,
        ...this.options
      }
    }
  },
  watch: {
    previewStyle (newValue) {
      this.editor.changePreviewStyle(newValue)
    },
    height (newValue) {
      this.editor.height(newValue)
    }
  },
  mounted () {
    const options = Object.assign({
      previewStyle: 'vertical',
      language: 'zh-cn',
      toolbarItems: [
        'heading',
        'bold',
        'italic',
        'strike',
        'divider',
        'quote',
        'divider',
        'ul',
        'ol',
        'task',
        'indent',
        'outdent',
        'divider',
        'table',
        // 'image',
        'link',
        'divider',
        'code',
        'codeblock'
      ]
    }, this.option, {
      el: this.$refs.toastuiEditor,
      initialValue: this.initialValue,
      placeholder: this.placeholder,
      initialEditType: this.initialEditType,
      height: this.height
    })
    this.editor = new Editor(options)
    this.addImageButton()
  },
  unmounted () {
    editorEvents.forEach(e => {
      this.editor.off(e)
    })
    this.editor.remove()
  },
  methods: {
    doEmit (event, ...args) {
      switch (event) {
        case 'change':
          this.doEmit('contentChange', {
            html: this.getContents('getHtml'),
            markdown: this.getContents()
          })
          break
        case 'paste': {
          // const [data, source] = args[0]
          const data = args[0].data
          // const source = args[0].source
          // console.log(source)
          const image = data.clipboardData.items[0]
          // console.log(image)
          if (image.type.indexOf('image') === 0) {
            // 搞到了blob对象
            console.log(image.getAsFile())
          }
          break
        }
      }
      this.$emit('event', { event, data: args })
    },
    getContents (action = 'getMarkdown') {
      const res = this.editor[action]() || ''
      return res
    },
    addImageButton () {
      const toolbar = this.editor.getUI().getToolbar()
      this.editor.eventManager.addEventType('customBtn')
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const _this = this
      this.editor.eventManager.listen('customBtn', () => {
        const oss = new Alioss()
        const options = { accept: 'image', limit: { max: 2, unit: 'MB' } }
        oss.upload(_this.fetchSts, data => {
          // console.log(data)
          if (data.status === 'complete') {
            const url = data.list[0].url || ''
            // 执行插入图片操作
            url && _this.insetImage(url)
          }
        }, options)
      })
      toolbar.insertItem(15, {
        type: 'button',
        options: {
          className: 'tui-image',
          event: 'customBtn',
          tooltip: '插入图片'
        }
      })
    },
    insetImage (imageUrl) {
      this.editor.exec('AddImage', { altText: 'image', imageUrl })
    },
    setHtml (html) {
      this.editor.setHtml(html)
    },
    setContent (content) {
      this.editor.setHtml(content)
    },
    setMarkdown (markdown) {
      this.editor.setMarkdown(markdown)
    },
    customBtn: () => document.createElement('button'),
    getEle: () => this.$refs.toastuiEditor,
    invoke (method, ...args) {
      let result = null
      if (this.editor[method]) {
        result = this.editor[method](...args)
      }
      return result
    }
  }
}
</script>
<style lang="stylus">
.com-editor
  width 100%
  height 100%
</style>

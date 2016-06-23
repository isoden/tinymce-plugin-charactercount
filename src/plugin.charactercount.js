(function () {
  'use strict'

  tinymce.PluginManager.add('charactercount', function (editor) {
    /**
     * 入力されている文字数を返却する
     * @TODO 改行は1文字として扱う
     * @TODO 絵文字(📛)は一文字として扱う
     */
    this.getCount = () => {
      var content = editor.getContent({format: 'text'});

      return /^\s$/.test(content) ? 0 : content.length;
    };
  });

})(window.tinymce);
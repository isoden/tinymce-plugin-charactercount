
QUnit.module('tinymce.plugins.charactercount', {
  beforeEach: function (assert) {
    var done = assert.async();

    tinymce.init({
      selector              : 'textarea',
      plugins               : 'charactercount',
      init_instance_callback: function (editor) {
        window.editor = editor;
        done();
      }
    });
  },
  afterEach: function () {
    editor.destroy();
    delete window.editor;
  }
});

QUnit.test('空のドキュメントではカウントは0になる', function (assert) {
  editor.setContent('');
  
  assert.equal(editor.plugins.charactercount.getCount(), 0, '0 以外の値が返却されました');
});

QUnit.test('入力されている文字数をカウントする', function (assert) {
  editor.setContent('abcde');

  assert.equal(editor.plugins.charactercount.getCount(), 5, '5 以外の値が返却されました');
});

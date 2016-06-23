
QUnit.module('tinymce.plugins.charactercount', {
  beforeEach: function (assert) {
    var done = assert.async();

    tinymce.init({
      selector              : 'textarea',
      plugins               : 'charactercount',
      entity_encoding       : 'raw',
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
  editor.setContent('<p>abcde</p>');
  assert.equal(editor.plugins.charactercount.getCount(), 5, '5 以外の値が返却されました');

  editor.setContent(`<p>abcde</p><p>fghij</p>`);
  assert.equal(editor.plugins.charactercount.getCount(), 11, '11 以外の値が返却されました。改行は1文字として扱います。');

  editor.setContent(`<p>📛😤👊🔥📛</p>`);
  assert.equal(editor.plugins.charactercount.getCount(), 5, '5 以外の値が返却されました。絵文字は1文字として扱います。');
});

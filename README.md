# tinymce-plugin-charactercount

## Demo

<a href="//isoden.github.io/tinymce-plugin-charactercount/example">Live Demo</a>

## Usage

```html
<textarea></textarea>

<script src="path/to/tinymce.js"></script>
<script src="path/to/plugin.charactercount.js"></script>
<script>
  tinymce.init({
    selector       : 'textarea',
    plugins        : 'charactercount',
    entity_encoding: 'raw', // <- required!!!
    setup          : function (editor) {
      editor.on('setcontent beforeaddundo keyup', function () {
        console.log(editor.plugins.charactercount.getCount());
      });
    }
  });
</script>
```

## License

Under The MIT License

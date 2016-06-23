(function () {
  'use strict'

  tinymce.PluginManager.add('charactercount', function (editor) {
    /**
     * 入力されている文字数を返却する
     */
    this.getCount = function () {
      var html = editor.getContent();
      var text = stripTag(removeNewline(html));

      return /^\s$/.test(text) ? 0 : ucs2decode(text).map(function (code) {
        return ucs2encode([code]);
      }).length;
    };

    /*!
    * https://github.com/bestiejs/punycode.js/blob/master/LICENSE-MIT.txt
    */
    function ucs2decode(string) {
      var output = [];
      var counter = 0;
      var length = string.length;
      while (counter < length) {
        var value = string.charCodeAt(counter++);
        if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
          // It's a high surrogate, and there is a next character.
          var extra = string.charCodeAt(counter++);
          if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
            output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
          } else {
            // It's an unmatched surrogate; only append this code unit, in case the
            // next code unit is the high surrogate of a surrogate pair.
            output.push(value);
            counter--;
          }
        } else {
          output.push(value);
        }
      }
      return output;
    }

    function ucs2encode(array) {
      return String.fromCodePoint.apply(String, array);
    }

    /**
     * 文字列から改行を取り除く。 TinyMCEでは改行は `<p> </p>` として扱われている。
     * @param  {string} [html=''] html文字列
     * @return {string} 改行除去後の文字列
     */
    function removeNewline(html) {
      if (html === undefined) {
        html = '';
      }

      return html.replace(/<p>\s<\/p>/gi, '');
    }

    /**
     * HTMLのタグとして扱われる文字列を取り除く。
     * @param  {string} [html=''] html文字列
     * @return {string} タグ除去後の文字列
     */
    function stripTag(html) {
      if (html === undefined) {
        html = '';
      }

      return html.replace(/<[^>]+>/gi, '');
    }
  });

})(window.tinymce);
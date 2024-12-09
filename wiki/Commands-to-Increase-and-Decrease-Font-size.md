```xml
  <command name="font_inc">
    <pattern>increase font size;increase font;inc font size;inc font</pattern>
    <script>
      JS.eval ("var currentSize = $('body').css(\"font-size\");$('#divOutput *').each(function(){$(this).css(\"font-size\", parseInt($(this).css(\"font-size\").replace(/px/,'')) + 1+\"px\");})")
      IncreaseObjectCounter (game, "defaultfontsize")
      msg ("Font-size increased.")
    </script>
  </command>
```
```xml
    <command name="font_dec">
    <pattern>decrease font size;decrease font;dec font size;dec font</pattern>
    <script>
      JS.eval ("var currentSize = $('body').css(\"font-size\");$('#divOutput *').each(function(){$(this).css(\"font-size\", parseInt($(this).css(\"font-size\").replace(/px/,'')) - 1+ \"px\");})")
      DecreaseObjectCounter (game, "defaultfontsize")
      msg ("Font-size decreased.")
    </script>
  </command>
```
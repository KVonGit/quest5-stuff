```xml
  <command name="help">
    <pattern type="string">^help$|^\?$</pattern>
    <script><![CDATA[
      msg ("<center><a href='http://pr-if.org/doc/play-if-card/play-if-card-300dpi.png'><img onload=\"scrollToEnd();\" onerror=\"ASLEvent('P','"+Template("DefaultHelp")+"');$(this).remove();\" src='http://pr-if.org/doc/play-if-card/play-if-card-300dpi.png' width='100%'/></a></center>")
      game.suppressturnscripts = true
    ]]></script>
  </command>
```
```xml
  <command name="brief_cmd">
    <pattern>brief;terse</pattern>
    <script>
      <![CDATA[
      if (not GetBoolean(game, "brief_descriptions")) {
        game.notarealturn = true
        game.brief_descriptions = true
        game.autodescription_description = game.autodescription_descriptionBak
      }
      msg ("Room Descriptions are now set to \"BRIEF\".  Room descriptions will only print if you haven't visited a room yet.<br/>")
    ]]>
    </script>
  </command>
```

```xml
  <command name="superbrief_cmd">
    <pattern>superbrief;short</pattern>
    <script>
      <![CDATA[
      game.notarealturn = true
      game.autodescription_description = 0
      msg ("Room Descriptions are now set to \"SUPERBRIEF\".  Room descriptions will not print (even if you haven't visited the room before).<br/>")
    ]]>
    </script>
  </command>
```

```xml
  <command name="verbose_cmd">
    <pattern>verbose;long</pattern>
    <script>
      <![CDATA[
      game.notarealturn = true
      game.autodescription_description = game.autodescription_descriptionBak
      game.brief_descriptions = false
      msg ("Room Descriptions are now set to \"VERBOSE\".  Room descriptions will always print.<br/>")
    ]]>
    </script>
  </command>
```
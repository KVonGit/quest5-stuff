Add this to your User Interface Initialisation script:
```c#
SetTimeout (2) {
  msg ("<div style='display:none;' id='progressbar'></div>")
  JS.eval ("$('#progressbar').progressbar({ value: 0});$('#progressbar').insertBefore($('#gamePanesRunning:first-child')).css('margin-top','14px').toggle('drop');")
}
```

---
Create a new function: **UpdateProgressBar**

Add the parameter:  ```val```

Paste this into the script in code view:
```c#
JS.eval ("var val = "+val+";$('#progressbar').progressbar({ value: val });")
```

---
To use it:

```UpdateProgressBar (integer_value)```


---
### Example Game

```xml
<!--Saved by Quest 5.8.6703.28085-->
<asl version="550">
  <include ref="English.aslx" />
  <include ref="Core.aslx" />
  <game name="Progress Bar">
    <gameid>cb1ab574-2a3d-44b0-9aba-48dfafaf0d38</gameid>
    <version>1.0</version>
    <firstpublished>2018</firstpublished>
    <feature_advancedscripts />
    <inituserinterface type="script"><![CDATA[
      JS.eval ("$('body').append(\"<div id='hp-prog' style='display:none;text-align:center;'>Hitpoints<br/><div id='progressbar'></div></div>\");$('#progressbar').progressbar({ value: 0});$('#hp-prog').insertBefore($('#gamePanesRunning:first-child')).css('margin-top','14px').toggle('drop');")
    ]]></inituserinterface>
  </game>
  <object name="room">
    <inherit name="editor_room" />
    <isroom />
    <description>{command:test}</description>
    <object name="player">
      <inherit name="editor_object" />
      <inherit name="editor_player" />
      <hitpoints type="int">0</hitpoints>
      <changedhitpoints type="script">
        max_hitpoints = 20
        mutiplier = 100/max_hitpoints
        UpdateProgressBar (Round(player.hitpoints * mutiplier))
      </changedhitpoints>
    </object>
  </object>
  <command name="testcmd">
    <pattern>test</pattern>
    <script>
      if (player.hitpoints = 20) {
        msg ("Sorry. You are maxed out!")
      }
      else {
        IncreaseObjectCounter (game.pov, "hitpoints")
        msg ("player.hitpoints: {player.hitpoints}")
        msg ("{command:test}")
      }
    </script>
  </command>
  <function name="UpdateProgressBar" parameters="val">
    JS.eval ("var val = "+val+";$('#progressbar').progressbar({ value: val });")
  </function>
</asl>
```
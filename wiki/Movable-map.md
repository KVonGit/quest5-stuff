https://textadventures.co.uk/forum/quest/topic/hqokwdlme0wxfjs3h1jssg/movable-compass#1c08d18a-8773-42c8-8f81-0f10f125d309


```xml
<!--Saved by Quest 5.7.6404.15496-->
<asl version="550">
  <include ref="English.aslx" />
  <include ref="Core.aslx" />
  <game name="Map Window">
    <gameid>56728b4b-05c9-4250-8acd-509fa05b1aeb</gameid>
    <version>0.0.2</version>
    <firstpublished>2017</firstpublished>
    <gridmap />
    <feature_advancedscripts />
    <commandpane />
    <statusandcompassattop />
    <start type="script"><![CDATA[
      JS.eval ("$('#gamePanelSpacer').height(0);")
      msg ("<div id='mapHolder' style='display:none;'></div>")
      JS.eval ("$('#gridPanel').appendTo($('#mapHolder')).css('position', 'absolute');var mh = $('#mapHolder');mh.dialog({height: 400, width: 700,close: function(){mh.dialog('close');}});mh.dialog('option', 'title', 'Map');mh.dialog('open');$('.ui-dialog').css('position', 'fixed');openMap = function(){mh.dialog('open');};")
    ]]></start>
    <inituserinterface type="script">
      JS.setCommands ("SHOW MAP")
    </inituserinterface>
  </game>
  <command name="view_map_command">
    <pattern>view map;open map;map;show map</pattern>
    <script>
      JS.openMap ()
      game.notarealturn = true
    </script>
  </command>
  <object name="room">
    <inherit name="editor_room" />
    <object name="player">
      <inherit name="editor_object" />
      <inherit name="editor_player" />
    </object>
    <exit alias="north" to="another room">
      <inherit name="northdirection" />
    </exit>
    <exit alias="south" to="southern room">
      <inherit name="southdirection" />
    </exit>
    <exit alias="west" to="western room">
      <inherit name="westdirection" />
    </exit>
    <exit alias="east" to="eastern room">
      <inherit name="eastdirection" />
    </exit>
  </object>
  <object name="another room">
    <inherit name="editor_room" />
    <exit alias="south" to="room">
      <inherit name="southdirection" />
    </exit>
    <exit alias="north" to="northern room">
      <inherit name="northdirection" />
    </exit>
  </object>
  <object name="northern room">
    <inherit name="editor_room" />
    <exit alias="south" to="another room">
      <inherit name="southdirection" />
    </exit>
  </object>
  <object name="southern room">
    <inherit name="editor_room" />
    <exit alias="north" to="room">
      <inherit name="northdirection" />
    </exit>
  </object>
  <object name="western room">
    <inherit name="editor_room" />
    <exit alias="east" to="room">
      <inherit name="eastdirection" />
    </exit>
    <exit alias="west" to="western balcony">
      <inherit name="westdirection" />
    </exit>
  </object>
  <object name="western balcony">
    <inherit name="editor_room" />
    <exit alias="east" to="western room">
      <inherit name="eastdirection" />
    </exit>
  </object>
  <object name="eastern room">
    <inherit name="editor_room" />
    <exit alias="west" to="room">
      <inherit name="westdirection" />
    </exit>
    <exit alias="east" to="eastern patio">
      <inherit name="eastdirection" />
    </exit>
  </object>
  <object name="eastern patio">
    <inherit name="editor_room" />
    <exit alias="west" to="eastern room">
      <inherit name="westdirection" />
    </exit>
    <exit alias="east" to="side yard">
      <inherit name="eastdirection" />
    </exit>
  </object>
  <object name="side yard">
    <inherit name="editor_room" />
    <exit alias="west" to="eastern patio">
      <inherit name="westdirection" />
    </exit>
  </object>
</asl>
```
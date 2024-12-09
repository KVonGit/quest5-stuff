### Step 1

Add this function:

```
  <function name="SetHyperlinkStatus" parameters="setting">
    if (setting = "on") {
      bool = "true"
    }
    else if (setting = "off") {
      bool = "false"
    }
    else {
      // Incorrect input.  Just turn the links on.
      bool = "true"
    }
    JS.eval ("var linksEnabled = "+bool+";")
    if (bool = "false") {
      game.suppresshyperlinks = true
      JS.eval ("$('.cmdlink,.commandlink').each(function(){$(this).addClass('disabled');});")
    }
    else {
      game.suppresshyperlinks = false
    }
  </function>
```

---
### Step 2

Add this to **game.inituserinterface**:

```
// You can set this to "on" or "off", make sure it is a STRING!
SetHyperlinkStatus ("off")
// The next bit could be pasted into an included JS file, but works just as well in JS.eval()
JS.eval ("if (typeof(linksEnabled)=='undefined'){var linksEnabled = true;} function updateCommandLinks(data) {     $('.commandlink').each(function (index, e) {         var $e = $(e);         if (!$(e).data('deactivated')) {             var elementid = $e.data('elementid');             var available = $.inArray(elementid, data) > -1 || elementid.length == 0;             if (available) {                 if (linksEnabled) {$e.removeClass('disabled');}             } else {                 $e.addClass('disabled');             }         }     });$('.cmdlink').each(function(){	if (!linksEnabled) {		$(this).addClass('disabled');	}});};")
```

---
### Step 3

Add this command:

```
  <command name="toggle_links_cmd">
    <pattern>links;hyperlinks;toggle links;toggle hyperlinks</pattern>
    <script>
      game.notarealturn = true
      game.suppressturnscripts = true
      if (not GetBoolean(game, "suppresshyperlinks")) {
        SetHyperlinkStatus ("off")
        msg ("Hyperlinks disabled.")
      }
      else {
        SetHyperlinkStatus ("on")
        msg ("Hyperlinks enabled.")
      }
    </script>
  </command>
```

---
Example game:

http://textadventures.co.uk/games/view/kdkpb_dnxkeqps-ib0mqcq/toggling-links-version-2

The code:
<details>

```
<!--Saved by Quest 5.8.6708.15638-->
<asl version="550">
  <include ref="English.aslx" />
  <include ref="Core.aslx" />
  <game name="Toggling Links (Version 2)">
    <gameid>bbd81b4c-8136-4df3-989f-0e2802d32f88</gameid>
    <version>1.0</version>
    <firstpublished>2018</firstpublished>
    <feature_advancedscripts />
    <inituserinterface type="script"><![CDATA[
      SetHyperlinkStatus ("off")
      JS.eval ("if (typeof(linksEnabled)=='undefined'){var linksEnabled = true;} function updateCommandLinks(data) {     $('.commandlink').each(function (index, e) {         var $e = $(e);         if (!$(e).data('deactivated')) {             var elementid = $e.data('elementid');             var available = $.inArray(elementid, data) > -1 || elementid.length == 0;             if (available) {                 if (linksEnabled) {$e.removeClass('disabled');}             } else {                 $e.addClass('disabled');             }         }     });$('.cmdlink').each(function(){	if (!linksEnabled) {		$(this).addClass('disabled');	}});};")
    ]]></inituserinterface>
  </game>
  <command name="toggle_links_cmd">
    <pattern>links;hyperlinks;toggle links;toggle hyperlinks</pattern>
    <script>
      if (not GetBoolean(game, "suppresshyperlinks")) {
        SetHyperlinkStatus ("off")
        msg ("Hyperlinks disabled.")
      }
      else {
        SetHyperlinkStatus ("on")
        msg ("Hyperlinks enabled.")
      }
    </script>
  </command>
  <object name="room">
    <inherit name="editor_room" />
    <isroom />
    <description><![CDATA[If you require assistance, enter {command:HELP}.<br/>]]></description>
    <object name="player">
      <inherit name="editor_object" />
      <inherit name="editor_player" />
    </object>
    <exit alias="north" to="second room">
      <inherit name="northdirection" />
    </exit>
    <object name="stick">
      <inherit name="editor_object" />
    </object>
  </object>
  <object name="second room">
    <inherit name="editor_room" />
    <exit alias="south" to="room">
      <inherit name="southdirection" />
    </exit>
  </object>
  <function name="SetHyperlinkStatus" parameters="setting">
    if (setting = "on") {
      bool = "true"
    }
    else if (setting = "off") {
      bool = "false"
    }
    else {
      // Incorrect input.  Just turn the links on.
      bool = "true"
    }
    JS.eval ("var linksEnabled = "+bool+";")
    if (bool = "false") {
      game.suppresshyperlinks = true
      JS.eval ("$('.cmdlink,.commandlink').each(function(){$(this).addClass('disabled');});")
    }
    else {
      game.suppresshyperlinks = false
    }
  </function>
</asl>
```

</details>`
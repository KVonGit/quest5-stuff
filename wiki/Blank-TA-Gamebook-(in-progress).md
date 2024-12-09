```xml
<!--Saved by Quest 5.8.6719.26266-->
<asl version="580">
  <include ref="English.aslx" />
  <include ref="Core.aslx" />
  <game name="BLANK TA GAMEBOOK">
    <gameid>671532ea-29cc-4a82-aa52-d5ee7a553b71</gameid>
    <version>0.1</version>
    <firstpublished>2018</firstpublished>
    <showpanes type="boolean">false</showpanes>
    <showcommandbar type="boolean">false</showcommandbar>
    <showlocation type="boolean">false</showlocation>
    <autodescription type="boolean">false</autodescription>
    <echocommand type="boolean">false</echocommand>
    <feature_advancedscripts />
    <inituserinterface type="script"><![CDATA[
      JS.eval (" function scrollToEnd() {     var scrollTo = _animateScroll ? beginningOfCurrentTurnScrollPosition - 50 - $(\"#gamePanelSpacer\").height() : $(document).height();     var currentScrollTop = Math.max($(\"body\").scrollTop(), $(\"html\").scrollTop());     if (scrollTo > currentScrollTop) {         var maxScrollTop = $(document).height() - $(window).height();         if (scrollTo > maxScrollTop) scrollTo = maxScrollTop;         var distance = scrollTo - currentScrollTop;         var duration = _animateScroll ? distance / 0.4 : 1;     if (duration>2000) duration=2000;         $(\"body,html\").stop().animate({ scrollTop: scrollTo }, duration, \"easeInOutCubic\");     }     $(\"#txtCommand\").focus();   }")
    ]]></inituserinterface>
  </game>
  <object name="Page1">
    <inherit name="editor_room" />
    <isroom />
    <options type="stringdictionary">
      <item>
        <key>Page2</key>
        <value>This link goes to page 2</value>
      </item>
      <item>
        <key>Page3</key>
        <value>And this link goes to page 3</value>
      </item>
    </options>
    <description>
      This is page 1 Type a description here, and then create links to other pages by adding exits.
        </description>
    <enter type="script">
      ShowPageMenu
    </enter>
    <object name="player">
      <inherit name="editor_object" />
      <inherit name="editor_player" />
    </object>
    <exit name="YES" alias="YES" to="Page2" />
    <exit name="NO" alias="NO" to="Page3" />
  </object>
  <object name="Page2">
    <inherit name="editor_room" />
    <description>This is page 2. Type a description here, and then create links to other pages by adding exits.</description>
  </object>
  <object name="Page3">
    <inherit name="editor_room" />
    <description>This is page 3. Type a description here, and then create links to other pages by adding exits.</description>
  </object>
  <command name="handle_clicks">
    <pattern>#text#</pattern>
    <script><![CDATA[
      // MovePlayer (GetObject(Trim(text)))
      newpage = GetObject(Trim(text))
      command = text
      if (newpage = null) {
        msg ("Error - no page named '" + command + "'")
      }
      else {
        if (not GetBoolean(game, "clearlastpage") and HasAttribute(game.pov.parent, "options")) {
          if (HasAttribute(game.pov.parent, "options")) {
            if (DictionaryContains(game.pov.parent.options, command)) {
              optiontext = StringDictionaryItem(game.pov.parent.options, command)
              msg ("<b>" + optiontext + "</b>")
              msg ("")
            }
            JS.disableAllCommandLinks ()
          }
        }
        MovePlayer (newpage)
      }
    ]]></script>
  </command>
  <type name="link">
    <address />
  </type>
  <function name="ShowMenu" parameters="caption, options, allowCancel, callback"><![CDATA[
    // Modified -- does not display numbers.
    outputsection = StartNewOutputSection()
    msg (caption)
    count = 0
    game.menuoptionskeys = NewStringList()
    foreach (option, options) {
      // count = count + 1
      if (TypeOf(options) = "stringdictionary") {
        optionText = StringDictionaryItem(options, option)
        optiontag = option
        style = GetCurrentLinkTextFormat()
        list add (game.menuoptionskeys, option)
      }
      else if (TypeOf(option) = "string") {
        optionText = option
        optiontag = option
        style = GetCurrentLinkTextFormat()
        list add (game.menuoptionskeys, option)
      }
      else if (TypeOf(option) = "object") {
        optionText = GetDisplayAlias(option)
        optiontag = option.name
        colour = ""
        if (HasString(option, "linkcolour") and GetUIOption("UseGameColours") = "true") {
          colour = option.linkcolour
        }
        else {
          colour = GetLinkTextColour()
        }
        style = GetCurrentTextFormat(colour)
        list add (game.menuoptionskeys, option.name)
      }
      else {
        error ("ShowMenu cannot handle a " + TypeOf(option))
      }
      msg ("<a class=\"cmdlink\" style=\"" + style + "\" onclick=\"ASLEvent('ShowMenuResponse','" + EscapeQuotes(optiontag) + "')\">" + optionText + "</a><br/>")
    }
    EndOutputSection (outputsection)
    game.menuoptions = options
    game.menuallowcancel = allowCancel
    game.menucallback = callback
    game.menuoutputsection = outputsection
  ]]></function>
  <function name="PageStuff" parameters="message"><![CDATA[
    // Currently unused.
    msg (message)
    choices = NewDictionary()
    foreach (o, ScopeUnlockedExitsForRoom(game.pov.parent)) {
      dictionary add (choices, o.name, o)
    }
    if (ListCount(choices) > 0) {
      ShowMenu ("", choices, false) {
        exit = GetObject(result)
        msg ("{b:"+result+"}")
        MovePlayer (exit.to)
      }
    }
  ]]></function>
  <function name="MovePlayer" parameters="room"><![CDATA[
    parent = room
    if (GetBoolean(game, "clearlastpage")) {
      if (not GetBoolean(game, "noclear")) {
        ClearScreen
      }
    }
    else {
      if (HasString(game, "optionsoutputsection")) {
        HideOutputSection (game.optionsoutputsection)
      }
    }
    if (not GetBoolean(game, "continuesound")) {
      stop sound
    }
    MoveObject (game.pov, room)
    if (parent = game.pov.parent and not GetBoolean(game.pov.parent, "runscriptonly")) {
      if (HasString(game.pov.parent, "sound")) {
        if (LengthOf(game.pov.parent.sound) > 0) {
          play sound (game.pov.parent.sound, false, false)
          game.continuesound = GetBoolean(game.pov.parent, "continuesound")
        }
      }
      if (HasString(game.pov.parent, "picture")) {
        if (LengthOf(game.pov.parent.picture) > 0) {
          picture (game.pov.parent.picture)
          msg ("")
        }
      }
      if (HasString(game.pov.parent, "youtube")) {
        if (LengthOf(game.pov.parent.youtube) > 0) {
          JS.AddYouTube (game.pov.parent.youtube)
          msg ("")
          msg ("")
        }
      }
    }
  ]]></function>
  <function name="HasSeenPage" parameters="page" type="boolean">
    return (GetBoolean(page, "visited"))
  </function>
  <function name="AddPageLink" parameters="source, destination, text">
    RemovePageLink (source, destination)
    if (source.options = null) {
      source.options = NewStringDictionary()
    }
    DictionaryAdd (source.options, destination.name, text)
  </function>
  <function name="RemovePageLink" parameters="source, destination">
    if (source.options = null) {
      source.options = NewStringDictionary()
    }
    if (DictionaryContains(source.options, destination.name)) {
      DictionaryRemove (source.options, destination.name)
    }
  </function>
  <function name="ShowPageMenu"><![CDATA[
    // NOTE: This is not used.  I altered ShowMenu before thinking of this.  I may switch to this.
    if (TypeOf(game.pov.parent, "options") = "stringdictionary") {
      game.optionsoutputsection = StartNewOutputSection()
      foreach (key, game.pov.parent.options) {
        destination = GetObject(key)
        if (destination = null) {
          msg (StringDictionaryItem(game.pov.parent.options, key) + " (broken link)")
        }
        else {
          if (DoesInherit(destination, "link")) {
            msg ("<a href=\"" + destination.address + "\">" + StringDictionaryItem(game.pov.parent.options, key) + "</a>")
          }
          else {
            msg (CommandLink(key, StringDictionaryItem(game.pov.parent.options, key)))
          }
        }
        msg ("")
      }
      EndOutputSection (game.optionsoutputsection)
    }
  ]]></function>
</asl>
```
```c#
  <function name="ShowMenuNoNumbers" parameters="caption, options, allowCancel, callback"><![CDATA[
    outputsection = StartNewOutputSection()
    msg (caption)
    count = 0
    game.menuoptionskeys = NewStringList()
    foreach (option, options) {
      list add (game.menuoptionskeys, option)
      count = count + 1
      if (TypeOf(options) = "stringlist") {
        optionText = option
      }
      else {
        optionText = StringDictionaryItem(options, option)
      }
      msg ("<a class=\"cmdlink\" style=\"" + GetCurrentLinkTextFormat() + "\" onclick=\"ASLEvent('ShowMenuResponse','" + option + "')\">" + optionText + "</a>")
    }
    game.menuopt = option
    EndOutputSection (outputsection)
    game.menuoptions = options
    game.menuallowcancel = allowCancel
    game.menucallback = callback
    game.menuoutputsection = outputsection
  ]]></function>
```
```c#
  <function name="showHint" parameters="object"><![CDATA[
    if (HasAttribute(object, "hintlist")) {
      game.this = object
      optNo = 0
      choices = NewStringList()
      game.hintmenulist = object.hintlist
      foreach (h, object.hintlist) {
        optNo = optNo + 1
        opt = optNo + ": " + h
        list add (choices, "Hint " + optNo)
      }
      if ((ListCount(choices)) > 1) {
        hint = "Hints"
      }
      else {
        hint = "Hint"
      }
      ShowHintMenu ("<br>" + hint + " for " + GetDisplayName(game.this) + ":", choices, true) {
        r = Split(result, " ")
        thehint = ListItem(r, 1)
        thehint = ToInt(thehint)
        thehint = thehint -1
        msg (ListItem(game.this.hintlist, thehint))
        if (thehint +1 < (ListCount(game.this.hintlist))) {
          // msg ("RERUN MENU")
          // msg (game.this)
          HandleSingleCommand ("hint " + game.this.alias + "")
        }
      }
    }
    else {
      msg ("There are no hints set up for this item.")
    }
  ]]></function>
```
```c#
  <function name="addHint" parameters="object, string">
    if (not HasAttribute(object, "hintlist")) {
      object.hintlist = NewStringList()
    }
    hn = (ListCount(object.hintlist)) + 1
    string = "Hint " + hn + ": " + string
    list add (object.hintlist, string)
  </function>
```
```c#
  <function name="HandleHintClick" parameters="s"><![CDATA[
    // msg (game.this)
    // msg (s)
    game.hintOptNo = s
    s = ToInt(s) - 1
    ClearMenu
    msg (game.caption)
    msg (ListItem(game.this.hintlist, s))
    if (ListCount(game.this.hintlist) > s + 1) {
      do (game.this, "hint")
    }
    JS.scrollToEnd ()
  ]]></function>
```
```c#
  <function name="ShowHintMenu" parameters="caption, options, allowCancel, callback"><![CDATA[
    outputsection = StartNewOutputSection()
    msg (caption)
    count = 0
    game.menuoptionskeys = NewStringList()
    foreach (option, options) {
      list add (game.menuoptionskeys, option)
      count = count + 1
      if (TypeOf(options) = "stringlist") {
        optionText = option
      }
      else {
        optionText = StringDictionaryItem(options, option)
      }
      msg ("<button class=\"cmdlink\" style=\"background:#296231;color:#fac4ff;padding:4px;margin:6px\" onclick=\"ASLEvent('ShowMenuResponse','" + option + "')\">" + optionText + "</button>")
    }
    game.menuopt = option
    EndOutputSection (outputsection)
    game.menuoptions = options
    game.menuallowcancel = allowCancel
    game.menucallback = callback
    game.menuoutputsection = outputsection
  ]]></function>
```
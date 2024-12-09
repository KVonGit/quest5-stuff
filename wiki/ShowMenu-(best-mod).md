This will disable the option links if game.enablehyperlinks is set to false.  (This covers all menus, including Ask and disambiguation).

It also allows you to enter the option's text as a command to make a selection.  (Thanks to mrangel for that code!)

You need all of these functions:

```xml
  <function name="ShowMenu" parameters="caption, options, allowCancel, callback"><![CDATA[
    if (GetBoolean(game, "enablehyperlinks")){
		outputsection = StartNewOutputSection()
		msg (caption)
		count = 0
		game.menuoptionskeys = NewStringList()
		game.menudisplayedoptions = NewStringDictionary()
		foreach (option, options) {
		  count = count + 1
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
		  dictionary add (game.menudisplayedoptions, optiontag, optionText)
		  msg (count + ": <a class=\"cmdlink\" style=\"" + style + "\" onclick=\"ASLEvent('ShowMenuResponse','" + EscapeQuotes(optiontag) + "')\">" + optionText + "</a>")
		}
		EndOutputSection (outputsection)
		game.menuoptions = options
		game.menuallowcancel = allowCancel
		game.menucallback = callback
		game.menuoutputsection = outputsection
	}
	else{
		outputsection = StartNewOutputSection()
		msg (caption)
		count = 0
		game.menuoptionskeys = NewStringList()
		game.menudisplayedoptions = NewStringDictionary()
		foreach (option, options) {
		  count = count + 1
		  if (TypeOf(options) = "stringdictionary") {
			optionText = StringDictionaryItem(options, option)
			optiontag = option
			list add (game.menuoptionskeys, option)
		  }
		  else if (TypeOf(option) = "string") {
			optionText = option
			optiontag = option
			list add (game.menuoptionskeys, option)
		  }
		  else if (TypeOf(option) = "object") {
			optionText = GetDisplayAlias(option)
			optiontag = option.name
			list add (game.menuoptionskeys, option.name)
		  }
		  else {
			error ("ShowMenu cannot handle a " + TypeOf(option))
		  }
		  dictionary add (game.menudisplayedoptions, optiontag, optionText)
		  msg (count + ": " + optionText)
		}
		EndOutputSection (outputsection)
		game.menuoptions = options
		game.menuallowcancel = allowCancel
		game.menucallback = callback
		game.menuoutputsection = outputsection
	}
  ]]></function>
    <function name="HandleMenuTextResponse" parameters="input" type="boolean"><![CDATA[
    handled = false
    if (IsInt(input)) {
      number = ToInt(input)
      if (number > 0 and number <= ListCount(game.menuoptionskeys)) {
        handled = true
        ShowMenuResponse (StringListItem(game.menuoptionskeys, number - 1))
      }
    }
    else if (HasAttribute(game, "menudisplayedoptions")) {
      foreach (option, game.menudisplayedoptions) {
        opt = LCase(Trim(StringDictionaryItem(game.menudisplayedoptions, option)))
        answer = LCase(Trim(input))
        if (opt = answer) {
          ShowMenuResponse (option)
          return (true)
        }
        else if (GetBoolean(game,"asking")) {
          if (answer = "y") {
            ShowMenuResponse ("Yes")
            game.asking = false
            return (true)
          }
          else if (answer = "n") {
            ShowMenuResponse ("No")
            game.asking = false
            return (true)
          }
        }
      }
    }
    return (handled)
  ]]></function>

  <function name="ClearMenu">
    HideOutputSection (game.menuoutputsection)
    game.menuoutputsection = null
    game.menuoptions = null
    game.menudisplayedoptions = null
    game.menucallback = null
  </function>
```
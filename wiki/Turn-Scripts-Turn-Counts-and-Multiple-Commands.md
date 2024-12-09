I have another fix for this which involves changes in the C# code, but, since the average user isn't building Quest in Visual Studio, I came up with this, too.

### FOR DESKTOP USERS ONLY

We can modify the ```FinishTurn``` and ```ResolveNextName``` functions to make turn scripts and turn counts behave correctly when the player is allowed to enter multiple commands.

```xml
  <function name="ResolveNextName"><![CDATA[
    resolvedall = false
    queuetype = TypeOf(game.pov, "currentcommandvarlistqueue")
    if (queuetype = "stringlist") {
      queuelength = ListCount(game.pov.currentcommandvarlistqueue)
      if (queuelength > 0) {
        // Pop next variable off the queue
        var = StringListItem(game.pov.currentcommandvarlistqueue, 0)
        if (queuelength = 1) {
          game.pov.currentcommandvarlistqueue = null
        }
        else {
          newqueue = NewStringList()
          for (i, 1, queuelength - 1) {
            list add (newqueue, StringListItem(game.pov.currentcommandvarlistqueue, i))
          }
          game.pov.currentcommandvarlistqueue = newqueue
        }
        // Resolve variable
        value = StringDictionaryItem(game.pov.currentcommandvarlist, var)
        if (value <> "") {
          result = null
          resolvinglist = false
          // This is to resolve issue 626
          if (StartsWith(var, "objectexit")) {
            result = ResolveName(var, value, "exit")
          }
          if (result = null) {
            if (StartsWith(var, "object")) {
              if (HasScript(game.pov.currentcommandpattern, "multipleobjects")) {
                game.pov.currentcommandpendingobjectlist = NewObjectList()
                game.pov.currentcommandpendingvariable = var
                do (game.pov.currentcommandpattern, "multipleobjects")
                ResolveNameList (value, "object")
                resolvinglist = true
              }
              else {
                result = ResolveName(var, value, "object")
              }
            }
            else if (StartsWith(var, "exit")) {
              result = ResolveName(var, value, "exit")
            }
            else if (StartsWith(var, "text")) {
              result = StringDictionaryItem(game.pov.currentcommandvarlist, var)
            }
            else {
              error ("Unhandled command variable '" + var + "' - command variable names must begin with 'object', 'exit' or 'text'")
            }
          }
          // at this point, ResolveName has returned - either an object name, unresolved, or pending
          if (result = null) {
            if ((not resolvinglist) and LengthOf(GetString(game.pov, "currentcommandpendingvariable")) = 0) {
              UnresolvedCommand (value, var)
            }
          }
          else {
            AddToResolvedNames (var, result)
          }
        }
        else {
          ResolveNextName
        }
      }
      else {
        resolvedall = true
      }
    }
    else if (queuetype = "null") {
      resolvedall = true
    }
    else {
      error ("Invalid queue type")
    }
    if (resolvedall) {
      // All the objects have been resolved, so now we can actually do the command
      // TO DO: game.lastobjects should be game.pov.lastobjects
      game.lastobjects = game.pov.currentcommandresolvedobjects
      if (not DictionaryContains(game.pov.currentcommandresolvedelements, "multiple")) {
        dictionary add (game.pov.currentcommandresolvedelements, "multiple", false)
      }
      if (not GetBoolean(game.pov.currentcommandpattern, "isundo")) {
        if (LengthOf(game.pov.currentcommand) > 0) {
          start transaction (game.pov.currentcommand)
        }
      }
      if (not GetBoolean(game.pov.currentcommandpattern, "isoops")) {
        // TO DO: game.unresolved* should be game.pov.unresolved*
        game.unresolvedcommand = null
        game.unresolvedcommandvarlist = null
        game.unresolvedcommandkey = null
      }
      if (HasScript(game.pov.currentcommandpattern, "script")) {
        // This is the bit that actually runs the commands
        do (game.pov.currentcommandpattern, "script", game.pov.currentcommandresolvedelements)
        // Next 2 lines modded by KV to fix issues with multiple commands
        game.runturnscripts = true
        FinishTurn
        // END OF MOD
      }
      HandleNextCommandQueueItem
    }
  ]]></function>
```

```xml
  <function name="FinishTurn">
    // Modded by KV to handle multiple commands correctly
    if (GetBoolean(game,"runturnscripts")) {
      if (not GetBoolean(game, "suppressturnscripts")) {
        RunTurnScripts
      }
    }
    game.runturnscripts = false
    // END OF MOD
    game.suppressturnscripts = false
    UpdateStatusAttributes
    CheckDarkness
    UpdateObjectLinks
  </function>
```

---
The example game's code:

```xml
<!--Saved by Quest 5.8.6708.15638-->
<asl version="550">
  <include ref="English.aslx" />
  <include ref="Core.aslx" />
  <game name="Suppressing the Turn Scripts">
    <gameid>65c36394-fcd4-4abf-89a5-4d0659cb4ef7</gameid>
    <version>0.6</version>
    <firstpublished>2018</firstpublished>
    <feature_advancedscripts />
    <turns type="int">0</turns>
    <statusattributes type="stringdictionary">
      <item>
        <key>turns</key>
        <value>Turns: !</value>
      </item>
    </statusattributes>
    <description><![CDATA[A test game.<br/><br/>Enter HINT:  no turn scripts, and no turn count<br/><br/>Enter TEST ONE: turn scripts fire once, and the turn count increases by 1<br/><br/>Enter TEST TWO:  no turn scripts, and no turn count]]></description>
    <author>KV</author>
    <suppressturnscripts type="boolean">false</suppressturnscripts>
    <multiplecommands />
    <inituserinterface type="script">
      JS.eval ("function testOne(){	setTimeout(function(){		ASLEvent('CallMeWithASL','The turn scripts fired once and the turn count increased by one.');		if (webPlayer){		  setTimeout(function(){		    scrollToEnd();		  },500);		}	},1);};")
      JS.eval ("function testTwo(){	setTimeout(function(){		ASLEvent('CallMeWithASL','This suppressed the turn scripts and the turn count.');		if (webPlayer){		  setTimeout(function(){		    scrollToEnd();		  },500);		}	},1);};")
    </inituserinterface>
  </game>
  <turnscript name="test_turnscript">
    <enabled />
    <script><![CDATA[
      msg ("<b><center><br/>I AM THE TEST TURNSCRIPT!<br/></center></b>")
    ]]></script>
  </turnscript>
  <object name="room">
    <inherit name="editor_room" />
    <description><![CDATA[<br/>Enter (or click):<br/>  {command:HINT}, {command:TEST ONE},  {command:TEST TWO},  {command:TEST ONE. TEST TWO}, or  {command:HINT. TEST TWO}]]></description>
    <object name="player">
      <inherit name="editor_object" />
      <inherit name="editor_player" />
    </object>
    <object name="Ralph">
      <inherit name="editor_object" />
      <inherit name="namedmale" />
    </object>
  </object>
  <command name="hint">
    <pattern>hint;hints</pattern>
    <script>
      game.suppressturnscripts = true
      msg ("This story has no hints.")
    </script>
  </command>
  <command name="testone">
    <pattern>test one</pattern>
    <script>
      JS.testOne ()
    </script>
  </command>
  <command name="testtwo">
    <pattern>test two</pattern>
    <script>
      game.suppressturnscripts = true
      JS.testTwo ()
    </script>
  </command>
  <turnscript name="turn_count">
    <enabled />
    <script>
      if (not GetBoolean(game, "suppressturnscripts")) {
        IncreaseObjectCounter (game, "turns")
      }
    </script>
  </turnscript>
  <function name="ResolveNextName"><![CDATA[
    resolvedall = false
    queuetype = TypeOf(game.pov, "currentcommandvarlistqueue")
    if (queuetype = "stringlist") {
      queuelength = ListCount(game.pov.currentcommandvarlistqueue)
      if (queuelength > 0) {
        // Pop next variable off the queue
        var = StringListItem(game.pov.currentcommandvarlistqueue, 0)
        if (queuelength = 1) {
          game.pov.currentcommandvarlistqueue = null
        }
        else {
          newqueue = NewStringList()
          for (i, 1, queuelength - 1) {
            list add (newqueue, StringListItem(game.pov.currentcommandvarlistqueue, i))
          }
          game.pov.currentcommandvarlistqueue = newqueue
        }
        // Resolve variable
        value = StringDictionaryItem(game.pov.currentcommandvarlist, var)
        if (value <> "") {
          result = null
          resolvinglist = false
          // This is to resolve issue 626
          if (StartsWith(var, "objectexit")) {
            result = ResolveName(var, value, "exit")
          }
          if (result = null) {
            if (StartsWith(var, "object")) {
              if (HasScript(game.pov.currentcommandpattern, "multipleobjects")) {
                game.pov.currentcommandpendingobjectlist = NewObjectList()
                game.pov.currentcommandpendingvariable = var
                do (game.pov.currentcommandpattern, "multipleobjects")
                ResolveNameList (value, "object")
                resolvinglist = true
              }
              else {
                result = ResolveName(var, value, "object")
              }
            }
            else if (StartsWith(var, "exit")) {
              result = ResolveName(var, value, "exit")
            }
            else if (StartsWith(var, "text")) {
              result = StringDictionaryItem(game.pov.currentcommandvarlist, var)
            }
            else {
              error ("Unhandled command variable '" + var + "' - command variable names must begin with 'object', 'exit' or 'text'")
            }
          }
          // at this point, ResolveName has returned - either an object name, unresolved, or pending
          if (result = null) {
            if ((not resolvinglist) and LengthOf(GetString(game.pov, "currentcommandpendingvariable")) = 0) {
              UnresolvedCommand (value, var)
            }
          }
          else {
            AddToResolvedNames (var, result)
          }
        }
        else {
          ResolveNextName
        }
      }
      else {
        resolvedall = true
      }
    }
    else if (queuetype = "null") {
      resolvedall = true
    }
    else {
      error ("Invalid queue type")
    }
    if (resolvedall) {
      // All the objects have been resolved, so now we can actually do the command
      // TO DO: game.lastobjects should be game.pov.lastobjects
      game.lastobjects = game.pov.currentcommandresolvedobjects
      if (not DictionaryContains(game.pov.currentcommandresolvedelements, "multiple")) {
        dictionary add (game.pov.currentcommandresolvedelements, "multiple", false)
      }
      if (not GetBoolean(game.pov.currentcommandpattern, "isundo")) {
        if (LengthOf(game.pov.currentcommand) > 0) {
          start transaction (game.pov.currentcommand)
        }
      }
      if (not GetBoolean(game.pov.currentcommandpattern, "isoops")) {
        // TO DO: game.unresolved* should be game.pov.unresolved*
        game.unresolvedcommand = null
        game.unresolvedcommandvarlist = null
        game.unresolvedcommandkey = null
      }
      if (HasScript(game.pov.currentcommandpattern, "script")) {
        // This is the bit that actually runs the commands
        do (game.pov.currentcommandpattern, "script", game.pov.currentcommandresolvedelements)
        game.runturnscripts = true
        FinishTurn
      }
      HandleNextCommandQueueItem
    }
  ]]></function>
  <function name="FinishTurn">
    if (GetBoolean(game,"runturnscripts")) {
      if (not GetBoolean(game, "suppressturnscripts")) {
        RunTurnScripts
      }
    }
    game.runturnscripts = false
    game.suppressturnscripts = false
    UpdateStatusAttributes
    CheckDarkness
    UpdateObjectLinks
  </function>
  <function name="CallMeWithASL" parameters="data">
    msg (data)
  </function>
</asl>
```
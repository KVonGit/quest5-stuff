I *believe* this will handle ASL 550 games as well as ASL 580 games.

(The stuff that makes no sense to you is for Quest 578, which is a v550/v580 hybrid, with the 572 interface, and larger print in code view.)

```xml
  <function name="FinishTurn">
      <![CDATA[
    // Modded by KV to handle multiple commands, v550, and v580 correctly
    if (not GetBoolean(game, "suppressturnscripts")) {
      if (HasAttribute (game, "clockincrement")){
        for (i, 1, game.clockincrement) {
          IncTime ()
        }
      }
    }
    if (HasAttribute (game, "clockincrement")){
      game.clockincrement = 1
    }
    if (HasAttribute (game, "runturnscripts") or GetAttribute(game, "aslversion") = "580" or GetBoolean(game, "multiplecommands")){
      if (not GetBoolean(game, "suppressturnscripts")) {
        if (GetBoolean (game, "runturnscripts")){
          RunTurnScripts
        }
      }
	    game.runturnscripts = false
    }
	  else if (not GetBoolean(game, "suppressturnscripts")) {
      if (GetBoolean (game, "feature_turncount")){
        IncreaseObjectCounter(game, "turncount")
      }
      RunTurnScripts
    }
    // END OF MOD
    game.suppressturnscripts = false
    UpdateStatusAttributes
    CheckDarkness
    UpdateObjectLinks
  ]]></function>
```
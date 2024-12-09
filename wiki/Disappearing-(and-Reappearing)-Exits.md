```xml
  <function name="MakeCurrentExitsVisible"><![CDATA[
    if (not HasAttribute(game, "current_exits")) {
      // Do nothing.
    }
    else if (not ListCount(game.current_exits)<1) {
      foreach (exit, game.current_exits) {
        exit.visible = true
      }
      game.current_exits = NewObjectList()
      msg ("Play has resumed.")
    }
  ]]></function>
```
```xml
  <function name="MakeCurrentExitsInvisible">
    if (not HasAttribute(game, "current_exits")) {
      game.current_exits = NewObjectList()
    }
    game.current_exits = ScopeUnlockedExitsForRoom(game.pov.parent)
    foreach (exit, game.current_exits) {
      exit.visible = false
    }
  </function>
```

---
Also, I've been playing with something else and came up with these JS functions to hide and show the "You can go" line.

**JS Functions**
```javascript
hideRoomExitsList = function(){
  $(".exitlink").parent().hide();
};

showRoomExitsList = function(){
  $(".exitlink").parent().show();
};

```
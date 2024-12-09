If you don't have Quest 5.8, you'll need to add this modified ```FinishTurn``` function to your game:

```xml
  <function name="FinishTurn">
    if (GetBoolean(game,"suppressturnscripts")) {
      game.suppressturnscripts = false
    }
    else {
      RunTurnScripts
    }
    UpdateStatusAttributes
    CheckDarkness
    UpdateObjectLinks
  </function>
```

---
Here's the good stuff:

```xml
  <function name="AslSet" parameters="data">
    game.suppressturnscripts = true
    data = Split(data,"||")
    foreach (bit, data) {
      stuff = Split(bit,"=")
      obj_attr = stuff[0]
      obj_attr = Split(obj_attr,".")
      if (ListCount(obj_attr)>2){
        exclude = obj_attr[ListCount(obj_attr)-1]
        obj = Join(ListExclude(obj_attr,exclude),".")
        obj_attr = NewStringList()
        list add (obj_attr, obj)
        list add (obj_attr, exclude)
      }
      else {
        obj = obj_attr[0]
      }
      if (obj = "game.pov"){
        obj = game.pov
      }
      else if (obj = "game.pov.parent"){
        obj = game.pov.parent
      }
      else {
        obj = GetObject(obj)
      }
      attr = obj_attr[1]
      val = stuff[1]
      if (EndsWith(val,"_toInt")) {
        val = ToInt(Replace(val,"_toInt",""))
      }
      else if (EndsWith(val,"_toDouble")) {
        val = ToDouble(Replace(val,"_toDouble",""))
      }
      else if(LCase(val)="false"){
        val = false
      }
      else if(LCase(val)="true"){
        val = true
      }
      set (obj, attr, val)
    }
  </function>
```

---
To use it (make sure you give it 2 seconds for JS to pass the value to Quest):

```c
      JS.eval("ASLEvent('AslSet','game.style=nerdy');")
      SetTimeout(2) msg (game.style)
```
```c
      JS.eval("ASLEvent('AslSet','game.pov.style=nerdy');")
      SetTimeout(2) msg (player.style)
```
```c
      JS.eval("ASLEvent('AslSet','game.pov.parent.style=nerdy');")
      SetTimeout(2) msg (room.style)
```
```c
      JS.eval("ASLEvent('AslSet','player.extra=strength');")
      SetTimeout(2) msg (player.extra)
```
```c
      JS.eval("ASLEvent('AslSet','game.score=2_toInt');")
      SetTimeout(2) msg (game.score)
```
```c
      JS.eval("ASLEvent('AslSet','game.doubleatt=2.5_toDouble');")
      SetTimeout(2) msg (game.doubleatt)
```

```c
      JS.eval("ASLEvent('AslSet','game.thisthing=thingone||game.thatthing=thingtwo');")
      SetTimeout(2) msg (game.thisthing + " " + game.thatthing)
````
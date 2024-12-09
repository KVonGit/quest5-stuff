Add this to an ENABLED turn script (You'll have to run this script after entering the first room for the first time, too):


```c
if (ListCount(ScopeUnlockedExitsForRoom(game.pov.parent)) > 0) {
  exitsgood = false
  foreach (ex, ScopeUnlockedExitsForRoom(game.pov.parent)) {
    if (not ex.scenery) {
      exitsgood = true
    }
  }
  if (exitsgood) {
    list = ScopeUnlockedExitsForRoom(game.pov.parent)
    s = "Obvious exits: "
  foreach (ex, list) {
    exalt = GetDisplayAlias(ex)
    if (HasAttribute(ex,"alt")){
      if (ListCount(ex.alt)>0){
        exalt = ex.alt[0]
      }
    }
    s = s + UCase(exalt)
    i = ListCount(list)
    if (not list[i-1] = ex){
      s = s + " | "
    }
  }
  js = CapFirst(GetDisplayName(game.pov.parent))+ "&emsp;"
  js = js + "<span style=\"float:right;margin-right:1%;\">"
  js = js + s + "</span>"
  JS.updateLocation (js)
  }
}
```

![image](https://user-images.githubusercontent.com/30656341/38766251-cfddd0f0-3f94-11e8-8315-9ce9de0d1d1b.png)

---
![image](https://user-images.githubusercontent.com/30656341/38766284-3ed09ad8-3f95-11e8-8680-0cc88971b8a7.png)
This was written by The Pix.

```xml
  <command name="ask_room_about_cmd">
    <pattern>ask about #text#</pattern>
    <script>
      npcs = NewObjectList()
      opts = NewStringDictionary()
      foreach (o, GetDirectChildren(player.parent)) {
        if (HasAttribute(o, "ask")) {
          list add (npcs, o)
          dictionary add (opts, o.name, GetDisplayAlias(o))
        }
      }
      if (ListCount(npcs) = 0) {
        msg ("You can ask, but no one is here to tell you anything.")
      }
      else if (ListCount(npcs) = 1) {
        DoAskTell (ObjectListItem(npcs, 0), text, "ask", "askdefault", "DefaultAsk")
      }
      else {
        game.askabouttext = text
        ShowMenu ("Ask who?", opts, true) {
          if (not result = null) {
            o = GetObject(result)
            DoAskTell (o, game.askabouttext, "ask", "askdefault", "DefaultAsk")
          }
        }
      }
    </script>
  </command>
```
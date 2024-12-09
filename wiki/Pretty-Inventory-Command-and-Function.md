```xml
  <command name="pretty_inventory_cmd">
    <pattern type="string">^i$|^inv$|^inventory$</pattern>
    <script>
      list = FormatObjectList(Template("CarryingListHeader"), game.pov, Template("And"), ".")
      if (list = "") {
        msg (Template("NotCarryingAnything"))
      }
      else {
        PrettyInventory
      }
    </script>
  </command>
```

---
```xml
  <function name="PrettyInventory"><![CDATA[
    stuff = ScopeInventory()
    list = ""
    int = 0
    foreach (o, stuff) {
      int = int + 1
      o.prettyalias = "&nbsp;&nbsp;" + GetDisplayNameLink(o, "object")
      foreach (c, ListExclude(ListParents(o), game.pov)) {
        if (ListContains (stuff, c)) {
          o.prettyalias = "&nbsp;&nbsp;" + o.prettyalias
        }
      }
      br = ""
      if (int > 1) {
        br = "<br/>"
      }
      list = list + br + o.prettyalias
    }
    msg ("You are carrying:")
    msg (list)
  ]]></function>
```


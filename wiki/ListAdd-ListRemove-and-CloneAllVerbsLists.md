```xml
  <function name="ListAdd" parameters="list, value">
    if (not EndsWith(TypeOf(list),"list")) {
      error ("ListAdd: "+list+" is not a list!")
    }
    if (not ListContains(list,value)) {
      list add (list, value)
    }
  </function>

  <function name="ListRemove" parameters="list, value">
    if (ListContains(list,value)) {
      list remove (list, value)
    }
  </function>

  <function name="CloneAllVerbsLists">
    foreach (o, AllObjects()) {
      if (HasAttribute(o,"displayverbs")) {
        o.displayverbs = ListExclude(o.displayverbs,"")
      }
    }
    foreach (o, AllObjects()) {
      if (HasAttribute(o,"inventoryverbs")) {
        o.inventoryverbs = ListExclude(o.inventoryverbs,"")
      }
    }
  </function>
```


---
### NOTE: An error will be thrown when attempting to modify an inherited list which has not been cloned!

---
Example game:


```xml
<!--Saved by Quest 5.7.6606.27193-->
<asl version="550">
  <include ref="English.aslx" />
  <include ref="Core.aslx" />
  <game name="ListAdd">
    <gameid>850c8ad7-0432-4e1d-b550-dd066a8c9b94</gameid>
    <version>1.0</version>
    <firstpublished>2018</firstpublished>
    <start type="script">
      CloneAllVerbsLists
    </start>
  </game>
  <object name="room">
    <inherit name="editor_room" />
    <beforeenter type="script">
      ListAdd (thing.displayverbs, "Shake")
    </beforeenter>
    <object name="player">
      <inherit name="editor_object" />
      <inherit name="editor_player" />
    </object>
    <object name="thing">
      <inherit name="editor_object" />
    </object>
  </object>
  <function name="ListAdd" parameters="list, value">
    if (not EndsWith(TypeOf(list),"list")) {
      error ("ListAdd: "+list+" is not a list!")
    }
    if (not ListContains(list,value)) {
      list add (list, value)
    }
  </function>
  <function name="ListRemove" parameters="list, value">
    if (ListContains(list,value)) {
      list remove (list, value)
    }
  </function>
  <function name="CloneAllVerbsLists">
    foreach (o, AllObjects()) {
      if (HasAttribute(o,"displayverbs")) {
        o.displayverbs = ListExclude(o.displayverbs,"")
      }
    }
    foreach (o, AllObjects()) {
      if (HasAttribute(o,"inventoryverbs")) {
        o.inventoryverbs = ListExclude(o.inventoryverbs,"")
      }
    }
  </function>
</asl>
```

---
Here's a link to the forum thread where we tried to check whether or not the list was an inherited attribute before modifying it (we did not find a way):

http://textadventures.co.uk/forum/quest/topic/26onmvks8ukoxsmzmysb0q/passing-lists
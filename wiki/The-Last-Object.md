I believe "it" should refer to the last object(s) mentioned or the last object(s) with which the player directly interacted, whichever is the latter.

These changes seem to make it behave as I would expect (as long as hyperlinks are enabled):

```xml
  <function name="GetDisplayNameLink" parameters="obj, type" type="string"><![CDATA[
    verbs = GetDisplayVerbs(obj)
    if (verbs <> null) {
      verbCount = ListCount(verbs)
    }
    else {
      verbCount = 0
    }
    if (type = "exit" and verbCount = 1) {
      if (not game.enablehyperlinks) {
        result = GetDisplayAlias(obj)
      }
      else {
        result = "{exit:" + obj.name + "}"
      }
    }
    else if (type = "") {
      result = GetDisplayAlias(obj)
      if (not HasAttribute(game,"lastobjects")) {
        game.lastobjects = NewObjectList()
      }
      if (not obj = game.pov.parent) {
        list add (game.lastobjects, obj)
      }
    }
    else {
      result = "{object:" + obj.name + "}"
      if (not HasAttribute(game,"lastobjects")) {
        game.lastobjects = NewObjectList()
      }
      list add (game.lastobjects, obj)
    }
    if (not GetBoolean(obj, "usedefaultprefix")) {
      if (obj.prefix = null) {
        prefix = ""
      }
      else {
        prefix = obj.prefix
      }
    }
    else if (type = "exit") {
      prefix = ""
    }
    else {
      prefix = GetDefaultPrefix(obj)
    }
    if (LengthOf(prefix) > 0) {
      prefix = prefix + " "
    }
    result = prefix + result
    if (not GetBoolean(obj, "usedefaultprefix") and HasString(obj, "suffix")) {
      if (LengthOf(obj.suffix) > 0) {
        result = result + " " + obj.suffix
      }
    }
    return (result)
  ]]></function>
```
```xml
  <function name="ObjectLink" parameters="obj" type="string">
    game.lastobjects = NewObjectList()
    list add (game.lastobjects, obj)
    return ("{object:" + obj.name + "}")
  </function>
```
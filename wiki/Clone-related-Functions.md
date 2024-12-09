First off, Clone() doesn't add the "prototype" attribute to child objects of an object, so I modified CloneObject() to handle that (NOTE: This will be fixed as of Quest 5.8.0):

```xml
  <function name="CloneObject" parameters="object" type="object"><![CDATA[
    haskids = false
    if (ListCount(GetDirectChildren(object))>0) {
      haskids = true
      create ("temp_clone_holder_kv")
      foreach (o, GetDirectChildren(object)) {
        MoveObject (o, temp_clone_holder_kv)
      }
    }
    newobject = Clone(object)
    if (not HasString(object, "alias")) {
      newobject.alias = object.name
    }
    if (not HasAttribute(object, "prototype")) {
      newobject.prototype = object
    }
    if (haskids) {
      foreach (o, GetDirectChildren(temp_clone_holder_kv)) {
        MoveObject (o, game)
        CloneObjectAndMove (o, newobject)
        MoveObject (o, object)
      }
      destroy ("temp_clone_holder_kv")
    }
    return (newobject)
  ]]></function>
```

---
### New Functions
```xml
  <function name="GetDirectCloneChildren" parameters="parent, prototype" type="objectlist">
    return (FilterByAttribute(GetDirectChildren(parent),"prototype", prototype))
  </function>
```
```xml
  <function name="IsCloneOf" parameters="object, prototype" type="boolean">
    return (object.prototype = prototype)
  </function>
```
```xml
  <function name="ScopeReachableClonesOf" parameters="prototype" type="objectlist">
    return (FilterByAttribute(ScopeReachable(), "prototype", prototype))
  </function>
```
```xml
  <function name="GetRandomReachableCloneOf" parameters="prototype" type="object">
    PickOneObject (ScopeReachableClonesOf(prototype))
  </function>
```
```xml
  <function name="AnyReachableCloneGetBoolean" parameters="prototype, attribute" type="boolean">
    return (ListCount(FilterByAttribute(ScopeReachableClonesOf(prototype), attribute, true))>0)
  </function>
```
```xml
  <!-- This function written by mrangel -->
  <function name="GetReachableClonesWithBoolean" parameters="prototype, attribute" type="objectlist">
    return (FilterByAttribute(ScopeReachableClonesOf(prototype), attribute, true))
  </function>
```
```xml
  <function name="ContainsClone" parameters="parent, prototype" type="boolean"><![CDATA[
    return (ListCount(GetDirectCloneChildren(parent,prototype))>0)
  ]]></function>
```

---
### If planning to convert using QuestJS

You may want this function:

```xml
  <function name="This" type="object">
    if (DictionaryContains(game.pov.currentcommandresolvedelements,"object")) {
      return (DictionaryItem(game.pov.currentcommandresolvedelements,"object"))
    }
    else if (DictionaryContains(game.pov.currentcommandresolvedelements,"object1")) {
      return (DictionaryItem(game.pov.currentcommandresolvedelements,"object1"))
    }
  </function>
```


There is an issue when using ```this``` in script dictionary attributes when converting functions from Quest to JS.

This will allow you to do this:

```c
obj = This()
```

Then, you can use the variable ```obj``` instead of this in your script.
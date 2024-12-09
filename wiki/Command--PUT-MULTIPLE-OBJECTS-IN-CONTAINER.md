### For Quest 5.8

## Online Instructions

(Desktop users, please scroll down to [Desktop Instructions](#desktop-instructions))

Create a command, naming it "put_mod".

Set the pattern type to 'Regular Expression', and paste this in:
```regex
^put (?<object1>.*) (on|in) (?<object2>.*)$
```

Paste this into the "scope" field:
```c
object1=inventory|object2=container
```

Paste this in for the script in code view:
```c
if (not IsDefined("multiple")) {
  multiple = false
}
if (multiple and ListCount(object1) = 0) {
  msg ("You're not carrying anything.")
}
else if (multiple and ListCount(object2) > 1) {
  msg ("You'll have to pick one target.")
}
else {
  object2 = ListItem(object2, 0)
  if (not LCase(ToString(DictionaryItem(game.pov.currentcommandvarlist,"object1"))) = "all" and ListContains(object1,object2)) {
    if (ListCount(object1)>1) {
      OutputTextNoBr (GetDisplayAlias(object2) + ": ")
    }
    msg (Template("CannotDoThat"))
  }
  foreach (obj, ListExclude(object1, object2)) {
    if (multiple) {
      OutputTextNoBr (GetDisplayAlias(obj) + ": ")
    }
    // Do the normal PUT stuff!
    params = NewDictionary()
    dictionary add (params, "object1", obj)
    dictionary add (params, "object2", object2)
    do (put, "script", params)
  }
}
```

Now, add this line to your start script:
```c
put_mod.allow_all = true
```


---
## Desktop Instructions

Simply switch to full code view and paste this in just before the last line (which is ```</asl>```):

```xml
  <command name="put_mod">
    <pattern type="string"><![CDATA[^put (?<object1>.*) (on|in) (?<object2>.*)$]]></pattern>
    <scope>object1=inventory|object2=container</scope>
    <allow_all />
    <script><![CDATA[
      if (not IsDefined("multiple")) {
        multiple = false
      }
      if (multiple and ListCount(object1) = 0) {
        msg ("You're not carrying anything.")
      }
      else if (multiple and ListCount(object2) > 1) {
        msg ("You'll have to pick one target.")
      }
      else {
        object2 = ListItem(object2, 0)
        if (not LCase(ToString(DictionaryItem(game.pov.currentcommandvarlist,"object1"))) = "all" and ListContains(object1,object2)) {
          if (ListCount(object1)>1) {
            OutputTextNoBr (GetDisplayAlias(object2) + ": ")
          }
          msg (Template("CannotDoThat"))
        }
        foreach (obj, ListExclude(object1, object2)) {
          if (multiple) {
            OutputTextNoBr (GetDisplayAlias(obj) + ": ")
          }
          // Do the normal PUT stuff!
          params = NewDictionary()
          dictionary add (params, "object1", obj)
          dictionary add (params, "object2", object2)
          do (put, "script", params)
        }
      }
    ]]></script>
  </command>
```
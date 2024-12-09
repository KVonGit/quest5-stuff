# The functions:

```xml
  <function name="LoadFile" parameters="filename">
    <![CDATA[
    s = GetFileData (filename)
    current_object = null
    game.setUp = false
    foreach (line, Split(s, "\n")) {
      line = Crop(line)
      if (not line = "" and not StartsWith(line, "#")) {
        bits = Split(line, "=")
        if (StringListItem(bits, 0) = "new") {
          if (ListCount(bits) = 2) {
            create (StringListItem(bits, 1))
            current_object = GetObject(StringListItem(bits, 1))
          }
          else {
            create (StringListItem(bits, 2), StringListItem(bits, 1))
            current_object = GetObject(StringListItem(bits, 2))
          }
        }
        else if (StringListItem(bits, 0) = "find") {
          current_object = GetObject(StringListItem(bits, 1))
          if (current_object = null) {
            error ("Failed to find " + StringListItem(bits, 1) + " in the game world. Things will go badly...")
          }
        }
        else if (StringListItem(bits, 0) = "exit") {
          create exit (StringListItem(bits, 2), null, null, null, StringListItem(bits, 1))
          current_object = GetObject(StringListItem(bits, 2))
        }
        else if (StringListItem(bits, 0) = "parent") {
          newParent = StringListItem(bits, 1)
          if (newParent = "game.pov") {
            current_object.parent = game.pov.name
            game.setUp = true
            list remove (bits, "game.pov")
            list add (bits, game.pov.name)
          }
          else if (newParent = "game.pov.parent") {
            current_object.parent = game.pov.parent.name
            game.setUp = true
            list remove (bits, "game.pov.parent")
            list add (bits, game.pov.parent.name)
          }
          else if (newParent = "here") {
            current_object.parent = game.pov.parent.name
            game.setUp = true
            list remove (bits, "here")
            list add (bits, game.pov.parent.name)
          }
          else if (newParent = "player.parent") {
            current_object.parent = player.parent.name
            game.setUp = true
            list remove (bits, "player.parent")
            list add (bits, player.parent.name)
          }
          current_object.parent = GetObject(StringListItem(bits, 1))
          if (current_object.parent = null) {
            error ("Failed to find " + StringListItem(bits, 1) + " in the game world. Things will go badly...")
          }
        }
        else if (StringListItem(bits, 0) = "to") {
          current_object.to = GetObject(StringListItem(bits, 1))
          if (current_object.to = null) {
            error ("Failed to find " + StringListItem(bits, 1) + " in the game world. Things will go badly...")
          }
        }
        else {
          if (LCase(StringListItem(bits, 1)) = "false") {
            set (current_object, StringListItem(bits, 0), false)
          }
          else if (LCase(StringListItem(bits, 1)) = "true") {
            set (current_object, StringListItem(bits, 0), true)
          }
          else if (IsInt(StringListItem(bits, 1))) {
            set (current_object, StringListItem(bits, 0), ToInt(StringListItem(bits, 1)))
          }
          if (not game.setUp) {
            set (current_object, StringListItem(bits, 0), StringListItem(bits, 1))
          }
          else {
            set (current_object, StringListItem(bits, 0), game.pov)
          }
        }
      }
    }
    msg ("Done.")
  ]]>
  </function>

  <function name="Crop" parameters="s" type="string">
    <![CDATA[
    start = 1
    end = LengthOf(s)
    for (i, 1, LengthOf(s)) {
      if (Asc(Mid(s, i, 1)) < 33) {
        if (start = i) {
          start = i + 1
        }
      }
      else {
        end = i
      }
    }
    return (Mid(s, start, end - start + 1))
  ]]>
  </function>
```

---
# Example file to load

```
new=kv_special_item_1
alias=black shard of &infin;
look=It's the black shard, which is the most powerful of them all!
parent=game.pov

find=kv_green_shard
parent=game.pov

new=thingy
parent=game.pov.parent

new=anotherThing
parent=player.parent

new=thing3
parent=here
```
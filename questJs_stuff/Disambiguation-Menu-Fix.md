I changed ```candidates = ListCompact(fullmatches + partialmatches)``` to ```candidates = ListCompact(ListCombine(fullmatches,partialmatches))```.

In JS, concatenating two arrays like this ```fullmatches + partialmatches``` outputs a string.

---
Paste this into your game in full code view before compiling in Quest JS!

```xml
  <function name="ResolveNameFromList" parameters="variable, value, objtype, scope, secondaryscope" type="object"><![CDATA[
    value = Trim(LCase(value))
    fullmatches = NewObjectList()
    partialmatches = NewObjectList()
    foreach (obj, scope) {
      name = LCase(GetDisplayAlias(obj))
      CompareNames (name, value, obj, fullmatches, partialmatches)
      if (obj.alt <> null) {
        foreach (altname, obj.alt) {
          CompareNames (LCase(altname), value, obj, fullmatches, partialmatches)
        }
      }
    }
    // allow referring to objects from the previous command by gender or article
    if (objtype = "object" and game.lastobjects <> null) {
      foreach (obj, game.lastobjects) {
        CompareNames (LCase(obj.article), value, obj, fullmatches, partialmatches)
        CompareNames (LCase(obj.gender), value, obj, fullmatches, partialmatches)
      }
    }
    // Also check the secondary scope, but only if we have not found anything yet
    if (ListCount(fullmatches) = 0 and ListCount(partialmatches) = 0 and not secondaryscope = null) {
      foreach (obj, secondaryscope) {
        name = LCase(GetDisplayAlias(obj))
        CompareNames (name, value, obj, fullmatches, partialmatches)
        if (obj.alt <> null) {
          foreach (altname, obj.alt) {
            CompareNames (LCase(altname), value, obj, fullmatches, partialmatches)
          }
        }
      }
    }
    if (ListCount(fullmatches) = 1) {
      return (ListItem(fullmatches, 0))
    }
    else if (ListCount(fullmatches) = 0 and ListCount(partialmatches) = 1) {
      return (ListItem(partialmatches, 0))
    }
    else if (ListCount(fullmatches) + ListCount(partialmatches) = 0) {
      return (null)
    }
    else {
      candidates = ListCompact(ListCombine(fullmatches,partialmatches))
      if (LengthOf(variable) > 0) {
        // single object command, so after showing the menu, add the object to game.pov.currentcommandresolvedelements
        game.pov.currentcommandpendingvariable = variable
        ShowMenu (DynamicTemplate("DisambiguateMenu", value), candidates, true) {
          varname = game.pov.currentcommandpendingvariable
          game.pov.currentcommandpendingvariable = null
          if (result <> null) {
            AddToResolvedNames (varname, GetObject(result))
          }
        }
      }
      else {
        // multi-object command, so after showing the menu, add the object to the list
        game.pov.currentcommandmultiobjectpending = true
        ShowMenu (DynamicTemplate("DisambiguateMenu", value), candidates, true) {
          if (result <> null) {
            list add (game.pov.currentcommandpendingobjectlist, GetObject(result))
            ResolveNextNameListItem
          }
        }
      }
      return (null)
    }
  ]]></function>
```
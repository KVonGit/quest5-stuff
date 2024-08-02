QuestJS games sometimes add the wrong inherited verbs, and sometimes add extra verbs (this happens with switchable objects).


Here's the function in Quest:

```xml
  <function name="GetDisplayVerbs" parameters="object" type="stringlist">
    if (Contains(game.pov, object)) {
      baselist = object.inventoryverbs
    }
    else {
      baselist = object.displayverbs
    }
    if (not game.autodisplayverbs or GetBoolean(object, "usestandardverblist") or not HasAttribute(game, "verbattributes")) {
      return (baselist)
    }
    else {
      if (HasAttribute(object, "generatedverbslist")) {
        verbs = object.generatedverbslist
      }
      else {
        verbs = NewStringList()
        foreach (attr, GetAttributeNames(object, false)) {
          if (ListContains(game.verbattributes, attr)) {
            cmd = ObjectDictionaryItem(game.verbattributeslookup, attr)
            if (HasString(cmd, "displayverb")) {
              displayverb = CapFirst(cmd.displayverb)
            }
            else {
              displayverb = CapFirst(attr)
            }
            if (not ListContains(baselist, displayverb)) {
              list add (verbs, displayverb)
            }
          }
        }
        object.generatedverbslist = verbs
      }
      if (GetBoolean(object, "useindividualverblist")) {
        return (verbs)
      }
      else {
        return (ListCombine(baselist, verbs))
      }
    }
  </function>
```


---
Here's the function after converting to JS (note the section where it generates the verbs):

```js
function GetDisplayVerbs(object)
{
if (Contains(_obj321.pov, object)) {
var baselist = object.inventoryverbs;
}
else {
var baselist = object.displayverbs;
}
if (!(_obj321.autodisplayverbs )|| GetBoolean(object, "usestandardverblist") || !(HasAttribute(_obj321, "verbattributes"))) {
return (baselist);
}
else {
if (HasAttribute(object, "generatedverbslist")) {
var verbs = object.generatedverbslist;
}
else {
var verbs = NewStringList();
var list_attr = GetAttributeNames(object, false);
var list_attr_isarray = (Object.prototype.toString.call(list_attr) === '[object Array]');
for (var iterator_attr in list_attr) {
var attr = list_attr_isarray ? list_attr[iterator_attr] : iterator_attr;
if (list_attr_isarray || iterator_attr!="__dummyKey") { if (ListContains(_obj321.verbattributes, attr)) {
var cmd = ObjectDictionaryItem(_obj321.verbattributeslookup, attr);
if (HasString(cmd, "displayverb")) {
var displayverb = CapFirst(cmd.displayverb);
}
else {
var displayverb = CapFirst(attr);
}
if (!(ListContains(baselist, displayverb))) {
listadd (verbs, displayverb);
}
} }
}
set(object, "generatedverbslist", verbs);
}
if (GetBoolean(object, "useindividualverblist")) {
return (verbs);
}
else {
return (ListCombine(baselist, verbs));
}
}
}
```
The default GIVE response doesn't always technically make sense, so here is a fix.

Add these two bits of code (which were written by Pixie) in full code view:

```xml
  <dynamictemplate name="DefaultGive">DefaultGiveFunc(object1, object2)</dynamictemplate>
```

```xml
  <function name="DefaultGiveFunc" parameters="object1, object2" type="string">
    if (DoesInherit(object1, "npc_type")) {
      return (WriteVerb(object1, "do") + " not want " + object2.article + ".")
    }
    else {
      return ("That doesn't work.")
    }
  </function>
```

---
See this post:

http://textadventures.co.uk/forum/quest/topic/3ap3gqnvd06wxnawdrtzjw/giving-items-to-inanimate-objects

---
Also:

[How to add code in full code view](Adding-Code-in-Full-Code-View-(DESKTOP-ONLY))
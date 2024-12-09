```xml
  <command name="lookin">
    <pattern type="string"><![CDATA[^(look|examine|ex|x) (in|inside (of|)) (?<object>.+)$]]></pattern>
    <script><![CDATA[
      if (GetBoolean(object, "container")) {
        if (not DoesInherit (object, "surface")) {
          if (object.isopen) {
            if (ListCount(GetDirectChildren(object))>0) {
              ListObjectContents (object)
            }
            else {
              msg (CapFirst(object.gender) + " " + Conjugate(object, "appear") + " to be empty.")
            }
          }
          else {
            msg (DynamicTemplate("ObjectNotOpen", object))
          }
        }
        else {
          msg (CapFirst(object.gender) + " " + Conjugate(object, "do") + " not work that way.")
        }
      }
      else {
        msg (CapFirst(object.gender) + " " + Conjugate(object, "do") + " not work that way.")
      }
    ]]></script>
    <scope type="string"></scope>
  </command>
```

```xml
  <command name="lookon">
    <pattern type="string"><![CDATA[^(look|examine|ex|x) on( top( of|)|) (?<object>.+)$]]></pattern>
    <script><![CDATA[
      if (DoesInherit (object, "surface")) {
        if (ListCount(GetDirectChildren(object))>0) {
          ListObjectContents (object)
        }
        else {
          msg (CapFirst(object.gender) + " " + Conjugate(object, "appear") + " to be bare.")
        }
      }
      else {
        msg (CapFirst(object.gender) + " " + Conjugate(object, "do") + " not work that way.")
      }
    ]]></script>
    <scope type="string"></scope>
  </command>
```

```xml
  <dynamictemplate name="ObjectNotOpen">CapFirst(object.gender) + " " + Conjugate(object, "be") + " not open."</dynamictemplate>
```
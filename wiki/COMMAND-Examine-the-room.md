```xml
  <command name="lookatroom">
    <pattern>look at #object#; look #object#; x #object#; examine #object#; exam #object#; ex #object#</pattern>
    <changecommandscope type="script">
      list add (items, game.pov.parent)
    </changecommandscope>
    <script>
      if (object = game.pov.parent) {
        ShowRoomDescription
      }
      else {
        params = NewDictionary()
        dictionary add (params, "object", object)
        do (lookat, "script", params)
      }
    </script>
  </command>
```
[![gif](https://user-images.githubusercontent.com/30656341/39351016-99727ecc-49c5-11e8-8d69-2cc74ed56103.gif)](https://user-images.githubusercontent.com/30656341/39351016-99727ecc-49c5-11e8-8d69-2cc74ed56103.gif)

```xml
<!--Saved by Quest 5.8.6689.24908-->
<asl version="550">
  <include ref="English.aslx" />
  <include ref="Core.aslx" />
  <game name="Canvas">
    <gameid>672f1ea8-339c-481d-b18e-1a2b2484a29e</gameid>
    <version>1.0</version>
    <firstpublished>2018</firstpublished>
    <gridmap />
    <roomenter type="script">
      JS.Grid_ClearAllLayers ()
      Grid_Redraw
      Grid_DrawPlayerInRoom (game.pov.parent)
    </roomenter>
  </game>
  <object name="room">
    <inherit name="editor_room" />
    <isroom />
    <object name="player">
      <inherit name="editor_object" />
      <inherit name="editor_player" />
    </object>
    <exit alias="north" to="second room">
      <inherit name="northdirection" />
    </exit>
  </object>
  <object name="second room">
    <inherit name="editor_room" />
    <attr name="grid_player_color">red</attr>
    <exit alias="south" to="room">
      <inherit name="southdirection" />
    </exit>
  </object>
  <function name="Grid_DrawPlayerInRoom" parameters="room">
    if (room.grid_render) {
      Grid_DrawRoom (room, false, game.pov)
      player_x = Grid_GetGridCoordinateForPlayer(game.pov, room, "x") + room.grid_width/2.0
      player_y = Grid_GetGridCoordinateForPlayer(game.pov, room, "y") + room.grid_length/2.0
      player_z = Grid_GetGridCoordinateForPlayer(game.pov, room, "z")
      // Grid_DrawPlayer(x, y, z, radius, border, borderWidth, fill)
      if (HasAttribute(room,"grid_player_color")) {
        color = room.grid_player_color
        msg (color)
      }
      else {
        color = "green"
      }
      JS.Grid_DrawPlayer (player_x, player_y, player_z, 5, "black", 2, color)
    }
  </function>
</asl>
```
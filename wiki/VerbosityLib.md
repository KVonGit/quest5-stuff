The library:

[VerbosityLib.aslx](https://raw.githubusercontent.com/KVonGit/QuestStuff/master/libraries/VerbosityLib.aslx)

---
Entering SUPERBRIEF or SHORT will silence any room descriptions (except for the room name, the objects list, and the exits list), even if you haven't visited the room.

Entering BRIEF will silence room descriptions in rooms you have visited before

Entering VERBOSE or LONG will display all room descriptions


---
This effects every room in the game, whether you enter a room or enter LOOK.

---

You only need to include the library.

There is no need to add any other code, not even to the rooms themselves.

---

Example game code:

<details>

```
<!--Saved by Quest 5.7.6606.27193-->
<asl version="550">
  <include ref="English.aslx" />
  <include ref="Core.aslx" />
  <game name="Room Descriptions">
    <gameid>cdf9bb53-4c92-434e-af0f-1bbf6648000c</gameid>
    <version>1.0</version>
    <firstpublished>2018</firstpublished>
    <start type="script">
      game.autodescription_descriptionBak = game.autodescription_description
    </start>
    <description>Just an example with BRIEF, SUPERBRIEF, and VERBOSE commands to handle room descriptions.</description>
    <attr name="autodescription_description" type="int">2</attr>
    <attr name="autodescription_youcansee" type="int">3</attr>
    <attr name="autodescription_youcango" type="int">4</attr>
  </game>
  <object name="room">
    <inherit name="editor_room" />
    <description><![CDATA[Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?<br/>]]></description>
    <object name="player">
      <inherit name="editor_object" />
      <inherit name="editor_player" />
    </object>
    <exit alias="north" to="second room">
      <inherit name="northdirection" />
    </exit>
    <object name="Steve">
      <inherit name="editor_object" />
      <inherit name="namedmale" />
      <look>He looks like a man.</look>
    </object>
  </object>
  <command name="brief_cmd">
    <pattern>brief</pattern>
    <script><![CDATA[
      if (not GetBoolean(game, "brief_descriptions")) {
        game.brief_descriptions = true
        game.autodescription_description = game.autodescription_descriptionBak
      }
      msg ("Room Descriptions is now in its \"brief\" printing mode, which gives long descriptions of places never before visited and short descriptions otherwise.<br/>")
    ]]></script>
  </command>
  <command name="superbrief_cmd">
    <pattern>superbrief;short</pattern>
    <script><![CDATA[
      game.autodescription_description = 0
      msg ("Room Descriptions is now in its \"superbrief\" mode, which always gives short descriptions of locations (even if you haven't been there before).<br/>")
    ]]></script>
  </command>
  <command name="verbose_cmd">
    <pattern>verbose;long</pattern>
    <script><![CDATA[
      game.autodescription_description = game.autodescription_descriptionBak
      game.brief_descriptions = false
      msg ("Room Descriptions is now in its \"verbose\" mode, which always gives long descriptions of locations (even if you've been there before).<br/>")
    ]]></script>
  </command>
  <object name="second room">
    <inherit name="editor_room" />
    <description><![CDATA[But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?<br/>]]></description>
    <exit alias="south" to="room">
      <inherit name="southdirection" />
    </exit>
    <object name="Amanda">
      <inherit name="editor_object" />
      <inherit name="namedfemale" />
      <look>She looks like a woman.</look>
    </object>
  </object>
  <function name="ShowRoomDescription"><![CDATA[
    if (GetBoolean(game,"brief_descriptions")) {
      if (game.pov.parent.visited) {
        game.autodescription_description = 0
      }
    }
    isDark = CheckDarkness()
    if (isDark) {
      descriptionfield = "darkroomdescription"
    }
    else {
      descriptionfield = "description"
    }
    if (game.autodescription) {
      desc = ""
      for (i, 1, 4) {
        if (i = game.autodescription_youarein) {
          if (game.autodescription_youarein_useprefix) {
            youarein = game.pov.parent.descprefix
            desc = AddDescriptionLine (desc, youarein + " " + GetDisplayName(game.pov.parent) + ".")
          }
          else {
            desc = AddDescriptionLine (desc, "<b>" + CapFirst(GetDisplayName(game.pov.parent)) + "</b>")
          }
          if (game.autodescription_youarein_newline) {
            msg (desc + "<br/>")
            desc = ""
          }
        }
        if (i = game.autodescription_youcansee) {
          objects = FormatObjectList(game.pov.parent.objectslistprefix, GetNonTransparentParent(game.pov.parent), Template("And"), ".")
          desc = AddDescriptionLine(desc, objects)
          if (game.autodescription_youcansee_newline) {
            msg (desc + "<br/>")
            desc = ""
          }
        }
        if (i = game.autodescription_youcango) {
          exits = FormatExitList(game.pov.parent.exitslistprefix, GetExitsList(), Template("Or"), ".")
          desc = AddDescriptionLine(desc, exits)
          if (game.autodescription_youcango_newline) {
            msg (desc + "<br/>")
            desc = ""
          }
        }
        if (i = game.autodescription_description) {
          if (HasScript(game.pov.parent, descriptionfield)) {
            if (LengthOf(desc) > 0) {
              msg (desc)
              desc = ""
            }
            do (game.pov.parent, descriptionfield)
            if (game.autodescription_description_newline) {
              msg ("")
            }
          }
          else {
            desc = AddDescriptionLine(desc, GetRoomDescription())
            if (game.autodescription_description_newline) {
              msg (desc + "<br/>")
              desc = ""
            }
          }
        }
      }
      if (LengthOf(desc) > 0) {
        msg (desc)
      }
    }
    else {
      if (HasScript(game.pov.parent, descriptionfield)) {
        do (game.pov.parent, descriptionfield)
      }
      else {
        fulldesc = GetRoomDescription()
        if (LengthOf(fulldesc) > 0) {
          msg (fulldesc)
        }
      }
    }
    if (GetBoolean(game,"brief_descriptions")) {
      game.autodescription_description = game.autodescription_descriptionBak
    }
  ]]></function>
</asl>
```

</details>

---
Play the example game:
http://textadventures.co.uk/games/view/tks44blfveebumw-i1lhlg/room-descriptions
Hello.

First, I'd like to thank mrangel for helping me out when I couldn't figure out which parameter to check in this code!

---
In the Hitchhiker's Guide to the Galaxy, a bad command is thrown back in the player's face towards the end of the game.

To do this in Quest, we can use an attribute to save an unrecognized command.  (I'll just set it up to keep track of the last unrecognized command, which should still be fresh on the player's mind.)

Add the attribute ```unresolvedcommandhandler``` to your game object.  Set it as a script.

Put this for the code in code view:

```
game.pov.lasterror = command
msg (Template("UnrecognisedCommand"))
```

![image](https://user-images.githubusercontent.com/30656341/40334261-7051cef6-5d22-11e8-8ff0-73068b108881.png)

---
It will look like this in the GUI once you exit the script's code view:

![image](https://user-images.githubusercontent.com/30656341/40334270-7c41246e-5d22-11e8-905a-9c12e63ea566.png)

---
From here, you can do whatever you wish with ```game.pov.lasterror```.  I will create a room called the Hall of Humility.

![image](https://user-images.githubusercontent.com/30656341/40334483-b1b044d0-5d23-11e8-9835-7a5959f1238f.png)

---
I will create a turn script named "humiliation_turnscript" in this room, making sure to enable it.  In a real game*, if there is no last error (which is highly unlikely), the turn script will do nothing.

*\* This game only has 2 rooms.  You'll have to enter a bad command on purposes.  (NOTE:  Unrecognised objects don't count!)*

This is my script in code view:
```
if (HasAttribute(game.pov, "lasterror") and not game.pov.lasterror = "") {
  msg ("<br/>The speaker begins to hum.  You hear some idiot saying, \""+game.pov.lasterror+", "+game.pov.lasterror+", "+game.pov.lasterror+"...\"")
}
```

---
Here it is in the GUI:

![image](https://user-images.githubusercontent.com/30656341/40334648-95223cc8-5d24-11e8-826b-7985af745374.png)

---
<a href="https://user-images.githubusercontent.com/30656341/40334846-e4d7ab1c-5d25-11e8-9cc6-8f6bcd6265f8.gif"><img loop src="https://user-images.githubusercontent.com/30656341/40334846-e4d7ab1c-5d25-11e8-9cc6-8f6bcd6265f8.gif"/></a>

---
The Example Game's Code:

<details>

```
<!--Saved by Quest 5.7.6606.27193-->
<asl version="550">
  <include ref="English.aslx" />
  <include ref="Core.aslx" />
  <game name="Hitchhiker's Gag">
    <gameid>90eed04e-7ed5-4e7d-ab7f-395f7286d9cc</gameid>
    <version>1.0</version>
    <firstpublished>2018</firstpublished>
    <attr name="autodescription_youarein_useprefix" type="boolean">false</attr>
    <attr name="autodescription_youcansee" type="int">3</attr>
    <attr name="autodescription_youcango" type="int">4</attr>
    <attr name="autodescription_description" type="int">2</attr>
    <unresolvedcommandhandler type="script">
      game.pov.lasterror = command
      msg (Template("UnrecognisedCommand"))
    </unresolvedcommandhandler>
  </game>
  <object name="room">
    <inherit name="editor_room" />
    <isroom />
    <object name="player">
      <inherit name="editor_object" />
      <inherit name="editor_player" />
    </object>
    <exit alias="north" to="Hall of Humility">
      <inherit name="northdirection" />
    </exit>
  </object>
  <object name="Hall of Humility">
    <inherit name="editor_room" />
    <description><![CDATA[A long, narrow hallway. There is a louvered, metal grille in the ceiling, which keeps adventurers like you from destroying the speaker behind it.<br/>]]></description>
    <usedefaultprefix type="boolean">false</usedefaultprefix>
    <objectslistprefix>You can see</objectslistprefix>
    <enter type="script">
    </enter>
    <exit alias="south" to="room">
      <inherit name="southdirection" />
    </exit>
    <object name="louvered metal grille">
      <inherit name="editor_object" />
      <look><![CDATA[A 2' by 2' grille, made of steel and painted white.  It looks a little worn for wear, as if someone had tried to run a train through it a few times, but still appears as sturdy as can be.<br/>]]></look>
      <takemsg>You can't reach it.</takemsg>
      <not_all />
      <scenery />
    </object>
    <object name="speaker">
      <inherit name="editor_object" />
      <takemsg>{notfirst:You can't reach it.}{once:Even if you could reach it, you couldn't get past the grille.}</takemsg>
      <not_all />
      <scenery />
      <look>A large speaker, strategically placed behind a metal grille.</look>
    </object>
    <turnscript name="humiliation_turnscript">
      <enabled />
      <script><![CDATA[
        if (HasAttribute(game.pov, "lasterror") and not game.pov.lasterror = "") {
          msg ("<br/>The speaker begins to hum.  You hear some idiot saying, \""+game.pov.lasterror+", "+game.pov.lasterror+", "+game.pov.lasterror+"...\"")
        }
      ]]></script>
    </turnscript>
  </object>
</asl>
```

</details>
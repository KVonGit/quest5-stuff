```xml
<!--Saved by Quest 5.7.6606.27193-->
<asl version="550">
  <include ref="English.aslx" />
  <include ref="Core.aslx" />
  <game name="Call People">
    <gameid>8a58a8e3-51ad-4b3f-8afb-55aa9c16f281</gameid>
    <version>1.1</version>
    <firstpublished>2018</firstpublished>
    <feature_asktell />
  </game>
  <object name="room">
    <inherit name="editor_room" />
    <object name="player">
      <inherit name="editor_object" />
      <inherit name="editor_player" />
    </object>
    <object name="phone">
      <inherit name="editor_object" />
      <contacts type="stringdictionary">
        <item>
          <key>12345</key>
          <value>Ralph</value>
        </item>
      </contacts>
      <feature_usegive />
      <use type="script">
        msg ("You need to call a number. Try something like CALL 12345")
      </use>
      <hangup type="script">
        if (GetBoolean (game.pov, "onphone")) {
          msg ("You end the call.")
          DisconnectCall
        }
        else {
          msg ("You are not talking to anyone on the phone.")
        }
      </hangup>
      <look type="script"><![CDATA[
        msg ("An ordinary phone.  <br/><br/>To use it, call a number. Example: CALL 12345<br/><br/>To end a call, enter END CALL or HANG UP THE PHONE<br/>")
        if (ListCount(this.contacts)>0) {
          msg ("There is a list of contacts on it:<br/>")
          table = "<table class='contacts-table'><tr><th>Contact</th><th>Number</th></tr>"
          foreach (contact, this.contacts) {
            table = table + "<tr><td>"+this.contacts[contact]+"</td><td>"+contact+"</td></tr>"
          }
          table = table + "</table>"
          msg (table)
          JS.setCss (".contacts-table *", "padding:4px")
        }
      ]]></look>
      <takemsg>It's fixed in place.</takemsg>
      <displayverbs type="stringlist">
        <value>Look at</value>
        <value>Use</value>
      </displayverbs>
    </object>
    <exit alias="north" to="second room">
      <inherit name="northdirection" />
    </exit>
  </object>
  <object name="Ralph">
    <inherit name="editor_object" />
    <inherit name="namedmale" />
    <ask type="scriptdictionary">
      <item key="game">
        msg ("\"This is just an example game,\" says Ralph.")
      </item>
    </ask>
    <askdefault type="script">
      msg ("Ralph {random:says nothing:remains silent:does not reply}.")
    </askdefault>
    <telldefault type="script">
      msg ("Ralph {random:says nothing:remains silent:does not reply}.")
    </telldefault>
    <telltodefault type="script">
      msg ("Ralph {random:says nothing:remains silent:does not reply}.")
    </telltodefault>
    <speak type="script"><![CDATA[
      if (GetBoolean(Ralph,"onphone")) {
        msg ("\"You mean you called me just to talk?!?\"  Ralph sounds offended.  \"You're not even going to ask me about the game?!?\"<br/><br/>Click.  Ralph just hung up on you.")
        DisconnectCall
      }
      else {
        msg ("\"This game is boring,\" says Ralph.")
      }
    ]]></speak>
    <hellomsg>"Hello, this is Ralph."</hellomsg>
  </object>
  <command name="call_cmd">
    <pattern>call #text#;dial #text#</pattern>
    <script>
      if (not ListContains(ScopeReachable(),phone)) {
        msg ("You need a phone to do that.")
      }
      else {
        if (not GetBoolean(game.pov, "onphone")) {
          if (DictionaryContains(phone.contacts,Trim(text))) {
            o = StringDictionaryItem(phone.contacts,Trim(text))
            o = GetObject(o)
            if (not ListContains(ScopeReachable(),o)) {
              phone.aliasbak = GetDisplayAlias(phone)
              phone.alias = GetDisplayAlias(phone) + " (connected to "+GetDisplayName(o)+")"
              o.visiblebak = o.visible
              o.visible = true
              o.scenerybak = o.scenery
              o.scenery = true
              o.parent = o.parentbak
              MoveObjectHere (o)
              game.pov.onphone = true
              o.onphone = true
              phone.connectedto = o
              if (HasAttribute(o,"hellomsg")) {
                msg (o.hellomsg)
              }
              else {
                msg (CapFirst(GetDisplayName(o))+" answers the phone. \"Hello.\"")
              }
              EnableTurnScript (phone_surveillance)
            }
            else {
              msg (CapFirst(GetDisplayName(o))+" is here with you.  No need to call "+o.article+".")
            }
          }
          else {
            msg ("Your call did not go through.  Please check the number and try your call again.")
          }
        }
        else {
          msg ("You are currently on a call with " + GetDisplayName(phone.connectedto)+".")
        }
      }
    </script>
  </command>
  <command name="end_call_cmd">
    <pattern>end call;terminate call</pattern>
    <script>
      if (GetBoolean (game.pov, "onphone")) {
        msg ("You end the call.")
        DisconnectCall
      }
      else {
        msg ("You are not on the phone.")
      }
    </script>
  </command>
  <verb>
    <property>hangup</property>
    <pattern>hang up</pattern>
    <defaultexpression>"You can't hang up " + object.article + "."</defaultexpression>
  </verb>
  <turnscript name="phone_surveillance">
    <enabled type="boolean">false</enabled>
    <script><![CDATA[
      if (not ListContains(ScopeReachable(),phone)) {
        if (game.pov.onphone) {
          if (not GetBoolean(phone,"onhold")) {
            msg ("<br/>You have walked away from the phone, and "+GetDisplayName(phone.connectedto)+" probably hung up.<br/>")
            DisconnectCall
          }
        }
      }
    ]]></script>
  </turnscript>
  <object name="second room">
    <inherit name="editor_room" />
    <exit alias="south" to="room">
      <inherit name="southdirection" />
    </exit>
  </object>
  <function name="DisconnectCall">
    game.pov.onphone = false
    o = phone.connectedto
    o.onphone = false
    o.alias = o.aliasbak
    o.scenery = o.scenerybak
    o.visible = o.visiblebak
    o.parent = o.parentbak
    phone.alias = phone.aliasbak
    phone.connectedto = null
    DisableTurnScript (phone_surveillance)
  </function>
</asl>
```
```xml
<!--Saved by Quest 5.7.6404.15496-->
<asl version="550">
  <include ref="English.aslx" />
  <include ref="Core.aslx" />
  <dynamictemplate name="ObjectNotOpen">"The "+GetDisplayAlias(object) + " " + Conjugate(object, "be") + " not open."</dynamictemplate>
  <game name="Vending Machine">
    <gameid>ac777d98-ee5d-4371-a0c2-353536868b35</gameid>
    <version>1.0</version>
    <firstpublished>2017</firstpublished>
    <showmoney />
    <start type="script">
      CloneDollarAndMove (break_room)
      CloneDollarAndMove (break_room)
    </start>
  </game>
  <object name="break_room">
    <inherit name="editor_room" />
    <alias>break room</alias>
    <object name="player">
      <inherit name="editor_object" />
      <inherit name="editor_player" />
    </object>
    <object name="vending_machine">
      <inherit name="editor_object" />
      <inherit name="container_open" />
      <feature_container />
      <open type="boolean">false</open>
      <close type="boolean">false</close>
      <displayverbs type="stringlist">
        <value>Look at</value>
        <value>Take</value>
      </displayverbs>
      <takemsg>It's much too big.</takemsg>
      <alias>Vending Machine</alias>
      <credit type="int">0</credit>
      <isopen />
      <transparent type="boolean">false</transparent>
      <hidechildren />
      <listchildren />
      <look><![CDATA[The machine has {vending_machine.credit} credit{if vending_machine.credit<>1:s}.<br/><br/>On it, you can see {object:buttons} and a {object:slot}, and there is a {object:tray} at the bottom.]]></look>
      <addscript type="script"><![CDATA[
        if (not object.prototype = quest_buck) {
          msg (CapFirst(object.article) + " doesn't fit into the slot.")
        }
        else {
          vending_machine.credit = vending_machine.credit + 1
          msg ("Done.<br/>The machine has {vending_machine.credit} credit{if vending_machine.credit<>1:s} now.")
          game.pov.money = game.pov.money - 1
          RemoveObject (object)
        }
      ]]></addscript>
    </object>
    <object name="slot">
      <inherit name="editor_object" />
      <inherit name="container_open" />
      <scenery />
      <look><![CDATA[It has something written just above it.<br/><br/>It reads:  "INSERT ONE QUEST BUCK".]]></look>
      <feature_container />
      <open type="boolean">false</open>
      <close type="boolean">false</close>
      <displayverbs type="stringlist">
        <value>Look at</value>
      </displayverbs>
      <takemsg>It's part of the machine.</takemsg>
      <addscript type="script"><![CDATA[
        if (not object.prototype = quest_buck) {
          msg (CapFirst(object.article) + " doesn't fit into the slot.")
        }
        else {
          vending_machine.credit = vending_machine.credit + 1
          msg ("Done.<br/>The machine has {vending_machine.credit} credit{if vending_machine.credit<>1:s} now.")
          game.pov.money = game.pov.money - 1
          RemoveObject (object)
        }
      ]]></addscript>
    </object>
    <object name="buttons">
      <inherit name="editor_object" />
      <takemsg>They are part of the machine.</takemsg>
      <scenery />
      <look>There are two buttons: a {object:cola_button:Quest Cola} button and a {object:diet_cola_button:Diet Quest Cola} button.</look>
      <displayverbs type="stringlist">
        <value>Look at</value>
      </displayverbs>
    </object>
    <object name="diet_cola_button">
      <inherit name="editor_object" />
      <scenery />
      <takemsg>It's part of the machine.</takemsg>
      <alias>Diet Quest button</alias>
      <look>It reads: "DIET QUEST".</look>
      <displayverbs type="stringlist">
        <value>Look at</value>
      </displayverbs>
      <press type="script"><![CDATA[
        if (vending_machine.credit>0) {
          BuyDrink (diet_cola_can)
        }
        else {
          msg ("The vending machine doesn't have any credits.")
        }
      ]]></press>
      <push type="script">
        invoke (this.press)
      </push>
    </object>
    <object name="cola_button">
      <inherit name="editor_object" />
      <takemsg>It's part of the machine.</takemsg>
      <scenery />
      <alias>Quest Cola button</alias>
      <look>It reads: "QUEST COLA".</look>
      <displayverbs type="stringlist">
        <value>Look at</value>
      </displayverbs>
      <press type="script"><![CDATA[
        if (vending_machine.credit>0) {
          BuyDrink (cola_can)
        }
        else {
          msg ("The vending machine doesn't have any credits.")
        }
      ]]></press>
      <push type="script">
        invoke (this.press)
      </push>
    </object>
    <object name="tray">
      <inherit name="editor_object" />
      <inherit name="container_closed" />
      <scenery />
      <feature_container />
      <takemsg>It's part of the machine.</takemsg>
      <close type="boolean">false</close>
      <displayverbs type="stringlist">
        <value>Look at</value>
        <value>Open</value>
      </displayverbs>
      <look><![CDATA[A black tray {either tray.isopen:(currently open)|that swivels in when you push it.<br/><br/>It reads: "PUSH TO OPEN"}.]]></look>
      <onopen type="script"><![CDATA[
        SetTurnTimeout (4) {
          tray.isopen = false
          msg ("<br/>The tray just closed.")
        }
      ]]></onopen>
      <addscript type="script">
        msg ("Putting anything in there would be pointless.")
      </addscript>
      <push type="script">
        invoke (tray.press)
      </push>
      <press type="script">
        if (not tray.isopen) {
          msg ("The tray opens.")
          tray.isopen = true
          // invoke (tray.onopen)
        }
        else {
          msg ("It's already open.")
        }
      </press>
      <listchildren />
    </object>
  </object>
  <verb>
    <property>press</property>
    <pattern>press</pattern>
    <defaultexpression>"You can't press " + object.article + "."</defaultexpression>
  </verb>
  <command name="no_use">
    <pattern>use #object#</pattern>
    <script>
      msg ("I don't understand your command.")
    </script>
  </command>
  <object name="cola_can">
    <inherit name="editor_object" />
    <inherit name="container_closed" />
    <alias>can of Quest Cola</alias>
    <take />
    <feature_container />
    <close type="boolean">false</close>
    <openmsg>You pop the top.</openmsg>
    <instock type="int">2</instock>
    <look>A Quest Cola can.</look>
    <displayverbs type="stringlist">
      <value>Look at</value>
      <value>Take</value>
      <value>Open</value>
    </displayverbs>
    <drink type="script"><![CDATA[
      if (this.isopen) {
        if (ListCount(GetDirectChildren(this))>0) {
          foreach (drink, GetDirectChildren(this)) {
            if (HasAttribute(drink,"drink")) {
              do (drink, "drink")
              return (true)
            }
          }
        }
        else {
          msg ("It's empty.")
        }
      }
      else {
        msg ("It isn't open.")
      }
    ]]></drink>
    <object name="cola">
      <inherit name="editor_object" />
      <drinks type="int">6</drinks>
      <alias>cola</alias>
      <look>It's brown.</look>
      <smell>It smells sweet and fizzity!</smell>
      <taste>Not bad.</taste>
      <drink type="script">
        DrinkCola (this)
      </drink>
    </object>
  </object>
  <object name="diet_cola_can">
    <inherit name="editor_object" />
    <inherit name="container_closed" />
    <alias>can of Diet Quest Cola</alias>
    <take />
    <feature_container />
    <close type="boolean">false</close>
    <openmsg>You pop the top.</openmsg>
    <look>A Diet Quest Cola can.</look>
    <displayverbs type="stringlist">
      <value>Look at</value>
      <value>Take</value>
      <value>Open</value>
    </displayverbs>
    <instock type="int">4</instock>
    <drink type="script"><![CDATA[
      if (this.isopen) {
        if (ListCount(GetDirectChildren(this))>0) {
          foreach (drink, GetDirectChildren(this)) {
            if (HasAttribute(drink,"drink")) {
              do (drink, "drink")
              return (true)
            }
          }
        }
        else {
          msg ("It's empty.")
        }
      }
      else {
        msg ("It isn't open.")
      }
    ]]></drink>
    <object name="diet_cola">
      <inherit name="editor_object" />
      <drinks type="int">6</drinks>
      <alias>diet cola</alias>
      <look>It's brown.</look>
      <smell>It smells fizzity!</smell>
      <taste>Not bad.</taste>
      <drink type="script">
        DrinkCola (this)
      </drink>
    </object>
  </object>
  <object name="quest_buck">
    <inherit name="editor_object" />
    <take />
    <look><![CDATA[One Quest Buck.  <br/><br/>It has a picture of Alex Warren on one side, and a big <span style='font-size:200%;'> Q</span> on the other.<br/><br/>(It's worth one unidollar.)]]></look>
    <alias>Quest Buck</alias>
    <alt type="stringlist">
      <value>dollar</value>
      <value>money</value>
    </alt>
    <ontake type="script">
      game.pov.money = game.pov.money + 1
    </ontake>
  </object>
  <function name="BuyDrink" parameters="drink"><![CDATA[
    if (drink.instock > 0) {
      vending_machine.credit = vending_machine.credit - 1
      drink.instock = drink.instock - 1
      thisClone = CloneObjectAndMove(drink,tray)
      thisClone.prototype = drink
      msg ("The machine drops a can into the tray.")
    }
    else {
      msg ("The machine is sold out of "+GetDisplayAlias(drink)+"s.")
    }
  ]]></function>
  <function name="DrinkCola" parameters="this"><![CDATA[
    if (this.drinks>0) {
      msg ("You take a drink.")
      this.drinks = this.drinks - 1
      if (this.drinks<1) {
        msg ("  The can is now empty.")
        this.parent.alias = "empty can"
        if (HasString(this.parent,"look")) {
          this.parent.look = this.parent.look + "<br/><br/>It is empty."
        }
        RemoveObject (this)
      }
    }
    else {
      msg ("It's all gone.")
      this.parent.alias = "empty can"
      if (HasString(this.parent,"look")) {
        this.parent.look = this.parent.look + "<br/>"+CapFirst(object.article)+"is empty."
      }
      RemoveObject (this)
    }
  ]]></function>
  <function name="CloneDollarAndMove" parameters="room">
    newDollar = CloneObjectAndMove(quest_buck,room)
    newDollar.prototype = quest_buck
  </function>
  <walkthrough name="kv">
    <steps type="simplestringlist">
      get buck
      put it in the slot
      press cola button
    </steps>
  </walkthrough>
</asl>
```
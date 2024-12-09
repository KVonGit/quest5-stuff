# This is only necessary if you wish to EDIT your game.

---
**Adding one function to be called from the start script should be all that is required **if you want to keep your existing "wear" and "remove" scripts, otherwise follow [Pixie's suggestion to modify things to work with the newer Wearable features](http://textadventures.co.uk/forum/quest/topic/ew5zatkaskgyc1a7j5zqoa/getting-my-head-around-wearables-and-vice-versa#60668d26-10e2-4abe-98b9-45bd6653420a)**.**

---
Original game created using Quest 5.6.3:

<details>

```xml
<!--Saved by Quest 5.6.6582.36962-->
<asl version="550">
  <include ref="English.aslx" />
  <include ref="Core.aslx" />
  <game name="Old Wear Remix">
    <gameid>3b8173af-ced8-43f8-9010-e93991049b8e</gameid>
    <version>1.0</version>
    <firstpublished>2018</firstpublished>
    <author>Richard Headkid</author>
    <subtitle>A Test Game Created with Quest 5.6.3</subtitle>
    <start type="script">
    </start>
  </game>
  <object name="room">
    <inherit name="editor_room" />
    <object name="player">
      <inherit name="editor_object" />
      <inherit name="editor_player" />
    </object>
    <object name="gown">
      <inherit name="editor_object" />
      <wear type="script">
        if (not GetBoolean(this, "worn")) {
          this.worn = true
          msg ("You put it on.")
        }
        else {
          msg ("You are already wearing it.")
        }
      </wear>
      <don type="script">
        if (not GetBoolean(this, "worn")) {
          this.worn = true
          msg ("You don it.")
        }
        else {
          msg ("You are already wearing it.")
        }
      </don>
      <puton type="script">
        do (this, "wear")
      </puton>
      <remove type="script">
        if (GetBoolean(this, "worn")) {
          this.worn = false
          msg ("You remove your gown.")
        }
        else {
          msg ("You are not wearing it.")
        }
      </remove>
      <takeoff type="script">
        if (GetBoolean(this, "worn")) {
          this.worn = false
          msg ("You take off your gown.")
        }
        else {
          msg ("You are not wearing it.")
        }
      </takeoff>
      <doff type="script">
        if (GetBoolean(this, "worn")) {
          this.worn = false
          msg ("You doff your gown.")
        }
        else {
          msg ("You are not wearing it.")
        }
      </doff>
    </object>
  </object>
  <verb name="don">
    <property>don</property>
    <pattern>don</pattern>
    <defaultexpression>"You can't don " + object.article + "."</defaultexpression>
  </verb>
  <verb name="put on">
    <property>puton</property>
    <pattern>put on</pattern>
    <defaultexpression>"You can't put on " + object.article + "."</defaultexpression>
  </verb>
  <verb name="remove">
    <property>remove</property>
    <pattern>remove</pattern>
    <defaultexpression>"You can't remove " + object.article + "."</defaultexpression>
  </verb>
  <verb name="take off">
    <property>takeoff</property>
    <pattern>take off</pattern>
    <defaultexpression>"You can't take off " + object.article + "."</defaultexpression>
  </verb>
  <verb name="doff">
    <property>doff</property>
    <pattern>doff</pattern>
    <defaultexpression>"You can't doff " + object.article + "."</defaultexpression>
  </verb>
</asl>
```

</details>

---
### **Step 1**:

Create a function named **FixWearables**.

(It doesn't have any parameters, nor does it have any return type.)

Put this for the script in code view:
```c
wear.script => {
  if (multiple and ListCount(object) = 0) {
    msg ("You've nothing to wear.")
  }
  else {
    foreach (o, object) {
      if (ListCount(object) > 1) {
        s = CapFirst(GetDisplayName(o)) + ": "
        OutputTextNoBr (s)
      }
      if (HasAttribute(o, "wear")) {
        if (HasScript(o, "wear")) {
          do (o, "wear")
        }
        if (HasString(o, "wear")) {
          msg (o.wear)
        }
      }
      else {
        msg (s"You can't wear "+o.article+".")
      }
    }
  }
}
remove.script => {
  if (multiple and ListCount(object) = 0) {
    msg ("You've nothing to remove.")
  }
  else if (TypeOf(object) = "objectlist") {
    foreach (o, object) {
      if (ListCount(object) > 1) {
        s = CapFirst(GetDisplayName(o)) + ": "
        OutputTextNoBr (s)
      }
      if (HasAttribute(o, "remove")) {
        if (HasScript(o, "remove")) {
          do (o, "remove")
        }
        if (HasString(o, "remove")) {
          msg (o.remove)
        }
      }
      else {
        msg ("You can't remove "+o.article+".")
      }
    }
  }
  else {
    if (HasAttribute(object, "remove")) {
      if (HasScript(object, "remove")) {
        do (object, "remove")
      }
      if (HasString(object, "remove")) {
        msg (object.remove)
      }
    }
    else {
      msg ("You can't remove "+o.article+".")
    }
  }
}
foreach (o, AllObjects()) {
  if (HasAttribute(o, "wear")) {
    o.displayverbs = ListExclude(o.displayverbs, "")
    if (not ListContains(o.displayverbs, "Wear")) {
      list add (o.displayverbs, "Wear")
    }
    o.inventoryverbs = ListExclude(o.inventoryverbs, "")
    if (not ListContains(o.inventoryverbs, "Wear")) {
      list add (o.inventoryverbs, "Wear")
    }
  }
}
```

---
### **Step 2**
Add this line to your start script:

```c
FixWearables
```

---
### **TIP**

To edit the ```wear``` attribute on objects in the GUI, use the '**Attributes**' tab.  (```wear``` will not show up under the verbs tab!)

[![screenshot](https://user-images.githubusercontent.com/30656341/40210014-4cc58cec-5a08-11e8-94ca-9d5bac76a8c7.png)](https://user-images.githubusercontent.com/30656341/40210014-4cc58cec-5a08-11e8-94ca-9d5bac76a8c7.png)

---
The updated .aslx file (Quest 5.7.2):

<details>

```xml
<!--Saved by Quest 5.7.6606.27193-->
<asl version="550">
  <include ref="English.aslx" />
  <include ref="Core.aslx" />
  <game name="Old Wear Remix">
    <gameid>3b8173af-ced8-43f8-9010-e93991049b8e</gameid>
    <version>1.1</version>
    <firstpublished>2018</firstpublished>
    <author>Richard Headkid</author>
    <subtitle>A Test Game Created with Quest 5.6.3</subtitle>
    <start type="script">
      FixWearables
    </start>
  </game>
  <object name="room">
    <inherit name="editor_room" />
    <object name="player">
      <inherit name="editor_object" />
      <inherit name="editor_player" />
    </object>
    <object name="gown">
      <inherit name="editor_object" />
      <wear type="script">
        if (not GetBoolean(this, "worn")) {
          this.worn = true
          msg ("You put it on.")
        }
        else {
          msg ("You are already wearing it.")
        }
      </wear>
      <don type="script">
        if (not GetBoolean(this, "worn")) {
          this.worn = true
          msg ("You don it.")
        }
        else {
          msg ("You are already wearing it.")
        }
      </don>
      <puton type="script">
        do (this, "wear")
      </puton>
      <remove type="script">
        if (GetBoolean(this, "worn")) {
          this.worn = false
          msg ("You remove your gown.")
        }
        else {
          msg ("You are not wearing it.")
        }
      </remove>
      <takeoff type="script">
        if (GetBoolean(this, "worn")) {
          this.worn = false
          msg ("You take off your gown.")
        }
        else {
          msg ("You are not wearing it.")
        }
      </takeoff>
      <doff type="script">
        if (GetBoolean(this, "worn")) {
          this.worn = false
          msg ("You doff your gown.")
        }
        else {
          msg ("You are not wearing it.")
        }
      </doff>
    </object>
  </object>
  <verb name="don">
    <property>don</property>
    <pattern>don</pattern>
    <defaultexpression>"You can't don " + object.article + "."</defaultexpression>
  </verb>
  <verb name="put on">
    <property>puton</property>
    <pattern>put on</pattern>
    <defaultexpression>"You can't put on " + object.article + "."</defaultexpression>
  </verb>
  <verb name="remove">
    <property>remove</property>
    <pattern>remove</pattern>
    <defaultexpression>"You can't remove " + object.article + "."</defaultexpression>
  </verb>
  <verb name="take off">
    <property>takeoff</property>
    <pattern>take off</pattern>
    <defaultexpression>"You can't take off " + object.article + "."</defaultexpression>
  </verb>
  <verb name="doff">
    <property>doff</property>
    <pattern>doff</pattern>
    <defaultexpression>"You can't doff " + object.article + "."</defaultexpression>
  </verb>
  <function name="FixWearables"><![CDATA[
    wear.script => {
      if (multiple and ListCount(object) = 0) {
        msg ("You've nothing to wear.")
      }
      else {
        foreach (o, object) {
          if (ListCount(object) > 1) {
            s = CapFirst(GetDisplayName(o)) + ": "
            OutputTextNoBr (s)
          }
          if (HasAttribute(o, "wear")) {
            if (HasScript(o, "wear")) {
              do (o, "wear")
            }
            if (HasString(o, "wear")) {
              msg (o.wear)
            }
          }
          else {
            msg (s"You can't wear "+o.article+".")
          }
        }
      }
    }
    remove.script => {
      if (multiple and ListCount(object) = 0) {
        msg ("You've nothing to remove.")
      }
      else if (TypeOf(object) = "objectlist") {
        foreach (o, object) {
          if (ListCount(object) > 1) {
            s = CapFirst(GetDisplayName(o)) + ": "
            OutputTextNoBr (s)
          }
          if (HasAttribute(o, "remove")) {
            if (HasScript(o, "remove")) {
              do (o, "remove")
            }
            if (HasString(o, "remove")) {
              msg (o.remove)
            }
          }
          else {
            msg ("You can't remove "+o.article+".")
          }
        }
      }
      else {
        if (HasAttribute(object, "remove")) {
          if (HasScript(object, "remove")) {
            do (object, "remove")
          }
          if (HasString(object, "remove")) {
            msg (object.remove)
          }
        }
        else {
          msg ("You can't remove "+o.article+".")
        }
      }
    }
    foreach (o, AllObjects()) {
      if (HasAttribute(o, "wear")) {
        o.displayverbs = ListExclude(o.displayverbs, "")
        if (not ListContains(o.displayverbs, "Wear")) {
          list add (o.displayverbs, "Wear")
        }
        o.inventoryverbs = ListExclude(o.inventoryverbs, "")
        if (not ListContains(o.inventoryverbs, "Wear")) {
          list add (o.inventoryverbs, "Wear")
        }
      }
    }
  ]]></function>
</asl>
```

</details>

---
The updated .aslx file (same as above, but saved with Quest 5.8):

<details>

```xml
<!--Saved by Quest 5.8.6708.15638-->
<asl version="580">
  <include ref="English.aslx" />
  <include ref="Core.aslx" />
  <game name="Old Wear Remix">
    <gameid>3b8173af-ced8-43f8-9010-e93991049b8e</gameid>
    <version>2.0</version>
    <firstpublished>2018</firstpublished>
    <author>Richard Headkid</author>
    <subtitle>A Test Game Created with Quest 5.6.3</subtitle>
    <start type="script">
      FixWearables
    </start>
  </game>
  <object name="room">
    <inherit name="editor_room" />
    <object name="player">
      <inherit name="editor_object" />
      <inherit name="editor_player" />
    </object>
    <object name="gown">
      <inherit name="editor_object" />
      <wear type="script">
        if (not GetBoolean(this, "worn")) {
          this.worn = true
          msg ("You put it on.")
        }
        else {
          msg ("You are already wearing it.")
        }
      </wear>
      <don type="script">
        if (not GetBoolean(this, "worn")) {
          this.worn = true
          msg ("You don it.")
        }
        else {
          msg ("You are already wearing it.")
        }
      </don>
      <puton type="script">
        do (this, "wear")
      </puton>
      <remove type="script">
        if (GetBoolean(this, "worn")) {
          this.worn = false
          msg ("You remove your gown.")
        }
        else {
          msg ("You are not wearing it.")
        }
      </remove>
      <takeoff type="script">
        if (GetBoolean(this, "worn")) {
          this.worn = false
          msg ("You take off your gown.")
        }
        else {
          msg ("You are not wearing it.")
        }
      </takeoff>
      <doff type="script">
        if (GetBoolean(this, "worn")) {
          this.worn = false
          msg ("You doff your gown.")
        }
        else {
          msg ("You are not wearing it.")
        }
      </doff>
    </object>
  </object>
  <verb name="don">
    <property>don</property>
    <pattern>don</pattern>
    <defaultexpression>"You can't don " + object.article + "."</defaultexpression>
  </verb>
  <verb name="put on">
    <property>puton</property>
    <pattern>put on</pattern>
    <defaultexpression>"You can't put on " + object.article + "."</defaultexpression>
  </verb>
  <verb name="remove">
    <property>remove</property>
    <pattern>remove</pattern>
    <defaultexpression>"You can't remove " + object.article + "."</defaultexpression>
  </verb>
  <verb name="take off">
    <property>takeoff</property>
    <pattern>take off</pattern>
    <defaultexpression>"You can't take off " + object.article + "."</defaultexpression>
  </verb>
  <verb name="doff">
    <property>doff</property>
    <pattern>doff</pattern>
    <defaultexpression>"You can't doff " + object.article + "."</defaultexpression>
  </verb>
  <function name="FixWearables"><![CDATA[
    wear.script => {
      if (multiple and ListCount(object) = 0) {
        msg ("You've nothing to wear.")
      }
      else {
        foreach (o, object) {
          if (ListCount(object) > 1) {
            s = CapFirst(GetDisplayName(o)) + ": "
            OutputTextNoBr (s)
          }
          if (HasAttribute(o, "wear")) {
            if (HasScript(o, "wear")) {
              do (o, "wear")
            }
            if (HasString(o, "wear")) {
              msg (o.wear)
            }
          }
          else {
            msg (s"You can't wear "+o.article+".")
          }
        }
      }
    }
    remove.script => {
      if (multiple and ListCount(object) = 0) {
        msg ("You've nothing to remove.")
      }
      else if (TypeOf(object) = "objectlist") {
        foreach (o, object) {
          if (ListCount(object) > 1) {
            s = CapFirst(GetDisplayName(o)) + ": "
            OutputTextNoBr (s)
          }
          if (HasAttribute(o, "remove")) {
            if (HasScript(o, "remove")) {
              do (o, "remove")
            }
            if (HasString(o, "remove")) {
              msg (o.remove)
            }
          }
          else {
            msg ("You can't remove "+o.article+".")
          }
        }
      }
      else {
        if (HasAttribute(object, "remove")) {
          if (HasScript(object, "remove")) {
            do (object, "remove")
          }
          if (HasString(object, "remove")) {
            msg (object.remove)
          }
        }
        else {
          msg ("You can't remove "+o.article+".")
        }
      }
    }
    foreach (o, AllObjects()) {
      if (HasAttribute(o, "wear")) {
        o.displayverbs = ListExclude(o.displayverbs, "")
        if (not ListContains(o.displayverbs, "Wear")) {
          list add (o.displayverbs, "Wear")
        }
        o.inventoryverbs = ListExclude(o.inventoryverbs, "")
        if (not ListContains(o.inventoryverbs, "Wear")) {
          list add (o.inventoryverbs, "Wear")
        }
      }
    }
  ]]></function>
</asl>
```

</details>
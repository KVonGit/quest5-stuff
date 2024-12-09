Get the library here:

[NauticalDirectionsLib.aslx](https://raw.githubusercontent.com/KVonGit/QuestStuff/master/libraries/NauticalDirectionsLib.aslx)

---

# NauticalDirectionsLib

### INSTRUCTIONS:

If you are using NpcLib, this should be included AFTER it in the game's code for this NiceDirection() mod to work!

All rooms on a ship need to have a parent object which inherits "shiptype".

In order for the shortcut commands to work, you must add the appropriate type to the exit.

You do not need to change your exits' names or aliases. The script will turn the alias of each exit which is in a "shiptype" object to a nautical exit alias, as long as the exit inherits one of the nautical direction types.

#### Types:
"foredirection"

"portdirection"

"starboarddirection"

"aftdirection"

---
#### The shortcut commands:
fore, forward, f, port, p, starboard, sb, s, aft, a

---
### IMPORTANT:
#### ADD THE FOLLOWING 2 LINES TO THE ```game``` OBJECT'S ```inituserinterface```
```
SendToJsEval (js.description)
JS.changeCompass ()
```

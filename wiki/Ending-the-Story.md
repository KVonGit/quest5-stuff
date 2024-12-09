Now that Quest has a RESTART command (as of 5.8.0), we can do this:

![image](https://user-images.githubusercontent.com/30656341/39849192-b68e5b74-53d0-11e8-98bd-753bc5248a01.png)

---

```xml
  <function name="FinishGame" parameters="message"><![CDATA[
    message = "<h3>GAME OVER</h3>" + message
    ShowGameOverMenu (message)
  ]]></function>
```

```xml
  <function name="ShowGameOverMenu" parameters="message"><![CDATA[
    ShowMenu (message + "<br/>What would you like to do?", Split("UNDO your last command;RESTART from the beginning;QUIT the game", ";"), false) {
      switch (result) {
        case ("UNDO your last command") {
          invoke (undo.script)
        }
        case ("RESTART from the beginning") {
          JS.RestartGame ()
        }
        case ("QUIT the game") {
          finish
        }
        default {
          ShowGameOverMenu
        }
      }
    }
  ]]></function>
```
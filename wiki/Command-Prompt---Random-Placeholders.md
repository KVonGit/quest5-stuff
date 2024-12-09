In my **Easter Eggs** game, I have random placeholders in the text input field.

I added a string list attribute to my game object:
```xml
    <cmdprompts type="stringlist">
      <value>Happy Easter!</value>
      <value>This game was dyed in front of a studio audience.</value>
      <value>Please enter a command...</value>
      <value>No animals were harmed due to the making of EASTER EGGS.</value>
      <value>Lent is over!  (What did you do without?)</value>
      <value>Easter is the 1st Sunday after the 1st full moon during or after the Spring Equinox.</value>
      <value>Have you acquired the Jewel-encrusted Egg?</value>
    </cmdprompts>
```

![image](https://user-images.githubusercontent.com/30656341/38753798-274f5e3c-3f25-11e8-8860-f5ac7cf68a53.png)

---
Then I created (and enabled) a turn script:
```xml
  <turnscript name="command_prompt_randomness">
    <enabled />
    <script><![CDATA[
      if (not game.pov.currentcommand = null) {
        if (game.pov.currentcommand <> "quit") {
          cmdprompt = (PickOneString(game.cmdprompts))
          JS.setInterfaceString ("TypeHereLabel", cmdprompt)
        }
      }
    ]]></script>
  </turnscript>
```

![image](https://user-images.githubusercontent.com/30656341/38753850-4ed50b96-3f25-11e8-877f-9da22f2d5e53.png)


---
...and that's all there is to it!

---
## RELATED

[Command Bar Styling](Command-Bar-Styling)

By default, any command beginning with ```*``` will be considered a note and ignored by Quest.

Most other authoring systems work a little differently, though.  Any punctuation mark at the beginning of a command is considered a note in Inform games (and I think Tads works this way, as well).

So:

```xml
  <command name="noting">
    <pattern type="string">^\p{P}</pattern>
    <script>
      game.suppressturnscripts = true
      game.notarealturn = true
      msg ("Noted.")
    </script>
  </command>
```
Quest does not count the turns by default.

In your start script, add this:

```c
game.turn = 0
game.unresolvedcommandhandler => {
  game.notarealturn = game.notarealturn
  msg("Invalid command: \"" + command + "\"")
}
```


Then create a turn script named ```turncount_turnscript``` and **enable it**.  

Put this for the script:

```c
if (GetBoolean(game, "notarealturn")){
  game.notarealturn = false
}
else {
  game.turn = game.turn + 1
}
```

In any script which you DON'T wish to count as a turn (such as HELP or VERSION), you can add this:
```c
game.notarealturn = true
```

---
REFERENCES:

http://docs.textadventures.co.uk/quest/tutorial/using_timers_and_turn_scripts.html

http://docs.textadventures.co.uk/quest/advanced_game_scripts.html
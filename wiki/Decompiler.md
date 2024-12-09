**xlsa.sh**

```sh
#!/bin/bash

dir=$(basename "$1" .quest)
if [ ! -d "$dir" ]; then
  mkdir "$dir"
  #cd "$dir"
  unzip "$1" -d "$dir"
  sed '/<asl/a \  <include ref="English.aslx" \/>\n  <include ref="Core.aslx" \/>\n' "$dir"/game.aslx >> "$dir"/temp_"$dir".aslx
  sed '/^<implied element/ d' "$dir"/temp_"$dir".aslx >> "$dir"/"$dir".aslx
  rm "$dir"/temp_"$dir".aslx
  #cd ..
  echo "Done."
else
  echo "ERROR: Directory exists!"
fi
```

---
# Example

```
xlsa.sh SaveBob.quest
```

This will create the directory "SaveBob".  In this directory, you will find "gamefile.aslx", which can be opened and modified in the Quest editor.
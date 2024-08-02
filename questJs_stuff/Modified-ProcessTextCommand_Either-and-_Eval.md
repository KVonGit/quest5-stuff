I modified this to make things work correctly after the conversion.

```xml
  <function name="ProcessTextCommand_Either" parameters="section, data" type="string"><![CDATA[
    if (IsDefined("qjsPlayer")) {
      foreach (o, AllObjects()) {
        if (Instr(section,o.name) > -1) {
          section = Split(section,o.name)
          repl = "GetObject(\""+o.name="\")"
          section = Join(section, repl)
        }
      }
    }
    command = Mid(section, 8)
    colon = Instr(command, ":")
    if (colon = 0) {
      return ("@@@open@@@either " + command + "@@@close@@@")
    }
    text = Mid(command, colon + 1)
    colon2 = Instr(colon + 1, command, "|")
    if (colon2 = 0) {
      text2 = ""
    }
    else {
      text2 = Mid(command, colon2 + 1)
      text = Replace(text, "|" + text2, "")
    }
    condition = Left(command, colon - 1)
    if (not game.text_processor_this = null) {
      condition = Replace(condition, "this", game.text_processor_this.name)
    }
    result = eval(condition)
    if (result) {
      return (ProcessTextSection(text, data))
    }
    else {
      if (text2 = "") {
        return ("")
      }
      else {
        return (ProcessTextSection(text2, data))
      }
    }
  ]]></function>
```

---
# ProcessTextCommand_Eval
```xml
  <function name="ProcessTextCommand_Eval" parameters="section, data" type="string"><![CDATA[
    if (IsDefined("qjsPlayer")) {
      foreach (o, AllObjects()) {
        if (Instr(section,o.name) > -1) {
          section = Split(section,o.name)
          repl = "GetObject(\""+o.name+"\")"
          section = Join(section, repl)
        }
      }
    }
    if (StartsWith(section, "=")) {
      section = Mid(section, 2)
    }
    else {
      section = Mid(section, 6)
    }
    if (not IsRegexMatch("[^\\w\\s]", section, "tp_punctuation_check")) {
      section = section + "()"
    }
    return (ToString(eval(section)))
  ]]></function>
```
Add an enter verb in full code view:

```xml
  <verb name="enter_verb">
    <pattern>enter #object#;get in #object#;get into #object#</pattern>
    <property>enter</property>
    <defaultexpression>"You can't enter "+object.article+"."</defaultexpression>
    <scope>notheld</scope>
  </verb>
```
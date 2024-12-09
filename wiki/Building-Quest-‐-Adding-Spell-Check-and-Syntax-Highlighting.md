EditorControls\ExpressionControl.xaml line 28 (code modified to add Text Wrapping in expression boxes)

```xaml
        <TextBox Name="txtExpression" Grid.Column="1" TextChanged="txtExpression_TextChanged" LostFocus="txtExpression_LostFocus" HorizontalScrollBarVisibility="Auto" MinWidth="40" MinHeight="20" VerticalContentAlignment="Center" Background="White" SelectionBrush="#FF1D1B61" TextWrapping="Wrap">
```

---
EditorControls\ExpressionControl.xaml.cs line 95 (code added to enable Spell Check in expression and message boxes)

```cs
                    newTextBox.SpellCheck.IsEnabled = true;
```

---
EditorControls\RichTextControl.xaml line 14 (code modified to add Spell Check to Description boxes and all other rich text boxes)

```xaml
        <TextBox Name="textBox" TextChanged="textBox_TextChanged" LostFocus="textBox_LostFocus" MinWidth="40" MinHeight="20" AcceptsReturn="True" TextWrapping="Wrap" FontFamily="Georgia" FontSize="14" Padding="5" SpellCheck.IsEnabled="True" />
```

---
EditorControls\ScriptEditorControl.xaml line 47 (added lines 48 and 49 to add Syntax Highlighting (C#) and Word Wrap to script boxes)


```xaml
                    MaxHeight="500"
                    SyntaxHighlighting="C#"
                    WordWrap="True"/>
```

---
**EditorControls\TextBoxControl.xaml** line 9 (modified to include spell check)

```xaml
        <TextBox Name="textBox" TextChanged="textBox_TextChanged" LostFocus="textBox_LostFocus" MinWidth="40" MinHeight="20" VerticalContentAlignment="Center" SpellCheck.IsEnabled="True" />
```

---
TODO:

Add menu item option to toggle spell check (and possibly word wrap too?).

I do not know how to do this at this moment, but I'm sure it isn't *that* difficult to figure out by looking at the existing code.
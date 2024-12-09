I have modded Quest, and I don't want anyone who may be using my mod to be able to click the Forums link to ask questions on the TextAdventures site, because they probably have questions specifically pertaining to my modified code.

So, I figured out how to change the links.

**Quest\Main.vb** lines 363-369

```vb
    Private Sub LogBug()
        LaunchURL("https://github.com/KVonGit/quest5-stuff/issues")
    End Sub

    Private Sub Forums()
        LaunchURL("https://github.com/KVonGit/quest5-stuff/discussions")
    End Sub
```

---
For the docs and tutorial links, I link the HTML files which I have stored in Quest's "Core" folder.

**Quest\Main.vb** lines 371-377

```vb
    Private Sub Help()
        LaunchURL("file:///" & CurDir & "/Core/docs/docs.textadventures.co.uk/quest/index.html")
    End Sub
    
    Private Sub Tutorial()
        LaunchURL("file:///" & CurDir & "/Core/docs/docs.textadventures.co.uk/quest/tutorial/index.html")
    End Sub

```

> [!NOTE]
> By default, CurDir is the current directory of the app in VB.

---
There is one more place to change, in **GameBrowser\EditorWelcome.xaml.vb** lines 21-23

```vb
    Private Sub Hyperlink_Click(sender As System.Object, e As System.Windows.RoutedEventArgs)
        LaunchURL("https://github.com/KVonGit/quest5-stuff/wiki")
    End Sub

```
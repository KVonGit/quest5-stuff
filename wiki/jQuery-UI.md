jQuery UI is packaged with Quest, so most of the stuff here will work:

http://api.jqueryui.com/

---
An example with a self-destructing message:

```c
msg ("<span id='message1'>This message will self destruct!</span>")
SetTimeout (4) {
  JS.eval ("$('#message1').toggle('explode');")
  RemoveObject (message)
}
```

![msg_self_destruct 1](https://user-images.githubusercontent.com/30656341/38176660-76903974-35b8-11e8-8241-35f88a364556.gif)
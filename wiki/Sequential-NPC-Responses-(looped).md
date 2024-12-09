
```c#
firsttime {
  this.spokento = 0
}
game.text_processor_this = this
msg ("\"{select:this.spokento:I say this first:I say this second:I say this third},\" {this.gender} {random:says:responds:replies}.")
this.spokento = this.spokento + 1
if (this.spokento > 2) {
  this.spokento = 0
}
```
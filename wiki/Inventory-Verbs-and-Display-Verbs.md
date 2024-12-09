### Before trying to modify an object's inventory or display verbs list

Always copy the existing list's contents to a new list in place of itself, like this:

```c
object.displayverbs = ListExclude(object.displayverbs,"")
```

#### If you don't do that before attempting to modify a default list, you will see this error message:

***Error running script: Cannot modify the contents of this list as it is defined by an inherited type. Clone it before attempting to modify.***

### Once you *have* done that

You can add to the list with ```list add``` or remove with ```list remove```.


To add something to an object's list:

Display Verbs (displayed when object is in your location, but not held)
```c
list add (object.displayverbs, "Foo")
```

Inventory Verbs (displayed when object is held (this includes objects which are inside of objects you are carrying))
```c
list add (object.inventoryverbs, "Bar")
```

Removing stuff:
```c
list remove (object.displayverbs, "Foo")
```

```c
list remove (object.inventoryverbs, "Bar")
```


---
Let's say you have a weapon, which can be equipped or unequipped.

In the script for equip:
```c
firsttime{
  this.inventoryverbs = ListExclude(this.inventoryverbs,"")
}
if(not ListContains(this.inventoryverbs, "Unequip")){
  list add(this.inventoryverbs, "Unequip")
}
if(ListContains(this.inventoryverbs,"Equip")){
  list remove(this.inventoryverbs,"Equip")
}
```

In the script for unequip:
```c
firsttime{
  this.inventoryverbs = ListExclude(this.inventoryverbs,"")
}
if(not ListContains(this.inventoryverbs, "Equip")){
  list add(this.inventoryverbs, "Equip")
}
if(ListContains(this.inventoryverbs,"Unequip")){
  list remove(this.inventoryverbs,"Unequip")
}
```
If we want ALL objects to be set so they don't use the default prefix (there is no default suffix that I'm aware of):


We could add this to our start script in code view:
```c#
foreach(o,AllObjects()){
  o.usedefaultprefix = false
}
```


---
If we want specific objects to have no default prefix, we can enable the object's initialisation script.  Then we can put this in the script in code view:
```c#
this.usedefaultprefix = false
```

---
If we are using the ```create``` script command to create objects during play:

```c#
create("ball")
ball.usedefaultprefix = false
```

---
When cloning:
```c#
new_clone = CloneObject(ball)
new_clone.usedefaultprefix = false
```

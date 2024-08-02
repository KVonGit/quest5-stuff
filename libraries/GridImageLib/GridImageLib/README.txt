GridImageLib Version 2

==================
SETUP INSTRUCTIONS
==================
1. You need to have both files in your game folder, but you only need to include GridImageLib.aslx
 in your game's code.  (GridImageLib.aslx will add the GridImageLib.js file to your game.)

2. You need to add this line to the User Interface Initialisation script:  
    SetupGridImages
	
	
=====
ABOUT
=====

GridImgLib 

by KV

Special Guest Coders:  MrAngel & Dcoder

VERSION 2.0

This will allow you to set a picture to display in place of a room's 
standard map image.  

All you need to do is include this library along (make sure its js file is in the folder as well!),
 make sure the map is enabled,
then go to the new "Grid Image" tab on the room object.  From there, you can use the file browser to
 import an image file, or you can enter a URL to use an online image.  

(You can NOT enter the path to the file!  If using a local image, the file MUST be in the game's main
 folder!!!)

===

IMPORTANT NOTE:

If you want to switch back to using the standard map image, you must completelyremove the "grid_image"
 attribute from the room!!!

===

Designed for Quest 5.7.2
Year of publication: 2018

VERSION 2.1

Resolved issues with saved games.
	
Thanks to Dcoder and mrangel!
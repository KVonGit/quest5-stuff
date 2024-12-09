# Using Visual Studio Community 2022 to Build Quest 5.8 in 2024

## Clone the Quest repo, and open it in Visual Studio

### VS Community 2022

I am using Visual Studio Community 2022, which is the oldest free version available at the time of writing this.

### Clone, don't download

Don't download the ZIP from github.com. Actually use git or GitHub Desktop to clone the repo. Otherwise, you'll run into errors.

![image](https://github.com/user-attachments/assets/d449655a-8a3f-4680-ae1a-b7dd3b23c6a8)

---
I advise GitHub Desktop.

![image](https://github.com/user-attachments/assets/bac64055-5cd1-4780-9f7c-7a602b1ba7f7)

---
After cloning the Quest repo, open the project in Visual Studio by double-clicking "Quest.sln".

![image](https://github.com/user-attachments/assets/f4b5e76f-db6c-4073-a0a6-d8dee3c758ca)

---
## Update to .NET 4.8 Runtime
![image](https://github.com/user-attachments/assets/c50c38b4-9613-43ec-9bc4-046128d0e465)

You pretty much have to do this, unless you have .NET 4.0 Runtime installed already.

I just click "Remember my choice [...]" and OK and everything works smoothly afterwards.

---
### NOTE

You will see a subtle prompt about managing NuGet packages.

![image](https://github.com/user-attachments/assets/8a9fb5aa-b19f-4531-8f6b-2b5569735e03)

Ignore that! Don't click that if you want Quest to build.

---
## Build the Debug

When everything gets loaded, you'll see that it is currently set on "Debug" at the top.

![image](https://github.com/user-attachments/assets/8e8c078a-3eda-4a55-9d0b-6b3aa9a4016d)

 
---
This is good, because we have to build the debug for the Release to build successfully afterwards.

Now, in the top menu bar, click 'Build' and Select the first option: "Build solution".

![image](https://github.com/user-attachments/assets/6832448a-a84c-4a3e-a93d-090d7425d001)

---
You'll see it automatically restoring NuGet packages first (which is good):

![image](https://github.com/user-attachments/assets/74b55003-e75e-46c5-9fbf-6c64914f33cf)

---
Oh, no!

![image](https://github.com/user-attachments/assets/3a126d5c-4b5b-44f1-ad73-614480b70e87)


---
The build failed!

...but that's just how it has gone every time I've done it this year.

Now, click the "Debug" dropdown with the little arrow next to it (2nd row from the top), and switch it to "Release".

![image](https://github.com/user-attachments/assets/c7d84d0c-3a09-4fbe-9f55-8523d383bc1a)

![image](https://github.com/user-attachments/assets/733f519d-ec9f-4182-867e-41ecd0a4ac1b)

![image](https://github.com/user-attachments/assets/f307e1cc-e592-4724-8c7e-fc9d79cfbf88)

---
Now click "Build" from the top and select "Build solution".

You'll see errors at first, but they should go away just before it finishes and says "Build succeeded" at the bottom.

![image](https://github.com/user-attachments/assets/309be9d5-3e81-4f8e-93bc-fedd0aaa9075)


---
## After the Build

You can Save All and exit Visual Studio at this point.

Now, the fun part is finding the **.exe** file!

Here is an animated GIF, starting from the folder where we opened the project via the "Quest.sln" file:

<details><summary> Click HERE to View the Animated GIF </summary>

![find-the-exe-file](https://github.com/user-attachments/assets/c35ecf89-b7a2-49ae-9d59-316aff806046)


</details>

---
That relative path (from the "quest" folder containing the "Quest.sln" file) is:

Quest\bin\x86\Release\Quest.exe

Double-click that, and Quest should open and run.

![image](https://github.com/user-attachments/assets/717f6472-4452-4297-8024-090dfe77394e)
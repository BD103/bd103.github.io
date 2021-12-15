---
layout: post
title: "The Ramblings of Fabric and Forge"
date: 2021-11-26 15:10:13 +0000
tags: talk
---

I have been playing Minecraft for a very long time. The exact time is hard to calculate, but I remember playing Pocket Edition before andesite, granite, and diorite.

Two years ago, I tried to learn Minecraft modding. **I failed.** Java was too new for me, and the class I took didn't click. That was back when 1.12 was the big platform for mods. There was barely any talk of modding 1.14.

Last year I tried it again. Thankfully it worked, and I successfully set up a [functioning mod](https://github.com/BD103/Slimecoin). Since then, I have tried making many different mods. Here are some things that I found out.

## The Learning Curve

Java is a complex language to understand. I transitioned to it from Python, and I still struggled. Minecraft Forge **does not make it easier**. Their main form of documentation is a Javadoc (which is hard to understand) and a [readthedocs](https://mcforge.readthedocs.io/en/1.17.x/gettingstarted/) full of jargon. If you try to learn modding through Forge without a guide, _chances are you won't succeed_.

My advice to you is to learn modding through **Fabric**. Fabric is a lightweight mod loader with an optional API. It doesn't force-feed you any insane code. Take a look at the initializer class that all mods need:

```java
public class ExampleMod implements ModInitializer {
    public static final Logger LOGGER = LogManager.getLogger("MODID");

    @Override
    public void onInitialize() {
        // Register your code here
        LOGGER.info("Hello, Fabric world!");
    }
}
```

I am not about to say that modding Minecraft is simple. _There is absolutely no chance it is simple._ Minecraft Forge just isn't friendly towards beginners.

If you want to get started modding Minecraft, go to the [Fabric Wiki and look under the "Developing with Fabric" section](https://fabricmc.net/wiki/doku.php#developing_with_fabric).

## The Chaos of Mappings

> "Hey BD103, what are mappings? (MCP, Yarn, MojMap, etc...)"

Here's the rundown: Mojang obfuscates their code. That means that all functions, variables, classes, and packages are renamed to random strings. Java is a compiled language, but there are [decompilers out there](https://github.com/JetBrains/intellij-community/tree/master/plugins/java-decompiler/engine). Because Mojang wants to protect their intellectual property and sell it, obfuscation prevents people from copying code and selling that for themselves.

This is perfectly fine and good for everyone but modders. People who want to edit the game, not redistribute it. How are we supposed to know how the inventory works if we can't see the source code? The solution to this are mappings. These are large files or programs that can rename every single piece of data in Minecraft. This turns things like `func_14252()` to `getAllPlayers()`, or `Aab` to `AbstractBlock`.

There are many Minecraft mappings out there. The most popular are:

- Offical Mappings (MojMaps)
    - These just recently have been published with Minecraft snapshots and recent versions. It is nice that Mojang is willing to accept that modders need source code, but it has a **restrictive license**.
    - This is not legal advice. Do what you want, but I caution that you stay away from these mappings until we are positive they are safe. For more information, [read this article on it](http://cpw.github.io/MinecraftMappingData.html).
- MCP (Searge Mappings)
    - If I'm to be completely honest, I don't know a lot about MCP. What I do know is that they have been around the longest and were developed by Searge, one of the Minecraft developers.
- Yarn (Fabric Mappings)
    - Yarn mappings are developed for the use in the Fabric loader. It is under one of the most unrestrictive licenses in the world, and supports every snapshot from around 1.14 onwards. There is a strict [naming convention](https://github.com/FabricMC/yarn/blob/1.18.1/CONVENTIONS.md), so you can easily guess what a method does. They are my preferred mappings since they are also heavily documented. ~ YAY ~

### TL;DR

Use Yarn mappings when possible. They are actively maintained and are published under the [CC0 license](https://creativecommons.org/publicdomain/zero/1.0/). If you want to use Yarn with Forge, I recommend looking in to the [Architectury](https://github.com/architectury) project. (You can also see [my question](https://github.com/FabricMC/yarn/issues/2883) on this subject.) If you have any more questions, feel free to [ask me here](https://github.com/BD103/BD103/issues). See you around!

_I apologize if this post is difficult to read / understand. I wrote it a while ago (November 26) but am only now posting it December 15. Please report any errors or inconsistencies in [the issues section](https://github.com/BD103/bd103.github.io/issues) of my website's code. Thanks!_

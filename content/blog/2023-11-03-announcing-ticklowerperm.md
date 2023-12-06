# Announcing TickLowerPerm

::callout{kind="note"}
TickLowerPerm has been released for stable 1.20.3! You can check it out on [Modrinth](https://modrinth.com/mod/ticklowerperm).
::

Hey! I made a [Minecraft](https://www.minecraft.net) mod!

The mod is called TickLowerPerm[^0] It is a [Fabric](https://fabricmc.net/) mod that lowers the permission required for the new `/tick` command introduced in snapshot [23w43a](https://minecraft.wiki/w/Java_Edition_23w43a). The makes it so that command blocks and data packs can run the command, opening up a whole new realm of possibilities for mini-games and challenge maps!

[^0]: It stands for "Tick Lower Permission." It might not be the most creative name, but it works!

You can download the mod on [Modrinth](https://modrinth.com/mod/ticklowerperm), or you can see the code on [Github](https://github.com/BD103/TickLowerPerm). It’s the first mod that I’ve ever published, but it works well! (Mainly due to how simple it is.) I can pretty much guarantee that it will be compatible with all other mods, because it is a singular [mixin](https://github.com/BD103/TickLowerPerm/blob/f07f9b4859b52f306c342dbf7632ba3c113b8db4/src/main/java/io/github/bd103/ticklowerperm/mixin/TickCommandMixin.java) that changes one constant.

I plan on updating the mod for every new snapshot until 1.20.3 is released[^1]. I'll continue to support major versions of Minecraft afterwards, but I don't plan on targeting snapshots once `/tick` has been stabilized.

[^1]: Usually "updating" just requires adding the new version to `fabric.mod.json` and testing it. I don't think I'll ever need to modify the mixin file unless Mojang developers majorly change the `TickCommand` class.

Well, until next time! I hope you all will find the mod useful, because I certainly will[^2].

Farewell!

[^2]: I have so many great ideas. For instance, you could recreate games like Superhot or combat scenes from the Matrix movie. I got the original idea for this mod from [this video](https://youtu.be/BnUuZdX5mJI?t=366).

![TickLowerPerm Logo](https://raw.githubusercontent.com/BD103/TickLowerPerm/main/src/main/resources/assets/ticklowerperm/icon.png)

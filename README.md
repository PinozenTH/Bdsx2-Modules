##### BDSX2

Modded Version of [BDSX](https://github.com/bdsx/bdsx)

[Lasted Version](https://github.com/PinozenTH/Bdsx2/releases/lasted/download/Bdsx2-PinozenTH.zip)

#### Build-in Features

- [Modules (Main Project)](https://github.com/minyee2913/2913Module)
- [AntiCheats](https://github.com/ethaniccc/Esoteric-BDSX)
- [Basic AntiCheats](https://github.com/Rjlintkh/bdsx-aniketos)
- [Webpanel](https://github.com/Rjlintkh/bdsx-web-panel)
- [AutoBackups](https://github.com/LastSandwich/bdsx-backup)
- [Private Message](https://github.com/WinsomeQuill/private-message)
- [Invsee](https://github.com/Brougud/BDSx-Main/blob/main/seeinv.ts)
- Display Player Rank (Original code from TSGorilla)

**Developer Note**:
This project doesn't just copy paste but we change some of code and remove some of unused scripts

### On start

go to PinozenTH Modules

run
```
npm i
```
## Config

> **Webpanel**

Original:
[Bdsx-web-panel](https://github.com/Rjlintkh/bdsx-web-panel.git)

- GraphUpdates: Update CPU graph every second (default: 60) [WARN: Low = More Resource usage/May crash your PC if too low]
- same_port_with_bds: use webpanel port with bds port (default:19132)
- port: port of you webpanel (domain:port | default: 19132)
- chat_name: display in chat (like this <chat_name> message | default: Server)
- username: your username to login to panel (default: admin)
- password: your password to login to panel (default: 123)

> **AutoBackups**

Original:
[bdsx-backup](https://github.com/LastSandwich/bdsx-backup.git)

- BackupsBroadcast: Broadcast to server player when backup has started
- backupOnStart: backup will occur when the server is started
- interval: minutes between each backup
- skipIfNoActivity: only create a backup if players have been active the previous backup
- backupOnPlayerConnected: run a backup when a player joins
- backupOnPlayerDisconnected: run a backup when a player leaves
- minIntervalBetweenBackups: minimum minutes between backups
- bedrockServerPath: path to the bedrock_server folder - defaults to "../../bedrock_server"

> **PlayerRanks**

- Rank: Display Player Rank on chat (like this: [Rank] PlayerName: Message)

__***Please customize by your own.***__

Example Script:
```
events.packetBefore(MinecraftPacketIds.Text).on((packet, ni) => {
    let player = ni.getActor() as ServerPlayer
    if(player.getPermissionLevel() === PlayerPermission.OPERATOR  && player.hasTag("OWNER")) { //tag @s add OWNER This require OP to display this rank
        let message = packet.message;
        packet.message = `§6§l[OWNER]§r §f${player.getName()}: §6${message}` //customizable
        console.log(`[OWNER] ${player.getName()}: ${message}`) //send message from player to console
        return
    }
        if(player.hasTag("VIP")) { //tag @s add VIP
        let message = packet.message;
        packet.message = `§a§l[VIP]§r §f${player.getName()}: §a${message}` //customizable
        console.log(`[VIP] ${player.getName()}: ${message}`) //send message from player to console
        return
    }
    let message = packet.message; //normal player
    packet.message = `§l§7${player.getName()}: ${message}` //customizable
    console.log(`${player.getName()}: ${message}`) //send message from player to console
    return
}
```

> **Greetings Message for Player**

- Greeting Joined Player

Please Change Scripts in PinozenTH Modules/GreetingPlayer.ts

Example Script
```
    //ranked Player
    if(Player.hasTag('rank')) {
        let message =  `Welcome [rank] ${PlayerName} to server`;
        setTimeout(()=>{
            greet(`tellraw @a {"rawtext":[{"translate": "${message}"}]}`);
    }, 10000);
    return;
    }
    //unranked || normal Player
    let message =  `Welcome [rank] ${PlayerName} to server`;
    setTimeout(()=>{
            greet(`tellraw @a {"rawtext":[{"translate": "${message}"}]}`);
    }, 10000);
    return;
```

> **Join Announce ranked player Join Event**



> **Found Bugs in module??**

pls contract me via Discord: PinoZenTH#0349

> **if you found bugs on [BDSX](https://github.com/bdsx/bdsx)**
Please join [BDSX Discord](https://discord.gg/pC9XdkC) and discuss to [kerikera](https://github.com/karikera)

# Project Credits

An awesome bds project **[BDSX](https://github.com/bdsx/bdsx)**

> **Build-in Plugins**

- [Modules (Main Project)](https://github.com/minyee2913/2913Module)
- [AntiCheats](https://github.com/ethaniccc/Esoteric-BDSX)
- [Basic AntiCheats](https://github.com/Rjlintkh/bdsx-aniketos)
- [Webpanel](https://github.com/Rjlintkh/bdsx-web-panel)
- [AutoBackups](https://github.com/LastSandwich/bdsx-backup)
- [Private Message](https://github.com/WinsomeQuill/private-message)
- [Invsee](https://github.com/Brougud/BDSx-Main/blob/main/seeinv.ts)


import {events} from "bdsx/event";
import {MinecraftPacketIds} from "bdsx/bds/packetids";
import {PlayerPermission, ServerPlayer} from "bdsx/bds/player";


    events.packetSend(MinecraftPacketIds.Text).on((packet) => {
        if (packet.name !== "") {
            packet.name = ""; //remove author of message and custom it you no need to change this
        }
    });

    events.packetBefore(MinecraftPacketIds.Text).on((packet, ni) => {
        let player = ni.getActor() as ServerPlayer
        if(player.getPermissionLevel() === PlayerPermission.OPERATOR  && player.hasTag("OWNER")) { //tag @s add OWNER This require OP to display this rank
            let message = packet.message;
            message = `§6§l[OWNER]§r §f${player.getName()}: §6${message}` //customizable
            console.log(`[OWNER] ${player.getName()}: ${message}`) //send message from player to console
            return
        }
        if(player.getPermissionLevel() === PlayerPermission.OPERATOR  && player.hasTag("ADMIN")) { //tag @s add OWNER This require OP to display this rank
            let message = packet.message;
            message = `§c§l[ADMIN]§r §f${player.getName()}: §6${message}` //customizable
            console.log(`[ADMIN] ${player.getName()}: ${message}`) //send message from player to console
            return
        }
            if(player.hasTag("HELPER")) { //tag @s add VIP
            let message = packet.message;
            message = `§d§l[HELPER]§r §f${player.getName()}: §a${message}` //customizable
            console.log(`[HELPER] ${player.getName()}: ${message}`) //send message from player to console
            return
        }
        let message = packet.message; //normal player
        message = `§l§7${player.getName()}: ${message}` //customizable
        console.log(`${player.getName()}: ${message}`) //send message from player to console
        return
    })



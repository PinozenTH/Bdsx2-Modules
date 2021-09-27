import {events} from "bdsx/event";
import {MinecraftPacketIds} from "bdsx/bds/packetids";
import {PlayerPermission, ServerPlayer} from "bdsx/bds/player";

events.packetSend(MinecraftPacketIds.Text).on((packet) => {
    if (packet.name !== "") {
        packet.name = ""; //remove author of message and custom it
    }
});

events.packetBefore(MinecraftPacketIds.Text).on((packet, ni) => {
    let player = ni.getActor() as ServerPlayer
    if(player.getPermissionLevel() === PlayerPermission.OPERATOR  && player.hasTag("OWNER")) { //tag @s add OWNER This require OP to show
        let message = packet.message;
        packet.message = `§6§l[OWNER]§r §f<${player.getName()}> §6${message}` //customizable
        console.log(`[OWNER] <${player.getName()}> ${message}`) //send message from player to console
        return
    }
    if(player.getPermissionLevel() === PlayerPermission.OPERATOR  && player.hasTag("ADMIN")) { //tag @s add ADMIN This require OP to show
        let message = packet.message;
        packet.message = `§4§l[ADMIN]§r §f<${player.getName()}> §4${message}` //customizable
        console.log(`[ADMIN] <${player.getName()}> ${message}`) //send message from player to console
        return
    }
    if(player.hasTag("HELPER")) { //tag @s add VIP1
        let message = packet.message;
        packet.message = `§2§l[HELPER]§r §f<${player.getName()}> §2${message}` //customizable
        console.log(`[HELPER] <${player.getName()}> ${message}`) //send message from player to console
        return
    }
    if(player.hasTag("VIP")) { //tag @s add VIP1
        let message = packet.message;
        packet.message = `§a§l[VIP]§r §f<${player.getName()}> §a${message}` //customizable
        console.log(`[VIP] <${player.getName()}> ${message}`) //send message from player to console
        return
    }
    if(player.hasTag("VIP1")) { //tag @s add VIP2
        let message = packet.message;
        packet.message = `§a§l[§aVIP§e+]§r §f<${player.getName()}> §a${message}` //customizable
        console.log(`[VIP+] <${player.getName()}> ${message}`) //send message from player to console
        return
    }
    if(player.hasTag("MVP")) { //tag @s add MVP
        let message = packet.message;
        packet.message = `§b§l[MVP§b]§r §f<${player.getName()}> §b${message}` //customizable
        console.log(`[MVP] <${player.getName()}> ${message}`) //send message from player to console
        return
    }
    if(player.hasTag("MVP1")) { //tag @s add MVP1
        let message = packet.message;
        packet.message = `§b§l[MVP§e+§b]§r §f<${player.getName()}> §b${message}` //customizable
        console.log(`[MVP+] <${player.getName()}> ${message}`) //send message from player to console
        return
    }
    if(player.hasTag("MVP2")) { //tag @s add MVP2
        let message = packet.message;
        packet.message = `§d§l[MVP§e++§d]§r §f<${player.getName()}> §d${message}` //customizable
        console.log(`[MVP++] <${player.getName()}> ${message}`) //send message from player to console
        return
    }
    if(player.hasTag("SUP")) { //tag @s add SUP
        let message = packet.message;
        packet.message = `§e§l[SUPPORTER]§r §f<${player.getName()}> §e${message}` //customizable
        console.log(`[SUPPORTER] <${player.getName()}> ${message}`) //send message from player to console
        return
    }
    let message = packet.message; //normal player
    packet.message = `§l§7<${player.getName()}> ${message}` //customizable
    console.log(`<${player.getName()}> ${message}`) //send message from player to console
    return
})

import {events} from "bdsx/event";
import {MinecraftPacketIds} from "bdsx/bds/packetids";
import {PlayerPermission, ServerPlayer} from "bdsx/bds/player";
const config = require('./config.json');
const enable = config.DisplayRank.enable


    events.packetSend(MinecraftPacketIds.Text).on((packet) => {
        if (packet.name !== "") {
            packet.name = ""; //remove author of message and custom it you no need to change this
        }
    });

    events.packetBefore(MinecraftPacketIds.Text).on((packet, ni) => {
        let player = ni.getActor() as ServerPlayer
        //if(player.getPermissionLevel() === PlayerPermission.OPERATOR  && player.hasTag("OWNER")) { //tag @s add OWNER This require OP to display this rank
        //    let message = packet.message;
        //    packet.message = `§6§l[OWNER]§r §f${player.getName()}: §6${message}` //customizable
        //    console.log(`[OWNER] ${player.getName()}: ${message}`) //send message from player to console
        //    return
        //}
        //if(player.getPermissionLevel() === PlayerPermission.OPERATOR  && player.hasTag("ADMIN")) { //tag @s add OWNER This require OP to display this rank
        //    let message = packet.message;
        //    packet.message = `§c§l[ADMIN]§r §f${player.getName()}: §6${message}` //customizable
        //    console.log(`[ADMIN] ${player.getName()}: ${message}`) //send message from player to console
        //    return
        //}
        //    if(player.hasTag("VIP")) { //tag @s add VIP
        //    let message = packet.message;
        //    packet.message = `§a§l[VIP]§r §f${player.getName()}: §a${message}` //customizable
        //    console.log(`[VIP] ${player.getName()}: ${message}`) //send message from player to console
        //    return
        //}
        let message = packet.message; //normal player
        packet.message = `§l§7${player.getName()}: ${message}` //customizable
        console.log(`${player.getName()}: ${message}`) //send message from player to console
        return
    });
    



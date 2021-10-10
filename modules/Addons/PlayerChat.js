"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("bdsx/event");
const packetids_1 = require("bdsx/bds/packetids");
const player_1 = require("bdsx/bds/player");
event_1.events.packetSend(packetids_1.MinecraftPacketIds.Text).on((packet) => {
    if (packet.name !== "") {
        packet.name = ""; //remove author of message and custom it
    }
});
event_1.events.packetBefore(packetids_1.MinecraftPacketIds.Text).on((packet, ni) => {
    let player = ni.getActor();
    if (player.getPermissionLevel() === player_1.PlayerPermission.OPERATOR && player.hasTag("OWNER")) { //tag @s add OWNER This require OP to show
        let message = packet.message;
        packet.message = `§6§l[OWNER]§r §f<${player.getName()}> §6${message}`; //customizable
        console.log(`[OWNER] <${player.getName()}> ${message}`); //send message from player to console
        return;
    }
    if (player.getPermissionLevel() === player_1.PlayerPermission.OPERATOR && player.hasTag("ADMIN")) { //tag @s add ADMIN This require OP to show
        let message = packet.message;
        packet.message = `§4§l[ADMIN]§r §f<${player.getName()}> §4${message}`; //customizable
        console.log(`[ADMIN] <${player.getName()}> ${message}`); //send message from player to console
        return;
    }
    if (player.hasTag("HELPER")) { //tag @s add VIP1
        let message = packet.message;
        packet.message = `§2§l[HELPER]§r §f<${player.getName()}> §2${message}`; //customizable
        console.log(`[HELPER] <${player.getName()}> ${message}`); //send message from player to console
        return;
    }
    if (player.hasTag("VIP")) { //tag @s add VIP1
        let message = packet.message;
        packet.message = `§a§l[VIP]§r §f<${player.getName()}> §a${message}`; //customizable
        console.log(`[VIP] <${player.getName()}> ${message}`); //send message from player to console
        return;
    }
    if (player.hasTag("VIP1")) { //tag @s add VIP2
        let message = packet.message;
        packet.message = `§a§l[§aVIP§e+]§r §f<${player.getName()}> §a${message}`; //customizable
        console.log(`[VIP+] <${player.getName()}> ${message}`); //send message from player to console
        return;
    }
    if (player.hasTag("MVP")) { //tag @s add MVP
        let message = packet.message;
        packet.message = `§b§l[MVP§b]§r §f<${player.getName()}> §b${message}`; //customizable
        console.log(`[MVP] <${player.getName()}> ${message}`); //send message from player to console
        return;
    }
    if (player.hasTag("MVP1")) { //tag @s add MVP1
        let message = packet.message;
        packet.message = `§b§l[MVP§e+§b]§r §f<${player.getName()}> §b${message}`; //customizable
        console.log(`[MVP+] <${player.getName()}> ${message}`); //send message from player to console
        return;
    }
    if (player.hasTag("MVP2")) { //tag @s add MVP2
        let message = packet.message;
        packet.message = `§d§l[MVP§e++§d]§r §f<${player.getName()}> §d${message}`; //customizable
        console.log(`[MVP++] <${player.getName()}> ${message}`); //send message from player to console
        return;
    }
    if (player.hasTag("SUP")) { //tag @s add SUP
        let message = packet.message;
        packet.message = `§e§l[SUPPORTER]§r §f<${player.getName()}> §e${message}`; //customizable
        console.log(`[SUPPORTER] <${player.getName()}> ${message}`); //send message from player to console
        return;
    }
    let message = packet.message; //normal player
    packet.message = `§l§7<${player.getName()}> ${message}`; //customizable
    console.log(`<${player.getName()}> ${message}`); //send message from player to console
    return;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxheWVyQ2hhdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlBsYXllckNoYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0M7QUFDbEMsa0RBQXNEO0FBQ3RELDRDQUErRDtBQUUvRCxjQUFNLENBQUMsVUFBVSxDQUFDLDhCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO0lBQ3JELElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxFQUFFLEVBQUU7UUFDcEIsTUFBTSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyx3Q0FBd0M7S0FDN0Q7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILGNBQU0sQ0FBQyxZQUFZLENBQUMsOEJBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFO0lBQzNELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQWtCLENBQUE7SUFDMUMsSUFBRyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsS0FBSyx5QkFBZ0IsQ0FBQyxRQUFRLElBQUssTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLDBDQUEwQztRQUNqSSxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxPQUFPLEVBQUUsQ0FBQSxDQUFDLGNBQWM7UUFDcEYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxPQUFPLEVBQUUsQ0FBQyxDQUFBLENBQUMscUNBQXFDO1FBQzdGLE9BQU07S0FDVDtJQUNELElBQUcsTUFBTSxDQUFDLGtCQUFrQixFQUFFLEtBQUsseUJBQWdCLENBQUMsUUFBUSxJQUFLLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSwwQ0FBMEM7UUFDakksSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUM3QixNQUFNLENBQUMsT0FBTyxHQUFHLG9CQUFvQixNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sT0FBTyxFQUFFLENBQUEsQ0FBQyxjQUFjO1FBQ3BGLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssT0FBTyxFQUFFLENBQUMsQ0FBQSxDQUFDLHFDQUFxQztRQUM3RixPQUFNO0tBQ1Q7SUFDRCxJQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxpQkFBaUI7UUFDM0MsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUM3QixNQUFNLENBQUMsT0FBTyxHQUFHLHFCQUFxQixNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sT0FBTyxFQUFFLENBQUEsQ0FBQyxjQUFjO1FBQ3JGLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssT0FBTyxFQUFFLENBQUMsQ0FBQSxDQUFDLHFDQUFxQztRQUM5RixPQUFNO0tBQ1Q7SUFDRCxJQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxpQkFBaUI7UUFDeEMsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUM3QixNQUFNLENBQUMsT0FBTyxHQUFHLGtCQUFrQixNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sT0FBTyxFQUFFLENBQUEsQ0FBQyxjQUFjO1FBQ2xGLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssT0FBTyxFQUFFLENBQUMsQ0FBQSxDQUFDLHFDQUFxQztRQUMzRixPQUFNO0tBQ1Q7SUFDRCxJQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxpQkFBaUI7UUFDekMsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUM3QixNQUFNLENBQUMsT0FBTyxHQUFHLHVCQUF1QixNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sT0FBTyxFQUFFLENBQUEsQ0FBQyxjQUFjO1FBQ3ZGLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssT0FBTyxFQUFFLENBQUMsQ0FBQSxDQUFDLHFDQUFxQztRQUM1RixPQUFNO0tBQ1Q7SUFDRCxJQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxnQkFBZ0I7UUFDdkMsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUM3QixNQUFNLENBQUMsT0FBTyxHQUFHLG9CQUFvQixNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sT0FBTyxFQUFFLENBQUEsQ0FBQyxjQUFjO1FBQ3BGLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssT0FBTyxFQUFFLENBQUMsQ0FBQSxDQUFDLHFDQUFxQztRQUMzRixPQUFNO0tBQ1Q7SUFDRCxJQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxpQkFBaUI7UUFDekMsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUM3QixNQUFNLENBQUMsT0FBTyxHQUFHLHVCQUF1QixNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sT0FBTyxFQUFFLENBQUEsQ0FBQyxjQUFjO1FBQ3ZGLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssT0FBTyxFQUFFLENBQUMsQ0FBQSxDQUFDLHFDQUFxQztRQUM1RixPQUFNO0tBQ1Q7SUFDRCxJQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxpQkFBaUI7UUFDekMsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUM3QixNQUFNLENBQUMsT0FBTyxHQUFHLHdCQUF3QixNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sT0FBTyxFQUFFLENBQUEsQ0FBQyxjQUFjO1FBQ3hGLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssT0FBTyxFQUFFLENBQUMsQ0FBQSxDQUFDLHFDQUFxQztRQUM3RixPQUFNO0tBQ1Q7SUFDRCxJQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxnQkFBZ0I7UUFDdkMsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUM3QixNQUFNLENBQUMsT0FBTyxHQUFHLHdCQUF3QixNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sT0FBTyxFQUFFLENBQUEsQ0FBQyxjQUFjO1FBQ3hGLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxPQUFPLEVBQUUsQ0FBQyxDQUFBLENBQUMscUNBQXFDO1FBQ2pHLE9BQU07S0FDVDtJQUNELElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUFlO0lBQzdDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsUUFBUSxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssT0FBTyxFQUFFLENBQUEsQ0FBQyxjQUFjO0lBQ3RFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssT0FBTyxFQUFFLENBQUMsQ0FBQSxDQUFDLHFDQUFxQztJQUNyRixPQUFNO0FBQ1YsQ0FBQyxDQUFDLENBQUEifQ==
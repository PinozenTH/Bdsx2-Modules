import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { ServerPlayer } from "bdsx/bds/player";
import { events } from "bdsx/event";

const raduis = require('../config.json');
const num = raduis.areaChat.raduis;
if(num <= 0) {
    console.log('AreaChat Disabled'.bgRed);
} else if (num > 0) {
    events.packetSend(MinecraftPacketIds.Text).on((packet) => {
        if (packet.name !== "") {
            packet.name = "";
        }
    });

    events.packetBefore(MinecraftPacketIds.Text).on((packet, ni) => {
        let player = ni.getActor() as ServerPlayer
        const playerName = player.getName();


    })
}


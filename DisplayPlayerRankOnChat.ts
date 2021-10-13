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
    //code Here!
})

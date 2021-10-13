
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { TextPacket } from "bdsx/bds/packets";
import { DeviceOS } from "bdsx/common";
import { events } from "bdsx/event";
import { bedrockServer } from "bdsx/launcher";
const greet = bedrockServer.executeCommand;



events.playerJoin.on(ev => {
    const Player = ev.player;
    const PlayerName = Player.getName();
    //Code Here!
})


import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { TextPacket } from "bdsx/bds/packets";
import { DeviceOS } from "bdsx/common";
import { events } from "bdsx/event";
const config = require('../../config.json');
const GreetingMessage = config.Greeting
import * as fs from "fs";

const lines = fs.readFileSync("../Ranks.txt", "utf8").split(/[\r\n]+/);
console.log(lines);
const lineObject = lines.map(line => {
    const escapedLine = line.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return {
        "regex": new RegExp(escapedLine, "ig"),
        "length": line.length
    };
});
export const connectionList = new Map<NetworkIdentifier, string>();



events.playerJoin.on(ev => {
    const Player = ev.player;
    const PlayerName = Player.getName();
    const PlayerJoinName = new NetworkIdentifier;
    for (let line of lineObject) {
            const tag = line.regex
            //ranked Player
            if (Player.hasTag(`${tag}`)) {
                setTimeout(()=>{
                        const textPacket = TextPacket.create();
                        textPacket.message = `${GreetingMessage.RankedPlayer.first} [${tag}] ${PlayerName} ${GreetingMessage.RankedPlayer.last}`;
                        textPacket.sendTo(PlayerJoinName);
                        textPacket.dispose();
                }, 10000); // 10 sec after Joined
                return
        }
    }
    
    //unranked || normal Player
        setTimeout(()=>{
        const textPacket = TextPacket.create();
        textPacket.message = `${GreetingMessage.normalPlayer.first} ${PlayerName} ${GreetingMessage.normalPlayer.last}`;
        textPacket.sendTo(PlayerJoinName);
        textPacket.dispose();
    }, 10000); //10 sec after Joined
})

import { CommandOrigin } from 'bdsx/bds/commandorigin';
import { bgGreen, bgMagenta, bgYellow, green, red } from 'colors';
import { Event } from "bdsx/eventtarget";
import './modules/hooking';
import { existsSync, mkdirSync, readdirSync, readFileSync } from 'fs';
import { playerPermission, getScore, StopRequested, PlayerHasItem, onUseItem, getScoreSync } from './modules/customFunc';
import { DataById, NameById, IdByName, XuidByName, playerList, form, Formsend, sendText, transferServer, setHealth, CustomScore, ScoreTYPE, Disconnect, netCmd, bossBar, showProfile, DeviceById } from './modules/packets';
import * as path from 'path';
import { bedrockServer } from 'bdsx/launcher';
import { events } from 'bdsx/event';
import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { PacketIdToType } from "bdsx/bds/packets";
import { DataStorage } from "./modules/Addons/DataStorage";
import { PacketListener } from "./modules/Addons/PacketListener";
import { NetworkStackLatencyWrapper } from "./modules/Addons/Wrappers";
import { ServerPlayer } from "bdsx/bds/player";
import { mainForm } from "./modules/Addons/forms";
import './autobackups';
import './web-panels/server/main';
import "./images-maps";
import { Color } from "./images-maps/color";
import { MapItem } from "./images-maps/map-item";
import { MapApi } from "./images-maps/map-api";
import { MapItemSavedData } from "./images-maps/map-data";
export { Color, MapItem, MapApi, MapItemSavedData };
import './DisplayPlayerRankOnChat';
import './Basic anticheats';
import './GreetingPlayer';


interface stateEvent {
    entity: CommandOrigin,
    log: (string:string)=>void;
}
class StateEvent implements stateEvent {
    constructor(
        public entity: CommandOrigin,
        public log: (string:string)=>void
    ) {
    }
}
let folder = existsSync(`../scriptData`);
if (folder === false) mkdirSync(`../scriptData`);

const onServerState = new Event<(event: StateEvent) => void>();

const addons:string[] = [];
function loadAddon(){
    const files = readdirSync(path.dirname(__filename)+"/modules/Addons");
    files.forEach((v)=>{
        if (v.endsWith('ts')) return;
        require(path.dirname(__filename)+"/modules/Addons/"+v);
        addons.push(v);
    });
}

if (bedrockServer.isLaunched()) loadAddon();
else events.serverOpen.on(()=>{
    loadAddon();
});

export {
    playerList,
    playerPermission,
    getScore,
    DataById,
    Disconnect,
    NameById,
    IdByName,
    XuidByName,
    form,
    Formsend,
    sendText,
    transferServer,
    setHealth,
    CustomScore,
    ScoreTYPE,
    netCmd,
    bossBar,
    onServerState,
    StateEvent,
    StopRequested,
    PlayerHasItem,
    showProfile,
    DeviceById,
    onUseItem,
    getScoreSync
}

import {DisconnectPacket, TextPacket} from 'bdsx/bds/packets';
import {Player} from "bdsx/bds/player";
import {serverInstance} from "bdsx/bds/server";




export let system: IVanillaServerSystem;

export const setSystem = () => {
    system = server.registerSystem(1, 1);
}

export function broadcast(message: string) {
    console.log("[BROADCAST]".bgBlack, message);

    for (const player of serverInstance.minecraft.getLevel().players) {
        sendMessage(player, message);
    }
}

export function sendMessage(player: Player, message: string) {
    const pk = TextPacket.create();
    pk.message = message;
    pk.type = TextPacket.Types.Chat;
    pk.sendTo(player.getNetworkIdentifier());
    pk.dispose();
}

export function disconnect(player: Player, reason: string) {
    const pk = DisconnectPacket.create()
    pk.message = reason;
    pk.sendTo(player.getNetworkIdentifier())
    pk.dispose();
}

export function getPlayer(client_name: string): Player | null {
    for (let index = 0; index < players.length; index++) {
        if (players[index].getName() === client_name) {
            return players[index];
        }
    }

    return null;
}

export function replaceAll(str: string, search: string, replacement: string): string {
    return str.replace(new RegExp(search), replacement);
}

events.serverOpen.on(() => {
    PacketListener.init();
    DataStorage.init();

    // Override some packets if needed
    PacketIdToType[MinecraftPacketIds.NetworkStackLatency] = NetworkStackLatencyWrapper;
    PacketIdToType[MinecraftPacketIds.NetworkStackLatency].ID = MinecraftPacketIds.NetworkStackLatency;

    
});

export function log(message: any) {
    console.log("[PinozenTH: LOGS] ".bgYellow + message);
}


export const players: ServerPlayer[] = [];


events.playerJoin.on((pk)=>{
    const client = pk.player.getNetworkIdentifier().getActor() as ServerPlayer;
    players.push(client);
});

events.networkDisconnected.on(networkIdentifier => {
    const client = networkIdentifier.getActor() as ServerPlayer;
    const index = players.indexOf(client, 0);
    if (index !== -1) {
        delete players[index];
    }
});

events.command.on((cmd, origin, ctx) => {
    const client = getPlayer(origin);
    if(client instanceof ServerPlayer) {
        if (cmd === "/pm") {
            mainForm(client);
        }
    }
});



export function getNames(client_name: string): string[] {
    const data: string[] = [];
    for (let index = 0; index < players.length; index++) {
        if (players[index].getName() !== client_name) {
            data.push(players[index].getName());
        }
    }
    return data;
}






console.log(bgMagenta(`PinozenTH Modules LOADED - ${addons.length} Addons`));
console.log(('Modules By https://github.com/minyee2913/2913Module.git'.magenta+'\nMODDED By PinozenTH#0349'.bgGreen));
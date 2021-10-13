"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNames = exports.players = exports.log = exports.replaceAll = exports.getPlayer = exports.disconnect = exports.sendMessage = exports.broadcast = exports.setSystem = exports.system = exports.getScoreSync = exports.onUseItem = exports.DeviceById = exports.showProfile = exports.PlayerHasItem = exports.StopRequested = exports.StateEvent = exports.onServerState = exports.bossBar = exports.netCmd = exports.ScoreTYPE = exports.CustomScore = exports.setHealth = exports.transferServer = exports.sendText = exports.Formsend = exports.form = exports.XuidByName = exports.IdByName = exports.NameById = exports.Disconnect = exports.DataById = exports.getScore = exports.playerPermission = exports.playerList = void 0;
const colors_1 = require("colors");
const eventtarget_1 = require("bdsx/eventtarget");
require("./modules/hooking");
const fs_1 = require("fs");
const customFunc_1 = require("./modules/customFunc");
Object.defineProperty(exports, "playerPermission", { enumerable: true, get: function () { return customFunc_1.playerPermission; } });
Object.defineProperty(exports, "getScore", { enumerable: true, get: function () { return customFunc_1.getScore; } });
Object.defineProperty(exports, "StopRequested", { enumerable: true, get: function () { return customFunc_1.StopRequested; } });
Object.defineProperty(exports, "PlayerHasItem", { enumerable: true, get: function () { return customFunc_1.PlayerHasItem; } });
Object.defineProperty(exports, "onUseItem", { enumerable: true, get: function () { return customFunc_1.onUseItem; } });
Object.defineProperty(exports, "getScoreSync", { enumerable: true, get: function () { return customFunc_1.getScoreSync; } });
const packets_1 = require("./modules/packets");
Object.defineProperty(exports, "DataById", { enumerable: true, get: function () { return packets_1.DataById; } });
Object.defineProperty(exports, "NameById", { enumerable: true, get: function () { return packets_1.NameById; } });
Object.defineProperty(exports, "IdByName", { enumerable: true, get: function () { return packets_1.IdByName; } });
Object.defineProperty(exports, "XuidByName", { enumerable: true, get: function () { return packets_1.XuidByName; } });
Object.defineProperty(exports, "playerList", { enumerable: true, get: function () { return packets_1.playerList; } });
Object.defineProperty(exports, "form", { enumerable: true, get: function () { return packets_1.form; } });
Object.defineProperty(exports, "Formsend", { enumerable: true, get: function () { return packets_1.Formsend; } });
Object.defineProperty(exports, "sendText", { enumerable: true, get: function () { return packets_1.sendText; } });
Object.defineProperty(exports, "transferServer", { enumerable: true, get: function () { return packets_1.transferServer; } });
Object.defineProperty(exports, "setHealth", { enumerable: true, get: function () { return packets_1.setHealth; } });
Object.defineProperty(exports, "CustomScore", { enumerable: true, get: function () { return packets_1.CustomScore; } });
Object.defineProperty(exports, "ScoreTYPE", { enumerable: true, get: function () { return packets_1.ScoreTYPE; } });
Object.defineProperty(exports, "Disconnect", { enumerable: true, get: function () { return packets_1.Disconnect; } });
Object.defineProperty(exports, "netCmd", { enumerable: true, get: function () { return packets_1.netCmd; } });
Object.defineProperty(exports, "bossBar", { enumerable: true, get: function () { return packets_1.bossBar; } });
Object.defineProperty(exports, "showProfile", { enumerable: true, get: function () { return packets_1.showProfile; } });
Object.defineProperty(exports, "DeviceById", { enumerable: true, get: function () { return packets_1.DeviceById; } });
const path = require("path");
const launcher_1 = require("bdsx/launcher");
const event_1 = require("bdsx/event");
const packetids_1 = require("bdsx/bds/packetids");
const packets_2 = require("bdsx/bds/packets");
const DataStorage_1 = require("./modules/Addons/DataStorage");
const PacketListener_1 = require("./modules/Addons/PacketListener");
const Wrappers_1 = require("./modules/Addons/Wrappers");
const player_1 = require("bdsx/bds/player");
const forms_1 = require("./modules/Addons/forms");
require("./autobackups");
//import './web-panels/server/main';
//import "./images-maps";
//import { Color } from "./images-maps/color";
//import { MapItem } from "./images-maps/map-item";
//import { MapApi } from "./images-maps/map-api";
//import { MapItemSavedData } from "./images-maps/map-data";
require("./DisplayPlayerRankOnChat");
require("./Basic anticheats");
require("./GreetingPlayer");
class StateEvent {
    constructor(entity, log) {
        this.entity = entity;
        this.log = log;
    }
}
exports.StateEvent = StateEvent;
let folder = (0, fs_1.existsSync)(`../scriptData`);
if (folder === false)
    (0, fs_1.mkdirSync)(`../scriptData`);
const onServerState = new eventtarget_1.Event();
exports.onServerState = onServerState;
const addons = [];
function loadAddon() {
    const files = (0, fs_1.readdirSync)(path.dirname(__filename) + "/modules/Addons");
    files.forEach((v) => {
        if (v.endsWith('ts'))
            return;
        require(path.dirname(__filename) + "/modules/Addons/" + v);
        addons.push(v);
    });
}
if (launcher_1.bedrockServer.isLaunched())
    loadAddon();
else
    event_1.events.serverOpen.on(() => {
        loadAddon();
    });
const packets_3 = require("bdsx/bds/packets");
const server_1 = require("bdsx/bds/server");
const setSystem = () => {
    exports.system = server.registerSystem(1, 1);
};
exports.setSystem = setSystem;
function broadcast(message) {
    console.log("[BROADCAST]".bgBlack, message);
    for (const player of server_1.serverInstance.minecraft.getLevel().players) {
        sendMessage(player, message);
    }
}
exports.broadcast = broadcast;
function sendMessage(player, message) {
    const pk = packets_3.TextPacket.create();
    pk.message = message;
    pk.type = packets_3.TextPacket.Types.Chat;
    pk.sendTo(player.getNetworkIdentifier());
    pk.dispose();
}
exports.sendMessage = sendMessage;
function disconnect(player, reason) {
    const pk = packets_3.DisconnectPacket.create();
    pk.message = reason;
    pk.sendTo(player.getNetworkIdentifier());
    pk.dispose();
}
exports.disconnect = disconnect;
function getPlayer(client_name) {
    for (let index = 0; index < exports.players.length; index++) {
        if (exports.players[index].getName() === client_name) {
            return exports.players[index];
        }
    }
    return null;
}
exports.getPlayer = getPlayer;
function replaceAll(str, search, replacement) {
    return str.replace(new RegExp(search), replacement);
}
exports.replaceAll = replaceAll;
event_1.events.serverOpen.on(() => {
    PacketListener_1.PacketListener.init();
    DataStorage_1.DataStorage.init();
    // Override some packets if needed
    packets_2.PacketIdToType[packetids_1.MinecraftPacketIds.NetworkStackLatency] = Wrappers_1.NetworkStackLatencyWrapper;
    packets_2.PacketIdToType[packetids_1.MinecraftPacketIds.NetworkStackLatency].ID = packetids_1.MinecraftPacketIds.NetworkStackLatency;
});
function log(message) {
    console.log("[PinozenTH: LOGS] ".bgYellow + message);
}
exports.log = log;
exports.players = [];
event_1.events.playerJoin.on((pk) => {
    const client = pk.player.getNetworkIdentifier().getActor();
    exports.players.push(client);
});
event_1.events.networkDisconnected.on(networkIdentifier => {
    const client = networkIdentifier.getActor();
    const index = exports.players.indexOf(client, 0);
    if (index !== -1) {
        delete exports.players[index];
    }
});
event_1.events.command.on((cmd, origin, ctx) => {
    const client = getPlayer(origin);
    if (client instanceof player_1.ServerPlayer) {
        if (cmd === "/pm") {
            (0, forms_1.mainForm)(client);
        }
    }
});
function getNames(client_name) {
    const data = [];
    for (let index = 0; index < exports.players.length; index++) {
        if (exports.players[index].getName() !== client_name) {
            data.push(exports.players[index].getName());
        }
    }
    return data;
}
exports.getNames = getNames;
console.log((0, colors_1.bgMagenta)(`PinozenTH Modules LOADED - ${addons.length} Addons`));
console.log(('Modules By https://github.com/minyee2913/2913Module.git'.magenta + '\nMODDED By PinozenTH#0349'.bgGreen));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxtQ0FBa0U7QUFDbEUsa0RBQXlDO0FBQ3pDLDZCQUEyQjtBQUMzQiwyQkFBc0U7QUFDdEUscURBQXlIO0FBeURySCxpR0F6REssNkJBQWdCLE9BeURMO0FBQ2hCLHlGQTFEdUIscUJBQVEsT0EwRHZCO0FBaUJSLDhGQTNFaUMsMEJBQWEsT0EyRWpDO0FBQ2IsOEZBNUVnRCwwQkFBYSxPQTRFaEQ7QUFHYiwwRkEvRStELHNCQUFTLE9BK0UvRDtBQUNULDZGQWhGMEUseUJBQVksT0FnRjFFO0FBL0VoQiwrQ0FBNE47QUEwRHhOLHlGQTFESyxrQkFBUSxPQTBETDtBQUVSLHlGQTVEZSxrQkFBUSxPQTREZjtBQUNSLHlGQTdEeUIsa0JBQVEsT0E2RHpCO0FBQ1IsMkZBOURtQyxvQkFBVSxPQThEbkM7QUFQViwyRkF2RCtDLG9CQUFVLE9BdUQvQztBQVFWLHFGQS9EMkQsY0FBSSxPQStEM0Q7QUFDSix5RkFoRWlFLGtCQUFRLE9BZ0VqRTtBQUNSLHlGQWpFMkUsa0JBQVEsT0FpRTNFO0FBQ1IsK0ZBbEVxRix3QkFBYyxPQWtFckY7QUFDZCwwRkFuRXFHLG1CQUFTLE9BbUVyRztBQUNULDRGQXBFZ0gscUJBQVcsT0FvRWhIO0FBQ1gsMEZBckU2SCxtQkFBUyxPQXFFN0g7QUFWVCwyRkEzRHdJLG9CQUFVLE9BMkR4STtBQVdWLHVGQXRFb0osZ0JBQU0sT0FzRXBKO0FBQ04sd0ZBdkU0SixpQkFBTyxPQXVFNUo7QUFLUCw0RkE1RXFLLHFCQUFXLE9BNEVySztBQUNYLDJGQTdFa0wsb0JBQVUsT0E2RWxMO0FBNUVkLDZCQUE2QjtBQUM3Qiw0Q0FBOEM7QUFDOUMsc0NBQW9DO0FBQ3BDLGtEQUF3RDtBQUN4RCw4Q0FBa0Q7QUFDbEQsOERBQTJEO0FBQzNELG9FQUFpRTtBQUNqRSx3REFBdUU7QUFDdkUsNENBQStDO0FBQy9DLGtEQUFr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
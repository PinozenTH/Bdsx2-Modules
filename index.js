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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxtQ0FBa0U7QUFDbEUsa0RBQXlDO0FBQ3pDLDZCQUEyQjtBQUMzQiwyQkFBc0U7QUFDdEUscURBQXlIO0FBb0RySCxpR0FwREssNkJBQWdCLE9Bb0RMO0FBQ2hCLHlGQXJEdUIscUJBQVEsT0FxRHZCO0FBaUJSLDhGQXRFaUMsMEJBQWEsT0FzRWpDO0FBQ2IsOEZBdkVnRCwwQkFBYSxPQXVFaEQ7QUFHYiwwRkExRStELHNCQUFTLE9BMEUvRDtBQUNULDZGQTNFMEUseUJBQVksT0EyRTFFO0FBMUVoQiwrQ0FBNE47QUFxRHhOLHlGQXJESyxrQkFBUSxPQXFETDtBQUVSLHlGQXZEZSxrQkFBUSxPQXVEZjtBQUNSLHlGQXhEeUIsa0JBQVEsT0F3RHpCO0FBQ1IsMkZBekRtQyxvQkFBVSxPQXlEbkM7QUFQViwyRkFsRCtDLG9CQUFVLE9Ba0QvQztBQVFWLHFGQTFEMkQsY0FBSSxPQTBEM0Q7QUFDSix5RkEzRGlFLGtCQUFRLE9BMkRqRTtBQUNSLHlGQTVEMkUsa0JBQVEsT0E0RDNFO0FBQ1IsK0ZBN0RxRix3QkFBYyxPQTZEckY7QUFDZCwwRkE5RHFHLG1CQUFTLE9BOERyRztBQUNULDRGQS9EZ0gscUJBQVcsT0ErRGhIO0FBQ1gsMEZBaEU2SCxtQkFBUyxPQWdFN0g7QUFWVCwyRkF0RHdJLG9CQUFVLE9Bc0R4STtBQVdWLHVGQWpFb0osZ0JBQU0sT0FpRXBKO0FBQ04sd0ZBbEU0SixpQkFBTyxPQWtFNUo7QUFLUCw0RkF2RXFLLHFCQUFXLE9BdUVySztBQUNYLDJGQXhFa0wsb0JBQVUsT0F3RWxMO0FBdkVkLDZCQUE2QjtBQUM3Qiw0Q0FBOEM7QUFDOUMsc0NBQW9DO0FBQ3BDLGtEQUF3RDtBQUN4RCw4Q0FBa0Q7QUFDbEQsOERBQTJEO0FBQzNELG9FQUFpRTtBQUNqRSx3REFBdUU7QUFDdkUsNENBQStDO0FBQy9DLGtEQUFr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
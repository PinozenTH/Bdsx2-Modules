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
require("./web-panels/server/main");
require("./autobackups");
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
    console.log("[BROADCAST]", message);
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
    console.log("[PinozenTH: LOGS] " + message);
}
exports.log = log;
exports.players = [];
event_1.events.serverOpen.on(() => {
    console.log('[plugin:PrivateMessage] launching');
});
event_1.events.serverClose.on(() => {
    console.log('[plugin:PrivateMessage] closed');
});
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
console.log((0, colors_1.red)(`PinozenTH Modules LOADED - ${addons.length} Addons`));
console.log((0, colors_1.green)('By Pinozen.Thailand'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxtQ0FBb0M7QUFDcEMsa0RBQXlDO0FBQ3pDLDZCQUEyQjtBQUMzQiwyQkFBc0U7QUFDdEUscURBQXlIO0FBa0RySCxpR0FsREssNkJBQWdCLE9Ba0RMO0FBQ2hCLHlGQW5EdUIscUJBQVEsT0FtRHZCO0FBaUJSLDhGQXBFaUMsMEJBQWEsT0FvRWpDO0FBQ2IsOEZBckVnRCwwQkFBYSxPQXFFaEQ7QUFHYiwwRkF4RStELHNCQUFTLE9Bd0UvRDtBQUNULDZGQXpFMEUseUJBQVksT0F5RTFFO0FBeEVoQiwrQ0FBNE47QUFtRHhOLHlGQW5ESyxrQkFBUSxPQW1ETDtBQUVSLHlGQXJEZSxrQkFBUSxPQXFEZjtBQUNSLHlGQXREeUIsa0JBQVEsT0FzRHpCO0FBQ1IsMkZBdkRtQyxvQkFBVSxPQXVEbkM7QUFQViwyRkFoRCtDLG9CQUFVLE9BZ0QvQztBQVFWLHFGQXhEMkQsY0FBSSxPQXdEM0Q7QUFDSix5RkF6RGlFLGtCQUFRLE9BeURqRTtBQUNSLHlGQTFEMkUsa0JBQVEsT0EwRDNFO0FBQ1IsK0ZBM0RxRix3QkFBYyxPQTJEckY7QUFDZCwwRkE1RHFHLG1CQUFTLE9BNERyRztBQUNULDRGQTdEZ0gscUJBQVcsT0E2RGhIO0FBQ1gsMEZBOUQ2SCxtQkFBUyxPQThEN0g7QUFWVCwyRkFwRHdJLG9CQUFVLE9Bb0R4STtBQVdWLHVGQS9Eb0osZ0JBQU0sT0ErRHBKO0FBQ04sd0ZBaEU0SixpQkFBTyxPQWdFNUo7QUFLUCw0RkFyRXFLLHFCQUFXLE9BcUVySztBQUNYLDJGQXRFa0wsb0JBQVUsT0FzRWxMO0FBckVkLDZCQUE2QjtBQUM3Qiw0Q0FBOEM7QUFDOUMsc0NBQW9DO0FBQ3BDLGtEQUF3RDtBQUN4RCw4Q0FBa0Q7QUFDbEQsOERBQTJEO0FBQzNELG9FQUFpRTtBQUNqRSx3REFBdUU7QUFDdkUsNENBQStDO0FBQy9DLGtEQUFrRDtBQUNsRCxvQ0FBa0M7QUFDbEMseUJBQXVCO0FBUXZCLE1BQU0sVUFBVTtJQUNaLFlBQ1csTUFBcUIsRUFDckIsR0FBMEI7UUFEMUIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUNyQixRQUFHLEdBQUgsR0FBRyxDQUF1QjtJQUVyQyxDQUFDO0NBQ0o7QUF3Q0csZ0NBQVU7QUF2Q2QsSUFBSSxNQUFNLEdBQUcsSUFBQSxlQUFVLEVBQUMsZUFBZSxDQUFDLENBQUM7QUFDekMsSUFBSSxNQUFNLEtBQUssS0FBSztJQUFFLElBQUEsY0FBUyxFQUFDLGVBQWUsQ0FBQyxDQUFDO0FBRWpELE1BQU0sYUFBYSxHQUFHLElBQUksbUJBQUssRUFBK0IsQ0FBQztBQW1DM0Qsc0NBQWE7QUFqQ2pCLE1BQU0sTUFBTSxHQUFZLEVBQUUsQ0FBQztBQUMzQixTQUFTLFNBQVM7SUFDZCxNQUFNLEtBQUssR0FBRyxJQUFBLGdCQUFXLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3RFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRTtRQUNmLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFPO1FBQzdCLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFDLGtCQUFrQixHQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsSUFBSSx3QkFBYSxDQUFDLFVBQVUsRUFBRTtJQUFFLFNBQVMsRUFBRSxDQUFDOztJQUN2QyxjQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxHQUFFLEVBQUU7UUFDMUIsU0FBUyxFQUFFLENBQUM7SUFDaEIsQ0FBQyxDQUFDLENBQUM7QUE4QkgsOENBQThEO0FBRTlELDRDQUErQztBQU94QyxNQUFNLFNBQVMsR0FBRyxHQUFHLEVBQUU7SUFDMUIsY0FBTSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3pDLENBQUMsQ0FBQTtBQUZZLFFBQUEsU0FBUyxhQUVyQjtBQUVELFNBQWdCLFNBQVMsQ0FBQyxPQUFlO0lBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRXBDLEtBQUssTUFBTSxNQUFNLElBQUksdUJBQWMsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxFQUFFO1FBQzlELFdBQVcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDaEM7QUFDTCxDQUFDO0FBTkQsOEJBTUM7QUFFRCxTQUFnQixXQUFXLENBQUMsTUFBYyxFQUFFLE9BQWU7SUFDdkQsTUFBTSxFQUFFLEdBQUcsb0JBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMvQixFQUFFLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUNyQixFQUFFLENBQUMsSUFBSSxHQUFHLG9CQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztJQUNoQyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7SUFDekMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2pCLENBQUM7QUFORCxrQ0FNQztBQUVELFNBQWdCLFVBQVUsQ0FBQyxNQUFjLEVBQUUsTUFBYztJQUNyRCxNQUFNLEVBQUUsR0FBRywwQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUNwQyxFQUFFLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUNwQixFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUE7SUFDeEMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2pCLENBQUM7QUFMRCxnQ0FLQztBQUVELFNBQWdCLFNBQVMsQ0FBQyxXQUFtQjtJQUN6QyxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsZUFBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUNqRCxJQUFJLGVBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxXQUFXLEVBQUU7WUFDMUMsT0FBTyxlQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDekI7S0FDSjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFSRCw4QkFRQztBQUVELFNBQWdCLFVBQVUsQ0FBQyxHQUFXLEVBQUUsTUFBYyxFQUFFLFdBQW1CO0lBQ3ZFLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUN4RCxDQUFDO0FBRkQsZ0NBRUM7QUFFRCxjQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUU7SUFDdEIsK0JBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN0Qix5QkFBVyxDQUFDLElBQUksRUFBRSxDQUFDO0lBRW5CLGtDQUFrQztJQUNsQyx3QkFBYyxDQUFDLDhCQUFrQixDQUFDLG1CQUFtQixDQUFDLEdBQUcscUNBQTBCLENBQUM7SUFDcEYsd0JBQWMsQ0FBQyw4QkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEVBQUUsR0FBRyw4QkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQztBQUd2RyxDQUFDLENBQUMsQ0FBQztBQUVILFNBQWdCLEdBQUcsQ0FBQyxPQUFZO0lBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsT0FBTyxDQUFDLENBQUM7QUFDaEQsQ0FBQztBQUZELGtCQUVDO0FBR1ksUUFBQSxPQUFPLEdBQW1CLEVBQUUsQ0FBQztBQUUxQyxjQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxHQUFFLEVBQUU7SUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0FBQ3JELENBQUMsQ0FBQyxDQUFDO0FBRUgsY0FBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRSxFQUFFO0lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztBQUNsRCxDQUFDLENBQUMsQ0FBQztBQUVILGNBQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFDLEVBQUU7SUFDdkIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLFFBQVEsRUFBa0IsQ0FBQztJQUMzRSxlQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3pCLENBQUMsQ0FBQyxDQUFDO0FBRUgsY0FBTSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO0lBQzlDLE1BQU0sTUFBTSxHQUFHLGlCQUFpQixDQUFDLFFBQVEsRUFBa0IsQ0FBQztJQUM1RCxNQUFNLEtBQUssR0FBRyxlQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6QyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNkLE9BQU8sZUFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3pCO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxjQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDbkMsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pDLElBQUcsTUFBTSxZQUFZLHFCQUFZLEVBQUU7UUFDL0IsSUFBSSxHQUFHLEtBQUssS0FBSyxFQUFFO1lBQ2YsSUFBQSxnQkFBUSxFQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3BCO0tBQ0o7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUlILFNBQWdCLFFBQVEsQ0FBQyxXQUFtQjtJQUN4QyxNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFDMUIsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLGVBQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDakQsSUFBSSxlQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssV0FBVyxFQUFFO1lBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDdkM7S0FDSjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFSRCw0QkFRQztBQU1ELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBQSxZQUFHLEVBQUMsOEJBQThCLE1BQU0sQ0FBQyxNQUFNLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDdkUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFBLGNBQUssRUFBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMifQ==
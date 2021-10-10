"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdByName = exports.DataById = exports.NameById = exports.DeviceById = exports.XuidByName = exports.playerList = void 0;
const common_1 = require("bdsx/common");
const event_1 = require("bdsx/event");
const packetIds_1 = require("bdsx/bds/packetIds");
const form_1 = require("./form");
exports.playerList = [];
let nIt = new Map();
let nMt = new Map();
let nXt = new Map();
let nSt = new Map();
event_1.events.packetAfter(packetIds_1.MinecraftPacketIds.Login).on((ptr, networkIdentifier) => {
    let conq = ptr.connreq;
    if (conq === null)
        return;
    const cert = conq.cert;
    const device = common_1.DeviceOS[conq.getDeviceOS()];
    const xuid = cert.getXuid();
    const username = cert.getId();
    let [ip, port] = String(networkIdentifier).split('|');
    console.log(`${username} : ${ip} [${port}]`);
    nXt.set(username, xuid);
    nIt.set(username, networkIdentifier);
    nMt.set(networkIdentifier, username);
    nSt.set(networkIdentifier, device);
});
event_1.events.packetAfter(packetIds_1.MinecraftPacketIds.SetLocalPlayerAsInitialized).on((ptr, target) => {
    let playerName = NameById(target);
    setTimeout(() => {
        if (!exports.playerList.includes(playerName))
            exports.playerList.push(playerName);
    }, 100);
});
event_1.events.networkDisconnected.on(networkIdentifier => {
    setTimeout(() => {
        const id = nMt.get(networkIdentifier);
        if (exports.playerList.includes(id))
            exports.playerList.splice(exports.playerList.indexOf(id), 1);
        nXt.delete(id);
        nMt.delete(networkIdentifier);
        nSt.delete(networkIdentifier);
        nIt.delete(id);
        form_1.FormData.delete(networkIdentifier);
    }, 1000);
});
/**
  *get player DeviceOS by Id
*/
function XuidByName(PlayerName) {
    let Rlt = nXt.get(PlayerName);
    if (Rlt === undefined)
        Rlt = '';
    return Rlt;
}
exports.XuidByName = XuidByName;
/**
  *get playerXuid by Name
*/
function DeviceById(networkIdentifier) {
    let Rlt = nSt.get(networkIdentifier);
    if (Rlt === undefined)
        Rlt = '';
    return Rlt;
}
exports.DeviceById = DeviceById;
/**
  *get playerName by Id
*/
function NameById(networkIdentifier) {
    let actor = networkIdentifier.getActor();
    let playerName;
    try {
        playerName = actor.getName();
    }
    catch (_a) {
        playerName = nMt.get(networkIdentifier);
    }
    return playerName;
}
exports.NameById = NameById;
/**
  *get playerData by Id
  *result = [name,actor,entity, xuid]
*/
function DataById(networkIdentifier) {
    let actor = networkIdentifier.getActor();
    let entity = actor.getEntity();
    let name = actor.getName();
    let xuid = nXt.get(name);
    return [name, actor, entity, xuid];
}
exports.DataById = DataById;
/**
  *get playerId by Name
*/
function IdByName(PlayerName) {
    let Rlt = nIt.get(PlayerName);
    return Rlt;
}
exports.IdByName = IdByName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbm5lY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsd0NBQXVDO0FBQ3ZDLHNDQUFvQztBQUNwQyxrREFBd0Q7QUFDeEQsaUNBQWtDO0FBR3ZCLFFBQUEsVUFBVSxHQUFZLEVBQUUsQ0FBQztBQUNwQyxJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFDcEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNwQixJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLGNBQU0sQ0FBQyxXQUFXLENBQUMsOEJBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLGlCQUFpQixFQUFFLEVBQUU7SUFDdkUsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztJQUN2QixJQUFJLElBQUksS0FBSyxJQUFJO1FBQUUsT0FBTztJQUMxQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3ZCLE1BQU0sTUFBTSxHQUFHLGlCQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDNUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzVCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM5QixJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxNQUFNLEVBQUUsS0FBSyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQzdDLEdBQUcsQ0FBQyxH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
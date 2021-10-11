"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectedPlayers = exports.serverData = void 0;
const fs = require("fs");
const path = require("path");
const os = require("os");
const pidusage = require("pidusage");
const gamerules_1 = require("bdsx/bds/gamerules");
const packetids_1 = require("bdsx/bds/packetids");
const packets_1 = require("bdsx/bds/packets");
const scoreboard_1 = require("bdsx/bds/scoreboard");
const server_1 = require("bdsx/bds/server");
const event_1 = require("bdsx/event");
const launcher_1 = require("bdsx/launcher");
const plugins_1 = require("bdsx/plugins");
const serverproperties_1 = require("bdsx/serverproperties");
const utils_1 = require("../utils");
const server_2 = require("./server");
const graphUpdate = require('../../config.json');
class DeepProxy {
    constructor(target, handler) {
        this._preproxy = new WeakMap();
        this._handler = handler;
        return this.proxify(target, []);
    }
    makeHandler(path) {
        let dp = this;
        return {
            set(target, key, value, receiver) {
                if (typeof value === "object") {
                    value = dp.proxify(value, [...path, key]);
                }
                target[key] = value;
                if (dp._handler.set) {
                    dp._handler.set(target, [...path, key], value, receiver);
                }
                return true;
            },
            deleteProperty(target, key) {
                if (Reflect.has(target, key)) {
                    dp.unproxy(target, key);
                    let deleted = Reflect.deleteProperty(target, key);
                    if (deleted && dp._handler.deleteProperty) {
                        dp._handler.deleteProperty(target, [...path, key]);
                    }
                    return deleted;
                }
                return false;
            }
        };
    }
    unproxy(obj, key) {
        if (this._preproxy.has(obj[key])) {
            obj[key] = this._preproxy.get(obj[key]);
            this._preproxy.delete(obj[key]);
        }
        for (const k of Object.keys(obj[key])) {
            if (typeof obj[key][k] === "object") {
                this.unproxy(obj[key], k);
            }
        }
    }
    proxify(obj, path) {
        for (let key of Object.keys(obj)) {
            if (typeof obj[key] === "object") {
                obj[key] = this.proxify(obj[key], [...path, key]);
            }
        }
        let p = new Proxy(obj, this.makeHandler(path));
        this._preproxy.set(p, obj);
        return p;
    }
}
const data = {
    status: 0,
    machine: {
        os: `${os.type()} ${os.release()}`,
        name: os.hostname(),
        network: {
            ip: utils_1.Utils.getAddress(),
            port: parseInt(serverproperties_1.serverProperties["server-port"])
        }
    },
    process: {
        sessionId: "",
        pid: process.pid,
        cwd: process.cwd(),
        user: os.userInfo().username,
        usage: {
            cpu: [],
            ram: []
        }
    },
    server: {
        version: "0.0.0",
        protocol: 0,
        bdsx: require("bdsx/version-bdsx.json"),
        uptime: 0,
        announcement: {
            name: "",
            level: "",
            players: {
                current: 0,
                max: 0,
            }
        },
        info: {
            name: serverproperties_1.serverProperties["server-name"],
            level: serverproperties_1.serverProperties["level-name"],
            players: {
                current: 0,
                max: parseInt(serverproperties_1.serverProperties["max-players"]),
            }
        },
        plugins: [],
        onlinePlugins: [],
        logs: {
            chat: [],
            commands: [],
            console: []
        },
        game: {
            tps: 0,
            players: {},
            objectives: {},
            permissions: require(path.join(process.cwd(), "permissions.json")),
            options: {}
        }
    }
};
exports.serverData = new DeepProxy(data, {
    set: (data, path, value) => {
        server_2.panel.io.emit(server_2.SocketEvents.SyncServerData, {
            path,
            value,
        });
        return true;
    },
    deleteProperty(data, path) {
        server_2.panel.io.emit(server_2.SocketEvents.SyncServerData, {
            path,
            delete: true,
        });
        return true;
    }
});
let tps = 0;
function refreshScoreboard() {
    var _a;
    const scoreboard = server_1.serverInstance.minecraft.getLevel().getScoreboard();
    const trackedIds = scoreboard.getTrackedIds();
    for (const objective of scoreboard.getObjectives()) {
        const scores = {};
        for (const scoreboardId of trackedIds) {
            const score = objective.getPlayerScore(scoreboardId);
            if (score.valid) {
                scores[scoreboardId.idAsNumber] = {
                    name: utils_1.Utils.formatColorCodesToHTML((_a = scoreboardId.identityDef.getName()) !== null && _a !== void 0 ? _a : "Player Offline"),
                    value: score.value,
                };
            }
        }
        exports.serverData.server.game.objectives[objective.name] = {
            displayName: utils_1.Utils.formatColorCodesToHTML(objective.displayName),
            pinned: "",
            scores,
        };
    }
    const belowName = scoreboard.getDisplayObjective(scoreboard_1.DisplaySlot.BelowName);
    if (belowName) {
        exports.serverData.server.game.objectives[belowName.objective.name].pinned += "label";
    }
    const list = scoreboard.getDisplayObjective(scoreboard_1.DisplaySlot.List);
    if (list) {
        exports.serverData.server.game.objectives[list.objective.name].pinned += "format_list_numbered_rtl";
    }
    const sidebar = scoreboard.getDisplayObjective(scoreboard_1.DisplaySlot.Sidebar);
    if (sidebar) {
        exports.serverData.server.game.objectives[sidebar.objective.name].pinned += "push_pin";
    }
}
exports.selectedPlayers = new Array();
launcher_1.bedrockServer.afterOpen().then(() => {
    server_2.panel.io.emit(server_2.SocketEvents.Logout);
    const startTime = new Date().getTime();
    exports.serverData.status = 1;
    exports.serverData.process.sessionId = launcher_1.bedrockServer.sessionId;
    exports.serverData.server.version = server_1.serverInstance.getGameVersion().fullVersionString;
    exports.serverData.server.protocol = server_1.serverInstance.getNetworkProtocolVersion();
    exports.serverData.server.info.name = server_1.serverInstance.getMotd();
    exports.serverData.server.info.players.max = server_1.serverInstance.getMaxPlayers();
    for (const plugin of plugins_1.loadedPackages) {
        exports.serverData.server.plugins.push({
            name: plugin.name,
            json: {
                name: plugin.json.name,
                version: plugin.json.version,
                description: plugin.json.description,
                keywords: plugin.json.keywords,
                author: plugin.json.author,
                license: plugin.json.license,
            }
        });
    }
    exports.serverData.server.game.options["Game Rules"] = {};
    const level = server_1.serverInstance.minecraft.getLevel();
    const gameRules = level.getGameRules();
    for (let i = 0; i < Object.keys(gamerules_1.GameRuleId).length / 2; i++) {
        const rule = gameRules.getRule(i);
        exports.serverData.server.game.options["Game Rules"][gamerules_1.GameRuleId[i]] = {
            displayName: utils_1.Utils.mapGameRuleName(i),
            type: rule.type,
            value: rule.getValue(),
        };
    }
    exports.serverData.server.game.options["World"] = {
        // "difficulty": {
        //     displayName: "Difficulty",
        //     type: GameRule.Type.Int,
        //     enum: ["Peaceful", "Easy", "Normal", "Hard"],
        //     value: serverInstance.minecraft.getLevel().getDifficulty(),
        // },
        "allow-cheats": {
            displayName: "Allow Cheats",
            type: gamerules_1.GameRule.Type.Bool,
            value: server_1.serverInstance.minecraft.getLevel().hasCommandsEnabled(),
        }
    };
    refreshScoreboard();
    utils_1.Utils.fetchAllPlugins().then(plugins => {
        if (plugins !== null) {
            for (const plugin of plugins) {
                if (!plugins_1.loadedPlugins.includes(plugin.package.name)) {
                    exports.serverData.server.onlinePlugins.push(plugin);
                }
            }
        }
    });
    setInterval(() => {
        exports.serverData.server.uptime = new Date().getTime() - startTime;
        exports.serverData.server.game.tps = tps > 20 ? 20 : tps;
        tps = 0;
    }, 1000).unref();
    setInterval(function _() {
        if (exports.serverData.process.usage.ram.length >= 30) {
            exports.serverData.process.usage.ram.shift();
            exports.serverData.process.usage.cpu.shift();
        }
        const time = new Date().getTime();
        pidusage(process.pid, (err, stats) => {
            exports.serverData.process.usage.ram.push({
                percent: stats.memory * 100 / os.totalmem(),
                time,
            });
            exports.serverData.process.usage.cpu.push({
                percent: stats.cpu,
                time,
            });
            server_2.panel.io.emit(server_2.SocketEvents.UpdateResourceUsage);
        });
        return _;
    }(), 1000 * graphUpdate.graphUpdateTime).unref();
});
event_1.events.queryRegenerate.on(event => {
    exports.serverData.server.announcement.name = event.motd;
    exports.serverData.server.announcement.level = event.levelname;
    exports.serverData.server.announcement.players.current = event.currentPlayers;
    exports.serverData.server.announcement.players.max = event.maxPlayers;
});
event_1.events.packetBefore(packetids_1.MinecraftPacketIds.Text).on(pk => {
    if (pk.type === packets_1.TextPacket.Types.Chat) {
        exports.serverData.server.logs.chat.push({
            name: pk.name,
            message: utils_1.Utils.formatColorCodesToHTML(pk.message),
            time: new Date().getTime()
        });
    }
});
event_1.events.command.on((command, originName, ctx) => {
    exports.serverData.server.logs.commands.push({
        name: originName,
        command,
        time: new Date().getTime(),
    });
});
{
    const original = process.stdout.write.bind(process.stdout);
    process.stdout.write = (buffer, callback) => {
        exports.serverData.server.logs.console.push({
            log: utils_1.Utils.formatConsoleCodesToHTML(buffer.toString() /*.replace(/(\[\d+m|\u001b)/g, "")*/),
            time: new Date().getTime(),
        });
        return original(buffer, callback);
    };
}
event_1.events.packetAfter(packetids_1.MinecraftPacketIds.Login).on(async (pk, ni) => {
    var _a, _b, _c, _d;
    const connreq = pk.connreq;
    if (connreq) {
        const cert = connreq.cert.json.value();
        const data = connreq.getJsonValue();
        const uuid = cert["extraData"]["identity"];
        exports.serverData.server.game.players[uuid] = {
            name: cert["extraData"]["displayName"],
            uuid: uuid,
            xuid: cert["extraData"]["XUID"],
            ip: ni.getAddress().split("|")[0],
            skin: {
                head: "",
            },
            device: {
                type: data.DeviceOS,
                model: data.DeviceModel,
                id: data.DeviceId,
            },
            version: data.GameVersion,
            lang: data.LanguageCode,
        };
        try {
            const languageNames = JSON.parse(fs.readFileSync(path.join(process.cwd(), "resource_packs", "vanilla", "texts", "language_names.json"), "utf8"));
            exports.serverData.server.game.players[uuid].lang = (_b = (_a = languageNames.find(l => l[0] === data.LanguageCode)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : data.LanguageCode;
        }
        catch (_e) { }
        const geometryName = JSON.parse(Buffer.from(data.SkinResourcePatch, "base64").toString())["geometry"]["default"];
        const geometryData = JSON.parse(Buffer.from(data.SkinGeometryData, "base64").toString());
        const faceTextureOffset = [8, 8];
        const faceTextureSize = [8, 8];
        let fromAnimatedData = false;
        if (geometryData === null) {
            // HD skins
            if (data.SkinImageHeight === 128) {
                faceTextureOffset[0] = 16;
                faceTextureOffset[1] = 16;
                faceTextureSize[0] = 16;
                faceTextureSize[1] = 16;
            }
        }
        else {
            let geometry;
            // Format version 1.12.0
            if ("minecraft:geometry" in geometryData) {
                const geometries = geometryData["minecraft:geometry"];
                if (Array.isArray(geometries)) {
                    geometry = geometryData["minecraft:geometry"].find((g) => g.description.identifier === geometryName);
                }
                else {
                    geometry = geometryData["minecraft:geometry"][geometries];
                }
            }
            // Fomrat version 1.8.0
            else {
                geometry = geometryData[geometryName];
            }
            const headModel = geometry.bones.find(b => b.name === "head");
            if ((_d = (_c = headModel.cubes) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.uv) {
                const uv = headModel.cubes[0].uv;
                const size = headModel.cubes[0].size;
                faceTextureOffset[0] = uv[0] + size[0];
                faceTextureOffset[1] = uv[1] + size[1];
                faceTextureSize[0] = size[0];
                faceTextureSize[1] = size[1];
            }
            else {
                fromAnimatedData = true;
            }
        }
        if (fromAnimatedData) {
            exports.serverData.server.game.players[uuid].skin.head = await utils_1.Utils.readSkinBuffer(Buffer.from(data.AnimatedImageData[0].Image, "base64"), data.AnimatedImageData[0].ImageWidth, data.AnimatedImageData[0].ImageHeight, faceTextureOffset, faceTextureSize);
        }
        else {
            exports.serverData.server.game.players[uuid].skin.head = await utils_1.Utils.readSkinBuffer(Buffer.from(data.SkinData, "base64"), data.SkinImageWidth, data.SkinImageHeight, faceTextureOffset, faceTextureSize);
        }
        utils_1.Utils.players.set(uuid, ni);
    }
});
// events.packetRaw(MinecraftPacketIds.PlayerSkin).on(async (ptr, size, ni) => {
//     for (const [uuid, _ni] of Utils.players) {
//         if (_ni.equals(ni)) {
//             console.log("started");
//             ptr.move(1);
//             ptr.readBin64();
//             ptr.readBin64();
//             const data: any = {};
//             data.skinId = ptr.readVarString();
//             data.skinPlayFabId = ptr.readVarString();
//             data.skinResourcePatch = ptr.readVarString();
//             data.skinData = {
//                 width: ptr.readInt32(),
//                 height: ptr.readInt32(),
//                 data: ptr.readVarString(),
//             };
//             data.animations = [];
//             for (let i = 0; i < ptr.readInt32(); i++) {
//                 data.animations.push({
//                     skinImage: {
//                         width: ptr.readInt32(),
//                         height: ptr.readInt32(),
//                         data: ptr.readVarString(),
//                     },
//                     animationType : ptr.readInt32(),
//                     animationFrames : ptr.readFloat64(),
//                     expressionType : ptr.readInt32(),
//                 });
//             }
//             data.capeData = {
//                 width: ptr.readInt32(),
//                 height: ptr.readInt32(),
//                 data: ptr.readVarString(),
//             };
//             data.geometryData = ptr.readVarString();
//             data.animationData = ptr.readVarString();
//             data.premium = ptr.readBoolean();
//             data.persona = ptr.readBoolean();
//             data.capeOnClassic = ptr.readBoolean();
//             data.capeId = ptr.readVarString();
//             data.fullSkinId = ptr.readVarString();
//             data.armSize = ptr.readVarString();
//             data.skinColor = ptr.readVarString();
//             data.personaPieces = [];
//             for (let i = 0; i < ptr.readInt32(); i++) {
//                 data.personaPieces.push({
//                     pieceId: ptr.readVarString(),
//                     pieceType: ptr.readVarString(),
//                     packId: ptr.readVarString(),
//                     isDefaultPiece: ptr.readBoolean(),
//                     productId: ptr.readVarString(),
//                 });
//             }
//             data.pieceTintColors = [];
//             for (let i = 0; i < ptr.readInt32(); i++) {
//                 const color = {
//                     pieceType: ptr.readVarString(),
//                     colors: new Array<string>(),
//                 };
//                 for (let j = 0; j < ptr.readInt32(); j++) {
//                     color.colors.push(ptr.readVarString());
//                 }
//                 data.pieceTintColors.push(color);
//             }
//             console.log("mid1");
//             const geometryName = JSON.parse(data.skinResourcePatch)["geometry"]["default"];
//             console.log("mid2");
//             const geometryData = JSON.parse(data.geometryData);
//             console.log("mid3");
//             const faceTextureOffset: [number, number] = [8, 8];
//             const faceTextureSize: [number, number] = [8, 8];
//             let fromAnimatedData = false;
//             if (geometryData === null) {
//                 // HD skins
//                 if (data.skinData.height === 128) {
//                     faceTextureOffset[0] = 16;
//                     faceTextureOffset[1] = 16;
//                     faceTextureSize[0] = 16;
//                     faceTextureSize[1] = 16;
//                 }
//             } else {
//                 let geometry: {bones: any[]};
//                 // Format version 1.12.0
//                 if ("minecraft:geometry" in geometryData) {
//                     const geometries = geometryData["minecraft:geometry"];
//                     if (Array.isArray(geometries)) {
//                         geometry = geometryData["minecraft:geometry"].find((g: any) => g.description.identifier === geometryName);
//                     } else {
//                     geometry = geometryData["minecraft:geometry"][geometries];
//                     }
//                 }
//                 // Fomrat version 1.8.0
//                 else {
//                     geometry = geometryData[geometryName];
//                 }
//                 const headModel = geometry.bones.find(b => b.name === "head");
//                 if (headModel.cubes?.[0]?.uv) {
//                     const uv = headModel.cubes[0].uv;
//                     const size = headModel.cubes[0].size;
//                     faceTextureOffset[0] = uv[0] + size[0];
//                     faceTextureOffset[1] = uv[1] + size[1];
//                     faceTextureSize[0] = size[0];
//                     faceTextureSize[1] = size[1];
//                 } else {
//                     fromAnimatedData = true;
//                 }
//                 console.log("done1", data.skinData.data);
//             }
//             // Unknown encoding
//             if (fromAnimatedData) {
//                 serverData.server.game.players[uuid].skin.head = await Utils.readSkinBuffer(Buffer.from(data.animations[0].skinImage.data, "utf8"), data.animations[0].skinImage.width, data.animations[0].skinImage.height, faceTextureOffset, faceTextureSize);
//             } else {
//                 serverData.server.game.players[uuid].skin.head = await Utils.readSkinBuffer(Buffer.from(data.skinData.data, "utf8"), data.skinData.width, data.skinData.height, faceTextureOffset, faceTextureSize);
//             }
//             console.log("done2");
//             break;
//         }
//     }
// });
event_1.events.networkDisconnected.on(data => {
    for (const [uuid, ni] of utils_1.Utils.players) {
        if (ni.equals(data)) {
            exports.selectedPlayers.splice(exports.selectedPlayers.findIndex(e => e[0] === uuid), 1);
            server_2.panel.io.emit(server_2.SocketEvents.StopRequestPlayerInfo, uuid);
            const scoreboardId = exports.serverData.server.game.players[uuid].scoreboardId;
            for (const [name, obj] of Object.entries(exports.serverData.server.game.objectives)) {
                if (obj.scores[scoreboardId]) {
                    obj.scores[scoreboardId].name = "Player Offline";
                }
            }
            delete exports.serverData.server.game.players[uuid];
            utils_1.Utils.players.delete(uuid);
            break;
        }
    }
});
event_1.events.levelTick.on(() => {
    tps += 1;
});
fs.watchFile(path.join(process.cwd(), "permissions.json"), (curr, prev) => {
    try {
        exports.serverData.server.game.permissions = JSON.parse(fs.readFileSync(path.join(process.cwd(), "permissions.json"), "utf8"));
    }
    catch (_a) { }
});
event_1.events.serverClose.on(() => {
    fs.unwatchFile(path.join(process.cwd(), "permissions.json"));
});
event_1.events.packetSend(packetids_1.MinecraftPacketIds.GameRulesChanged).on(pk => {
    const gameRules = server_1.serverInstance.minecraft.getLevel().getGameRules();
    for (let i = 0; i < Object.keys(gamerules_1.GameRuleId).length / 2; i++) {
        const rule = gameRules.getRule(i);
        exports.serverData.server.game.options["Game Rules"][gamerules_1.GameRuleId[i]] = {
            displayName: utils_1.Utils.mapGameRuleName(i),
            type: rule.type,
            value: rule.getValue(),
        };
    }
});
event_1.events.packetSend(packetids_1.MinecraftPacketIds.SetCommandsEnabled).on(pk => {
    exports.serverData.server.game.options["World"]["allow-cheats"].value = pk.commandsEnabled;
});
// events.packetSend(MinecraftPacketIds.SetDifficulty).on(pk => {
//     serverData.server.game.options["World"]["difficulty"].value = pk.commandsEnabled;
// });
// Player Info
event_1.events.packetAfter(packetids_1.MinecraftPacketIds.PlayerAuthInput).on((pk, ni) => {
    for (const [uuid, _ni] of exports.selectedPlayers) {
        if (_ni.equals(ni)) {
            exports.serverData.server.game.players[uuid].gameInfo.pos.x = pk.pos.x;
            exports.serverData.server.game.players[uuid].gameInfo.pos.y = pk.pos.y;
            exports.serverData.server.game.players[uuid].gameInfo.pos.z = pk.pos.z;
            exports.serverData.server.game.players[uuid].gameInfo.rot.x = pk.pitch;
            exports.serverData.server.game.players[uuid].gameInfo.rot.y = pk.yaw;
            break;
        }
    }
});
event_1.events.entityHealthChange.on(event => {
    if (event.entity.isPlayer()) {
        const ni = event.entity.getNetworkIdentifier();
        for (const [uuid, _ni] of exports.selectedPlayers) {
            if (_ni.equals(ni)) {
                exports.serverData.server.game.players[uuid].gameInfo.health.current = event.newHealth;
                exports.serverData.server.game.players[uuid].gameInfo.health.max = event.entity.getMaxHealth();
                break;
            }
        }
    }
});
// events.playerInventoryChange.on(event => {
//     const ni = event.player.getNetworkIdentifier();
//     for (const [uuid, _ni] of selectedPlayers) {
//         if (_ni.equals(ni)) {
//             serverData.server.game.players[uuid].gameInfo!.inv = new InventoryRenderer(event.player.getInventory());
//             panel.io.emit(SocketEvents.UpdateRequestedPlayerInventory);
//             break;
//         }
//     }
// });
event_1.events.objectiveCreate.on(objective => {
    exports.serverData.server.game.objectives[objective.name] = {
        displayName: utils_1.Utils.formatColorCodesToHTML(objective.displayName),
        pinned: "",
        scores: {},
    };
});
event_1.events.scoreReset.on(event => {
    if (exports.serverData.server.game.objectives[event.objective.name]) {
        delete exports.serverData.server.game.objectives[event.objective.name].scores[event.identityRef.scoreboardId.idAsNumber];
    }
    else {
        refreshScoreboard();
    }
});
event_1.events.scoreSet.on(event => {
    var _a;
    if (exports.serverData.server.game.objectives[event.objective.name]) {
        exports.serverData.server.game.objectives[event.objective.name].scores[event.identityRef.scoreboardId.idAsNumber] = {
            name: utils_1.Utils.formatColorCodesToHTML((_a = event.identityRef.scoreboardId.identityDef.getName()) !== null && _a !== void 0 ? _a : "Player Offline"),
            value: event.score,
        };
    }
    else {
        refreshScoreboard();
    }
});
event_1.events.scoreAdd.on(event => {
    var _a;
    if (exports.serverData.server.game.objectives[event.objective.name]) {
        exports.serverData.server.game.objectives[event.objective.name].scores[event.identityRef.scoreboardId.idAsNumber] = {
            name: utils_1.Utils.formatColorCodesToHTML((_a = event.identityRef.scoreboardId.identityDef.getName()) !== null && _a !== void 0 ? _a : "Player Offline"),
            value: event.objective.getPlayerScore(event.identityRef.scoreboardId).value + event.score,
        };
    }
    else {
        refreshScoreboard();
    }
});
event_1.events.scoreRemove.on(event => {
    var _a;
    if (exports.serverData.server.game.objectives[event.objective.name]) {
        exports.serverData.server.game.objectives[event.objective.name].scores[event.identityRef.scoreboardId.idAsNumber] = {
            name: utils_1.Utils.formatColorCodesToHTML((_a = event.identityRef.scoreboardId.identityDef.getName()) !== null && _a !== void 0 ? _a : "Player Offline"),
            value: event.objective.getPlayerScore(event.identityRef.scoreboardId).value - event.score,
        };
    }
    else {
        refreshScoreboard();
    }
});
event_1.events.playerJoin.on(event => {
    const ni = event.player.getNetworkIdentifier();
    for (const [uuid, _ni] of utils_1.Utils.players) {
        if (_ni.equals(ni)) {
            exports.serverData.server.game.players[uuid].scoreboardId = server_1.serverInstance.minecraft.getLevel().getScoreboard().getPlayerScoreboardId(event.player).idAsNumber;
            break;
        }
    }
});
event_1.events.packetSend(packetids_1.MinecraftPacketIds.SetScore).on((pk, ni) => {
    refreshScoreboard();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUJBQTBCO0FBQzFCLDZCQUE4QjtBQUM5Qix5QkFBMEI7QUFDMUIscUNBQXFDO0FBQ3JDLGtEQUEwRDtBQUUxRCxrREFBd0Q7QUFDeEQsOENBQThDO0FBQzlDLG9EQUFrRDtBQUNsRCw0Q0FBaUQ7QUFFakQsc0NBQW9DO0FBQ3BDLDRDQUE4QztBQUM5QywwQ0FBNkQ7QUFDN0QsNERBQXlEO0FBQ3pELG9DQUFpQztBQUNqQyxxQ0FBK0M7QUFDL0MsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUE7QUFFaEQsTUFBTSxTQUFTO0lBR1gsWUFBWSxNQUEyQixFQUFFLE9BQXNDO1FBQzNFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBUSxDQUFDO0lBQzNDLENBQUM7SUFFTyxXQUFXLENBQUMsSUFBYztRQUM5QixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDZCxPQUFPO1lBQ0gsR0FBRyxDQUFDLE1BQTJCLEVBQUUsR0FBVyxFQUFFLEtBQVUsRUFBRSxRQUFhO2dCQUNuRSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtvQkFDM0IsS0FBSyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDN0M7Z0JBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFFcEIsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRTtvQkFDakIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFF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
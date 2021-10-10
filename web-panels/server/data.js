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
    }(), 60000).unref();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUJBQTBCO0FBQzFCLDZCQUE4QjtBQUM5Qix5QkFBMEI7QUFDMUIscUNBQXFDO0FBQ3JDLGtEQUEwRDtBQUUxRCxrREFBd0Q7QUFDeEQsOENBQThDO0FBQzlDLG9EQUFrRDtBQUNsRCw0Q0FBaUQ7QUFFakQsc0NBQW9DO0FBQ3BDLDRDQUE4QztBQUM5QywwQ0FBNkQ7QUFDN0QsNERBQXlEO0FBQ3pELG9DQUFpQztBQUNqQyxxQ0FBK0M7QUFFL0MsTUFBTSxTQUFTO0lBR1gsWUFBWSxNQUEyQixFQUFFLE9BQXNDO1FBQzNFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBUSxDQUFDO0lBQzNDLENBQUM7SUFFTyxXQUFXLENBQUMsSUFBYztRQUM5QixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDZCxPQUFPO1lBQ0gsR0FBRyxDQUFDLE1BQTJCLEVBQUUsR0FBVyxFQUFFLEtBQVUsRUFBRSxRQUFhO2dCQUNuRSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtvQkFDM0IsS0FBSyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDN0M7Z0JBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFFcEIsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRTtvQkFDakIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLFFB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
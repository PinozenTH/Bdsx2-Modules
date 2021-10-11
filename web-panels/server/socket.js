"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attribute_1 = require("bdsx/bds/attribute");
const gamerules_1 = require("bdsx/bds/gamerules");
const packets_1 = require("bdsx/bds/packets");
const server_1 = require("bdsx/bds/server");
const event_1 = require("bdsx/event");
const launcher_1 = require("bdsx/launcher");
const plugins_1 = require("bdsx/plugins");
const child_process_1 = require("child_process");
const utils_1 = require("../utils");
const data_1 = require("./data");
const server_2 = require("./server");
server_2.panel.io.on("connection", (socket) => {
    socket.on(server_2.SocketEvents.Login, (username, password, silent) => {
        if (username === server_2.panel.config.account.username && password === server_2.panel.config.account.password) {
            socket.emit(server_2.SocketEvents.Login);
            if (!silent) {
                socket.emit(server_2.SocketEvents.Toast, "Logged in successfully.", "success");
            }
            utils_1.Utils.fetchAllPlugins().then(plugins => {
                if (plugins !== null) {
                    data_1.serverData.server.onlinePlugins = [];
                    for (const plugin of plugins) {
                        if (!plugins_1.loadedPlugins.includes(plugin.package.name)) {
                            data_1.serverData.server.onlinePlugins.push(plugin);
                        }
                    }
                }
            });
            socket.emit(server_2.SocketEvents.SyncServerData, {
                path: [],
                value: data_1.serverData,
            });
            socket.emit(server_2.SocketEvents.UpdateResourceUsage);
            socket.on(server_2.SocketEvents.StopServer, () => {
                socket.emit(server_2.SocketEvents.Toast, "Stopping server.");
                launcher_1.bedrockServer.stop();
            });
            socket.on(server_2.SocketEvents.RestartServer, () => {
                socket.emit(server_2.SocketEvents.Toast, "Restarting server.");
                event_1.events.serverStop.on(() => {
                    setTimeout(() => {
                        (0, child_process_1.execSync)(process.argv.join(" "), { stdio: "inherit" });
                    }, 5000);
                });
                launcher_1.bedrockServer.stop();
            });
            socket.on(server_2.SocketEvents.InputCommand, (command) => {
                socket.emit(server_2.SocketEvents.Toast, "Command sent.", "success");
                launcher_1.bedrockServer.executeCommandOnConsole(command);
            });
            socket.on(server_2.SocketEvents.InputChat, (chat) => {
                const pk = packets_1.TextPacket.create();
                pk.type = packets_1.TextPacket.Types.Chat;
                pk.name = server_2.panel.config["chat_name"];
                pk.message = chat;
                utils_1.Utils.broadcastPacket(pk);
                socket.emit(server_2.SocketEvents.Toast, "Message sent.", "success");
                data_1.serverData.server.logs.chat.push({
                    name: server_2.panel.config["chat_name"],
                    message: utils_1.Utils.formatColorCodesToHTML(chat),
                    time: new Date().getTime(),
                });
            });
            socket.on(server_2.SocketEvents.CheckForPluginUpdates, async (plugin, version) => {
                const update = await utils_1.Utils.checkForPluginUpdates(plugin, version);
                switch (update) {
                    case "not on npm":
                        socket.emit(server_2.SocketEvents.Toast, `${utils_1.Utils.formatPluginName(plugin)} is not on npm.`, "danger");
                        break;
                    case "up to date":
                        socket.emit(server_2.SocketEvents.Toast, `${utils_1.Utils.formatPluginName(plugin)} is up to date.`, "success");
                        break;
                    default:
                        socket.emit(server_2.SocketEvents.Toast, `${utils_1.Utils.formatPluginName(plugin)} has an available update of ${update}.`, "success");
                }
            });
            socket.on(server_2.SocketEvents.InstallPlugin, (plugin, version) => {
                socket.emit(server_2.SocketEvents.Toast, `Installing ${utils_1.Utils.formatPluginName(plugin)}.`);
                (0, child_process_1.execSync)(`npm i ${plugin}${version ? "@" + version : ""}`, { stdio: 'inherit' });
                socket.emit(server_2.SocketEvents.Toast, `Installed ${utils_1.Utils.formatPluginName(plugin)}, it will be loaded on the next restart.`, "warning");
            });
            socket.on(server_2.SocketEvents.RemovePlugin, (plugin) => {
                socket.emit(server_2.SocketEvents.Toast, `Uninstalling ${utils_1.Utils.formatPluginName(plugin)}.`);
                (0, child_process_1.execSync)(`npm r ${plugin}`, { stdio: 'inherit' });
                socket.emit(server_2.SocketEvents.Toast, `Uninstalled ${utils_1.Utils.formatPluginName(plugin)}, it will not be loaded on the next restart.`, "warning");
            });
            socket.on(server_2.SocketEvents.StartRequestPlayerInfo, (uuid) => {
                const ni = utils_1.Utils.players.get(uuid);
                const player = ni === null || ni === void 0 ? void 0 : ni.getActor();
                if (player === null || player === void 0 ? void 0 : player.isPlayer()) {
                    data_1.selectedPlayers.push([uuid, ni]);
                    data_1.serverData.server.game.players[uuid].gameInfo = {
                        pos: player.getPosition().toJSON(),
                        rot: player.getRotation().toJSON(),
                        lvl: player.getAttribute(attribute_1.AttributeId.PlayerLevel),
                        health: {
                            current: player.getHealth(),
                            max: player.getMaxHealth(),
                        },
                        food: {
                            current: player.getAttribute(attribute_1.AttributeId.PlayerSaturation),
                            max: 20,
                        },
                        //inv: new InventoryRenderer(player.getInventory()),
                    };
                }
                socket.emit(server_2.SocketEvents.UpdateRequestedPlayerInventory);
            });
            socket.on(server_2.SocketEvents.StopRequestPlayerInfo, (uuid) => {
                data_1.selectedPlayers.splice(data_1.selectedPlayers.findIndex(e => e[0] === uuid), 1);
            });
            socket.on(server_2.SocketEvents.KickPlayer, (uuid, reason) => {
                const ni = utils_1.Utils.players.get(uuid);
                if (ni) {
                    const name = ni.getActor().getName();
                    if (reason === null) {
                        server_1.serverInstance.disconnectClient(ni);
                    }
                    else {
                        server_1.serverInstance.disconnectClient(ni, reason);
                    }
                    socket.emit(server_2.SocketEvents.Toast, `Kicked ${name}.`, "success");
                }
            });
            socket.on(server_2.SocketEvents.ChangeSetting, (category, name, value, type) => {
                switch (category) {
                    case "Game Rules":
                        const gameRules = server_1.serverInstance.minecraft.getLevel().getGameRules();
                        const rule = gameRules.getRule(gamerules_1.GameRuleId[name]);
                        rule.setValue(value, type);
                        server_1.serverInstance.minecraft.getLevel().syncGameRules();
                        break;
                    case "World":
                        const level = server_1.serverInstance.minecraft.getLevel();
                        switch (name) {
                            // case "difficulty":
                            //     level.setDifficulty(value as number);
                            //     break;
                            case "allow-cheats":
                                data_1.serverData.server.game.options["World"]["allow-cheats"].value = value;
                                level.setCommandsEnabled(value);
                                break;
                        }
                        break;
                }
            });
        }
        else {
            socket.emit(server_2.SocketEvents.Toast, "Invalid username or password.", "danger");
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic29ja2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0RBQWlEO0FBQ2pELGtEQUEwRDtBQUMxRCw4Q0FBOEM7QUFDOUMsNENBQWlEO0FBQ2pELHNDQUFvQztBQUNwQyw0Q0FBOEM7QUFDOUMsMENBQTZDO0FBQzdDLGlEQUF5QztBQUN6QyxvQ0FBaUM7QUFDakMsaUNBQXFEO0FBQ3JELHFDQUErQztBQUUvQyxjQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxNQUFXLEVBQUUsRUFBRTtJQUN0QyxNQUFNLENBQUMsRUFBRSxDQUFDLHFCQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBZ0IsRUFBRSxRQUFnQixFQUFFLE1BQWdCLEVBQUUsRUFBRTtRQUNuRixJQUFJLFFBQVEsS0FBSyxjQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksUUFBUSxLQUFLLGNBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUMxRixNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFZLENBQUMsS0FBSyxFQUFFLHlCQUF5QixFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ3pFO1lBQ0QsYUFBSyxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDbkMsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFO29CQUNsQixpQkFBVSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO29CQUNyQyxLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRTt3QkFDMUIsSUFBSSxDQUFDLHVCQUFhLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxD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
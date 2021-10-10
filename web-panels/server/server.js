"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.panel = exports.SocketEvents = void 0;
const path = require("path");
const event_1 = require("bdsx/event");
const serverproperties_1 = require("bdsx/serverproperties");
const data_1 = require("./data");
var SocketEvents;
(function (SocketEvents) {
    // Login
    SocketEvents["Login"] = "Login";
    SocketEvents["Logout"] = "Logout";
    // Data
    SocketEvents["SyncServerData"] = "SyncServerData";
    SocketEvents["UpdateResourceUsage"] = "UpdateResourceUsage";
    // GUI
    SocketEvents["Toast"] = "Toast";
    // Input
    SocketEvents["InputChat"] = "InputChat";
    SocketEvents["InputCommand"] = "InputCommand";
    // Server Control
    SocketEvents["StopServer"] = "StopServer";
    SocketEvents["RestartServer"] = "RestartServer";
    // Plugins
    SocketEvents["CheckForPluginUpdates"] = "CheckForPluginUpdates";
    SocketEvents["InstallPlugin"] = "InstallPlugin";
    SocketEvents["RemovePlugin"] = "RemovePlugin";
    // Game
    SocketEvents["StartRequestPlayerInfo"] = "StartRequestPlayerInfo";
    SocketEvents["StopRequestPlayerInfo"] = "StopRequestPlayerInfo";
    SocketEvents["UpdateRequestedPlayerInventory"] = "UpdateRequestedPlayerInventory";
    SocketEvents["KickPlayer"] = "KickPlayer";
    SocketEvents["SetScore"] = "SetScore";
    SocketEvents["ChangeSetting"] = "ChangeSetting";
})(SocketEvents = exports.SocketEvents || (exports.SocketEvents = {}));
class ServerPanel {
    constructor() {
        this.express = require("express");
        this.app = this.express();
        this.http = require("http").createServer(this.app);
        this.io = require("socket.io")(this.http);
        this.sockets = {};
        this.nextSocketId = 0;
        this.config = require("../config.json");
    }
    getPanelPort() {
        if (this.config["same_port_with_bds"]) {
            return Number(serverproperties_1.serverProperties["server-port"]);
        }
        else {
            return this.config["port"];
        }
    }
    init() {
        this.app.get(this.config.path, (req, res) => {
            res.sendFile(path.join(__dirname, "../gui/index.html"));
        });
        this.app.get("/favicon.ico", (req, res) => {
            res.sendFile(path.join(process.cwd(), "../bdsx/icon/icon.png"));
        });
        this.app.use(this.config.path, this.express.static(path.join(__dirname, "../gui")));
        this.http.listen(this.getPanelPort());
        this.http.on("connection", (socket) => {
            let socketId = this.nextSocketId++;
            this.sockets[socketId] = socket;
            socket.on("close", () => {
                delete this.sockets[socketId];
            });
            socket.setTimeout(5000);
        });
        require("./socket");
        event_1.events.serverStop.on(() => {
            exports.panel.close();
        });
    }
    close() {
        data_1.serverData.status = 0;
        setTimeout(() => {
            this.http.close();
            for (let socketId in this.sockets) {
                this.sockets[socketId].destroy();
            }
        }, 3000).unref();
    }
    toastAll(message, type = "secondary", timeout = 3000) {
        this.io.emit(SocketEvents.Toast, message, type, timeout);
    }
}
exports.panel = new ServerPanel();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZCQUE4QjtBQUM5QixzQ0FBb0M7QUFDcEMsNERBQXlEO0FBQ3pELGlDQUFvQztBQUVwQyxJQUFZLFlBZ0NYO0FBaENELFdBQVksWUFBWTtJQUNwQixRQUFRO0lBQ1IsK0JBQWUsQ0FBQTtJQUNmLGlDQUFpQixDQUFBO0lBRWpCLE9BQU87SUFDUCxpREFBaUMsQ0FBQTtJQUNqQywyREFBMkMsQ0FBQTtJQUUzQyxNQUFNO0lBQ04sK0JBQWUsQ0FBQTtJQUVmLFFBQVE7SUFDUix1Q0FBdUIsQ0FBQTtJQUN2Qiw2Q0FBNkIsQ0FBQTtJQUU3QixpQkFBaUI7SUFDakIseUNBQXlCLENBQUE7SUFDekIsK0NBQStCLENBQUE7SUFFL0IsVUFBVTtJQUNWLCtEQUErQyxDQUFBO0lBQy9DLCtDQUErQixDQUFBO0lBQy9CLDZDQUE2QixDQUFBO0lBRTdCLE9BQU87SUFDUCxpRUFBaUQsQ0FBQTtJQUNqRCwrREFBK0MsQ0FBQTtJQUMvQyxpRkFBaUUsQ0FBQTtJQUNqRSx5Q0FBeUIsQ0FBQTtJQUN6QixxQ0FBcUIsQ0FBQTtJQUNyQiwrQ0FBK0IsQ0FBQTtBQUNuQyxDQUFDLEVBaENXLFlBQVksR0FBWixvQkFBWSxLQUFaLG9CQUFZLFFBZ0N2QjtBQUdELE1BQU0sV0FBVztJQUFqQjtRQUNhLFlBQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0IsUUFBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNyQixTQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUMsT0FBRSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsWUFBTyxHQUFRLEVBQUUsQ0FBQztRQUNs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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const https = require("https");
const os = require("os");
const Jimp = require("jimp");
var Utils;
(function (Utils) {
    Utils.players = new Map();
    const skins = new Map();
    function escapeUnsafeHTML(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
    Utils.escapeUnsafeHTML = escapeUnsafeHTML;
    function formatConsoleCodesToHTML(text) {
        return Utils.escapeUnsafeHTML(text).replace(/\u001b\[(\d)+m/g, m => {
            switch (m) {
                case "\u001b[22m":
                case "\u001b[23m":
                case "\u001b[24m":
                case "\u001b[27m":
                case "\u001b[28m":
                case "\u001b[29m":
                case "\u001b[39m":
                    return "</span>";
                case "\u001b[30m":
                    return `<span class="mc-0">`;
                case "\u001b[31m":
                    return `<span class="mc-4">`;
                case "\u001b[32m":
                    return `<span class="mc-2">`;
                case "\u001b[33m":
                    return `<span class="mc-6">`;
                case "\u001b[34m":
                    return `<span class="mc-1">`;
                case "\u001b[35m":
                    return `<span class="mc-5">`;
                case "\u001b[36m":
                    return `<span class="mc-3">`;
                case "\u001b[37m":
                    return `<span class="mc-7">`;
                case "\u001b[90m":
                    return `<span class="mc-8">`;
                case "\u001b[91m":
                    return `<span class="mc-c">`;
                case "\u001b[92m":
                    return `<span class="mc-a">`;
                case "\u001b[93m":
                    return `<span class="mc-e">`;
                case "\u001b[94m":
                    return `<span class="mc-9">`;
                case "\u001b[95m":
                    return `<span class="mc-d">`;
                case "\u001b[96m":
                    return `<span class="mc-b">`;
                case "\u001b[97m":
                    return `<span class="mc-f">`;
                case "\u001b[0m":
                    return `<span class="mc-r">`;
                case "\u001b[1m":
                    return `<span class="mc-l">`;
                // case "\u001b[2m":
                //     return lazy();
                case "\u001b[3m":
                    return `<span class="mc-o">`;
                case "\u001b[4m":
                    return `<span class="mc-n">`;
                // case "\u001b[7m":
                //     return lazy();
                case "\u001b[8m":
                    return `<span style="opacity: 0>`;
                case "\u001b[9m":
                    return `<span class="mc-m">`;
                default:
                    return "<span>";
            }
        });
    }
    Utils.formatConsoleCodesToHTML = formatConsoleCodesToHTML;
    ;
    function formatColorCodesToHTML(text) {
        let count = 0;
        const out = Utils.escapeUnsafeHTML(text).replace(/§./g, m => {
            count++;
            if (m[1] !== "r") {
                return `<span class="mc-${m[1]}">`;
            }
            return `${"</span>".repeat(count)}<span>`;
        });
        return `${out}${"</span>".repeat(count)}`;
    }
    Utils.formatColorCodesToHTML = formatColorCodesToHTML;
    ;
    function formatPluginName(name) {
        return name.replace(/^@.+\//, "").replace(/-/g, " ").replace(/\w\S*/g, m => m[0].toUpperCase() + m.substr(1).toLowerCase());
    }
    Utils.formatPluginName = formatPluginName;
    // from enum GameRuleId
    let GameRuleNames;
    (function (GameRuleNames) {
        GameRuleNames[GameRuleNames["Command Block Output"] = 0] = "Command Block Output";
        GameRuleNames[GameRuleNames["Do Daylight Cycle"] = 1] = "Do Daylight Cycle";
        GameRuleNames[GameRuleNames["Entities Drop Loot"] = 2] = "Entities Drop Loot";
        GameRuleNames[GameRuleNames["Fire Spreads"] = 3] = "Fire Spreads";
        GameRuleNames[GameRuleNames["Mob Loot"] = 4] = "Mob Loot";
        GameRuleNames[GameRuleNames["Mob Spawning"] = 5] = "Mob Spawning";
        GameRuleNames[GameRuleNames["Tile Drops"] = 6] = "Tile Drops";
        GameRuleNames[GameRuleNames["Weather Cycle"] = 7] = "Weather Cycle";
        GameRuleNames[GameRuleNames["Drowning Damage"] = 8] = "Drowning Damage";
        GameRuleNames[GameRuleNames["Fall Damage"] = 9] = "Fall Damage";
        GameRuleNames[GameRuleNames["Fire Damage"] = 10] = "Fire Damage";
        GameRuleNames[GameRuleNames["Keep Inventory"] = 11] = "Keep Inventory";
        GameRuleNames[GameRuleNames["Mob Griefing"] = 12] = "Mob Griefing";
        GameRuleNames[GameRuleNames["Friendly Fire"] = 13] = "Friendly Fire";
        GameRuleNames[GameRuleNames["Show Coordinates"] = 14] = "Show Coordinates";
        GameRuleNames[GameRuleNames["Natural Regeneration"] = 15] = "Natural Regeneration";
        GameRuleNames[GameRuleNames["TNT Explodes"] = 16] = "TNT Explodes";
        GameRuleNames[GameRuleNames["Send Command Feedback"] = 17] = "Send Command Feedback";
        GameRuleNames[GameRuleNames["Max Command Chain"] = 18] = "Max Command Chain";
        GameRuleNames[GameRuleNames["Insomnia"] = 19] = "Insomnia";
        GameRuleNames[GameRuleNames["Command Blocks Enabled"] = 20] = "Command Blocks Enabled";
        GameRuleNames[GameRuleNames["Random Tick Speed"] = 21] = "Random Tick Speed";
        GameRuleNames[GameRuleNames["Immediate Respawn"] = 22] = "Immediate Respawn";
        GameRuleNames[GameRuleNames["Show Death Messages"] = 23] = "Show Death Messages";
        GameRuleNames[GameRuleNames["Function Command Limit"] = 24] = "Function Command Limit";
        GameRuleNames[GameRuleNames["Spawn Radius"] = 25] = "Spawn Radius";
        GameRuleNames[GameRuleNames["Show Tags"] = 26] = "Show Tags";
        GameRuleNames[GameRuleNames["Freeze Damage"] = 27] = "Freeze Damage";
    })(GameRuleNames || (GameRuleNames = {}));
    function mapGameRuleName(id) {
        return GameRuleNames[id];
    }
    Utils.mapGameRuleName = mapGameRuleName;
    function parseProperties(properties) {
        let retval = {};
        for (let line of properties.replace(/#.+|\r/g, "").split("\n")) {
            if (line.match("=")) {
                retval[line.split("=")[0]] = line.split("=").splice(1).join("=");
            }
        }
        return retval;
    }
    Utils.parseProperties = parseProperties;
    ;
    function getAddress() {
        const nets = os.networkInterfaces();
        for (const name in nets) {
            const iface = nets[name];
            for (const alias of iface) {
                if (alias.family === "IPv4" && alias.address !== "127.0.0.1" && !alias.internal) {
                    return alias.address;
                }
            }
        }
        return null;
    }
    Utils.getAddress = getAddress;
    ;
    function broadcastPacket(pk) {
        for (const [uuid, ni] of Utils.players) {
            pk.sendTo(ni);
        }
        pk.dispose();
    }
    Utils.broadcastPacket = broadcastPacket;
    ;
    async function fetchPlugin(plugin) {
        return new Promise((resolve, reject) => {
            https.get(`https://registry.npmjs.org/${plugin}`, res => {
                let data = "";
                res.on("data", chunk => {
                    data += chunk;
                });
                res.on("end", () => {
                    try {
                        const json = JSON.parse(data);
                        if (json.error) {
                            resolve(null);
                        }
                        else {
                            resolve(json);
                        }
                    }
                    catch (_a) {
                        resolve(null);
                    }
                });
            });
        });
    }
    Utils.fetchPlugin = fetchPlugin;
    async function fetchAllPlugins() {
        return new Promise((resolve, reject) => {
            https.get("https://registry.npmjs.com/-/v1/search?text=@bdsx/", res => {
                let data = "";
                res.on("data", chunk => {
                    data += chunk;
                });
                res.on("end", () => {
                    try {
                        const json = JSON.parse(data);
                        if (json.error || json.total === 0) {
                            resolve(null);
                        }
                        else {
                            resolve(json.objects);
                        }
                    }
                    catch (_a) {
                        resolve(null);
                    }
                });
            });
        });
    }
    Utils.fetchAllPlugins = fetchAllPlugins;
    async function checkForPluginUpdates(plugin, version) {
        const json = await fetchPlugin(plugin);
        if (json === null) {
            return "not on npm";
        }
        const latest = json["dist-tags"].latest;
        if (version === latest) {
            return "up to date";
        }
        return latest;
    }
    Utils.checkForPluginUpdates = checkForPluginUpdates;
    async function readSkinBuffer(buffer, width, height, uv, size = [width, height]) {
        return new Promise((resolve, reject) => {
            new Jimp(width, height, (err, image) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                let offset = 0;
                const colors = new Array();
                for (let y = 0; y < height; y++) {
                    for (let x = 0; x < width; x++) {
                        const rgba = Jimp.rgbaToInt(buffer.readUInt8(offset), buffer.readUInt8(offset + 1), buffer.readUInt8(offset + 2), buffer.readUInt8(offset + 3), () => { });
                        colors.push(rgba);
                        offset += 4;
                        image.setPixelColor(rgba, x, y);
                    }
                }
                if (uv) {
                    image.crop(uv[0], uv[1], size[0], size[1]);
                }
                image.getBase64(Jimp.MIME_PNG, (err, base64Image) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    }
                    resolve(base64Image);
                });
            });
        });
    }
    Utils.readSkinBuffer = readSkinBuffer;
})(Utils = exports.Utils || (exports.Utils = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBZ0M7QUFDaEMseUJBQTBCO0FBQzFCLDZCQUE4QjtBQUk5QixJQUFpQixLQUFLLENBZ1FyQjtBQWhRRCxXQUFpQixLQUFLO0lBQ0wsYUFBTyxHQUFHLElBQUksR0FBRyxFQUE2QixDQUFDO0lBQzVELE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxFQUE2QixDQUFDO0lBRW5ELFNBQWdCLGdCQUFnQixDQUFDLE1BQWM7UUFDM0MsT0FBTyxNQUFNO2FBQ1IsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUM7YUFDdEIsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUM7YUFDckIsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUM7YUFDckIsT0FBTyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUM7YUFDdkIsT0FBTyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBUGUsc0JBQWdCLG1CQU8vQixDQUFBO0lBRUQsU0FBZ0Isd0JBQXdCLENBQUMsSUFBWTtRQUNqRCxPQUFPLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLEVBQUU7WUFDL0QsUUFBUSxDQUFDLEVBQUU7Z0JBQ1gsS0FBSyxZQUFZLENBQUM7Z0JBQ2xCLEtBQUssWUFBWSxDQUFDO2dCQUNsQixLQUFLLFlBQVksQ0FBQztnQkFDbEIsS0FBSyxZQUFZLENBQUM7Z0JBQ2xCLEtBQUssWUFBWSxDQUFDO2dCQUNsQixLQUFLLFlBQVksQ0FBQztnQkFDbEIsS0FBSyxZQUFZO29CQUNiLE9BQU8sU0FBUyxDQUFDO2dCQUNyQixLQUFLLFlBQVk7b0JBQ2IsT0FBTyxxQkFBcUIsQ0FBQztnQkFDakMsS0FBSyxZQUFZO29CQUNiLE9BQU8scUJBQXFCLENBQUM7Z0JBQ2pDLEtBQUssWUFBWTtvQkFDYixPQUFPLHFCQUFxQixDQUFDO2dCQUNqQyxLQUFLLFlBQVk7b0JBQ2IsT0FBTyxxQkFBcUIsQ0FBQztnQkFDakMsS0FBSyxZQUFZO29CQUNiLE9BQU8scUJBQXFCLENBQUM7Z0JBQ2pDLEtBQUssWUFBWTtvQkFDYixPQUFPLHFCQUFxQixDQUFDO2dCQUNqQyxLQUFLLFlBQVk7b0JBQ2IsT0FBTyxxQkFBcUIsQ0FBQztnQkFDakMsS0FBSyxZQUFZO29CQUNiLE9BQU8scUJBQXFCLENBQUM7Z0JBQ2pDLEtBQUssWUFBWTtvQkFDYixPQUFPLHFCQUFxQixDQUFDO2dCQUNqQyxLQUFLLFlBQVk7b0JBQ2IsT0FBTyxxQkFBcUIsQ0FBQztnQkFDakMsS0FBSyxZQUFZO29CQUNiLE9BQU8scUJBQXFCLENBQUM7Z0JBQ2pDLEtBQUssWUFBWTtvQkFDYixPQUFPLHFCQUFxQixDQUFDO2dCQUNqQyxLQUFLLFlBQVk7b0JBQ2IsT0FBTyxxQkFBcUIsQ0FBQztnQkFDakMsS0FBSyxZQUFZO29CQUNiLE9BQU8scUJBQXFCLENBQUM7Z0JBQ2pDLEtBQUssWUFBWTtvQkFDYixPQUFPLHFCQUFxQixDQUFDO2dCQUNqQyxLQUFLLFlBQVk7b0JBQ2IsT0FBTyxxQkFBcUIsQ0FBQztnQkFDakMsS0FBSyxXQUFXO29CQUNaLE9BQU8scUJBQXFCLENBQUM7Z0JBQ2pDLEtBQUssV0FBVztvQkFDWixPQUFPLHFCQUFxQixDQUFDO2dCQUNqQyxvQkFBb0I7Z0JBQ3BCLHFCQUFxQjtnQkFDckIsS0FBSyxXQUFXO29CQUNaLE9BQU8scUJBQXFCLENBQUM7Z0JBQ2pDLEtBQUssV0FBVztvQkFDWixPQUFPLHFCQUFxQixDQUFDO2dCQUNqQyxvQkFBb0I7Z0JBQ3BCLHFCQUFxQjtnQkFDckIsS0FBSyxXQUFXO29CQUNaLE9BQU8sMEJBQTBCLENBQUM7Z0JBQ3RDLEtBQUssV0FBVztvQkFDWixPQUFPLHFCQUFxQixDQUFDO2dCQUNqQztvQkFDSSxPQUFPLFFBQVEsQ0FBQzthQUNuQjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQS9EZSw4QkFBd0IsMkJBK0R2QyxDQUFBO0lBQUEsQ0FBQztJQUVGLFNBQWdCLHNCQUFzQixDQUFDLElBQVk7UUFDL0MsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUU7WUFDeEQsS0FBSyxFQUFFLENBQUM7WUFDUixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7Z0JBQ2QsT0FBTyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7YUFDdEM7WUFDRCxPQUFPLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7SUFDOUMsQ0FBQztJQVZlLDRCQUFzQix5QkFVckMsQ0FBQTtJQUFBLENBQUM7SUFFRixTQUFnQixnQkFBZ0IsQ0FBQyxJQUFZO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUNoSSxDQUFDO0lBRmUsc0JBQWdCLG1CQUUvQixDQUFBO0lBRUQsdUJBQXVCO0lBQ3ZCLElBQUssYUE2Qko7SUE3QkQsV0FBSyxhQUFhO1FBQ2QsaUZBQXNCLENBQUE7UUFDdEIsMkVBQW1CLENBQUE7UUFDbkIsNkVBQW9CLENBQUE7UUFDcEIsaUVBQWMsQ0FBQTtRQUNkLHlEQUFVLENBQUE7UUFDVixpRUFBYyxDQUFBO1FBQ2QsNkRBQVksQ0FBQTtRQUNaLG1FQUFlLENBQUE7UUFDZix1RUFBaUIsQ0FBQTtRQUNqQiwrREFBYSxDQUFBO1FBQ2IsZ0VBQWEsQ0FBQTtRQUNiLHNFQUFnQixDQUFBO1FBQ2hCLGtFQUFjLENBQUE7UUFDZCxvRUFBZSxDQUFBO1FBQ2YsMEVBQWtCLENBQUE7UUFDbEIsa0ZBQXNCLENBQUE7UUFDdEIsa0VBQWMsQ0FBQTtRQUNkLG9GQUF1QixDQUFBO1FBQ3ZCLDRFQUFtQixDQUFBO1FBQ25CLDBEQUFVLENBQUE7UUFDVixzRkFBd0IsQ0FBQTtRQUN4Qiw0RUFBbUIsQ0FBQTtRQUNuQiw0RUFBbUIsQ0FBQTtRQUNuQixnRkFBcUIsQ0FBQTtRQUNyQixzRkFBd0IsQ0FBQTtRQUN4QixrRUFBYyxDQUFBO1FBQ2QsNERBQVcsQ0FBQTtRQUNYLG9FQUFlLENBQUE7SUFDbkIsQ0FBQyxFQTdCSSxhQUFhLEtBQWIsYUFBYSxRQTZCakI7SUFJRCxTQUFnQixlQUFlLENBQUMsRUFBaUI7UUFDN0MsT0FBTyxhQUFhLENBQUMsRUFBWSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUZlLHFCQUFlLGtCQUU5QixDQUFBO0lBRUQsU0FBZ0IsZUFBZSxDQUFDLFVBQWtCO1FBQzlDLElBQUksTUFBTSxHQUE0QixFQUFFLENBQUM7UUFDekMsS0FBSyxJQUFJLElBQUksSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNwRTtTQUNKO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQVJlLHFCQUFlLGtCQVE5QixDQUFBO0lBQUEsQ0FBQztJQUVGLFNBQWdCLFVBQVU7UUFDdEIsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDcEMsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLEVBQUU7WUFDckIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pCLEtBQUssTUFBTSxLQUFLLElBQUksS0FBSyxFQUFFO2dCQUN2QixJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssV0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtvQkFDN0UsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDO2lCQUN4QjthQUNKO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBWGUsZ0JBQVUsYUFXekIsQ0FBQTtJQUFBLENBQUM7SUFFRixTQUFnQixlQUFlLENBQUMsRUFBVTtRQUN0QyxLQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUNwQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2pCO1FBQ0QsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFMZSxxQkFBZSxrQkFLOUIsQ0FBQTtJQUFBLENBQUM7SUFFSyxLQUFLLFVBQVUsV0FBVyxDQUFDLE1BQWM7UUFDNUMsT0FBTyxJQUFJLE9BQU8sQ0FBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN4QyxLQUFLLENBQUMsR0FBRyxDQUFDLDhCQUE4QixNQUFNLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFDcEQsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO2dCQUNkLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFFO29CQUNuQixJQUFJLElBQUksS0FBSyxDQUFDO2dCQUNsQixDQUFDLENBQUMsQ0FBQztnQkFDSCxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUU7b0JBQ2YsSUFBSTt3QkFDQSxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUM5QixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7NEJBQ1osT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3lCQUNqQjs2QkFBTTs0QkFDSCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7eUJBQ2pCO3FCQUNKO29CQUFDLFdBQU07d0JBQ0osT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUNqQjtnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBckJxQixpQkFBVyxjQXFCaEMsQ0FBQTtJQUVNLEtBQUssVUFBVSxlQUFlO1FBQ2pDLE9BQU8sSUFBSSxPQUFPLENBQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDeEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxvREFBb0QsRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFDbEUsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO2dCQUNkLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFFO29CQUNuQixJQUFJLElBQUksS0FBSyxDQUFDO2dCQUNsQixDQUFDLENBQUMsQ0FBQztnQkFDSCxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUU7b0JBQ2YsSUFBSTt3QkFDQSxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUM5QixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQUU7NEJBQ2hDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzt5QkFDakI7NkJBQU07NEJBQ0gsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzt5QkFDekI7cUJBQ0o7b0JBQUMsV0FBTTt3QkFDSixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ2pCO2dCQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFyQnFCLHFCQUFlLGtCQXFCcEMsQ0FBQTtJQUVNLEtBQUssVUFBVSxxQkFBcUIsQ0FBQyxNQUFjLEVBQUUsT0FBZTtRQUN2RSxNQUFNLElBQUksR0FBRyxNQUFNLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QyxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7WUFDZixPQUFPLFlBQVksQ0FBQztTQUN2QjtRQUNELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDeEMsSUFBSSxPQUFPLEtBQUssTUFBTSxFQUFFO1lBQ3BCLE9BQU8sWUFBWSxDQUFDO1NBQ3ZCO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQVZxQiwyQkFBcUIsd0JBVTFDLENBQUE7SUFFTSxLQUFLLFVBQVUsY0FBYyxDQUFDLE1BQWMsRUFBRSxLQUFhLEVBQUUsTUFBYyxFQUFFLEVBQXFCLEVBQUUsT0FBeUIsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDO1FBQy9JLE9BQU8sSUFBSSxPQUFPLENBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDM0MsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDbkMsSUFBSSxHQUFHLEVBQUU7b0JBQ0wsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDbkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNmO2dCQUNELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDZixNQUFNLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO2dCQUNuQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUM3QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUM1QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUN4QixNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFDNUIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQzVCLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUM1QixHQUFHLEVBQUUsR0FBRSxDQUFDLENBQ1gsQ0FBQzt3QkFDRixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNsQixNQUFNLElBQUksQ0FBQyxDQUFDO3dCQUNaLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDbkM7aUJBQ0o7Z0JBQ0QsSUFBSSxFQUFFLEVBQUU7b0JBQ0osS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDOUM7Z0JBQ0QsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLFdBQVcsRUFBRSxFQUFFO29CQUNoRCxJQUFJLEdBQUcsRUFBRTt3QkFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNuQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ2Y7b0JBQ0QsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUN6QixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBbkNxQixvQkFBYyxpQkFtQ25DLENBQUE7QUFDTCxDQUFDLEVBaFFnQixLQUFLLEdBQUwsYUFBSyxLQUFMLGFBQUssUUFnUXJCIn0=
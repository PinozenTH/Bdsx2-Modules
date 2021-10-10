"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const command_1 = require("bdsx/command");
const command_2 = require("bdsx/bds/command");
const nativetype_1 = require("bdsx/nativetype");
const index_1 = require("../../index");
const server_1 = require("bdsx/bds/server");
const event_1 = require("bdsx/event");
const packetids_1 = require("bdsx/bds/packetids");
const common_1 = require("bdsx/common");
const launcher_1 = require("bdsx/launcher");
const localfile = '../banlist.json';
class blockedPlayer {
}
let blackList = [];
if (!(0, fs_1.existsSync)(localfile))
    (0, fs_1.writeFileSync)(localfile, "[]", "utf8");
else {
    try {
        blackList = JSON.parse((0, fs_1.readFileSync)(localfile, "utf8"));
    }
    catch (err) {
        console.log('[Banlist] '.green + `ReadError\n${err}`);
    }
}
command_1.command.register("ban_", "Ban Cheaters&Rules Breakers!", command_2.CommandPermissionLevel.Operator).overload((p, o, out) => {
    if (o.isScriptCommandOrigin()) {
        console.error("SCRIPT CANNOT USE 'ban!' COMMAND!!!".red);
        return;
    }
    const sendMsg = (text, toAll) => {
        const actor = o.getEntity();
        if (toAll === true) {
            console.log('[Server: BAN] '.green + text);
            launcher_1.bedrockServer.executeCommand(`tellraw @a {"rawtext":[{"text":"§a[Server: BAN] §r${text}"}]}`);
        }
        else {
            if (o.isServerCommandOrigin())
                console.log('[Server: BAN] '.green + text);
            else if (actor !== null) {
                (0, index_1.sendText)(actor.getNetworkIdentifier(), text);
            }
        }
    };
    switch (p.option) {
        case undefined:
            sendMsg(`blackList options\n/ban_ add <playerName> [reason?:string] - Add player to banlist\n/ban_ list [page?:number] - List of players in BanList\n/ban_ remove <playerName> - Remove player from blacklist`);
            break;
        case "add":
            if (p.target === undefined) {
                sendMsg('§cNo target!');
                return;
            }
            const f = blackList.find((v) => v.Name === p.target);
            if (f !== undefined) {
                sendMsg(`§c${p.target} is already in BanList`);
                return;
            }
            const player = new blockedPlayer();
            player.Name = p.target;
            const pf = server_1.serverInstance.minecraft.getLevel().players.toArray().find((v) => v.getName() === p.target);
            if (pf !== undefined) {
                player.xuid = (0, index_1.XuidByName)(pf.getName());
            }
            if (p.reason !== undefined)
                player.reason = p.reason;
            blackList.push(player);
            let reason = '';
            if (p.reason !== undefined)
                reason = `\n§6REASON§f: ${p.reason}`;
            else
                sendMsg(`§a${p.target} is Banned!${reason}`, true);
            (0, fs_1.writeFileSync)(localfile, JSON.stringify(blackList, null, 4), "utf8");
            let targetId = (0, index_1.IdByName)(p.target);
            break;
        case "remove":
            if (p.target === undefined) {
                sendMsg('§cNo target!');
                return;
            }
            const fr = blackList.find((v) => v.Name === p.target);
            if (fr === undefined) {
                sendMsg(`§c${p.target} isn't in banList`);
                return;
            }
            blackList.splice(blackList.indexOf(fr), 1);
            (0, fs_1.writeFileSync)(localfile, JSON.stringify(blackList, null, 4), "utf8");
            sendMsg(`§a${p.target} is UnBanned!`);
            break;
        case "list":
            let page = 1;
            if (p.target !== undefined)
                page = Number(p.target);
            if (isNaN(page))
                page = 1;
            if (page < 1)
                page = 1;
            const listArr = [];
            blackList.forEach((v) => {
                let ip = "unknown";
                let xuid = "unknown";
                if (v.Ip !== undefined)
                    ip = v.Ip;
                if (v.xuid !== undefined)
                    xuid = v.xuid;
                listArr.push(`${v.Name} - IP: ${ip}, Xuid: ${xuid}`);
            });
            let maxPage = Math.ceil(listArr.length / 5);
            if (page > maxPage)
                page = maxPage;
            listArr.splice(0, 5 * (page - 1));
            sendMsg(`=== §6BanList §b${page}/${maxPage}Page §r===\n` + listArr.join('\n'));
            break;
        default:
            break;
    }
    return out.success();
}, {
    option: [nativetype_1.CxxString, true],
    target: [nativetype_1.CxxString, true],
    reason: [nativetype_1.CxxString, true]
});
event_1.events.packetAfter(packetids_1.MinecraftPacketIds.Login).on((pkt, target) => {
    const conq = pkt.connreq;
    if (conq === null)
        return;
    const cert = conq.cert;
    const playerName = cert.getId();
    const playerXuid = cert.getXuid();
    let f = blackList.find((v) => v.Name === playerName);
    let reason = '';
    if (f !== undefined) {
        if (f.xuid === undefined)
            f.xuid = playerXuid;
        (0, fs_1.writeFileSync)(localfile, JSON.stringify(blackList, null, 4), "utf8");
        if (f.reason !== undefined)
            reason = `\n§6REASON§f: ${f.reason}`;
        (0, index_1.Disconnect)(target, "§c§l[Server: BAN] YOU ARE BANNED!" + reason);
        return common_1.CANCEL;
    }
    else {
        f = blackList.find((v) => v.xuid === playerXuid);
        if (f !== undefined) {
            if (f.reason !== undefined)
                reason = `\n§6REASON§f: ${f.reason}`;
            (0, index_1.Disconnect)(target, "§c§l[Server: BAN] YOU ARE BANNED!" + reason);
            return common_1.CANCEL;
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxhY2tsaXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmxhY2tsaXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkJBQTZEO0FBQzdELDBDQUF1QztBQUN2Qyw4Q0FBMEQ7QUFDMUQsZ0RBQW9EO0FBQ3BELHVDQUF5RTtBQUN6RSw0Q0FBaUQ7QUFDakQsc0NBQW9DO0FBQ3BDLGtEQUF3RDtBQUN4RCx3Q0FBcUM7QUFDckMsNENBQThDO0FBRTlDLE1BQU0sU0FBUyxHQUFHLGlCQUFpQixDQUFDO0FBRXBDLE1BQU0sYUFBYTtDQUtsQjtBQUVELElBQUksU0FBUyxHQUFtQixFQUFFLENBQUM7QUFFbkMsSUFBSSxDQUFDLElBQUEsZUFBVSxFQUFDLFNBQVMsQ0FBQztJQUFFLElBQUEsa0JBQWEsRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQzlEO0lBQ0QsSUFBSTtRQUNBLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUEsaUJBQVksRUFBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztLQUMzRDtJQUFDLE9BQU0sR0FBRyxFQUFFO1FBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFDLGNBQWMsR0FBRyxFQUFFLENBQUMsQ0FBQztLQUN2RDtDQUNKO0FBRUQsaUJBQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLDhCQUE4QixFQUFFLGdDQUFzQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFDLEVBQUU7SUFDNUcsSUFBSSxDQUFDLENBQUMscUJBQXFCLEVBQUUsRUFBRTtRQUMzQixPQUFPLENBQUMsS0FBSyxDQUFDLHFDQUFxQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pELE9BQU87S0FDVjtJQUNELE1BQU0sT0FBTyxHQUFHLENBQUMsSUFBVyxFQUFFLEtBQWMsRUFBQyxFQUFF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
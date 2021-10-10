"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTextAll = exports.sendText = void 0;
const networkidentifier_1 = require("bdsx/bds/networkidentifier");
const packets_1 = require("bdsx/bds/packets");
const server_1 = require("../../../bdsx/bds/server");
const connection_1 = require("./connection");
/**
 * NAME or NETWORKIDENTIFIER
 *
 *Type Code :
 * Raw === 0,
 * Chat === 1,
 * Translation === 2,
 * Popup === 3,
 * Jukeboxpopup === 4,
 * Tip === 5,
 * system === 6,
 * Whisper === 7,
 * Announcement === 8,
 * Json === 9,
*/
function sendText(target, text, type) {
    let networkIdentifier;
    if (target instanceof networkidentifier_1.NetworkIdentifier)
        networkIdentifier = target;
    else {
        let id = (0, connection_1.IdByName)(target);
        if (id instanceof networkidentifier_1.NetworkIdentifier)
            networkIdentifier = id;
    }
    if (type === undefined || typeof type !== "number")
        type = 0;
    const Packet = packets_1.TextPacket.create();
    Packet.message = text;
    Packet.setUint32(type, 0x30);
    Packet.sendTo(networkIdentifier, 0);
    Packet.dispose();
}
exports.sendText = sendText;
function sendTextAll(text, type) {
    const level = server_1.serverInstance.minecraft.getLevel();
    if (level === undefined || level === null)
        return;
    level.players.toArray().forEach((v) => {
        sendText(v.getNetworkIdentifier(), text, type);
    });
}
exports.sendTextAll = sendTextAll;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsa0VBQStEO0FBQy9ELDhDQUE4QztBQUM5QyxxREFBMEQ7QUFDMUQsNkNBQXdDO0FBRXhDOzs7Ozs7Ozs7Ozs7OztFQWNFO0FBQ0YsU0FBZ0IsUUFBUSxDQUFDLE1BQWdDLEVBQUUsSUFBWSxFQUFFLElBQWE7SUFDbEYsSUFBSSxpQkFBbUMsQ0FBQztJQUN4QyxJQUFJLE1BQU0sWUFBWSxxQ0FBaUI7UUFBRSxpQkFBaUIsR0FBRyxNQUFNLENBQUM7U0FDL0Q7UUFDRCxJQUFJLEVBQUUsR0FBRyxJQUFBLHFCQUFRLEVBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUIsSUFBSSxFQUFFLFlBQVkscUNBQWlCO1lBQUUsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0tBQy9EO0lBQ0QsSUFBSyxJQUFJLEtBQUssU0FBUyxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVE7UUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQzlELE1BQU0sTUFBTSxHQUFHLG9CQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbkMsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDdEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxpQkFBa0IsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNyQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDckIsQ0FBQztBQWJELDRCQWFDO0FBRUQsU0FBZ0IsV0FBVyxDQUFDLElBQVksRUFBRSxJQUFhO0lBQ25ELE1BQU0sS0FBSyxHQUFHLHVCQUFjLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xELElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSTtRQUFFLE9BQU87SUFDbEQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRTtRQUNqQyxRQUFRLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25ELENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQU5ELGtDQU1DO0FBQUEsQ0FBQyJ9
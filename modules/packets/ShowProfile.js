"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showProfile = void 0;
const packets_1 = require("bdsx/bds/packets");
function showProfile(target, xuid) {
    const pkt = packets_1.ShowProfilePacket.create();
    pkt.setCxxString(xuid, 0x30);
    pkt.sendTo(target);
    pkt.dispose();
}
exports.showProfile = showProfile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hvd1Byb2ZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTaG93UHJvZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw4Q0FBcUQ7QUFFckQsU0FBZ0IsV0FBVyxDQUFDLE1BQXdCLEVBQUUsSUFBVztJQUM3RCxNQUFNLEdBQUcsR0FBRywyQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN2QyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3QixHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25CLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNsQixDQUFDO0FBTEQsa0NBS0MifQ==
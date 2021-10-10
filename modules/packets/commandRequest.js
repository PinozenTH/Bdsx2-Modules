"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.netCmd = void 0;
const packetids_1 = require("bdsx/bds/packetids");
const event_1 = require("bdsx/event");
const eventtarget_1 = require("bdsx/eventtarget");
const connection_1 = require("./connection");
event_1.events.packetBefore(packetids_1.MinecraftPacketIds.CommandRequest).on((pkt, target) => {
    let data = (0, connection_1.DataById)(target);
    let ev = {
        command: pkt.command,
        networkIdentifier: target,
        originActor: data[1],
        originEntity: data[2],
        originName: data[0],
        originXuid: data[3]
    };
    return exports.netCmd.fire(ev);
});
exports.netCmd = new eventtarget_1.Event();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZFJlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21tYW5kUmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxrREFBd0Q7QUFFeEQsc0NBQW9DO0FBQ3BDLGtEQUF5QztBQUN6Qyw2Q0FBd0M7QUFFeEMsY0FBTSxDQUFDLFlBQVksQ0FBQyw4QkFBa0IsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFDLEVBQUU7SUFDckUsSUFBSSxJQUFJLEdBQUcsSUFBQSxxQkFBUSxFQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVCLElBQUksRUFBRSxHQUFHO1FBQ0wsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPO1FBQ3BCLGlCQUFpQixFQUFFLE1BQU07UUFDekIsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDcEIsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDckIsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbkIsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDdEIsQ0FBQTtJQUNELE9BQU8sY0FBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUMzQixDQUFDLENBQUMsQ0FBQTtBQUVXLFFBQUEsTUFBTSxHQUFHLElBQUksbUJBQUssRUFBOEosQ0FBQyJ9
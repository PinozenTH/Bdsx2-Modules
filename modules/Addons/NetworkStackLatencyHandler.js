"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkStackLatencyHandler = void 0;
const Wrappers_1 = require("./Wrappers");
class NetworkStackLatencyHandler {
    constructor(data) {
        this.data = data;
        this.list = new Map();
        this.sandwhichReceived = new Map();
        this.currentTimestamp = 0;
    }
    /**
     * @param ptr
     * @param callable
     * Uses the "sandwich method" to account for an edge-case where the NetworkStackLatency packet
     * and the target packet are received (and processed) in different client ticks.
     * The order:
     * ============
     * Original packet (already sending)
     * NetworkStackLatencyPacket (to send)
     * Original packet CLONE (to send)
     * NetworkStackLatencyPacket v2 (to send)
     * ============
     * If the player has a decent connection, both the original packet and the original packet clone
     * will be received on the same client tick and therefore no difference would be made.
     */
    sandwich(ptr, callable) {
        this.data.esotericPackets = 3;
        var timestamp = this.increment();
        this.list.set(timestamp, callable);
        this.sandwhichReceived.set(timestamp, 0);
        var var1 = Wrappers_1.NetworkStackLatencyWrapper.create();
        var1.timestamp = timestamp;
        var1.needsResponse = true;
        var1.sendTo(this.data.identifier);
        var1.dispose();
        ptr.sendTo(this.data.identifier);
        var var2 = Wrappers_1.NetworkStackLatencyWrapper.create();
        var2.timestamp = timestamp;
        var2.needsResponse = true;
        var2.sendTo(this.data.identifier);
        var2.dispose();
    }
    send(callable) {
        var timestamp1 = this.increment();
        this.list.set(timestamp1, callable);
        var var1 = Wrappers_1.NetworkStackLatencyWrapper.create();
        var1.timestamp = timestamp1;
        var1.needsResponse = true;
        var1.sendTo(this.data.identifier);
        var1.dispose();
    }
    handle(timestamp) {
        var current = this.sandwhichReceived.get(timestamp);
        if (current !== undefined) {
            if (current + 1 === 2) { // TODO: Find out why 3 packets are sent to the client - there should only be 2.
                var callable = this.list.get(timestamp);
                if (callable !== undefined) {
                    callable();
                }
                this.list.delete(timestamp);
                this.sandwhichReceived.delete(timestamp);
            }
            else {
                this.sandwhichReceived.set(timestamp, current + 1);
            }
        }
        else {
            var callable = this.list.get(timestamp);
            if (callable !== undefined) {
                callable();
            }
            this.list.delete(timestamp);
        }
    }
    increment() {
        this.currentTimestamp += 1000;
        if (this.currentTimestamp % 1000000 === 0) {
            this.currentTimestamp = 1000;
        }
        return this.currentTimestamp;
    }
}
exports.NetworkStackLatencyHandler = NetworkStackLatencyHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmV0d29ya1N0YWNrTGF0ZW5jeUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJOZXR3b3JrU3RhY2tMYXRlbmN5SGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSx5Q0FBd0Q7QUFFeEQsTUFBYSwwQkFBMEI7SUFFbkMsWUFDVyxJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBR3BCLFNBQUksR0FBNEIsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUMxQyxzQkFBaUIsR0FBd0IsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNuRCxxQkFBZ0IsR0FBVyxDQUFDLENBQUM7SUFKbEMsQ0FBQztJQU1IOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0ksUUFBUSxDQUFDLEdBQVcsRUFBRSxRQUFvQjtRQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFDOUIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUV6QyxJQUFJLElBQUksR0FBRyxxQ0FBMEIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMvQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRWYsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRWpDLElBQUksSUFBSSxHQUFHLHFDQUEwQixDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQy9DLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVNLElBQUksQ0FBQyxRQUFvQjtRQUM1QixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3BDLElBQUksSUFBSSxHQUFHLHFDQUEwQixDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQy9DLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO1FBQzVCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxTQUFpQjtRQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BELElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtZQUN2QixJQUFJLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsZ0ZBQWdGO2dCQUNyRyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO29CQUN4QixRQUFRLEVBQUUsQ0FBQztpQkFDZDtnQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUM1QztpQkFBTTtnQkFDSCxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDdEQ7U0FDSjthQUFNO1lBQ0gsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDeEMsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO2dCQUN4QixRQUFRLEVBQUUsQ0FBQzthQUNkO1lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDL0I7SUFDTCxDQUFDO0lBRU0sU0FBUztRQUNaLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUM7UUFDOUIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxLQUFLLENBQUMsRUFBRTtZQUN2QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1NBQ2hDO1FBQ0QsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDakMsQ0FBQztDQUVKO0FBdEZELGdFQXNGQyJ9
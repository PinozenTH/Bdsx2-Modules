"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerData = void 0;
const Vector3_1 = require("./Vector3");
const packets_1 = require("bdsx/bds/packets");
const InboundProcessor_1 = require("./InboundProcessor");
const NetworkStackLatencyHandler_1 = require("./NetworkStackLatencyHandler");
const OutboundProcessor_1 = require("./OutboundProcessor");
class PlayerData {
    constructor(identifier) {
        this.identifier = identifier;
        this.loggedIn = false;
        this.isClosed = false;
        this.currentTick = 0;
        this.currentPosition = new Vector3_1.Vector3();
        this.lastPosition = new Vector3_1.Vector3();
        this.currentMovement = new Vector3_1.Vector3();
        this.lastMovement = new Vector3_1.Vector3();
        this.currentYaw = 0;
        this.lastYaw = 0;
        this.currentPitch = 0;
        this.lastPitch = 0;
        this.currentYawDelta = 0;
        this.lastYawDelta = 0;
        this.currentPitchDelta = 0;
        this.lastPitchDelta = 0;
        this.knownChunks = [];
        this.inLoadedChunk = false;
        this.currentMotion = new Vector3_1.Vector3();
        this.ticksSinceMotion = 0;
        this.inboundExecutor = new InboundProcessor_1.InboundExecutor(this);
        this.outboundExecutor = new OutboundProcessor_1.OutboundExecutor(this);
        this.networkStackLatencyHandler = new NetworkStackLatencyHandler_1.NetworkStackLatencyHandler(this);
        this.entityRuntimeId = -1;
        this.esotericPackets = 0;
    }
    tick() {
        this.currentTick++;
        this.ticksSinceMotion++;
    }
    sendMessage(message) {
        var packet = packets_1.TextPacket.create();
        packet.message = message;
        packet.sendTo(this.identifier);
        packet.dispose();
    }
    getRegion() {
        return this.actor.getRegion();
    }
}
exports.PlayerData = PlayerData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxheWVyRGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlBsYXllckRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdUNBQW9DO0FBR3BDLDhDQUE4QztBQUM5Qyx5REFBcUQ7QUFDckQsNkVBQTBFO0FBQzFFLDJEQUF1RDtBQUl2RCxNQUFhLFVBQVU7SUFvQ25CLFlBQ1csVUFBNkI7UUFBN0IsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7UUFsQ2pDLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUV4QixvQkFBZSxHQUFZLElBQUksaUJBQU8sRUFBRSxDQUFDO1FBQ3pDLGlCQUFZLEdBQVksSUFBSSxpQkFBTyxFQUFFLENBQUM7UUFDdEMsb0JBQWUsR0FBWSxJQUFJLGlCQUFPLEVBQUUsQ0FBQztRQUN6QyxpQkFBWSxHQUFZLElBQUksaUJBQU8sRUFBRSxDQUFDO1FBRXRDLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFDdkIsWUFBTyxHQUFXLENBQUMsQ0FBQztRQUNwQixpQkFBWSxHQUFXLENBQUMsQ0FBQztRQUN6QixjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQ3RCLG9CQUFlLEdBQVcsQ0FBQyxDQUFDO1FBQzVCLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLHNCQUFpQixHQUFXLENBQUMsQ0FBQztRQUM5QixtQkFBYyxHQUFXLENBQUMsQ0FBQztRQUUzQixnQkFBVyxHQUFrQixFQUFFLENBQUM7UUFDaEMsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFFL0Isa0JBQWEsR0FBWSxJQUFJLGlCQUFPLEVBQUUsQ0FBQztRQUN2QyxxQkFBZ0IsR0FBVyxDQUFDLENBQUM7UUFFN0Isb0JBQWUsR0FBb0IsSUFBSSxrQ0FBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdELHFCQUFnQixHQUFxQixJQUFJLG9DQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hFLCtCQUEwQixHQUErQixJQUFJLHVEQUEwQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTlGLG9CQUFlLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFHN0Isb0JBQWUsR0FBVyxDQUFDLENBQUM7SUFJakMsQ0FBQztJQUVJLElBQUk7UUFDUCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVNLFdBQVcsQ0FBQyxPQUFlO1FBQzlCLElBQUksTUFBTSxHQUFHLG9CQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDakMsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDekIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0IsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxTQUFTO1FBQ1osT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2xDLENBQUM7Q0FFSjtBQXhERCxnQ0F3REMifQ==
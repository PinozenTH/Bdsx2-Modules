"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InboundExecutor = void 0;
const Vector3_1 = require("./Vector3");
const packets_1 = require("bdsx/bds/packets");
const Wrappers_1 = require("./Wrappers");
const LevelUtils_1 = require("./LevelUtils");
class InboundExecutor {
    constructor(data) {
        this.data = data;
    }
    execute(ptr) {
        if (ptr instanceof packets_1.PlayerAuthInputPacket) {
            if (!this.data.loggedIn) {
                return;
            }
            var location = new Vector3_1.Vector3(ptr.pos.x, ptr.pos.y - 1.62, ptr.pos.z);
            var chunkHash = LevelUtils_1.LevelUtils.chunkHash(location.x >> 4, location.z >> 4);
            this.data.inLoadedChunk = this.data.knownChunks[chunkHash] !== undefined;
            this.data.lastPosition = this.data.currentPosition.clone();
            this.data.currentPosition = location;
            this.data.lastMovement = this.data.currentMovement.clone();
            this.data.currentMovement = this.data.currentPosition.clone().subtractVector(this.data.lastPosition);
            this.data.lastYaw = this.data.currentYaw;
            this.data.currentYaw = ptr.yaw;
            this.data.lastPitch = this.data.currentPitch;
            this.data.currentPitch = ptr.pitch;
            this.data.tick();
        }
        else if (ptr instanceof Wrappers_1.SetLocalPlayerAsInitializedWrapper) {
            this.data.loggedIn = true;
            this.data.entityRuntimeId = ptr.entityRuntimeId;
            var actor = this.data.identifier.getActor();
            if (actor !== null) {
                this.data.actor = actor;
            }
        }
        else if (ptr instanceof Wrappers_1.NetworkStackLatencyWrapper) {
            this.data.networkStackLatencyHandler.handle(ptr.timestamp);
        }
    }
}
exports.InboundExecutor = InboundExecutor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5ib3VuZFByb2Nlc3Nvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkluYm91bmRQcm9jZXNzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdUNBQW9DO0FBRXBDLDhDQUE0RjtBQUU1Rix5Q0FBNEY7QUFDNUYsNkNBQTBDO0FBRTFDLE1BQWEsZUFBZTtJQUV4QixZQUNXLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7SUFDeEIsQ0FBQztJQUVHLE9BQU8sQ0FBQyxHQUFXO1FBQ3RCLElBQUksR0FBRyxZQUFZLCtCQUFxQixFQUFFO1lBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDckIsT0FBTzthQUNWO1lBQ0QsSUFBSSxRQUFRLEdBQUcsSUFBSSxpQkFBTyxDQUN0QixHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDVCxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQ2hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUNaLENBQUM7WUFFRixJQUFJLFNBQVMsR0FBRyx1QkFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3ZFLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLFNBQVMsQ0FBQztZQUV6RSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUMzRCxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUM7WUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDM0QsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFckcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBRW5DLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDcEI7YUFBTSxJQUFJLEdBQUcsWUFBWSw2Q0FBa0MsRUFBRTtZQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQztZQUNoRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUM1QyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzthQUMzQjtTQUNKO2FBQU0sSUFBSSxHQUFHLFlBQVkscUNBQTBCLEVBQUU7WUFDbEQsSUFBSSxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzlEO0lBQ0wsQ0FBQztDQUVKO0FBM0NELDBDQTJDQyJ9
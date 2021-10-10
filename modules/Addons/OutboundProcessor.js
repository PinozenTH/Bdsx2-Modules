"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutboundExecutor = void 0;
const packets_1 = require("bdsx/bds/packets");
const LevelUtils_1 = require("./LevelUtils");
const Vector3_1 = require("./Vector3");
const Wrappers_1 = require("./Wrappers");
class OutboundExecutor {
    constructor(data) {
        this.data = data;
    }
    execute(ptr) {
        if (ptr instanceof Wrappers_1.SetActorMotionWrapper) {
            if (ptr.entityRuntimeId === this.data.entityRuntimeId) {
                this.data.networkStackLatencyHandler.sandwich(this.data.lastSentPacket, () => {
                    this.data.currentMotion = new Vector3_1.Vector3(ptr.motion.x, ptr.motion.y, ptr.motion.z);
                    this.data.ticksSinceMotion = 0;
                });
            }
        }
        else if (ptr instanceof Wrappers_1.LevelChunkWrapper) {
            this.data.networkStackLatencyHandler.sandwich(this.data.lastSentPacket, () => {
                var hash = LevelUtils_1.LevelUtils.chunkHash(ptr.chunkX, ptr.chunkZ);
                this.data.knownChunks[hash] = hash;
            });
        }
        else if (ptr instanceof packets_1.ChangeDimensionPacket) {
            this.data.knownChunks = [];
        }
    }
}
exports.OutboundExecutor = OutboundExecutor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3V0Ym91bmRQcm9jZXNzb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJPdXRib3VuZFByb2Nlc3Nvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw4Q0FBeUQ7QUFFekQsNkNBQTBDO0FBQzFDLHVDQUFvQztBQUNwQyx5Q0FBc0U7QUFFdEUsTUFBYSxnQkFBZ0I7SUFFekIsWUFDVyxJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO0lBQ3hCLENBQUM7SUFFRyxPQUFPLENBQUMsR0FBVztRQUN0QixJQUFJLEdBQUcsWUFBWSxnQ0FBcUIsRUFBRTtZQUN0QyxJQUFJLEdBQUcsQ0FBQyxlQUFlLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ25ELElBQUksQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEdBQUcsRUFBRTtvQkFDekUsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxpQkFBTyxDQUNqQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFDWixHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFDWixHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FDZixDQUFDO29CQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQyxDQUFDLENBQUMsQ0FBQzthQUNOO1NBQ0o7YUFBTSxJQUFJLEdBQUcsWUFBWSw0QkFBaUIsRUFBRTtZQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUU7Z0JBQ3pFLElBQUksSUFBSSxHQUFHLHVCQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN4RCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDdkMsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUFNLElBQUksR0FBRyxZQUFZLCtCQUFxQixFQUFFO1lBQzdDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztTQUM5QjtJQUNMLENBQUM7Q0FFSjtBQTVCRCw0Q0E0QkMifQ==
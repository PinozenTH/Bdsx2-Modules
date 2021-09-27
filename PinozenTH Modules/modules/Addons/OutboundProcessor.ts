import { Packet } from "bdsx/bds/packet";
import { ChangeDimensionPacket } from "bdsx/bds/packets";
import { PlayerData } from "./PlayerData";
import { LevelUtils } from "./LevelUtils";
import { Vector3 } from "./Vector3";
import { LevelChunkWrapper, SetActorMotionWrapper } from "./Wrappers";

export class OutboundExecutor {

    constructor(
        public data: PlayerData
    ) {}

    public execute(ptr: Packet) {
        if (ptr instanceof SetActorMotionWrapper) {
            if (ptr.entityRuntimeId === this.data.entityRuntimeId) {
                this.data.networkStackLatencyHandler.sandwich(this.data.lastSentPacket, () => {
                    this.data.currentMotion = new Vector3(
                        ptr.motion.x,
                        ptr.motion.y,
                        ptr.motion.z
                    );
                    this.data.ticksSinceMotion = 0;
                });
            }
        } else if (ptr instanceof LevelChunkWrapper) {
            this.data.networkStackLatencyHandler.sandwich(this.data.lastSentPacket, () => {
                var hash = LevelUtils.chunkHash(ptr.chunkX, ptr.chunkZ);
                this.data.knownChunks[hash] = hash;
            });
        } else if (ptr instanceof ChangeDimensionPacket) {
            this.data.knownChunks = [];
        }
    }

}
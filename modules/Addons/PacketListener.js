"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketListener = void 0;
const blockpos_1 = require("bdsx/bds/blockpos");
const packetids_1 = require("bdsx/bds/packetids");
const event_1 = require("bdsx/event");
const __1 = require("../..");
const DataStorage_1 = require("./DataStorage");
const Wrappers_1 = require("./Wrappers");
let inboundWrapper = null;
let outboundWrapper = null;
let target = null;
const inboundPacketHandleCallable = (ptr, identifier) => {
    var data = DataStorage_1.DataStorage.INSTANCE.get(identifier);
    if (data === null) {
        (0, __1.log)("Data not found for " + identifier + " - creating...");
        data = DataStorage_1.DataStorage.INSTANCE.add(identifier);
    }
    if (inboundWrapper === null) {
        data.inboundExecutor.execute(ptr);
    }
    else {
        data.inboundExecutor.execute(inboundWrapper);
    }
    inboundWrapper = null;
    // TODO: Checks
};
const outboundPacketHandleCallable = (identifier) => {
    var data = DataStorage_1.DataStorage.INSTANCE.get(identifier);
    if (data === null) {
        (0, __1.log)("Data not found for " + identifier + " - creating...");
        data = DataStorage_1.DataStorage.INSTANCE.add(identifier);
    }
    if (outboundWrapper !== null && data.esotericPackets <= 0) {
        data.outboundExecutor.execute(outboundWrapper);
    }
    data.esotericPackets--;
};
class PacketListener {
    static init() {
        for (var i = 1; i <= 255; i++) {
            event_1.events.packetAfter(i).on((ptr, identifier) => {
                inboundPacketHandleCallable(ptr, identifier);
            });
            event_1.events.packetSend(i).on((ptr, identifier) => {
                outboundWrapper = ptr;
                target = identifier;
                var data = DataStorage_1.DataStorage.INSTANCE.get(identifier);
                if (data !== null) {
                    data.lastSentPacket = ptr;
                }
            });
        }
        // For custom packet wrappers - packets that aren't implemented into BDSX
        event_1.events.packetRaw(packetids_1.MinecraftPacketIds.InventoryTransaction).on((ptr, size) => {
            ptr.move(1); // ignore packet ID, we already know what it is
            var wrapper = new Wrappers_1.InventoryTransactionWrapper();
            wrapper.requestId = ptr.readVarInt();
            if (wrapper.requestId !== 0) {
                for (var i = 0; i < ptr.readVarUint(); i++) {
                    wrapper.requestedChangedSlots.push(Wrappers_1.InventoryTransactionChangeSlot.read(ptr));
                }
            }
            var transactionType = ptr.readVarUint();
            switch (transactionType) {
                // TODO: Transaction data. This is going to be a pain in the ass
            }
            inboundWrapper = wrapper;
        });
        event_1.events.packetRaw(packetids_1.MinecraftPacketIds.SetLocalPlayerAsInitialized).on((ptr, size) => {
            ptr.move(1); // ignore packet ID, we already know what it is
            var wrapper = new Wrappers_1.SetLocalPlayerAsInitializedWrapper();
            wrapper.entityRuntimeId = ptr.readVarUint();
            inboundWrapper = wrapper;
        });
        event_1.events.packetSendRaw(packetids_1.MinecraftPacketIds.SetActorMotion).on((ptr, size) => {
            ptr.move(1); // ignore packet ID, we already know what it is
            var wrapper = new Wrappers_1.SetActorMotionWrapper();
            wrapper.entityRuntimeId = ptr.readVarUint();
            wrapper.motion = blockpos_1.Vec3.create(ptr.readFloat32(), ptr.readFloat32(), ptr.readFloat32());
            outboundWrapper = wrapper;
        });
        event_1.events.packetSendRaw(packetids_1.MinecraftPacketIds.LevelChunk).on((ptr, size) => {
            ptr.move(1); // ignore packet ID, we already know what it is
            var wrapper = new Wrappers_1.LevelChunkWrapper();
            wrapper.chunkX = ptr.readVarInt();
            wrapper.chunkZ = ptr.readVarInt();
            outboundWrapper = wrapper;
        });
        // Order: packetSend -> packetSendRaw
        for (i = 1; i <= 255; i++) {
            event_1.events.packetSendRaw(i).on((ptr, size) => {
                if (target !== null) {
                    outboundPacketHandleCallable(target);
                }
                target = null;
            });
        }
        event_1.events.networkDisconnected.on((identifier) => {
            var data = DataStorage_1.DataStorage.INSTANCE.get(identifier);
            if (data !== null) {
                data.isClosed = true;
            }
        });
    }
}
exports.PacketListener = PacketListener;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFja2V0TGlzdGVuZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJQYWNrZXRMaXN0ZW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxnREFBeUM7QUFHekMsa0RBQXdEO0FBRXhELHNDQUFvQztBQUNwQyw2QkFBNEI7QUFDNUIsK0NBQTRDO0FBQzVDLHlDQUF1SztBQUV2SyxJQUFJLGNBQWMsR0FBZ0IsSUFBSSxDQUFDO0FBQ3ZDLElBQUksZUFBZSxHQUFnQixJQUFJLENBQUM7QUFFeEMsSUFBSSxNQUFNLEdBQTJCLElBQUksQ0FBQztBQUUxQyxNQUFNLDJCQUEyQixHQUFHLENBQUMsR0FBVyxFQUFFLFVBQTZCLEVBQUUsRUFBRTtJQUMvRSxJQUFJLElBQUksR0FBRyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEQsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO1FBQ2YsSUFBQSxPQUFHLEVBQUMscUJBQXFCLEdBQUcsVUFBVSxHQUFHLGdCQUFnQixDQUFDLENBQUM7UUFDM0QsSUFBSSxHQUFHLHlCQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUMvQztJQUNELElBQUksY0FBYyxLQUFLLElBQUksRUFBRTtRQUN6QixJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNyQztTQUFNO1FBQ0gsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7S0FDaEQ7SUFDRCxjQUFjLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLGVBQWU7QUFDbkIsQ0FBQyxDQUFDO0FBRUYsTUFBTSw0QkFBNEIsR0FBRyxDQUFDLFVBQTZCLEVBQUUsRUFBRTtJQUNuRSxJQUFJLElBQUksR0FBRyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEQsSUFBSSxJQUFJLEtBQUssSUFB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
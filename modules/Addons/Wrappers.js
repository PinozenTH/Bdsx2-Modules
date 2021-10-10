"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchPID = exports.LevelChunkWrapper = exports.NetworkStackLatencyWrapper = exports.SetLocalPlayerAsInitializedWrapper = exports.SetActorMotionWrapper = exports.BatchPacket = exports.NetworkInventoryAction = exports.TransactionData = exports.InventoryTransactionChangeSlot = exports.InventoryTransactionWrapper = void 0;
const tslib_1 = require("tslib");
const packet_1 = require("bdsx/bds/packet");
const core_1 = require("bdsx/core");
const nativetype_1 = require("bdsx/nativetype");
const util_1 = require("util");
const raw_1 = require("zlibt2/raw");
const rawpacket_1 = require("bdsx/rawpacket");
const nativeclass_1 = require("bdsx/nativeclass");
class InventoryTransactionWrapper extends packet_1.Packet {
    constructor() {
        super(...arguments);
        // The requested changed slots in the packet - this will only be filled
        // when the RequestID is not 0
        this.requestedChangedSlots = [];
    }
}
exports.InventoryTransactionWrapper = InventoryTransactionWrapper;
class InventoryTransactionChangeSlot {
    constructor(containerId, changedSlotIndexes) {
        this.containerId = containerId;
        this.changedSlotIndexes = changedSlotIndexes;
    }
    static read(ptr) {
        var containerId = ptr.readUint8();
        var changedSlots = [];
        for (var i = 0; i < ptr.readVarUint(); i++) {
            changedSlots.push(ptr.readUint8());
        }
        return new InventoryTransactionChangeSlot(containerId, changedSlots);
    }
}
exports.InventoryTransactionChangeSlot = InventoryTransactionChangeSlot;
class TransactionData {
    decode(ptr) {
        var actionCount = ptr.readVarUint();
        for (var i = 0; i < actionCount; ++i) {
            // TODO: Network inventory actions
        }
        this.decodeData();
    }
}
exports.TransactionData = TransactionData;
class NetworkInventoryAction {
    constructor(sourceType, windowId, sourceFlags) {
        this.sourceType = sourceType;
        this.windowId = windowId;
        this.sourceFlags = sourceFlags;
    }
}
exports.NetworkInventoryAction = NetworkInventoryAction;
class BatchPacket extends core_1.NativePointer {
    constructor() {
        super(...arguments);
        this.packets = [];
    }
    addPacket(buffer) {
        this.packets.push(buffer);
    }
    removePacket(buffer) {
        for (var key in this.packets) {
            if (this.packets[key] === buffer) {
                delete this.packets[key];
                break;
            }
        }
    }
    clear() {
        this.packets = [];
    }
    encode() {
        this.writeUint8(exports.BatchPID);
        var raw = "";
        for (var buffer of this.packets) {
            this.writeVarUint(buffer.length);
            raw = raw + this.readVarUint() + buffer;
        }
        var encoded = (new util_1.TextEncoder()).encode(raw);
        var zlibEncoder = new raw_1.RawDeflate(encoded);
        var zlibEncoded = zlibEncoder.compress();
        var packet = new rawpacket_1.RawPacket();
        packet.writeUint8(exports.BatchPID);
        packet.write(zlibEncoded);
        return packet;
    }
}
exports.BatchPacket = BatchPacket;
class SetActorMotionWrapper extends packet_1.Packet {
}
exports.SetActorMotionWrapper = SetActorMotionWrapper;
class SetLocalPlayerAsInitializedWrapper extends packet_1.Packet {
}
exports.SetLocalPlayerAsInitializedWrapper = SetLocalPlayerAsInitializedWrapper;
let NetworkStackLatencyWrapper = class NetworkStackLatencyWrapper extends packet_1.Packet {
};
(0, tslib_1.__decorate)([
    (0, nativeclass_1.nativeField)(nativetype_1.int64_as_float_t)
], NetworkStackLatencyWrapper.prototype, "timestamp", void 0);
(0, tslib_1.__decorate)([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], NetworkStackLatencyWrapper.prototype, "needsResponse", void 0);
NetworkStackLatencyWrapper = (0, tslib_1.__decorate)([
    (0, nativeclass_1.nativeClass)(null)
], NetworkStackLatencyWrapper);
exports.NetworkStackLatencyWrapper = NetworkStackLatencyWrapper;
class LevelChunkWrapper extends packet_1.Packet {
}
exports.LevelChunkWrapper = LevelChunkWrapper;
exports.BatchPID = 0xfe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV3JhcHBlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJXcmFwcGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsNENBQXlDO0FBR3pDLG9DQUEwQztBQUMxQyxnREFBNkU7QUFFN0UsK0JBQW1DO0FBR25DLG9DQUFvRDtBQUNwRCw4Q0FBMkM7QUFFM0Msa0RBQTREO0FBRTVELE1BQWEsMkJBQTRCLFNBQVEsZUFBTTtJQUF2RDs7UUFJSSx1RUFBdUU7UUFDdkUsOEJBQThCO1FBQzlCLDBCQUFxQixHQUEwQyxFQUFFLENBQUM7SUFDdEUsQ0FBQztDQUFBO0FBUEQsa0VBT0M7QUFFRCxNQUFhLDhCQUE4QjtJQUV2QyxZQUNXLFdBQW1CLEVBQ25CLGtCQUFpQztRQURqQyxnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUNuQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQWU7SUFDMUMsQ0FBQztJQUVJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBa0I7UUFDakMsSUFBSSxXQUFXLEdBQUcsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2xDLElBQUksWUFBWSxHQUFZLEVBQUUsQ0FBQztRQUMvQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7U0FDdEM7UUFDRCxPQUFPLElBQUksOEJBQThCLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ3pFLENBQUM7Q0FFSjtBQWhCRCx3RUFnQkM7QUFFRCxNQUFzQixlQUFlO0lBRTFCLE1BQU0sQ0FBQyxHQUFrQjtRQUM1QixJQUFJLFdBQVcsR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsRUFB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
// Made by SacriPudding :)

import { NbtTag, readPacketNbt } from "./NbtParser";
import { Vec3 } from "bdsx/bds/blockpos";
import { NativePointer } from "bdsx/native";
import { PacketBuffer } from "./PacketBuffer"
import { isFile } from "bdsx/util";
import { writeFileSync, readFileSync } from "fs";
import request from "sync-request";

let itemMap: any = {};

if (!isFile("../item_netid.json")) {
    let htmlRequest = request("GET", "https://raw.githubusercontent.com/CloudburstMC/Nukkit/master/src/main/resources/runtime_item_ids.json");
    itemMap = JSON.parse(htmlRequest.getBody().toString());
    writeFileSync("../item_netid.json", JSON.stringify(itemMap));
} else {
    itemMap = JSON.parse(readFileSync("../item_netid.json", "utf8"));
}

export function parseTransaction(ptr: NativePointer, size: number): InventoryTransactionInfo {
    let iTP = new InventoryTransactionInfo;
    iTP.readPacket(ptr, size);
    return iTP;
}

export abstract class TransactionType {
    abstract transactionId: number; // ID of this transaction, set automatically
    abstract actionType: number; // Type of the action done (means something different depending on type)
    abstract hotbarSlot: number; // slot that the used item was in
    abstract item: TransactionItem = new TransactionItem; // Info on the item itself

    abstract readTransaction(buffer: PacketBuffer): void;
}

export class UseItemTransaction extends TransactionType {
    transactionId: number = 2;
    actionType: number; // Type of the action done (Can use this for figuring out which type this instance is of)
    blockPos: Vec3 = new Vec3(true); // block position (blocked clicked, not placed)
    face: number; // side the block was clicked on
    hotbarSlot: number; // Slot used
    item: TransactionItem = new TransactionItem; // Item that was used (custom type because NativeType not configurable enough)
    playerPos: Vec3 = new Vec3(true); // player position when block was clicked
    clickPos: Vec3 = new Vec3(true); // where on the block the player clicked
    blockRuntimeId: number; // Runtime ID of the block clicked (I think, not 100% sure)


    readTransaction(buffer: PacketBuffer): void {
        this.actionType = buffer.readUVarInt();

        this.blockPos.x = buffer.readZigZagVarInt();
        this.blockPos.y = buffer.readUVarInt();
        this.blockPos.z = buffer.readZigZagVarInt();
        this.face = buffer.readVarInt();
        this.hotbarSlot = buffer.readVarInt();
        this.item.readItem(buffer);
        this.playerPos.x = buffer.readFloatLE();
        this.playerPos.y = buffer.readFloatLE();
        this.playerPos.z = buffer.readFloatLE();
        this.clickPos.x = buffer.readFloatLE();
        this.clickPos.z = buffer.readFloatLE();
        this.blockRuntimeId = buffer.readUVarInt();
        return;
    }
}

export class UseItemOnEntityTransaction extends TransactionType {
    transactionId: number = 3;
    entityRuntimeId: number | [number, number];
    actionType: number;
    hotbarSlot: number;
    item: TransactionItem = new TransactionItem;
    playerPos: Vec3 = new Vec3(true);
    clickPos: Vec3 = new Vec3(true);

    readTransaction(buffer: PacketBuffer): void {
        this.entityRuntimeId = buffer.readUVarLong();
        this.actionType = buffer.readUVarInt();
        this.hotbarSlot = buffer.readVarInt();
        this.item.readItem(buffer);
        this.playerPos.x = buffer.readFloatLE();
        this.playerPos.y = buffer.readFloatLE();
        this.playerPos.z = buffer.readFloatLE();
        this.clickPos.x = buffer.readFloatLE();
        this.clickPos.y = buffer.readFloatLE();
        this.clickPos.z = buffer.readFloatLE();
        return;
    }
}

export class ReleaseItemTransaction extends TransactionType {
    transactionId: number = 4;
    actionType: number;
    hotbarSlot: number;
    item: TransactionItem = new TransactionItem;
    headPos: Vec3 = new Vec3(true);

    readTransaction(buffer: PacketBuffer): void {
        this.actionType = buffer.readUVarInt();
        this.hotbarSlot = buffer.readVarInt();
        this.item.readItem(buffer);
        this.headPos.x = buffer.readFloatLE();
        this.headPos.y = buffer.readFloatLE();
        this.headPos.z = buffer.readFloatLE();
        return;
    }
}

export class InventoryTransactionInfo {
    packetId: number; // ID of packet, should be 30
    legacyId: number; // ID for legacy transaction. Should be 0 (wont correctly read if not)
    transactionType: number; // Type of transaction
    hasStackIds: number; // Not entirely sure
    actionsLength: number; // Length of the action list (Pretty sure this is always 0)
    transactionData: TransactionType; // Stores the transaction data instance

    readPacket(ptr: NativePointer, size: number) {
        let buffer = PacketBuffer.fromPointer(ptr, size);
        this.packetId = buffer.readUInt8();
        this.legacyId = buffer.readVarInt();
        this.transactionType = buffer.readUVarInt();
        this.hasStackIds = buffer.readUInt8();
        this.actionsLength = buffer.readUVarInt();

        switch (this.transactionType) {
            case 2:
                this.transactionData = new UseItemTransaction();
                this.transactionData.readTransaction(buffer);
                break;
            case 3:
                this.transactionData = new UseItemOnEntityTransaction();
                this.transactionData.readTransaction(buffer);
                break;
            case 4:
                this.transactionData = new ReleaseItemTransaction();
                this.transactionData.readTransaction(buffer);
                break;
            default:
                break;
        }
    }
}

export class TransactionItem {
    netId: number; // Server ID for item (not actual ID)
    id: string; // Named ID of item (i.e minecraft:grass)
    auxValue: number; // Some weird system MC has for getting count and damage without NBT
    count: number; // Number of items in stack
    data: number; // The "damage" or type of an item
    nbtLength: number; // Not actual length, just says if the NBT exists
    hasNbt: boolean; // Returns true if NBT is 0xFFFF (long short number) and false if 0 or anything else (throws exception when something else)
    nbt: NbtTag<any> | null; // NBT compound tag (type is NbtTag for edge cases)
    canPlace: string[] = []; // Array of blocks that the item can be placed on
    canBreak: string[] = []; // Array of blocks the item can break
    blockTick: number | [number, number]; // Only on shields. Read as long so if precision limit reached ticked over to array not sure purpose

    readItem(buffer: PacketBuffer): this {
        this.netId = buffer.readZigZagVarInt();
        if (this.netId === 0) {
            this.id = "minecraft:air";
            this.data = 0;
            this.count = 0;
            return this;
        }

        this.id = itemMap.find((itemInfo: any) => itemInfo.id === this.netId).name
        this.auxValue = buffer.readVarInt();
        this.data = this.auxValue >> 8;
        this.count = this.auxValue & 0xff;

        this.nbtLength = buffer.readInt16LE();

        if (this.nbtLength === -1) {
            if (buffer.readUInt8() !== 1) {
                throw "Error: NBT version invald";
            }
            if (buffer.getUInt8(buffer.offset) !== 10) {
                throw "Error: NBT ID not that of Compound";
            }
            this.nbt = readPacketNbt(buffer);
        } else if (this.nbtLength === 0) {
            this.hasNbt = false;
        } else {
            throw "Error: Invalid NBT length";
        }
        let canPlaceLength = buffer.readZigZagVarInt();
        for (let i = 0; i < canPlaceLength; i++) {
            this.canPlace.push(buffer.readString());
        }

        let canBreakLength = buffer.readZigZagVarInt();
        for (let i = 0; i < canBreakLength; i++) {
            this.canPlace.push(buffer.readString());
        }

        if (this.id === "minecraft:shield") {
            this.blockTick = buffer.readVarLong();
        }
        return this;
    }
}
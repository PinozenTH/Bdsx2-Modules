import { NetworkIdentifier } from "./bds/networkidentifier";
import { MinecraftPacketIds } from "./bds/packetids";
import { PacketIdToType } from "./bds/packets";
import { CANCEL } from "./common";
import { NativePointer } from "./core";
export declare namespace nethook {
    type RawListener = (ptr: NativePointer, size: number, networkIdentifier: NetworkIdentifier, packetId: number) => CANCEL | void | Promise<void>;
    type PacketListener<ID extends MinecraftPacketIds> = (packet: PacketIdToType[ID], networkIdentifier: NetworkIdentifier, packetId: ID) => CANCEL | void | Promise<void>;
    type BeforeListener<ID extends MinecraftPacketIds> = PacketListener<ID>;
    type AfterListener<ID extends MinecraftPacketIds> = PacketListener<ID>;
    type SendListener<ID extends MinecraftPacketIds> = PacketListener<ID>;
    type SendRawListener = (ptr: NativePointer, size: number, networkIdentifier: NetworkIdentifier, packetId: number) => CANCEL | void | Promise<void>;
    let lastSender: NetworkIdentifier;
    /**
     * Write all packets to console
     */
    function watchAll(exceptions?: MinecraftPacketIds[]): void;
}

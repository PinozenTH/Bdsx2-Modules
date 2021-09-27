import { MantleClass, NativeClass } from "../nativeclass";
import { SharedPtr } from "../sharedpointer";
import { CxxString, int32_t, uint32_t } from "../nativetype";
import { NetworkIdentifier } from "./networkidentifier";
import { MinecraftPacketIds } from "./packetids";
import { BinaryStream } from "./stream";
export declare const PacketReadResult: import("../nativetype").NativeType<number> & {
    PacketReadNoError: number;
    PacketReadError: number;
};
export declare type PacketReadResult = uint32_t;
export declare const StreamReadResult: import("../nativetype").NativeType<number> & {
    Disconnect: number;
    Pass: number;
    Warning: number;
    Ignore: number;
};
export declare type StreamReadResult = int32_t;
export declare class ExtendedStreamReadResult extends NativeClass {
    streamReadResult: StreamReadResult;
    dummy: int32_t;
}
declare const sharedptr_of_packet: unique symbol;
export declare class Packet extends MantleClass {
    static ID: number;
    [sharedptr_of_packet]?: SharedPtr<any> | null;
    getId(): MinecraftPacketIds;
    getName(): CxxString;
    write(stream: BinaryStream): void;
    read(stream: BinaryStream): PacketReadResult;
    readExtended(read: ExtendedStreamReadResult, stream: BinaryStream): ExtendedStreamReadResult;
    /**
     * same with target.send
     */
    sendTo(target: NetworkIdentifier, unknownarg?: number): void;
    dispose(): void;
    static create<T extends Packet>(this: {
        new (alloc?: boolean): T;
        ID: number;
        ref(): any;
    }): T;
}
export declare const PacketSharedPtr: import("../nativeclass").NativeClassType<SharedPtr<Packet>>;
export declare type PacketSharedPtr = SharedPtr<Packet>;
export declare const createPacketRaw: import("../makefunc").FunctionFromTypes_js<import("../core").NativePointer, null, [import("../nativeclass").NativeClassType<SharedPtr<Packet>>, import("../nativetype").NativeType<number>], import("../nativeclass").NativeClassType<SharedPtr<Packet>>>;
export {};

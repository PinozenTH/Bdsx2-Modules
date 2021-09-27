import { StaticPointer, VoidPointer } from "../core";
import { Hashable } from "../hashset";
import { makefunc } from "../makefunc";
import { NativeClass } from "../nativeclass";
import { CxxString, int32_t, NativeType } from "../nativetype";
import { CxxStringWrapper } from "../pointer";
import type { Packet } from "./packet";
import type { ServerPlayer } from "./player";
import { RakNet } from "./raknet";
import { RakNetInstance } from "./raknetinstance";
export declare class NetworkHandler extends NativeClass {
    vftable: VoidPointer;
    instance: RakNetInstance;
    send(ni: NetworkIdentifier, packet: Packet, senderSubClientId: number): void;
    sendInternal(ni: NetworkIdentifier, packet: Packet, data: CxxStringWrapper): void;
    getConnectionFromId(ni: NetworkIdentifier): NetworkHandler.Connection;
}
export declare namespace NetworkHandler {
    class Connection extends NativeClass {
        networkIdentifier: NetworkIdentifier;
    }
}
declare class ServerNetworkHandler$Client extends NativeClass {
}
export declare class ServerNetworkHandler extends NativeClass {
    vftable: VoidPointer;
    readonly motd: CxxString;
    readonly maxPlayers: int32_t;
    protected _disconnectClient(client: NetworkIdentifier, unknown: number, message: CxxString, skipMessage: boolean): void;
    disconnectClient(client: NetworkIdentifier, message?: string, skipMessage?: boolean): void;
    /**
     * Alias of allowIncomingConnections
     */
    setMotd(motd: string): void;
    /**
     * @deprecated
     */
    setMaxPlayers(count: number): void;
    allowIncomingConnections(motd: string, b: boolean): void;
    updateServerAnnouncement(): void;
    setMaxNumPlayers(n: number): void;
}
export declare namespace ServerNetworkHandler {
    type Client = ServerNetworkHandler$Client;
}
export declare class NetworkIdentifier extends NativeClass implements Hashable {
    address: RakNet.AddressOrGUID;
    unknown: int32_t;
    constructor(allocate?: boolean);
    assignTo(target: VoidPointer): void;
    equals(other: NetworkIdentifier): boolean;
    hash(): number;
    getActor(): ServerPlayer | null;
    getAddress(): string;
    toString(): string;
    static fromPointer(ptr: StaticPointer): NetworkIdentifier;
    static [NativeType.getter](ptr: StaticPointer, offset?: number): NetworkIdentifier;
    static [makefunc.getFromParam](ptr: StaticPointer, offset?: number): NetworkIdentifier;
    static all(): IterableIterator<NetworkIdentifier>;
    private static _singletoning;
}
export declare let networkHandler: NetworkHandler;
export {};

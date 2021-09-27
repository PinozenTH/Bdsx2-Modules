import { VoidPointer } from "../core";
import { NativeClass } from "../nativeclass";
import { RakNet } from "./raknet";
export declare class RakNetInstance extends NativeClass {
    vftable: VoidPointer;
    peer: RakNet.RakPeer;
    getPort(): number;
}

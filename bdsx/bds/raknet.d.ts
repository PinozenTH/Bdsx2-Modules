import { VoidPointer } from "../core";
import { NativeClass } from "../nativeclass";
import { bin64_t, uint16_t } from "../nativetype";
export declare namespace RakNet {
    class SystemAddress extends NativeClass {
        debugPort: uint16_t;
        systemIndex: uint16_t;
        ToString(writePort: boolean, dest: Uint8Array, portDelineator: number): void;
        toString(): string;
    }
    class RakNetGUID extends NativeClass {
        g: bin64_t;
        systemIndex: uint16_t;
    }
    class RakPeer extends NativeClass {
        vftable: VoidPointer;
        GetSystemAddressFromIndex(idx: number): SystemAddress;
    }
    const UNASSIGNED_RAKNET_GUID: RakNetGUID;
    class AddressOrGUID extends NativeClass {
        rakNetGuid: RakNetGUID;
        systemAddress: SystemAddress;
        GetSystemIndex(): uint16_t;
    }
}

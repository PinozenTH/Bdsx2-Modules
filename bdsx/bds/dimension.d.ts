import { VoidPointer } from "../core";
import { NativeClass } from "../nativeclass";
import type { DimensionId } from "./actor";
import { BlockSource } from "./block";
export declare class Dimension extends NativeClass {
    vftable: VoidPointer;
    /** @deprecated Use getBlockSource() instead */
    get blockSource(): BlockSource;
    getBlockSource(): BlockSource;
    getDimensionId(): DimensionId;
}

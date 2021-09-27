import { BlockPos, Vec3 } from "../bds/blockpos";
import { VoidPointer } from "../core";
import { mce } from "../mce";
import { NativeClass } from "../nativeclass";
import { CxxString } from "../nativetype";
import { Actor } from "./actor";
import { Dimension } from "./dimension";
import { Level, ServerLevel } from "./level";
export declare class CommandOrigin extends NativeClass {
    vftable: VoidPointer;
    uuid: mce.UUID;
    level: ServerLevel;
    constructWith(vftable: VoidPointer, level: ServerLevel): void;
    isServerCommandOrigin(): boolean;
    isScriptCommandOrigin(): boolean;
    getRequestId(): CxxString;
    getName(): string;
    getBlockPosition(): BlockPos;
    getWorldPosition(): Vec3;
    getLevel(): Level;
    /**
     * actually, it's nullable when the server is just started without any joining
     */
    getDimension(): Dimension;
    /**
     * it returns null if the command origin is the console
     */
    getEntity(): Actor | null;
    /**
     * return the command result
     */
    handleCommandOutputCallback(value: unknown & IExecuteCommandCallback['data']): void;
}
export declare class PlayerCommandOrigin extends CommandOrigin {
}
export declare class ScriptCommandOrigin extends PlayerCommandOrigin {
}
export declare class ServerCommandOrigin extends CommandOrigin {
}

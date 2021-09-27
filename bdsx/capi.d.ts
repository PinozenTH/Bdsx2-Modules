import { NativePointer, VoidPointer } from "./core";
import { ThreadHandle } from "./dll";
export declare namespace capi {
    const nodeThreadId: number;
    const debugBreak: import("./makefunc").FunctionFromTypes_js<NativePointer, import("./makefunc").MakeFuncOptions<any> | null, [], import("./nativetype").NativeType<void>>;
    function createThread(functionPointer: VoidPointer, param?: VoidPointer | null, stackSize?: number): [ThreadHandle, number];
    function beginThreadEx(functionPointer: VoidPointer, param?: VoidPointer | null): [ThreadHandle, number];
    /**
     * memory allocate by native c
     */
    const malloc: (size: number) => NativePointer;
    /**
     * memory release by native c
     */
    const free: (ptr: VoidPointer) => void;
    function isRunningOnWine(): boolean;
    /**
     * Keep the object from GC
     */
    function permanent<T>(v: T): T;
}

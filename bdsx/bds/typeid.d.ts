import { NativePointer } from "../core";
import { NativeClass } from "../nativeclass";
import { Type, uint16_t } from "../nativetype";
import { Wrapper } from "../pointer";
export declare class typeid_t<T> extends NativeClass {
    id: uint16_t;
}
declare const counterWrapper: unique symbol;
declare const typeidmap: unique symbol;
declare const IdCounter: import("../pointer").WrapperType<number>;
declare type IdCounter = Wrapper<uint16_t>;
/**
 * dummy class for typeid
 */
export declare class HasTypeId extends NativeClass {
    static [counterWrapper]: IdCounter;
    static readonly [typeidmap]: WeakMap<Type<any>, NativePointer | typeid_t<any>>;
}
export declare function type_id<T, BASE extends HasTypeId>(base: typeof HasTypeId & {
    new (): BASE;
}, type: Type<T>): typeid_t<BASE>;
export declare namespace type_id {
    function pdbimport(base: typeof HasTypeId, types: Type<any>[]): void;
}
export {};

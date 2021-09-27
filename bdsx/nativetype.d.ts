import { StaticPointer, VoidPointer } from './core';
import { makefunc } from './makefunc';
declare namespace NativeTypeFn {
    const align: unique symbol;
    const ctor: unique symbol;
    const ctor_copy: unique symbol;
    const isNativeClass: unique symbol;
    const descriptor: unique symbol;
    const bitGetter: unique symbol;
    const bitSetter: unique symbol;
}
/**
 * native type information
 */
export interface Type<T> extends makefunc.Paramable {
    prototype: T;
    name: string;
    symbol?: string;
    isTypeOf<V>(this: {
        prototype: V;
    }, v: unknown): v is V;
    [makefunc.getter](ptr: StaticPointer, offset?: number): any;
    [makefunc.setter](ptr: StaticPointer, value: any, offset?: number): void;
    [NativeTypeFn.ctor]: (ptr: StaticPointer) => void;
    [makefunc.dtor]: (ptr: StaticPointer) => void;
    [NativeTypeFn.ctor_copy]: (to: StaticPointer, from: StaticPointer) => void;
    [makefunc.ctor_move]: (to: StaticPointer, from: StaticPointer) => void;
    [NativeTypeFn.descriptor](builder: NativeDescriptorBuilder, key: string | number, info: NativeDescriptorBuilder.Info): void;
    /**
     * nullable actually
     */
    [NativeTypeFn.align]: number;
    [NativeTypeFn.isNativeClass]?: true;
}
export declare type GetFromType<T> = T extends Type<any> ? T extends {
    prototype: any;
} ? T['prototype'] : T extends {
    [makefunc.getter](ptr: StaticPointer, offset?: number): infer RET;
} ? RET : never : never;
export declare class NativeDescriptorBuilder {
    readonly desc: PropertyDescriptorMap;
    readonly params: unknown[];
    readonly imports: Map<unknown, string>;
    private readonly names;
    readonly ctor: NativeDescriptorBuilder.UseContextCtor;
    readonly dtor: NativeDescriptorBuilder.UseContextDtor;
    readonly ctor_copy: NativeDescriptorBuilder.UseContextCtorCopy;
    readonly ctor_move: NativeDescriptorBuilder.UseContextCtorCopy;
    importType(type: Type<any>): string;
    import(type: unknown, name: string): string;
}
export declare namespace NativeDescriptorBuilder {
    abstract class UseContext {
        code: string;
        used: boolean;
        offset: number;
        ptrUsed: boolean;
        setPtrOffset(offset: number): void;
    }
    class UseContextCtor extends UseContext {
    }
    class UseContextDtor extends UseContext {
    }
    class UseContextCtorCopy extends UseContext {
        setPtrOffset(offset: number): void;
    }
    interface Info {
        offset: number;
        bitmask: [number, number] | null;
        ghost: boolean;
        noInitialize: boolean;
    }
}
export declare class NativeType<T> extends makefunc.ParamableT<T> implements Type<T> {
    static readonly getter: typeof makefunc.getter;
    static readonly setter: typeof makefunc.setter;
    static readonly ctor: typeof NativeTypeFn.ctor;
    static readonly dtor: typeof makefunc.dtor;
    static readonly registerDirect: typeof makefunc.registerDirect;
    static readonly ctor_copy: typeof NativeTypeFn.ctor_copy;
    static readonly ctor_move: typeof makefunc.ctor_move;
    static readonly size: typeof makefunc.size;
    static readonly align: typeof NativeTypeFn.align;
    static readonly descriptor: typeof NativeTypeFn.descriptor;
    [makefunc.getter]: (this: NativeType<T>, ptr: StaticPointer, offset?: number) => T;
    [makefunc.setter]: (this: NativeType<T>, ptr: StaticPointer, v: T, offset?: number) => void;
    [NativeTypeFn.ctor]: (this: NativeType<T>, ptr: StaticPointer) => void;
    [makefunc.dtor]: (this: NativeType<T>, ptr: StaticPointer) => void;
    [makefunc.ctor_move]: (this: NativeType<T>, to: StaticPointer, from: StaticPointer) => void;
    [NativeTypeFn.ctor_copy]: (this: NativeType<T>, to: StaticPointer, from: StaticPointer) => void;
    [NativeTypeFn.align]: number;
    [NativeTypeFn.bitGetter]: (this: NativeType<T>, ptr: StaticPointer, shift: number, mask: number, offset?: number) => T;
    [NativeTypeFn.bitSetter]: (this: NativeType<T>, ptr: StaticPointer, value: T, shift: number, mask: number, offset?: number) => void;
    constructor(
    /**
     * pdb symbol name. it's used by type_id.pdbimport
     */
    name: string, size: number, align: number, 
    /**
     * js type checker for overloaded functions
     * and parameter checking
     */
    isTypeOf: (v: unknown) => boolean, 
    /**
     * isTypeOf but allo downcasting
     */
    isTypeOfWeak: ((v: unknown) => boolean) | undefined, 
    /**
     * getter with the pointer
     */
    get: (ptr: StaticPointer, offset?: number) => T, 
    /**
     * setter with the pointer
     */
    set: (ptr: StaticPointer, v: T, offset?: number) => void, 
    /**
     * assembly for casting the native value to the js value
     */
    getFromParam?: (stackptr: StaticPointer, offset?: number) => T | null, 
    /**
     * assembly for casting the js value to the native value
     */
    setToParam?: (stackptr: StaticPointer, param: T extends VoidPointer ? (T | null) : T, offset?: number) => void, 
    /**
     * constructor
     */
    ctor?: (ptr: StaticPointer) => void, 
    /**
     * destructor
     */
    dtor?: (ptr: StaticPointer) => void, 
    /**
     * copy constructor, https://en.cppreference.com/w/cpp/language/copy_constructor
     */
    ctor_copy?: (to: StaticPointer, from: StaticPointer) => void, 
    /**
     * move constructor, https://en.cppreference.com/w/cpp/language/move_constructor
     * it uses the copy constructor by default
     */
    ctor_move?: (to: StaticPointer, from: StaticPointer) => void);
    supportsBitMask(): boolean;
    extends<FIELDS>(fields?: FIELDS, name?: string): NativeType<T> & FIELDS;
    ref(): NativeType<T>;
    [NativeTypeFn.descriptor](builder: NativeDescriptorBuilder, key: string, info: NativeDescriptorBuilder.Info): void;
    static defaultDescriptor(this: Type<any>, builder: NativeDescriptorBuilder, key: string, info: NativeDescriptorBuilder.Info): void;
    static definePointedProperty<KEY extends keyof any, T>(target: {
        [key in KEY]: T;
    }, key: KEY, pointer: StaticPointer, type: Type<T>): void;
}
declare module './core' {
    interface VoidPointerConstructor {
        [NativeType.align]: number;
        [NativeType.ctor](ptr: StaticPointer): void;
        [NativeType.dtor](ptr: StaticPointer): void;
        [NativeType.ctor_copy](to: StaticPointer, from: StaticPointer): void;
        [NativeType.ctor_move](to: StaticPointer, from: StaticPointer): void;
        [NativeType.descriptor](builder: NativeDescriptorBuilder, key: string, info: NativeDescriptorBuilder.Info): void;
    }
}
export declare const void_t: NativeType<void>;
export declare type void_t = void;
export declare const bool_t: NativeType<boolean>;
export declare type bool_t = boolean;
export declare const uint8_t: NativeType<number>;
export declare type uint8_t = number;
export declare const uint16_t: NativeType<number>;
export declare type uint16_t = number;
export declare const uint32_t: NativeType<number>;
export declare type uint32_t = number;
export declare const ulong_t: NativeType<number>;
export declare type ulong_t = number;
export declare const uint64_as_float_t: NativeType<number>;
export declare type uint64_as_float_t = number;
export declare const int8_t: NativeType<number>;
export declare type int8_t = number;
export declare const int16_t: NativeType<number>;
export declare type int16_t = number;
export declare const int32_t: NativeType<number>;
export declare type int32_t = number;
export declare const long_t: NativeType<number>;
export declare type long_t = number;
export declare const int64_as_float_t: NativeType<number>;
export declare type int64_as_float_t = number;
export declare const float32_t: NativeType<number>;
export declare type float32_t = number;
export declare const float64_t: NativeType<number>;
export declare type float64_t = number;
export declare const CxxString: NativeType<string>;
export declare type CxxString = string;
export declare const bin64_t: NativeType<string> & {
    one: string;
    zero: string;
    minus_one: string;
};
export declare type bin64_t = string;
export declare const bin128_t: NativeType<string> & {
    one: string;
    zero: string;
    minus_one: string;
};
export declare type bin128_t = string;
/** @deprecated for legacy support */
export declare const CxxStringWith8Bytes: NativeType<string>;
export declare type CxxStringWith8Bytes = string;
export {};

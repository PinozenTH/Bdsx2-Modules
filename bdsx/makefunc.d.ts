/// <reference types="node" />
import { asm } from "./assembler";
import "./codealloc";
import { Bufferable, Encoding } from "./common";
import { chakraUtil, NativePointer, StaticPointer, VoidPointer } from "./core";
export declare type ParamType = makefunc.Paramable;
declare type InstanceTypeOnly<T> = T extends {
    prototype: infer V;
} ? V : never;
declare type TypeFrom_js2np<T extends ParamType> = InstanceTypeOnly<T> | null;
declare type TypeFrom_np2js<T extends ParamType> = InstanceTypeOnly<T>;
export declare type TypesFromParamIds_js2np<T extends ParamType[]> = {
    [key in keyof T]: T[key] extends null ? void : T[key] extends ParamType ? TypeFrom_js2np<T[key]> : T[key];
};
export declare type TypesFromParamIds_np2js<T extends ParamType[]> = {
    [key in keyof T]: T[key] extends null ? void : T[key] extends ParamType ? TypeFrom_np2js<T[key]> : T[key];
};
export interface MakeFuncOptions<THIS extends {
    new (): VoidPointer | void;
}> {
    /**
     * *Pointer, 'this' parameter passes as first parameter.
     */
    this?: THIS;
    /**
     * it allocates at the first parameter with the returning class and returns it.
     * if this is defined, it allocates at the second parameter.
     */
    structureReturn?: boolean;
    /**
     * Option for native debugging
     */
    nativeDebugBreak?: boolean;
    /**
     * Option for JS debugging
     */
    jsDebugBreak?: boolean;
    /**
     * for makefunc.np
     * jump to onError when JsCallFunction is failed (js exception, wrong thread, etc)
     */
    onError?: VoidPointer | null;
}
declare type GetThisFromOpts<OPTS extends MakeFuncOptions<any> | null> = OPTS extends MakeFuncOptions<infer THIS> ? THIS extends {
    new (): VoidPointer;
} ? InstanceType<THIS> : void : void;
export declare type FunctionFromTypes_np<OPTS extends MakeFuncOptions<any> | null, PARAMS extends ParamType[], RETURN extends ParamType> = (this: GetThisFromOpts<OPTS>, ...args: TypesFromParamIds_np2js<PARAMS>) => TypeFrom_js2np<RETURN>;
export declare type FunctionFromTypes_js<PTR extends VoidPointer | [number, number?], OPTS extends MakeFuncOptions<any> | null, PARAMS extends ParamType[], RETURN extends ParamType> = ((this: GetThisFromOpts<OPTS>, ...args: TypesFromParamIds_js2np<PARAMS>) => TypeFrom_np2js<RETURN>) & {
    pointer: PTR;
};
export declare type FunctionFromTypes_js_without_pointer<OPTS extends MakeFuncOptions<any> | null, PARAMS extends ParamType[], RETURN extends ParamType> = ((this: GetThisFromOpts<OPTS>, ...args: TypesFromParamIds_js2np<PARAMS>) => TypeFrom_np2js<RETURN>);
export declare namespace makefunc {
    const temporalKeeper: any[];
    const temporalDtors: (() => void)[];
    const getter: unique symbol;
    const setter: unique symbol;
    const setToParam: unique symbol;
    const getFromParam: unique symbol;
    const useXmmRegister: unique symbol;
    const dtor: unique symbol;
    const ctor_move: unique symbol;
    const size: unique symbol;
    const registerDirect: unique symbol;
    interface Paramable {
        name: string;
        [getter](ptr: StaticPointer, offset?: number): any;
        [setter](ptr: StaticPointer, value: any, offset?: number): void;
        [getFromParam](stackptr: StaticPointer, offset?: number): any;
        [setToParam](stackptr: StaticPointer, param: any, offset?: number): void;
        [useXmmRegister]: boolean;
        [ctor_move](to: StaticPointer, from: StaticPointer): void;
        [dtor](ptr: StaticPointer): void;
        [size]: number;
        [registerDirect]?: boolean;
        isTypeOf(v: unknown): boolean;
        /**
         * allow downcasting
         */
        isTypeOfWeak(v: unknown): boolean;
    }
    interface ParamableT<T> extends Paramable {
        prototype: T;
        [getFromParam](stackptr: StaticPointer, offset?: number): T | null;
        [setToParam](stackptr: StaticPointer, param: T extends VoidPointer ? (T | null) : T, offset?: number): void;
        [useXmmRegister]: boolean;
        isTypeOf<V>(this: {
            prototype: V;
        }, v: unknown): v is V;
        isTypeOfWeak(v: unknown): boolean;
    }
    class ParamableT<T> {
        readonly name: string;
        constructor(name: string, _getFromParam: (stackptr: StaticPointer, offset?: number) => T | null, _setToParam: (stackptr: StaticPointer, param: T extends VoidPointer ? (T | null) : T, offset?: number) => void, _ctor_move: (to: StaticPointer, from: StaticPointer) => void, isTypeOf: (v: unknown) => boolean, isTypeOfWeak?: (v: unknown) => boolean);
    }
    /**
     * allocate temporal memory for using in NativeType
     * it will removed at native returning
     */
    function tempAlloc(size: number): StaticPointer;
    /**
     * allocate temporal memory for using in NativeType
     * it will removed at native returning
     */
    function tempValue(type: Paramable, value: unknown): StaticPointer;
    /**
     * allocate temporal string for using in NativeType
     * it will removed at native returning
     */
    function tempString(str: string, encoding?: Encoding): StaticPointer;
    function npRaw(func: (stackptr: NativePointer) => void, onError: VoidPointer, opts?: {
        name?: string;
        nativeDebugBreak?: boolean;
    } | null): VoidPointer;
    /**
     * make the JS function as a native function.
     *
     * wrapper codes are not deleted permanently.
     * do not use it dynamically.
     */
    function np<RETURN extends ParamType, OPTS extends MakeFuncOptions<any> | null, PARAMS extends ParamType[]>(jsfunction: FunctionFromTypes_np<OPTS, PARAMS, RETURN>, returnType: RETURN, opts?: OPTS, ...params: PARAMS): VoidPointer;
    /**
     * make the native function as a JS function.
     *
     * @param returnType *_t or *Pointer
     * @param params *_t or *Pointer
     */
    function js<PTR extends VoidPointer | [number, number?], OPTS extends MakeFuncOptions<any> | null, RETURN extends ParamType, PARAMS extends ParamType[]>(functionPointer: PTR, returnType: RETURN, opts?: OPTS, ...params: PARAMS): FunctionFromTypes_js<PTR, OPTS, PARAMS, RETURN>;
    export import asJsValueRef = chakraUtil.asJsValueRef;
    const Ansi: ParamableT<string>;
    const Utf8: ParamableT<string>;
    const Utf16: ParamableT<string>;
    const Buffer: ParamableT<Bufferable | VoidPointer>;
    const JsValueRef: ParamableT<any>;
}
export interface MakeFuncOptionsWithName<THIS extends {
    new (): VoidPointer | void;
}> extends MakeFuncOptions<THIS> {
    /**
     * name of the native stack trace
     */
    name?: string;
}
declare module "./assembler" {
    interface X64Assembler {
        /**
         * asm.alloc + makefunc.js
         * allocates it on the executable memory. and make it as a JS function.
         */
        make<OPTS extends MakeFuncOptionsWithName<any> | null, RETURN extends ParamType, PARAMS extends ParamType[]>(returnType: RETURN, opts?: OPTS, ...params: PARAMS): FunctionFromTypes_js<StaticPointer, OPTS, PARAMS, RETURN>;
    }
    namespace asm {
        function const_str(str: string, encoding?: BufferEncoding): Buffer;
    }
}
declare module "./core" {
    interface VoidPointerConstructor extends makefunc.Paramable {
        isTypeOf<T>(this: {
            new (): T;
        }, v: unknown): v is T;
    }
    interface VoidPointer {
        [asm.splitTwo32Bits](): [number, number];
    }
}
declare global {
    interface Uint8Array {
        [asm.splitTwo32Bits](): [number, number];
    }
}
export {};

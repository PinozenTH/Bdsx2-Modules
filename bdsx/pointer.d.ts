/// <reference types="node" />
import { Encoding, TypeFromEncoding } from "./common";
import { NativePointer, StaticPointer } from "./core";
import { NativeClass, NativeClassType } from "./nativeclass";
import { int64_as_float_t, NativeDescriptorBuilder, NativeType, Type } from "./nativetype";
import util = require('util');
export interface WrapperType<T> extends NativeClassType<Wrapper<T>> {
    new (ptr?: boolean): Wrapper<T>;
}
export declare abstract class Wrapper<T> extends NativeClass {
    abstract value: T;
    abstract type: Type<T>;
    static make<T>(type: {
        new (): T;
    } | NativeType<T>): WrapperType<T>;
    static [NativeType.ctor_copy](to: StaticPointer, from: StaticPointer): void;
    static [NativeType.ctor_move](to: StaticPointer, from: StaticPointer): void;
    static [NativeType.descriptor](this: {
        new (): Wrapper<any>;
    }, builder: NativeDescriptorBuilder, key: string, info: NativeDescriptorBuilder.Info): void;
}
export declare class CxxStringWrapper extends NativeClass {
    length: int64_as_float_t;
    capacity: int64_as_float_t;
    [NativeType.ctor](): void;
    [NativeType.dtor](): void;
    [NativeType.ctor_copy](other: CxxStringWrapper): void;
    get value(): string;
    set value(str: string);
    get valueptr(): NativePointer;
    valueAs<T extends Encoding>(encoding: T): TypeFromEncoding<T>;
    reserve(nsize: number): void;
    resize(nsize: number): void;
    [util.inspect.custom](depth: number, options: Record<string, any>): unknown;
}

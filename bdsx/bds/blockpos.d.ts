import { NativeClass } from "../nativeclass";
import { bin64_t, bool_t, float32_t, int32_t, NativeType, uint32_t } from "../nativetype";
export declare enum Facing {
    Down = 0,
    Up = 1,
    North = 2,
    South = 3,
    West = 4,
    East = 5,
    Max = 6
}
export declare class BlockPos extends NativeClass {
    x: int32_t;
    y: uint32_t;
    z: int32_t;
    static create(x: number, y: number, z: number): BlockPos;
    toJSON(): VectorXYZ;
}
export declare class Vec2 extends NativeClass {
    x: float32_t;
    y: float32_t;
    static create(x: number, y: number): Vec2;
    toJSON(): {
        x: number;
        y: number;
    };
}
export declare class Vec3 extends NativeClass {
    x: float32_t;
    y: float32_t;
    z: float32_t;
    static create(x: number, y: number, z: number): Vec3;
    toJSON(): VectorXYZ;
}
export declare class RelativeFloat extends NativeClass {
    static readonly [NativeType.registerDirect] = true;
    value: float32_t;
    is_relative: bool_t;
    bin_value: bin64_t;
    static create(value: number, is_relative: boolean): RelativeFloat;
}

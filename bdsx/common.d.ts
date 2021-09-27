import './polyfill';
export interface CANCEL {
    __CANCEL_OBJECT__?: void;
    toString(): 'CANCEL';
}
export declare const CANCEL: CANCEL;
export declare enum AttributeName {
    ZombieSpawnReinforcementsChange = "minecraft:zombie.spawn.reinforcements",
    PlayerHunger = "minecraft:player.hunger",
    PlayerSaturation = "minecraft:player.saturation",
    PlayerExhaustion = "minecraft:player.exhaustion",
    PlayerLevel = "minecraft:player.level",
    PlayerExperience = "minecraft:player.experience",
    Health = "minecraft:health",
    FollowRange = "minecraft:follow_range",
    KnockbackResistance = "minecraft:knockback_registance",
    MovementSpeed = "minecraft:movement",
    UnderwaterMovementSpeed = "minecraft:underwater_movement",
    AttackDamage = "minecraft:attack_damage",
    Absorption = "minecraft:absorption",
    Luck = "minecraft:luck",
    JumpStrength = "minecraft:horse.jump_strength"
}
export declare enum DeviceOS {
    UNKNOWN = -1,
    ANDROID = 1,
    IOS = 2,
    OSX = 3,
    AMAZON = 4,
    GEAR_VR = 5,
    HOLOLENS = 6,
    WINDOWS_10 = 7,
    WIN32 = 8,
    DEDICATED = 9,
    TVOS = 10,
    PLAYSTATION = 11,
    NINTENDO = 12,
    XBOX = 13,
    WINDOWS_PHONE = 14
}
export declare enum Encoding {
    Utf16 = -2,
    Buffer = -1,
    Utf8 = 0,
    None = 1,
    Ansi = 2
}
export declare type TypeFromEncoding<T extends Encoding> = T extends Encoding.Buffer ? Uint8Array : string;
export declare type TypedArrayBuffer = Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Int8Array | Int16Array | Int32Array | Float32Array | Float64Array;
export declare type Bufferable = TypedArrayBuffer | ArrayBuffer | DataView;
export declare type AnyFunction = (this: any, ...args: any[]) => any;
export declare function emptyFunc(): void;
export declare function abstract(): never;

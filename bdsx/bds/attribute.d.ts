import { VoidPointer } from "../core";
import { NativeClass } from "../nativeclass";
import { float32_t } from "../nativetype";
export declare enum AttributeId {
    ZombieSpawnReinforcementsChange = 1,
    PlayerHunger = 2,
    PlayerSaturation = 3,
    PlayerExhaustion = 4,
    PlayerLevel = 5,
    PlayerExperience = 6,
    Health = 7,
    FollowRange = 8,
    KnockbackResistance = 9,
    MovementSpeed = 10,
    UnderwaterMovementSpeed = 11,
    AttackDamage = 12,
    Absorption = 13,
    Luck = 14,
    JumpStrength = 15
}
export declare class AttributeInstance extends NativeClass {
    vftable: VoidPointer;
    u1: VoidPointer;
    u2: VoidPointer;
    currentValue: float32_t;
    minValue: float32_t;
    maxValue: float32_t;
    defaultValue: float32_t;
}
export declare class BaseAttributeMap extends NativeClass {
    getMutableInstance(type: AttributeId): AttributeInstance | null;
}

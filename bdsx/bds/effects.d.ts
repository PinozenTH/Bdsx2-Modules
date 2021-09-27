import { NativeClass } from "../nativeclass";
import { bool_t, CxxString, float32_t, int32_t, uint32_t } from "../nativetype";
import { HashedString } from "./hashedstring";
export declare enum MobEffectIds {
    Empty = 0,
    Speed = 1,
    Slowness = 2,
    Haste = 3,
    MiningFatigue = 4,
    Strength = 5,
    InstantHealth = 6,
    InstantDamage = 7,
    JumpBoost = 8,
    Nausea = 9,
    Regeneration = 10,
    Resistance = 11,
    FireResistant = 12,
    WaterBreathing = 13,
    Invisibility = 14,
    Blindness = 15,
    NightVision = 16,
    Hunger = 17,
    Weakness = 18,
    Poison = 19,
    Wither = 20,
    HealthBoost = 21,
    Absorption = 22,
    Saturation = 23,
    Levitation = 24,
    FatalPoison = 25,
    ConduitPower = 26,
    SlowFalling = 27,
    BadOmen = 28,
    HeroOfTheVillage = 29
}
export declare class MobEffect extends NativeClass {
    id: uint32_t;
    harmful: bool_t;
    descriptionId: CxxString;
    icon: int32_t;
    durationModifier: float32_t;
    disabled: bool_t;
    resourceName: CxxString;
    iconName: CxxString;
    showParticles: bool_t;
    componentName: HashedString;
    static create(id: MobEffectIds): MobEffect;
    getId(): number;
}
export declare class MobEffectInstance extends NativeClass {
    id: uint32_t;
    duration: int32_t;
    durationEasy: int32_t;
    durationNormal: int32_t;
    durationHard: int32_t;
    amplifier: int32_t;
    displayAnimation: bool_t;
    ambient: bool_t;
    noCounter: bool_t;
    showParticles: bool_t;
    /**
     * @param duration How many ticks will the effect last (one tick = 0.05s)
     */
    static create(id: MobEffectIds, duration?: number, amplifier?: number, ambient?: boolean, showParticles?: boolean, displayAnimation?: boolean): MobEffectInstance;
    protected _create(id: MobEffectIds, duration: number, amplifier: number, ambient: boolean, showParticles: boolean, displayAnimation: boolean): void;
    getSplashDuration(): number;
    getLingerDuration(): number;
}

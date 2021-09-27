import { CxxVector } from "../cxxvector";
import { NativeClass } from "../nativeclass";
import { int32_t, uint32_t } from "../nativetype";
import { ItemStack } from "./inventory";
export declare namespace Enchant {
    enum Type {
        ArmorAll = 0,
        ArmorFire = 1,
        ArmorFall = 2,
        ArmorExplosive = 3,
        ArmorProjectile = 4,
        ArmorThorns = 5,
        WaterBreath = 6,
        WaterSpeed = 7,
        WaterAffinity = 8,
        WeaponDamage = 9,
        WeaponUndead = 10,
        WeaponArthropod = 11,
        WeaponKnockback = 12,
        WeaponFire = 13,
        WeaponLoot = 14,
        MiningEfficiency = 15,
        MiningSilkTouch = 16,
        MiningDurability = 17,
        MiningLoot = 18,
        BowDamage = 19,
        BowKnockback = 20,
        BowFire = 21,
        BowInfinity = 22,
        FishingLoot = 23,
        FishingLure = 24,
        FrostWalker = 25,
        Mending = 26,
        CurseBinding = 27,
        CurseVanishing = 28,
        TridentImpaling = 29,
        TridentRiptide = 30,
        TridentLoyalty = 31,
        TridentChanneling = 32,
        CrossbowMultishot = 33,
        CrossbowPiercing = 34,
        CrossbowQuickCharge = 35,
        SoulSpeed = 36,
        NumEnchantments = 37,
        InvalidEnchantment = 38
    }
}
export declare enum EnchantmentNames {
    Protection = 0,
    FireProtection = 1,
    FeatherFalling = 2,
    BlastProtection = 3,
    ProjectileProtection = 4,
    Thorns = 5,
    Respiration = 6,
    DepthStrider = 7,
    AquaAffinity = 8,
    Sharpness = 9,
    Smite = 10,
    BaneOfArthropods = 11,
    Knockback = 12,
    FireAspect = 13,
    Looting = 14,
    Efficiency = 15,
    SilkTouch = 16,
    Unbreaking = 17,
    Fortune = 18,
    Power = 19,
    Punch = 20,
    Flame = 21,
    Infinity = 22,
    LuckOfTheSea = 23,
    Lure = 24,
    FrostWalker = 25,
    Mending = 26,
    BindingCurse = 27,
    VanishingCurse = 28,
    Impaling = 29,
    Riptide = 30,
    Loyalty = 31,
    Channeling = 32,
    Multishot = 33,
    Piercing = 34,
    QuickCharge = 35,
    SoulSpeed = 36
}
export declare type Enchantments = EnchantmentNames | Enchant.Type;
export declare class EnchantmentInstance extends NativeClass {
    type: Enchantments;
    level: int32_t;
}
export declare class ItemEnchants extends NativeClass {
    slot: uint32_t;
    /** 1-8 */
    enchants1: CxxVector<EnchantmentInstance>;
    /** 9-18 */
    enchants2: CxxVector<EnchantmentInstance>;
    /** >19 */
    enchants3: CxxVector<EnchantmentInstance>;
}
export declare namespace EnchantUtils {
    function applyEnchant(itemStack: ItemStack, enchant: Enchantments, level: number, allowUnsafe: boolean): boolean;
    function getEnchantLevel(enchant: Enchantments, itemStack: ItemStack): number;
    function hasCurse(itemStack: ItemStack): boolean;
    function hasEnchant(enchant: Enchantments, itemStack: ItemStack): boolean;
}

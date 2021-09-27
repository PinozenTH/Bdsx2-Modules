import { StaticPointer, VoidPointer } from "../core";
import { makefunc } from "../makefunc";
import { NativeClass } from "../nativeclass";
import { bin64_t, CxxString, int32_t, int64_as_float_t, NativeType } from "../nativetype";
import { AttributeId, AttributeInstance, BaseAttributeMap } from "./attribute";
import { BlockSource } from "./block";
import { Vec2, Vec3 } from "./blockpos";
import type { CommandPermissionLevel } from "./command";
import { Dimension } from "./dimension";
import { MobEffect, MobEffectIds, MobEffectInstance } from "./effects";
import { HashedString } from "./hashedstring";
import type { ArmorSlot, ItemStack } from "./inventory";
import { NetworkIdentifier } from "./networkidentifier";
import { Packet } from "./packet";
import type { ServerPlayer } from "./player";
export declare const ActorUniqueID: NativeType<string>;
export declare type ActorUniqueID = bin64_t;
export declare enum DimensionId {
    Overworld = 0,
    Nether = 1,
    TheEnd = 2
}
export declare class ActorRuntimeID extends VoidPointer {
}
export declare enum ActorType {
    Item = 64,
    PrimedTnt = 65,
    FallingBlock = 66,
    MovingBlock = 67,
    Experience = 69,
    EyeOfEnder = 70,
    EnderCrystal = 71,
    FireworksRocket = 72,
    FishingHook = 77,
    Chalkboard = 78,
    Painting = 83,
    LeashKnot = 88,
    BoatRideable = 90,
    LightningBolt = 93,
    AreaEffectCloud = 94,
    Balloon = 107,
    Shield = 117,
    Lectern = 119,
    TypeMask = 255,
    Mob = 256,
    Npc = 307,
    Agent = 312,
    ArmorStand = 317,
    TripodCamera = 318,
    Player = 319,
    Bee = 378,
    Piglin = 379,
    PiglinBrute = 383,
    PathfinderMob = 768,
    IronGolem = 788,
    SnowGolem = 789,
    WanderingTrader = 886,
    Monster = 2816,
    Creeper = 2849,
    Slime = 2853,
    EnderMan = 2854,
    Ghast = 2857,
    LavaSlime = 2858,
    Blaze = 2859,
    Witch = 2861,
    Guardian = 2865,
    ElderGuardian = 2866,
    Dragon = 2869,
    Shulker = 2870,
    Vindicator = 2873,
    IllagerBeast = 2875,
    EvocationIllager = 2920,
    Vex = 2921,
    Pillager = 2930,
    ElderGuardianGhost = 2936,
    Animal = 4864,
    Chicken = 4874,
    Cow = 4875,
    Pig = 4876,
    Sheep = 4877,
    MushroomCow = 4880,
    Rabbit = 4882,
    PolarBear = 4892,
    Llama = 4893,
    Turtle = 4938,
    Panda = 4977,
    Fox = 4985,
    Hoglin = 4988,
    Strider = 4989,
    Goat = 4992,
    Axolotl = 4994,
    WaterAnimal = 8960,
    Squid = 8977,
    Dolphin = 8991,
    Pufferfish = 9068,
    Salmon = 9069,
    Tropicalfish = 9071,
    Fish = 9072,
    GlowSquid = 9089,
    TameableAnimal = 21248,
    Wolf = 21262,
    Ocelot = 21270,
    Parrot = 21278,
    Cat = 21323,
    Ambient = 33024,
    Bat = 33043,
    UndeadMob = 68352,
    PigZombie = 68388,
    WitherBoss = 68404,
    Phantom = 68410,
    Zoglin = 68478,
    ZombieMonster = 199424,
    Zombie = 199456,
    ZombieVillager = 199468,
    Husk = 199471,
    Drowned = 199534,
    ZombieVillagerV2 = 199540,
    Arthropod = 264960,
    Spider = 264995,
    Silverfish = 264999,
    CaveSpider = 265000,
    Endermite = 265015,
    Minecart = 524288,
    MinecartRideable = 524372,
    MinecartHopper = 524384,
    MinecartTNT = 524385,
    MinecartChest = 524386,
    MinecartFurnace = 524387,
    MinecartCommandBlock = 524388,
    SkeletonMonster = 1116928,
    Skeleton = 1116962,
    Stray = 1116974,
    WitherSkeleton = 1116976,
    EquineAnimal = 2118400,
    Horse = 2118423,
    Donkey = 2118424,
    Mule = 2118425,
    SkeletonHorse = 2186010,
    ZombieHorse = 2186011,
    Projectile = 4194304,
    ExperiencePotion = 4194372,
    ShulkerBullet = 4194380,
    DragonFireball = 4194383,
    Snowball = 4194385,
    ThrownEgg = 4194386,
    LargeFireball = 4194389,
    ThrownPotion = 4194390,
    Enderpearl = 4194391,
    WitherSkull = 4194393,
    WitherSkullDangerous = 4194395,
    SmallFireball = 4194398,
    LingeringPotion = 4194405,
    LlamaSpit = 4194406,
    EvocationFang = 4194407,
    IceBomb = 4194410,
    AbstractArrow = 8388608,
    Trident = 12582985,
    Arrow = 12582986,
    VillagerBase = 16777984,
    Villager = 16777999,
    VillagerV2 = 16778099
}
export declare class ActorDefinitionIdentifier extends NativeClass {
    namespace: CxxString;
    identifier: CxxString;
    initEvent: CxxString;
    fullName: CxxString;
    canonicalName: HashedString;
    static create(type: ActorType): ActorDefinitionIdentifier;
}
export declare class ActorDamageSource extends NativeClass {
    cause: int32_t;
    /** @deprecated Has to be confirmed working */
    getDamagingEntityUniqueID(): ActorUniqueID;
}
export declare enum ActorDamageCause {
    /** The kill command */
    Override = 0,
    /** @deprecated */
    None = 0,
    Contact = 1,
    EntityAttack = 2,
    Projectile = 3,
    Suffocation = 4,
    /** @deprecated Typo */
    Suffoocation = 4,
    Fall = 5,
    Fire = 6,
    FireTick = 7,
    Lava = 8,
    Drowning = 9,
    BlockExplosion = 10,
    EntityExplosion = 11,
    Void = 12,
    Suicide = 13,
    Magic = 14,
    Wither = 15,
    Starve = 16,
    Anvil = 17,
    Thorns = 18,
    FallingBlock = 19,
    Piston = 20,
    FlyIntoWall = 21,
    Magma = 22,
    Fireworks = 23,
    Lightning = 24,
    Charging = 25,
    Temperature = 26,
    All = 31
}
export declare enum ActorFlags {
    OnFire = 0,
    Sneaking = 1,
    Riding = 2,
    Sprinting = 3,
    UsingItem = 4,
    Invisible = 5,
    Tempted = 6,
    InLove = 7,
    Saddled = 8,
    Powered = 9,
    Ignit0ed = 10,
    Baby = 11,
    Converting = 12,
    Critical = 13,
    CanShowName = 14,
    AlwaysShowName = 15,
    NoAI = 16,
    Silent = 17,
    WallClimbing = 18,
    CanClimb = 19,
    CanSwim = 20,
    CanFly = 21,
    CanWalk = 22,
    Resting = 23,
    Sitting = 24,
    Angry = 25,
    Interested = 26,
    Charged = 27,
    Tamed = 28,
    Orphaned = 29,
    Leashed = 30,
    Sheared = 31,
    Gliding = 32,
    Elder = 33,
    Moving = 34,
    Breathing = 35,
    Chested = 36,
    Stackable = 37,
    ShowBottom = 38,
    Standing = 39,
    Shaking = 40,
    Idling = 41,
    Casting = 42,
    Charging = 43,
    WasdControlled = 44,
    CanPowerJump = 45,
    Lingering = 46,
    HasCollision = 47,
    HasGravity = 48,
    FireImmune = 49,
    Dancing = 50,
    Enchanted = 51,
    ReturnTrident = 52,
    ContainerIsPrivate = 53,
    IsTransforming = 54,
    DamageNearbyMobs = 55,
    Swimming = 56,
    Bribed = 57,
    IsPregnant = 58,
    LayingEgg = 59,
    RiderCanPick = 60,
    TransitionSitting = 61,
    Eating = 62,
    LayingDown = 63,
    Snezing = 64,
    Trusting = 65,
    Rolling = 66,
    Scared = 67,
    InScaffolding = 68,
    OverScaffolding = 69,
    FallThroughScaffolding = 70,
    Blocking = 71,
    TransitionBlocking = 72,
    BlockedUsingShield = 73,
    BlockedUsingDamagedShield = 74,
    Sleeping = 75,
    WantsToWake = 76,
    TradeInterest = 77,
    DoorBreaker = 78,
    BreakingObstruction = 79,
    DoorOpener = 80,
    IsIllagerCaptain = 81,
    Stunned = 82,
    Roaring = 83,
    DelayedAttack = 84,
    IsAvoidingMobs = 85,
    FacingTargetToRangeAttack = 86,
    HiddenWhenInvisible = 87,
    IsInUI = 88,
    Stalking = 89,
    Emoting = 90,
    Celebrating = 91
}
export declare class EntityContext extends NativeClass {
}
export declare class OwnerStorageEntity extends NativeClass {
    _getStackRef(): EntityContext;
}
export declare class EntityRefTraits extends NativeClass {
    context: OwnerStorageEntity;
}
export declare class Actor extends NativeClass {
    vftable: VoidPointer;
    /** @deprecated use getIdentifier */
    get identifier(): EntityId;
    /** @example Actor.summonAt(player.getRegion(), player.getPosition(), ActorDefinitionIdentifier.create(ActorType.Pig), -1, player) */
    static summonAt(region: BlockSource, pos: Vec3, type: ActorDefinitionIdentifier, id: ActorUniqueID, summoner?: Actor): Actor;
    static summonAt(region: BlockSource, pos: Vec3, type: ActorDefinitionIdentifier, id: int64_as_float_t, summoner?: Actor): Actor;
    static tryGetFromEntity(entity: EntityContext): Actor;
    sendPacket(packet: Packet): void;
    protected _getArmorValue(): number;
    getArmorValue(): number;
    getDimension(): Dimension;
    getDimensionId(): DimensionId;
    getIdentifier(): EntityId;
    getActorIdentifier(): ActorDefinitionIdentifier;
    isPlayer(): this is ServerPlayer;
    isItem(): this is ItemActor;
    getAttributes(): BaseAttributeMap;
    getName(): string;
    setName(name: string): void;
    setScoreTag(text: string): void;
    getScoreTag(): string;
    getNetworkIdentifier(): NetworkIdentifier;
    getPosition(): Vec3;
    getRotation(): Vec2;
    getRegion(): BlockSource;
    getUniqueIdLow(): number;
    getUniqueIdHigh(): number;
    getUniqueIdBin(): bin64_t;
    /**
     * it returns address of the unique id field
     */
    getUniqueIdPointer(): StaticPointer;
    getEntityTypeId(): ActorType;
    getCommandPermissionLevel(): CommandPermissionLevel;
    getAttribute(id: AttributeId): number;
    setAttribute(id: AttributeId, value: number): AttributeInstance | null;
    getRuntimeID(): ActorRuntimeID;
    /**
     * @deprecated Need more implement
     */
    getEntity(): IEntity;
    addEffect(effect: MobEffectInstance): void;
    removeEffect(id: MobEffectIds): void;
    protected _hasEffect(mobEffect: MobEffect): boolean;
    hasEffect(id: MobEffectIds): boolean;
    protected _getEffect(mobEffect: MobEffect): MobEffectInstance | null;
    getEffect(id: MobEffectIds): MobEffectInstance | null;
    addTag(tag: string): boolean;
    hasTag(tag: string): boolean;
    removeTag(tag: string): boolean;
    teleport(pos: Vec3, dimensionId?: DimensionId): void;
    getArmor(slot: ArmorSlot): ItemStack;
    setSneaking(value: boolean): void;
    getHealth(): number;
    getMaxHealth(): number;
    /**
     * Most of the time it will be reset by ticking
     * @returns changed
     */
    setStatusFlag(flag: ActorFlags, value: boolean): boolean;
    getStatusFlag(flag: ActorFlags): boolean;
    static fromUniqueIdBin(bin: bin64_t, getRemovedActor?: boolean): Actor | null;
    static fromUniqueId(lowbits: number, highbits: number, getRemovedActor?: boolean): Actor | null;
    static fromEntity(entity: IEntity, getRemovedActor?: boolean): Actor | null;
    static [NativeType.getter](ptr: StaticPointer, offset?: number): Actor;
    static [makefunc.getFromParam](stackptr: StaticPointer, offset?: number): Actor | null;
    static all(): IterableIterator<Actor>;
    private static _singletoning;
    _toJsonOnce(allocator: () => Record<string, any>): Record<string, any>;
}
export declare class ItemActor extends Actor {
    itemStack: ItemStack;
}

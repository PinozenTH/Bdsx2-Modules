import { CxxVector } from "../cxxvector";
import { mce } from "../mce";
import { MantleClass, NativeClass } from "../nativeclass";
import { bin64_t, bool_t, CxxString, float32_t, int16_t, int32_t, int64_as_float_t, NativeType, uint16_t, uint32_t, uint8_t } from "../nativetype";
import { ActorRuntimeID, ActorUniqueID } from "./actor";
import { BlockPos, Vec3 } from "./blockpos";
import { ConnectionRequest } from "./connreq";
import { HashedString } from "./hashedstring";
import { ComplexInventoryTransaction, ContainerId, ContainerType, NetworkItemStackDescriptor } from "./inventory";
import { Packet } from "./packet";
import type { GameType } from "./player";
import { DisplaySlot, ObjectiveSortOrder, ScoreboardId } from "./scoreboard";
export declare class LoginPacket extends Packet {
    protocol: int32_t;
    /**
     * it can be null if the wrong client version
     */
    connreq: ConnectionRequest | null;
}
export declare class PlayStatusPacket extends Packet {
    status: int32_t;
}
export declare class ServerToClientHandshakePacket extends Packet {
    jwt: CxxString;
}
export declare class ClientToServerHandshakePacket extends Packet {
}
export declare class DisconnectPacket extends Packet {
    skipMessage: bool_t;
    message: CxxString;
}
export declare enum PackType {
    Invalid = 0,
    Addon = 1,
    Cached = 2,
    CopyProtected = 3,
    Behavior = 4,
    PersonaPiece = 5,
    Resources = 6,
    Skins = 7,
    WorldTemplate = 8,
    Count = 9
}
export declare class ResourcePacksInfoPacket extends Packet {
}
export declare class ResourcePackStackPacket extends Packet {
}
/** @deprecated Use ResourcePackStackPacket, follow the real class name */
export declare const ResourcePackStacksPacket: typeof ResourcePackStackPacket;
/** @deprecated use ResourcePackStackPacket, follow the real class name */
export declare type ResourcePackStacksPacket = ResourcePackStackPacket;
export declare enum ResourcePackResponse {
    Cancel = 1,
    Downloading = 2,
    DownloadingFinished = 3,
    ResourcePackStackFinished = 4
}
export declare class ResourcePackClientResponsePacket extends Packet {
}
export declare class TextPacket extends Packet {
    type: uint8_t;
    name: CxxString;
    message: CxxString;
    params: CxxVector<CxxString>;
    needsTranslation: bool_t;
    xboxUserId: CxxString;
    platformChatId: CxxString;
}
export declare namespace TextPacket {
    enum Types {
        Raw = 0,
        Chat = 1,
        Translate = 2,
        /** @deprecated **/
        Translated = 2,
        Popup = 3,
        JukeboxPopup = 4,
        Tip = 5,
        SystemMessage = 6,
        /** @deprecated **/
        Sytem = 6,
        Whisper = 7,
        Announcement = 8,
        TextObject = 9,
        /** @deprecated **/
        ObjectWhisper = 9
    }
}
export declare class SetTimePacket extends Packet {
    time: int32_t;
}
export declare class LevelSettings extends MantleClass {
    seed: int32_t;
}
export declare class StartGamePacket extends Packet {
    settings: LevelSettings;
}
export declare class AddPlayerPacket extends Packet {
}
export declare class AddActorPacket extends Packet {
}
export declare class RemoveActorPacket extends Packet {
}
export declare class AddItemActorPacket extends Packet {
}
export declare class TakeItemActorPacket extends Packet {
}
export declare class MoveActorAbsolutePacket extends Packet {
}
export declare class MovePlayerPacket extends Packet {
    actorId: ActorRuntimeID;
    pos: Vec3;
    pitch: float32_t;
    yaw: float32_t;
    headYaw: float32_t;
    mode: uint8_t;
    onGround: bool_t;
    ridingActorId: ActorRuntimeID;
    teleportCause: int32_t;
    teleportItem: int32_t;
    tick: bin64_t;
}
export declare namespace MovePlayerPacket {
    enum Modes {
        Normal = 0,
        Reset = 1,
        Teleport = 2,
        Pitch = 3
    }
}
export declare class RiderJumpPacket extends Packet {
}
export declare class UpdateBlockPacket extends Packet {
    blockPos: BlockPos;
    blockRuntimeId: uint32_t;
    flags: uint8_t;
    dataLayerId: uint32_t;
}
export declare namespace UpdateBlockPacket {
    enum Flags {
        None = 0,
        Neighbors = 1,
        Network = 2,
        All = 3,
        NoGraphic = 4,
        Priority = 8,
        AllPriority = 11
    }
    enum DataLayerIds {
        Normal = 0,
        Liquid = 1
    }
}
export declare class AddPaintingPacket extends Packet {
}
export declare class TickSyncPacket extends Packet {
}
export declare class LevelSoundEventPacketV1 extends Packet {
}
export declare class LevelEventPacket extends Packet {
}
export declare class BlockEventPacket extends Packet {
    pos: BlockPos;
    type: int32_t;
    data: int32_t;
}
export declare class ActorEventPacket extends Packet {
    actorId: ActorRuntimeID;
    event: uint8_t;
    data: int32_t;
}
export declare namespace ActorEventPacket {
    enum Events {
        Jump = 1,
        HurtAnimation = 2,
        DeathAnimation = 3,
        ArmSwing = 4,
        StopAttack = 5,
        TameFail = 6,
        TameSuccess = 7,
        ShakeWet = 8,
        UseItem = 9,
        EatGrassAnimation = 10,
        FishHookBubble = 11,
        FishHookPosition = 12,
        FishHookHook = 13,
        FishHookTease = 14,
        SquidInkCloud = 15,
        ZombieVillagerCure = 16,
        AmbientSound = 17,
        Respawn = 18,
        IronGolemOfferFlower = 19,
        IronGolemWithdrawFlower = 20,
        LoveParticles = 21,
        VillagerAngry = 22,
        VillagerHappy = 23,
        WitchSpellParticles = 24,
        FireworkParticles = 25,
        InLoveParticles = 26,
        SilverfishSpawnAnimation = 27,
        GuardianAttack = 28,
        WitchDrinkPotion = 29,
        WitchThrowPotion = 30,
        MinecartTntPrimeFuse = 31,
        CreeperPrimeFuse = 32,
        AirSupplyExpired = 33,
        PlayerAddXpLevels = 34,
        ElderGuardianCurse = 35,
        AgentArmSwing = 36,
        EnderDragonDeath = 37,
        DustParticles = 38,
        ArrowShake = 39,
        EatingItem = 57,
        BabyAnimalFeed = 60,
        DeathSmokeCloud = 61,
        CompleteTrade = 62,
        RemoveLeash = 63,
        ConsumeTotem = 65,
        PlayerCheckTreasureHunterAchievement = 66,
        EntitySpawn = 67,
        DragonPuke = 68,
        ItemEntityMerge = 69,
        StartSwim = 70,
        BalloonPop = 71,
        TreasureHunt = 72,
        AgentSummon = 73,
        ChargedCrossbow = 74,
        Fall = 75
    }
}
export declare class MobEffectPacket extends Packet {
}
export declare class AttributeData extends NativeClass {
    current: number;
    min: number;
    max: number;
    default: number;
    name: HashedString;
    [NativeType.ctor](): void;
}
export declare class UpdateAttributesPacket extends Packet {
    actorId: ActorRuntimeID;
    attributes: CxxVector<AttributeData>;
}
export declare class InventoryTransactionPacket extends Packet {
    legacyRequestId: uint32_t;
    transaction: ComplexInventoryTransaction;
}
export declare class MobEquipmentPacket extends Packet {
    runtimeId: ActorRuntimeID;
    item: NetworkItemStackDescriptor;
    slot: uint8_t;
    selectedSlot: uint8_t;
    containerId: ContainerId;
}
export declare class MobArmorEquipmentPacket extends Packet {
}
export declare class InteractPacket extends Packet {
    action: uint8_t;
    actorId: ActorRuntimeID;
    pos: Vec3;
}
export declare namespace InteractPacket {
    enum Actions {
        LeaveVehicle = 3,
        Mouseover = 4,
        OpenNPC = 5,
        OpenInventory = 6
    }
}
export declare class BlockPickRequestPacket extends Packet {
}
export declare class ActorPickRequestPacket extends Packet {
}
export declare class PlayerActionPacket extends Packet {
    pos: BlockPos;
    face: int32_t;
    action: PlayerActionPacket.Actions;
    actorId: ActorRuntimeID;
}
export declare namespace PlayerActionPacket {
    enum Actions {
        /** @deprecated */
        StartBreak = 0,
        /** @deprecated */
        AbortBreak = 1,
        /** @deprecated */
        StopBreak = 2,
        GetUpdatedBlock = 3,
        /** @deprecated */
        DropItem = 4,
        StartSleeping = 5,
        StopSleeping = 6,
        Respawn = 7,
        /** @deprecated */
        Jump = 8,
        /** @deprecated */
        StartSprint = 9,
        /** @deprecated */
        StopSprint = 10,
        /** @deprecated */
        StartSneak = 11,
        /** @deprecated */
        StopSneak = 12,
        CreativePlayerDestroyBlock = 13,
        DimensionChangeAck = 14,
        /** @deprecated */
        StartGlide = 15,
        /** @deprecated */
        StopGlide = 16,
        /** @deprecated */
        BuildDenied = 17,
        CrackBreak = 18,
        /** @deprecated */
        ChangeSkin = 19,
        /** @deprecated */
        SetEnchantmentSeed = 20,
        /** @deprecated */
        StartSwimming = 21,
        /** @deprecated */
        StopSwimming = 22,
        StartSpinAttack = 23,
        StopSpinAttack = 24,
        InteractBlock = 25,
        PredictDestroyBlock = 26,
        ContinueDestroyBlock = 27
    }
}
export declare class EntityFallPacket extends Packet {
}
export declare class HurtArmorPacket extends Packet {
}
export declare class SetActorDataPacket extends Packet {
}
export declare class SetActorMotionPacket extends Packet {
}
export declare class SetActorLinkPacket extends Packet {
}
export declare class SetHealthPacket extends Packet {
    health: uint8_t;
}
export declare class SetSpawnPositionPacket extends Packet {
}
export declare class AnimatePacket extends Packet {
    actorId: ActorRuntimeID;
    action: int32_t;
    rowingTime: float32_t;
}
export declare namespace AnimatePacket {
    enum Actions {
        SwingArm = 1,
        WakeUp = 3,
        CriticalHit = 4,
        MagicCriticalHit = 5,
        RowRight = 128,
        RowLeft = 129
    }
}
export declare class RespawnPacket extends Packet {
}
export declare class ContainerOpenPacket extends Packet {
    /** @deprecated */
    windowId: uint8_t;
    containerId: ContainerId;
    type: ContainerType;
    pos: BlockPos;
    entityUniqueId: bin64_t;
    entityUniqueIdAsNumber: int64_as_float_t;
}
export declare class ContainerClosePacket extends Packet {
    /** @deprecated */
    windowId: uint8_t;
    containerId: ContainerId;
    server: bool_t;
}
export declare class PlayerHotbarPacket extends Packet {
    selectedSlot: uint32_t;
    selectHotbarSlot: bool_t;
    /** @deprecated */
    windowId: uint8_t;
    containerId: ContainerId;
}
export declare class InventoryContentPacket extends Packet {
    containerId: ContainerId;
    slots: CxxVector<NetworkItemStackDescriptor>;
}
export declare class InventorySlotPacket extends Packet {
}
export declare class ContainerSetDataPacket extends Packet {
}
export declare class CraftingDataPacket extends Packet {
}
export declare class CraftingEventPacket extends Packet {
    containerId: ContainerId;
    containerType: ContainerType;
    recipeId: mce.UUID;
    inputItems: CxxVector<NetworkItemStackDescriptor>;
    outputItems: CxxVector<NetworkItemStackDescriptor>;
}
export declare class GuiDataPickItemPacket extends Packet {
}
export declare class AdventureSettingsPacket extends Packet {
    flag1: uint32_t;
    commandPermission: uint32_t;
    flag2: uint32_t;
    playerPermission: uint32_t;
    actorId: ActorUniqueID;
    customFlag: uint32_t;
}
export declare class BlockActorDataPacket extends Packet {
}
export declare class PlayerInputPacket extends Packet {
}
export declare class LevelChunkPacket extends Packet {
}
export declare class SetCommandsEnabledPacket extends Packet {
    commandsEnabled: bool_t;
}
export declare class SetDifficultyPacket extends Packet {
    difficulty: uint32_t;
}
export declare class ChangeDimensionPacket extends Packet {
    dimensionId: uint32_t;
    x: float32_t;
    y: float32_t;
    z: float32_t;
    respawn: bool_t;
}
export declare class SetPlayerGameTypePacket extends Packet {
    playerGameType: GameType;
}
export declare class PlayerListPacket extends Packet {
}
export declare class SimpleEventPacket extends Packet {
    subtype: uint16_t;
}
export declare class TelemetryEventPacket extends Packet {
}
export declare class SpawnExperienceOrbPacket extends Packet {
    pos: Vec3;
    amount: int32_t;
}
export declare class MapItemDataPacket extends Packet {
}
export declare class MapInfoRequestPacket extends Packet {
}
export declare class RequestChunkRadiusPacket extends Packet {
}
export declare class ChunkRadiusUpdatedPacket extends Packet {
}
export declare class ItemFrameDropItemPacket extends Packet {
}
export declare class GameRulesChangedPacket extends Packet {
}
export declare class CameraPacket extends Packet {
}
export declare class BossEventPacket extends Packet {
    /** @deprecated */
    unknown: bin64_t;
    /** Always 1 */
    flagDarken: int32_t;
    /** Always 2 */
    flagFog: int32_t;
    /** Unique ID of the boss */
    entityUniqueId: bin64_t;
    playerUniqueId: bin64_t;
    type: uint32_t;
    title: CxxString;
    healthPercent: float32_t;
    color: BossEventPacket.Colors;
    overlay: BossEventPacket.Overlay;
    darkenScreen: bool_t;
    createWorldFog: bool_t;
}
export declare namespace BossEventPacket {
    enum Types {
        Show = 0,
        RegisterPlayer = 1,
        Hide = 2,
        UnregisterPlayer = 3,
        HealthPercent = 4,
        Title = 5,
        Properties = 6,
        Style = 7
    }
    enum Colors {
        Pink = 0,
        Blue = 1,
        Red = 2,
        Green = 3,
        Yellow = 4,
        Purple = 5,
        White = 6
    }
    enum Overlay {
        Progress = 0,
        Notched6 = 1,
        Notched10 = 2,
        Notched12 = 3,
        Notched20 = 4
    }
}
export declare class ShowCreditsPacket extends Packet {
}
declare class AvailableCommandsParamData extends NativeClass {
    paramName: CxxString;
    paramType: int32_t;
    isOptional: bool_t;
    flags: uint8_t;
}
declare class AvailableCommandsOverloadData extends NativeClass {
    parameters: CxxVector<AvailableCommandsParamData>;
}
declare class AvailableCommandsCommandData extends NativeClass {
    name: CxxString;
    description: CxxString;
    flags: uint16_t;
    permission: uint8_t;
    /** @deprecated use overloads */
    parameters: CxxVector<CxxVector<CxxString>>;
    overloads: CxxVector<AvailableCommandsOverloadData>;
    aliases: int32_t;
}
declare class AvailableCommandsEnumData extends NativeClass {
}
export declare class AvailableCommandsPacket extends Packet {
    enumValues: CxxVector<CxxString>;
    postfixes: CxxVector<CxxString>;
    enums: CxxVector<AvailableCommandsEnumData>;
    commands: CxxVector<AvailableCommandsCommandData>;
}
export declare namespace AvailableCommandsPacket {
    type CommandData = AvailableCommandsCommandData;
    const CommandData: typeof AvailableCommandsCommandData;
    type EnumData = AvailableCommandsEnumData;
    const EnumData: typeof AvailableCommandsEnumData;
}
export declare class CommandRequestPacket extends Packet {
    command: CxxString;
}
export declare class CommandBlockUpdatePacket extends Packet {
}
export declare class CommandOutputPacket extends Packet {
}
export declare class ResourcePackDataInfoPacket extends Packet {
}
export declare class ResourcePackChunkDataPacket extends Packet {
}
export declare class ResourcePackChunkRequestPacket extends Packet {
}
export declare class TransferPacket extends Packet {
    address: CxxString;
    port: uint16_t;
}
export declare class PlaySoundPacket extends Packet {
    soundName: CxxString;
    pos: BlockPos;
    volume: float32_t;
    pitch: float32_t;
}
export declare class StopSoundPacket extends Packet {
    soundName: CxxString;
    stopAll: bool_t;
}
export declare class SetTitlePacket extends Packet {
    type: int32_t;
    text: CxxString;
    fadeInTime: int32_t;
    stayTime: int32_t;
    fadeOutTime: int32_t;
}
export declare namespace SetTitlePacket {
    enum Types {
        Clear = 0,
        Reset = 1,
        Title = 2,
        Subtitle = 3,
        Actionbar = 4,
        AnimationTimes = 5
    }
}
export declare class AddBehaviorTreePacket extends Packet {
}
export declare class StructureBlockUpdatePacket extends Packet {
}
export declare class ShowStoreOfferPacket extends Packet {
}
export declare class PurchaseReceiptPacket extends Packet {
}
export declare class PlayerSkinPacket extends Packet {
}
export declare class SubClientLoginPacket extends Packet {
}
export declare class WSConnectPacket extends Packet {
}
export declare class SetLastHurtByPacket extends Packet {
}
export declare class BookEditPacket extends Packet {
    type: uint8_t;
    inventorySlot: int32_t;
    pageNumber: int32_t;
    secondaryPageNumber: int32_t;
    text: CxxString;
    author: CxxString;
    xuid: CxxString;
}
export declare namespace BookEditPacket {
    enum Types {
        ReplacePage = 0,
        AddPage = 1,
        DeletePage = 2,
        SwapPages = 3,
        SignBook = 4
    }
}
export declare class NpcRequestPacket extends Packet {
}
export declare class PhotoTransferPacket extends Packet {
}
export declare class ModalFormRequestPacket extends Packet {
    id: uint32_t;
    content: CxxString;
}
/** @deprecated use ModalFormRequestPacket, follow the real class name */
export declare const ShowModalFormPacket: typeof ModalFormRequestPacket;
/** @deprecated use ModalFormRequestPacket, follow the real class name */
export declare type ShowModalFormPacket = ModalFormRequestPacket;
export declare class ModalFormResponsePacket extends Packet {
    id: uint32_t;
    response: CxxString;
}
export declare class ServerSettingsRequestPacket extends Packet {
}
export declare class ServerSettingsResponsePacket extends Packet {
    id: uint32_t;
    content: CxxString;
}
export declare class ShowProfilePacket extends Packet {
}
export declare class SetDefaultGameTypePacket extends Packet {
}
export declare class RemoveObjectivePacket extends Packet {
    objectiveName: CxxString;
}
export declare class SetDisplayObjectivePacket extends Packet {
    displaySlot: 'list' | 'sidebar' | 'belowname' | '' | DisplaySlot;
    objectiveName: CxxString;
    displayName: CxxString;
    criteriaName: 'dummy' | '';
    sortOrder: ObjectiveSortOrder;
}
export declare class ScorePacketInfo extends NativeClass {
    scoreboardId: ScoreboardId;
    objectiveName: CxxString;
    score: int32_t;
    type: ScorePacketInfo.Type;
    playerEntityUniqueId: bin64_t;
    entityUniqueId: bin64_t;
    customName: CxxString;
}
export declare namespace ScorePacketInfo {
    enum Type {
        PLAYER = 1,
        ENTITY = 2,
        FAKE_PLAYER = 3
    }
}
export declare class SetScorePacket extends Packet {
    type: uint8_t;
    entries: CxxVector<ScorePacketInfo>;
}
export declare namespace SetScorePacket {
    enum Type {
        CHANGE = 0,
        REMOVE = 1
    }
}
export declare class LabTablePacket extends Packet {
}
export declare class UpdateBlockPacketSynced extends Packet {
}
export declare class MoveActorDeltaPacket extends Packet {
}
export declare class SetScoreboardIdentityPacket extends Packet {
}
export declare class SetLocalPlayerAsInitializedPacket extends Packet {
    actorId: ActorRuntimeID;
}
export declare class UpdateSoftEnumPacket extends Packet {
}
export declare class NetworkStackLatencyPacket extends Packet {
}
export declare class ScriptCustomEventPacket extends Packet {
}
export declare class SpawnParticleEffectPacket extends Packet {
    dimensionId: uint8_t;
    actorId: ActorUniqueID;
    pos: Vec3;
    particleName: CxxString;
}
/** @deprecated use SpawnParticleEffectPacket, follow real class name */
export declare const SpawnParticleEffect: typeof SpawnParticleEffectPacket;
/** @deprecated use SpawnParticleEffectPacket, follow real class name */
export declare type SpawnParticleEffect = SpawnParticleEffectPacket;
export declare class AvailableActorIdentifiersPacket extends Packet {
}
export declare class LevelSoundEventPacketV2 extends Packet {
}
export declare class NetworkChunkPublisherUpdatePacket extends Packet {
}
export declare class BiomeDefinitionList extends Packet {
}
export declare class LevelSoundEventPacket extends Packet {
    sound: uint32_t;
    pos: Vec3;
    extraData: int32_t;
    entityType: CxxString;
    isBabyMob: bool_t;
    disableRelativeVolume: bool_t;
}
export declare class LevelEventGenericPacket extends Packet {
}
export declare class LecternUpdatePacket extends Packet {
}
export declare class RemoveEntityPacket extends Packet {
}
export declare class ClientCacheStatusPacket extends Packet {
}
export declare class OnScreenTextureAnimationPacket extends Packet {
    animationType: int32_t;
}
export declare class MapCreateLockedCopy extends Packet {
}
export declare class StructureTemplateDataRequestPacket extends Packet {
}
export declare class StructureTemplateDataExportPacket extends Packet {
}
export declare class ClientCacheBlobStatusPacket extends Packet {
}
export declare class ClientCacheMissResponsePacket extends Packet {
}
export declare class EducationSettingsPacket extends Packet {
}
export declare class EmotePacket extends Packet {
}
export declare class MultiplayerSettingsPacket extends Packet {
}
export declare class SettingsCommandPacket extends Packet {
}
export declare class AnvilDamagePacket extends Packet {
}
export declare class CompletedUsingItemPacket extends Packet {
    itemId: int16_t;
    action: CompletedUsingItemPacket.Actions;
}
export declare namespace CompletedUsingItemPacket {
    enum Actions {
        EquipArmor = 0,
        Eat = 1,
        Attack = 2,
        Consume = 3,
        Throw = 4,
        Shoot = 5,
        Place = 6,
        FillBottle = 7,
        FillBucket = 8,
        PourBucket = 9,
        UseTool = 10,
        Interact = 11,
        Retrieved = 12,
        Dyed = 13,
        Traded = 14
    }
}
export declare class NetworkSettingsPacket extends Packet {
}
export declare class PlayerAuthInputPacket extends Packet {
    pitch: float32_t;
    yaw: float32_t;
    pos: Vec3;
    moveX: float32_t;
    moveZ: float32_t;
    heaYaw: float32_t;
    inputFlags: bin64_t;
    inputMode: uint32_t;
    playMode: uint32_t;
    vrGazeDirection: Vec3;
    tick: bin64_t;
    delta: Vec3;
}
export declare class CreativeContentPacket extends Packet {
}
export declare class PlayerEnchantOptionsPacket extends Packet {
}
export declare class ItemStackRequest extends Packet {
}
export declare class ItemStackResponse extends Packet {
}
export declare class PlayerArmorDamagePacket extends Packet {
}
export declare class CodeBuilderPacket extends Packet {
}
export declare class UpdatePlayerGameTypePacket extends Packet {
}
export declare class EmoteListPacket extends Packet {
}
export declare class PositionTrackingDBServerBroadcastPacket extends Packet {
    action: PositionTrackingDBServerBroadcastPacket.Actions;
    trackingId: int32_t;
}
export declare namespace PositionTrackingDBServerBroadcastPacket {
    enum Actions {
        Update = 0,
        Destroy = 1,
        NotFound = 2
    }
}
/** @deprecated use PositionTrackingDBServerBroadcastPacket, follow the real class name */
export declare const PositionTrackingDBServerBroadcast: typeof PositionTrackingDBServerBroadcastPacket;
/** @deprecated use PositionTrackingDBServerBroadcastPacket, follow the real class name */
export declare type PositionTrackingDBServerBroadcast = PositionTrackingDBServerBroadcastPacket;
export declare class PositionTrackingDBClientRequestPacket extends Packet {
    action: PositionTrackingDBClientRequestPacket.Actions;
    trackingId: int32_t;
}
export declare namespace PositionTrackingDBClientRequestPacket {
    enum Actions {
        Query = 0
    }
}
/** @deprecated Use PositionTrackingDBClientRequestPacket, follow the real class name */
export declare const PositionTrackingDBClientRequest: typeof PositionTrackingDBClientRequestPacket;
/** @deprecated Use PositionTrackingDBClientRequestPacket, follow the real class name */
export declare type PositionTrackingDBClientRequest = PositionTrackingDBClientRequestPacket;
export declare class DebugInfoPacket extends Packet {
}
export declare class PacketViolationWarningPacket extends Packet {
}
export declare class MotionPredictionHintsPacket extends Packet {
}
export declare class AnimateEntityPacket extends Packet {
}
export declare class CameraShakePacket extends Packet {
    intensity: float32_t;
    duration: float32_t;
    shakeType: uint8_t;
    shakeAction: uint8_t;
}
export declare namespace CameraShakePacket {
    enum ShakeType {
        Positional = 0,
        Rotational = 1
    }
    enum ShakeAction {
        Add = 0,
        Stop = 1
    }
}
export declare class PlayerFogPacket extends Packet {
}
export declare class CorrectPlayerMovePredictionPacket extends Packet {
}
export declare class ItemComponentPacket extends Packet {
}
export declare class FilterTextPacket extends Packet {
}
export declare class ClientboundDebugRendererPacket extends Packet {
}
export declare class SyncActorPropertyPacket extends Packet {
}
export declare class AddVolumeEntityPacket extends Packet {
}
export declare class RemoveVolumeEntityPacket extends Packet {
}
export declare class SimulationTypePacket extends Packet {
}
export declare class NpcDialoguePacket extends Packet {
    /** ActorUniqueID of the Npc */
    actorId: ActorUniqueID;
    action: NpcDialoguePacket.Actions;
    /** Always empty */
    actorIdAsNumber: int64_as_float_t;
}
export declare namespace NpcDialoguePacket {
    enum Actions {
        Open = 0,
        Close = 1
    }
}
export declare const PacketIdToType: {
    1: typeof LoginPacket;
    2: typeof PlayStatusPacket;
    3: typeof ServerToClientHandshakePacket;
    4: typeof ClientToServerHandshakePacket;
    5: typeof DisconnectPacket;
    6: typeof ResourcePacksInfoPacket;
    7: typeof ResourcePackStackPacket;
    8: typeof ResourcePackClientResponsePacket;
    9: typeof TextPacket;
    10: typeof SetTimePacket;
    11: typeof StartGamePacket;
    12: typeof AddPlayerPacket;
    13: typeof AddActorPacket;
    14: typeof RemoveActorPacket;
    15: typeof AddItemActorPacket;
    17: typeof TakeItemActorPacket;
    18: typeof MoveActorAbsolutePacket;
    19: typeof MovePlayerPacket;
    20: typeof RiderJumpPacket;
    21: typeof UpdateBlockPacket;
    22: typeof AddPaintingPacket;
    23: typeof TickSyncPacket;
    24: typeof LevelSoundEventPacketV1;
    25: typeof LevelEventPacket;
    26: typeof BlockEventPacket;
    27: typeof ActorEventPacket;
    28: typeof MobEffectPacket;
    29: typeof UpdateAttributesPacket;
    30: typeof InventoryTransactionPacket;
    31: typeof MobEquipmentPacket;
    32: typeof MobArmorEquipmentPacket;
    33: typeof InteractPacket;
    34: typeof BlockPickRequestPacket;
    35: typeof ActorPickRequestPacket;
    36: typeof PlayerActionPacket;
    38: typeof HurtArmorPacket;
    39: typeof SetActorDataPacket;
    40: typeof SetActorMotionPacket;
    41: typeof SetActorLinkPacket;
    42: typeof SetHealthPacket;
    43: typeof SetSpawnPositionPacket;
    44: typeof AnimatePacket;
    45: typeof RespawnPacket;
    46: typeof ContainerOpenPacket;
    47: typeof ContainerClosePacket;
    48: typeof PlayerHotbarPacket;
    49: typeof InventoryContentPacket;
    50: typeof InventorySlotPacket;
    51: typeof ContainerSetDataPacket;
    52: typeof CraftingDataPacket;
    53: typeof CraftingEventPacket;
    54: typeof GuiDataPickItemPacket;
    55: typeof AdventureSettingsPacket;
    56: typeof BlockActorDataPacket;
    57: typeof PlayerInputPacket;
    58: typeof LevelChunkPacket;
    59: typeof SetCommandsEnabledPacket;
    60: typeof SetDifficultyPacket;
    61: typeof ChangeDimensionPacket;
    62: typeof SetPlayerGameTypePacket;
    63: typeof PlayerListPacket;
    64: typeof SimpleEventPacket;
    65: typeof TelemetryEventPacket;
    66: typeof SpawnExperienceOrbPacket;
    67: typeof MapItemDataPacket;
    68: typeof MapInfoRequestPacket;
    69: typeof RequestChunkRadiusPacket;
    70: typeof ChunkRadiusUpdatedPacket;
    71: typeof ItemFrameDropItemPacket;
    72: typeof GameRulesChangedPacket;
    73: typeof CameraPacket;
    74: typeof BossEventPacket;
    75: typeof ShowCreditsPacket;
    76: typeof AvailableCommandsPacket;
    77: typeof CommandRequestPacket;
    78: typeof CommandBlockUpdatePacket;
    79: typeof CommandOutputPacket;
    82: typeof ResourcePackDataInfoPacket;
    83: typeof ResourcePackChunkDataPacket;
    84: typeof ResourcePackChunkRequestPacket;
    85: typeof TransferPacket;
    86: typeof PlaySoundPacket;
    87: typeof StopSoundPacket;
    88: typeof SetTitlePacket;
    89: typeof AddBehaviorTreePacket;
    90: typeof StructureBlockUpdatePacket;
    91: typeof ShowStoreOfferPacket;
    92: typeof PurchaseReceiptPacket;
    93: typeof PlayerSkinPacket;
    94: typeof SubClientLoginPacket;
    95: typeof WSConnectPacket;
    96: typeof SetLastHurtByPacket;
    97: typeof BookEditPacket;
    98: typeof NpcRequestPacket;
    99: typeof PhotoTransferPacket;
    100: typeof ModalFormRequestPacket;
    101: typeof ModalFormResponsePacket;
    102: typeof ServerSettingsRequestPacket;
    103: typeof ServerSettingsResponsePacket;
    104: typeof ShowProfilePacket;
    105: typeof SetDefaultGameTypePacket;
    106: typeof RemoveObjectivePacket;
    107: typeof SetDisplayObjectivePacket;
    108: typeof SetScorePacket;
    109: typeof LabTablePacket;
    110: typeof UpdateBlockPacketSynced;
    111: typeof MoveActorDeltaPacket;
    112: typeof SetScoreboardIdentityPacket;
    113: typeof SetLocalPlayerAsInitializedPacket;
    114: typeof UpdateSoftEnumPacket;
    115: typeof NetworkStackLatencyPacket;
    117: typeof ScriptCustomEventPacket;
    118: typeof SpawnParticleEffectPacket;
    119: typeof AvailableActorIdentifiersPacket;
    120: typeof LevelSoundEventPacketV2;
    121: typeof NetworkChunkPublisherUpdatePacket;
    122: typeof BiomeDefinitionList;
    123: typeof LevelSoundEventPacket;
    124: typeof LevelEventGenericPacket;
    125: typeof LecternUpdatePacket;
    128: typeof RemoveEntityPacket;
    129: typeof ClientCacheStatusPacket;
    130: typeof OnScreenTextureAnimationPacket;
    131: typeof MapCreateLockedCopy;
    132: typeof StructureTemplateDataRequestPacket;
    133: typeof StructureTemplateDataExportPacket;
    135: typeof ClientCacheBlobStatusPacket;
    136: typeof ClientCacheMissResponsePacket;
    137: typeof EducationSettingsPacket;
    138: typeof EmotePacket;
    139: typeof MultiplayerSettingsPacket;
    140: typeof SettingsCommandPacket;
    141: typeof AnvilDamagePacket;
    142: typeof CompletedUsingItemPacket;
    143: typeof NetworkSettingsPacket;
    144: typeof PlayerAuthInputPacket;
    145: typeof CreativeContentPacket;
    146: typeof PlayerEnchantOptionsPacket;
    147: typeof ItemStackRequest;
    148: typeof ItemStackResponse;
    149: typeof PlayerArmorDamagePacket;
    150: typeof CodeBuilderPacket;
    151: typeof UpdatePlayerGameTypePacket;
    152: typeof EmoteListPacket;
    153: typeof PositionTrackingDBServerBroadcastPacket;
    154: typeof PositionTrackingDBClientRequestPacket;
    155: typeof DebugInfoPacket;
    156: typeof PacketViolationWarningPacket;
    157: typeof MotionPredictionHintsPacket;
    158: typeof AnimateEntityPacket;
    159: typeof CameraShakePacket;
    160: typeof PlayerFogPacket;
    161: typeof CorrectPlayerMovePredictionPacket;
    162: typeof ItemComponentPacket;
    163: typeof FilterTextPacket;
    164: typeof ClientboundDebugRendererPacket;
    165: typeof SyncActorPropertyPacket;
    166: typeof AddVolumeEntityPacket;
    167: typeof RemoveVolumeEntityPacket;
    168: typeof SimulationTypePacket;
    169: typeof NpcDialoguePacket;
};
export declare type PacketIdToType = {
    [key in keyof typeof PacketIdToType]: InstanceType<typeof PacketIdToType[key]>;
};
export {};

import { Color } from "colors";
import type { CommandContext } from "./bds/command";
import type { NetworkIdentifier } from "./bds/networkidentifier";
import { MinecraftPacketIds } from "./bds/packetids";
import { CANCEL } from "./common";
import { Event } from "./eventtarget";
import type { BlockDestroyEvent, BlockPlaceEvent, CampfireTryDouseFire, CampfireTryLightFire, FarmlandDecayEvent, PistonMoveEvent } from "./event_impl/blockevent";
import type { EntityCreatedEvent, EntityDieEvent, EntityHeathChangeEvent, EntityHurtEvent, EntitySneakEvent, EntityStartRidingEvent, EntityStartSwimmingEvent, EntityStopRidingEvent, PlayerAttackEvent, PlayerCritEvent, PlayerDropItemEvent, PlayerInventoryChangeEvent, PlayerJoinEvent, PlayerLevelUpEvent, PlayerPickupItemEvent, PlayerRespawnEvent, PlayerUseItemEvent, SplashPotionHitEvent } from "./event_impl/entityevent";
import type { LevelExplodeEvent, LevelSaveEvent, LevelTickEvent, LevelWeatherChangeEvent } from "./event_impl/levelevent";
import type { ObjectiveCreateEvent, QueryRegenerateEvent, ScoreAddEvent, ScoreRemoveEvent, ScoreResetEvent, ScoreSetEvent } from "./event_impl/miscevent";
import type { nethook } from "./nethook";
export declare namespace events {
    /** Cancellable */
    const blockDestroy: Event<(event: BlockDestroyEvent) => void | CANCEL>;
    /** Cancellable */
    const blockPlace: Event<(event: BlockPlaceEvent) => void | CANCEL>;
    /** Not cancellable */
    const pistonMove: Event<(event: PistonMoveEvent) => void>;
    /** Cancellable */
    const farmlandDecay: Event<(event: FarmlandDecayEvent) => void | CANCEL>;
    /** Cancellable but requires additional stimulation */
    const campfireLight: Event<(event: CampfireTryLightFire) => void | CANCEL>;
    /** Cancellable but requires additional stimulation */
    const campfireDouse: Event<(event: CampfireTryDouseFire) => void | CANCEL>;
    /** Cancellable */
    const entityHurt: Event<(event: EntityHurtEvent) => void | CANCEL>;
    /** Not cancellable */
    const entityHealthChange: Event<(event: EntityHeathChangeEvent) => void>;
    /** Not cancellable */
    const entityDie: Event<(event: EntityDieEvent) => void>;
    /** Not cancellable */
    const entitySneak: Event<(event: EntitySneakEvent) => void>;
    /** Cancellable */
    const entityStartSwimming: Event<(event: EntityStartSwimmingEvent) => void | CANCEL>;
    /** Cancellable */
    const entityStartRiding: Event<(event: EntityStartRidingEvent) => void | CANCEL>;
    /** Cancellable but the client is still exiting though it will automatically ride again after rejoin */
    const entityStopRiding: Event<(event: EntityStopRidingEvent) => void | CANCEL>;
    /** Cancellable */
    const playerAttack: Event<(event: PlayerAttackEvent) => void | CANCEL>;
    /** Cancellable but only when player is in container screens*/
    const playerDropItem: Event<(event: PlayerDropItemEvent) => void | CANCEL>;
    /** Not cancellable */
    const playerInventoryChange: Event<(event: PlayerInventoryChangeEvent) => void | CANCEL>;
    /** Not cancellable */
    const playerRespawn: Event<(event: PlayerRespawnEvent) => void | CANCEL>;
    /** Cancellable */
    const playerLevelUp: Event<(event: PlayerLevelUpEvent) => void | CANCEL>;
    /** Not cancellable */
    const entityCreated: Event<(event: EntityCreatedEvent) => void>;
    /** Not cancellable */
    const playerJoin: Event<(event: PlayerJoinEvent) => void>;
    /** Cancellable */
    const playerPickupItem: Event<(event: PlayerPickupItemEvent) => void | CANCEL>;
    /** Not cancellable */
    const playerCrit: Event<(event: PlayerCritEvent) => void>;
    /** Not cancellable */
    const playerUseItem: Event<(event: PlayerUseItemEvent) => void>;
    /** Cancellable */
    const splashPotionHit: Event<(event: SplashPotionHitEvent) => void | CANCEL>;
    /** Cancellable */
    const levelExplode: Event<(event: LevelExplodeEvent) => void | CANCEL>;
    /** Not cancellable */
    const levelTick: Event<(event: LevelTickEvent) => void>;
    /** Cancellable but you won't be able to stop the server */
    const levelSave: Event<(event: LevelSaveEvent) => void | CANCEL>;
    /** Cancellable */
    const levelWeatherChange: Event<(event: LevelWeatherChangeEvent) => void | CANCEL>;
    /**
     * before launched. after execute the main thread of BDS.
     * BDS will be loaded on the separated thread. this event will be executed concurrently with the BDS loading
     */
    const serverLoading: Event<() => void>;
    /**
     * after BDS launched
     */
    const serverOpen: Event<() => void>;
    /**
     * on tick
     */
    const serverUpdate: Event<() => void>;
    /**
     * before system.shutdown, Minecraft is alive yet
     */
    const serverStop: Event<() => void>;
    /**
     * after BDS closed
     */
    const serverClose: Event<() => void>;
    /**
     * server console outputs
     */
    const serverLog: Event<(log: string, color: Color) => CANCEL | void>;
    enum PacketEventType {
        Raw = 0,
        Before = 1,
        After = 2,
        Send = 3,
        SendRaw = 4
    }
    function packetEvent(type: PacketEventType, packetId: MinecraftPacketIds): Event<(...args: any[]) => (CANCEL | void)> | null;
    /**
     * before 'before' and 'after'
     * earliest event for the packet receiving.
     * It will bring raw packet buffers before parsing
     * It can be canceled the packet if you return 'CANCEL'
     */
    function packetRaw(id: MinecraftPacketIds): Event<nethook.RawListener>;
    /**
     * after 'raw', before 'after'
     * the event that before processing but after parsed from raw.
     * It can be canceled the packet if you return 'CANCEL'
     */
    function packetBefore<ID extends MinecraftPacketIds>(id: ID): Event<nethook.PacketListener<ID>>;
    /**
     * after 'raw' and 'before'
     * the event that after processing. some fields are assigned after the processing
     */
    function packetAfter<ID extends MinecraftPacketIds>(id: ID): Event<nethook.PacketListener<ID>>;
    /**
     * before serializing.
     * it can modify class fields.
     */
    function packetSend<ID extends MinecraftPacketIds>(id: ID): Event<nethook.PacketListener<ID>>;
    /**
     * after serializing. before sending.
     * it can access serialized buffer.
     */
    function packetSendRaw(id: number): Event<nethook.SendRawListener>;
    /** Not cancellable */
    const queryRegenerate: Event<(event: QueryRegenerateEvent) => void>;
    /** Cancellable */
    const scoreReset: Event<(event: ScoreResetEvent) => void | CANCEL>;
    /** Cancellable */
    const scoreSet: Event<(event: ScoreSetEvent) => void | CANCEL>;
    /** Cancellable */
    const scoreAdd: Event<(event: ScoreAddEvent) => void | CANCEL>;
    /** Cancellable */
    const scoreRemove: Event<(event: ScoreRemoveEvent) => void | CANCEL>;
    /** Cancellable */
    const objectiveCreate: Event<(event: ObjectiveCreateEvent) => void | CANCEL>;
    /**
    * global error listeners
    * if returns 'CANCEL', then default error printing is disabled
    */
    const error: Event<(error: any) => void | CANCEL>;
    function errorFire(err: unknown): void;
    /**
     * command console outputs
     */
    const commandOutput: Event<(log: string) => CANCEL | void>;
    /**
     * command input
     * Commands will be canceled if you return a error code.
     * 0 means success for error codes but others are unknown.
     */
    const command: Event<(command: string, originName: string, ctx: CommandContext) => void | number>;
    /**
      * network identifier disconnected
      */
    const networkDisconnected: Event<(ni: NetworkIdentifier) => void>;
}

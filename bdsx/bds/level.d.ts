import { VoidPointer } from "../core";
import { CxxVector, CxxVectorLike } from "../cxxvector";
import { NativeClass } from "../nativeclass";
import { Actor, ActorUniqueID, DimensionId, EntityRefTraits } from "./actor";
import { BlockSource } from "./block";
import { BlockPos } from "./blockpos";
import { Dimension } from "./dimension";
import { GameRules } from "./gamerules";
import { ServerPlayer } from "./player";
import { Scoreboard } from "./scoreboard";
export declare enum Difficulty {
    Peaceful = 0,
    Easy = 1,
    Normal = 2,
    Hard = 3
}
export declare class Level extends NativeClass {
    vftable: VoidPointer;
    /** @deprecated use getPlayers() */
    get players(): CxxVectorLike<ServerPlayer>;
    getPlayers(): ServerPlayer[];
    getUsers(): CxxVector<EntityRefTraits>;
    createDimension(id: DimensionId): Dimension;
    destroyBlock(blockSource: BlockSource, blockPos: BlockPos, dropResources: boolean): boolean;
    fetchEntity(id: ActorUniqueID, fetchRemovedActor: boolean): Actor | null;
    getActivePlayerCount(): number;
    getActorFactory(): ActorFactory;
    getAdventureSettings(): AdventureSettings;
    getBlockPalette(): BlockPalette;
    getDimension(dimension: DimensionId): Dimension | null;
    getLevelData(): LevelData;
    getGameRules(): GameRules;
    getScoreboard(): Scoreboard;
    getSeed(): number;
    getTagRegistry(): TagRegistry;
    hasCommandsEnabled(): boolean;
    setCommandsEnabled(value: boolean): void;
    setShouldSendSleepMessage(value: boolean): void;
    syncGameRules(): void;
}
export declare class ServerLevel extends Level {
}
export declare class LevelData extends NativeClass {
    getGameDifficulty(): Difficulty;
    setGameDifficulty(value: Difficulty): void;
}
export declare class ActorFactory extends NativeClass {
}
export declare class BlockPalette extends NativeClass {
}
export declare class AdventureSettings extends NativeClass {
}
export declare class TagRegistry extends NativeClass {
}

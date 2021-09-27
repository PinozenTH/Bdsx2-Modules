import { StaticPointer } from "../core";
import { CxxVector } from "../cxxvector";
import { NativeClass } from "../nativeclass";
import { bin64_t, bool_t, CxxString, int32_t, int64_as_float_t, uint32_t, uint8_t } from "../nativetype";
import { Actor, ActorUniqueID } from "./actor";
import type { Player } from "./player";
export declare class Scoreboard extends NativeClass {
    sync(id: ScoreboardId, objective: Objective): void;
    addObjective(name: string, displayName: string, criteria: ObjectiveCriteria): Objective;
    /**
     *  @param name currently only 'dummy'
     */
    getCriteria(name: string): ObjectiveCriteria | null;
    getDisplayObjective(displaySlot: DisplaySlot): DisplayObjective | null;
    getObjectiveNames(): string[];
    getObjective(name: string): Objective | null;
    getObjectives(): Objective[];
    getActorScoreboardId(actor: Actor): ScoreboardId;
    getFakePlayerScoreboardId(name: string): ScoreboardId;
    getPlayerScoreboardId(player: Player): ScoreboardId;
    getScoreboardIdentityRef(id: ScoreboardId): ScoreboardIdentityRef;
    protected _getScoreboardIdentityRefs(retstr: CxxVector<ScoreboardIdentityRef>): CxxVector<ScoreboardIdentityRef>;
    getScoreboardIdentityRefs(): ScoreboardIdentityRef[];
    protected _getTrackedIds(retstr: CxxVector<ScoreboardId>): CxxVector<ScoreboardId>;
    getTrackedIds(): ScoreboardId[];
    removeObjective(objective: Objective): boolean;
    clearDisplayObjective(displaySlot: string): Objective | null;
    setDisplayObjective(displaySlot: DisplaySlot, objective: Objective, order: ObjectiveSortOrder): DisplayObjective | null;
    getPlayerScore(id: ScoreboardId, objective: Objective): number | null;
    resetPlayerScore(id: ScoreboardId, objective: Objective): void;
    setPlayerScore(id: ScoreboardId, objective: Objective, value: number): number;
    addPlayerScore(id: ScoreboardId, objective: Objective, value: number): number;
    removePlayerScore(id: ScoreboardId, objective: Objective, value: number): number;
}
export declare class ObjectiveCriteria extends NativeClass {
    name: CxxString;
    readOnly: bool_t;
    renderType: uint8_t;
}
export declare class Objective extends NativeClass {
    name: CxxString;
    displayName: CxxString;
    criteria: ObjectiveCriteria;
    getPlayers(): ScoreboardId[];
    getPlayerScore(id: ScoreboardId): ScoreInfo;
}
export declare class DisplayObjective extends NativeClass {
    objective: Objective | null;
    order: ObjectiveSortOrder;
}
export declare class IdentityDefinition extends NativeClass {
    getEntityId(): ActorUniqueID;
    getPlayerId(): ActorUniqueID;
    getFakePlayerName(): string;
    getIdentityType(): IdentityDefinition.Type;
    getName(): string | null;
}
export declare namespace IdentityDefinition {
    enum Type {
        Invalid = 0,
        Player = 1,
        Entity = 2,
        FakePlayer = 3
    }
}
export declare class ScoreboardId extends NativeClass {
    id: bin64_t;
    idAsNumber: int64_as_float_t;
    identityDef: IdentityDefinition;
}
export declare class ScoreInfo extends NativeClass {
    objective: Objective | null;
    valid: bool_t;
    value: int32_t;
}
export declare class ScoreboardIdentityRef extends NativeClass {
    objectiveReferences: uint32_t;
    scoreboardId: ScoreboardId;
    protected _modifyScoreInObjective(result: StaticPointer, objective: Objective, score: number, action: PlayerScoreSetFunction): boolean;
    modifyScoreInObjective(objective: Objective, score: number, action: PlayerScoreSetFunction): number;
}
export declare enum DisplaySlot {
    BelowName = "belowname",
    List = "list",
    Sidebar = "sidebar"
}
export declare enum ObjectiveSortOrder {
    Ascending = 0,
    Descending = 1
}
export declare enum PlayerScoreSetFunction {
    Set = 0,
    Add = 1,
    Subtract = 2
}
export declare enum ScoreCommandOperator {
    Equals = 1,
    PlusEquals = 2,
    MinusEquals = 3,
    TimesEquals = 4,
    DivideEquals = 5,
    ModEquals = 6,
    MinEquals = 7,
    MaxEquals = 8,
    Swap = 9
}

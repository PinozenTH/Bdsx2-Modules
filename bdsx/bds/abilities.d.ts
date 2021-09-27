import { NativeClass } from "../nativeclass";
import { bool_t, float32_t } from "../nativetype";
import type { CommandPermissionLevel } from "./command";
import type { PlayerPermission } from "./player";
export declare class Abilities extends NativeClass {
    protected _setAbility(abilityIndex: AbilitiesIndex, value: boolean): void;
    getCommandPermissionLevel(): CommandPermissionLevel;
    getPlayerPermissionLevel(): PlayerPermission;
    setCommandPermissionLevel(commandPermissionLevel: CommandPermissionLevel): void;
    setPlayerPermissionLevel(playerPermissionLevel: PlayerPermission): void;
    getAbility(abilityIndex: AbilitiesIndex): Ability;
    setAbility(abilityIndex: AbilitiesIndex, value: boolean | number): void;
    static getAbilityName(abilityIndex: AbilitiesIndex): string;
    static nameToAbilityIndex(name: string): AbilitiesIndex;
}
export declare enum AbilitiesIndex {
    Build = 0,
    Mine = 1,
    DoorsAndSwitches = 2,
    OpenContainers = 3,
    AttackPlayers = 4,
    AttackMobs = 5,
    OperatorCommands = 6,
    Teleport = 7,
    /** Both are 8 */
    ExposedAbilityCount = 8,
    Invulnerable = 8,
    Flying = 9,
    MayFly = 10,
    Instabuild = 11,
    Lightning = 12,
    FlySpeed = 13,
    WalkSpeed = 14,
    Muted = 15,
    WorldBuilder = 16,
    NoClip = 17,
    AbilityCount = 18
}
export declare class Ability extends NativeClass {
    type: Ability.Type;
    value: Ability.Value;
    options: Ability.Options;
    getBool(): boolean;
    getFloat(): number;
    setBool(value: boolean): void;
    setFloat(value: number): void;
    getValue(): boolean | number | undefined;
    setValue(value: boolean | number): void;
}
export declare namespace Ability {
    enum Type {
        Invalid = 0,
        Unset = 1,
        Bool = 2,
        Float = 3
    }
    enum Options {
        None = 0,
        NoSave = 1,
        CommandExposed = 2,
        PermissionsInterfaceExposed = 4,
        WorldbuilderOverrides = 8,
        NoSaveCommandExposed = 3,
        NoSavePermissionsInterfaceExposed = 5,
        CommandExposedPermissionsInterfaceExposed = 6,
        NoSaveCommandExposedPermissionsInterfaceExposed = 7,
        NoSaveWorldbuilderOverrides = 9,
        CommandExposedWorldbuilderOverrides = 10,
        NoSaveCommandExposedWorldbuilderOverrides = 11,
        PermissionsInterfaceExposedWorldbuilderOverrides = 12,
        NoSavePermissionsInterfaceExposedWorldbuilderOverrides = 13,
        CommandExposedPermissionsInterfaceExposedWorldbuilderOverrides = 14,
        All = 15
    }
    class Value extends NativeClass {
        boolVal: bool_t;
        floatVal: float32_t;
    }
}

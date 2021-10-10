"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packetids_1 = require("bdsx/bds/packetids");
const common_1 = require("bdsx/common");
const event_1 = require("bdsx/event");
const inventory_1 = require("bdsx/bds/inventory");
const index_1 = require("../../index");
const actor_1 = require("bdsx/bds/actor");
const player_1 = require("bdsx/bds/player");
const abilities_1 = require("bdsx/bds/abilities");
const server_1 = require("bdsx/bds/server");
// const system = server.registerSystem(0, 0);
function check(actor) {
    const target = actor.getNetworkIdentifier();
    if (actor.getGameType() !== player_1.GameType.Creative && actor.getGameType() !== player_1.GameType.CreativeSpectator) {
        if (actor.getStatusFlag(actor_1.ActorFlags.CanFly) || actor.abilities.getAbility(abilities_1.AbilitiesIndex.MayFly).value.boolVal) {
            (0, index_1.Disconnect)(target, '§e§l[PinozenTH AntiHack] §cDETECTED FLY HACK');
            return;
        }
        if (actor.abilities.getAbility(abilities_1.AbilitiesIndex.Instabuild).value.boolVal) {
            (0, index_1.Disconnect)(target, '§e§l[PinozenTH AntiHack] §cDETECTED InstaBuild HACK');
            return;
        }
    }
    if (actor.abilities.getAbility(abilities_1.AbilitiesIndex.NoClip).value.boolVal) {
        (0, index_1.Disconnect)(target, '§e§l[PinozenTH AntiHack] §cDETECTED NoClip HACK');
        return;
    }
}
event_1.events.packetBefore(packetids_1.MinecraftPacketIds.MovePlayer).on((pkt, target) => {
    const actor = target.getActor();
    check(actor);
});
const i = setInterval(() => {
    const level = server_1.serverInstance.minecraft.getLevel();
    if (level === null || level === undefined)
        return;
    level.players.toArray().forEach((v) => {
        check(v);
    });
}, 3000);
event_1.events.packetRaw(packetids_1.MinecraftPacketIds.InventoryTransaction).on((pkt, size, target) => {
    try {
        let Arr = [];
        for (let i = 0; i <= size; i++) {
            try {
                Arr.push(pkt.readVarUint());
            }
            catch (_a) {
                Arr.push("crashed");
            }
        }
        let type = Arr[2];
        if (type === inventory_1.ComplexInventoryTransaction.Type.InventoryMismatch) {
            if (Arr[3] === 28 && Arr[8] === 99999) {
                setTimeout(() => { (0, index_1.Disconnect)(target, '§e§l[PinozenTH AntiHack] §cDETECTED INVENTORY HACK'); }, 100);
                return common_1.CANCEL;
            }
        }
    }
    catch (_b) {
        return;
    }
});
index_1.StopRequested.on(() => {
    clearInterval(i);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW50aWNoZWF0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW50aWNoZWF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0RBQXdEO0FBQ3hELHdDQUFxQztBQUNyQyxzQ0FBb0M7QUFDcEMsa0RBQWlFO0FBQ2pFLHVDQUE0RTtBQUM1RSwwQ0FBNEM7QUFDNUMsNENBQXlEO0FBQ3pELGtEQUFvRDtBQUNwRCw0Q0FBaUQ7QUFFakQsOENBQThDO0FBRTlDLFNBQVMsS0FBSyxDQUFDLEtBQWtCO0lBQzdCLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQzVDLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLGlCQUFRLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxpQkFBUSxDQUFDLGlCQUFpQixFQUFFO1FBQ2pHLElBQUksS0FBSyxDQUFDLGFBQWEsQ0FBQyxrQkFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLDBCQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUMzRyxJQUFBLGtCQUFVLEVBQUMsTUFBTSxFQUFFLDhDQUE4QyxDQUFDLENBQUM7WUFDbkUsT0FBTztTQUNWO1FBQ0QsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQywwQkFBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDckUsSUFBQSxrQkFBVSxFQUFDLE1BQU0sRUFBRSxxREFBcUQsQ0FBQyxDQUFDO1lBQzFFLE9BQU87U0FDVjtLQUNKO0lBQ0QsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQywwQkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUU7UUFDakUsSUFBQSxrQkFBVSxFQUFDLE1BQU0sRUFBRSxpREFBaUQsQ0FBQyxDQUFDO1FBQ3RFLE9BQU87S0FDVjtBQUNMLENBQUM7QUFFRCxjQUFNLENBQUMsWUFBWSxDQUFDLDhCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUMsRUFBRTtJQUNqRSxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFHLENBQUM7SUFDakMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2pCLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLEdBQUcsV0FBVyxDQUFDLEdBQUUsRUFBRTtJQUN0QixNQUFNLEtBQUssR0FBRyx1QkFBYyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsRCxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLFNBQVM7UUFBRSxPQUFPO0lBQ2xELEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUU7UUFDakMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2IsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFFVCxjQUFNLENBQUMsU0FBUyxDQUFDLDhCQUFrQixDQUFDLG9CQUFvQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUMvRSxJQUFJO1FBQ0EsSUFBSSxHQUFHLEdBQVMsRUFBRSxDQUFDO1FBQ25CLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUM7WUFDeEIsSUFBRztnQkFDQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO2FBQy9CO1lBQUMsV0FBTTtnQkFDSixHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3ZCO1NBQ0o7UUFDRCxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEIsSUFBSSxJQUFJLEtBQUssdUNBQTJCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzdELElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFO2dCQUNuQyxVQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBQSxrQkFBVSxFQUFDLE1BQU0sRUFBRSxvREFBb0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNyRyxPQUFPLGVBQU0sQ0FBQzthQUNqQjtTQUNKO0tBQ0o7SUFBQyxXQUFNO1FBQUMsT0FBTTtLQUFDO0FBQ3BCLENBQUMsQ0FBQyxDQUFDO0FBRUgscUJBQWEsQ0FBQyxFQUFFLENBQUMsR0FBRSxFQUFFO0lBQ2pCLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyQixDQUFDLENBQUMsQ0FBQyJ9
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onUseItem = void 0;
const inventory_1 = require("bdsx/bds/inventory");
const event_1 = require("bdsx/event");
const launcher_1 = require("bdsx/launcher");
const eventtarget_1 = require("bdsx/eventtarget");
const packetids_1 = require("bdsx/bds/packetids");
let system;
event_1.events.serverOpen.on(() => {
    system = server.registerSystem(0, 0);
});
if (launcher_1.bedrockServer.isLaunched())
    system = server.registerSystem(0, 0);
let timeout = new Map();
event_1.events.packetBefore(packetids_1.MinecraftPacketIds.InventoryTransaction).on((pkt, target) => {
    if (pkt.transaction.type === inventory_1.ComplexInventoryTransaction.Type.ItemUseTransaction) {
        let actor = target.getActor();
        if (actor === null)
            return;
        let entity = actor.getEntity();
        let itemStack = actor.getMainhandSlot();
        let hand = system.getComponent(entity, "minecraft:hand_container");
        if (hand === null)
            return;
        let mainhand = hand.data[0].__identifier__;
        if (timeout.has(target)) {
            clearTimeout(timeout.get(target));
            timeout.set(target, setTimeout(() => {
                timeout.delete(target);
            }, 300));
        }
        else {
            timeout.set(target, setTimeout(() => {
                timeout.delete(target);
            }, 300));
            return exports.onUseItem.fire(target, mainhand, itemStack);
        }
    }
});
exports.onUseItem = new eventtarget_1.Event();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25Vc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvblVzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxrREFBNkY7QUFHN0Ysc0NBQW9DO0FBQ3BDLDRDQUE4QztBQUM5QyxrREFBeUM7QUFDekMsa0RBQXdEO0FBQ3hELElBQUksTUFBNEIsQ0FBQztBQUNqQyxjQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxHQUFFLEVBQUU7SUFDckIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hDLENBQUMsQ0FBQyxDQUFDO0FBQ0gsSUFBSSx3QkFBYSxDQUFDLFVBQVUsRUFBRTtJQUFFLE1BQU0sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztBQUVwRSxJQUFJLE9BQU8sR0FBRyxJQUFJLEdBQUcsRUFBcUMsQ0FBQztBQUUzRCxjQUFNLENBQUMsWUFBWSxDQUFDLDhCQUFrQixDQUFDLG9CQUFvQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBQyxFQUFFO0lBQzNFLElBQUksR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssdUNBQTJCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1FBQzlFLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM5QixJQUFJLEtBQUssS0FBSyxJQUFJO1lBQUUsT0FBTztRQUMzQixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDL0IsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hDLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLDBCQUEwQixDQUFDLENBQUM7UUFDbkUsSUFBSSxJQUFJLEtBQUssSUFBSTtZQUFFLE9BQU87UUFDMUIsSUFBSSxRQUFRLEdBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQWdCLENBQUMsY0FBYyxDQUFDO1FBQzNELElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNyQixZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUUsQ0FBQyxDQUFDO1lBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxHQUFFLEVBQUU7Z0JBQy9CLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDM0IsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDWjthQUNJO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEdBQUUsRUFBRTtnQkFDL0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNULE9BQU8saUJBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUN0RDtLQUNKO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFVSxRQUFBLFNBQVMsR0FBRyxJQUFJLG1CQUFLLEVBQXFGLENBQUMifQ==
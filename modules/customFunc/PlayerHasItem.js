"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerItems = exports.PlayerHasItem = void 0;
const launcher_1 = require("bdsx/launcher");
const event_1 = require("bdsx/event");
let system;
event_1.events.serverOpen.on(() => {
    system = server.registerSystem(0, 0);
});
if (launcher_1.bedrockServer.isLaunched())
    system = server.registerSystem(0, 0);
function PlayerHasItem(entity, itemId) {
    let playerInventory = system.getComponent(entity, "minecraft:inventory_container");
    let playerHotbar = system.getComponent(entity, "minecraft:hotbar_container");
    if (playerInventory === null || playerHotbar === null)
        return 0;
    let ItemCount = 0;
    playerInventory.data.forEach((v) => {
        if (v.__identifier__ === itemId)
            ItemCount = Math.round(ItemCount + v.count);
    });
    playerHotbar.data.forEach((v) => {
        if (v.__identifier__ === itemId)
            ItemCount = Math.round(ItemCount + v.count);
    });
    return ItemCount;
}
exports.PlayerHasItem = PlayerHasItem;
function PlayerItems(entity) {
    let playerInventory = system.getComponent(entity, "minecraft:inventory_container");
    let playerHotbar = system.getComponent(entity, "minecraft:hotbar_container");
    let Arr = [];
    if (playerInventory === null || playerHotbar === null)
        return [];
    playerInventory.data.forEach((v) => {
        Arr.push(v.__identifier__);
    });
    playerHotbar.data.forEach((v) => {
        Arr.push(v.__identifier__);
    });
    return Arr;
}
exports.PlayerItems = PlayerItems;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxheWVySGFzSXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlBsYXllckhhc0l0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNENBQThDO0FBQzlDLHNDQUFvQztBQUVwQyxJQUFJLE1BQTRCLENBQUM7QUFDakMsY0FBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsR0FBRSxFQUFFO0lBQ3JCLE1BQU0sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztBQUN4QyxDQUFDLENBQUMsQ0FBQztBQUVILElBQUksd0JBQWEsQ0FBQyxVQUFVLEVBQUU7SUFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFFcEUsU0FBZ0IsYUFBYSxDQUFDLE1BQWMsRUFBRSxNQUFhO0lBQ3ZELElBQUksZUFBZSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLCtCQUErQixDQUFFLENBQUM7SUFDcEYsSUFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsNEJBQTRCLENBQUUsQ0FBQztJQUM5RSxJQUFJLGVBQWUsS0FBSyxJQUFJLElBQUksWUFBWSxLQUFLLElBQUk7UUFBRSxPQUFPLENBQUMsQ0FBQztJQUNoRSxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDakIsZUFBZSxDQUFDLElBQXFCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUU7UUFDaEQsSUFBSSxDQUFDLENBQUMsY0FBYyxLQUFLLE1BQU07WUFBRSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pGLENBQUMsQ0FBQyxDQUFDO0lBQ0YsWUFBWSxDQUFDLElBQXFCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUU7UUFDN0MsSUFBSSxDQUFDLENBQUMsY0FBYyxLQUFLLE1BQU07WUFBRSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pGLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxTQUFTLENBQUE7QUFDcEIsQ0FBQztBQVpELHNDQVlDO0FBRUQsU0FBZ0IsV0FBVyxDQUFDLE1BQWM7SUFDdEMsSUFBSSxlQUFlLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsK0JBQStCLENBQUUsQ0FBQztJQUNwRixJQUFJLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSw0QkFBNEIsQ0FBRSxDQUFDO0lBQzlFLElBQUksR0FBRyxHQUFZLEVBQUUsQ0FBQztJQUN0QixJQUFJLGVBQWUsS0FBSyxJQUFJLElBQUksWUFBWSxLQUFLLElBQUk7UUFBRSxPQUFPLEVBQUUsQ0FBQztJQUNoRSxlQUFlLENBQUMsSUFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRTtRQUNoRCxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUMsQ0FBQztJQUNGLFlBQVksQ0FBQyxJQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBQyxFQUFFO1FBQzdDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxHQUFHLENBQUE7QUFDZCxDQUFDO0FBWkQsa0NBWUMifQ==
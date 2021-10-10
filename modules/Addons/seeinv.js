"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("bdsx/command");
const command_2 = require("bdsx/bds/command");
const inventory_1 = require("bdsx/bds/inventory");
const index_1 = require("../../index");
command_1.command.register('seeinv', 'see the inventory of a Player', command_2.CommandPermissionLevel.Operator).overload((params, origin, output) => {
    let sender = origin.getEntity();
    if (sender === null) {
        return;
    }
    let targets = params.target.newResults(origin);
    if (targets.length === 0) {
        (0, index_1.sendMessage)(sender, "§cNo Targets Match Input!!");
    }
    else if (targets.length > 1) {
        (0, index_1.sendMessage)(sender, "§cToo many arguments given");
    }
    else {
        if (targets[0].isPlayer()) {
            const target = targets[0];
            const inv = target.getInventory();
            (0, index_1.sendMessage)(sender, `Inventory of ${target.getName()}`);
            for (let i = 0; i < inv.getContainerSize(inventory_1.ContainerId.Inventory); i++) {
                const item = inv.getItem(i, inventory_1.ContainerId.Inventory);
                if (item.getId() === 0) {
                    continue;
                }
                (0, index_1.sendMessage)(sender, `§2Slot ⇾ §c${i} |
                        §6Item ⇾ ${item.getName()}${item.getDamageValue() !== 0 ?
                    " |§aDV ⇾ [" + item.getDamageValue() + "]§c" : ""}
                                    * ${item.amount}${item.hasCustomName() ?
                    " |§d Name ⇾ (§o" + item.getCustomName() + ")" : ""}`);
            }
        }
        else {
            (0, index_1.sendMessage)(sender, "§cTarget is not a player!");
        }
    }
}, { target: command_2.ActorWildcardCommandSelector });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VlaW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VlaW52LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMENBQXVDO0FBQ3ZDLDhDQUF3RjtBQUN4RixrREFBK0M7QUFFL0MsdUNBQTBDO0FBRzFDLGlCQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSwrQkFBK0IsRUFBRSxnQ0FBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxFQUFFO0lBQ3BILElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQVksQ0FBQztJQUMxQyxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7UUFDakIsT0FBTztLQUNWO0lBRUQsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFL0MsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUN0QixJQUFBLG1CQUFXLEVBQUMsTUFBTSxFQUFFLDRCQUE0QixDQUFDLENBQUM7S0FDckQ7U0FBTSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQzNCLElBQUEsbUJBQVcsRUFBQyxNQUFNLEVBQUUsNEJBQTRCLENBQUMsQ0FBQztLQUNyRDtTQUFNO1FBQ0gsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDdkIsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNsQyxJQUFBLG1CQUFXLEVBQUMsTUFBTSxFQUFFLGdCQUFnQixNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3hELEtBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUNULENBQUMsR0FBRyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsdUJBQVcsQ0FBQyxTQUFTLENBQUMsRUFDL0MsQ0FBQyxFQUFFLEVBQ0w7Z0JBQ0UsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsdUJBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFO29CQUNwQixTQUFTO2lCQUNaO2dCQUVELElBQUEsbUJBQVcsRUFBQyxNQUFNLEVBQUUsY0FBYyxDQUFDO21DQUN4QixJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQSxDQUFDO29CQUM1QyxZQUFZLEdBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxHQUFFLEtBQUssQ0FBQSxDQUFDLENBQUMsRUFBRTt3Q0FDMUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUEsQ0FBQztvQkFDdkMsaUJBQWlCLEdBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxHQUFFLEdBQUcsQ0FBQSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUNuRTtTQUNKO2FBQU07WUFDSCxJQUFBLG1CQUFXLEVBQUMsTUFBTSxFQUFFLDJCQUEyQixDQUFDLENBQUM7U0FDcEQ7S0FDSjtBQUNMLENBQUMsRUFDRCxFQUFDLE1BQU0sRUFBRSxzQ0FBNEIsRUFBQyxDQUN6QyxDQUFDIn0=
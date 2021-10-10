import { command } from 'bdsx/command';
import { ActorWildcardCommandSelector, CommandPermissionLevel } from "bdsx/bds/command";
import {ContainerId} from "bdsx/bds/inventory";
import { Player } from 'bdsx/bds/player';
import { sendMessage } from '../../index';


command.register('seeinv', 'see the inventory of a Player', CommandPermissionLevel.Operator).overload((params, origin, output)=>{
            let sender = origin.getEntity() as Player;
            if (sender === null) {
                return;
            }

            let targets = params.target.newResults(origin);

            if (targets.length === 0) {
                sendMessage(sender, "§cNo Targets Match Input!!");
            } else if (targets.length > 1) {
                sendMessage(sender, "§cToo many arguments given");
            } else {
                if (targets[0].isPlayer()) {
                    const target = targets[0];
                    const inv = target.getInventory();
                    sendMessage(sender, `Inventory of ${target.getName()}`);
                    for (
                        let i = 0;
                        i < inv.getContainerSize(ContainerId.Inventory);
                        i++
                    ) {
                        const item = inv.getItem(i, ContainerId.Inventory);
                        if (item.getId() === 0) {
                            continue;
                        }

                        sendMessage(sender, `§2Slot ⇾ §c${i} |
                        §6Item ⇾ ${item.getName()}${item.getDamageValue() !== 0?
                                    " |§aDV ⇾ [" +item.getDamageValue() +"]§c": ""}
                                    * ${item.amount}${item.hasCustomName()?
                                    " |§d Name ⇾ (§o" +item.getCustomName() +")": ""}`);
                    }
                } else {
                    sendMessage(sender, "§cTarget is not a player!");
                }
            }
        },
        {target: ActorWildcardCommandSelector}
    );

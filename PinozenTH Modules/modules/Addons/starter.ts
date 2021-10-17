import { command } from "bdsx/command";
import { bedrockServer } from "bdsx/launcher";

command.register('starter', 'Free food/item').overload((p, o, u) =>{
    bedrockServer.executeCommand(`give ${o.getName()} cooked_beef 64`);
    bedrockServer.executeCommand(`give ${o.getName()} carrot 64`);
    bedrockServer.executeCommand(`give ${o.getName()} potato 64`);
    bedrockServer.executeCommand(`give ${o.getName()} iron_sword`);
    bedrockServer.executeCommand(`give ${o.getName()} stone_pickaxe`);
    bedrockServer.executeCommand(`give ${o.getName()} stone_axe`);
    bedrockServer.executeCommand(`give ${o.getName()} diamond_hoe`);
    bedrockServer.executeCommand(`give ${o.getName()} netherite_hoe`);
},{})
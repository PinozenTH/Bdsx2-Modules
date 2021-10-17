"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blockpos_1 = require("bdsx/bds/blockpos");
const command_1 = require("bdsx/command");
const common_1 = require("bdsx/common");
const nativetype_1 = require("bdsx/nativetype");
const command_2 = require("bdsx/bds/command");
const blocks_1 = require("./blocks");
const hacker_1 = require("./hacker");
const nbt_1 = require("./nbt");
class SignBlockActor extends blocks_1.BlockActor {
    setMessage(message) {
        (0, common_1.abstract)();
    }
    save(tag) {
        (0, common_1.abstract)();
    }
    _onUpdatePacket(tag, region) {
        (0, common_1.abstract)();
    }
}
command_1.command.register('changesign', 'Change Sign Text', command_2.CommandPermissionLevel.Operator).overload(({ x, y, z, message, IgnoreLighting }, o) => {
    var _a;
    let actor = o.getEntity();
    if (actor === null)
        return;
    const originPos = o.getBlockPosition();
    originPos.x = x.is_relative ? originPos.x + x.value : x.value;
    originPos.y = y.is_relative ? originPos.y + y.value : y.value;
    originPos.z = z.is_relative ? originPos.z + z.value : z.value;
    let sign = (_a = actor.getRegion().as(blocks_1.Blocksource).getBlockEntity(originPos)) === null || _a === void 0 ? void 0 : _a.as(SignBlockActor);
    if (sign === undefined)
        return;
    const tag = nbt_1.compoundTag.create();
    tag.construct();
    sign.save(tag);
    tag.putString("Text", message.replace(/\+n/gi, '\n'));
    let Iglight = 1;
    if (IgnoreLighting !== undefined)
        Iglight = IgnoreLighting;
    tag.putByte("IgnoreLighting", Iglight);
    sign._onUpdatePacket(tag, actor.getRegion().as(blocks_1.Blocksource));
    tag.destruct();
}, {
    x: blockpos_1.RelativeFloat,
    y: blockpos_1.RelativeFloat,
    z: blockpos_1.RelativeFloat,
    message: nativetype_1.CxxString,
    IgnoreLighting: [nativetype_1.int32_t, true]
});
SignBlockActor.prototype._onUpdatePacket = hacker_1.hacker.js("SignBlockActor::_onUpdatePacket", nativetype_1.void_t, { this: SignBlockActor }, nbt_1.compoundTag, blocks_1.Blocksource);
SignBlockActor.prototype.setMessage = hacker_1.hacker.js("SignBlockActor::setMessage", nativetype_1.void_t, { this: SignBlockActor }, nativetype_1.CxxString);
SignBlockActor.prototype.save = hacker_1.hacker.js("SignBlockActor::save", nativetype_1.bool_t, { this: SignBlockActor }, nbt_1.compoundTag);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbkJsb2NrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2lnbkJsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsZ0RBQTREO0FBQzVELDBDQUF1QztBQUN2Qyx3Q0FBdUM7QUFDdkMsZ0RBQWlGO0FBQ2pGLDhDQUEwRDtBQUMxRCxxQ0FBbUQ7QUFDbkQscUNBQWtDO0FBQ2xDLCtCQUFvQztBQUVwQyxNQUFNLGNBQWUsU0FBUSxtQkFBVTtJQUNuQyxVQUFVLENBQUMsT0FBYztRQUNyQixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxJQUFJLENBQUMsR0FBZ0I7UUFDakIsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsZUFBZSxDQUFDLEdBQWdCLEVBQUUsTUFBa0I7UUFDaEQsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0NBQ0o7QUFFRCxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsZ0NBQXNCLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUU7O0lBQ2pJLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUcsQ0FBQztJQUMzQixJQUFJLEtBQUssS0FBSyxJQUFJO1FBQUUsT0FBTztJQUMzQixNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUN2QyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUM5RCxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUM5RCxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUM5RCxJQUFJLElBQUksR0FBRyxNQUFBLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsb0JBQVcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsMENBQUUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzNGLElBQUksSUFBSSxLQUFLLFNBQVM7UUFBRSxPQUFPO0lBQy9CLE1BQU0sR0FBRyxHQUFHLGlCQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDakMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDZCxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3RELElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztJQUNoQixJQUFJLGNBQWMsS0FBSyxTQUFTO1FBQUUsT0FBTyxHQUFHLGNBQWMsQ0FBQztJQUMzRCxHQUFHLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsb0JBQVcsQ0FBQyxDQUFDLENBQUM7SUFDN0QsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBRW5CLENBQUMsRUFBQztJQUNFLENBQUMsRUFBRSx3QkFBYTtJQUNoQixDQUFDLEVBQUUsd0JBQWE7SUFDaEIsQ0FBQyxFQUFFLHdCQUFhO0lBQ2hCLE9BQU8sRUFBRSxzQkFBUztJQUNsQixjQUFjLEVBQUUsQ0FBQyxvQkFBTyxFQUFFLElBQUksQ0FBQztDQUNsQyxDQUFDLENBQUM7QUFFSCxjQUFjLENBQUMsU0FBUyxDQUFDLGVBQWUsR0FBRyxlQUFNLENBQUMsRUFBRSxDQUFDLGlDQUFpQyxFQUFFLG1CQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsY0FBYyxFQUFDLEVBQUUsaUJBQVcsRUFBRSxvQkFBVyxDQUFDLENBQUM7QUFDakosY0FBYyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsZUFBTSxDQUFDLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxtQkFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLGNBQWMsRUFBQyxFQUFFLHNCQUFTLENBQUMsQ0FBQztBQUN4SCxjQUFjLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxlQUFNLENBQUMsRUFBRSxDQUFDLHNCQUFzQixFQUFFLG1CQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsY0FBYyxFQUFDLEVBQUUsaUJBQVcsQ0FBQyxDQUFDIn0=
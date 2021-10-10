"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blocksource = exports.BlockActor = void 0;
const block_1 = require("bdsx/bds/block");
const blockpos_1 = require("bdsx/bds/blockpos");
const common_1 = require("bdsx/common");
const nativeclass_1 = require("bdsx/nativeclass");
const nativetype_1 = require("bdsx/nativetype");
const hacker_1 = require("./hacker");
const nbt_1 = require("./nbt");
class BlockActor extends nativeclass_1.NativeClass {
    save(tag) {
        (0, common_1.abstract)();
    }
}
exports.BlockActor = BlockActor;
class Blocksource extends block_1.BlockSource {
    getBlockEntity(blockPos) {
        (0, common_1.abstract)();
    }
}
exports.Blocksource = Blocksource;
Blocksource.prototype.getBlockEntity = hacker_1.hacker.js("?getBlockEntity@BlockSource@@QEAAPEAVBlockActor@@AEBVBlockPos@@@Z", BlockActor, { this: Blocksource }, blockpos_1.BlockPos);
BlockActor.prototype.save = hacker_1.hacker.js("BlockActor::save", nativetype_1.bool_t, { this: BlockActor }, nbt_1.compoundTag);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2tzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmxvY2tzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBDQUEwRDtBQUMxRCxnREFBNkM7QUFFN0Msd0NBQXVDO0FBQ3ZDLGtEQUErQztBQUMvQyxnREFBeUM7QUFDekMscUNBQWtDO0FBQ2xDLCtCQUFvQztBQUdwQyxNQUFhLFVBQVcsU0FBUSx5QkFBVztJQUN2QyxJQUFJLENBQUMsR0FBZ0I7UUFDakIsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0NBQ0o7QUFKRCxnQ0FJQztBQUVELE1BQWEsV0FBWSxTQUFRLG1CQUFXO0lBQ3hDLGNBQWMsQ0FBQyxRQUFpQjtRQUM1QixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7Q0FDSjtBQUpELGtDQUlDO0FBR0QsV0FBVyxDQUFDLFNBQVMsQ0FBQyxjQUFjLEdBQUcsZUFBTSxDQUFDLEVBQUUsQ0FBQyxtRUFBbUUsRUFBRSxVQUFVLEVBQUUsRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLEVBQUUsbUJBQVEsQ0FBQyxDQUFDO0FBQ2hLLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLGVBQU0sQ0FBQyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsbUJBQU0sRUFBRSxFQUFDLElBQUksRUFBQyxVQUFVLEVBQUMsRUFBRSxpQkFBVyxDQUFDLENBQUMifQ==
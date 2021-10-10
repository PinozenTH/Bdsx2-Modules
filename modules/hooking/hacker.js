"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hacker = void 0;
const core_1 = require("bdsx/core");
const dbghelp_1 = require("bdsx/dbghelp");
const prochacker_1 = require("bdsx/prochacker");
const symbols = [
    'Block::getName',
    'BlockSource::getBlock',
    'SignBlockActor::setMessage',
    'SignBlockActor::_onUpdatePacket',
    'SignBlockActor::SignBlockActor',
    'BlockActor::save',
    'SignBlockActor::save',
    'ListTag::getInt',
    'ActorDamageByActorSource::getDamagingEntityUniqueID',
    'EnchantUtils::getEnchantLevel',
    'EnchantUtils::hasEnchant',
    'ItemEnchants::_toList',
    'ItemEnchants::getEnchantNames',
    'ItemStackBase::constructItemEnchantsFromUserData',
];
const symbols2 = [
    '?getBlockEntity@BlockSource@@QEAAPEAVBlockActor@@AEBVBlockPos@@@Z',
    '?setMessage@SignBlockActor@@QEAAXV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@0@Z',
    '??0CompoundTag@@QEAA@XZ',
    '??1CompoundTag@@UEAA@XZ',
    '?getInt@CompoundTag@@QEBAHV?$basic_string_span@$$CBD$0?0@gsl@@@Z',
    '?putInt@CompoundTag@@QEAAAEAHV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@H@Z',
    '?print@CompoundTag@@UEBAXAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@AEAVPrintStream@@@Z',
    '?get@CompoundTag@@QEAAPEAVTag@@V?$basic_string_span@$$CBD$0?0@gsl@@@Z',
    '?getCompound@ListTag@@QEBAPEBVCompoundTag@@_K@Z',
    '?getString@CompoundTag@@QEBAAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V?$basic_string_span@$$CBD$0?0@gsl@@@Z',
    '?size@ListTag@@QEBAHXZ',
    '?getShort@CompoundTag@@QEBAFV?$basic_string_span@$$CBD$0?0@gsl@@@Z',
    '?getByte@CompoundTag@@QEBAEV?$basic_string_span@$$CBD$0?0@gsl@@@Z',
    '?clone@CompoundTag@@QEBA?AV?$unique_ptr@VCompoundTag@@U?$default_delete@VCompoundTag@@@std@@@std@@XZ',
    '?contains@CompoundTag@@QEBA_NV?$basic_string_span@$$CBD$0?0@gsl@@@Z',
    '?contains@CompoundTag@@QEBA_NV?$basic_string_span@$$CBD$0?0@gsl@@W4Type@Tag@@@Z',
    '?copy@CompoundTag@@UEBA?AV?$unique_ptr@VTag@@U?$default_delete@VTag@@@std@@@std@@XZ',
    '?deepCopy@CompoundTag@@QEAAXAEBV1@@Z',
    '?equals@CompoundTag@@UEBA_NAEBVTag@@@Z',
    '?getBoolean@CompoundTag@@QEBA_NV?$basic_string_span@$$CBD$0?0@gsl@@@Z',
    '?getByteArray@CompoundTag@@QEBAAEBUTagMemoryChunk@@V?$basic_string_span@$$CBD$0?0@gsl@@@Z',
    '?getCompound@CompoundTag@@QEAAPEAV1@V?$basic_string_span@$$CBD$0?0@gsl@@@Z',
    '?getFloat@CompoundTag@@QEBAMV?$basic_string_span@$$CBD$0?0@gsl@@@Z',
    '?getInt64@CompoundTag@@QEBA_JV?$basic_string_span@$$CBD$0?0@gsl@@@Z',
    '?getList@CompoundTag@@QEAAPEAVListTag@@V?$basic_string_span@$$CBD$0?0@gsl@@@Z',
    '?isEmpty@CompoundTag@@QEBA_NXZ',
    '?put@CompoundTag@@QEAAAEAVTag@@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@$$QEAV2@@Z',
    '?putBoolean@CompoundTag@@QEAAXV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@_N@Z',
    '?putByte@CompoundTag@@QEAAAEAEV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@E@Z',
    '?putByteArray@CompoundTag@@QEAAAEAUTagMemoryChunk@@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@U2@@Z',
    '?putCompound@CompoundTag@@QEAAAEAV1@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V1@@Z',
    '?putFloat@CompoundTag@@QEAAAEAMV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@M@Z',
    '?putInt64@CompoundTag@@QEAAAEA_JV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@_J@Z',
    '?putShort@CompoundTag@@QEAAAEAFV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@F@Z',
    '?putString@CompoundTag@@QEAAAEAV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V23@0@Z',
    '?remove@CompoundTag@@QEAA_NV?$basic_string_span@$$CBD$0?0@gsl@@@Z',
    '?applyEnchant@EnchantUtils@@SA_NAEAVItemStackBase@@W4Type@Enchant@@H_N@Z',
    '??0ListTag@@QEAA@XZ',
    '??1ListTag@@UEAA@XZ',
    '?add@ListTag@@QEAAXV?$unique_ptr@VTag@@U?$default_delete@VTag@@@std@@@std@@@Z',
    '?copy@ListTag@@UEBA?AV?$unique_ptr@VTag@@U?$default_delete@VTag@@@std@@@std@@XZ',
    '?copyList@ListTag@@QEBA?AV?$unique_ptr@VListTag@@U?$default_delete@VListTag@@@std@@@std@@XZ',
    '?deleteChildren@ListTag@@UEAAXXZ',
    '?equals@ListTag@@UEBA_NAEBVTag@@@Z',
    '?get@ListTag@@QEBAPEAVTag@@H@Z',
    '?getCompound@ListTag@@QEBAPEBVCompoundTag@@_K@Z',
    '?getDouble@ListTag@@QEBANH@Z',
    '?getFloat@ListTag@@QEBAMH@Z',
    '?getInt@ListTag@@QEBAHH@Z',
    '?getString@ListTag@@QEBAAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@H@Z',
    '?save@ItemStackBase@@QEBA?AV?$unique_ptr@VCompoundTag@@U?$default_delete@VCompoundTag@@@std@@@std@@XZ',
    '?constructItemEnchantsFromUserData@ItemStackBase@@QEBA?AVItemEnchants@@XZ',
    '?canEnchant@EnchantUtils@@SA?AUEnchantResult@@AEBVItemStackBase@@W4Type@Enchant@@H_N@Z',
    '?clone@ItemStack@@QEBA?AV1@XZ'
];
const proc = core_1.pdb.getList(core_1.pdb.coreCachePath, {}, symbols, false, dbghelp_1.UNDNAME_NAME_ONLY);
const proc2 = core_1.pdb.getList(core_1.pdb.coreCachePath, {}, symbols2);
exports.hacker = new prochacker_1.ProcHacker(Object.assign({}, proc, proc2));
core_1.pdb.close();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaGFja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG9DQUFnQztBQUNoQywwQ0FBaUQ7QUFDakQsZ0RBQTZDO0FBRTdDLE1BQU0sT0FBTyxHQUFHO0lBQ1osZ0JBQWdCO0lBQ2hCLHVCQUF1QjtJQUN2Qiw0QkFBNEI7SUFDNUIsaUNBQWlDO0lBQ2pDLGdDQUFnQztJQUNoQyxrQkFBa0I7SUFDbEIsc0JBQXNCO0lBQ3RCLGlCQUFpQjtJQUNqQixxREFBcUQ7SUFDckQsK0JBQStCO0lBQy9CLDBCQUEwQjtJQUMxQix1QkFBdUI7SUFDdkIsK0JBQStCO0lBQy9CLGtEQUFrRDtDQUU1QyxDQUFBO0FBRVYsTUFBTSxRQUFRLEdBQUc7SUFDYixtRUFBbUU7SUFDbkUsb0dBQW9HO0lBQ3BHLHlCQUF5QjtJQUN6Qix5QkFBeUI7SUFDekIsa0VBQWtFO0lBQ2xFLGdHQUFnRztJQUNoRywrR0FBK0c7SUFDL0csdUVBQXVFO0lBQ3ZFLGlEQUFpRDtJQUNqRCxxSUFBcUk7SUFDckksd0JBQXdCO0lBQ3hCLG9FQUFvRTtJQUNwRSxtRUFBbUU7SUFDbkUsc0dBQXNHO0lBQ3RHLHFFQUFxRTtJQUNyRSxpRkFBaUY7SUFDakYscUZBQXFGO0lBQ3JGLHNDQUFzQztJQUN0Qyx3Q0FBd0M7SUFDeEMsdUVBQXVFO0lBQ3ZFLDJGQUEyRjtJQUMzRiw0RUFBNEU7SUFDNUUsb0VBQW9FO0lBQ3BFLHFFQUFxRTtJQUNyRSwrRUFBK0U7SUFDL0UsZ0NBQWdDO0lBQ2hDLHlHQUF5RztJQUN6RyxrR0FBa0c7SUFDbEcsaUdBQWlHO0lBQ2pHLHdIQUF3SDtJQUN4SCx5R0FBeUc7SUFDekcsa0dBQWtHO0lBQ2xHLG9HQUFvRztJQUNwRyxrR0FBa0c7SUFDbEcsc0dBQXNHO0lBQ3RHLG1FQUFtRTtJQUNuRSwwRUFBMEU7SUFDMUUscUJBQXFCO0lBQ3JCLHFCQUFxQjtJQUNyQiwrRUFBK0U7SUFDL0UsaUZBQWlGO0lBQ2pGLDZGQUE2RjtJQUM3RixrQ0FBa0M7SUFDbEMsb0NBQW9DO0lBQ3BDLGdDQUFnQztJQUNoQyxpREFBaUQ7SUFDakQsOEJBQThCO0lBQzlCLDZCQUE2QjtJQUM3QiwyQkFBMkI7SUFDM0IsOEZBQThGO0lBQzlGLHVHQUF1RztJQUN2RywyRUFBMkU7SUFDM0Usd0ZBQXdGO0lBQ3hGLCtCQUErQjtDQUV6QixDQUFBO0FBRVYsTUFBTSxJQUFJLEdBQUcsVUFBRyxDQUFDLE9BQU8sQ0FBQyxVQUFHLENBQUMsYUFBYSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLDJCQUFpQixDQUFDLENBQUM7QUFHbkYsTUFBTSxLQUFLLEdBQUcsVUFBRyxDQUFDLE9BQU8sQ0FBQyxVQUFHLENBQUMsYUFBYSxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUU5QyxRQUFBLE1BQU0sR0FBRyxJQUFJLHVCQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDckUsVUFBRyxDQUFDLEtBQUssRUFBRSxDQUFDIn0=
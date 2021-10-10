"use strict";
var compoundTag_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTag = exports.compoundTag = exports.Tag = exports.basic_string_span = void 0;
const tslib_1 = require("tslib");
const common_1 = require("bdsx/common");
const core_1 = require("bdsx/core");
const makefunc_1 = require("bdsx/makefunc");
const nativeclass_1 = require("bdsx/nativeclass");
const nativetype_1 = require("bdsx/nativetype");
const symbols_1 = require("bdsx/bds/symbols");
const hacker_1 = require("./hacker");
const string_ctor = makefunc_1.makefunc.js(symbols_1.proc2['??0?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@QEAA@XZ'], nativetype_1.void_t, null, core_1.VoidPointer);
const string_dtor = makefunc_1.makefunc.js(symbols_1.proc['std::basic_string<char,std::char_traits<char>,std::allocator<char> >::_Tidy_deallocate'], nativetype_1.void_t, null, core_1.VoidPointer);
exports.basic_string_span = new nativetype_1.NativeType('basic_string_span<char_const_,-1>', 0x10, 8, v => typeof v === 'string', undefined, (ptr, offset) => {
    const newptr = ptr.add(offset);
    const length = newptr.getInt64AsFloat();
    return newptr.getPointer(8).getString(length);
}, (ptr, v, offset) => {
    const newptr = ptr.add(offset);
    newptr.setInt64WithFloat(v.length);
    const strObj = new core_1.AllocatedPointer(v.length);
    strObj.setString(v);
    newptr.setPointer(strObj, 8);
}, (stackptr, offset) => {
    const ptr = stackptr.getPointer(offset);
    return ptr.getCxxString();
}, (stackptr, param, offset) => {
}, string_ctor, string_dtor, (to, from) => {
    to.setCxxString(from.getCxxString());
}, (to, from) => {
    to.copyFrom(from, 0x20);
    string_ctor(from);
});
Object.freeze(exports.basic_string_span);
let Tag = class Tag extends nativeclass_1.NativeClass {
};
Tag = (0, tslib_1.__decorate)([
    (0, nativeclass_1.nativeClass)(null)
], Tag);
exports.Tag = Tag;
(function (Tag) {
    let Type;
    (function (Type) {
        Type[Type["EndTag"] = 0] = "EndTag";
        Type[Type["ByteTag"] = 1] = "ByteTag";
        Type[Type["ShortTag"] = 2] = "ShortTag";
        Type[Type["IntTag"] = 3] = "IntTag";
        Type[Type["Int64Tag"] = 4] = "Int64Tag";
        Type[Type["FloatTag"] = 5] = "FloatTag";
        Type[Type["DoubleTag"] = 6] = "DoubleTag";
        Type[Type["ByteArrayTag"] = 7] = "ByteArrayTag";
        Type[Type["StringTag"] = 8] = "StringTag";
        Type[Type["ListTag"] = 9] = "ListTag";
        Type[Type["compoundTag"] = 10] = "compoundTag";
        Type[Type["IntArrayTag"] = 11] = "IntArrayTag";
    })(Type = Tag.Type || (Tag.Type = {}));
})(Tag = exports.Tag || (exports.Tag = {}));
exports.Tag = Tag;
let compoundTag = compoundTag_1 = class compoundTag extends Tag {
    putInt(name, val) {
        (0, common_1.abstract)();
    }
    getInt(name) {
        (0, common_1.abstract)();
    }
    get(name) {
        (0, common_1.abstract)();
    }
    getStringValue(name) {
        (0, common_1.abstract)();
    }
    getShort(name) {
        (0, common_1.abstract)();
    }
    getByte(name) {
        (0, common_1.abstract)();
    }
    static create() {
        const tag = new compoundTag_1(true);
        tag.construct();
        return tag;
    }
    clone() {
        (0, common_1.abstract)();
    }
    contains(name, type) {
        if (!type)
            return this._containsAll(name);
        return this._containsType(name, type);
    }
    _containsAll(name) {
        (0, common_1.abstract)();
    }
    _containsType(name, type) {
        (0, common_1.abstract)();
    }
    copy() {
        (0, common_1.abstract)();
    }
    deepCopy(other) {
        (0, common_1.abstract)();
    }
    equals(other) {
        (0, common_1.abstract)();
    }
    getBooleanValue(name) {
        (0, common_1.abstract)();
    }
    getByteArray(name) {
        (0, common_1.abstract)();
    }
    getCompound(name) {
        (0, common_1.abstract)();
    }
    getFloat(name) {
        (0, common_1.abstract)();
    }
    getInt64(name) {
        (0, common_1.abstract)();
    }
    getList(name) {
        (0, common_1.abstract)();
    }
    isEmpty() {
        (0, common_1.abstract)();
    }
    put(name, value) {
        (0, common_1.abstract)();
    }
    putBoolean(name, value) {
        (0, common_1.abstract)();
    }
    putByte(name, value) {
        (0, common_1.abstract)();
    }
    putByteArray(name, value) {
        (0, common_1.abstract)();
    }
    putCompound(name, value) {
        (0, common_1.abstract)();
    }
    putFloat(name, value) {
        (0, common_1.abstract)();
    }
    putInt64(name, value) {
        (0, common_1.abstract)();
    }
    putShort(name, value) {
        (0, common_1.abstract)();
    }
    putString(name, value) {
        (0, common_1.abstract)();
    }
    remove(name) {
        (0, common_1.abstract)();
    }
};
compoundTag = compoundTag_1 = (0, tslib_1.__decorate)([
    (0, nativeclass_1.nativeClass)(0x10)
], compoundTag);
exports.compoundTag = compoundTag;
let ListTag = class ListTag extends Tag {
    size() {
        (0, common_1.abstract)();
    }
    append(tag) {
        (0, common_1.abstract)();
    }
    copy() {
        (0, common_1.abstract)();
    }
    copyList() {
        (0, common_1.abstract)();
    }
    deleteChildren() {
        (0, common_1.abstract)();
    }
    equals(other) {
        (0, common_1.abstract)();
    }
    get(index) {
        (0, common_1.abstract)();
    }
    getCompound(index) {
        (0, common_1.abstract)();
    }
    getDouble(index) {
        (0, common_1.abstract)();
    }
    getFloat(index) {
        (0, common_1.abstract)();
    }
    getInt(index) {
        (0, common_1.abstract)();
    }
    getStringValue(index) {
        (0, common_1.abstract)();
    }
};
ListTag = (0, tslib_1.__decorate)([
    (0, nativeclass_1.nativeClass)(0x10)
], ListTag);
exports.ListTag = ListTag;
compoundTag.prototype[nativetype_1.NativeType.ctor] = hacker_1.hacker.js("??0CompoundTag@@QEAA@XZ", nativetype_1.void_t, { this: compoundTag });
// Broken, crashes when used
// compoundTag.prototype[NativeType.dtor] = hacker.js("??1compoundTag@@UEAA@XZ", void_t, {this:compoundTag});
compoundTag.prototype.get = hacker_1.hacker.js("?get@CompoundTag@@QEAAPEAVTag@@V?$basic_string_span@$$CBD$0?0@gsl@@@Z", compoundTag, { this: compoundTag }, exports.basic_string_span);
compoundTag.prototype.getInt = hacker_1.hacker.js("?getInt@CompoundTag@@QEBAHV?$basic_string_span@$$CBD$0?0@gsl@@@Z", nativetype_1.int32_t, { this: compoundTag }, exports.basic_string_span);
// compoundTag::getString is defined in PrivatePointer so use getStringValue instead
compoundTag.prototype.getStringValue = hacker_1.hacker.js("?getString@CompoundTag@@QEBAAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V?$basic_string_span@$$CBD$0?0@gsl@@@Z", nativetype_1.CxxString, { this: compoundTag }, exports.basic_string_span);
compoundTag.prototype.getShort = hacker_1.hacker.js("?getShort@CompoundTag@@QEBAFV?$basic_string_span@$$CBD$0?0@gsl@@@Z", nativetype_1.int16_t, { this: compoundTag }, exports.basic_string_span);
compoundTag.prototype.getByte = hacker_1.hacker.js("?getByte@CompoundTag@@QEBAEV?$basic_string_span@$$CBD$0?0@gsl@@@Z", nativetype_1.int8_t, { this: compoundTag }, exports.basic_string_span);
compoundTag.prototype.putInt = hacker_1.hacker.js("?putInt@CompoundTag@@QEAAAEAHV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@H@Z", nativetype_1.int32_t, { this: compoundTag }, nativetype_1.CxxString, nativetype_1.int32_t);
compoundTag.prototype.clone = hacker_1.hacker.js("?clone@CompoundTag@@QEBA?AV?$unique_ptr@VCompoundTag@@U?$default_delete@VCompoundTag@@@std@@@std@@XZ", compoundTag, { this: compoundTag });
compoundTag.prototype._containsAll = hacker_1.hacker.js("?contains@CompoundTag@@QEBA_NV?$basic_string_span@$$CBD$0?0@gsl@@@Z", nativetype_1.bool_t, { this: compoundTag }, exports.basic_string_span);
compoundTag.prototype._containsType = hacker_1.hacker.js("?contains@CompoundTag@@QEBA_NV?$basic_string_span@$$CBD$0?0@gsl@@W4Type@Tag@@@Z", nativetype_1.bool_t, { this: compoundTag }, exports.basic_string_span, nativetype_1.int32_t);
compoundTag.prototype.copy = hacker_1.hacker.js("?copy@CompoundTag@@UEBA?AV?$unique_ptr@VTag@@U?$default_delete@VTag@@@std@@@std@@XZ", compoundTag, { this: compoundTag });
compoundTag.prototype.deepCopy = hacker_1.hacker.js("?deepCopy@CompoundTag@@QEAAXAEBV1@@Z", compoundTag, { this: compoundTag }, compoundTag);
compoundTag.prototype.equals = hacker_1.hacker.js("?equals@CompoundTag@@UEBA_NAEBVTag@@@Z", nativetype_1.bool_t, { this: compoundTag }, Tag);
// compoundTag::getBoolean is defined in PrivatePointer so use getBooleanValue instead
compoundTag.prototype.getBooleanValue = hacker_1.hacker.js("?getBoolean@CompoundTag@@QEBA_NV?$basic_string_span@$$CBD$0?0@gsl@@@Z", nativetype_1.bool_t, { this: compoundTag }, exports.basic_string_span);
compoundTag.prototype.getByteArray = hacker_1.hacker.js("?getByteArray@CompoundTag@@QEBAAEBUTagMemoryChunk@@V?$basic_string_span@$$CBD$0?0@gsl@@@Z", core_1.VoidPointer /* TagMemoryChunk */, { this: compoundTag }, exports.basic_string_span);
compoundTag.prototype.getCompound = hacker_1.hacker.js("?getCompound@CompoundTag@@QEAAPEAV1@V?$basic_string_span@$$CBD$0?0@gsl@@@Z", compoundTag, { this: compoundTag }, exports.basic_string_span);
compoundTag.prototype.getFloat = hacker_1.hacker.js("?getFloat@CompoundTag@@QEBAMV?$basic_string_span@$$CBD$0?0@gsl@@@Z", nativetype_1.float32_t, { this: compoundTag }, exports.basic_string_span);
compoundTag.prototype.getInt64 = hacker_1.hacker.js("?getInt64@CompoundTag@@QEBA_JV?$basic_string_span@$$CBD$0?0@gsl@@@Z", nativetype_1.int64_as_float_t, { this: compoundTag }, exports.basic_string_span);
compoundTag.prototype.getList = hacker_1.hacker.js("?getList@CompoundTag@@QEAAPEAVListTag@@V?$basic_string_span@$$CBD$0?0@gsl@@@Z", ListTag, { this: compoundTag }, exports.basic_string_span);
compoundTag.prototype.isEmpty = hacker_1.hacker.js("?isEmpty@CompoundTag@@QEBA_NXZ", nativetype_1.bool_t, { this: compoundTag });
compoundTag.prototype.put = hacker_1.hacker.js("?put@CompoundTag@@QEAAAEAVTag@@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@$$QEAV2@@Z", Tag, { this: compoundTag }, nativetype_1.CxxString, Tag);
compoundTag.prototype.putBoolean = hacker_1.hacker.js("?putBoolean@CompoundTag@@QEAAXV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@_N@Z", nativetype_1.void_t, { this: compoundTag }, nativetype_1.CxxString, nativetype_1.bool_t);
compoundTag.prototype.putByte = hacker_1.hacker.js("?putByte@CompoundTag@@QEAAAEAEV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@E@Z", nativetype_1.uint8_t, { this: compoundTag }, nativetype_1.CxxString, nativetype_1.uint8_t);
compoundTag.prototype.putByteArray = hacker_1.hacker.js("?putByteArray@CompoundTag@@QEAAAEAUTagMemoryChunk@@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@U2@@Z", core_1.VoidPointer /* TagMemoryChunk */, { this: compoundTag }, nativetype_1.CxxString, core_1.VoidPointer /* TagMemoryChunk */);
compoundTag.prototype.putCompound = hacker_1.hacker.js("?putCompound@CompoundTag@@QEAAAEAV1@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V1@@Z", compoundTag, { this: compoundTag }, nativetype_1.CxxString, compoundTag);
compoundTag.prototype.putFloat = hacker_1.hacker.js("?putFloat@CompoundTag@@QEAAAEAMV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@M@Z", nativetype_1.float32_t, { this: compoundTag }, nativetype_1.CxxString, nativetype_1.float32_t);
compoundTag.prototype.putInt64 = hacker_1.hacker.js("?putInt64@CompoundTag@@QEAAAEA_JV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@_J@Z", nativetype_1.int64_as_float_t, { this: compoundTag }, nativetype_1.CxxString, nativetype_1.int64_as_float_t);
compoundTag.prototype.putShort = hacker_1.hacker.js("?putShort@CompoundTag@@QEAAAEAFV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@F@Z", nativetype_1.int16_t, { this: compoundTag }, nativetype_1.CxxString, nativetype_1.int16_t);
compoundTag.prototype.putString = hacker_1.hacker.js("?putString@CompoundTag@@QEAAAEAV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V23@0@Z", nativetype_1.CxxString, { this: compoundTag }, nativetype_1.CxxString, nativetype_1.CxxString);
compoundTag.prototype.remove = hacker_1.hacker.js("?remove@CompoundTag@@QEAA_NV?$basic_string_span@$$CBD$0?0@gsl@@@Z", nativetype_1.bool_t, { this: compoundTag }, exports.basic_string_span);
ListTag.prototype[nativetype_1.NativeType.ctor] = hacker_1.hacker.js("??0ListTag@@QEAA@XZ", nativetype_1.void_t, { this: ListTag });
// ListTag.prototype[NativeType.dtor] = hacker.js("??1ListTag@@UEAA@XZ", void_t, {this:ListTag}); // TODO: test destructor as compoundTag's destructor does not work
ListTag.prototype.getCompound = hacker_1.hacker.js("?getCompound@ListTag@@QEBAPEBVCompoundTag@@_K@Z", compoundTag, { this: ListTag }, nativetype_1.uint64_as_float_t);
ListTag.prototype.size = hacker_1.hacker.js("?size@ListTag@@QEBAHXZ", nativetype_1.int32_t, { this: ListTag });
// ListTag.prototype.append = hacker.js("?add@ListTag@@QEAAXV?$unique_ptr@VTag@@U?$default_delete@VTag@@@std@@@std@@@Z", void_t, {this:ListTag}, Tag);
// ListTag.prototype.copy = hacker.js("?copy@ListTag@@UEBA?AV?$unique_ptr@VTag@@U?$default_delete@VTag@@@std@@@std@@XZ", Tag, {this:ListTag});
// ListTag.prototype.copyList = hacker.js("?copyList@ListTag@@QEBA?AV?$unique_ptr@VListTag@@U?$default_delete@VListTag@@@std@@@std@@XZ", ListTag, {this:ListTag});
// ListTag.prototype.deleteChildren = hacker.js("?deleteChildren@ListTag@@UEAAXXZ", void_t, {this:ListTag});
// ListTag.prototype.equals = hacker.js("?equals@ListTag@@UEBA_NAEBVTag@@@Z", bool_t, {this:ListTag}, Tag);
ListTag.prototype.get = hacker_1.hacker.js("?get@ListTag@@QEBAPEAVTag@@H@Z", Tag, { this: ListTag }, nativetype_1.int32_t);
// ListTag.prototype.getCompound = hacker.js("?getCompound@ListTag@@QEBAPEBVCompoundTag@@_K@Z", compoundTag, {this:ListTag}, int32_t);
ListTag.prototype.getDouble = hacker_1.hacker.js("?getDouble@ListTag@@QEBANH@Z", nativetype_1.int32_t, { this: ListTag }, nativetype_1.int32_t);
ListTag.prototype.getFloat = hacker_1.hacker.js("?getFloat@ListTag@@QEBAMH@Z", nativetype_1.int32_t, { this: ListTag }, nativetype_1.int32_t);
// // ListTag.prototype.getInt = hacker.js("?getInt@ListTag@@QEBAHH@Z", int32_t, {this:ListTag}, int32_t);
// ListTag.prototype.getStringValue = hacker.js("?getString@ListTag@@QEBAAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@H@Z", CxxString, {this:ListTag}, int32_t);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esd0NBQXVDO0FBQ3ZDLG9DQUFzRTtBQUN0RSw0Q0FBeUM7QUFDekMsa0RBQTREO0FBQzVELGdEQUEySjtBQUMzSiw4Q0FBK0M7QUFDL0MscUNBQWtDO0FBRWxDLE1BQU0sV0FBVyxHQUFHLG1CQUFRLENBQUMsRUFBRSxDQUFDLGVBQUssQ0FBQyx5RUFBeUUsQ0FBQyxFQUFFLG1CQUFNLEVBQUUsSUFBSSxFQUFFLGtCQUFXLENBQUMsQ0FBQztBQUM3SSxNQUFNLFdBQVcsR0FBRyxtQkFBUSxDQUFDLEVBQUUsQ0FBQyxjQUFJLENBQUMsd0ZBQXdGLENBQUMsRUFBRSxtQkFBTSxFQUFFLElBQUksRUFBRSxrQkFBVyxDQUFDLENBQUM7QUFDOUksUUFBQSxpQkFBaUIsR0FBRyxJQUFJLHVCQUFVLENBQzNDLG1DQUFtQyxFQUNuQyxJQUFJLEVBQUUsQ0FBQyxFQUNQLENBQUMsQ0FBQSxFQUFFLENBQUEsT0FBTyxDQUFDLEtBQUssUUFBUSxFQUN4QixTQUFTLEVBQ1QsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFDLEVBQUU7SUFDWCxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN4QyxPQUFPLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2xELENBQUMsRUFDRCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFDLEVBQUU7SUFDZCxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsTUFB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
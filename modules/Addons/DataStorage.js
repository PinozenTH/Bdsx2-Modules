"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataStorage = void 0;
const PlayerData_1 = require("./PlayerData");
class DataStorage {
    constructor() {
        this.dataList = new Map();
    }
    static init() {
        this.INSTANCE = new DataStorage();
    }
    add(identifier) {
        var data = new PlayerData_1.PlayerData(identifier);
        this.dataList.set(identifier, data);
        return data;
    }
    remove(identifier) {
        this.dataList.delete(identifier);
    }
    get(identifier) {
        var _a;
        return (_a = this.dataList.get(identifier)) !== null && _a !== void 0 ? _a : null;
    }
    getAll() {
        return this.dataList;
    }
}
exports.DataStorage = DataStorage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YVN0b3JhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJEYXRhU3RvcmFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw2Q0FBMEM7QUFFMUMsTUFBYSxXQUFXO0lBQXhCO1FBSVcsYUFBUSxHQUF1QyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBd0JwRSxDQUFDO0lBdEJVLE1BQU0sQ0FBQyxJQUFJO1FBQ2QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFTSxHQUFHLENBQUMsVUFBNkI7UUFDcEMsSUFBSSxJQUFJLEdBQUcsSUFBSSx1QkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQTZCO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTSxHQUFHLENBQUMsVUFBNkI7O1FBQ3BDLE9BQU8sTUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsbUNBQUksSUFBSSxDQUFDO0lBQ2pELENBQUM7SUFFTSxNQUFNO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7Q0FFSjtBQTVCRCxrQ0E0QkMifQ==
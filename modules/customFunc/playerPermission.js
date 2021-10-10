"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerPermission = void 0;
const fs_1 = require("fs");
const packets_1 = require("../packets");
function playerPermission(playerName, ResultEvent = (perm) => { }) {
    let xuid = (0, packets_1.XuidByName)(playerName);
    var operJs;
    let permissions = '';
    try {
        operJs = JSON.parse((0, fs_1.readFileSync)("permissions.json", "utf8"));
        let Js = operJs.find((v) => v.xuid === xuid);
        if (Js != undefined)
            permissions = Js.permission;
        if (Js === undefined)
            permissions = 'member';
    }
    catch (err) {
        permissions = 'member';
    }
    ResultEvent(permissions);
    return permissions;
}
exports.playerPermission = playerPermission;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVyUGVybWlzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBsYXllclBlcm1pc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkJBQWtDO0FBQ2xDLHdDQUF3QztBQUV4QyxTQUFnQixnQkFBZ0IsQ0FBQyxVQUFrQixFQUFFLGNBQWMsQ0FBQyxJQUFTLEVBQUUsRUFBRSxHQUFFLENBQUM7SUFDaEYsSUFBSSxJQUFJLEdBQUcsSUFBQSxvQkFBVSxFQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2xDLElBQUksTUFBeUMsQ0FBQztJQUM5QyxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDckIsSUFBSTtRQUNBLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUEsaUJBQVksRUFBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzlELElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUM7UUFDNUMsSUFBSSxFQUFFLElBQUksU0FBUztZQUFFLFdBQVcsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO1FBQ2pELElBQUksRUFBRSxLQUFLLFNBQVM7WUFBRSxXQUFXLEdBQUcsUUFBUSxDQUFDO0tBQ2hEO0lBQUMsT0FBTSxHQUFHLEVBQUU7UUFDVCxXQUFXLEdBQUcsUUFBUSxDQUFDO0tBQzFCO0lBQ0QsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3pCLE9BQU8sV0FBVyxDQUFDO0FBQ3ZCLENBQUM7QUFkRCw0Q0FjQztBQUFBLENBQUMifQ==
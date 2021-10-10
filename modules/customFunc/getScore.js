"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScoreSync = exports.getScore = void 0;
const launcher_1 = require("bdsx/launcher");
const event_1 = require("bdsx/event");
const server_1 = require("bdsx/bds/server");
const level_1 = require("bdsx/bds/level");
const actor_1 = require("bdsx/bds/actor");
let system;
event_1.events.serverOpen.on(() => {
    system = server.registerSystem(0, 0);
});
if (launcher_1.bedrockServer.isLaunched())
    system = server.registerSystem(0, 0);
function getScore(targetName, objectives, handler = (result) => { }) {
    system.executeCommand(`scoreboard players add @a[name="${targetName}",c=1] ${objectives} 0`, result => {
        // @ts-ignore
        let msgs = result.data.statusMessage;
        let msg = String(msgs).split('now');
        let a = String(msg[1]);
        let s = 0;
        if (a.includes('-') === true)
            s = Number(a.replace(/[^0-9  ]/g, '')) - (Number(a.replace(/[^0-9  ]/g, '')) * 2);
        if (a.includes('-') === false)
            s = Number(a.replace(/[^0-9  ]/g, ''));
        if (isNaN(s))
            s = 0;
        handler(s);
        msgs = null;
        msg = null;
        a = null;
    });
    return;
}
exports.getScore = getScore;
;
function getScoreSync(target, objectives) {
    let level = server_1.serverInstance.minecraft.getLevel();
    if (!(level instanceof level_1.Level))
        return null;
    let score = level.getScoreboard();
    let obj = score.getObjective(objectives);
    if (obj === null)
        return null;
    let id;
    if (target instanceof actor_1.Actor) {
        if (target.isPlayer())
            id = score.getPlayerScoreboardId(target);
        else
            id = score.getActorScoreboardId(target);
    }
    else
        id = score.getFakePlayerScoreboardId(target);
    return obj.getPlayerScore(id).value;
}
exports.getScoreSync = getScoreSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0U2NvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRTY29yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0Q0FBOEM7QUFDOUMsc0NBQW9DO0FBQ3BDLDRDQUFpRDtBQUNqRCwwQ0FBdUM7QUFDdkMsMENBQXVDO0FBR3ZDLElBQUksTUFBNEIsQ0FBQztBQUNqQyxjQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxHQUFFLEVBQUU7SUFDckIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hDLENBQUMsQ0FBQyxDQUFDO0FBQ0gsSUFBSSx3QkFBYSxDQUFDLFVBQVUsRUFBRTtJQUFFLE1BQU0sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztBQUdwRSxTQUFnQixRQUFRLENBQUMsVUFBa0IsRUFBRSxVQUFrQixFQUFFLFVBQVUsQ0FBQyxNQUFXLEVBQUUsRUFBRSxHQUFFLENBQUM7SUFDMUYsTUFBTSxDQUFDLGNBQWMsQ0FBQyxtQ0FBbUMsVUFBVSxVQUFVLFVBQVUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ2xHLGFBQWE7UUFDYixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUNyQyxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSTtZQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2hILElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxLQUFLO1lBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztZQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEIsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1YsSUFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixHQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLENBQVMsR0FBRyxJQUFJLENBQUM7SUFFdEIsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPO0FBQ1gsQ0FBQztBQWpCRCw0QkFpQkM7QUFBQSxDQUFDO0FBRUYsU0FBZ0IsWUFBWSxDQUFDLE1BQW9CLEVBQUUsVUFBa0I7SUFDakUsSUFBSSxLQUFLLEdBQUcsdUJBQWMsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDaEQsSUFBSSxDQUFDLENBQUMsS0FBSyxZQUFZLGFBQUssQ0FBQztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQzNDLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUNsQyxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBRSxDQUFDO0lBQzFDLElBQUksR0FBRyxLQUFLLElBQUk7UUFBRSxPQUFPLElBQUksQ0FBQztJQUM5QixJQUFJLEVBQWdCLENBQUM7SUFDckIsSUFBSSxNQUFNLFlBQVksYUFBSyxFQUFFO1FBQ3pCLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUFFLEVBQUUsR0FBRyxLQUFLLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUM7O1lBQzNELEVBQUUsR0FBRyxLQUFLLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDaEQ7O1FBQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwRCxPQUFPLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ3hDLENBQUM7QUFaRCxvQ0FZQyJ9
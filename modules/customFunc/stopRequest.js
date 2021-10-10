"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StopRequested = void 0;
const event_1 = require("bdsx/event");
const eventtarget_1 = require("bdsx/eventtarget");
let fired = false;
event_1.events.serverLog.on((log) => {
    if (log === "[INFO] Server stop requested.") {
        fired = true;
        exports.StopRequested.fire();
    }
});
event_1.events.serverClose.on(() => {
    if (fired === false)
        exports.StopRequested.fire();
});
exports.StopRequested = new eventtarget_1.Event();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcFJlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdG9wUmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBb0M7QUFDcEMsa0RBQXlDO0FBQ3pDLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNsQixjQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBQyxFQUFFO0lBQ3ZCLElBQUksR0FBRyxLQUFLLCtCQUErQixFQUFFO1FBQ3pDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDYixxQkFBYSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3hCO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDSCxjQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFFLEVBQUU7SUFDdEIsSUFBSSxLQUFLLEtBQUssS0FBSztRQUFFLHFCQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDOUMsQ0FBQyxDQUFDLENBQUE7QUFFVyxRQUFBLGFBQWEsR0FBRyxJQUFJLG1CQUFLLEVBQWMsQ0FBQyJ9
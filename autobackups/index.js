"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
(0, tslib_1.__exportStar)(require("./BackupManager"), exports);
const BackupManager_1 = require("./BackupManager");
const launcher_1 = require("bdsx/launcher");
const backupManager = new BackupManager_1.BackupManager(launcher_1.bedrockServer);
backupManager.init({
    backupOnStart: true,
    skipIfNoActivity: true,
    backupOnPlayerConnected: true,
    backupOnPlayerDisconnected: true,
    interval: 30,
    minIntervalBetweenBackups: 5
}).then((res) => {
    console.log(`backup manager initiated`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrREFBZ0M7QUFFaEMsbURBQWdEO0FBQ2hELDRDQUE4QztBQUU5QyxNQUFNLGFBQWEsR0FBRyxJQUFJLDZCQUFhLENBQUMsd0JBQWEsQ0FBQyxDQUFDO0FBQ3ZELGFBQWEsQ0FBQyxJQUFJLENBQUM7SUFDZixhQUFhLEVBQUUsSUFBSTtJQUNuQixnQkFBZ0IsRUFBRSxJQUFJO0lBQ3RCLHVCQUF1QixFQUFFLElBQUk7SUFDN0IsMEJBQTBCLEVBQUUsSUFBSTtJQUNoQyxRQUFRLEVBQUUsRUFBRTtJQUNaLHlCQUF5QixFQUFFLENBQUM7Q0FDL0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBQzVDLENBQUMsQ0FBQyxDQUFDIn0=
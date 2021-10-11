"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
(0, tslib_1.__exportStar)(require("./BackupManager"), exports);
const backups = require('../config.json');
const config = backups.autoBackUps;
const BackupManager_1 = require("./BackupManager");
const launcher_1 = require("bdsx/launcher");
const backupManager = new BackupManager_1.BackupManager(launcher_1.bedrockServer);
backupManager.init({
    backupOnStart: config.backupOnStart,
    skipIfNoActivity: config.skipIfNoActivity,
    backupOnPlayerConnected: config.backupOnPlayerConnected,
    backupOnPlayerDisconnected: config.backupOnPlayerDisconnected,
    interval: config.backups_Times,
    minIntervalBetweenBackups: config.minIntervalBetweenBackups
}).then((res) => {
    console.log(`BackUp Manager Started`.bgCyan + `\nCredit AutoBackups from: \n` + `https://github.com/LastSandwich/bdsx-backup.git`.yellow);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrREFBZ0M7QUFDaEMsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDMUMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQTtBQUdsQyxtREFBZ0Q7QUFDaEQsNENBQThDO0FBRTlDLE1BQU0sYUFBYSxHQUFHLElBQUksNkJBQWEsQ0FBQyx3QkFBYSxDQUFDLENBQUM7QUFDdkQsYUFBYSxDQUFDLElBQUksQ0FBQztJQUNmLGFBQWEsRUFBRSxNQUFNLENBQUMsYUFBYTtJQUNuQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsZ0JBQWdCO0lBQ3pDLHVCQUF1QixFQUFFLE1BQU0sQ0FBQyx1QkFBdUI7SUFDdkQsMEJBQTBCLEVBQUUsTUFBTSxDQUFDLDBCQUEwQjtJQUM3RCxRQUFRLEVBQUUsTUFBTSxDQUFDLGFBQWE7SUFDOUIseUJBQXlCLEVBQUUsTUFBTSxDQUFDLHlCQUF5QjtDQUM5RCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLE1BQU0sR0FBQywrQkFBK0IsR0FBQyxpREFBaUQsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMxSSxDQUFDLENBQUMsQ0FBQyJ9
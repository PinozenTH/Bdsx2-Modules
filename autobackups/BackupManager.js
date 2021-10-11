"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackupManager = void 0;
const backup = require('../config.json');
const config = backup.autoBackUps;
const BackupUtils_1 = require("./BackupUtils");
class BackupManager {
    constructor(bds, testOnly, tempName) {
        this.bds = bds;
        this.testOnly = testOnly;
        this.tempName = tempName;
        this.worldName = "Unknown";
        this.activePlayerCount = 0;
        this.runNextBackup = false;
        this.lastBackup = 0;
        this.backupSettings = {};
        this.resumeRetryCounter = 0;
        this.displayStatus = (message) => {
            if (this.activePlayerCount > 0) {
                // eslint-disable-next-line no-useless-escape
                this.bds.executeCommandOnConsole(`tellraw @a {\"rawtext\": [{\"text\": \"§lBackup\"},{\"text\": \"§r ${message}\"}]}`);
            }
        };
    }
    async init(settings) {
        var _a;
        this.backupSettings = settings;
        this.bedrockServerPath = (_a = settings.bedrockServerPath) !== null && _a !== void 0 ? _a : config.bedrockServerPath;
        this.worldName = await BackupUtils_1.BackupUtils.getWorldName(this.bedrockServerPath);
        console.log("bedrockServerPath:", this.bedrockServerPath);
        console.log("worldName:", this.worldName);
        if (!this.testOnly) {
            await BackupUtils_1.BackupUtils.removeDirectory("temp");
        }
        await this.registerHandlers();
        if (settings.interval && settings.interval > 0) {
            setInterval(async () => {
                await this.backup();
            }, settings.interval * 60000);
        }
        if (settings.backupOnStart) {
            this.runNextBackup = true;
            await this.backup();
        }
        this.displayStatus("Initialized");
    }
    async backup() {
        if (this.backupSettings.minIntervalBetweenBackups) {
            let diffTime = Math.abs(Date.now() - this.lastBackup) / 1000 / 60;
            diffTime = Math.round(diffTime * 100) / 100;
            console.log(diffTime);
            if (diffTime < this.backupSettings.minIntervalBetweenBackups) {
                console.log(`Skip backup - last processed ${diffTime}`);
                return;
            }
        }
        if (this.backupSettings.skipIfNoActivity) {
            if (this.activePlayerCount > 0 || this.runNextBackup) {
                console.log("Call save hold due to activity");
                this.bds.executeCommandOnConsole("save hold");
            }
            else {
                console.log("Skip backup - no activity");
            }
        }
        else {
            console.log("Call save hold (no activity)");
            this.bds.executeCommandOnConsole("save hold");
        }
    }
    async registerHandlers() {
        this.bds.commandOutput.on((result) => {
            if (result.indexOf("A previous save") > -1 || result.indexOf("The command is already running") > -1) {
                this.resumeRetryCounter++;
                if (this.resumeRetryCounter < 3) {
                    setTimeout(() => {
                        this.bds.executeCommandOnConsole("save resume");
                        this.runNextBackup = true;
                    }, 1000);
                }
                else {
                    this.resumeRetryCounter = 0;
                }
            }
            if (result === "Saving...") {
                this.bds.executeCommandOnConsole("save query");
            }
            if (result.indexOf("Data saved. Files are now ready to be copied.") > -1) {
                const files = result.split(", ");
                this.runBackup(files);
            }
            if (result === "Changes to the level are resumed.") {
                this.resumeRetryCounter = 0;
            }
        });
        this.bds.bedrockLog.on((result) => {
            if (result.indexOf("Player connected") > -1) {
                this.activePlayerCount++;
                this.runNextBackup = true;
                if (this.backupSettings.backupOnPlayerConnected) {
                    this.backup();
                }
            }
            if (result.indexOf("Player disconnected") > -1) {
                this.activePlayerCount = this.activePlayerCount > 0 ? this.activePlayerCount - 1 : 0;
                this.runNextBackup = true;
                if (this.backupSettings.backupOnPlayerDisconnected) {
                    this.backup();
                }
            }
        });
    }
    async runBackup(files) {
        if (this.testOnly) {
            this.bds.executeCommandOnConsole("save resume");
            return;
        }
        const handleError = (error) => {
            error && console.log(error);
            this.runNextBackup = true;
            this.bds.executeCommandOnConsole("save resume");
        };
        this.runNextBackup = false;
        this.displayStatus("Starting...");
        const tempDirectory = await BackupUtils_1.BackupUtils.createTempDirectory(this.worldName, handleError, this.tempName);
        await BackupUtils_1.BackupUtils.moveFiles(`${this.bedrockServerPath}/worlds`, tempDirectory, this.worldName, handleError);
        await Promise.all(files.slice(1).map(async (file) => {
            await BackupUtils_1.BackupUtils.truncate(file, tempDirectory);
        }));
        await BackupUtils_1.BackupUtils.zipDirectory(`${this.bedrockServerPath}/backups`, tempDirectory, this.worldName, handleError);
        await BackupUtils_1.BackupUtils.removeTempDirectory(tempDirectory);
        this.bds.executeCommandOnConsole("save resume");
        this.lastBackup = Date.now();
        console.log("Finished");
        setTimeout(() => {
            this.displayStatus("Finished!");
        }, 2000);
    }
}
exports.BackupManager = BackupManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFja3VwTWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJhY2t1cE1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUE7QUFDeEMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQTtBQUNqQywrQ0FBNEM7QUFHNUMsTUFBYSxhQUFhO0lBU3RCLFlBQW9CLEdBQXlCLEVBQVUsUUFBa0IsRUFBVSxRQUFpQjtRQUFoRixRQUFHLEdBQUgsR0FBRyxDQUFzQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBUjVGLGNBQVMsR0FBRyxTQUFTLENBQUM7UUFDdEIsc0JBQWlCLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixtQkFBYyxHQUFvQixFQUFFLENBQUM7UUFFckMsdUJBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBeUl2QixrQkFBYSxHQUFHLENBQUMsT0FBZSxFQUFFLEVBQUU7WUFDeEMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxFQUFFO2dCQUM1Qiw2Q0FBNkM7Z0JBQzdDLElBQUksQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsc0VBQXNFLE9BQU8sT0FBTyxDQUFDLENBQUM7YUFDMUg7UUFDTCxDQUFDLENBQUM7SUE1SXFHLENBQUM7SUFFakcsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUF5Qjs7UUFDdkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUM7UUFDL0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE1BQUEsUUFBUSxDQUFDLGlCQUFpQixtQ0FBSSxNQUFNLENBQUMsaUJBQWlCLENBQUM7UUFDaEYsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLHlCQUFXLENBQUMsWUFBWSxDQUFD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
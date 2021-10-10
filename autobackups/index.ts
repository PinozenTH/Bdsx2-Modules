export * from "./BackupManager";
const backups = require('../config.json');
const config = backups.AutoBackups


import { BackupManager } from "./BackupManager";
import { bedrockServer } from "bdsx/launcher";

const backupManager = new BackupManager(bedrockServer);
backupManager.init({
    backupOnStart: config.backupOnStart,
    skipIfNoActivity: config.skipIfNoActivity,
    backupOnPlayerConnected: config.backupOnPlayerConnected,
    backupOnPlayerDisconnected: config.backupOnPlayerDisconnected,
    interval: config.backups_Times,
    minIntervalBetweenBackups: config.minIntervalBetweenBackups
}).then((res) => {
    console.log(`backup manager initiated\nCredit AutoBackups from: \nhttps://github.com/LastSandwich/bdsx-backup.git`);
});


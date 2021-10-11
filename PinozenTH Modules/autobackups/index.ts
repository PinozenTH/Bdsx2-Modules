export * from "./BackupManager";
const backups = require('../config.json');
const config = backups.autoBackUps


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
    console.log(`BackUp Manager Started`.bgCyan+`\nCredit AutoBackups from: \n`+`https://github.com/LastSandwich/bdsx-backup.git`.yellow);
});


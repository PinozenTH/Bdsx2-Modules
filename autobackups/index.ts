export * from "./BackupManager";

import { BackupManager } from "./BackupManager";
import { bedrockServer } from "bdsx/launcher";

const backupManager = new BackupManager(bedrockServer);
backupManager.init({
    backupOnStart: true,
    skipIfNoActivity: true,
    backupOnPlayerConnected: true,
    backupOnPlayerDisconnected: true,
    interval: 30,
    minIntervalBetweenBackups: 5
}).then((res) => {
    console.log(`backup manager initiated\nCredit AutoBackups from: \nhttps://github.com/LastSandwich/bdsx-backup.git`);
});


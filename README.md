#### BDSX2

Modded Version of [BDSX](https://github.com/bdsx/bdsx)

### On start
go to Bdsx2-Modules
run
```
npm i
```
## Config

> Webpanel

Original:
[Bdsx-web-panel](https://github.com/Rjlintkh/bdsx-web-panel.git)

- GraphUpdates: Update CPU graph every second (default: 60) [WARN: Low = More Resource usage/May crash your PC if too low]
- same_port_with_bds: use webpanel port with bds port (default:19132)
- port: port of you webpanel (domain:port | default: 19132)
- chat_name: display in chat (like this <chat_name> message | default: Server)
- username: your username to login to panel (default: admin)
- password: your password to login to panel (default: 123)

> AutoBackups

Original:
[bdsx-backup](https://github.com/LastSandwich/bdsx-backup.git)

- BackupsBroadcast: Broadcast to server player when backup has started
- backupOnStart: backup will occur when the server is started
- interval: minutes between each backup
- skipIfNoActivity: only create a backup if players have been active the previous backup
- backupOnPlayerConnected: run a backup when a player joins
- backupOnPlayerDisconnected: run a backup when a player leaves
- minIntervalBetweenBackups: minimum minutes between backups
- bedrockServerPath: path to the bedrock_server folder - defaults to "../../bedrock_server"



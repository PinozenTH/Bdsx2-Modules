"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferServer = void 0;
const command_1 = require("bdsx/command");
const nativetype_1 = require("bdsx/nativetype");
const fs = require("fs");
const packets_1 = require("bdsx/bds/packets");
function transferServer(networkIdentifier, address, port) {
    const transferPacket = packets_1.TransferPacket.create();
    transferPacket.address = address;
    transferPacket.port = port;
    transferPacket.sendTo(networkIdentifier);
    transferPacket.dispose();
}
exports.transferServer = transferServer;
command_1.command.register('server', 'transfer server').overload((param, origin, output) => {
    var serverFile = fs.readFileSync('./servers.json', 'utf8');
    var servers = JSON.parse(serverFile);
    let actor = origin.getEntity();
    var address;
    var port;
    for (var index in servers.serverList) {
        if (servers.serverList[parseInt(index)].name == param.serverName) {
            address = servers.serverList[parseInt(index)].address;
            port = parseInt(servers.serverList[parseInt(index)].port);
            if (actor != null) {
                var ni = actor.getNetworkIdentifier();
                transferServer(ni, address, port);
            }
        }
    }
}, {
    serverName: [nativetype_1.CxxString, false],
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0cmFuc2Zlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQ0FBdUM7QUFDdkMsZ0RBQXFEO0FBQ3JELHlCQUF5QjtBQUV6Qiw4Q0FBa0Q7QUFFbEQsU0FBZ0IsY0FBYyxDQUFDLGlCQUFtQyxFQUFFLE9BQWMsRUFBRSxJQUFXO0lBQzNGLE1BQU0sY0FBYyxHQUFHLHdCQUFjLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDL0MsY0FBYyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDakMsY0FBYyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDM0IsY0FBYyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3pDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUM3QixDQUFDO0FBTkQsd0NBTUM7QUFFRCxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxFQUFFO0lBQzVFLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNyQyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDL0IsSUFBSSxPQUFlLENBQUE7SUFDbkIsSUFBSSxJQUFhLENBQUE7SUFDakIsS0FBSyxJQUFJLEtBQUssSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFO1FBQ2xDLElBQUssT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLFVBQVUsRUFBQztZQUM5RCxPQUFPLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUE7WUFDckQsSUFBSSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3pELElBQUksS0FBSyxJQUFJLElBQUksRUFBQztnQkFDZCxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztnQkFDdEMsY0FBYyxDQUFDLEVBQUUsRUFBRyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUE7YUFDckM7U0FDSjtLQUNGO0FBQ1AsQ0FBQyxFQUFFO0lBQ0MsVUFBVSxFQUFFLENBQUMsc0JBQVMsRUFBRSxLQUFLLENBQUM7Q0FDakMsQ0FBQyxDQUFDIn0=
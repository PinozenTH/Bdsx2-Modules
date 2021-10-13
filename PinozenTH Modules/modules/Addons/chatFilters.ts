import { MinecraftPacketIds } from "bdsx/bds/packetids";

// Open the a file and parse each line as its own string
import * as fs from "fs";
import { events } from "bdsx/event";

const lines = fs.readFileSync("../../chatfilter.txt", "utf8").split(/[\r\n]+/);
console.log(lines);
const lineObject = lines.map(line => {
    const escapedLine = line.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return {
        "regex": new RegExp(escapedLine, "ig"),
        "length": line.length
    };
});


events.packetBefore(MinecraftPacketIds.Text).on((p) => {
    for (let line of lineObject) {
        p.message = p.message.replace(line.regex, "*".repeat(line.length));
    }
});
import { Packet } from "bdsx/bds/packet";
import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { events } from "bdsx/event";
import "./autoclicker";
import "./crasher";
import { DEBUG } from "./debug";
import "./edition_faker";
import "./flight";
import "./give";
import "./instabreak";
import "./inv_move";
//import "./movement";
import "./name_override";
import "./noclip";
import "./nuker";
//import "./omnisprint"; // This became legit bruh
//import "./reach";
import "./xp_orb";

/* for debugging only */
if (DEBUG) {
    for (let i = 1; i < 164; i++) {
        switch (i) {
            //case MinecraftPacketIds.MovePlayer:
            case MinecraftPacketIds.PlayerAuthInput:
            case MinecraftPacketIds.ClientCacheBlobStatus:
            case MinecraftPacketIds.ClientCacheMissResponse:
            case MinecraftPacketIds.LevelChunk:
            case MinecraftPacketIds.MoveActorDelta:

            case MinecraftPacketIds.LevelSoundEvent:
            case MinecraftPacketIds.SetActorData:
            case MinecraftPacketIds.NetworkChunkPublisherUpdate:
            case MinecraftPacketIds.SetTime:
            case MinecraftPacketIds.UpdateAttributes:
            case MinecraftPacketIds.SetActorMotion:
                continue;
        }
    }
}



console.log('AntiCheats Enabled'.bgRed+'\nEasy AntiCheats By'.blue+'\nhttps://github.com/Rjlintkh/bdsx-aniketos.git'.magenta)
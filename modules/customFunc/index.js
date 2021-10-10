"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScoreSync = exports.onUseItem = exports.StopRequested = exports.PlayerHasItem = exports.getScore = exports.playerPermission = void 0;
const playerPermission_1 = require("./playerPermission");
Object.defineProperty(exports, "playerPermission", { enumerable: true, get: function () { return playerPermission_1.playerPermission; } });
const getScore_1 = require("./getScore");
Object.defineProperty(exports, "getScore", { enumerable: true, get: function () { return getScore_1.getScore; } });
Object.defineProperty(exports, "getScoreSync", { enumerable: true, get: function () { return getScore_1.getScoreSync; } });
const PlayerHasItem_1 = require("./PlayerHasItem");
Object.defineProperty(exports, "PlayerHasItem", { enumerable: true, get: function () { return PlayerHasItem_1.PlayerHasItem; } });
const stopRequest_1 = require("./stopRequest");
Object.defineProperty(exports, "StopRequested", { enumerable: true, get: function () { return stopRequest_1.StopRequested; } });
const onUse_1 = require("./onUse");
Object.defineProperty(exports, "onUseItem", { enumerable: true, get: function () { return onUse_1.onUseItem; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5REFBc0Q7QUFNbEQsaUdBTkssbUNBQWdCLE9BTUw7QUFMcEIseUNBQW9EO0FBTWhELHlGQU5LLG1CQUFRLE9BTUw7QUFJUiw2RkFWZSx1QkFBWSxPQVVmO0FBVGhCLG1EQUFnRDtBQU01Qyw4RkFOSyw2QkFBYSxPQU1MO0FBTGpCLCtDQUE4QztBQU0xQyw4RkFOSywyQkFBYSxPQU1MO0FBTGpCLG1DQUFvQztBQU1oQywwRkFOSyxpQkFBUyxPQU1MIn0=
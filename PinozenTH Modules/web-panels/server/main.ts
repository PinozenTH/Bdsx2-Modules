import { panel } from "./server";
const port = require('../../config.json');

panel.init();

console.log(`Bdsx-Web-Panel is Online\nVisit Panel with localhost:${port.port}\nCredits: Web panel from \nhttps://github.com/Rjlintkh/bdsx-web-panel.git`);
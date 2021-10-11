import { panel } from "./server";

panel.init();

console.log(`Bdsx-Web-Panel is Online`+`\nVisit Panel with https://localhost:${panel.config.port}`.magenta+`\nCredits: Web panel from \n`.green+`https://github.com/Rjlintkh/bdsx-web-panel.git`.yellow);
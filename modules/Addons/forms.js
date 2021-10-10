"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainForm = void 0;
const form_1 = require("bdsx/bds/form");
const __1 = require("../..");
function mainForm(client) {
    const form = new form_1.SimpleForm();
    form.setTitle("Private Message");
    form.setContent("Choose how you search for a player to send a private message to him.");
    form.addButton(new form_1.FormButton("By nickname"));
    form.addButton(new form_1.FormButton("By list"));
    form.sendTo(client.getNetworkIdentifier(), async (data) => {
        if (data === null) {
            // pass
        }
        else {
            switch (data.response) {
                case 0:
                    byNicknameForm(client);
                    break;
                case 1:
                    byListForm(client);
                    break;
            }
        }
    });
}
exports.mainForm = mainForm;
function byNicknameForm(client) {
    const client_name = client.getName();
    const form = new form_1.CustomForm();
    form.setTitle("Private Message");
    form.addComponent(new form_1.FormInput("Write the player's nickname", "Steve"));
    form.addComponent(new form_1.FormInput("Message", "Hello Steve!"));
    form.sendTo(client.getNetworkIdentifier(), async (data) => {
        if (data === null) {
            // pass
        }
        else {
            const name = data.response[0];
            const message = data.response[1];
            if (name.length === 0 || message.length === 0) {
                client.sendMessage("§c[PM] Error! Message or nickname is empty!");
            }
            else {
                if (client_name === name) {
                    client.sendMessage("§c[PM] Error! You cannot send messages to yourself!");
                }
                else {
                    let find = false;
                    for (let i = 0; i < __1.players.length; i++) {
                        const target = __1.players[i];
                        if (target.getName() === name) {
                            find = true;
                            client.sendMessage(`[PM] You have sent a message to player §a${name}§r!`);
                            target.sendMessage(`[PM] Message from §a${client_name}§f -> §9${message}§r`);
                            break;
                        }
                        if (find === false) {
                            client.sendMessage("§c[PM] Error! Player not found! He may have already left from server.");
                        }
                    }
                }
            }
        }
    });
}
function byListForm(client) {
    const client_name = client.getName();
    const names = (0, __1.getNames)(client_name);
    if (names.length === 0) {
        client.sendMessage("§c[PM] Error! There are no players on the server besides you!");
    }
    else {
        const form = new form_1.CustomForm();
        form.setTitle("Private Message");
        form.addComponent(new form_1.FormDropdown("Select a player from the list", names));
        form.addComponent(new form_1.FormInput("Message", "Hello Steve!"));
        form.sendTo(client.getNetworkIdentifier(), async (data) => {
            if (data === null) {
                // pass
            }
            else {
                const name = data.response[0];
                const message = data.response[1];
                if (message.length === 0) {
                    client.sendMessage("§c[PM] Error! Message is empty!");
                }
                else {
                    let find = false;
                    for (let i = 0; i < __1.players.length; i++) {
                        const target = __1.players[i];
                        if (target.getName() === names[name]) {
                            find = true;
                            client.sendMessage(`[PM] You have sent a message to player §a${name}§r!`);
                            target.sendMessage(`[PM] Message from §a${client_name}§f -> §9${message}§r`);
                            break;
                        }
                    }
                    if (find === false) {
                        client.sendMessage("§c[PM] Error! Player not found! He may have already left from server.");
                    }
                }
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmb3Jtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx3Q0FBNEY7QUFDNUYsNkJBQTBDO0FBRTFDLFNBQWdCLFFBQVEsQ0FBQyxNQUFvQjtJQUN6QyxNQUFNLElBQUksR0FBRyxJQUFJLGlCQUFVLEVBQUUsQ0FBQztJQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxzRUFBc0UsQ0FBQyxDQUFDO0lBQ3hGLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxpQkFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUE7SUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLGlCQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTtJQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUN0RCxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7WUFDZixPQUFPO1NBQ1Y7YUFBTTtZQUNILFFBQVEsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDbkIsS0FBSyxDQUFDO29CQUNGLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDdkIsTUFBTTtnQkFFVixLQUFLLENBQUM7b0JBQ0YsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNuQixNQUFNO2FBQ2I7U0FDSjtJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQXJCRCw0QkFxQkM7QUFFRCxTQUFTLGNBQWMsQ0FBQyxNQUFvQjtJQUN4QyxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDckMsTUFBTSxJQUFJLEdBQUcsSUFBSSxpQkFBVSxFQUFFLENBQUM7SUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ2pDLElBQUks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
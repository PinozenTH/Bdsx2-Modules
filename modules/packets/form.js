"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.form = exports.Formsend = exports.formJSONTYPE = exports.FormData = void 0;
const packetids_1 = require("bdsx/bds/packetids");
const packets_1 = require("bdsx/bds/packets");
const event_1 = require("bdsx/event");
exports.FormData = new Map();
class formJSONTYPE {
}
exports.formJSONTYPE = formJSONTYPE;
class formJSON {
    constructor() {
        this.type = "form";
        this.title = "";
        this.content = "";
        this.buttons = [];
    }
}
class CustomformJSON {
    constructor() {
        this.type = "custom_form";
        this.title = "";
        this.content = [];
    }
}
class modalJSON {
    constructor() {
        this.type = "modal";
        this.title = "";
        this.content = "";
        this.button1 = "";
        this.button2 = "";
    }
}
class formSetting extends CustomformJSON {
}
class FormFile {
    constructor() {
        this.json = new formJSON();
    }
    setTitle(title) {
        this.json.title = title;
    }
    setContent(content) {
        this.json.content = content;
    }
    addButton(text, image) {
        return this.json.buttons.push({
            text: text,
            image: image
        });
    }
    addhandler(handler) {
        this.handler = handler;
    }
    send() {
        Formsend(this.target, this.json, this.handler);
    }
}
class CustomFormFile {
    constructor() {
        this.json = new CustomformJSON();
    }
    setTitle(title) {
        this.json.title = title;
    }
    addContent(content) {
        this.json.content = content;
    }
    addhandler(handler) {
        this.handler = handler;
    }
    send() {
        Formsend(this.target, this.json, this.handler);
    }
}
class ModalFile {
    constructor() {
        this.json = new modalJSON();
    }
    setTitle(title) {
        this.json.title = title;
    }
    setContent(content) {
        this.json.content = content;
    }
    setButton1(button) {
        this.json.button1 = button;
    }
    setButton2(button) {
        this.json.button2 = button;
    }
    addhandler(handler) {
        this.handler = handler;
    }
    send() {
        Formsend(this.target, this.json, this.handler);
    }
}
/**
  *JsonType example : https://github.com/NLOGPlugins/Form_Json You can use form.write instead of this
*/
function Formsend(target, form, handler, id) {
    try {
        const modalPacket = packets_1.ModalFormRequestPacket.create();
        let formId = Math.floor(Math.random() * 1147483647) + 1000000000;
        if (typeof id === "number")
            formId = id;
        modalPacket.setUint32(formId, 0x30);
        modalPacket.setCxxString(JSON.stringify(form), 0x38);
        modalPacket.sendTo(target, 0);
        if (handler === undefined)
            handler = () => { };
        if (!exports.FormData.has(target)) {
            exports.FormData.set(target, [
                {
                    Id: formId,
                    func: handler
                }
            ]);
        }
        else {
            let f = exports.FormData.get(target);
            f.push({
                Id: formId,
                func: handler
            });
            exports.FormData.set(target, f);
        }
        modalPacket.dispose();
    }
    catch (err) { }
}
exports.Formsend = Formsend;
var form;
(function (form_1) {
    form_1.create = {
        form: (target) => {
            let form = new FormFile();
            form.target = target;
            return form;
        },
        custom_form: (target) => {
            let form = new CustomFormFile();
            form.target = target;
            return form;
        },
        modal: (target) => {
            let form = new ModalFile();
            form.target = target;
            return form;
        }
    };
    form_1.write = Formsend;
    function setSettingForm(form, handler = (data, target, json) => { }) {
        settingForm = form;
        settingHandler = handler;
    }
    form_1.setSettingForm = setSettingForm;
})(form = exports.form || (exports.form = {}));
let settingForm;
let settingHandler = (data, target, json) => { };
event_1.events.packetAfter(packetids_1.MinecraftPacketIds.ServerSettingsRequest).on((ptr, target) => {
    if (settingForm === undefined)
        return;
    setTimeout(() => {
        const packet = packets_1.ServerSettingsResponsePacket.create();
        packet.setUint32(5928, 0x30);
        packet.setCxxString(JSON.stringify(settingForm(target)), 0x38);
        packet.sendTo(target);
        packet.dispose();
    }, 2000);
});
event_1.events.packetRaw(packetids_1.MinecraftPacketIds.ModalFormResponse).on((ptr, size, target) => {
    ptr.move(1);
    let formId = ptr.readVarUint();
    let formData = ptr.readVarString();
    let data = JSON.parse(formData.replace("\n", ""));
    if (formId === 5928) {
        let f = {};
        if (settingForm !== undefined)
            f = settingForm(target);
        settingHandler(data, target, f);
        return;
    }
    let dataValue = exports.FormData.get(target).find((v) => v.Id === formId);
    if (dataValue === undefined)
        return;
    dataValue.func(data);
    let f = exports.FormData.get(target);
    f.splice(f.indexOf(dataValue), 1);
    exports.FormData.set(target, f);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsa0RBQXdEO0FBRXhELDhDQUE2RztBQUM3RyxzQ0FBb0M7QUFFekIsUUFBQSxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQTBELENBQUM7QUFDeEYsTUFBYSxZQUFZO0NBT3hCO0FBUEQsb0NBT0M7QUFFRCxNQUFNLFFBQVE7SUFBZDtRQUNJLFNBQUksR0FBVSxNQUFNLENBQUM7UUFDckIsVUFBSyxHQUFVLEVBQUUsQ0FBQztRQUNsQixZQUFPLEdBQVUsRUFBRSxDQUFDO1FBQ3BCLFlBQU8sR0FBK0IsRUFBRSxDQUFDO0lBQzdDLENBQUM7Q0FBQTtBQUVELE1BQU0sY0FBYztJQUFwQjtRQUNJLFNBQUksR0FBaUIsYUFBYSxDQUFDO1FBQ25DLFVBQUssR0FBVSxFQUFFLENBQUM7UUFDbEIsWUFBTyxHQUFTLEVBQUUsQ0FBQztJQUN2QixDQUFDO0NBQUE7QUFFRCxNQUFNLFNBQVM7SUFBZjtRQUNJLFNBQUksR0FBVyxPQUFPLENBQUM7UUFDdkIsVUFBSyxHQUFVLEVBQUUsQ0FBQztRQUNsQixZQUFPLEdBQVUsRUFBRSxDQUFDO1FBQ3BCLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFDckIsWUFBTyxHQUFXLEVBQUUsQ0FBQztJQUN6QixDQUFDO0NBQUE7QUFFRCxNQUFNLFdBQVksU0FBUSxjQUFjO0NBRXZDO0FBRUQsTUFBTSxRQUFRO0lBQWQ7UUFDSSxTQUFJLEdBQWEsSUFBSSxRQUFRLEVBQUUsQ0FBQztJQXNCcEMsQ0FBQztJQW5CRyxRQUFRLENBQUMsS0FBWTtRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQUNELFVBQVUsQ0FBQyxPQUFjO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUNoQyxDQUFDO0lBQ0QsU0FBUyxDQUFDLElBQVcs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
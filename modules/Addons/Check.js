"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Check = void 0;
class Check {
    constructor(name, type, description, data) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.data = data;
        this.violations = 0;
        this.buffer = 0;
    }
    flag(suppress = false) {
        if (suppress) {
            // TODO: Reverting movement.
        }
        ++this.violations;
        this.data.sendMessage("[" + this.name + " (" + this.type + ")] " + "vl=" + this.violations);
    }
    reward(amount = 0.01) {
        this.violations = Math.max(this.violations - amount, 0);
    }
}
exports.Check = Check;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJDaGVjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxNQUFzQixLQUFLO0lBS3ZCLFlBQ1csSUFBWSxFQUNaLElBQVksRUFDWixXQUFtQixFQUNuQixJQUFnQjtRQUhoQixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLGdCQUFXLEdBQVgsV0FBVyxDQUFRO1FBQ25CLFNBQUksR0FBSixJQUFJLENBQVk7UUFQcEIsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUN2QixXQUFNLEdBQVcsQ0FBQyxDQUFDO0lBT3hCLENBQUM7SUFJSSxJQUFJLENBQUMsV0FBb0IsS0FBSztRQUNqQyxJQUFJLFFBQVEsRUFBRTtZQUNWLDRCQUE0QjtTQUMvQjtRQUNELEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNoRyxDQUFDO0lBRU0sTUFBTSxDQUFDLFNBQWlCLElBQUk7UUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7Q0FFSjtBQTFCRCxzQkEwQkMifQ==
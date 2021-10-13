"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryRenderer = void 0;
class InventoryRenderer {
    constructor(inventory) {
        this.options = {
            controls: {
                zoom: false,
                rotate: false,
                pan: false,
            },
            canvas: {
                height: InventoryRenderer.size[0] * 2,
                width: InventoryRenderer.size[1] * 2,
            }
        };
        this.content = [
            {
                name: "base",
                texture: "/gui/container/inventory",
                uv: [0, 0, InventoryRenderer.size[0], InventoryRenderer.size[1]],
                pos: [0, 0],
                layer: 0,
            }
        ];
        for (const [index, item] of inventory.getSlots().toArray().entries()) {
            if (!item.isNull()) {
                this.content.push({
                    name: "item",
                    texture: "/item/apple",
                    uv: [0, 0, 16, 16],
                    pos: InventoryRenderer.inventorySlotPos(index),
                    layer: 1,
                });
            }
        }
    }
    static inventorySlotPos(slot) {
        let _slot = slot;
        let x = 0;
        let y = 0;
        while (_slot > 8) {
            _slot -= 9;
            y++;
        }
        x = _slot;
        const pos = InventoryRenderer.top_origin;
        pos[0] += x * InventoryRenderer.item_offset[0];
        pos[1] += y * InventoryRenderer.item_offset[1];
        if (y === 3) {
            pos[1] += 4;
        }
        return pos;
    }
}
exports.InventoryRenderer = InventoryRenderer;
InventoryRenderer.size = [176, 166];
InventoryRenderer.top_origin = [8, 84];
InventoryRenderer.item_offset = [18, 18];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7O0FBTWQsTUFBYSxpQkFBaUI7SUF5QzFCLFlBQVksU0FBMEI7UUFwQnRDLFlBQU8sR0FBRztZQUNOLFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsS0FBSztnQkFDWCxNQUFNLEVBQUUsS0FBSztnQkFDYixHQUFHLEVBQUUsS0FBSzthQUNiO1lBQ0QsTUFBTSxFQUFDO2dCQUNILE1BQU0sRUFBRSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztnQkFDckMsS0FBSyxFQUFFLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO2FBQ3ZDO1NBQ0osQ0FBQTtRQUNELFlBQU8sR0FBRztZQUNOO2dCQUNJLElBQUksRUFBRSxNQUFNO2dCQUNaLE9BQU8sRUFBRSwwQkFBMEI7Z0JBQ25DLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEUsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDWCxLQUFLLEVBQUUsQ0FBQzthQUNYO1NBQ0osQ0FBQTtRQUVHLEtBQUssTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDbEUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQ2QsSUFBSSxFQUFFLE1BQU07b0JBQ1osT0FBTyxFQUFFLGFBQWE7b0JBQ3RCLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztvQkFDbEIsR0FBRyxFQUFFLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQztvQkFDOUMsS0FBSyxFQUFFLENBQUM7aUJBQ1gsQ0FBQyxDQUFBO2FBQ0w7U0FDSjtJQUNMLENBQUM7SUFqREQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQVk7UUFDaEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNWLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNWLE9BQU8sS0FBSyxHQUFHLENBQUMsRUFBRTtZQUNkLEtBQUssSUFBSSxDQUFDLENBQUM7WUFDWCxDQUFDLEVBQUUsQ0FBQztTQUNQO1FBQ0QsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNWLE1BQU0sR0FBRyxHQUFHLGlCQUFpQixDQUFDLFVBQVUsQ0FBQztRQUN6QyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDVCxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7O0FBcEJMLDhDQXNEQztBQXJEVSxzQkFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0FBQ2pCLDRCQUFVLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFDcEIsNkJBQVcsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQSJ9
import { PacketBuffer } from "./PacketBuffer";

export function readPacketNbt(buffer: PacketBuffer) {
    let nbtInstance: NbtTag<any> = Reflect.construct(nbtTagTypes[buffer.getUInt8(buffer.offset)], []);
    nbtInstance.readInfoPacketNbt(buffer);
    return nbtInstance;
};

export function nbtTagArrayToJson(nbtTagArray: NbtTag<any>[]): any {
    let nbtJson: any = {};
    for (let nbtTag of nbtTagArray) {
        nbtJson[nbtTag.name] = nbtTag.payload;
    }
    return nbtJson;
}


export abstract class NbtTag<T> {
    abstract id: number; // ID of the tag type
    abstract name: string; // Tags name. "" for no name
    abstract payload: T; // Payload depends on the type

    abstract readPacketNbt(buffer: PacketBuffer): T;

    abstract writePacketNbt(buffer: PacketBuffer): any;

    readInfoPacketNbt(buffer: PacketBuffer): T {
        if (buffer.readUInt8() !== this.id) {
            throw "Error: ID read is not same as tag ID";
        }

        if (this.id === 0 ) {
            return this.payload;
        }
        this.name = buffer.readString();
        this.readPacketNbt(buffer);

        return this.payload;
    }

    writeInfoPacketNbt(buffer: PacketBuffer) {
        if (this.id === 0) {
            buffer.writeUInt8(0);
            return;
        }
        buffer.writeUInt8(this.id);
        buffer.writeString(this.name);
        this.writePacketNbt(buffer);
    }
}

export class NbtEnd extends NbtTag<{}> {
    id: number;
    name: string;
    payload: {};

    constructor() {
        super();
        this.id = 0;
        this.name = "";
        this.payload = {};
    }

    readPacketNbt(buffer: PacketBuffer): {} {
        return this.payload;
    }


    writePacketNbt(buffer: PacketBuffer) {
        return;
    }
}

export class NbtByte extends NbtTag<number> {
    id: number;
    name: string;
    payload: number;

    constructor() {
        super();
        this.id = 1;
    }

    readPacketNbt(buffer: PacketBuffer): number {
        this.payload = buffer.readInt8();
        return this.payload;
    }

    writePacketNbt(buffer: PacketBuffer) {
        buffer.writeInt8(this.payload);
    }
}

export class NbtShort extends NbtTag<number> {
    id: number;
    name: string;
    payload: number;
    size: number;

    constructor() {
        super();
        this.id = 2;
    }

    readPacketNbt(buffer: PacketBuffer): number {
        this.payload = buffer.readInt16LE();
        return this.payload;
    }


    writePacketNbt(buffer: PacketBuffer) {
        buffer.writeInt16LE(this.payload);
    }

}

export class NbtInt extends NbtTag<number> {
    id: number;
    name: string;
    payload: number;

    constructor() {
        super();
        this.id = 3;
    }

    readPacketNbt(buffer: PacketBuffer): number {
        this.payload = buffer.readZigZagVarInt();
        return this.payload;
    }

    writePacketNbt(buffer: PacketBuffer) {
        buffer.writeZigZagVarInt(this.payload);
    }
}

export class NbtLong extends NbtTag<number | [number, number]> {
    id: number;
    name: string;
    payload: number | [number, number];

    constructor() {
        super();
        this.id = 4;
    }

    readPacketNbt(buffer: PacketBuffer): number | [number, number] {
        this.payload = buffer.readZigZagVarLong();
        return this.payload;
    }

    writePacketNbt(buffer: PacketBuffer) {
        buffer.writeZigZagVarLong(this.payload);
    }
}

export class NbtFloat extends NbtTag<number> {
    id: number;
    name: string;
    payload: number;

    constructor() {
        super();
        this.id = 5;
    }

    readPacketNbt(buffer: PacketBuffer): number {
        this.payload = buffer.readFloatLE();
        return this.payload;
    }

    writePacketNbt(buffer: PacketBuffer) {
        buffer.writeFloatLE(this.payload);
    }
}

export class NbtDouble extends NbtTag<[number, number]> {
    id: number;
    name: string;
    payload: [number, number];

    constructor() {
        super();
        this.id = 6;
    }

    readPacketNbt(buffer: PacketBuffer): [number, number] {
        this.payload = buffer.readDoubleLE();
        return this.payload;
    }

    writePacketNbt(buffer: PacketBuffer) {
        buffer.writeDoubleLE(this.payload);
    }
}

export class NbtByteArray extends NbtTag<number[]> {
    id: number;
    name: string;
    payload: number[] = [];

    constructor() {
        super();
        this.id = 7;
    }

    readPacketNbt(buffer: PacketBuffer): number[] {
        return buffer.readByteArray();
    }

    writePacketNbt(buffer: PacketBuffer) {
        buffer.writeByteArray(this.payload);
    }
}

export class NbtString extends NbtTag<string> {
    id: number;
    name: string;
    payload: string;

    constructor() {
        super()
        this.id = 8;
    }

    readPacketNbt(buffer: PacketBuffer): string {
        this.payload = buffer.readString();
        return this.payload;
    }

    writePacketNbt(buffer: PacketBuffer) {
        buffer.writeString(this.payload);
    }
}

export class NbtList extends NbtTag<NbtTag<any>[]> {
    id: number;
    name: string;
    payload: NbtTag<any>[] = [];

    constructor() {
        super();
        this.id = 9;
    }

    readPacketNbt(buffer: PacketBuffer): NbtTag<any>[] {
        this.payload = [];
        let TypeId = buffer.readUInt8();
        let listLength = buffer.readZigZagVarInt();
        for (let i = 0; i < listLength; i++) {
            let nbtTagInstance = Reflect.construct(nbtTagTypes[TypeId], []);
            if (TypeId === 9) {
            }
            nbtTagInstance.readPacketNbt(buffer);
            this.payload.push(nbtTagInstance);
        }
        return this.payload;
    }

    writePacketNbt(buffer: PacketBuffer) {
        if (this.payload.length !== 0) {
            buffer.writeUInt8(this.payload[0].id);
        }

        buffer.writeZigZagVarInt(this.payload.length);

        for(let nbtTag of this.payload) {
            nbtTag.writePacketNbt(buffer);
        }
    }
}

export class NbtCompound extends NbtTag<NbtTag<any>[]>{
    id: number;
    name: string;
    payload: NbtTag<any>[] = [];

    constructor() {
        super();
        this.id = 10;
    }

    readPacketNbt(buffer: PacketBuffer): NbtTag<any>[] {
        this.payload = [];
        while (true) {
            let nbtId = buffer.getUInt8(buffer.offset);
            let nbtInstance = Reflect.construct(nbtTagTypes[nbtId], []);
            nbtInstance.readInfoPacketNbt(buffer);
            if (nbtId === 0) {
                break;
            };
            this.payload.push(nbtInstance);
        }
        return this.payload;
    }

    writePacketNbt(buffer: PacketBuffer) {
        for (let nbtTag of this.payload) {
            nbtTag.writeInfoPacketNbt(buffer);
        }
        buffer.writeUInt8(0);
    }
}

export class NbtIntArray extends NbtTag<number[]> {
    id: number;
    name: string;
    payload: number[] = [];

    constructor() {
        super();
        this.id = 11;
    }

    readPacketNbt(buffer: PacketBuffer): number[] {
        this.payload = [];
        let arrayLength = buffer.readZigZagVarInt();
        for (let i = 0; i < arrayLength; i++) {
            this.payload.push(buffer.readZigZagVarInt());
        }
        return this.payload;
    }

    writePacketNbt(buffer: PacketBuffer) {
        buffer.writeZigZagVarInt(this.payload.length);
        for (let int of this.payload) {
            buffer.writeZigZagVarInt(int);
        }
    }
}

export class NbtLongArray extends NbtTag<any[]> {
    id: number;
    name: string;
    payload: any[] = [];

    constructor() {
        super();
        this.id = 12;
    }

    readPacketNbt(buffer: PacketBuffer): any[] {
        this.payload = [];
        let arrayLength = buffer.readZigZagVarInt();
        for (let i = 0; i < arrayLength; i++) {
            this.payload.push(buffer.readZigZagVarLong());
        }
        return this.payload;
    }

    writePacketNbt(buffer: PacketBuffer) {
        buffer.writeZigZagVarInt(this.payload.length);
        for (let varLong of this.payload) {
            buffer.writeZigZagVarLong(varLong);
        }
    }
}

export let nbtTagTypes: any[] = [
    NbtEnd,
    NbtByte,
    NbtShort,
    NbtInt,
    NbtLong,
    NbtFloat,
    NbtDouble,
    NbtByteArray,
    NbtString,
    NbtList,
    NbtCompound,
    NbtIntArray,
    NbtLongArray
]
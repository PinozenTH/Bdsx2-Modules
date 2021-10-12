import { NativePointer } from "bdsx/core";

export function packetBufferFromBuffer(buffer: Buffer) {
    let size = 0;
    try {
        while (true) {
            buffer.readUInt8(size)
            size++;
        }
    } catch {
        return new PacketBuffer(size);
    }
}


export class PacketBuffer {
    buffer: Buffer;
    offset: number;
    length: number;

    constructor(size: number) {
        this.buffer = Buffer.alloc(size);
        this.offset = 0;
        this.length = size;
    }

    print() {
        let byteArray = [];
        for (let i = 0; i < this.buffer.length; i++) {
            if (i === this.offset) {
                byteArray.push(this.getUInt8(i).toString(16).blue);
            } else {
                byteArray.push(this.getUInt8(i).toString(16));
            }
        }
    }

    static fromPointer(ptr: NativePointer, size: number): PacketBuffer {
        let byteArray = [];
        let Buffer = new PacketBuffer(size);
        for (let i = 0; i < size; i++) {
            Buffer.writeUInt8(ptr.readUint8());
        }
        Buffer.offset = 0;
        return Buffer;
    }

    resetOffset() {
        this.offset = 0;
    }

    readUInt8(): number {
        let result = this.buffer.readUInt8(this.offset);
        this.offset++
        return result;
    }

    readInt8(): number {
        let result = this.buffer.readInt8(this.offset);
        this.offset++;
        return result;
    }

    readUInt16LE(): number {
        let result = this.buffer.readUInt16LE(this.offset);
        this.offset += 2;
        return result;
    }

    readInt16LE(): number {
        let result = this.buffer.readInt16LE(this.offset);
        this.offset += 2;
        return result;
    }

    readInt32LE(): number {
        let result = this.buffer.readInt32LE(this.offset);
        this.offset += 4;
        return result;
    }

    readFloatLE(): number {
        let result = this.buffer.readFloatLE(this.offset);
        this.offset += 4;
        return result;
    }

    readVarInt(): number {
        let numRead: number = 0;
        let result = 0;
        let read: number;
        do {
            read = this.readUInt8();
            let value = (read & 0b01111111);
            result |= (value << (7 * numRead));

            numRead++;
            if (numRead > 5) {
                throw "VarInt is too long!";
            }
        } while ((read & 0b10000000) !== 0);
        return result;
    }

    readUVarInt(): number {
        let resultNormal = this.readVarInt();
        let result = resultNormal & 0xffffffff;
        return result;
    }

    readZigZagVarInt(): number {
        let resultNormal = this.readVarInt();
        return (resultNormal >> 1) ^ -(resultNormal & 1);
    }

    readString(): string {
        let stringLength = this.readVarInt();
        let stringCharArray: any = [];
        for (let i = 0; i < stringLength; i++) {
            stringCharArray.push(String.fromCharCode(this.readUInt8()))
        }

        return stringCharArray.join("");
    }

    readLongLE(): [number, number] {
        return [this.readInt32LE(), this.readInt32LE()];
    }

    readDoubleLE(): [number, number] {
        return [this.readInt32LE(), this.readInt32LE()];
    }

    readVarLong(): number | [number, number] {
        let numRead: number = 0;
        let result = 0;
        let read: number;
        do {
            read = this.readUInt8();
            let value = (read & 0b01111111);
            result |= (value << (7 * numRead));

            numRead++;
            if (numRead > 5) {
                console.log("[PacketBuffer] VarLong too big, reading second varint");
                return [value, this.readVarInt()];
            }
        } while ((read & 0b10000000) !== 0);
        return result;
    }

    readUVarLong(): number | [number, number] {
        let resultNormal = this.readVarLong();
        if (typeof resultNormal === "number") {
            return resultNormal & 0xffffffff;
        } else {
            return [resultNormal[0] & 0xffffffff, resultNormal[1] & 0xffffffff];
        }
    }

    readZigZagVarLong(): number | [number, number] {
        let resultNormal = this.readVarLong();
        if (typeof resultNormal === "number") {
            return (resultNormal >> 1) ^ -(resultNormal & 1);
        } else {
            return [(resultNormal[0] >> 1) ^ -(resultNormal[0] & 1), (resultNormal[1] >> 1) ^ -(resultNormal[1] & 1)];
        }
    }

    readByteArray(): number[] {
        let byteArray: number[] = [];
        let byteLength = this.readZigZagVarInt();
        for (let i = 0; i < byteLength; i++) {
            byteArray.push(this.readUInt8());
        }
        return byteArray;
    }

    getUInt8(offset: number): number {
        return this.buffer.readUInt8(offset);
    }

    writeUInt8(value: number) {
        this.buffer.writeUInt8(value, this.offset)
        this.offset++;
    }

    writeInt8(value: number) {
        this.buffer.writeInt8(value, this.offset);
        this.offset++;
    }

    writeUInt16LE(value: number) {
        this.buffer.writeUInt16LE(value, this.offset);
        this.offset += 2;
    }

    writeInt16LE(value: number) {
        this.buffer.writeInt16LE(value, this.offset);
        this.offset += 2;
    }

    writeInt32LE(value: number) {
        this.buffer.writeInt32LE(value, this.offset);
        this.offset += 4;
    }

    writeFloatLE(value: number) {
        this.buffer.writeFloatLE(value, this.offset);
        this.offset += 4;
    }

    writeVarInt(value: number) {
        do {
            let temp: number = (value & 0b01111111);
            value >>>= 7;
            if (value != 0) {
                temp |= 0b10000000;
            }
            this.writeUInt8(temp);
        } while (value !== 0);
    }

    writeZigZagVarInt(value: number) {
        value = (value >> 31) ^ (value << 1);
        this.writeVarInt(value);
    }

    writeString(value: string) {
        let stringLength = value.length;
        this.writeVarInt(stringLength);
        for (let i = 0; i < stringLength; i++) {
            this.writeUInt8(value.charCodeAt(i));
        }
    }

    writeLongLE(value: [number, number]) {
        this.writeInt32LE(value[0]);
        this.writeInt32LE(value[1]);
    }

    writeDoubleLE(value: [number, number]) {
        this.writeInt32LE(value[0]);
        this.writeInt32LE(value[1]);
    }

    writeByteArray(value: number[]) {
        this.writeZigZagVarInt(value.length);
        for (let byte of value) {
            this.writeUInt8(byte);
        }
    }

    writeVarLong(value: number | [number, number]) {
        if (typeof value === "number") {
            this.writeVarInt(value);
        } else {
            this.writeVarInt(value[0])
            this.writeVarInt(value[1]);
        }
    }

    writeZigZagVarLong(value: number | [number, number]) {
        if (typeof value === "number") {
            value = (value >> 31) ^ (value << 1);
        } else {
            value[0] = (value[0] >> 32) ^ (value[0] << 1);
            value[1] = (value[1] >> 32) ^ (value[1] << 1);
        }
        this.writeVarLong(value);
    }
}


export declare function memdiff(dst: number[] | Uint8Array, src: number[] | Uint8Array): number[];
export declare function memdiff_contains(larger: number[], smaller: number[]): boolean;
export declare function memcheck(code: Uint8Array, originalCode: number[], skip?: number[]): number[] | null;
export declare function hex(values: number[] | Uint8Array, nextLinePer?: number): string;
export declare function unhex(hex: string): Uint8Array;
export declare const _tickCallback: () => void;
/**
 * @param lineIndex first line is zero
 */
export declare function indexOfLine(context: string, lineIndex: number, p?: number): number;
/**
 * removeLine("a \n b \n c", 1, 2) === "a \n c"
 * @param lineFrom first line is zero
 * @param lineTo first line is one
 */
export declare function removeLine(context: string, lineFrom: number, lineTo: number): string;
/**
 * @param lineIndex first line is zero
 */
export declare function getLineAt(context: string, lineIndex: number): string;
export declare function isBaseOf<BASE>(t: unknown, base: {
    new (...args: any[]): BASE;
}): t is {
    new (...args: any[]): BASE;
};
/**
 * @deprecated use util.inspect
 */
export declare function anyToString(v: unknown): string;
export declare function str2set(str: string): Set<number>;
export declare function arrayEquals(arr1: any[], arr2: any[], count: number): boolean;
export declare function makeSignature(sig: string): number;
export declare function checkPowOf2(n: number): void;
export declare function numberWithFillZero(n: number, width: number, radix?: number): string;
export declare function filterToIdentifierableString(name: string): string;
export declare function printOnProgress(message: string): void;
export declare const ESCAPE = "\u00A7";
export declare const TextFormat: {
    BLACK: string;
    DARK_BLUE: string;
    DARK_GREEN: string;
    DARK_AQUA: string;
    DARK_RED: string;
    DARK_PURPLE: string;
    GOLD: string;
    GRAY: string;
    DARK_GRAY: string;
    BLUE: string;
    GREEN: string;
    AQUA: string;
    RED: string;
    LIGHT_PURPLE: string;
    YELLOW: string;
    WHITE: string;
    RESET: string;
    OBFUSCATED: string;
    BOLD: string;
    STRIKETHROUGH: string;
    UNDERLINE: string;
    ITALIC: string;
    THIN: string;
};

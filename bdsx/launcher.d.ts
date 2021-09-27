import { MCRESULT } from "./bds/command";
import { Dimension } from "./bds/dimension";
declare module 'colors' {
    const brightRed: Color;
    const brightGreen: Color;
    const brightYellow: Color;
    const brightBlue: Color;
    const brightMagenta: Color;
    const brightCyan: Color;
    const brightWhite: Color;
}
export declare namespace bedrockServer {
    let sessionId: string;
    function withLoading(): Promise<void>;
    function afterOpen(): Promise<void>;
    function isLaunched(): boolean;
    /**
     * stop the BDS
     * It will stop next tick
     */
    function stop(): void;
    function forceKill(exitCode: number): never;
    function launch(): Promise<void>;
    /**
     * pass to stdin
     */
    function executeCommandOnConsole(command: string): void;
    /**
     * it does the same thing with executeCommandOnConsole
     * but call the internal function directly
     */
    function executeCommand(command: string, mute?: boolean, permissionLevel?: number, dimension?: Dimension | null): MCRESULT;
    abstract class DefaultStdInHandler {
        protected online: (line: string) => void;
        protected readonly onclose: () => void;
        protected constructor();
        abstract close(): void;
        static install(): DefaultStdInHandler;
    }
}

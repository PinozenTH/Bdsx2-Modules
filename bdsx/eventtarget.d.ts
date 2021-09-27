import { CANCEL } from './common';
export interface CapsuledEvent<T extends (...args: any[]) => any> {
    /**
     * return true if there are no connected listeners
     */
    isEmpty(): boolean;
    /**
     * add listener
     */
    on(listener: T): void;
    onFirst(listener: T): void;
    onLast(listener: T): void;
    /**
     * add listener before needle
     */
    onBefore(listener: T, needle: T): void;
    /**
     * add listener after needle
     */
    onAfter(listener: T, needle: T): void;
    remove(listener: T): boolean;
}
export declare class Event<T extends (...args: any[]) => (number | CANCEL | void | Promise<void>)> implements CapsuledEvent<T> {
    private readonly listeners;
    isEmpty(): boolean;
    /**
     * cancel event if it returns non-undefined value
     */
    on(listener: T): void;
    onFirst(listener: T): void;
    onLast(listener: T): void;
    onBefore(listener: T, needle: T): void;
    onAfter(listener: T, needle: T): void;
    remove(listener: T): boolean;
    /**
     * return value if it canceled
     */
    private _fireWithoutErrorHandling;
    /**
     * return value if it canceled
     */
    fire(...v: T extends (...args: infer ARGS) => any ? ARGS : never): (T extends (...args: any[]) => infer RET ? RET : never) | undefined;
    /**
     * reverse listener orders
     * return value if it canceled
     */
    fireReverse(...v: T extends (...args: infer ARGS) => any ? ARGS : never): (T extends (...args: any[]) => infer RET ? RET : never) | undefined;
    allListeners(): IterableIterator<T>;
    /**
     * remove all listeners
     */
    clear(): void;
    static errorHandler: Event<(error: any) => void | CANCEL>;
}
export declare class EventEx<T extends (...args: any[]) => any> extends Event<T> {
    protected onStarted(): void;
    protected onCleared(): void;
    on(listener: T): void;
    remove(listener: T): boolean;
}

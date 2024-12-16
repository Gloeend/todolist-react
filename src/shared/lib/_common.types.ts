export type TVoidFunction = () => void;
export type TPromiseFunction<T> = () => Promise<T>;
export type TMutatePromiseFunction<T, R> = (payload: T) => Promise<R>;
export type TFunction<T> = (payload: T) => void;
export type TMutateFunction<T, R> = (payload: T) => R;
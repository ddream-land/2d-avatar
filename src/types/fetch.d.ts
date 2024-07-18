export type FetchFunction = <T>(path: string, options?: RequestInit) => Promise<T> | null;

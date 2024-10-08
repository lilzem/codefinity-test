export function forEach<K extends keyof any, V>(
    obj: Record<K, V>,
    callback: (value: V, key: K) => void | false
) {
    for (const key in obj) {
        if (callback(obj[key], key) === false) {
            break;
        }
    }
}

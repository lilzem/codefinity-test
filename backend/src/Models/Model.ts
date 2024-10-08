import Storage from "../storage";

export abstract class Model {
    id!: number;

    [key: string]: any;

    private static storage: Storage;

    protected abstract get storageKey(): string;

    static init(storage: Storage) {
        Model.storage = storage;
    }

    static find<T extends Model>(this: new () => T, id: number): T | undefined {
        const instance = new this();
        return Model.storage.find(instance.storageKey, id) as T;
    }

    static all<T extends Model>(this: new () => T): T[] | undefined {
        const instance = new this();
        return Model.storage.get(instance.storageKey) as T[];
    }

    static firstWhere<T extends Model>(
        this: new () => T,
        field: string,
        operator: string,
        value: any
    ): T | undefined {
        const instance = new this();
        return Model.storage.firstWhere(
            instance.storageKey,
            field,
            operator,
            value
        ) as T;
    }

    update<T extends Model>(changes: Partial<new () => T>): boolean {
        const result = Model.storage.update(this.storageKey, this.id, changes);

        if (!result) {
            return false;
        }

        this.fill(changes);

        return true;
    }

    create(): Model | false {
        const result = Model.storage.create(this.storageKey, this);

        if (!result) {
            return false;
        }

        this.id = result.id;

        return this;
    }

    fill<T extends Model>(changes: Partial<new () => T>): Model {
        Object.entries(changes).forEach(([key, value]) => {
            this[key] = value;
        });

        return this;
    }

    exists(): boolean {
        return this.id !== undefined;
    }
}

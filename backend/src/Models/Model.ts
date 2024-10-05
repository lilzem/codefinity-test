import Storage from "../storage";

export interface IModel {
    getStorageKey(): string;
}

export type Changes = Map<string, any>;

export abstract class Model {
    id!: number;

    [key: string]: any;

    static Storage: Storage;

    abstract getStorageKey(): string;

    static init(storage: Storage) {
        Model.Storage = storage;
    }

    find(id: number): Model | undefined {
        return Model.Storage.find(this.getStorageKey(), id);
    }

    update(changes: Changes): boolean {
        const result = Model.Storage.update(
            this.getStorageKey(),
            this.id,
            changes
        );

        if (!result) {
            return false;
        }

        this.fill(changes);

        return true;
    }

    create(): Model | false {
        const result = Model.Storage.create(this.getStorageKey(), this);

        if (!result) {
            return false;
        }

        this.id = result.id;

        return this;
    }

    all(): Model[] | undefined {
        return Model.Storage.get(this.getStorageKey());
    }

    fill(changes: Changes): Model {
        changes.forEach((value: Model, key: string) => (this[key] = value));

        return this;
    }
}

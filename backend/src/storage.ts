import { Model } from "./Models/Model";

export type ModelArray = Model[];

export default class Storage {
    #entities: Map<string, ModelArray>;

    constructor(keys: string[] = []) {
        this.#entities = new Map<string, ModelArray>();

        keys.forEach((key) => {
            this.#entities.set(key, []);
        });
    }

    get(key: string): ModelArray | undefined {
        return this.#entities.get(key);
    }

    find(key: string, id: number): Model | undefined {
        return this.get(key)?.find((model: Model) => model.id === id);
    }

    firstWhere(
        key: string,
        field: string,
        operator: string,
        value: any
    ): Model | undefined {
        return this.#entities.get(key)?.find((entity) => {
            const entityValue = entity[field];

            if (!entityValue) {
                return false;
            }

            return eval(`entityValue ${operator} value`);
        });
    }

    update<T extends Model>(
        key: string,
        id: number,
        changes: Partial<T>
    ): boolean {
        const models = this.get(key);

        if (!models) {
            return false;
        }

        const updatedIndex = models.findIndex(
            (model: Model) => model.id === id
        );

        if (!updatedIndex) {
            return false;
        }

        models[updatedIndex].fill(changes);

        this.#entities.set(key, models);

        return true;
    }

    create(key: string, model: Model): Model | false {
        if (model.id && this.find(key, model.id)) {
            return false;
        }

        const models = this.get(key);

        if (!models) {
            return false;
        }

        const id = (models[models.length - 1]?.id ?? 0) + 1;
        model.id = id;

        this.#entities.set(key, [...models, model]);

        return model;
    }
}

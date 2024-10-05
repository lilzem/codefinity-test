import { Changes, Model } from "./Models/Model";

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

    find(key: string, id: number | string): Model | undefined {
        return this.get(key)?.find(
            (model: Model) => model.id || model.name === id
        );
    }

    update(key: string, id: number, changes: Changes): boolean {
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

        const updated = models[updatedIndex];
        models.splice(updatedIndex, 1);
        updated.fill(changes);

        this.#entities.set(key, [...models, updated]);

        return true;
    }

    create(key: string, model: Model): Model | false {
        if (this.find(key, model.id)) {
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

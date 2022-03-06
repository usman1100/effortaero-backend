import { Model } from 'mongoose';

export abstract class BaseService<T> {
    constructor(private readonly model: Model<T>) {}

    async find(query: any): Promise<T[]> {
        return this.model.find(query);
    }

    async findById(id: string): Promise<T> {
        return this.model.findById(id);
    }

    async findOne(query: any): Promise<T> {
        return this.model.findOne(query);
    }

    async findByIdAndUpdate(id: string, data: any): Promise<T> {
        return this.model.findByIdAndUpdate(id, data);
    }

    async create(data: any): Promise<T> {
        return this.model.create(data);
    }

    async delete(id: string): Promise<T> {
        return this.model.findByIdAndDelete(id);
    }

    async update(id: string, data: any): Promise<T> {
        return this.model.findByIdAndUpdate(id, data);
    }
}

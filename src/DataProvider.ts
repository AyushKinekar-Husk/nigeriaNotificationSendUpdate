import { BaseRecord, DataProvider, GetOneParams, GetOneResponse, GetListResponse, GetManyResponse, CreateResponse, UpdateResponse, DeleteOneResponse } from "@refinedev/core";
import {  Data } from "./dummyResponse";
import { Customer } from './interface/Customer';

const mockData: Customer[] = Data.Data;

export const mockDataProvider: DataProvider = {
    getApiUrl: () => "", // Added to satisfy DataProvider interface

    getList: async <TData extends BaseRecord = Customer>(): Promise<GetListResponse<TData>> => {
        return {
            data: mockData as any[],
            total: mockData.length,
        };
    },
    getOne: async <TData extends BaseRecord = Customer>({ id }: GetOneParams): Promise<GetOneResponse<TData>> => {
        const record = mockData.find((item) => item.Id === id);
        if (!record) {
            throw new Error("Record not found");
        }
        return { data: record as any };
    },
    create: async <TData extends BaseRecord = Customer>({ variables }:any): Promise<CreateResponse<TData>> => {
        const newRecord: Customer = { ...variables, Id: Date.now() };
        mockData.push(newRecord);
        return { data: newRecord as any };
    },
    update: async <TData extends BaseRecord = Customer>({ id, variables }:any): Promise<UpdateResponse<TData>> => {
        const index = mockData.findIndex((item) => item.Id === id);
        if (index === -1) {
            throw new Error("Record not found");
        }
        mockData[index] = { ...mockData[index], ...variables };
        return { data: mockData[index] as any };
    },
    deleteOne: async <TData extends BaseRecord = Customer>({ id }:any): Promise<DeleteOneResponse<TData>> => {
        const index = mockData.findIndex((item) => item.Id === id);
        if (index === -1) {
            throw new Error("Record not found");
        }
        const [deleted] = mockData.splice(index, 1);
        return { data: deleted as any };
    },
    getMany: async <TData extends BaseRecord = Customer>({ ids }:any): Promise<GetManyResponse<TData>> => {
        const records = mockData.filter((item) => ids.includes(item.Id));
        return { data: records as any[] };
    },
    createMany: async <TData extends BaseRecord = Customer>({ variables }:any): Promise<{ data: TData[] }> => {
        const newRecords: Customer[] = variables.map((v: any) => ({ ...v, Id: Date.now() + Math.random() }));
        mockData.push(...newRecords);
        return { data: newRecords as any[] };
    },
    updateMany: async <TData extends BaseRecord = Customer>({ ids, variables }:any): Promise<{ data: TData[] }> => {
        const updated: Customer[] = [];
        ids.forEach((id: number) => {
            const index = mockData.findIndex((item) => item.Id === id);
            if (index !== -1) {
                mockData[index] = { ...mockData[index], ...variables };
                updated.push(mockData[index]);
            }
        });
        return { data: updated as any[] };
    },
    deleteMany: async <TData extends BaseRecord = Customer>({ ids }:any): Promise<{ data: TData[] }> => {
        const deleted: Customer[] = [];
        ids.forEach((id: number) => {
            const index = mockData.findIndex((item) => item.Id === id);
            if (index !== -1) {
                deleted.push(...mockData.splice(index, 1));
            }
        });
        return { data: deleted as any[] };
    },
};
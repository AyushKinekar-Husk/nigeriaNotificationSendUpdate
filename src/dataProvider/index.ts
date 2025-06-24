import { DataProvider, BaseRecord, GetListResponse, CreateResponse, UpdateResponse, DeleteOneResponse } from "@refinedev/core";
import { NeuronAddMeterService } from "../services/meterService";

const resourceMap: Record<string, any> = {
  meters: NeuronAddMeterService,
  // Add more resource providers here
};

interface ResourceHandler {
    getList?: <TData extends BaseRecord = BaseRecord>(
        params: any
    ) => Promise<GetListResponse<TData>>;
    getOne?: <TData extends BaseRecord = BaseRecord>(
        params: any
    ) => Promise<{ data: TData }>;
    create?: <TData extends BaseRecord = BaseRecord>(
        params: any
    ) => Promise<CreateResponse<TData>>;
    update?: <TData extends BaseRecord = BaseRecord>(
        params: any
    ) => Promise<UpdateResponse<TData>>;
    deleteOne?: <TData extends BaseRecord = BaseRecord>(
        params: any
    ) => Promise<DeleteOneResponse<TData>>;
    // Add other methods as needed
}

type ResourceMap = Record<string, ResourceHandler>;

export const dataProvider: DataProvider = {
    getList: async <TData extends BaseRecord = BaseRecord>(
        params: { resource: string } & any
    ): Promise<GetListResponse<TData>> => {
        const { resource, ...rest } = params;
        const handler = (resourceMap as ResourceMap)[resource]?.getList;
        if (!handler) throw new Error(`getList not implemented for ${resource}`);
        return handler(rest);
    },
    getOne: async <TData extends BaseRecord = BaseRecord>(
        params: { resource: string; id: string | number } & any
    ): Promise<{ data: TData }> => {
        const { resource, ...rest } = params;
        const handler = (resourceMap as ResourceMap)[resource]?.getOne;
        if (!handler) throw new Error(`getOne not implemented for ${resource}`);
        return handler(rest);
    },
    getApiUrl: () => {
        // Return a default or configured API URL here
        return "";
    },
    create: async <TData extends BaseRecord = BaseRecord>(
        params: { resource: string } & any
    ): Promise<CreateResponse<TData>> => {
        const { resource, ...rest } = params;
        const handler = (resourceMap as ResourceMap)[resource]?.create;
        if (!handler) throw new Error(`create not implemented for ${resource}`);
        return handler(rest);
    },
    update: async <TData extends BaseRecord = BaseRecord>(
        params: { resource: string } & any
    ): Promise<UpdateResponse<TData>> => {
        const { resource, ...rest } = params;
        const handler = (resourceMap as ResourceMap)[resource]?.update;
        if (!handler) throw new Error(`update not implemented for ${resource}`);
        return handler(rest);
    },
    deleteOne: async <TData extends BaseRecord = BaseRecord>(
        params: { resource: string } & any
    ): Promise<DeleteOneResponse<TData>> => {
        const { resource, ...rest } = params;
        const handler = (resourceMap as ResourceMap)[resource]?.deleteOne;
        if (!handler) throw new Error(`deleteOne not implemented for ${resource}`);
        return handler(rest);
    },
    // Implement other DataProvider methods as needed, following the same pattern
};
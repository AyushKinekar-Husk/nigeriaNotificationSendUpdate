
import { api, apiUrls } from '../api';
import { GetListResponse } from '@refinedev/core';
import { Meter } from '../interface/meterTypes';
import { toast } from 'react-toastify';


export const NeuronAddMeterService = {
    getList: async ({
        pagination,
        query,
        date,
    }: {
        pagination: { current: number; pageSize: number };
        query?: string;
        date?: string;
    }): Promise<GetListResponse<Meter>> => {
        const { current = 1, pageSize = 10 } = pagination ?? {};
        try {
            const response = await api.get(apiUrls.FetchMeterListV2, {
                params: {
                    page: current,
                    limit: pageSize,
                    ...(query && { query }), // only adds if query exists
                    ...(date && { date }),
                },

            });

            return {
                data: response.data?.meterlist || [],
                total: response.data?.metercount || 0,
            };
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : String(error));
        }
    }
    ,

    create: async (variables: any) => {
        try {
            const response = await api.post(apiUrls.CreateMeterV2, variables);
            toast.success('Meter Created successfully');
            return {
                data: response.data,
            };

        } catch (error) {
            throw new Error(error instanceof Error ? error.message : String(error));
        }
    },

    editMeter: async (data: { MeterSerial: string; MeterState: string }) => {
        const res = await api.put(apiUrls.EditMeterV2,

            data
        );
        toast.success('Meter Edited successfully');
        return res.data;
    },


    searchMeters: async (
        query: string,
        page = 1,
        limit = 20,
        date: string
    ): Promise<GetListResponse<Meter>> => {
        try {
            const response = await api.get(apiUrls.SearchData, {
                params: {
                    page,
                    limit,
                    ...(query && { query }),
                    ...(date && { date }),
                },
            });

            return {
                data: response.data?.meterlist || [],
                total: response.data?.metercount || 0,
            };
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : String(error));
        }
    }
    ,



    getUnassignedMeter: async (): Promise<any[]> => {

        try {
            const res = await api.get(apiUrls.GetAllUnassignedMeters);
            return res.data || [];
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : String(error));
        }
    },


    // Extra custom utilities (not used by refine directly but useful)
    getPlants: async (nocIds: string[]): Promise<any[]> => {
        const body = { nocIds, countryIds: [], stateIds: [], version:"V2" };
        try {
            const res = await api.post(apiUrls.FetchPlantDetails,body);
            return res.data || [];
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : String(error));
        }
    },
    getPolesByPlantId: async (plantId: number | string): Promise<any[]> => {
        try {
            const res = await api.post(apiUrls.FetchPoleDetails, { plantId: plantId });
            return res.data || [];

        } catch (error) {
            throw new Error(error instanceof Error ? error.message : String(error));
        }
    },

    getPlantServersByPlantId: async (plantId: number): Promise<any[]> => {
        try {
            const res = await api.post(apiUrls.FetchServerDetails, {
                plantId: plantId,

            });
            return res.data || [];
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : String(error));
        }
    },
    checkPermissions: async (permissionNames: string[]): Promise<any> => {
        try {
            const payload = {
                requestType: "CHECK_MULTIPLE",
                permissionName: permissionNames,
            };

            const response = await api.post(
                apiUrls.handlePermission, // Add this to `apiUrls`
                payload,

            );


            return response.data || {};

        } catch (error) {
            console.error("Permission check failed", error);
            throw new Error(error instanceof Error ? error.message : String(error));
        }
    },

};

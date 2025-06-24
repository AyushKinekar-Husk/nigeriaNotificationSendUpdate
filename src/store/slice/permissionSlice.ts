// store/permissionSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PermissionState {
  ManageCreateMeterV2: boolean;
  ManageEditMeterV2: boolean;
  nocIds:string[]
}

const initialState: PermissionState = {
  ManageCreateMeterV2: false,
  ManageEditMeterV2: false,
  nocIds: []
};

const permissionSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    setPermissions: (state, action: PayloadAction<PermissionState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setPermissions } = permissionSlice.actions;
export default permissionSlice.reducer;

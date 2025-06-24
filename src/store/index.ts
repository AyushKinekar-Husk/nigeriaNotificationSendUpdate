import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice'
import permissionReducer from './slice/permissionSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
     permissions: permissionReducer,
   
  },
});



export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
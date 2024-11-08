import { configureStore } from '@reduxjs/toolkit'
import { commonSlice } from './commonSlice'
import { publicStore } from './public'

export const store = configureStore({
    reducer: {
        [commonSlice.name]: commonSlice.reducer,
        [publicStore.reducerPath]: publicStore.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(publicStore.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

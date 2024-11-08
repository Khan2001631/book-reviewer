import { createSlice } from '@reduxjs/toolkit'
import { commonSliceInterface } from '../interfaces/common/common.interface'

const initialState: commonSliceInterface = {
    isLoggedIn: false,
    user: {
        username: '',
        fullName: '',
        email: '',
        userPicPath: '',
        userId: 0
    },
    isSessionExpired: false,
    isRefreshTokenExpired: false
}

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        updateLogin: (state) => {
            state.isLoggedIn = true;
        },
        updateLogout: (state) => {
            state.isLoggedIn = false;
        },
        updateUser: (state, action) => {
            state.user = action.payload
        },
        updateIsSessionExpired: (state, action) => {
            state.isSessionExpired = action.payload
        },
        updateIsRefreshTokenExpired: (state, action) => {
            state.isRefreshTokenExpired = action.payload
        },
    }
})

export const {
    updateLogin,
    updateLogout,
    updateUser,
    updateIsSessionExpired,
    updateIsRefreshTokenExpired
} = commonSlice.actions
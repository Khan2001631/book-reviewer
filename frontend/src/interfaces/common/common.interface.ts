export interface commonSliceInterface {
    isLoggedIn: boolean,
    user: {
        username: string,
        fullName: string,
        email: string,
        userPicPath: string,
        userId: number
    },
    isSessionExpired: boolean,
    isRefreshTokenExpired: boolean
}
export interface AuthError {
    message : string
}

export interface CurrentUser {
    id: string,
    displayName: string,
    email: string,
    photo_url: string
}
 
export interface AuthState {
    isAuth: boolean,
    currentUser?: CurrentUser,
    isLoading: boolean,
    error: AuthError
}


export interface userInfo {
    account: string,
    password: string,
    type?: []
}
export interface userState {
    userInfo: null | userInfo,
    token: string,
}
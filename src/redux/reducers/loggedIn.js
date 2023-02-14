import { createSlice } from "@reduxjs/toolkit"

export const loggedIn = createSlice({
    name: 'loggedIn',
    initialState: {
        value: false,
        token: '',
        isAdmin: false,
        isSuperAdmin: false
    },
    reducers: {
        login: (state, action) => {
            state.value = true
            state.token = action.payload[0]
            state.user = action.payload[1]
            state.isAdmin = action.payload[2]
            state.isSuperAdmin = action.payload[3]
        },
        logout: (state) => {
            state.value = false
            state.token = ''
            state.user = ''
            state.isAdmin = false
            state.isSuperAdmin = false
        }
    }
})
export const { login, logout } = loggedIn.actions
export default loggedIn.reducer
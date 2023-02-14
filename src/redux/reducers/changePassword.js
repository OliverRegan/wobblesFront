import { createSlice } from "@reduxjs/toolkit"

export const changePasswordVerified = createSlice({
    name: 'changePasswordVerified',
    initialState: {
        value: false
    },
    reducers: {
        set: (state) => {
            state.value = true
        },
        unset: (state) => {
            state.value = false
        }
    }
})
export const { set, unset } = changePasswordVerified.actions
export default changePasswordVerified.reducer
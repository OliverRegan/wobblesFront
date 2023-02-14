import { createSlice } from "@reduxjs/toolkit"

export const editSkater = createSlice({
    name: 'editSkater',
    initialState: {
        value: false,
        firstName: '',
        lastName: '',
        DOB: '',
        emergencyContact: '',
        id: '',
        associatedUserId: ''
    },
    reducers: {
        set: (state, action) => {
            state.value = true
            state.firstName = action.payload.skaterName
            state.lastName = action.payload.skaterLastName
            state.DOB = action.payload.skaterDOB
            state.emergencyContact = action.payload.skaterEmergencyContact
            state.id = action.payload.skaterId
            state.associatedUserId = action.payload.skaterAssociatedUserId
        },
        unset: (state) => {
            state.firstName = ''
            state.lastName = ''
            state.DOB = ''
            state.emergencyContact = ''
            state.value = false
            state.id = ''
            state.associatedUserId = ''
        }
    }
})
export const { set, unset } = editSkater.actions
export default editSkater.reducer
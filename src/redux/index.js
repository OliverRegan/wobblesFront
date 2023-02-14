import { configureStore } from '@reduxjs/toolkit'
import loggedInReducer from './reducers/loggedIn'
import editSkaterReducer from './reducers/editSkater'
import changePasswordReducer from './reducers/changePassword'


const store = configureStore({
    reducer: {
        loggedIn: loggedInReducer,
        editSkater: editSkaterReducer,
        changePassword: changePasswordReducer
    }
})

export default store
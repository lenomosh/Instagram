import USER_ACTION_TYPES from "./user.action.types";
import storage from  'redux-persist/lib/storage'

const INITIAL_STATE={
    currentUser:null
}
const userReducer =(state =INITIAL_STATE, action)=> {
    switch (action.type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return{
                ...state,
                currentUser:action.payload
            }
        case USER_ACTION_TYPES.LOUGOUT_USER:
            storage.removeItem('persist:root')
            return {
                ...state,
                currentUser: null
            }
    
        default:
            return state;
    }
}
export default userReducer

import {combineReducers} from 'redux'
import userReducer from './user/user.reducer'
import {persistReducer} from "redux-persist";
import storage from  'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage: storage,
    timeout:null,
    whitelist:['user']
};
const rootReducer= combineReducers({
    user: userReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer

import {createStore, applyMiddleware,compose} from 'redux'
import {createLogger} from 'redux-logger'
import {persistStore} from "redux-persist";
import persistedReducer from "./root-reducer";
const logger = createLogger()
const middlewares = [logger];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(...middlewares))
);
export const persistor = persistStore(store)
// export {store,persistor} ;

